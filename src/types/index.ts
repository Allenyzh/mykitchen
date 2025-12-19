export interface FoodItem {
  id: number;
  name: string;
  expiry_date: string;
  quantity: number;
  category: string;
  status: "active" | "consumed" | "trash";
  image_url?: string;
}

export interface ExpiryStatus {
  color: string;
  label: string;
}
