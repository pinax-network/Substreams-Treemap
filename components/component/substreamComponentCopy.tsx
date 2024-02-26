import { createRegistry, createRequest, fetchSubstream } from '@substreams/core';
import { Package as ProtoPackage, SessionInit } from '@substreams/core/proto';
import BlockEmitter from '@substreams/node';
import createWebTransport from '@substreams/node/createWebTransport';
import { EntityChanges } from '@substreams/sink-entity-changes/entity_pb';
import React, { useState } from 'react';
import useSWR from 'swr';
import {TreemapComponent} from '@/components/component/treemap';
import { Barplot } from './barplot';

async function fetcher(manifest: string) {
  const substreamPackage = await fetchSubstream(manifest);
  if (!substreamPackage.modules) {
    throw new Error("No modules found in substream package");
  }
  return substreamPackage;
}

function SubstreamsComponent() {
  const manifest = "https://spkg.io/pinax-network/erc20-balance-changes-mainnet-v1.2.0.spkg";
  const apiKey = "e201fb26657b610dab0df9b557c7e145057deefafba5aae3";
  const { data, isLoading } = useSWR("manifest/" + manifest, () => fetcher(manifest));

  if ( isLoading ) return <>I'm loading...</>
  if ( !data ) return <>no data</>

  return <SubstreamPackage substreamPackage={data} apiToken={apiKey} />
};

function SubstreamPackage({substreamPackage, apiToken}: {substreamPackage: ProtoPackage, apiToken: string}) {
  const [started, setStart] = useState(false);
  const [session, setSession] = useState<SessionInit>();
  const [messages, setMessages] = useState<EntityChanges[]>([]);
  const [balanceByContract, setBalanceByContract] = useState<Record<string, number>>({});
  const [hierarchyData, setHierarchyData] = useState<{ name: string; children: number }[]>([]);

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
      const balanceChanges = message.entityChanges.filter(change => change.entity === "BalanceChange");
      
      const updatedBalances = balanceChanges.reduce((acc, change) => {
        const contract = change.fields.find(field => field.name === "contract").newValue.string;
        const newBalance = parseFloat(change.fields.find(field => field.name === "newBalance").newValue.string);
        acc[contract] = newBalance;
        return acc;
      }, { ...balanceByContract });

      console.dir(updatedBalances);
      setBalanceByContract(updatedBalances);
    });

    emitter.start()
    setStart(true)
  }
  const entities = messages.reduce((prev, current) => {
    return prev + current.entityChanges.length
  }, 0);
  // Transform balanceByContract for rendering if needed
  const balanceDataArray = Object.entries(balanceByContract).map(([contract, balance]) => ({
    name: contract,
    value: balance,
  }));
  
  return (
    <div>
      {/* Render your Treemap component and pass the hierarchical data as props */}
      <Barplot data={balanceDataArray} width={700} height={400} /> 
    </div>
  );

}



export default SubstreamsComponent;