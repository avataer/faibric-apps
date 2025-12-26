import React, { useState } from "react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface FilterState {
  dateRange: { start: string; end: string };
  selectedCampaigns: string[];
  status: string;
}

interface TableColumn {
  key: keyof Campaign | "ctr" | "roi";
  label: string;
  sortable?: boolean;
}

const sampleCampaigns: Campaign[] = [
  { id: "1", name: "Summer Sale 2024", status: "active", spend: 15000, revenue: 45000, impressions: 250000, clicks: 12500, conversions: 625, startDate: "2024-06-01", endDate: "2024-08-31" },
  { id: "2", name: "Black Friday Promo", status: "completed", spend: 25000, revenue: 87500, impressions: 500000, clicks: 35000, conversions: 1750, startDate: "2024-11-20", endDate: "2024-11-30" },
  { id: "3", name: "Brand Awareness Q4", status: "active", spend: 8000, revenue: 16000, impressions: 180000, clicks: 5400, conversions: 162, startDate: "2024-10-01", endDate: "2024-12-31" },
  { id: "4", name: "Product Launch", status: "paused", spend: 12000, revenue: 28800, impressions: 320000, clicks: 16000, conversions: 480, startDate: "2024-09-15", endDate: "2024-10-15" },
  { id: "5", name: "Holiday Campaign", status: "active", spend: 20000, revenue: 68000, impressions: 420000, clicks: 25200, conversions: 1008, startDate: "2024-12-01", endDate: "2024-12-25" },
];

function StatsCard({ title, value, change, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {change >= 0 ? "+" : ""}{change}% from last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  );
}

function Sidebar({ navItems, onNavClick }: { navItems: NavItem[]; onNavClick: (id: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span className="text-white font-bold text-xl">AdMetrics</span>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              item.active ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function FilterForm({ filters, campaigns, onFilterChange }: { filters: FilterState; campaigns: Campaign[]; onFilterChange: (filters: FilterState) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
          <select
            multiple
            value={filters.selectedCampaigns}
            onChange={(e) => onFilterChange({ ...filters, selectedCampaigns: Array.from(e.target.selectedOptions, (opt) => opt.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-20"
          >
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
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
  const columns: TableColumn[] = [
    { key: "name", label: "Campaign Name", sortable: true },
    { key: "status", label: "Status" },
    { key: "spend", label: "Spend", sortable: true },
    { key: "revenue", label: "Revenue", sortable: true },
    { key: "roi", label: "ROI" },
    { key: "ctr", label: "CTR" },
    { key: "conversions", label: "Conversions", sortable: true },
  ];

  const getStatusBadge = (status: Campaign["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign) => {
              const ctr = ((campaign.clicks / campaign.impressions) * 100).toFixed(2);
              const roi = (((campaign.revenue - campaign.spend) / campaign.spend) * 100).toFixed(1);
              return (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(campaign.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">${campaign.spend.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">${campaign.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={Number(roi) >= 0 ? "text-green-600" : "text-red-600"}>{roi}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{ctr}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{campaign.conversions.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SpendVsROIChart({ campaigns }: { campaigns: Campaign[] }) {
  const maxSpend = Math.max(...campaigns.map((c) => c.spend));
  const maxROI = Math.max(...campaigns.map((c) => ((c.revenue - c.spend) / c.spend) * 100));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend vs ROI</h3>
      <div className="h-64 flex items-end gap-4">
        {campaigns.map((campaign) => {
          const roi = ((campaign.revenue - campaign.spend) / campaign.spend) * 100;
          const spendHeight = (campaign.spend / maxSpend) * 100;
          const roiHeight = (roi / maxROI) * 100;
          return (
            <div key={campaign.id} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex gap-1 items-end h-48">
                <div className="flex-1 bg-indigo-500 rounded-t" style={{ height: `${spendHeight}%` }} title={`Spend: $${campaign.spend}`}></div>
                <div className="flex-1 bg-green-500 rounded-t" style={{ height: `${roiHeight}%` }} title={`ROI: ${roi.toFixed(1)}%`}></div>
              </div>
              <p className="text-xs text-gray-500 text-center truncate w-full">{campaign.name.split(" ")[0]}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-500 rounded"></div><span className="text-sm text-gray-600">Spend</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div><span className="text-sm text-gray-600">ROI</span></div>
      </div>
    </div>
  );
}

function ConversionChart({ campaigns }: { campaigns: Campaign[] }) {
  const maxConversions = Math.max(...campaigns.map((c) => c.conversions));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Tracking</h3>
      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const width = (campaign.conversions / maxConversions) * 100;
          const convRate = ((campaign.conversions / campaign.clicks) * 100).toFixed(2);
          return (
            <div key={campaign.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{campaign.name}</span>
                <span className="text-gray-500">{campaign.conversions} ({convRate}%)</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{ width: `${width}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: "2024-01-01", end: "2024-12-31" },
    selectedCampaigns: [],
    status: "all",
  });

  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", active: activeNav === "dashboard", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: "campaigns", label: "Campaigns", active: activeNav === "campaigns", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
    { id: "analytics", label: "Analytics", active: activeNav === "analytics", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { id: "settings", label: "Settings", active: activeNav === "settings", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  const filteredCampaigns = sampleCampaigns.filter((c) => {
    if (filters.status !== "all" && c.status !== filters.status) return false;
    if (filters.selectedCampaigns.length > 0 && !filters.selectedCampaigns.includes(c.id)) return false;
    return true;
  });

  const totalSpend = filteredCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = filteredCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalClicks = filteredCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = filteredCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0";
  const overallROI = totalSpend > 0 ? (((totalRevenue - totalSpend) / totalSpend) * 100).toFixed(1) : "0";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar navItems={navItems} onNavClick={setActiveNav} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Analytics</h1>
          <p className="text-gray-500 mt-1">Monitor your advertising performance and optimize your campaigns</p>
        </div>

        <FilterForm filters={filters} campaigns={sampleCampaigns} onFilterChange={setFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard title="Total Spend" value={`$${totalSpend.toLocaleString()}`} change={12.5} color="bg-blue-100" icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <StatsCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} change={18.2} color="bg-green-100" icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
          <StatsCard title="Average CTR" value={`${avgCTR}%`} change={5.3} color="bg-purple-100" icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>} />
          <StatsCard title="Overall ROI" value={`${overallROI}%`} change={Number(overallROI) > 0 ? 8.7 : -3.2} color="bg-orange-100" icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />
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