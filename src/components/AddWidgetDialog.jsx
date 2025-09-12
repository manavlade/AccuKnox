"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // <-- for widget text
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addwidget } from "@/app/store/widgetsSlice";

export default function AddWidgetDialog({ open, setOpen, categoryId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [text, setText] = useState("");  // <-- new field
  const [type, setType] = useState("text");

  const handleConfirm = () => {
    if (!name.trim()) return;

    dispatch(
      addwidget({
        categoryId,
        name,
        text,   // <-- include text
        type,
        chartData: {},
      })
    );

    // Reset fields
    setName("");
    setText("");
    setType("text");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Widget Name */}
          <Input
            placeholder="Widget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Widget Text/Description */}
          <Textarea
            placeholder="Enter widget description..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Widget Type */}
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Widget Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button className="" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-blue-500 hover:bg-blue-500 hover:text-white text-white" onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
