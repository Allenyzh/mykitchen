"use client";

import { ScanLine, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  FormBuilder,
  FormConfig,
  getDefaultValues,
} from "@/components/FormBuilder";
import { foodFormConfig } from "@/data/foodFormConfig";


interface ActionButtonsProps {
  onScan: () => void;
  onAdd: (data: Record<string, unknown>) => void;
}

// 食材录入表单配置


export const ActionButtons = ({ onScan, onAdd }: ActionButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>(
    getDefaultValues(foodFormConfig)
  );

  const handleFieldChange = (name: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("提交的数据:", formData);
    onAdd(formData);
    setIsOpen(false);
    // 重置表单
    setFormData(getDefaultValues(foodFormConfig));
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={onScan}
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 transition-transform active:scale-95"
      >
        <ScanLine className="w-8 h-8" />
        <span className="font-semibold">扫码入库</span>
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-4 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 transition-transform active:scale-95">
            <Plus className="w-8 h-8 text-emerald-600" />
            <span className="font-semibold">手动录入</span>
          </button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>手动录入</SheetTitle>
            <SheetDescription>请填写食材信息</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="px-4">
            <FormBuilder
              config={foodFormConfig}
              values={formData}
              onChange={handleFieldChange}
            />

            <SheetFooter className="gap-2 pt-6">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  取消
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                保存
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
