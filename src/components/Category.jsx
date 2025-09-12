import React from "react";
import Widget from "./Widget.jsx";
import { useDispatch } from "react-redux";
import { addwidget } from "../app/store/widgetsSlice.js";

export default function Category({ category }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addwidget({
        categoryId: category.id,
        name: "New Widget",
        type: "chart", 
        chartData: {
          labels: [],
          datasets: [{ data: [] }],
        },
      })
    );
  };

  return (
    <div className="p-4 border rounded-lg shadow space-y-4 bg-white">
      <h2 className="text-xl font-semibold">{category.name}</h2>

      <div className="grid grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}

        <div
          onClick={handleAdd}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 min-h-[180px]"
        >
          + Add Widget
        </div>
      </div>
    </div>
  );
}
