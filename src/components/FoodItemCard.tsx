"use client";
import { FoodItem } from "@/db/schema";
import { getExpiryStatus, categoryEmoji } from "@/utils";

interface FoodItemCardProps {
  item: FoodItem;
  onClick?: (item: FoodItem) => void;
}

export const FoodItemCard = ({ item, onClick }: FoodItemCardProps) => {
  const status = getExpiryStatus(item.expiry_date);

  return (
    <div
      onClick={() => onClick?.(item)}
      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
          {categoryEmoji(item.category)}
        </div>

        <div>
          <div className="flex gap-2 justify-between items-center">
            <h3 className="font-bold text-gray-800">{item.name}</h3>
            {item.notes ? <p className="text-xs font-bold text-emerald-600">{item.notes}</p> : null}
          </div>

          <p className="text-xs text-gray-500 inline-flex item-center">剩余: {item.weight ? item.weight + item.unit + " | " + item.quantity + "包/袋/盒" : item.quantity + item.unit}</p>
        </div>
      </div>

      <div className="text-right">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
        >
          {status.label}
        </span>
        <p className="text-xs text-gray-400 mt-1">
          {item.expiry_date ? item.expiry_date.split("T")[0] : "无"}
        </p>
      </div>
    </div>
  );
};
