import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "@/app/store/widgetsSlice.js";

export default function AddCategory() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch(addCategory({ name }));
    setName("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 rounded"
        placeholder="New Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        + Add Category
      </button>
    </div>
  );
}
