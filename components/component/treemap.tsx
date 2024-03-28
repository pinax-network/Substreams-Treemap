import React, { useMemo } from "react";
import * as d3 from "d3";
import { Tree } from "./substreamComponent";
import styles from "./treemap.module.css";

interface TreemapProps {
  width: number;
  height: number;
  data: Tree;
  visibleTokens: { [key: string]: boolean }; 
}

function filterData(data, threshold) {
  // If the data is a leaf node and meets the condition, return true to keep it
  if (data.type === 'leaf' && data.value < threshold) {
    return false;
  }
  // If it's a node, filter its children
  if (data.children) {
    data.children = data.children.map(child => filterData(child, threshold)).filter(Boolean);
  }
  return data;
}

export const Treemap = ({ width, height, data }: TreemapProps) => {
  console.log(data); // debug

  const filteredData = filterData(data, 10);

  // Generate hierarchy and root data structure
  const hierarchy = useMemo(() => {
    return d3.hierarchy(filteredData).sum((d) => d.value);
  }, [filteredData]);

  const root = useMemo(() => {
    const treeGenerator = d3.treemap<Tree>()
      .size([width, height])
      .padding(4)
      .tile(d3.treemapBinary); // Set the tiling method to d3.treemapBinary

    return treeGenerator(hierarchy);
  }, [hierarchy, width, height]);

  const chainRectangles = root.children?.map((chain, i) => (
    <rect
      key={`chain-${i}`}
      x={chain.x0}
      y={chain.y0}
      width={chain.x1 - chain.x0}
      height={chain.y1 - chain.y0}
      rx="20" // Adjust for rounded corners
      ry="20" // Adjust for rounded corners
      stroke="white"
      strokeWidth="1"
      opacity="0.1" // Slightly transparent
    />
  ));

  const allShapes = root.leaves().filter(leaf => leaf.value >= 10).map((leaf) => {
    const {x0, x1, y0, y1, data} = leaf; // Destructure for easier access
    const width = x1 - x0;
    const height = y1 - y0;
    const chainName = leaf.data.chain;
    const baseLink = chainName === "Ethereum" ? "https://etherscan.io/address/0x" : "https://polygonscan.com/address/0x";
  
    return (
      <a
        href={`${baseLink}${data.address}`} // Use the owner's address from the data
        target="_blank" // Open in a new tab
        rel="noopener noreferrer" // Security measure for opening links in a new tab
        key={leaf.id} // Ensure the key is on the outermost element
        className={styles.rectangle}
      >
      <rect
        x={x0}
        y={y0}
        width={width}          
        height={height}
        rx="10" // Adjust for rounded corners
        ry="10" // Adjust for rounded corners
        stroke="#e5e5e5"
        fill="#e5e5e5"
        className={"opacity-10 hover:opacity-100 transition-opacity duration-100"}
      />
      <image
        href={data.logoUrl} // Use logo URL from the data
        x={x0}
        y={y0}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet" // Adjust as needed
        className="opacity-70 hover:opacity-100 transition-opacity duration-100" // Make the image more visible on hover
      />
    </a>
    );
  });  

  return (
    <div>
      <svg width={width} height={height}>
        {chainRectangles}
        {allShapes}
      </svg>
      <br></br>
    </div>
  );
};

