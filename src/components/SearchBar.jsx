import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/app/store/widgetsSlice.js";

export default function SearchBar() {
  const dispatch = useDispatch();

  return (
    <input
      className="border p-2 w-full rounded"
      placeholder="Search widgets..."
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
}
