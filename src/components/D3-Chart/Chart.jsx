/* eslint-disable react/prop-types */

import * as d3 from "d3";
import { useState } from "react";
import SatelliteTooltip from "../Satellite-Tooltip/Tooltip";
import { processSats } from "../../utils/utils";

export default function Chart({ data, margin, height, width }) {
  const marginLeft = margin.left;
  const marginRight = margin.right;
  const marginTop = margin.top;

  // Filter and process the data
  const sats = processSats(data);
  console.log("Satellites: ", sats);

  const years = sats.map((d) => d.year);

  const xAxis = d3
    .scaleLinear()
    .domain([d3.min(years), d3.max(years)])
    .range([marginLeft, width - marginRight]);

  xAxis.ticks(10);
  console.log("TICKS: ");

  // Rollup? group and count?
  // const yAxis = d3
  //   .scaleBand()
  //   .domain(countries)
  //   .range([marginTop, height - marginBottom])
  //   .padding(0.5);

  const [hovered, setHovered] = useState(null);
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [contractor, setContractor] = useState(null);
  const [use, setUse] = useState(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    text: null,
  });

  const handleMouseOver = (event, d) => {
    const [mouseX, mouseY] = d3.pointer(event);
    setTooltip({
      show: true,
      x: mouseX,
      y: mouseY,
      text: {
        name: d.name,
        launched: d.date_launch,
        country: d.country,
        use: d.use,
        contractor: d.contractor,
      },
    });
  };
  const handleMouseMove = (event) => {
    const [mouseX, mouseY] = d3.pointer(event);
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      x: mouseX,
      y: mouseY,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, text: "" });
  };

  return (
    <div className="chart">
      <svg width={width} height={height}>
        <g transform={`translate(0, ${marginTop})`}>
          {sats.map((d, i) => {
            return (
              <image
                key={i}
                x={xAxis(d.year)}
                y={i}
                width="10"
                height="10"
                href="sat.svg"
                opacity={hovered && d.name !== hovered ? 0.1 : 1}
                onMouseOver={(e) => {
                  setHovered(d.name);
                  handleMouseOver(e, d);
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  handleMouseLeave();
                }}
                onMouseMove={(e) => handleMouseMove(e)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </g>

        {/* X Axis (Top) */}
        <g transform={`translate(0, ${marginTop})`}>
          {xAxis.ticks().map((tick, i) => {
            console.log(tick);
            return (
              <g key={tick}>
                <line
                  x1={xAxis(tick)}
                  x2={xAxis(tick)}
                  y1={0}
                  y2={800}
                  stroke="#fff"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="4 8"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  x={xAxis(tick)}
                  y={-20}
                  key={tick}
                >
                  {tick}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      {/* Tooltip */}
      {tooltip.show && (
        <SatelliteTooltip
          x={tooltip.x}
          y={tooltip.y}
          text={{
            name: tooltip.text.name,
            country: tooltip.text.country,
            use: tooltip.text.use,
            contractor: tooltip.text.contractor,
            launched: tooltip.text.year,
          }}
        />
      )}
    </div>
  );
}
