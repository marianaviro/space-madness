import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { ICON_URL, ICON_MAPPING, STYLES } from "./config.jsx";

export const satCatOptions = (positions, slide, hovered, onHover) => {
  return {
    id: slide.id,
    data: positions,
    pickable: true,
    sizeUnits: "meters",
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    iconAtlas: ICON_URL,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => {
      return "satellite";
    },
    sizeScale: 0.5,
    getSize: () => STYLES.iconSize,

    getPosition: (d) => [d.x, d.y + 30],

    getColor: (d) => {
      if (!hovered) {
        return [200, 200, 200, 255];
      }
      return d.id === hovered.id ? [255, 200, 200, 255] : [200, 200, 200, 25];
    },
    updateTriggers: {
      getColor: [hovered],
    },
    onHover,
  };
};

export const satUseOptions = (positions, slide, hovered, onHover) => {
  return {
    id: slide.id,
    data: positions,
    pickable: true,
    sizeUnits: "meters",
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    iconAtlas: ICON_URL,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => {
      if (!d.use) return "";

      if (slide.step == 0) {
        return "satellite";
      } else if (slide.step == 1) {
        if (d.use == "Commercial") return "sat-comm";
        else if (d.use.includes("Commercial")) return "sat-comm-other";
        else return "satellite";
      }
    },
    sizeScale: 0.5,
    getSize: () => STYLES.iconSize,

    getPosition: (d) => [d.x, d.y + 30],

    getColor: (d) => {
      if (!hovered) {
        return [200, 200, 200, 255];
      }
      return d.id === hovered.id ? [255, 140, 0, 255] : [200, 200, 200, 25];
    },
    updateTriggers: {
      getColor: [hovered],
    },
    onHover,
  };
};

export const spaceRidesOptions = (positions, slide, hovered, onHover) => {
  return {
    id: slide.id,
    data: positions,
    pickable: true,
    sizeUnits: "meters",
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    iconAtlas: ICON_URL,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => {
      if (slide.step == 0) {
        return "space-rider";
      } else if (slide.step == 1) {
        if (d.category.includes("P")) {
          if (d.category == "PT") return "space-rider-tourist";
          else return "space-rider-private";
        } else {
          return "space-rider";
        }
      }
    },
    sizeScale: 0.8,
    getSize: () => STYLES.iconSize,

    getPosition: (d) => [d.x, d.y + 30],

    getColor: (d) => {
      if (!hovered) {
        return [200, 200, 200, 255];
      }
      return d.id === hovered.id ? [255, 140, 0, 255] : [200, 200, 200, 25];
    },
    updateTriggers: {
      getColor: [hovered],
    },
    onHover,
  };
};
