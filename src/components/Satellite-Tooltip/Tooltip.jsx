/* eslint-disable react/prop-types */

import "./SatelliteTooltip.css";

function SatelliteTooltip({ x, y, text }) {
  if (!text) return null;

  const formatKey = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="tooltip-satellite"
      // style={{ left: `${x + 500}px`, top: `${y}px` }}
    >
      {Object.entries(text).map(([key, value]) => (
        <div key={key}>
          <strong>{formatKey(key)}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
}

export default SatelliteTooltip;
