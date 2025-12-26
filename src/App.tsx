import React, { useState } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface ChartConfig {
  title: string;
  data: ChartDataPoint[];
  color: string;
  secondaryColor?: string;
  showSecondary?: boolean;
}

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableRow {
  id: string;
  [key: string]: string | number;
}

interface TableConfig {
  columns: TableColumn[];
  rows: TableRow[];
  title: string;
}

// Sample Data
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "sessions", label: "Sessions", icon: "🎯", badge: 12 },
  { id: "attendees", label: "Attendees", icon: "👥", badge: 2847 },
  { id: "engagement", label: "Engagement", icon: "💬" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const statsData: StatCard[] = [
  { id: "1", title: "Total Attendees", value: "2,847", change: 12.5, changeLabel: "vs last event", icon: "👥" },
  { id: "2", title: "Average Engagement", value: "78%", change: 8.2, changeLabel: "vs last event", icon: "📈" },
  { id: "3", title: "Sessions Completed", value: "24", change: -2.1, changeLabel: "vs target", icon: "🎯" },
  { id: "4", title: "Peak Concurrent", value: "1,234", change: 15.3, changeLabel: "vs last event", icon: "⚡" },
];

const attendanceData: ChartDataPoint[] = [
  { label: "9 AM", value: 450, secondaryValue: 380 },
  { label: "10 AM", value: 820, secondaryValue: 650 },
  { label: "11 AM", value: 1100, secondaryValue: 890 },
  { label: "12 PM", value: 980, secondaryValue: 750 },
  { label: "1 PM", value: 650, secondaryValue: 520 },
  { label: "2 PM", value: 1234, secondaryValue: 980 },
  { label: "3 PM", value: 1150, secondaryValue: 920 },
  { label: "4 PM", value: 890, secondaryValue: 710 },
  { label: "5 PM", value: 620, secondaryValue: 480 },
];

const engagementData: ChartDataPoint[] = [
  { label: "Mon", value: 72 },
  { label: "Tue", value: 78 },
  { label: "Wed", value: 85 },
  { label: "Thu", value: 82 },
  { label: "Fri", value: 78 },
];

const sessionTableData: TableConfig = {
  title: "Session Popularity",
  columns: [
    { key: "session", label: "Session Name", sortable: true },
    { key: "speaker", label: "Speaker", sortable: true },
    { key: "attendees", label: "Attendees", sortable: true },
    { key: "rating", label: "Rating", sortable: true },
    { key: "engagement", label: "Engagement", sortable: true },
  ],
  rows: [
    { id: "1", session: "Keynote: Future of Tech", speaker: "Dr. Sarah Chen", attendees: 1847, rating: "4.9", engagement: "92%" },
    { id: "2", session: "AI in Business", speaker: "Mark Johnson", attendees: 1234, rating: "4.7", engagement: "88%" },
    { id: "3", session: "Cloud Architecture", speaker: "Emily Davis", attendees: 987, rating: "4.8", engagement: "85%" },
    { id: "4", session: "DevOps Best Practices", speaker: "James Wilson", attendees: 756, rating: "4.6", engagement: "82%" },
    { id: "5", session: "Security Workshop", speaker: "Lisa Park", attendees: 654, rating: "4.5", engagement: "79%" },
  ],
};

const demographicsData = [
  { label: "North America", value: 42, color: "#3B82F6" },
  { label: "Europe", value: 28, color: "#10B981" },
  { label: "Asia Pacific", value: 18, color: "#F59E0B" },
  { label: "Latin America", value: 8, color: "#EF4444" },
  { label: "Other", value: 4, color: "#8B5CF6" },
];

// Components
function Sidebar({ items, activeItem, onItemClick }: { items: NavItem[]; activeItem: string; onItemClick: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🎪</span>
          <span>EventMetrics</span>
        </h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  activeItem === item.id ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {item.badge && (
                  <span className="bg-slate-700 px-2 py-0.5 rounded-full text-xs">{item.badge}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
            AD
          </div>
          <div>
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-slate-400">admin@events.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatsCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className={`text-sm font-medium ${stat.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stat.change >= 0 ? "↑" : "↓"} {Math.abs(stat.change)}%
            </span>
            <span className="text-slate-400 text-sm">{stat.changeLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ config }: { config: ChartConfig }) {
  const maxValue = Math.max(...config.data.map((d) => Math.max(d.value, d.secondaryValue || 0)));
  const chartHeight = 200;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{config.title}</h3>
      <div className="relative" style={{ height: chartHeight }}>
        <svg className="w-full h-full" viewBox={`0 0 ${config.data.length * 60} ${chartHeight}`} preserveAspectRatio="none">
          {config.showSecondary && (
            <path
              d={config.data
                .map((point, i) => {
                  const x = i * 60 + 30;
                  const y = chartHeight - ((point.secondaryValue || 0) / maxValue) * (chartHeight - 40);
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ")}
              fill="none"
              stroke={config.secondaryColor || "#94A3B8"}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
          <path
            d={config.data
              .map((point, i) => {
                const x = i * 60 + 30;
                const y = chartHeight - (point.value / maxValue) * (chartHeight - 40);
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")}
            fill="none"
            stroke={config.color}
            strokeWidth="3"
          />
          {config.data.map((point, i) => {
            const x = i * 60 + 30;
            const y = chartHeight - (point.value / maxValue) * (chartHeight - 40);
            return <circle key={i} cx={x} cy={y} r="5" fill={config.color} />;
          })}
        </svg>
        <div className="flex justify-between mt-2 px-4">
          {config.data.map((point, i) => (
            <span key={i} className="text-xs text-slate-500">{point.label}</span>
          ))}
        </div>
      </div>
      {config.showSecondary && (
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }}></div>
            <span className="text-sm text-slate-600">Current Event</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.secondaryColor }}></div>
            <span className="text-sm text-slate-600">Previous Event</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DataTable({ config }: { config: TableConfig }) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const sortedRows = [...config.rows].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const comparison = typeof aVal === "number" ? aVal - (bVal as number) : String(aVal).localeCompare(String(bVal));
    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">{config.title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {config.columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider ${
                    col.sortable ? "cursor-pointer hover:bg-slate-100" : ""
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (sortOrder === "asc" ? " ↑" : " ↓")}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedRows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {config.columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-slate-700">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DemographicsChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Attendee Demographics by Region</h3>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{item.label}</span>
              <span className="font-medium text-slate-900">{item.value}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={navItems} activeItem={activeNav} onItemClick={setActiveNav} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Event Analytics Dashboard</h1>
            <p className="text-slate-500 mt-1">TechConf 2024 - Live Event Metrics</p>
          </header>

          <div className="space-y-6">
            <StatsCards stats={statsData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart
                config={{
                  title: "Attendance Over Time",
                  data: attendanceData,
                  color: "#3B82F6",
                  secondaryColor: "#94A3B8",
                  showSecondary: true,
                }}
              />
              <LineChart
                config={{
                  title: "Daily Engagement Rate",
                  data: engagementData,
                  color: "#10B981",
                }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DataTable config={sessionTableData} />
              </div>
              <DemographicsChart data={demographicsData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;