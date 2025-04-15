/* eslint-disable react/prop-types */

import "./SatelliteTooltip.css";

function SatelliteTooltip({ x, y, text }) {
  if (!text) return null;

  return (
    <div
      className="tooltip-satellite"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div>
        <strong>Name:</strong> {text.name}
      </div>
      <div>
        <strong>Country:</strong> {text.country}
      </div>
      <div>
        <strong>Use:</strong> {text.use}
      </div>
      <div>
        <strong>Contractor:</strong> {text.contractor}
      </div>
      <div>
        <strong>Launched:</strong> {text.launched}
      </div>
    </div>
  );
}

export default SatelliteTooltip;
