import React, { useMemo } from "react";
import * as d3 from "d3";
import { Tree } from "./substreamComponent";
import styles from "./treemap.module.css";

const colors = [
   "#A0D6B4", "#89CFF0", "#AFDED2", "#E6E6FA", "#F5FFFA", "#FADADD", "#F08080", "#B0E0E6","#FFDAB9","#D8BFD8",
];

interface TreemapProps {
  width: number;
  height: number;
  data: Tree;
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
  //console.log(data); // debug

  const filteredData = filterData(data, 10);

  // Generate hierarchy and root data structure
  const hierarchy = useMemo(() => {
    return d3.hierarchy(filteredData).sum((d) => d.value);
  }, [filteredData]);
  
  //console.log(hierarchy); // debug
  
  const firstLevelGroups = hierarchy?.children?.map((child) => child.data.name);
  var colorScale = d3
    .scaleOrdinal<string>()
    .domain(firstLevelGroups || [])
    .range(colors);

  const root = useMemo(() => {
    const treeGenerator = d3.treemap<Tree>()
      .size([width, height])
      .padding(4)
      .tile(d3.treemapBinary); // Set the tiling method to d3.treemapBinary

    return treeGenerator(hierarchy);
  }, [hierarchy, width, height]);

  const allShapes = root.leaves().filter(leaf => leaf.value >= 10).map((leaf) => {
    const parentName = leaf.parent?.data.name;
    // Format the value to show only two digits after the decimal
    const formattedValue = Number(leaf.data.value).toFixed(2);
    const logoUrl = leaf.data.logoUrl;
    const {x0, x1, y0, y1, data} = leaf; // Destructure for easier access
    const width = x1 - x0;
    const height = y1 - y0;

  
    return (
      <g key={leaf.id} className={styles.rectangle}>
      <rect
        x={x0}
        y={y0}
        width={width}
        height={height}
        rx="10" // Adjust for rounded corners
        ry="10" // Adjust for rounded corners
        stroke="#e5e5e5"
        fill="#e5e5e5"
        className={"opacity-30 hover:opacity-100 transition-opacity duration-100"}
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
    </g>
    );
  });  

  return (
    <div>
      <svg width={width} height={height}>
        {allShapes}
      </svg>
    </div>
  );
};

