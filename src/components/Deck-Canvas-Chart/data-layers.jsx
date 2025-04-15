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
  height
) => {
  const ICON_MAPPING = {
    satellite: {
      x: 0,
      y: 0,
      width: iconSize,
      height: iconSize,
      anchorX: iconSize / 2,
      anchorY: iconSize / 2,
    },
  };

  return new IconLayer({
    id: "sat-icons",
    data: sats,
    pickable: true,
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,

    iconAtlas: iconUrl,
    iconMapping: ICON_MAPPING,
    getIcon: () => "satellite",
    sizeScale: 1,
    getSize: () => iconSize,

    // flip Y
    getPosition: (d) => [d.x, height - d.y],

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
