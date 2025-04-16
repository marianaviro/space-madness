/* eslint-disable react/prop-types */
import { useState } from "react";
import DeckGL from "@deck.gl/react";
import { OrthographicView } from "@deck.gl/core";
import { prepareData } from "../../utils/chart-canvas-utils";
import SatelliteTooltip from "../Satellite-Tooltip/Tooltip";
import {
  makeGridLinesLayer,
  makeGridLabelsLayer,
  makeIconLayer,
} from "./data-layers";

export default function DeckCanvasChart({
  data,
  width,
  height,
  iconSize,
  margin,
  iconUrl,
  step,
}) {
  // compute positions
  const { sats, x: xScale } = prepareData(
    data,
    margin,
    width,
    height,
    iconSize
  );

  // hover + tooltip
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, text: null });

  const onHover = (info) => {
    if (info.object) {
      setHovered(info.object);
      setTooltip({
        x: info.x,
        y: info.y,
        text: {
          name: info.object.name,
          country: info.object.country,
          use: info.object.use,
          contractor: info.object.contractor,
          launched: info.object.year,
        },
      });
    } else {
      setHovered(null);
      setTooltip((t) => ({ ...t, text: null }));
    }
  };

  // instantiate layers
  const layers = [
    makeGridLinesLayer(xScale, height, margin),
    makeGridLabelsLayer(xScale, margin),
    makeIconLayer(
      sats,
      hovered,
      onHover,
      iconUrl,
      iconSize,
      width,
      height,
      step
    ),
  ];

  // orthographic camera
  const [viewState, setViewState] = useState({
    target: [width / 2, height / 2, 0],
    zoom: 0,
  });

  return (
    <div style={{ position: "relative", width: width, height: height }}>
      <DeckGL
        width={width}
        height={height}
        views={[
          new OrthographicView({
            id: "ortho",
            x: 0,
            y: 0,
            width: width,
            height: height,
            orthographic: true,
          }),
        ]}
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        controller
        layers={layers}
        style={{ backgroundColor: "#121213" }}
      />
      {tooltip.text && (
        <SatelliteTooltip x={tooltip.x} y={tooltip.y} text={tooltip.text} />
      )}
    </div>
  );
}
