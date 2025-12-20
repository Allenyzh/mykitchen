"use client";

import { ScanLine, Plus } from "lucide-react";
import { useState } from "react";
import { FoodItemSheet } from "@/components/FoodItemSheet";

interface ActionButtonsProps {
  onScan: () => void;
  onAdd: (data: Record<string, unknown>) => void;
}

export const ActionButtons = ({ onScan, onAdd }: ActionButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <button
        onClick={onScan}
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 transition-transform active:scale-95"
      >
        <ScanLine className="w-8 h-8" />
        <span className="font-semibold">扫码入库</span>
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-4 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 transition-transform active:scale-95"
      >
        <Plus className="w-8 h-8 text-emerald-600" />
        <span className="font-semibold">手动录入</span>
      </button>

      <FoodItemSheet
        mode="create"
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={onAdd}
      />
    </div>
  );
};
