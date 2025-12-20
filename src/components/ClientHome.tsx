"use client";

import { useState } from "react";
import { ActionButtons, SearchBar, FoodList } from "@/components";
import { FoodItemSheet } from "@/components/FoodItemSheet";
import { addFoodItem, updateFoodItem } from "@/lib/actions";
import { FoodItem } from "@/db/schema";

export function ClientHome({ initialItems }: { initialItems: FoodItem[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleScan = () => {
        console.log("打开扫码器");
    };

    const handleAdd = async (data: Record<string, unknown>) => {
        const result = await addFoodItem(data);
        if (!result.success) {
            alert(result.error);
        }
    };

    const handleItemClick = (item: FoodItem) => {
        setEditingItem(item);
        setIsEditOpen(true);
    };

    const handleUpdate = async (data: Record<string, unknown>) => {
        if (!editingItem) return;
        const result = await updateFoodItem(editingItem.id, data);
        if (!result.success) {
            alert(result.error);
        }
        setEditingItem(null);
    };

    const filteredItems = initialItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* 操作按钮区 */}
            <ActionButtons onScan={handleScan} onAdd={handleAdd} />

            {/* 列表与搜索区 */}
            <div className="space-y-4">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <FoodList items={filteredItems} onItemClick={handleItemClick} />
            </div>

            {/* 编辑弹窗 */}
            <FoodItemSheet
                mode="edit"
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                initialData={editingItem}
                onSubmit={handleUpdate}
            />
        </div>
    );
}
