import React, { useState } from "react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  spend: number;
  revenue: number;
  clicks: number;
  impressions: number;
  conversions: number;
  ctr: number;
  roi: number;
  startDate: string;
  endDate: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

interface MetricCard {
  title: string;
  value: string;
  change: number;
  changeType: "positive" | "negative" | "neutral";
}

interface FilterState {
  dateRange: string;
  selectedCampaign: string;
  status: string;
}

const sampleCampaigns: Campaign[] = [
  { id: "1", name: "Summer Sale 2024", status: "active", spend: 15000, revenue: 45000, clicks: 12500, impressions: 250000, conversions: 850, ctr: 5.0, roi: 200, startDate: "2024-06-01", endDate: "2024-08-31" },
  { id: "2", name: "Brand Awareness Q2", status: "completed", spend: 8000, revenue: 12000, clicks: 6200, impressions: 180000, conversions: 320, ctr: 3.44, roi: 50, startDate: "2024-04-01", endDate: "2024-06-30" },
  { id: "3", name: "Product Launch X", status: "active", spend: 25000, revenue: 75000, clicks: 18000, impressions: 400000, conversions: 1200, ctr: 4.5, roi: 200, startDate: "2024-07-15", endDate: "2024-09-15" },
  { id: "4", name: "Holiday Promo", status: "paused", spend: 5000, revenue: 8500, clicks: 3800, impressions: 95000, conversions: 180, ctr: 4.0, roi: 70, startDate: "2024-11-01", endDate: "2024-12-31" },
  { id: "5", name: "Retargeting Campaign", status: "active", spend: 12000, revenue: 36000, clicks: 9500, impressions: 150000, conversions: 720, ctr: 6.33, roi: 200, startDate: "2024-05-01", endDate: "2024-10-31" },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "campaigns", label: "Campaigns", icon: "📢", active: false },
  { id: "analytics", label: "Analytics", icon: "📈", active: false },
  { id: "reports", label: "Reports", icon: "📄", active: false },
  { id: "settings", label: "Settings", icon: "⚙️", active: false },
];

function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>📊</span>
          <span>AdMetrics Pro</span>
        </h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-8 border-t border-gray-700 mt-8">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">JD</div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MetricCardComponent({ title, value, change, changeType }: MetricCard) {
  const changeColor = changeType === "positive" ? "text-green-500" : changeType === "negative" ? "text-red-500" : "text-gray-500";
  const changeIcon = changeType === "positive" ? "↑" : changeType === "negative" ? "↓" : "→";

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-sm mt-2 ${changeColor}`}>
        {changeIcon} {Math.abs(change)}% vs last period
      </p>
    </div>
  );
}

function FilterForm({ filters, onChange }: { filters: FilterState; onChange: (filters: FilterState) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
      <h3 className="font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => onChange({ ...filters, dateRange: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Campaign</label>
          <select
            value={filters.selectedCampaign}
            onChange={(e) => onChange({ ...filters, selectedCampaign: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Campaigns</option>
            {sampleCampaigns.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-semibold text-lg">Campaign Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Spend</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">CTR</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Conversions</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-gray-900">${campaign.spend.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-gray-900">${campaign.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-gray-900">{campaign.ctr.toFixed(2)}%</td>
                <td className="px-6 py-4 text-right text-gray-900">{campaign.conversions.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <span className={campaign.roi >= 100 ? "text-green-600 font-medium" : "text-gray-900"}>
                    {campaign.roi}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SpendVsROIChart({ campaigns }: { campaigns: Campaign[] }) {
  const maxSpend = Math.max(...campaigns.map(c => c.spend));
  const maxROI = Math.max(...campaigns.map(c => c.roi));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-lg mb-4">Spend vs ROI</h3>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{campaign.name}</span>
              <span className="text-gray-900">${campaign.spend.toLocaleString()} | {campaign.roi}% ROI</span>
            </div>
            <div className="flex gap-2 h-6">
              <div
                className="bg-blue-500 rounded"
                style={{ width: `${(campaign.spend / maxSpend) * 50}%` }}
                title={`Spend: $${campaign.spend}`}
              ></div>
              <div
                className="bg-green-500 rounded"
                style={{ width: `${(campaign.roi / maxROI) * 50}%` }}
                title={`ROI: ${campaign.roi}%`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Spend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>ROI</span>
        </div>
      </div>
    </div>
  );
}

function ConversionChart({ campaigns }: { campaigns: Campaign[] }) {
  const maxConversions = Math.max(...campaigns.map(c => c.conversions));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-lg mb-4">Conversion Tracking</h3>
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-40 truncate">{campaign.name}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full"
                style={{ width: `${(campaign.conversions / maxConversions) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium w-16 text-right">{campaign.conversions}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "30d",
    selectedCampaign: "all",
    status: "all",
  });

  const [navItemsState, setNavItemsState] = useState(navItems);

  const handleNavSelect = (id: string) => {
    setNavItemsState(navItemsState.map(item => ({
      ...item,
      active: item.id === id,
    })));
  };

  const filteredCampaigns = sampleCampaigns.filter((campaign) => {
    if (filters.selectedCampaign !== "all" && campaign.id !== filters.selectedCampaign) return false;
    if (filters.status !== "all" && campaign.status !== filters.status) return false;
    return true;
  });

  const totalSpend = filteredCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = filteredCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgCTR = filteredCampaigns.length > 0 
    ? filteredCampaigns.reduce((sum, c) => sum + c.ctr, 0) / filteredCampaigns.length 
    : 0;

  const metrics: MetricCard[] = [
    { title: "Total Spend", value: `$${totalSpend.toLocaleString()}`, change: 12.5, changeType: "negative" },
    { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: 24.3, changeType: "positive" },
    { title: "Conversions", value: totalConversions.toLocaleString(), change: 18.7, changeType: "positive" },
    { title: "Avg CTR", value: `${avgCTR.toFixed(2)}%`, change: 5.2, changeType: "positive" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar items={navItemsState} onSelect={handleNavSelect} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Campaign Analytics Dashboard</h2>
          <p className="text-gray-500">Track and analyze your ad campaign performance</p>
        </div>
        <FilterForm filters={filters} onChange={setFilters} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <MetricCardComponent key={index} {...metric} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpendVsROIChart campaigns={filteredCampaigns} />
          <ConversionChart campaigns={filteredCampaigns} />
        </div>
        <CampaignTable campaigns={filteredCampaigns} />
      </main>
    </div>
  );
}

export default App;