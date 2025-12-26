import React, { useState } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface FormData {
  description: string;
  amount: string;
  category: string;
  date: string;
}

const sampleExpenses: Expense[] = [
  { id: "EXP001", description: "Office Supplies", amount: 245.50, category: "Supplies", date: "2024-01-15", status: "approved", submittedBy: "John Smith" },
  { id: "EXP002", description: "Client Dinner", amount: 189.00, category: "Meals", date: "2024-01-14", status: "pending", submittedBy: "Sarah Johnson" },
  { id: "EXP003", description: "Software License", amount: 599.00, category: "Software", date: "2024-01-13", status: "approved", submittedBy: "Mike Davis" },
  { id: "EXP004", description: "Travel - Conference", amount: 1250.00, category: "Travel", date: "2024-01-12", status: "pending", submittedBy: "Emily Chen" },
  { id: "EXP005", description: "Team Building Event", amount: 450.00, category: "Events", date: "2024-01-11", status: "rejected", submittedBy: "John Smith" },
  { id: "EXP006", description: "Marketing Materials", amount: 320.00, category: "Marketing", date: "2024-01-10", status: "approved", submittedBy: "Lisa Wong" },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "expenses", label: "Expenses", icon: "💰" },
  { id: "submit", label: "Submit Expense", icon: "➕" },
  { id: "approvals", label: "Approvals", icon: "✅" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const statCards: StatCard[] = [
  { title: "Total Expenses", value: "$12,450", change: "+12.5%", changeType: "positive", icon: "💵" },
  { title: "Pending Approval", value: "8", change: "-3", changeType: "positive", icon: "⏳" },
  { title: "Monthly Budget", value: "$15,000", change: "83% used", changeType: "neutral", icon: "📊" },
  { title: "Rejected This Month", value: "2", change: "+1", changeType: "negative", icon: "❌" },
];

const categoryData: CategoryData[] = [
  { name: "Travel", amount: 4500, percentage: 36, color: "bg-blue-500" },
  { name: "Software", amount: 2800, percentage: 22, color: "bg-green-500" },
  { name: "Meals", amount: 1900, percentage: 15, color: "bg-yellow-500" },
  { name: "Supplies", amount: 1500, percentage: 12, color: "bg-purple-500" },
  { name: "Marketing", amount: 1100, percentage: 9, color: "bg-pink-500" },
  { name: "Other", amount: 650, percentage: 6, color: "bg-gray-500" },
];

function Sidebar({ activeNav, onNavChange }: { activeNav: string; onNavChange: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span>💼</span> ExpenseFlow
        </h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeNav === item.id
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span>JD</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-slate-400">Finance Manager</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{card.icon}</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              card.changeType === "positive" ? "bg-green-100 text-green-700" :
              card.changeType === "negative" ? "bg-red-100 text-red-700" :
              "bg-slate-100 text-slate-700"
            }`}>
              {card.change}
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">{card.title}</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

function ExpenseTable({ expenses, onStatusChange }: { expenses: Expense[]; onStatusChange: (id: string, status: "approved" | "rejected") => void }) {
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Recent Expenses</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{expense.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{expense.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">${expense.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{expense.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(expense.status)}`}>
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {expense.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onStatusChange(expense.id, "approved")}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onStatusChange(expense.id, "rejected")}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExpenseForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ description: "", amount: "", category: "", date: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Submit New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter expense description"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          >
            <option value="">Select a category</option>
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Software">Software</option>
            <option value="Supplies">Supplies</option>
            <option value="Marketing">Marketing</option>
            <option value="Events">Events</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Expense
        </button>
      </form>
    </div>
  );
}

function CategoryBreakdown() {
  const total = categoryData.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Spending by Category</h2>
      <div className="space-y-4">
        {categoryData.map((category, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">{category.name}</span>
              <span className="text-sm text-slate-500">${category.amount.toLocaleString()} ({category.percentage}%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className={`${category.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Total Spending</span>
          <span className="text-lg font-bold text-slate-900">${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function SpendingChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const values = [8500, 9200, 7800, 11200, 10500, 12450];
  const maxValue = Math.max(...values);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Monthly Spending Trend</h2>
      <div className="flex items-end justify-between h-48 gap-4">
        {months.map((month, index) => (
          <div key={month} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center">
              <span className="text-xs text-slate-500 mb-2">${(values[index] / 1000).toFixed(1)}k</span>
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                style={{ height: `${(values[index] / maxValue) * 150}px` }}
              />
            </div>
            <span className="text-sm text-slate-600 mt-2 font-medium">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    setExpenses(expenses.map((exp) =>
      exp.id === id ? { ...exp, status } : exp
    ));
  };

  const handleExpenseSubmit = (data: FormData) => {
    const newExpense: Expense = {
      id: `EXP${String(expenses.length + 1).padStart(3, "0")}`,
      description: data.description,
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date,
      status: "pending",
      submittedBy: "John Doe",
    };
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Expense Dashboard</h1>
          <p className="text-slate-500 mt-1">Track and manage your organization expenses</p>
        </header>
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <div>
            <CategoryBreakdown />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ExpenseTable expenses={expenses} onStatusChange={handleStatusChange} />
          </div>
          <div>
            <ExpenseForm onSubmit={handleExpenseSubmit} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;