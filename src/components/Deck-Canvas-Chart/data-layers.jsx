import { PathLayer, TextLayer, IconLayer } from "@deck.gl/layers";
import { PathStyleExtension } from "@deck.gl/extensions";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import {
  satCatOptions,
  satUseOptions,
  spaceRidesOptions,
} from "../../utils/icon-utils.jsx";

export const createLayers = (
  positions,
  slide,
  hovered,
  onHover,
  xScale,
  yScale
) => {
  if (slide.chapter == 0)
    return createSatCatLayers(positions, slide, hovered, onHover);
  else if (slide.chapter == 1)
    return createSatUseLayers(positions, slide, hovered, onHover);
  else if (slide.chapter == 2)
    return createSpaceRidesLayers(positions, slide, hovered, onHover);
};

export const createSatCatLayers = (positions, slide, hovered, onHover) => {
  return [new IconLayer(satCatOptions(positions, slide, hovered, onHover))];
};

export const createSatUseLayers = (positions, slide, hovered, onHover) => {
  return [new IconLayer(satUseOptions(positions, slide, hovered, onHover))];
};

export const createSpaceRidesLayers = (positions, slide, hovered, onHover) => {
  return [new IconLayer(spaceRidesOptions(positions, slide, hovered, onHover))];
};

export const makeGridLinesLayer = (xScale, height, margin) => {
  const ticks = xScale.ticks(10);
  const data = ticks.map((t) => ({
    path: [
      [xScale(t), margin.top],
      [xScale(t), height - margin.bottom],
    ],
  }));

  return new PathLayer({
    id: "grid-lines",
    data,
    getPath: (d) => d.path,
    getColor: [255, 255, 255],
    getWidth: 1,
    getDashArray: [4, 8],
    dashJustified: true,
    extensions: [new PathStyleExtension({ dash: true })],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
  });
};

export const makeGridLabelsLayer = (xScale, margin) => {
  const ticks = xScale.ticks(10);
  const data = ticks.map((t) => ({
    position: [xScale(t), margin.top - 10],
    text: `${t}`,
  }));

  return new TextLayer({
    id: "grid-labels",
    data,
    getPosition: (d) => d.position,
    getText: (d) => d.text,
    getSize: 12,
    getAngle: 0,
    getTextAnchor: "middle",
    getAlignmentBaseline: "bottom",
    getColor: [255, 255, 255],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
  });
};
