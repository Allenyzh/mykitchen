"use client";

import { useState } from "react";
import { ActionButtons, SearchBar, FoodList } from "@/components";
import { addFoodItem } from "@/lib/actions";

export function ClientHome({ initialItems }: { initialItems: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleScan = () => {
        console.log("打开扫码器");
    };

    const handleAdd = async (data: Record<string, unknown>) => {
        const result = await addFoodItem(data);
        if (!result.success) {
            alert(result.error);
        }
    };

    const handleItemClick = (item: any) => {
        console.log("点击了食品:", item);
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
        </div>
    );
}
