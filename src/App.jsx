import "./App.css";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { Text } from "./Text";
import { aggregateSatellites } from "./utils.jsx";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Call an external function to transform the data
    // Move the next lines of code to utils.js
    d3.csv("/data/clean_sat.csv", d3.autoType)
      .then((loadedData) => {
        console.log("Data loaded:", loadedData);
        const aggSat = aggregateSatellites(loadedData);
        setData(aggSat);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  // console.log(data, "APP data");

  return (
    <div className="layout">
      <div className="toggle-container">
        <div className="arrow-button prev">
          <img src="/arrow-prev.svg" />
          <p>Prev</p>
        </div>
        <div className="arrow-button next">
          <p>Next</p>
          <img src="/arrow-next.svg" />
        </div>
      </div>
      <div className="content">
        <div className="text-container">
          <Text data={data} />
        </div>
        <div className="chart-container">
          {data ? <Chart data={data} /> : <div> Loading data... </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
