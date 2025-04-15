import "./App.css";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { Text } from "./Text";
import { aggregateSatellites } from "./utils/utils.jsx";

//original chart with d3
import Chart from "./components/D3-Chart/Chart";

//chart using canvas
import CanvasChart from "./components/Canvas-Chart/Chart-Canvas.jsx";

//chart using deck gl for canvas GPU acceleration
import DeckCanvasChart from "./components/Deck-Canvas-Chart/Chart-DeckGL.jsx";

function App() {
  const [data, setData] = useState(null);

  const WIDTH = 1000;
  const HEIGHT = 600;
  const ICON_SIZE = 24;
  const MARGIN = { top: 40, right: 20, bottom: 20, left: 40 };
  const ICON_URL = "/sat.svg"; // ensure this lives in public/

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
        {/* Switch divs to buttons */}
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
          {data ? (
            <Chart data={data} margin={MARGIN} width={WIDTH} height={HEIGHT} />
          ) : (
            // <CanvasChart
            //   data={data}
            //   width={WIDTH}
            //   height={HEIGHT}
            //   iconSize={ICON_SIZE}
            //   margin={MARGIN}
            //   iconUrl={ICON_URL}
            // />
            // <DeckCanvasChart
            //   data={data}
            //   width={WIDTH}
            //   height={HEIGHT}
            //   iconSize={ICON_SIZE}
            //   margin={MARGIN}
            //   iconUrl={ICON_URL}
            // />
            <div> Loading data... </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
