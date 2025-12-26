import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface SidebarProps {
  items: NavItem[];
  onSelect: (id: string) => void;
  activeId: string;
}

interface StatCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

interface StatsCardsProps {
  cards: StatCard[];
}

interface ChartDataPoint {
  label: string;
  income: number;
  expenses: number;
  cashFlow: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  title: string;
}

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  issueDate: string;
}

interface DataTableProps {
  invoices: Invoice[];
}

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

function Layout({ children, sidebar }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebar}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}

function Sidebar({ items, onSelect, activeId }: SidebarProps) {
  const iconMap: Record<string, React.ReactNode> = {
    dashboard: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    revenue: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    invoices: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    expenses: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    reports: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </span>
          FinanceHub
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeId === item.id
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {iconMap[item.icon]}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-bold">JD</div>
          <div>
            <p className="font-medium text-sm">John Doe</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatsCards({ cards }: StatsCardsProps) {
  const iconMap: Record<string, React.ReactNode> = {
    revenue: (
      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    expenses: (
      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    ),
    cashflow: (
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    ),
    invoices: (
      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            {iconMap[card.icon]}
            <span className={`flex items-center text-sm font-medium ${card.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {card.change >= 0 ? "+" : ""}{card.change}%
              <svg className={`w-4 h-4 ml-1 ${card.change >= 0 ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.changeLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data, title }: LineChartProps) {
  const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expenses, d.cashFlow]));
  const chartHeight = 200;

  const getY = (value: number) => chartHeight - (value / maxValue) * chartHeight;

  const createPath = (key: "income" | "expenses" | "cashFlow") => {
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = getY(d[key]);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    });
    return points.join(" ");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>Income
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>Expenses
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>Cash Flow
          </span>
        </div>
      </div>
      <div className="relative h-52">
        <svg className="w-full h-full" viewBox={`0 0 100 ${chartHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 25, 50, 75, 100].map((p) => (
            <line key={p} x1="0" y1={(p / 100) * chartHeight} x2="100" y2={(p / 100) * chartHeight} stroke="#e5e7eb" strokeWidth="0.5" />
          ))}
          <path d={createPath("income")} fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d={createPath("expenses")} fill="none" stroke="#ef4444" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d={createPath("cashFlow")} fill="none" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.map((d) => (
            <span key={d.label}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataTable({ invoices }: DataTableProps) {
  const statusStyles = {
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    overdue: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{invoice.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[invoice.status]}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.issueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "revenue", label: "Revenue", icon: "revenue" },
    { id: "invoices", label: "Invoices", icon: "invoices" },
    { id: "expenses", label: "Expenses", icon: "expenses" },
    { id: "reports", label: "Reports", icon: "reports" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const statsData: StatCard[] = [
    { id: "1", title: "Total Revenue", value: "$284,520", change: 12.5, changeLabel: "vs last month", icon: "revenue" },
    { id: "2", title: "Total Expenses", value: "$142,380", change: -3.2, changeLabel: "vs last month", icon: "expenses" },
    { id: "3", title: "Net Cash Flow", value: "$142,140", change: 28.4, changeLabel: "vs last month", icon: "cashflow" },
    { id: "4", title: "Pending Invoices", value: "23", change: -8.1, changeLabel: "vs last month", icon: "invoices" },
  ];

  const chartData: ChartDataPoint[] = [
    { label: "Jan", income: 45000, expenses: 32000, cashFlow: 13000 },
    { label: "Feb", income: 52000, expenses: 28000, cashFlow: 24000 },
    { label: "Mar", income: 48000, expenses: 35000, cashFlow: 13000 },
    { label: "Apr", income: 61000, expenses: 42000, cashFlow: 19000 },
    { label: "May", income: 55000, expenses: 38000, cashFlow: 17000 },
    { label: "Jun", income: 67000, expenses: 45000, cashFlow: 22000 },
  ];

  const invoices: Invoice[] = [
    { id: "INV-001", client: "Acme Corporation", amount: 15000, status: "paid", issueDate: "2024-01-15", dueDate: "2024-02-15" },
    { id: "INV-002", client: "TechStart Inc", amount: 8500, status: "pending", issueDate: "2024-01-20", dueDate: "2024-02-20" },
    { id: "INV-003", client: "Global Solutions", amount: 22000, status: "paid", issueDate: "2024-01-10", dueDate: "2024-02-10" },
    { id: "INV-004", client: "StartupXYZ", amount: 5200, status: "overdue", issueDate: "2024-01-05", dueDate: "2024-02-05" },
    { id: "INV-005", client: "MegaCorp Ltd", amount: 18700, status: "pending", issueDate: "2024-01-25", dueDate: "2024-02-25" },
  ];

  return (
    <Layout sidebar={<Sidebar items={navItems} onSelect={setActiveNav} activeId={activeNav} />}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here is your financial overview.</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </button>
        </div>
        <StatsCards cards={statsData} />
        <LineChart data={chartData} title="Cash Flow Overview" />
        <DataTable invoices={invoices} />
      </div>
    </Layout>
  );
}

export default App;