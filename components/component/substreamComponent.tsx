import { createRegistry, createRequest, fetchSubstream } from '@substreams/core';
import { Package as ProtoPackage, SessionInit } from '@substreams/core/proto';
import BlockEmitter from '@substreams/node';
import createWebTransport from '@substreams/node/createWebTransport';
import { EntityChanges } from '@substreams/sink-entity-changes/entity_pb';
import { EntityChange, getValuesInEntityChange } from '@substreams/sink-entity-changes/zod';
import React, { useState } from 'react';
import useSWR from 'swr';
import {Treemap} from '@/components/component/treemap';
import { Barplot } from './barplot';
import contracts from '../../allowedContracts.json';


export type TreeNode = {
  type: 'node';
  value: number;
  name: string;
  children: Tree[];
};
export type TreeLeaf = {
  type: 'leaf';
  name: string;
  value: number;
};

export type Tree = TreeNode | TreeLeaf;

interface BalanceChange {
  entity: string;
  fields: {
    name: string;
    newValue: {
      string: string;
    };
  }[];
}

// Define a type for the structure of balances organized by contract and owner
interface BalancesByContract {
  [contract: string]: {
    [owner: string]: number;
  };
}

// JSON file parsing
const allowedContractsData = require('../../allowedContracts.json');
const allowedContractsInfo = allowedContractsData.contracts;
const allowedContractsMap = allowedContractsInfo.reduce((acc, contractInfo) => {
  acc[contractInfo.contract] = contractInfo; // Store the entire object for easy access
  return acc;
}, {});

const contractToUsdValue = allowedContractsData.contracts.reduce((acc, contract) => {
  acc[contract.contract.toLowerCase()] = contract.usdValue; // Use lowercase for consistency
  return acc;
}, {});

async function fetcher(manifest: string) {
  const substreamPackage = await fetchSubstream(manifest);
  if (!substreamPackage.modules) {
    throw new Error("No modules found in substream package");
  }
  return substreamPackage;
}

function SubstreamsComponent({ visibleTokens }) {
  const manifest = "https://spkg.io/pinax-network/erc20-balance-changes-mainnet-v1.2.0.spkg";
  const apiKey = "657047275aea337c6dd47fb19715f0df056096af91311c21";
  const { data, isLoading } = useSWR("manifest/" + manifest, () => fetcher(manifest));

  if ( isLoading ) return <>I'm loading...</>
  if ( !data ) return <>no data</>

  return <SubstreamPackage substreamPackage={data} apiToken={apiKey} visibleTokens={visibleTokens} />
};

function SubstreamPackage({substreamPackage, apiToken, visibleTokens }: {substreamPackage: ProtoPackage, apiToken: string, visibleTokens: any}) {
  const [started, setStart] = useState(false);
  const [session, setSession] = useState<SessionInit>();
  const [messages, setMessages] = useState<EntityChanges[]>([]);
  const [balanceByContract, setBalanceByContract] = useState<BalancesByContract>({});

  let doc = ''
  let network = substreamPackage.network
  for ( const moduleMeta of substreamPackage.moduleMeta) {
    if ( moduleMeta.doc ) doc = moduleMeta.doc
  }

  // const token = process.env.SUBSTREAMS_API_TOKEN;
  const baseUrl = "https://polygon.substreams.pinax.network:443";
  const outputModule = "graph_out";
  const startBlockNum = -5;

  // Connect Transport
  const headers = new Headers({ "X-User-Agent": "@substreams/node", "x-api-key": apiToken });
  const registry = createRegistry(substreamPackage);
  const transport = createWebTransport(baseUrl, apiToken, registry, headers);
  const request = createRequest({
    substreamPackage,
    outputModule,
    startBlockNum,
  });

  if ( !started ) {
    const emitter = new BlockEmitter(transport, request, registry);

    // Session Trace ID
    emitter.on("session", (session) => {
      console.dir(session);
      setSession(session);
    });

    // Stream Blocks
    emitter.on("anyMessage", (message: any) => {
        // Extract balance changes from the message
        const balanceChanges: BalanceChange[] = message.entityChanges.filter((change: EntityChange) => change.entity === "BalanceChange");

        // Use a functional update to ensure we're working with the most current state
        setBalanceByContract((currentBalances) => {
          // Create a copy of the current state to avoid direct mutations
          const updatedBalances = { ...currentBalances };

          balanceChanges.forEach(change => {
            const values = getValuesInEntityChange(change as EntityChange);
            const ownerField = change.fields.find(field => field.name === "owner"); //const ownerField  = values["owner"];
            const contractField = change.fields.find(field => field.name === "contract"); //const contractField = values["contract"];
            const newBalanceField = change.fields.find(field => field.name === "newBalance");

            if (!ownerField || !contractField || !newBalanceField) return; // Skip if any field is missing

            const owner = ownerField.newValue.string;
            const contract = contractField.newValue.string;
            //console.dir(contract); //to get contracts
            const newBalanceToken = parseInt(newBalanceField.newValue.string || '0', 10); // newBalance not normalized to USD

            // Check if the contract is in the list of allowed contracts
            if (!allowedContractsMap[contract]) return;

            const usdValue = contractToUsdValue[contract];
            // Convert the balance to its USD value
            const newBalanceInUsd = newBalanceToken * usdValue;

            // Initialize or update the contract and owner balances
            if (!updatedBalances[contract]) {
              updatedBalances[contract] = {};
            }
            //console.dir(contract);
            updatedBalances[contract][owner] = newBalanceInUsd;
          });

          return updatedBalances;
        });
      });

    emitter.start()
    setStart(true)

  }
  const entities = messages.reduce((prev, current) => {
    return prev + current.entityChanges.length
  }, 0);

  const balanceDataArray: Tree[] = Object.entries(balanceByContract)
  .filter(([contract]) => {
      // Get the token name using the contract address
      const tokenName = allowedContractsMap[contract]?.name;
      // Return visibility status from visibleTokens
      return visibleTokens[tokenName];
  })
  .map(([contract, owners]) => {
    const contractInfo = allowedContractsMap[contract];
    // Convert owners object to array, sort by balance descending, and take the top 20
    const sortedOwners = Object.entries(owners)
      .sort((a, b) => b[1] - a[1]) // Sort owners by balance in descending order
      .slice(0, 20); // Take top 20 owners by balance
  
    return {
      type: 'node',
      name: `${contractInfo.name}`,
      value: 0, // This value is not used for node sizing in your case
      children: sortedOwners.map(([owner, balance]) => ({
        type: 'leaf',
        name: `${contractInfo.ticker}`,
        value: Math.log(balance + 1), // Apply logarithmic scaling
        logoUrl: contractInfo.logoUrl,
      }))
    };
  });
  
  const treemapData: Tree = {
    type: 'node',
    name: "Root",
    value: 0,
    children: balanceDataArray
  };

  return (
    <div className='flex flex-col items-center justify-center px-10'>
      <br></br>
      <Treemap data={treemapData} width={1100} height={800} visibleTokens={visibleTokens}/>
      <br></br>
    </div>
  );
}

export default SubstreamsComponent;