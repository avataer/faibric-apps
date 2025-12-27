import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: string;
}

interface KPIMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

interface CashFlowData {
  month: string;
  income: number;
  expense: number;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "transactions", label: "Transactions", icon: "💳" },
  { id: "invoices", label: "Invoices", icon: "📄" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const invoices: Invoice[] = [
  { id: "INV-001", client: "Acme Corp", amount: 15000, status: "paid", dueDate: "2024-01-15" },
  { id: "INV-002", client: "TechStart Inc", amount: 8500, status: "pending", dueDate: "2024-01-25" },
  { id: "INV-003", client: "Global Services", amount: 22000, status: "overdue", dueDate: "2024-01-05" },
  { id: "INV-004", client: "Digital Agency", amount: 12000, status: "paid", dueDate: "2024-01-20" },
  { id: "INV-005", client: "StartupXYZ", amount: 5500, status: "pending", dueDate: "2024-01-30" },
];

const transactions: Transaction[] = [
  { id: "TXN-001", description: "Client Payment - Acme Corp", amount: 15000, type: "income", date: "2024-01-15", category: "Services" },
  { id: "TXN-002", description: "Office Rent", amount: 3500, type: "expense", date: "2024-01-01", category: "Operations" },
  { id: "TXN-003", description: "Software Subscriptions", amount: 890, type: "expense", date: "2024-01-05", category: "Tools" },
  { id: "TXN-004", description: "Consulting Fee", amount: 8500, type: "income", date: "2024-01-10", category: "Services" },
  { id: "TXN-005", description: "Marketing Campaign", amount: 2200, type: "expense", date: "2024-01-12", category: "Marketing" },
  { id: "TXN-006", description: "Employee Salaries", amount: 25000, type: "expense", date: "2024-01-15", category: "Payroll" },
];

const kpiMetrics: KPIMetric[] = [
  { label: "Total Revenue", value: "$124,500", change: 12.5, trend: "up" },
  { label: "Net Profit", value: "$45,200", change: 8.3, trend: "up" },
  { label: "Operating Expenses", value: "$79,300", change: -3.2, trend: "down" },
  { label: "Profit Margin", value: "36.3%", change: 2.1, trend: "up" },
];

const cashFlowData: CashFlowData[] = [
  { month: "Aug", income: 42000, expense: 28000 },
  { month: "Sep", income: 38000, expense: 32000 },
  { month: "Oct", income: 55000, expense: 35000 },
  { month: "Nov", income: 48000, expense: 30000 },
  { month: "Dec", income: 62000, expense: 38000 },
  { month: "Jan", income: 58000, expense: 42000 },
];

function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-emerald-400">FinanceHub</h1>
        <p className="text-slate-400 text-sm">Revenue Dashboard</p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? "bg-emerald-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function StatCard({ metric }: { metric: KPIMetric }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <p className="text-slate-500 text-sm font-medium">{metric.label}</p>
      <p className="text-2xl font-bold text-slate-800 mt-2">{metric.value}</p>
      <div className="flex items-center mt-2">
        <span className={metric.trend === "up" ? "text-emerald-500" : "text-red-500"}>
          {metric.trend === "up" ? "↑" : "↓"} {Math.abs(metric.change)}%
        </span>
        <span className="text-slate-400 text-sm ml-2">vs last month</span>
      </div>
    </div>
  );
}

function CashFlowChart({ data }: { data: CashFlowData[] }) {
  const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expense]));
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Cash Flow Overview</h3>
      <div className="flex items-end gap-4 h-48">
        {data.map((item) => (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
            <div className="flex gap-1 items-end h-36 w-full">
              <div
                className="flex-1 bg-emerald-500 rounded-t"
                style={{ height: `${(item.income / maxValue) * 100}%` }}
              ></div>
              <div
                className="flex-1 bg-red-400 rounded-t"
                style={{ height: `${(item.expense / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-500">{item.month}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span className="text-sm text-slate-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span className="text-sm text-slate-600">Expenses</span>
        </div>
      </div>
    </div>
  );
}

function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  const statusColors = {
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-yellow-100 text-yellow-700",
    overdue: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">Invoice Status</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-800">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{invoice.client}</td>
                <td className="px-6 py-4 text-sm text-slate-800">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{invoice.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[invoice.status]}`}>
                    {invoice.status}
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

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-slate-200">
        {transactions.map((txn) => (
          <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                txn.type === "income" ? "bg-emerald-100" : "bg-red-100"
              }`}>
                <span>{txn.type === "income" ? "↓" : "↑"}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{txn.description}</p>
                <p className="text-xs text-slate-500">{txn.category} • {txn.date}</p>
              </div>
            </div>
            <span className={`font-semibold ${
              txn.type === "income" ? "text-emerald-600" : "text-red-600"
            }`}>
              {txn.type === "income" ? "+" : "-"}${txn.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const navItemsWithActive = navItems.map((item) => ({
    ...item,
    active: item.id === activeNav,
  }));

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar items={navItemsWithActive} onSelect={setActiveNav} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Financial Dashboard</h2>
          <p className="text-slate-500">Track your revenue, expenses, and cash flow</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiMetrics.map((metric, index) => (
            <StatCard key={index} metric={metric} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CashFlowChart data={cashFlowData} />
          <TransactionList transactions={transactions} />
        </div>
        <div>
          <InvoiceTable invoices={invoices} />
        </div>
      </main>
    </div>
  );
}

export default App;