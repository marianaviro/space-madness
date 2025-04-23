export function Text({ slide }) {
  return (
    <div className="text-container">
      <p>{slide.text}</p>
      <div className="legend">
        {slide.legend &&
          slide.legend.map((d) => (
            <div className="legend-item" key={d}>
              <img src={d.icon} /> <p>= {d.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
