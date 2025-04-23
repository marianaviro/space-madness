export function Details({ slide, details }) {
  if (!details) return null;
  const formatKey = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="text-container details">
      {details.object.items.map((d, I) => {
        return (
          <div key={i} className="text-item description">
            {Object.entries(d.text).map(([key, value]) => (
              <div key={key}>
                <strong>{formatKey(key)}:</strong> {String(value)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
