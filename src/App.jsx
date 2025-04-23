import "./App.css";
import { useEffect, useState } from "react";
import { Slide } from "./components/Slide.jsx";
import { loadData } from "./utils/data-utils.jsx";
import { NavButtons } from "./components/NavButtons.jsx";
import { slidesContent } from "./utils/slides-content.jsx";

function App() {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);

  const slide = slidesContent[progress];
  const chapter = slide.chapter;
  const ops = slide.ops;

  const handleClick = (direction) =>
    setProgress((p) => {
      if (direction == "prev") return Math.max(p - 1, 0);
      else if (direction == "next")
        return Math.min(p + 1, slidesContent.length - 1);
      else if (direction == "index") return 0;
    });

  // Reload data if chapter changes or there's a filter applied
  useEffect(() => {
    loadData(chapter, ops, setData);
  }, [chapter, ops]);

  return (
    <div className="layout">
      <NavButtons
        progress={progress}
        totalSteps={slidesContent.length}
        handleClick={handleClick}
      />
      <Slide slide={slide} totalSteps={slidesContent.length} data={data} />
    </div>
  );
}

export default App;
