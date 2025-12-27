import React, { useState } from "react";

// Interfaces
interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface LineChartData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface FilterState {
  timeRange: string;
  category: string;
  chartType: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

interface CardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

// Sample Data
const lineChartData: LineChartData[] = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 5000, expenses: 3800, profit: 1200 },
  { month: "Apr", revenue: 4780, expenses: 3908, profit: 872 },
  { month: "May", revenue: 5890, expenses: 4800, profit: 1090 },
  { month: "Jun", revenue: 6390, expenses: 3800, profit: 2590 },
];

const barChartData: ChartData[] = [
  { label: "Electronics", value: 4500, color: "#3B82F6" },
  { label: "Clothing", value: 3200, color: "#10B981" },
  { label: "Food", value: 2800, color: "#F59E0B" },
  { label: "Books", value: 1900, color: "#EF4444" },
  { label: "Sports", value: 2400, color: "#8B5CF6" },
];

const pieChartData: ChartData[] = [
  { label: "Desktop", value: 45, color: "#3B82F6" },
  { label: "Mobile", value: 35, color: "#10B981" },
  { label: "Tablet", value: 15, color: "#F59E0B" },
  { label: "Other", value: 5, color: "#EF4444" },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "analytics", label: "Analytics", icon: "📈", active: false },
  { id: "reports", label: "Reports", icon: "📋", active: false },
  { id: "settings", label: "Settings", icon: "⚙️", active: false },
];

// Sidebar Component
function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">DataViz Pro</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// Card Component
function StatCard({ title, value, change, changeType }: CardProps) {
  const changeColor =
    changeType === "positive"
      ? "text-green-500"
      : changeType === "negative"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className={`text-sm ${changeColor}`}>{change}</p>
    </div>
  );
}

// Line Chart Component
function LineChart({ data }: { data: LineChartData[] }) {
  const maxValue = Math.max(...data.flatMap((d) => [d.revenue, d.expenses, d.profit]));
  const chartHeight = 200;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
      <div className="relative h-52">
        <svg className="w-full h-full" viewBox="0 0 600 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="50"
              y1={40 + i * 40}
              x2="580"
              y2={40 + i * 40}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}
          {/* Revenue Line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            points={data
              .map((d, i) => `${50 + i * 90},${chartHeight - (d.revenue / maxValue) * 160}`)
              .join(" ")}
          />
          {/* Expenses Line */}
          <polyline
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            points={data
              .map((d, i) => `${50 + i * 90},${chartHeight - (d.expenses / maxValue) * 160}`)
              .join(" ")}
          />
          {/* Profit Line */}
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            points={data
              .map((d, i) => `${50 + i * 90},${chartHeight - (d.profit / maxValue) * 160}`)
              .join(" ")}
          />
          {/* X-axis labels */}
          {data.map((d, i) => (
            <text key={d.month} x={50 + i * 90} y="195" textAnchor="middle" className="text-xs fill-gray-500">
              {d.month}
            </text>
          ))}
        </svg>
      </div>
      <div className="flex gap-4 mt-4 justify-center">
        <span className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>Revenue
        </span>
        <span className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>Expenses
        </span>
        <span className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>Profit
        </span>
      </div>
    </div>
  );
}

// Bar Chart Component
function BarChart({ data }: { data: ChartData[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="w-24 text-sm text-gray-600 truncate">{item.label}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>
            <span className="w-16 text-sm font-medium text-gray-900 text-right">${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pie Chart Component
function PieChart({ data }: { data: ChartData[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  const getPath = (startAngle: number, endAngle: number) => {
    const start = {
      x: 100 + 80 * Math.cos((Math.PI * startAngle) / 180),
      y: 100 + 80 * Math.sin((Math.PI * startAngle) / 180),
    };
    const end = {
      x: 100 + 80 * Math.cos((Math.PI * endAngle) / 180),
      y: 100 + 80 * Math.sin((Math.PI * endAngle) / 180),
    };
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M 100 100 L ${start.x} ${start.y} A 80 80 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
      <div className="flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {data.map((item) => {
            const angle = (item.value / total) * 360;
            const path = getPath(currentAngle, currentAngle + angle);
            currentAngle += angle;
            return <path key={item.label} d={path} fill={item.color} className="hover:opacity-80 transition-opacity cursor-pointer" />;
          })}
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className="text-sm text-gray-600">
              {item.label}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Filter Component
function Filters({ filters, onChange }: { filters: FilterState; onChange: (filters: FilterState) => void }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={filters.timeRange}
        onChange={(e) => onChange({ ...filters, timeRange: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="90d">Last 90 Days</option>
        <option value="1y">Last Year</option>
      </select>
      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="food">Food</option>
      </select>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [filters, setFilters] = useState<FilterState>({
    timeRange: "30d",
    category: "all",
    chartType: "all",
  });

  const handleNavSelect = (id: string) => {
    setActiveNav(id);
  };

  const updatedNavItems = navItems.map((item) => ({
    ...item,
    active: item.id === activeNav,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar items={updatedNavItems} onSelect={handleNavSelect} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back! Here is your business summary.</p>
        </div>
        <Filters filters={filters} onChange={setFilters} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value="$124,500" change="+12.5% from last month" changeType="positive" />
          <StatCard title="Total Expenses" value="$48,200" change="+3.2% from last month" changeType="negative" />
          <StatCard title="Net Profit" value="$76,300" change="+18.7% from last month" changeType="positive" />
          <StatCard title="Active Users" value="8,420" change="+5.4% from last month" changeType="positive" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LineChart data={lineChartData} />
          <BarChart data={barChartData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PieChart data={pieChartData} />
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#1234</td>
                    <td className="py-3 px-4 text-sm text-gray-900">John Doe</td>
                    <td className="py-3 px-4 text-sm text-gray-900">$450.00</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#1235</td>
                    <td className="py-3 px-4 text-sm text-gray-900">Jane Smith</td>
                    <td className="py-3 px-4 text-sm text-gray-900">$320.00</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#1236</td>
                    <td className="py-3 px-4 text-sm text-gray-900">Bob Wilson</td>
                    <td className="py-3 px-4 text-sm text-gray-900">$890.00</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#1237</td>
                    <td className="py-3 px-4 text-sm text-gray-900">Alice Brown</td>
                    <td className="py-3 px-4 text-sm text-gray-900">$125.00</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Failed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;