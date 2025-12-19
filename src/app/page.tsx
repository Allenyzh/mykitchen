import { AlertTriangle, Package, ChefHat } from "lucide-react";
import {
  Header,
  StatCard,
  MobileNav,
} from "@/components";
import { getFoodItems } from "@/lib/actions";
import { ClientHome } from "@/components/ClientHome";

export default async function Home() {
  const items = await getFoodItems();

  // 计算简单的统计数据
  const totalItems = items.length;
  // 模拟即将过期（实际逻辑可以更复杂）
  const expiringSoon = items.filter(item => {
    const days = Math.floor((new Date(item.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days >= 0 && days < 5;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* 概览卡片区 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="总库存"
            value={totalItems}
            icon={<Package className="text-blue-500" />}
          />
          <StatCard
            title="即将过期"
            value={expiringSoon}
            highlight
            icon={<AlertTriangle className="text-orange-500" />}
          />
          <StatCard
            title="本月消耗"
            value={0} // 待实现
            icon={<ChefHat className="text-purple-500" />}
          />
        </div>

        <ClientHome initialItems={items} />
      </main>

      <MobileNav />
    </div>
  );
}
