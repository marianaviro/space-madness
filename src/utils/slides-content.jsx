import { STYLES } from "./config.jsx";

export const slidesContent = [
  {
    "id": "satcat-all",
    "chapter": 0,
    "step": 0,
    "data": "/data/satcat.csv",
    "type": "waffle",
    "styles": STYLES,
    "ops": {
      "numCols": 20,
      "bins": 100,
    },
    "text": "Since Sputnik I, humanity has sent 63,108 satellites to space.",
    "legend": [
      {
        "name": "100 satellites",
        "icon": "/sat.svg",
      },
    ],
  },
  {
    "id": "satcat-decayed",
    "chapter": 0,
    "step": 1,
    "data": "/data/satcat.csv",
    "ops": {
      "numCols": 20,
      "bins": 100,
      "filter": "decayed",
    },
    "type": "timeline",
    "styles": STYLES,
    "text":
      "A lot of them have either returned back to Earth (sometimes injuring people) or have dissolved into Earth's lower atmosphere.",
    "legend": [
      {
        "name": "100 decayed satellites",
        "icon": "/sat.svg",
      },
      {
        "name": "100 active satellites",
        "icon": "/sat.svg",
      },
    ],
  },
  {
    "id": "satuse-all",
    "chapter": 1,
    "step": 0,
    "data": "/data/clean_sat.csv",
    "type": "timeline",
    "styles": STYLES,
    "text":
      "The Union of Concerned Scientists has documented the use of 7,562 satellites.",
    "legend": [
      {
        "name": "100 satellites",
        "icon": "/sat.svg",
      },
    ],
  },
  {
    "id": "satuse-use",
    "chapter": 1,
    "step": 1,
    "data": "/data/clean_sat.csv",
    "ops": {
      "bins": 100,
    },
    "type": "timeline",
    "styles": STYLES,
    "text": "To this date X,XXX have entirely or partly commercial purposes.",
    "legend": [
      {
        "name": "100 non-commercial satellites",
        "icon": "/sat.svg",
      },
      {
        "name": "100 commercial satellites",
        "icon": "/sat-comm.svg",
      },
      {
        "name": "100 mixed use satellites",
        "icon": "/sat-comm-other.svg",
      },
    ],
  },
  {
    "id": "satuse-starlink",
    "chapter": 1,
    "step": 2,
    "data": "/data/clean_sat.csv",
    "type": "waffle",
    "ops": {
      // "numCols": 70,
      "bins": 100,
      "filter": "starlink",
    },
    "styles": STYLES,
    "text": "These are all satellites Starlink has sent to space",
    "legend": [
      {
        "name": "100 Starlink satellites",
        "icon": "/starlink.svg",
      },
      {
        "name": "100 non-Starlink satellites",
        "icon": "/sat.svg",
      },
    ],
  },
  {
    "id": "space-rides-all",
    "chapter": 2,
    "step": 0,
    "data": "/data/rides-clean.csv",
    "type": "waffle",
    "ops": {
      "numCols": 40,
      "bins": 100,
    },
    "styles": STYLES,
    "text": "Hiiii. space-rides-all",
  },
  {
    "id": "space-rides-category",
    "chapter": 2,
    "step": 1,
    "data": "/data/rides-clean.csv",
    "type": "waffle",
    "ops": {
      "numCols": 40,
      "bins": 100,
    },
    "styles": STYLES,
    "text": "Hiiii. space-rides-all",
    "legend": [
      {
        "name": "1 space rider",
        "icon": "/space-rider.svg",
      },
    ],
  },
  {
    "id": "space-rides-timeline",
    "chapter": 2,
    "step": 2,
    "data": "/data/rides-clean.csv",
    "type": "timeline",
    "styles": STYLES,
    "text": "Hiiii. space-rides-all",
    "legend": [
      {
        "name": "1 public official",
        "icon": "/space-rider.svg",
      },
      {
        "name": "1 private contractor",
        "icon": "/space-rider-private.svg",
      },
      {
        "name": "1 tourist",
        "icon": "/space-rider-tourist.svg",
      },
    ],
  },
];
