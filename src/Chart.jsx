import * as d3 from "d3";
import { useState } from "react";

export default function Chart({ data }) {
  const marginLeft = 20;
  const width = 1000;
  const height = 600;
  const marginRight = 20;
  const marginTop = 60;
  const marginBottom = 20;

  const heightBound = height - marginTop - marginBottom;
  const widthBound = width - marginLeft - marginRight;

  // Filter and process the data
  const sats = data
    .filter((d) => d["year"])
    .map((d, i) => {
      let date = new Date(d["Date of Launch"]);
      return {
        name: d["Name of Satellite, Alternate Names"],
        country: d["Country of Operator/Owner"],
        owner: d["Operator/Owner"],
        use: d["Users"],
        purpose: d["Purpose"],
        contractor: d["Contractor"],
        country_contractor: d["Country of Contractor"],
        lifetime: d["Expected Lifetime (yrs.)"],
        date_launch: date.getFullYear(),
        year: d["year"],
      };
    });

  const test = sats.filter((d) => d.country == "USA");
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

        {/* Tooltip */}
        {tooltip.show && (
          <g transform={`translate(${tooltip.x},${tooltip.y})`}>
            <rect
              x="10"
              y="-32"
              width="150"
              height="200"
              fill="white"
              stroke="black"
              rx="5"
              ry="5"
              pointerEvents="none"
            />
            <text x="15" y="-20" fontSize="11px" pointerEvents="none">
              <tspan x="15" dy="0">
                Name:
              </tspan>{" "}
              <tspan x="15" dy="1.3em">
                {tooltip.text.name}
              </tspan>{" "}
              <tspan x="15" dy="1.4em">
                Country:
              </tspan>{" "}
              <tspan x="15" dy="1.3em">
                {tooltip.text.country}
              </tspan>{" "}
              <tspan x="15" dy="1.4em">
                Use:
              </tspan>{" "}
              <tspan x="15" dy="1.3em">
                {tooltip.text.use}
              </tspan>{" "}
              <tspan x="15" dy="1.4em">
                Contractor:
              </tspan>{" "}
              <tspan x="15" dy="1.3em">
                {tooltip.text.contractor}
              </tspan>{" "}
              <tspan x="15" dy="1.4em">
                Launched:
              </tspan>{" "}
              <tspan x="15" dy="1.3em">
                {tooltip.text.launched}
              </tspan>{" "}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
