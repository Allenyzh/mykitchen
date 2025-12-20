"use client";

import { useState, useEffect } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    FormBuilder,
    getDefaultValues,
} from "@/components/FormBuilder";
import { foodFormConfig } from "@/data/foodFormConfig";
import { FoodItem } from "@/db/schema";

interface FoodItemSheetProps {
    mode: "create" | "edit";
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: FoodItem | null;
    onSubmit: (data: Record<string, unknown>) => void;
}

// Convert FoodItem to form data format
const foodItemToFormData = (item: FoodItem): Record<string, unknown> => ({
    name: item.name,
    quantity: item.quantity,
    weight: item.weight,
    unit: item.unit,
    expiryDate: item.expiry_date?.split("T")[0] || "",
    purchaseLocation: item.purchase_location || "",
    totalPrice: item.total_price,
    barcode: item.barcode || "",
    category: item.category,
    notes: item.notes || "",
});

export const FoodItemSheet = ({
    mode,
    open,
    onOpenChange,
    initialData,
    onSubmit,
}: FoodItemSheetProps) => {
    const [formData, setFormData] = useState<Record<string, unknown>>(
        getDefaultValues(foodFormConfig)
    );

    // Reset form when sheet opens or initialData changes
    useEffect(() => {
        if (open) {
            if (mode === "edit" && initialData) {
                setFormData(foodItemToFormData(initialData));
            } else {
                setFormData(getDefaultValues(foodFormConfig));
            }
        }
    }, [open, mode, initialData]);

    const handleFieldChange = (name: string, value: unknown) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onOpenChange(false);
        // Reset form after submit
        setFormData(getDefaultValues(foodFormConfig));
    };

    const title = mode === "create" ? "手动录入" : "编辑食材";
    const description = mode === "create" ? "请填写食材信息" : "修改食材信息";
    const submitText = mode === "create" ? "保存" : "更新";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
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
                            {submitText}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};
