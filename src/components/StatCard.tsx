interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  highlight?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon,
  highlight = false,
}: StatCardProps) => (
  <div
    className={`p-4 rounded-xl border ${
      highlight ? "bg-orange-50 border-orange-100" : "bg-white border-gray-100"
    } shadow-sm flex items-center justify-between`}
  >
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-orange-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
    <div className={`p-2 rounded-lg ${highlight ? "bg-white" : "bg-gray-50"}`}>
      {icon}
    </div>
  </div>
);
