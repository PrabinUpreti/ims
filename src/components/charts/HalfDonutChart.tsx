/* eslint-disable */
// @ts-nocheck
import { Col, Row } from 'antd'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface PropsInterface {
  id?: string
  data?: { label: string; value: string | number }[]
}

const HalfDonutChart = (props: PropsInterface) => {
  const { id, data } = props
  // const [loaded, setLoaded] = useState(false)

  const HEIGHT = 260
  const WIDTH = 360

  const OFFSET_TOP = 0
  const OFFSET_BOTTOM = 30
  const RADIUS = Math.min(WIDTH, HEIGHT) / 2
  const COLOR_RANGE = ['#22d3ee', '#f43f5e', '#4ade80']
  const initialized = useRef(false)

  function createDonut() {
    const colors = d3.scaleOrdinal().range(COLOR_RANGE)
    const canvas = setCanvas()
    const arc = setArc()
    const pie = setPie()

    setArcs(canvas, arc, pie, colors)
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      createDonut()
    }
  }, [])

  const setArc = () => d3.arc().innerRadius(50).outerRadius(RADIUS)

  function setArcs(canvas, arc, pie, colors) {
    const arcs = canvas
      .selectAll('g.slice') //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append('svg:g') //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr('class', 'slice') //allow us to style things in the slices (like text)

    arcs
      .append('svg:path')
      .attr('fill', function (d, i) {
        return colors(i)
      }) //set the color for each slice to be chosen from the color function defined above
      .attr('d', arc)

    //We center the text inside the arc
    arcs
      .append('svg:text')
      .attr('transform', function (d) {
        const textWidth = getTextWidth((d.value.toFixed(2) + '%').toString(), 'Roboto')
        console.log(
          'd.value: ' +
            d.value +
            ' textWidth: ' +
            textWidth +
            ' arc.centroid(d)[0]: ' +
            arc.centroid(d)[0]
        )
        const x = arc.centroid(d)[0] - textWidth / 2
        const y = arc.centroid(d)[1]
        return 'translate(' + x + ',' + y + ')'
      })
      .attr('class', 'label-half-donut')
      .attr('dy', '.35em')
      .attr('text-anchor', function (d) {
        // are we past the center?
        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : 'start'
      })
      .text(function (d) {
        return d.value.toFixed(2)
      })

    function getTextWidth(text, font) {
      const canvas =
        getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
      const context = canvas.getContext('2d')
      context.font = font
      const metrics = context.measureText(text)
      return metrics.width
    }
  }

  function setCanvas() {
    const svg = d3
      .select('#' + id)
      .append('svg')
      .style('background-color', '#fff')
      .style('color', '#FFFFFF') //With this we've got the color of the axis too
      .data([data]) //associate our data with the document
      .attr('width', 'full') //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr('height', 200)
      .append('svg:g') //make a group to hold our pie chart
      .attr(
        'transform',
        'translate(' +
          WIDTH / 2 +
          ',' +
          (HEIGHT + OFFSET_TOP + OFFSET_BOTTOM + 50) / 2 +
          ')'
      )

    return svg
  }

  function setPie() {
    return d3
      .pie() //this will create arc data for us given a list of values
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180))
      .padAngle(0.02) // some space between slices
      .sort(null) //No! we don't want to order it by size
      .value(function (d) {
        return d.value
      })
  }

  return (
    <div className="chart-half-donut-outer-container">
      <div className="chart-half-donut-container" id={id}></div>
      <Row gutter={[16, 16]}>
        {data &&
          data.map((elem, index) => (
            <Col span={8} className="border">
              <div className="chart-half-donut">
                <span className="legend-value">{elem.value}</span>
                <div className="legend">
                  <div
                    className="legend-dot"
                    style={{ background: COLOR_RANGE[index] }}
                  ></div>
                  <span className="legend-label">{elem.label}</span>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default HalfDonutChart
