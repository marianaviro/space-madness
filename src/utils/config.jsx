export const DATA_URLS = {
  0: new URL(import.meta.env.VITE_DATA_URL_CHAPTER0, import.meta.url).href,
  1: new URL(import.meta.env.VITE_DATA_URL_CHAPTER1, import.meta.url).href,
  2: new URL(import.meta.env.VITE_DATA_URL_CHAPTER2, import.meta.url).href,
};

export const ICON_URL = new URL(import.meta.env.VITE_ICON_URL, import.meta.url)
  .href;

export const STYLES = {
  "width": 1000,
  "height": 1000,
  "iconSize": 18,
  "margin": { top: 50, right: 10, bottom: 50, left: 10 },
};

export const ICON_MAPPING = {
  "decayed": {
    "x": 0,
    "y": 0,
    "width": 30,
    "height": 30,
    "anchorX": 30,
    "anchorY": 30,
  },
  "ride": {
    "x": 88,
    "y": 26,
    "width": 30,
    "height": 26,
    "anchorX": 30,
    "anchorY": 26,
  },
  "sat-comm-other": {
    "x": 0,
    "y": 30,
    "width": 44,
    "height": 26,
    "anchorX": 44,
    "anchorY": 26,
  },
  "sat-comm": {
    "x": 30,
    "y": 0,
    "width": 44,
    "height": 26,
    "anchorX": 44,
    "anchorY": 26,
  },
  "satellite": {
    "x": 44,
    "y": 26,
    "width": 44,
    "height": 26,
    "anchorX": 44,
    "anchorY": 26,
  },

  "space-rider-private": {
    "x": 112,
    "y": 0,
    "width": 13,
    "height": 24,
    "anchorX": 13,
    "anchorY": 24,
  },
  "space-rider-tourist": {
    "x": 118,
    "y": 24,
    "width": 13,
    "height": 24,
    "anchorX": 13,
    "anchorY": 24,
  },
  "space-rider": {
    "x": 125,
    "y": 0,
    "width": 13,
    "height": 24,
    "anchorX": 13,
    "anchorY": 24,
  },
  "starlink": {
    "x": 74,
    "y": 0,
    "width": 38,
    "height": 26,
    "anchorX": 38,
    "anchorY": 26,
  },
};
