export function NavButtons({ progress, totalSteps, handleClick }) {
  return (
    <div className="step-container">
      <button
        style={{ opacity: progress > 0 ? "1" : "0" }}
        onClick={() => handleClick("prev")}
        className="arrow-button prev"
        disabled={progress == 0 ? true : false}
      >
        <img src="/arrow.svg" style={{ opacity: progress == 0 ? 0.3 : 1 }} />
        <p>Prev</p>
      </button>

      {progress == totalSteps - 1 ? (
        <button
          onClick={() => handleClick("index")}
          className="arrow-button index"
        >
          <p>Go to index</p>
          <img src="/reload.svg" />
        </button>
      ) : (
        <button
          onClick={() => handleClick("next")}
          className="arrow-button next"
        >
          <p>Next</p>
          <img src="/arrow.svg" />
        </button>
      )}
    </div>
  );
}
