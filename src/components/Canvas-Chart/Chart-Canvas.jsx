/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { draw, prepareData, loadImage } from "../../utils/chart-canvas-utils";
import SatelliteTooltip from "../Satellite-Tooltip/Tooltip";

export default function CanvasChart({
  data,
  iconSize,
  width,
  height,
  margin,
  iconUrl,
}) {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null); // full hovered satellite object
  const [tooltipX, setTooltipX] = useState(0); // mouse x
  const [tooltipY, setTooltipY] = useState(0); // mouse y

  const setupMouseEvents = (canvas, sats, ctx, image, xScale) => {
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const hit = sats.find(
        (d) =>
          Math.abs(d.x - mx) < iconSize / 2 && Math.abs(d.y - my) < iconSize / 2
      );

      if (hit) {
        setHovered(hit);
        setTooltipX(mx);
        setTooltipY(my);
      } else {
        setHovered(null);
      }

      draw(ctx, sats, image, hit, xScale, width, height, margin, iconSize);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let removeListener;

    loadImage(iconUrl).then((image) => {
      const { sats, x } = prepareData(data, margin, width, height, iconSize);
      draw(ctx, sats, image, null, x, width, height, margin, iconSize);
      removeListener = setupMouseEvents(canvas, sats, ctx, image, x);
    });

    return () => {
      if (removeListener) removeListener();
    };
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: "block", background: "#111", borderRadius: "8px" }}
      />
      {hovered && (
        <SatelliteTooltip
          x={tooltipX}
          y={tooltipY}
          text={{
            name: hovered.name,
            country: hovered.country,
            use: hovered.use,
            contractor: hovered.contractor,
            launched: hovered.year,
          }}
        />
      )}
    </div>
  );
}
