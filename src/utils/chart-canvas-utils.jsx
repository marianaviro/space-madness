import * as d3 from "d3";
import { processSats } from "./utils";

export const prepareData = (data, margin, width, height, iconSize) => {
  const sats = processSats(data);

  // Extract unique years and define xScale
  const years = Array.from(new Set(sats.map((d) => d.year))).sort(d3.ascending);

  const x = d3
    .scaleLinear()
    .domain(d3.extent(years))
    .range([margin.left, width - margin.right]);

  const grouped = d3.group(sats, (d) => d.year);

  const ySpacing = iconSize + 4;

  // Position each satellite
  const positioned = [];
  for (const [year, satGroup] of grouped) {
    const xPos = x(year);
    satGroup.forEach((d, i) => {
      d.x = xPos;
      d.y = margin.top + i * ySpacing;

      // Prevent from going beyond chart bounds
      if (d.y + iconSize / 2 < height - margin.bottom) {
        positioned.push(d);
      }
    });
  }

  return { sats: positioned, x };
};

// Load image once
export const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });

export const draw = (
  ctx,
  sats,
  image,
  hovered,
  xScale,
  width,
  height,
  margin,
  iconSize
) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, width, height);

  // Draw vertical dashed lines
  const ticks = xScale.ticks(10);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 8]);

  ticks.forEach((tick) => {
    const x = xScale(tick);
    ctx.beginPath();
    ctx.moveTo(x, margin.top);
    ctx.lineTo(x, height);
    ctx.stroke();

    // Year label
    ctx.fillStyle = "#fff";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(tick, x, margin.top - 30);
  });

  ctx.setLineDash([]); // reset

  // Draw satellites
  sats.forEach((d) => {
    ctx.globalAlpha = hovered && hovered.name !== d.name ? 0.1 : 1;
    ctx.drawImage(
      image,
      d.x - iconSize / 2,
      d.y - iconSize / 2,
      iconSize,
      iconSize
    );
  });

  ctx.globalAlpha = 1;
};
