import React from "react";
import { useDispatch } from "react-redux";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { removeWidget } from "@/app/store/widgetsSlice";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Widget({ widget, categoryId }) {
  const dispatch = useDispatch();

  return (
    <div className="p-4 border rounded-lg shadow relative">
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={() => dispatch(removeWidget({ categoryId, widgetId: widget.id }))}
      >
        ❌
      </button>

      <h3 className="font-semibold mb-2">{widget.name}</h3>
      {widget.text && <p className="text-sm text-gray-600 mt-2">{widget.text}</p>}
      
      {widget.type === "chart" && <Doughnut data={widget.chartData} />}
      {widget.type === "bar" && <Bar data={widget.chartData} options={{ indexAxis: "y" }} />}
      {widget.type === "text" && <p>{widget.text || "This is a text widget"}</p>}
    </div>
  );
}
