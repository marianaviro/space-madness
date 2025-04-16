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

  const WIDTH = 2000; //1000
  const HEIGHT = 1500; //600
  const ICON_SIZE = 24;
  const MARGIN = { top: 40, right: 20, bottom: 20, left: 40 };
  const ICON_URL = "/data/satellite-icon-atlas.png"; // ensure this lives in public/

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

  const totalSteps = 2;
  const [step, setStep] = useState(0);

  // Making sure the steps work
  useEffect(() => {
    console.log(step);
  }, [step]);

  const handleClick = (direction) => {
    if (direction == "prev") {
      if (step > 0) {
        const prevStep = step - 1;
        setStep(prevStep);
      }
    } else {
      if (step < totalSteps - 1) {
        const nextStep = step + 1;
        setStep(nextStep);
      }
    }
  };

  return (
    <div className="layout">
      <div className="toggle-container">
        <button
          onClick={() => handleClick("prev")}
          className="arrow-button prev"
          disabled={step < 1 ? true : false}
        >
          <img src="/arrow.svg" />
          <p>Prev</p>
        </button>
        <button
          onClick={() => handleClick("next")}
          className="arrow-button next"
        >
          <p>Next</p>
          <img src="/arrow.svg" />
        </button>
      </div>
      <div className="text-container">
        <Text step={step} />
      </div>
      <div className="content">
        {data ? (
          <DeckCanvasChart
            data={data}
            margin={MARGIN}
            width={WIDTH}
            height={HEIGHT}
            iconSize={ICON_SIZE}
            iconUrl={ICON_URL}
            step={step}
          />
        ) : (
          <div> Loading data... </div>
        )}
      </div>
    </div>
  );
}

export default App;
