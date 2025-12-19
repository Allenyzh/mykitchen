import { FoodItem } from "@/types";

export const MOCK_DATA: FoodItem[] = [
  {
    id: 1,
    name: "明治牛奶",
    expiry_date: "2023-12-18T23:59:59",
    quantity: 1,
    category: "Dairy",
    status: "active",
  },
  {
    id: 2,
    name: "全麦面包",
    expiry_date: "2023-12-20T23:59:59",
    quantity: 2,
    category: "Bakery",
    status: "active",
  },
  {
    id: 3,
    name: "鸡蛋 (12个)",
    expiry_date: "2024-01-05T23:59:59",
    quantity: 1,
    category: "Dairy",
    status: "active",
  },
  {
    id: 4,
    name: "冷冻牛肉",
    expiry_date: "2025-12-17T23:59:59",
    quantity: 3,
    category: "Meat",
    status: "active",
  },
];
