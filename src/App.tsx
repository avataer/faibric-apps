import React, { useState, useMemo } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
}

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface TimeSeriesData {
  date: string;
  revenue: number;
  users: number;
  orders: number;
}

interface FilterState {
  dateRange: string;
  category: string;
  metric: string;
}

// Sample Data
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "reports", label: "Reports", icon: "📋" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const statCardsData: StatCard[] = [
  { id: "revenue", title: "Total Revenue", value: "$124,563", change: 12.5, trend: "up" },
  { id: "users", title: "Active Users", value: "8,942", change: 8.2, trend: "up" },
  { id: "orders", title: "Orders", value: "1,284", change: -3.1, trend: "down" },
  { id: "conversion", title: "Conversion Rate", value: "3.24%", change: 0.5, trend: "up" },
];

const timeSeriesData: TimeSeriesData[] = [
  { date: "Jan", revenue: 4000, users: 2400, orders: 240 },
  { date: "Feb", revenue: 3000, users: 1398, orders: 221 },
  { date: "Mar", revenue: 2000, users: 9800, orders: 229 },
  { date: "Apr", revenue: 2780, users: 3908, orders: 200 },
  { date: "May", revenue: 1890, users: 4800, orders: 218 },
  { date: "Jun", revenue: 2390, users: 3800, orders: 250 },
  { date: "Jul", revenue: 3490, users: 4300, orders: 210 },
];

const pieChartData: ChartData[] = [
  { label: "Electronics", value: 35, color: "#3B82F6" },
  { label: "Clothing", value: 25, color: "#10B981" },
  { label: "Home & Garden", value: 20, color: "#F59E0B" },
  { label: "Sports", value: 12, color: "#EF4444" },
  { label: "Other", value: 8, color: "#8B5CF6" },
];

const barChartData: ChartData[] = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 150 },
  { label: "Wed", value: 180 },
  { label: "Thu", value: 140 },
  { label: "Fri", value: 200 },
  { label: "Sat", value: 170 },
  { label: "Sun", value: 90 },
];

// Navigation Sidebar Component
function NavigationSidebar({ activeItem, onItemClick }: { activeItem: string; onItemClick: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-3xl">📊</span> DataViz
        </h1>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3 transition-all ${
              activeItem === item.id
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="border-t border-slate-700 pt-4 mt-4">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-white font-medium text-sm">John Doe</p>
            <p className="text-slate-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Stats Cards Component
function StatsCards({ data }: { data: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {data.map((stat) => (
        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
          <p className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</p>
          <div className="flex items-center gap-1">
            <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {stat.trend === "up" ? "↑" : "↓"} {Math.abs(stat.change)}%
            </span>
            <span className="text-slate-400 text-sm">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Line Chart Component
function LineChart({ data, metric }: { data: TimeSeriesData[]; metric: string }) {
  const maxValue = Math.max(...data.map((d) => d[metric as keyof TimeSeriesData] as number));
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d[metric as keyof TimeSeriesData] as number) / maxValue) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Trend Analysis</h3>
      <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${points} 100,100`} fill="url(#lineGradient)" />
        <polyline points={points} fill="none" stroke="#3B82F6" strokeWidth="0.5" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - ((d[metric as keyof TimeSeriesData] as number) / maxValue) * 80;
          return <circle key={i} cx={x} cy={y} r="1" fill="#3B82F6" />;
        })}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((d) => (
          <span key={d.date} className="text-xs text-slate-500">
            {d.date}
          </span>
        ))}
      </div>
    </div>
  );
}

// Bar Chart Component
function BarChart({ data }: { data: ChartData[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Activity</h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((item, index) => (
          <div key={item.label} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all hover:from-blue-700 hover:to-blue-500"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-slate-500 mt-2">{item.label}</span>
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

  const slices = data.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    const endAngle = currentAngle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...item,
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Category Distribution</h3>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 100 100" className="w-40 h-40">
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.path}
              fill={slice.color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
          <circle cx="50" cy="50" r="20" fill="white" />
        </svg>
        <div className="flex-1">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-slate-600">{item.label}</span>
              <span className="text-sm font-medium text-slate-900 ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Filters Component
function Filters({ filters, onFilterChange }: { filters: FilterState; onFilterChange: (filters: FilterState) => void }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4">
      <div className="flex-1 min-w-[150px]">
        <label className="text-sm font-medium text-slate-700 mb-1 block">Date Range</label>
        <select
          value={filters.dateRange}
          onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>
      <div className="flex-1 min-w-[150px]">
        <label className="text-sm font-medium text-slate-700 mb-1 block">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>
      <div className="flex-1 min-w-[150px]">
        <label className="text-sm font-medium text-slate-700 mb-1 block">Metric</label>
        <select
          value={filters.metric}
          onChange={(e) => onFilterChange({ ...filters, metric: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="revenue">Revenue</option>
          <option value="users">Users</option>
          <option value="orders">Orders</option>
        </select>
      </div>
      <div className="flex items-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

// Data Table Component
function DataTable({ data }: { data: TimeSeriesData[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Detailed Data</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${row.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.users.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "30d",
    category: "all",
    metric: "revenue",
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <NavigationSidebar activeItem={activeNav} onItemClick={setActiveNav} />
      <main className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500">Welcome back! Here is your business performance summary.</p>
        </header>

        <Filters filters={filters} onFilterChange={setFilters} />

        <StatsCards data={statCardsData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LineChart data={timeSeriesData} metric={filters.metric} />
          <BarChart data={barChartData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PieChart data={pieChartData} />
          <DataTable data={timeSeriesData} />
        </div>
      </main>
    </div>    </div>
    </div>
  );
}

export default App;