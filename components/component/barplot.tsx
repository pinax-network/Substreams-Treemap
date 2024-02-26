import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarplotProps {
  data: { name: string; value: number }[];
  width: number;
  height: number;
}

export const Barplot: React.FC<BarplotProps> = ({ data, width, height }) => {
  const ref = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    // Debugging: Log data to check for validity
    console.log('Data for bar plot:', data);
    
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible')
      .style('margin-top', '75px');

    svg.selectAll("*").remove(); // Clear svg content before redrawing

    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .padding(0.4);

    // Ensure all data values are numbers and calculate the max value
    const maxValue = d3.max(data, d => typeof d.value === 'number' ? d.value : 0);
    console.log('Max value:', maxValue); // Debugging: Log max value to ensure it's a number

    const yScale = d3.scaleLinear()
      .domain([0, maxValue || 0])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`)
      .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svg.append('g')
      .call(yAxis);

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', d => xScale(d.name)!)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => {
        // Debugging: Check if any height calculations result in NaN
        const calculatedHeight = height - yScale(d.value);
        if (isNaN(calculatedHeight)) {
          console.error('Invalid height calculation for data:', d);
        }
        return calculatedHeight;
      })
      .attr('fill', 'steelblue');

  }, [data, height, width]);

  return (
    <svg ref={ref}></svg>
  );
};

