import { Text } from "./Text.jsx";
import { useState } from "react";
import { Details } from "./Details.jsx";
import DeckCanvasChart from "./Deck-Canvas-Chart/DeckCanvasChart.jsx";

export function Slide({ slide, data }) {
  // const [details, setDetails] = useState(null);
  return (
    <div className="layout">
      <Text slide={slide} />
      <div className="content">
        {data ? (
          <DeckCanvasChart slide={slide} data={data} />
        ) : (
          <div> Loading data... </div>
        )}
      </div>
      {/* {!slide.subtype && <Details slide={slide} details={details} />} */}
    </div>
  );
}
