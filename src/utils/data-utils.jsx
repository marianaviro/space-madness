import * as d3 from "d3";

import { DATA_URLS } from "./config.jsx";

export const loadData = (chapter, filter, setData) => {
  d3.csv(DATA_URLS[chapter], d3.autoType)
    .then((loadedData) => {
      console.log("Data reloaded:", loadedData);
      const data = processData(chapter, filter, loadedData);
      setData(data);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
};

export const processData = (chapter, filter, data) => {
  // Ch 1: Satellites (SATCAT)
  if (chapter == 0) {
    let processed = data;
    if (filter) {
      if (filter == "decayed") {
        processed = data.filter((d) => !d["DECAY_DATE"]);
        console.log("Filtered in: ", processed.length);
      }
    }

    return processed.map((d, i) => {
      let launch_date = new Date(d["LAUNCH_DATE"]);
      let decay_date = new Date(d["DECAY_DATE"]);
      return {
        id: i,
        name: d["OBJECT_NAME"],
        launch_date: launch_date,
        decay_date: decay_date,
        owner: d["OWNER"],
        status: d["OPS_STATUS_CODE"],
        year: launch_date.getFullYear(),
      };
    });
  }
  // Ch 2: Active satellites by use (Union of Concerned Scientists)
  else if (chapter == 1) {
    return data
      .filter((d) => d["year"])
      .map((d, i) => {
        let date = new Date(d["Date of Launch"]);
        return {
          id: i,
          name: d["Name of Satellite, Alternate Names"],
          country: d["Country of Operator/Owner"],
          owner: d["Operator/Owner"],
          use: d["Users"],
          purpose: d["Purpose"],
          contractor: d["Contractor"],
          country_contractor: d["Country of Contractor"],
          lifetime: d["Expected Lifetime (yrs.)"],
          date_launch: date,
          year: date.getFullYear(),
        };
      });
  }
  // Ch 3: Space rides
  else if (chapter == 2) {
    return data
      .filter((d) => d["LDate"])
      .map((d, i) => {
        let date = new Date(d["LDate"]);
        return {
          id: i,
          name: d["Name"],
          category: d["Categ"],
          program: d["Program"],
          role: d["Role"],
          mission: d["Mission"],
          year: date.getFullYear(),
        };
      });
  }
};
