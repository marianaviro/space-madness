import { STYLES } from "./config.jsx";

const GREEN = "#C1F087";
const ORANGE = "#FF5C21";
const PINK = "#E043FF";
const WHITE = "#ffffff";
const BLUE = "#5DFFDF";

export const slidesContent = [
  {
    "id": "satcat-all",
    "chapter": 0,
    "step": 0,
    "data": "/data/satcat.csv",
    "type": "waffle",
    "subtype": "number",
    "styles": STYLES,
    "ops": {
      "numCols": 30,
      "bins": 100,
    },
    "totals": [
      {
        "numItems": "63,108",
        "itemType": "Satellites sent to space",
        "color": GREEN,
      },
    ],
    "text": "Since Sputnik I, we have sent a ton of stuff to space. ",
    "legend": [
      {
        "name": "100",
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
      "numCols": 30,
      "bins": 100,
      "groupBy": "status",
    },
    "type": "waffle",
    "subtype": "number",
    "styles": STYLES,
    "totals": [
      {
        "numItems": "33,386",
        "itemType": "Decayed satellites",
        "color": ORANGE,
      },
      {
        "numItems": "30,080",
        "itemType": "Active satellites",
        "color": GREEN,
      },
    ],
    "text":
      "A lot of them have either returned back to Earth (sometimes injuring people) or have dissolved into Earth's lower atmosphere. A whole other lot is still there.",
    "legend": [
      {
        "name": "100",
        "icon": "/decayed.svg",
      },
      {
        "name": "100",
        "icon": "/sat.svg",
      },
    ],
  },
  {
    "id": "satcat-tonnes",
    "chapter": 0,
    "step": 2,
    "data": "/data/satcat.csv",
    "type": "waffle",
    "subtype": "number",
    "styles": STYLES,
    "ops": {
      "numCols": 30,
      "bins": 100,
    },
    "totals": [
      {
        "numItems": "13,500",
        "itemType": "Tonnes of space objects",
        "color": ORANGE,
      },
    ],
    "text":
      "And we're still not sure what's the environmental impact of all that, but just the amount of stuff is dire.",
    "legend": [
      {
        "name": "10 tonnes",
        "icon": "/ride.svg",
      },
    ],
  },
  {
    "id": "satcat-timeline",
    "chapter": 0,
    "step": 3,
    "data": "/data/satcat.csv",
    "type": "timeline",
    "subtype": "number",
    "styles": STYLES,
    "ops": {
      "filter": "decay",
      "numCols": 30,
      "bins": 100,
    },
    "totals": [
      {
        "numItems": "30,080",
        "itemType": "Active satellites",
        "color": GREEN,
      },
    ],
    "text":
      "These are all the active satellites by date of launch, including smaller pieces of larger satellites",
    "legend": [
      {
        "name": "100 satellites",
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
    "ops": {
      "bins": 100,
    },
    "totals": [
      {
        "numItems": "7,562",
        "itemType": "Tracked satellites",
        "color": GREEN,
      },
    ],
    "text":
      "The Union of Concerned Scientists has documented the use of the larger, standalone satellites.",
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
      "numCols": 100,
      "iconSize": 12,
    },
    "type": "waffle",
    "styles": STYLES,
    "totals": [
      {
        "numItems": "1,291",
        "itemType": "Non-commercial satellites",
        "color": GREEN,
      },
      {
        "numItems": "188",
        "itemType": "Mixed use satellites",
        "color": WHITE,
      },
      {
        "numItems": "6,083",
        "itemType": "Commercial satellites",
        "color": PINK,
      },
    ],
    "text": "To this date X,XXX have entirely or partly commercial purposes.",
    "legend": [
      {
        "name": "100",
        "icon": "/sat.svg",
      },
      {
        "name": "100",
        "icon": "/sat-comm-other.svg",
      },
      {
        "name": "100",
        "icon": "/sat-comm.svg",
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
      "numCols": 100,
      "bins": 100,
      "iconSize": 12,
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
    "text": "We have also sent people to space.",
    "totals": [
      {
        "numItems": "1,536",
        "itemType": "Space riders",
        "color": BLUE,
      },
    ],
    "legend": [
      {
        "name": "1 space rider",
        "icon": "/space-rider.svg",
      },
    ],
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
    "number": {
      "numItems": 1,
      "itemType": "space rider",
    },

    "totals": [
      {
        "numItems": "1,354",
        "itemType": "Public workers",
        "color": BLUE,
      },
      {
        "numItems": "85",
        "itemType": "Private travelers",
        "color": PINK,
      },
      {
        "numItems": "97",
        "itemType": "Tourists",
        "color": ORANGE,
      },
    ],
    "text": "Not all space travelers are sent to space for public endeavors.",
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
