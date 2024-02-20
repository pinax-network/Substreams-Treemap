import { createRegistry, createRequest } from '@substreams/core';
import { readPackage } from '@substreams/manifest';
import { BlockEmitter } from '@substreams/node';
import { createNodeTransport } from '@substreams/node/createNodeTransport';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  if (!process.env.SUBSTREAMS_API_KEY) {
    throw new Error('SUBSTREAMS_API_KEY is required');
  }
  const token = process.env.SUBSTREAMS_API_KEY;

  const baseUrl = 'https://eosevm.substreams.pinax.network:443';
  const manifest = 'https://github.com/pinax-network/substreams-erc20-transfers/releases/download/v0.1.0/erc20Transfers-v0.1.0.spkg';
  const outputModule = 'map_transfers';
  const startBlockNum = 25583271;

  const substreamPackage = await readPackage(manifest);
  if (!substreamPackage.modules) {
    throw new Error('No modules found in substream package');
  }

  const registry = createRegistry(substreamPackage);
  const transport = createNodeTransport(baseUrl, token, registry);
  const request = createRequest({
    substreamPackage,
    outputModule,
    startBlockNum,
  });

  const emitter = new BlockEmitter(transport, request, registry);

  emitter.on('session', (session) => {
    console.dir(session);
  });

  emitter.on('anyMessage', (message, cursor, clock) => {
    for (const transfer of message?.transfers ?? []) {
      console.log(transfer);
    }
  });

  emitter.on('close', (error) => {
    if (error) {
      console.error(error);
    }
    console.timeEnd('🆗 close');
  });

  emitter.on('fatalError', (error) => {
    console.error(error);
  });

  console.log('✅ start');
  console.time('🆗 close');
  emitter.start();
}

main().catch(console.error);
