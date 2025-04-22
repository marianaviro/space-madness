import { PathLayer, TextLayer, IconLayer } from "@deck.gl/layers";
import { PathStyleExtension } from "@deck.gl/extensions";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import {
  satCatOptions,
  satUseOptions,
  spaceRidesOptions,
} from "../../utils/icon-options.jsx";
import { STYLES } from "../../utils/config.jsx";

// helper to get ticks for linear scales or domain for band scales
function getScaleTicks(scale, count = 10) {
  return typeof scale.ticks === "function"
    ? scale.ticks(count)
    : scale.domain();
}

// helper to center in each band
function getOffset(scale) {
  return typeof scale.bandwidth === "function" ? scale.bandwidth() / 2 : 0;
}

export const createLayers = (
  positions,
  slide,
  hovered,
  onHover,
  xScale,
  yScale
) => {
  switch (slide.chapter) {
    case 0:
      return createSatCatLayers(positions, slide, hovered, onHover, xScale);
    case 1:
      return createSatUseLayers(positions, slide, hovered, onHover, xScale);
    case 2:
      return createSpaceRidesLayers(positions, slide, hovered, onHover, xScale);
    default:
      return [];
  }
};

const createSatCatLayers = (positions, slide, hovered, onHover, xScale) => {
  let layers = [
    new IconLayer(satCatOptions(positions, slide, hovered, onHover)),
  ];
  if (slide.type == "timeline") {
    layers.push(makeGridLinesLayer(xScale));
    layers.push(makeGridLabelsLayer(xScale));
  }
  return layers;
};

const createSatUseLayers = (positions, slide, hovered, onHover, xScale) => {
  let layers = [
    new IconLayer(satUseOptions(positions, slide, hovered, onHover)),
  ];
  if (slide.type == "timeline") {
    layers.push(makeGridLinesLayer(xScale));
    layers.push(makeGridLabelsLayer(xScale));
  }
  return layers;
};

const createSpaceRidesLayers = (positions, slide, hovered, onHover, xScale) => {
  let layers = [
    new IconLayer(spaceRidesOptions(positions, slide, hovered, onHover)),
  ];
  if (slide.type == "timeline") {
    layers.push(makeGridLinesLayer(xScale));
    layers.push(makeGridLabelsLayer(xScale));
  }
  return layers;
};

export const makeGridLinesLayer = (xScale) => {
  const ticks = getScaleTicks(xScale, 10);
  const offset = getOffset(xScale);

  const data = ticks.map((t) => ({
    path: [
      [xScale(t) + offset, STYLES.margin.top],
      [xScale(t) + offset, STYLES.height - STYLES.margin.bottom],
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

export const makeGridLabelsLayer = (xScale) => {
  const ticks = getScaleTicks(xScale, 10);
  const offset = getOffset(xScale);

  const data = ticks.map((t) => ({
    position: [xScale(t) + offset, STYLES.margin.top - 10],
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
