import * as d3 from "d3";
import { STYLES } from "./config.jsx";

export const prepareData = (slide, data) => {
  let xScale, yScale, positions;
  let processedData = data;

  if (slide.type === "timeline") {
    const years = Array.from(new Set(processedData.map((d) => d.year))).sort(
      d3.ascending
    );
    xScale = d3
      .scaleLinear()
      .domain(d3.extent(years))
      .range([STYLES.margin.left, STYLES.width - STYLES.margin.right]);

    // group by year, stagger vertically
    const grouped = d3.group(processedData, (d) => d.year);
    const ySpacing = STYLES.iconSize + 4;
    positions = [];

    for (const [year, satGroup] of grouped) {
      const xPos = xScale(year);
      satGroup.forEach((d, i) => {
        const y = STYLES.margin.top + i * ySpacing;

        //Remove this to show all satellites
        if (y + STYLES.iconSize / 2 < STYLES.height - STYLES.margin.bottom) {
          positions.push({ ...d, x: xPos, y });
        }
        //Uncomment this to constrain Y boundary
        positions.push({ ...d, x: xPos, y });
      });
    }
    return { positions, x: xScale };
  }

  if (slide.type === "waffle") {
    const numCols = slide.numCols || STYLES.width / 10;
    const total = processedData.length;
    const numRows = Math.ceil(total / numCols);

    xScale = d3
      .scaleBand()
      .domain(d3.range(numCols))
      .range([STYLES.margin.left, STYLES.width - STYLES.margin.right])
      .padding(0.1);

    yScale = d3
      .scaleBand()
      .domain(d3.range(numRows))
      .range([STYLES.margin.top, STYLES.height - STYLES.margin.bottom])
      .padding(0.1);

    positions = processedData.map((d, i) => {
      const col = i % numCols;
      const row = Math.floor(i / numCols);
      return {
        ...d,
        x: xScale(col) + xScale.bandwidth() / 2,
        y: yScale(row) + yScale.bandwidth() / 2,
      };
    });

    return { positions, x: xScale, y: yScale };
  }
  return { positions: [], x: xScale, y: yScale };
};
