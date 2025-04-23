export function Text({ slide }) {
  return (
    <div className="text-container">
      <div className="text-item dates">
        <div className="date-start">
          <p className="label">From</p>
          <p className="value secondary">1957</p>
        </div>
        <div className="date-end">
          <p className="label">To</p>
          <p className="value secondary">2025</p>
        </div>
      </div>
      <div className="text-item description">
        <p>{slide.text}</p>
      </div>
      <div className="text-item totals">
        {slide.totals &&
          slide.totals.map((d, i) => (
            <div className="totals-item" key={i} style={{ "color": d.color }}>
              <p className="value primary">{d.numItems}</p>
              <p className="">
                <span className="value secondary">{d.itemType}</span>
              </p>
            </div>
          ))}
      </div>

      <div className="text-item legend">
        <p className="label">Legend</p>
        {slide.legend &&
          slide.legend.map((d, i) => (
            <div className="legend-item" key={i}>
              <img src={d.icon} /> <p>= {d.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
