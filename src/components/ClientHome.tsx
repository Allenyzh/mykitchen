"use client";

import { useState } from "react";
import { ActionButtons, SearchBar, FoodList } from "@/components";
import { FoodItemSheet } from "@/components/FoodItemSheet";
import { addFoodItem, updateFoodItem, deleteFoodItem } from "@/lib/actions";
import { FoodItem } from "@/db/schema";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ClientHome({ initialItems }: { initialItems: FoodItem[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState<FoodItem | null>(null);

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

    const handleDeleteRequest = (item: FoodItem) => {
        setDeleteItem(item);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteItem) return;
        const result = await deleteFoodItem(deleteItem.id);
        if (!result.success) {
            alert(result.error);
        }
        setDeleteItem(null);
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
                <FoodList
                    items={filteredItems}
                    onItemClick={handleItemClick}
                    onDelete={handleDeleteRequest}
                />
            </div>

            {/* 编辑弹窗 */}
            <FoodItemSheet
                mode="edit"
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                initialData={editingItem}
                onSubmit={handleUpdate}
            />

            {/* 删除确认弹窗 */}
            <AlertDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确认删除</AlertDialogTitle>
                        <AlertDialogDescription>
                            确定要删除「{deleteItem?.name}」吗？此操作无法撤销。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            删除
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
