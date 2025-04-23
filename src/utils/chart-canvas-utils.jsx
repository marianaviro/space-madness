import * as d3 from "d3";
import { STYLES } from "./config.jsx";

export const prepareData = (slide, data) => {
  let xScale, yScale;
  const processedData = data;

  const positions = [];

  if (slide.type === "timeline") {
    const years = Array.from(new Set(processedData.map((d) => d.year))).sort(
      d3.ascending
    );
    xScale = d3
      .scaleLinear()
      .domain(d3.extent(years))
      .range([STYLES.margin.left, STYLES.width - STYLES.margin.right]);

    const grouped = d3.group(processedData, (d) => d.year);
    const ySpacing = STYLES.iconSize + 4;

    grouped.forEach((entries, year) => {
      const xPos = xScale(year);
      entries.forEach((d, i) => {
        const y = STYLES.margin.top + i * ySpacing;
        positions.push({ ...d, x: xPos, y });
      });
    });

    return { positions, x: xScale };
  } else if (slide.type === "waffle") {
    let layoutData = processedData;
    if (slide.ops.groupBy) {
      layoutData = [...processedData].sort((a, b) => {
        if (!a[slide.ops.groupBy] && !b[slide.ops.groupBy]) return 0;
        if (a[slide.ops.groupBy] < b[slide.ops.groupBy]) return -1;
        if (a[slide.ops.groupBy] > b[slide.ops.groupBy]) return 1;
        return 0;
      });
    }
    const numCols =
      slide.ops.numCols ||
      Math.floor(
        (STYLES.width - STYLES.margin.left - STYLES.margin.right) /
          (STYLES.iconSize + 4)
      );
    const xSpacing = STYLES.iconSize + 4;
    const ySpacing = STYLES.iconSize + 4;
    if (slide.id == "satcat-tonnes") {
      layoutData = layoutData.slice(0, 1350);
    }

    layoutData.forEach((d, i) => {
      const col = i % numCols;
      const row = Math.floor(i / numCols);
      const x = STYLES.margin.left + col * xSpacing;
      const y = STYLES.margin.top + row * ySpacing;
      positions.push({ ...d, x, y });
    });
    return { positions };
  }
  return { positions: [], x: xScale, y: yScale };
};
