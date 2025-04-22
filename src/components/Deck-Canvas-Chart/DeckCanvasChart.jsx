/* eslint-disable react/prop-types */
import { useState } from "react";
import DeckGL from "@deck.gl/react";
import { OrthographicView } from "@deck.gl/core";
import { prepareData } from "../../utils/chart-canvas-utils";
import { prepareTooltip } from "../../utils/tooltip-utils.jsx";
import SatelliteTooltip from "../Satellite-Tooltip/Tooltip";
import { createLayers } from "./data-layers";
import { STYLES } from "../../utils/config.jsx";

export default function DeckCanvasChart({ slide, data }) {
  const { positions, x: xScale, y: yScale } = prepareData(slide, data);

  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, text: null });

  const onHover = (info) => {
    if (info.object) {
      setHovered(info.object);
      setTooltip(prepareTooltip(slide, info));
    } else {
      setHovered(null);
      setTooltip((t) => ({ ...t, text: null }));
    }
  };

  const layers = createLayers(
    positions,
    slide,
    hovered,
    onHover,
    xScale,
    yScale
  );

  // orthographic camera
  const [initialViewState, setInitialViewState] = useState({
    target: [STYLES.width / 2, STYLES.height / 2, 0],
    zoom: 0,
  });

  return (
    <div
      style={{
        position: "relative",
        width: STYLES.width,
        height: STYLES.height,
      }}
    >
      <DeckGL
        width={STYLES.width}
        height={STYLES.height}
        views={[
          new OrthographicView({
            id: "ortho",
            x: 0,
            y: 0,
            width: STYLES.width,
            height: STYLES.height,
            orthographic: true,
          }),
        ]}
        initialViewState={initialViewState}
        controller={{ dragPan: true }}
        layers={layers}
        style={{ backgroundColor: "#121213" }}
        getCursor={({ isDragging, isHovering }) => {
          if (isDragging) return "grabbing";
          if (isHovering) return "url(/cursor-look.svg) 34 24, pointer";
          return "url(/cursor.svg) 48 17, auto";
        }}
      />
      {tooltip.text && (
        <SatelliteTooltip x={tooltip.x} y={tooltip.y} text={tooltip.text} />
      )}
    </div>
  );
}
