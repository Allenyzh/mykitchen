"use server";

import { db } from "@/db";
import { foodItems, type NewFoodItem } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFoodItems() {
    try {
        return await db.query.foodItems.findMany({
            orderBy: (foodItems, { desc }) => [desc(foodItems.created_at)],
        });
    } catch (error) {
        console.error("Failed to fetch food items:", error);
        return [];
    }
}

export async function addFoodItem(data: any) {
    try {
        const newItem: NewFoodItem = {
            name: data.name,
            quantity: Number(data.quantity),
            unit: data.unit || "个",
            weight: data.weight ? Number(data.weight) : null,
            expiry_date: data.expiryDate,
            category: data.category || "Other",
            purchase_location: data.purchaseLocation,
            total_price: data.totalPrice ? Number(data.totalPrice) : 0,
            barcode: data.barcode,
            notes: data.notes,
            status: "active",
        };

        await db.insert(foodItems).values(newItem);
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to add food item:", error);
        return { success: false, error: "添加失败" };
    }
}

export async function deleteFoodItem(id: number) {
    try {
        await db.delete(foodItems).where(eq(foodItems.id, id));
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete food item:", error);
        return { success: false, error: "删除失败" };
    }
}

export async function updateFoodItem(id: number, data: any) {
    try {
        await db.update(foodItems).set({
            name: data.name,
            quantity: Number(data.quantity),
            unit: data.unit || "个",
            weight: data.weight ? Number(data.weight) : null,
            expiry_date: data.expiryDate,
            category: data.category || "Other",
            purchase_location: data.purchaseLocation,
            total_price: data.totalPrice ? Number(data.totalPrice) : 0,
            barcode: data.barcode,
            notes: data.notes,
            updated_at: new Date(),
        }).where(eq(foodItems.id, id));
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update food item:", error);
        return { success: false, error: "更新失败" };
    }
}
