"use client";
import { Package, ScanLine, ChefHat } from "lucide-react";

interface NavIconProps {
  icon: React.ReactElement;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavIcon = ({ icon, label, active = false, onClick }: NavIconProps) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 ${active ? "text-emerald-600" : "text-gray-400"
      }`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

interface MobileNavProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
}

export const MobileNav = ({
  activeTab = "inventory",
  onNavigate,
}: MobileNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center md:hidden z-20 pb-safe">
      <NavIcon
        icon={<Package />}
        label="库存"
        active={activeTab === "inventory"}
        onClick={() => onNavigate?.("inventory")}
      />
      <NavIcon
        icon={<ScanLine />}
        label="扫码"
        active={activeTab === "scan"}
        onClick={() => onNavigate?.("scan")}
      />
      <NavIcon
        icon={<ChefHat />}
        label="食谱"
        active={activeTab === "recipe"}
        onClick={() => onNavigate?.("recipe")}
      />
    </nav>
  );
};
