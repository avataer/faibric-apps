import React, { useState } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface SidebarProps {
  items: NavItem[];
  onItemClick: (id: string) => void;
  activeItem: string;
}

interface StatCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: string;
}

interface StatsCardsProps {
  cards: StatCard[];
}

interface ChartDataPoint {
  label: string;
  value: number;
  predicted?: boolean;
}

interface LineChartProps {
  title: string;
  data: ChartDataPoint[];
  color: string;
  showPrediction?: boolean;
}

interface TableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
}

interface TableRow {
  [key: string]: string | number | React.ReactNode;
}

interface DataTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  title: string;
}

interface Recommendation {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
  impact: string;
}

// Navigation Sidebar Component
function NavigationSidebar({ items, onItemClick, activeItem }: SidebarProps) {
  const icons: Record<string, React.ReactNode> = {
    dashboard: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    analytics: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    customers: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    reports: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    settings: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };

  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-white font-bold text-xl">InsightAI</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeItem === item.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {icons[item.icon]}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-slate-700 pt-4 mt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-white font-medium text-sm">John Doe</p>
            <p className="text-slate-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Stats Cards Component
function StatsCards({ cards }: StatsCardsProps) {
  const trendIcons = {
    up: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    neutral: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">{card.title}</span>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900">{card.value}</p>
              <div className={`flex items-center gap-1 mt-2 ${
                card.trend === "up" ? "text-green-600" : card.trend === "down" ? "text-red-600" : "text-slate-500"
              }`}>
                {trendIcons[card.trend]}
                <span className="text-sm font-medium">{Math.abs(card.change)}%</span>
                <span className="text-slate-400 text-sm">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Line Chart Component
function LineChart({ title, data, color, showPrediction }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return 150 - ((value - minValue) / range) * 120;
  };

  const points = data.map((d, i) => ({
    x: 50 + (i * (700 / (data.length - 1))),
    y: getY(d.value),
    ...d,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {showPrediction && (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
            AI Prediction Enabled
          </span>
        )}
      </div>
      <svg viewBox="0 0 800 200" className="w-full h-48">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="50" y1={30 + i * 30} x2="750" y2={30 + i * 30} stroke="#e2e8f0" strokeWidth="1" />
        ))}
        <path d={`${pathD} L ${points[points.length - 1].x} 150 L 50 150 Z`} fill={`url(#gradient-${color})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.predicted ? 6 : 4} fill={p.predicted ? "#9333ea" : color} />
            {p.predicted && <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="#9333ea" strokeWidth="2" strokeDasharray="4 2" />}
            <text x={p.x} y="180" textAnchor="middle" className="text-xs fill-slate-500">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Data Table Component
function DataTable({ columns, rows, title }: DataTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={`px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-${col.align || "left"}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-6 py-4 text-sm text-${col.align || "left"}`}>
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

// Recommendations Component
function RecommendationsPanel({ recommendations }: { recommendations: Recommendation[] }) {
  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const typeIcons = {
    success: "✓",
    warning: "⚠",
    info: "💡",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🤖</span>
        <h3 className="text-lg font-semibold text-slate-900">AI Recommendations</h3>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className={`p-4 rounded-lg border ${typeStyles[rec.type]}`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{typeIcons[rec.type]}</span>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{rec.title}</h4>
                <p className="text-sm opacity-80 mb-2">{rec.description}</p>
                <span className="text-xs font-medium px-2 py-1 bg-white bg-opacity-50 rounded">
                  Impact: {rec.impact}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "analytics", label: "Analytics", icon: "analytics" },
    { id: "customers", label: "Customers", icon: "customers" },
    { id: "reports", label: "Reports", icon: "reports" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const statsCards: StatCard[] = [
    { id: "1", title: "Total Revenue", value: "$284,392", change: 12.5, trend: "up", icon: "💰" },
    { id: "2", title: "Monthly Growth", value: "23.8%", change: 4.2, trend: "up", icon: "📈" },
    { id: "3", title: "Active Customers", value: "12,847", change: 8.1, trend: "up", icon: "👥" },
    { id: "4", title: "Churn Rate", value: "2.4%", change: -1.2, trend: "down", icon: "📊" },
  ];

  const revenueData: ChartDataPoint[] = [
    { label: "Jan", value: 42000 },
    { label: "Feb", value: 48000 },
    { label: "Mar", value: 45000 },
    { label: "Apr", value: 52000 },
    { label: "May", value: 58000 },
    { label: "Jun", value: 64000 },
    { label: "Jul", value: 71000, predicted: true },
    { label: "Aug", value: 78000, predicted: true },
  ];

  const customerData: ChartDataPoint[] = [
    { label: "Jan", value: 8200 },
    { label: "Feb", value: 9100 },
    { label: "Mar", value: 9800 },
    { label: "Apr", value: 10500 },
    { label: "May", value: 11200 },
    { label: "Jun", value: 12847 },
    { label: "Jul", value: 14200, predicted: true },
    { label: "Aug", value: 15800, predicted: true },
  ];

  const tableColumns: TableColumn[] = [
    { key: "customer", header: "Customer", align: "left" },
    { key: "revenue", header: "Revenue", align: "right" },
    { key: "growth", header: "Growth", align: "center" },
    { key: "status", header: "Status", align: "center" },
  ];

  const tableRows: TableRow[] = [
    { customer: <div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">AC</div><span className="font-medium text-slate-900">Acme Corp</span></div>, revenue: "$48,200", growth: <span className="text-green-600 font-medium">+24%</span>, status: <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span> },
    { customer: <div className="flex items-center gap-3"><div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">TI</div><span className="font-medium text-slate-900">Tech Industries</span></div>, revenue: "$36,800", growth: <span className="text-green-600 font-medium">+18%</span>, status: <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span> },
    { customer: <div className="flex items-center gap-3"><div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-semibold text-sm">GS</div><span className="font-medium text-slate-900">Global Systems</span></div>, revenue: "$29,400", growth: <span className="text-red-600 font-medium">-5%</span>, status: <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">At Risk</span> },
    { customer: <div className="flex items-center gap-3"><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">NS</div><span className="font-medium text-slate-900">Nova Solutions</span></div>, revenue: "$24,100", growth: <span className="text-green-600 font-medium">+32%</span>, status: <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span> },
  ];

  const recommendations: Recommendation[] = [
    { id: "1", type: "success", title: "Expansion Opportunity Detected", description: "Acme Corp has shown 24% growth. Consider upselling premium features to maximize revenue potential.", impact: "+$12,000 MRR" },
    { id: "2", type: "warning", title: "Churn Risk Alert", description: "Global Systems engagement has dropped 40% this month. Immediate outreach recommended to prevent churn.", impact: "Save $29,400 ARR" },
    { id: "3", type: "info", title: "Market Trend Insight", description: "AI analysis indicates strong growth in the enterprise segment. Consider shifting marketing focus for Q3.", impact: "+15% Pipeline" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <NavigationSidebar items={navItems} onItemClick={setActiveNav} activeItem={activeNav} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Insights Dashboard</h1>
          <p className="text-slate-500">AI-powered analytics and predictive insights for your business</p>
        </div>
        <StatsCards cards={statsCards} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <LineChart title="Revenue Trend & Forecast" data={revenueData} color="#3b82f6" showPrediction />
          <LineChart title="Customer Growth & Projection" data={customerData} color="#10b981" showPrediction />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <DataTable columns={tableColumns} rows={tableRows} title="Top Customer Accounts" />
          </div>
          <RecommendationsPanel recommendations={recommendations} />
        </div>
      </main>
    </div>
  );
}

export default App;