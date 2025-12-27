import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface StatCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

interface TableRow {
  id: string;
  metric: string;
  current: string;
  previous: string;
  change: string;
  trend: "up" | "down" | "stable";
  prediction: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "customers", label: "Customers", icon: "👥" },
  { id: "revenue", label: "Revenue", icon: "💰" },
  { id: "reports", label: "Reports", icon: "📋" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const statsData: StatCard[] = [
  { id: "1", title: "Total Revenue", value: "$1,284,592", change: 12.5, changeType: "positive", icon: "💵" },
  { id: "2", title: "Monthly Growth", value: "23.8%", change: 4.2, changeType: "positive", icon: "📈" },
  { id: "3", title: "Active Customers", value: "14,892", change: 8.1, changeType: "positive", icon: "👤" },
  { id: "4", title: "Churn Rate", value: "2.4%", change: -0.8, changeType: "positive", icon: "📉" },
];

const tableData: TableRow[] = [
  { id: "1", metric: "Customer Acquisition Cost", current: "$42.50", previous: "$48.20", change: "-11.8%", trend: "down", prediction: "$39.80" },
  { id: "2", metric: "Lifetime Value", current: "$1,842", previous: "$1,650", change: "+11.6%", trend: "up", prediction: "$2,100" },
  { id: "3", metric: "Conversion Rate", current: "3.8%", previous: "3.2%", change: "+18.7%", trend: "up", prediction: "4.2%" },
  { id: "4", metric: "Average Order Value", current: "$156", previous: "$142", change: "+9.8%", trend: "up", prediction: "$168" },
  { id: "5", metric: "Net Promoter Score", current: "72", previous: "68", change: "+5.9%", trend: "up", prediction: "76" },
  { id: "6", metric: "Support Tickets", current: "234", previous: "289", change: "-19.0%", trend: "down", prediction: "198" },
];

const recommendations: Recommendation[] = [
  { id: "1", title: "Increase Email Campaign Frequency", description: "AI analysis suggests 15% revenue boost potential by increasing email touchpoints.", impact: "high", category: "Marketing" },
  { id: "2", title: "Optimize Pricing Tier B", description: "Customer behavior patterns indicate opportunity to adjust mid-tier pricing.", impact: "high", category: "Revenue" },
  { id: "3", title: "Launch Referral Program", description: "High NPS scores suggest customers are likely to refer. Expected 20% customer growth.", impact: "medium", category: "Growth" },
  { id: "4", title: "Reduce Support Response Time", description: "Correlation found between faster responses and increased retention rates.", impact: "medium", category: "Operations" },
];

function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🤖</span>
          <span>AI Insights</span>
        </h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  item.active ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"
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

function StatsCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{stat.icon}</span>
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${
                stat.changeType === "positive" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {stat.change > 0 ? "+" : ""}{stat.change}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm mb-1">{stat.title}</h3>
          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function TrendChart() {
  const dataPoints = [35, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92];
  const maxValue = Math.max(...dataPoints);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend Analysis</h3>
      <div className="flex items-end gap-2 h-48">
        {dataPoints.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
              style={{ height: `${(value / maxValue) * 100}%` }}
              title={`$${value}K`}
            ></div>
            <span className="text-xs text-slate-500 mt-2">{months[index]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded"></span>
          <span className="text-slate-600">Revenue (in thousands)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-medium">📈 +24% YoY Growth</span>
        </div>
      </div>
    </div>
  );
}

function DataTable({ data }: { data: TableRow[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Key Metrics & Predictions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Metric</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Current</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Previous</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Change</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">AI Prediction</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-900 font-medium">{row.metric}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{row.current}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{row.previous}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`flex items-center gap-1 ${row.trend === "up" ? "text-green-600" : row.trend === "down" ? "text-red-600" : "text-slate-600"}`}>
                    {row.trend === "up" ? "↑" : row.trend === "down" ? "↓" : "→"}
                    {row.change}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-blue-600 font-medium">{row.prediction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const impactColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">{recommendation.category}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${impactColors[recommendation.impact]}`}>
          {recommendation.impact} impact
        </span>
      </div>
      <h4 className="font-semibold text-slate-900 mb-2">{recommendation.title}</h4>
      <p className="text-sm text-slate-600">{recommendation.description}</p>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const handleNavSelect = (id: string) => {
    setActiveNav(id);
  };

  const updatedNavItems = navItems.map((item) => ({
    ...item,
    active: item.id === activeNav,
  }));

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar items={updatedNavItems} onSelect={handleNavSelect} />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">AI-Powered Business Insights</h2>
          <p className="text-slate-600">Real-time analytics and predictive recommendations powered by machine learning.</p>
        </div>
        <StatsCards stats={statsData} />
        <TrendChart />
        <DataTable data={tableData} />
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">🤖 AI-Generated Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎯</span>
            <h3 className="text-lg font-semibold">Predictive Score</h3>
          </div>
          <p className="text-blue-100 mb-4">Based on current trends, your business health score is projected to improve.</p>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">87</div>
            <div className="text-sm">
              <div className="text-green-300">↑ +5 points</div>
              <div className="text-blue-200">from last month</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;