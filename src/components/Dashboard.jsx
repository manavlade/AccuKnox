import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddWidgetDialog from "./AddWidgetDialog";
import { setSearchQuery } from "@/app/store/widgetsSlice";
import Widget from "./Widget";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const searchQuery = useSelector((state) => state.dashboard.searchQuery);

  return (
    <div className="p-3 bg-gray-50 min-h-screen">
      {/* 🔹 Top Navigation */}
      <div className="text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2 text-gray-500 mb-2">
        <div className="flex items-center gap-2">
          Home <span>{">"}</span>
          <span className="font-semibold text-gray-800">Dashboard V2</span>
        </div>

        {/* Search */}
        <div className="flex-1 md:mx-6">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex items-center justify-end">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* 🔹 Dashboard Header */}
      <div className="bg-blue-50 p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
          <h1 className="text-lg font-semibold">CNAPP Dashboard</h1>
          <select className="border rounded px-3 py-1 w-full md:w-auto">
            <option>Last 2 days</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>

        {/* 🔹 Categories */}
        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-lg font-semibold mb-4">{cat.name}</h2>

              {/* Responsive grid: 1 col (mobile), 2 (tablet), 3 (desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-3 rounded-lg">
                {cat.widgets
                  .filter((w) =>
                    w.name?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((widget) => (
                    <Widget key={widget.id} widget={widget} categoryId={cat.id} />
                  ))}

                {/* Add Widget Box */}
                <div
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setDialogOpen(true);
                  }}
                  className="cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center min-h-[150px] hover:bg-gray-200 transition"
                >
                  + Add Widget
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <AddWidgetDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        categoryId={activeCategoryId}
      />
    </div>
  );
}
