import { ChefHat } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-emerald-600" />
          <h1 className="text-xl font-bold text-gray-800">My Pantry</h1>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User"
          />
        </div>
      </div>
    </header>
  );
};
