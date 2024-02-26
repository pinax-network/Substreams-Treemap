import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const TreemapComponent = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove();
  
      const width = 800, height = 600;
      svg.attr("width", width).attr("height", height);
  
      const root = d3.hierarchy(data).sum(d => d.value);
      d3.treemap()
        .size([width, height])
        .padding(1)
        (root);
  
      console.log("Processed root:", root); // Debugging: Inspect the processed root
  
      const leaves = root.leaves();
      console.log("Leaves:", leaves); // Debugging: Inspect the leaves
  
      svg.selectAll("rect")
        .data(leaves)
        .enter().append("rect")
          .attr('x', d => d.x0)
          .attr('y', d => d.y0)
          .attr('width', d => d.x1 - d.x0)
          .attr('height', d => d.y1 - d.y0)
          .style("stroke", "black")
          .style("fill", "slateblue");
  
      svg.selectAll("text")
        .data(leaves)
        .enter().append("text")
          .attr("x", d => d.x0 + 5)    
          .attr("y", d => d.y0 + 20)    
          .text(d => d.data.name)
          .attr("font-size", "15px")
          .attr("fill", "white");
    }
  }, [data]);

  return <svg ref={d3Container} />;
};