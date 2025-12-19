import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const foodItems = sqliteTable("food_items", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    expiry_date: text("expiry_date").notNull(),
    quantity: real("quantity").notNull().default(1),
    unit: text("unit").notNull().default("个"),
    weight: real("weight"),
    category: text("category").notNull().default("Other"),
    status: text("status", { enum: ["active", "consumed", "trash"] }).notNull().default("active"),
    purchase_location: text("purchase_location"),
    total_price: real("total_price").notNull().default(0),
    barcode: text("barcode"),
    notes: text("notes"),
    image_url: text("image_url"),
    created_at: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type FoodItem = typeof foodItems.$inferSelect;
export type NewFoodItem = typeof foodItems.$inferInsert;
