import React, { useState } from "react";

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface CategoryTotal {
  category: string;
  total: number;
  color: string;
}

interface NavItem {
  label: string;
  id: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

const sampleExpenses: Expense[] = [
  { id: 1, category: "Food", amount: 45.50, date: "2024-01-15", description: "Groceries" },
  { id: 2, category: "Transport", amount: 30.00, date: "2024-01-16", description: "Gas" },
  { id: 3, category: "Entertainment", amount: 25.00, date: "2024-01-17", description: "Movie tickets" },
  { id: 4, category: "Food", amount: 65.00, date: "2024-01-18", description: "Restaurant" },
  { id: 5, category: "Utilities", amount: 120.00, date: "2024-01-19", description: "Electric bill" },
  { id: 6, category: "Shopping", amount: 89.99, date: "2024-01-20", description: "Clothes" },
  { id: 7, category: "Food", amount: 32.00, date: "2024-01-21", description: "Coffee shop" },
  { id: 8, category: "Transport", amount: 45.00, date: "2024-01-22", description: "Uber rides" },
  { id: 9, category: "Entertainment", amount: 15.99, date: "2024-01-23", description: "Netflix" },
  { id: 10, category: "Utilities", amount: 85.00, date: "2024-01-24", description: "Internet" },
];

const categoryColors: Record<string, string> = {
  "Food": "#22c55e",
  "Transport": "#3b82f6",
  "Entertainment": "#f59e0b",
  "Utilities": "#ef4444",
  "Shopping": "#8b5cf6",
};

function Navigation({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) {
  const navItems: NavItem[] = [
    { label: "Dashboard", id: "dashboard" },
    { label: "Expenses", id: "expenses" },
    { label: "Analytics", id: "analytics" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">💰 FinanceTracker</h1>
        <div className="flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-indigo-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ totalExpenses, totalCategories }: { totalExpenses: number; totalCategories: number }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-xl opacity-90 mb-8">Track your spending and take control of your finances</p>
        <div className="flex gap-8">
          <div className="bg-white/20 rounded-xl p-6">
            <p className="text-sm opacity-80">Total Spent This Month</p>
            <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white/20 rounded-xl p-6">
            <p className="text-sm opacity-80">Active Categories</p>
            <p className="text-3xl font-bold">{totalCategories}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LineChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const chartHeight = 200;
  const chartWidth = 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Spending Trend</h3>
      <div className="relative h-56">
        <svg viewBox={`0 0 ${data.length * 50} ${chartHeight}`} className="w-full h-full">
          <polyline
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            points={data
              .map((d, i) => `${i * 50 + 25},${chartHeight - (d.value / maxValue) * (chartHeight - 40)}`)
              .join(" ")}
          />
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={i * 50 + 25}
                cy={chartHeight - (d.value / maxValue) * (chartHeight - 40)}
                r="6"
                fill="#6366f1"
              />
              <text
                x={i * 50 + 25}
                y={chartHeight - 5}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {d.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function CategoryChart({ categories }: { categories: CategoryTotal[] }) {
  const maxTotal = Math.max(...categories.map((c) => c.total));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Spending by Category</h3>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{cat.category}</span>
              <span className="font-medium">${cat.total.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${(cat.total / maxTotal) * 100}%`,
                  backgroundColor: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpenseGrid({ expenses }: { expenses: Expense[] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Expenses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className="px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: categoryColors[expense.category] || "#6b7280" }}
              >
                {expense.category}
              </span>
              <span className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</span>
            </div>
            <p className="text-gray-600 text-sm">{expense.description}</p>
            <p className="text-gray-400 text-xs mt-2">{expense.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddExpenseForm({ onAdd }: { onAdd: (expense: Omit<Expense, "id">) => void }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && description) {
      onAdd({
        category,
        amount: parseFloat(amount),
        description,
        date: new Date().toISOString().split("T")[0],
      });
      setAmount("");
      setDescription("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {Object.keys(categoryColors).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you spend on?"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals: CategoryTotal[] = Object.keys(categoryColors).map((category) => ({
    category,
    total: expenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0),
    color: categoryColors[category],
  })).filter((c) => c.total > 0);

  const dailyData: ChartDataPoint[] = [];
  const dateMap = new Map<string, number>();
  expenses.forEach((exp) => {
    const day = exp.date.split("-")[2];
    dateMap.set(day, (dateMap.get(day) || 0) + exp.amount);
  });
  Array.from(dateMap.entries())
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .forEach(([day, value]) => {
      dailyData.push({ label: day, value });
    });

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <HeroSection totalExpenses={totalExpenses} totalCategories={categoryTotals.length} />
      <main className="max-w-6xl mx-auto py-8 px-6">
        {activeSection === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LineChart data={dailyData} />
              <CategoryChart categories={categoryTotals} />
            </div>
            <ExpenseGrid expenses={expenses.slice(-6)} />
          </div>
        )}
        {activeSection === "expenses" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ExpenseGrid expenses={expenses} />
            </div>
            <div>
              <AddExpenseForm onAdd={handleAddExpense} />
            </div>
          </div>
        )}
        {activeSection === "analytics" && (
          <div className="space-y-8">
            <LineChart data={dailyData} />
            <CategoryChart categories={categoryTotals} />
          </div>
        )}
      </main>
      <footer className="bg-white border-t py-6 mt-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500">
          <p>© 2024 FinanceTracker. Keep your finances in check! 💰</p>
        </div>
      </footer>
    </div>
  );
}

export default App;