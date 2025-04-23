import { Text } from "./Text.jsx";
import DeckCanvasChart from "./Deck-Canvas-Chart/DeckCanvasChart.jsx";

export function Slide({ slide, data }) {
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
    </div>
  );
}
