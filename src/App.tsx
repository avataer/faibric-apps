import React, { useState } from "react";

interface Expense {
  id: number;
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
  isPositive: boolean;
}

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const sampleExpenses: Expense[] = [
  { id: 1, description: "Office Supplies", amount: 150.00, category: "Supplies", date: "2024-01-15", status: "approved", submittedBy: "John Doe" },
  { id: 2, description: "Client Dinner", amount: 280.50, category: "Meals", date: "2024-01-16", status: "pending", submittedBy: "Jane Smith" },
  { id: 3, description: "Flight to NYC", amount: 450.00, category: "Travel", date: "2024-01-17", status: "approved", submittedBy: "Bob Wilson" },
  { id: 4, description: "Software License", amount: 99.99, category: "Software", date: "2024-01-18", status: "rejected", submittedBy: "Alice Brown" },
  { id: 5, description: "Team Building Event", amount: 500.00, category: "Events", date: "2024-01-19", status: "pending", submittedBy: "Charlie Davis" },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "expenses", label: "Expenses", icon: "💰" },
  { id: "submit", label: "Submit Expense", icon: "➕" },
  { id: "analytics", label: "Analytics", icon: "📈" },
];

const statCards: StatCard[] = [
  { title: "Total Expenses", value: "$1,480.49", change: "+12.5%", isPositive: false },
  { title: "Pending Approval", value: "2", change: "-5%", isPositive: true },
  { title: "Approved This Month", value: "$600.00", change: "+8.2%", isPositive: true },
  { title: "Average Expense", value: "$296.10", change: "+3.1%", isPositive: false },
];

const categoryData: CategoryData[] = [
  { category: "Travel", amount: 450, percentage: 30, color: "bg-blue-500" },
  { category: "Meals", amount: 280.50, percentage: 19, color: "bg-green-500" },
  { category: "Events", amount: 500, percentage: 34, color: "bg-purple-500" },
  { category: "Supplies", amount: 150, percentage: 10, color: "bg-yellow-500" },
  { category: "Software", amount: 99.99, percentage: 7, color: "bg-red-500" },
];

function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 p-2">💼 ExpenseHub</div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
              activeTab === item.id ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">{stat.title}</p>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
          <p className={`text-sm mt-2 ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
            {stat.change} from last month
          </p>
        </div>
      ))}
    </div>
  );
}

function ExpenseTable({ expenses, onApprove, onReject }: { expenses: Expense[]; onApprove: (id: number) => void; onReject: (id: number) => void }) {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return styles[status] || "";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Recent Expenses</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Description</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Submitted By</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-4">{expense.description}</td>
                <td className="p-4">${expense.amount.toFixed(2)}</td>
                <td className="p-4">{expense.category}</td>
                <td className="p-4">{expense.date}</td>
                <td className="p-4">{expense.submittedBy}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(expense.status)}`}>
                    {expense.status}
                  </span>
                </td>
                <td className="p-4">
                  {expense.status === "pending" && (
                    <div className="flex gap-2">
                      <button onClick={() => onApprove(expense.id)} className="text-green-600 hover:text-green-800 text-sm">✓ Approve</button>
                      <button onClick={() => onReject(expense.id)} className="text-red-600 hover:text-red-800 text-sm">✗ Reject</button>
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

function ExpenseForm({ onSubmit }: { onSubmit: (expense: Omit<Expense, "id" | "status">) => void }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Supplies");
  const [date, setDate] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      amount: parseFloat(amount),
      category,
      date,
      submittedBy,
    });
    setDescription("");
    setAmount("");
    setCategory("Supplies");
    setDate("");
    setSubmittedBy("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Submit New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Supplies</option>
              <option>Meals</option>
              <option>Travel</option>
              <option>Software</option>
              <option>Events</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input type="text" value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Submit Expense</button>
      </form>
    </div>
  );
}

function Analytics() {
  const maxAmount = Math.max(...categoryData.map((c) => c.amount));
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
        <div className="space-y-4">
          {categoryData.map((cat, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{cat.category}</span>
                <span className="font-medium">${cat.amount.toFixed(2)} ({cat.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className={`${cat.color} h-4 rounded-full transition-all`} style={{ width: `${(cat.amount / maxAmount) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoryData.map((cat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`w-4 h-4 ${cat.color} rounded-full mx-auto mb-2`}></div>
              <p className="text-sm font-medium">{cat.category}</p>
              <p className="text-lg font-bold">{cat.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);

  const handleApprove = (id: number) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, status: "approved" } : exp)));
  };

  const handleReject = (id: number) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, status: "rejected" } : exp)));
  };

  const handleSubmitExpense = (expense: Omit<Expense, "id" | "status">) => {
    const newExpense: Expense = {
      ...expense,
      id: expenses.length + 1,
      status: "pending",
    };
    setExpenses([...expenses, newExpense]);
    setActiveTab("expenses");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <StatsCards />
            <ExpenseTable expenses={expenses} onApprove={handleApprove} onReject={handleReject} />
          </div>
        );
      case "expenses":
        return <ExpenseTable expenses={expenses} onApprove={handleApprove} onReject={handleReject} />;
      case "submit":
        return <ExpenseForm onSubmit={handleSubmitExpense} />;
      case "analytics":
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {navItems.find((item) => item.id === activeTab)?.label || "Dashboard"}
          </h1>
          <p className="text-gray-500">Manage and track your expenses</p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;