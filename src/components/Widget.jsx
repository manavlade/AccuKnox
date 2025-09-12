import React from "react";
import { useDispatch } from "react-redux";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { removeWidget } from "@/app/store/widgetsSlice";
import { BarChart } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Widget({ widget, categoryId }) {
  const dispatch = useDispatch();

  const hasChartData =
    widget.chartData?.datasets?.some(
      (ds) => ds.data && ds.data.some((val) => val > 0)
    );

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

      {widget.text && widget.type !== "text" && (
        <p className="text-sm text-gray-600 mb-2">{widget.text}</p>
      )}


      {widget.type === "chart" && hasChartData && (
        <div className="">
          <Doughnut data={widget.chartData} />
        </div>
      )}
      {widget.type === "bar" && (
        <div className="h-16">
          <Bar
            data={widget.chartData}
            options={{
              indexAxis: "y",
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    usePointStyle: true,
                  },
                },
              },
              scales: {
                x: {
                  stacked: true,
                  grid: { display: false },
                  ticks: { display: false },
                },
                y: {
                  stacked: true,
                  grid: { display: false },
                  ticks: { display: false },
                },
              },
              elements: {
                bar: {
                  borderRadius: 20,
                  barThickness: 50,
                },
              },
            }}
          />
        </div>
      )}

      {/* Text Widget */}
      {widget.type === "text" && (
        <p className="text-gray-700">{widget.text || "This is a text widget"}</p>
      )}

      {/* No Data Fallback */}
      {!hasChartData &&
        (widget.type === "chart" || widget.type === "bar") && (
        <div className="h-16 items-center flex flex-col">
        <BarChart/>
          <p className="text-sm text-gray-400 italic mt-2">
            No data available
          </p>
        </div>
        )}

    </div>
  );
}
