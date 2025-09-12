import React from "react";

export default function RegistryScanProgress({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-6 rounded-full flex overflow-hidden border">
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            width: `${(item.value / total) * 100}%`,
            backgroundColor: item.color,
          }}
          className="h-full"
          title={`${item.label}: ${item.value}`}
        ></div>
      ))}
    </div>
  );
}
