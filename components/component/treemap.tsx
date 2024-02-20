import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { BlockEmitter, createNodeTransport } from '@substreams/node';
import { createRegistry, createRequest } from '@substreams/core';
import { readPackage } from '@substreams/manifest';

const Treemap = () => {
  const [treemapData, setTreemapData] = useState(null);

  useEffect(() => {
    async function fetchErc20BalanceChanges() {
      const SUBSTREAMS_API_KEY = "657047275aea337c6dd47fb19715f0df056096af91311c21";
      const baseUrl = 'https://eth.substreams.pinax.network:443';
      const manifest = "https://spkg.io/pinax-network/erc20-balance-changes-mainnet-v1.2.0.spkg";

      const substreamPackage = await readPackage(manifest);
      if (!substreamPackage.modules) {
        throw new Error('No modules found in substream package');
      }

      const registry = createRegistry(substreamPackage);
      const headers = new Headers({ 'X-User-Agent': '@substreams/node', 'X-Api-Key': SUBSTREAMS_API_KEY });
      const transport = createNodeTransport(baseUrl, SUBSTREAMS_API_KEY, registry, headers);
      const outputModule = 'map_balance_changes';
      const startBlockNum = 0; // Set starting block number
      const request = createRequest({
        substreamPackage,
        outputModule,
        startBlockNum,
      });

      const emitter = new BlockEmitter(transport, request, registry);

      let balanceChanges = []; // Store balance changes here

      emitter.on('anyMessage', (message, cursor, clock) => {
        // Process message to extract balance changes
        balanceChanges.push(message);
        // Optionally, limit the number of messages or implement a stopping condition
      });

      emitter.start();

      // Assume emitter is stopped elsewhere or use a condition within `anyMessage`
      setTimeout(() => {
        emitter.stop();
        setTreemapData(processDataForTreemap(balanceChanges));
      }, 10000); // Stop after 10 seconds for demonstration
    }

    fetchErc20BalanceChanges();
  }, []);

  useEffect(() => {
    if (treemapData) {
      renderTreemap(treemapData);
    }
  }, [treemapData]);

  const processDataForTreemap = (balanceChanges) => {
    // Process balanceChanges to a structure suitable for D3 treemap
    // This is a placeholder; adapt it to the structure of your `balanceChanges`
    const data = {
      name: "root",
      children: balanceChanges.map((change, index) => ({
        name: `Contract ${index}`,
        value: Math.random() * 100, // Example value
      })),
    };
    return data;
  };

  const renderTreemap = (data) => {
    const width = 800;
    const height = 600;
    const root = d3.hierarchy(data).sum((d) => d.value);
    d3.treemap().size([width, height]).padding(1)(root);

    // Select the SVG element, assuming you have one in your component
    const svg = d3.select('#treemap');
    const nodes = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

    nodes
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .style('fill', 'lightblue');

    nodes
      .append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text((d) => d.data.name);
  };

  return <svg id="treemap" width="800" height="600"></svg>;
};

export default Treemap;