import { ExpiryStatus } from "@/types";
import { differenceInDays, isBefore } from "date-fns";

export const getExpiryStatus = (dateStr: string): ExpiryStatus => {
  const isExpired = isBefore(new Date(dateStr), new Date());
  const days = differenceInDays(new Date(dateStr), new Date());
  if (isExpired) {
    return { color: "text-red-600 bg-red-50", label: "已过期" };
  } else if (days < 5) {
    return {
      color: "text-orange-600 bg-orange-50",
      label: `临期 ${days == 0 ? "今" : days}天过期`,
    };
  }
  return { color: "text-green-600 bg-green-50", label: "正常" };
};

export const categoryEmoji = (cat: string): string => {
  const map: Record<string, string> = {
    Dairy: "🥛",
    Bakery: "🍞",
    Meat: "🥩",
    Fruit: "🍎",
    Veg: "🥦",
  };
  return map[cat] || "📦";
};
