/* eslint-disable */
// @ts-nocheck
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface DataType {
  store: string | number
  remainingProjects: number // Random value for remaining projects
  completedProjects: number
}

export default function StackedBarChart() {
  const [data] = useState<DataType[]>(
    Array.from<DataType>({ length: 10 }).map<DataType>((_, i) => ({
      key: i,
      store: `ward ${i}`,
      remainingProjects: Math.floor(Math.random() * 20), // Random value for remaining projects
      completedProjects: Math.floor(Math.random() * 20),
    }))
  )

  // Loop to create 31 objects and push them into the array

  // Set up dimensions
  const margin = { top: 0, right: 100, bottom: 60, left: 100 }
  const width = 800 - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom
  const svgRef = useRef<any>()
  useEffect(() => {
    // Create SVG container
    const svg = d3.select(svgRef.current)

    // Create scales
    const xScale = d3.scaleBand().rangeRound([0, width]).paddingInner(0.5).align(0.1)
    const yScale = d3.scaleLinear().rangeRound([height, 0])

    const stack: any = d3
      .stack()
      .keys(['remainingProjects', 'completedProjects'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)

    const series = stack(data)

    xScale.domain(
      data.map(function (d) {
        return d.store
      })
    )
    yScale
      .domain([
        0,
        d3.max(series, function (d) {
          return d3.max(d, function (d) {
            return d[1]
          })
        }),
      ])
      .nice()

    const color = d3
      .scaleOrdinal()
      .domain(['remainingProjects', 'completedProjects'])
      .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd'])
    // Create bars
    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('transform', 'translate(40, 10)')
      .attr('fill', function (d) {
        return color(d.key)
      })
      .selectAll('rect')
      .data(function (d) {
        return d
      })
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return xScale(d.data.store)
      })
      .attr('y', function (d) {
        return yScale(d[1])
      })
      .attr('height', function (d) {
        return yScale(d[0]) - yScale(d[1])
      })
      .attr('width', xScale.bandwidth())

    // Create x-axis
    const xAxis = d3.axisBottom(xScale)
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(40,${height + 10})`)
      .call(xAxis)

    // Create y-axis
    const yAxis = d3.axisLeft(yScale)
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(40, 10)')
      .call(yAxis)
  }, [])

  return (
    <svg
      ref={svgRef}
      style={{ paddingTop: '20px' }}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    ></svg>
  )
}
