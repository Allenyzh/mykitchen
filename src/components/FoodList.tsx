import { FoodItem } from "@/db/schema";
import { FoodItemCard } from "./FoodItemCard";
import { SwipeableCard } from "./SwipeableCard";

interface FoodListProps {
  items: FoodItem[];
  title?: string;
  onItemClick?: (item: FoodItem) => void;
  onDelete?: (item: FoodItem) => void;
}

export const FoodList = ({
  items,
  title = "厨房清单",
  onItemClick,
  onDelete,
}: FoodListProps) => {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-gray-700 text-lg">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-10">清单还是空的，快去添加吧！</p>
      ) : (
        items.map((item) => (
          <SwipeableCard key={item.id} onDelete={() => onDelete?.(item)}>
            <FoodItemCard item={item} onClick={onItemClick} />
          </SwipeableCard>
        ))
      )}
    </div>
  );
};
