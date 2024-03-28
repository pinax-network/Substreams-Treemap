import React, { useEffect, useState, useRef } from 'react';
import { createRegistry, createRequest, fetchSubstream } from '@substreams/core';
import BlockEmitter from '@substreams/node';
import createWebTransport from '@substreams/node/createWebTransport';
import { EntityChanges } from '@substreams/sink-entity-changes/entity_pb';
import { EntityChange, getValuesInEntityChange } from '@substreams/sink-entity-changes/zod';
import {Treemap} from '@/components/component/treemap';
import allowedContractsData  from '../../allowedContracts.json';
import styles from "./treemap.module.css";
import { Package as ProtoPackage, SessionInit } from '@substreams/core/proto';

// Definition for tree structure
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
  logoUrl: any;
  address: string;
  chain: string;
};
export type Tree = TreeNode | TreeLeaf;

// Definition for balanceChange
interface BalancesByChainAndContract {
  [chain: string]: {
    [contract: string]: {
      [owner: string]: number;
    };
  };
}

const UnifiedSubstreamsComponent = ({ visibleTokens }) => {
  const [balancesByChainAndContract, setBalancesByChainAndContract] = useState<BalancesByChainAndContract>({});
  const [dataReceived, setDataReceived] = useState(false);
  const [session, setSession] = useState<SessionInit>();

  // Filters only allowedContracts
  const allowedContractsMap = allowedContractsData.contracts.reduce((acc, contractInfo) => {
    acc[contractInfo.contract.toLowerCase()] = contractInfo; // Store the entire object for easy access
    return acc;
  }, {});
 
  const fetchDataAndProcess = async (baseUrl: string, manifestUrl: string, chainIdentifier: string) => {
    const apiKey = "657047275aea337c6dd47fb19715f0df056096af91311c21"; 
    const outputModule = "graph_out"; 
    const startBlockNum = -5; 

    // Fetch and prepare the substream package (Connect Transport)
    const substreamPackage = await fetchSubstream(manifestUrl);
    const registry = createRegistry(substreamPackage);
    const headers = new Headers({ "X-User-Agent": "@substreams/node", "x-api-key": apiKey });
    const transport = createWebTransport(baseUrl, apiKey, registry, headers);
    const request = createRequest({ substreamPackage, outputModule, startBlockNum });

    const emitter = new BlockEmitter(transport, request, registry);

    // Session Trace ID
    emitter.on("session", (session) => {
      console.dir(session);
      setSession(session);
    });

    // Stream Blocks
    emitter.on("anyMessage", (message: any) => {
      const balanceChanges = message.entityChanges.filter((change: any) => change.entity === "BalanceChange");

      setBalancesByChainAndContract(currentState => {
        const updatedState = { ...currentState };

        balanceChanges.forEach((change: any) => {
          const owner = change.fields.find((field: any) => field.name === "owner")?.newValue.string;
          const contract = change.fields.find((field: any) => field.name === "contract")?.newValue.string;
          const newBalance = parseInt(change.fields.find((field: any) => field.name === "newBalance")?.newValue.string || '0', 10);
                    
          if (!allowedContractsMap[contract]) return; // Check if the contract is in the list of allowed contracts
          if (!updatedState[chainIdentifier]) updatedState[chainIdentifier] = {}; // Initialize chain data if not present
          if (!updatedState[chainIdentifier][contract]) updatedState[chainIdentifier][contract] = {}; // Initialize if new contract 
          updatedState[chainIdentifier][contract][owner] = newBalance; // Update contract data
        });
        console.dir(updatedState)
        return updatedState;
      });

      setDataReceived(true); // Indicate data has been processed
    });

    emitter.start();
};

  useEffect(() => {
    const ethManifest = "https://spkg.io/pinax-network/erc20-balance-changes-mainnet-v1.2.0.spkg";
    const polygonManifest = "https://spkg.io/pinax-network/erc20-balance-changes-mainnet-v1.2.0.spkg";
    fetchDataAndProcess("https://eth.substreams.pinax.network:443", ethManifest, "ethereum");
    fetchDataAndProcess("https://polygon.substreams.pinax.network:443", polygonManifest, "polygon");
  }, []);

  const transformDataForTreemap = (): Tree => {
    const chains = Object.entries(balancesByChainAndContract).map(([chainName, contracts]): TreeNode => { 
      const contractsNodes: Tree[] = Object.entries(contracts)
      .filter(([contract]) => {
        // Get the token name using the contract address
        const tokenName = allowedContractsMap[contract]?.name;
        // Return visibility status from visibleTokens
        return visibleTokens[tokenName];
      })
      .map(([contract, owners]): TreeNode => { 
        const contractInfo = allowedContractsMap[contract];
        const sortedOwners = Object.entries(owners).sort((a, b) => b[1] - a[1]).slice(0, 20);
        return {
          type: 'node', 
          name: contract, // Ideally, fetch contract names or symbols if available
          value: 0,
          children: sortedOwners.map(([owner, balance]): TreeLeaf => ({ 
            type: 'leaf', 
            name: owner, 
            value: Math.log(balance + 1),
            logoUrl: contractInfo.logoUrl,
            address: owner,
            chain: contractInfo.chain,
          })),
        };
      });

      return {
        type: 'node', 
        name: chainName,
        value: 0,
        children: contractsNodes,
      };
    });

    return {
      type: 'node', 
      name: 'Root',
      value: 0,
      children: chains,
    };
  };

  const treemapData = transformDataForTreemap();

  return (
    <div>
      {dataReceived ? (
        <Treemap data={treemapData} width={1100} height={800} visibleTokens={visibleTokens} />
      ) : (
        <TreemapSkeleton width={1100} height={820} />
      )}
    </div>
  );
};
export default UnifiedSubstreamsComponent;


const TreemapSkeleton = ({ width, height }) => {
  return (
    <svg width={width} height={height} className={styles.skeletonWrapper} >
      {/* Background */}
      <rect width="100%" height="100%" fill="#f0f0f0" rx="20" ry="20" opacity="0.05"  />
      {/* Example chain and token/owner blocks */}
      <rect x="1%" y="1%" width="98%" height="10%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      
      <rect x="1%" y="12%" width="49%" height="16%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="51%" y="12%" width="48%" height="16%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      
      

      <rect x="1%" y="29%" width="33%" height="10%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="35%" y="29%" width="30%" height="10%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="66%" y="29%" width="33%" height="10%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>

      <rect x="1%" y="40%" width="49%" height="21%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="51%" y="40%" width="48%" height="21%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>

      <rect x="1%" y="62%" width="23%" height="15%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="25%" y="62%" width="24%" height="15%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="50%" y="62%" width="24%" height="15%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="75%" y="62%" width="24%" height="15%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      
      <rect x="1%" y="78%" width="98%" height="10%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>

      <rect x="1%" y="89%" width="49%" height="10%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      <rect x="51%" y="89%" width="48%" height="10%" fill="#e0e0e0" mask="url(#shimmerMask)" opacity="0.1" rx={10} ry={10}/>
      
      {/* Shimmer gradient definition */}
      <defs>
        <linearGradient id="shimmerGradient" gradientUnits="userSpaceOnUse" x1="0" x2="100%" y1="0" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate attributeName="x1" from="-100%" to="100%" dur="2s" repeatCount="indefinite" />
          <animate attributeName="x2" from="0%" to="200%" dur="2s" repeatCount="indefinite" />
        </linearGradient>
        <mask id="shimmerMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#shimmerGradient)" />
        </mask>
      </defs>
    </svg>
  );
};