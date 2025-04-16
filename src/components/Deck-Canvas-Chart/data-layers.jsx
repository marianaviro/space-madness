import { PathLayer, TextLayer, IconLayer } from "@deck.gl/layers";
import { PathStyleExtension } from "@deck.gl/extensions";
import { COORDINATE_SYSTEM } from "@deck.gl/core";

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

export const makeIconLayer = (
  sats,
  hovered,
  onHover,
  iconUrl,
  iconSize,
  width,
  height,
  step
) => {
  const ICON_MAPPING = {
    "satellite-comm-other": {
      "x": 1,
      "y": 1,
      "width": 24,
      "height": 24,
      "anchorY": 24,
    },
    "satellite-comm": {
      "x": 27,
      "y": 1,
      "width": 24,
      "height": 24,
      "anchorY": 24,
    },
    "satellite": {
      "x": 53,
      "y": 1,
      "width": 24,
      "height": 24,
      "anchorY": 24,
    },
    // satellite: {
    //   x: 0,
    //   y: 0,
    //   width: iconSize,
    //   height: iconSize,
    //   anchorX: iconSize / 2,
    //   anchorY: iconSize / 2,
    // },
  };

  return new IconLayer({
    id: "sat-icons",
    data: sats,
    pickable: true,
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,

    iconAtlas: iconUrl,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => {
      if (step === 0) {
        console.log(d);
        if (d.year == 1974) return "satellite-comm";
        else return "satellite";
      } else if (step === 1) {
        if (d.use === "Commercial") return "satellite-comm";
        else if (d.use.includes("Commercial")) return "satellite-comm-other";
        else return "satellite";
      } else {
        return "satellite";
      }
    },
    sizeScale: 1,
    getSize: () => iconSize,

    // flip Y
    getPosition: (d) => [d.x, d.y + 30],

    // fade others out to 10% when one is hovered
    getColor: (d) => {
      if (!hovered) {
        return [200, 200, 200, 255];
      }
      return d.name === hovered.name ? [255, 140, 0, 255] : [200, 200, 200, 25];
    },
    updateTriggers: {
      getColor: [hovered],
    },

    onHover,
  });
};
