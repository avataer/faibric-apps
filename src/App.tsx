import React, { useState } from "react";

interface NavItem {
  label: string;
  id: string;
  icon: string;
}

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

interface ForecastDataPoint {
  month: string;
  actual: number;
  forecast: number;
  budget: number;
}

interface Scenario {
  id: string;
  name: string;
  modifier: number;
  description: string;
}

const NavigationHeader = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) => {
  const navItems: NavItem[] = [
    { label: "Dashboard", id: "dashboard", icon: "📊" },
    { label: "Budget", id: "budget", icon: "💰" },
    { label: "Forecast", id: "forecast", icon: "📈" },
    { label: "Scenarios", id: "scenarios", icon: "🎯" },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🤖</span>
            <h1 className="text-xl font-bold">AI Budget Forecaster</h1>
          </div>
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-white text-indigo-600 font-semibold"
                    : "hover:bg-white/20"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const LineChart = ({
  data,
  title,
}: {
  data: ForecastDataPoint[];
  title: string;
}) => {
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.actual, d.forecast, d.budget])
  );
  const chartHeight = 200;

  const getY = (value: number) =>
    chartHeight - (value / maxValue) * chartHeight;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative">
        <svg viewBox={`0 0 600 ${chartHeight + 40}`} className="w-full h-64">
          {data.map((point, i) => {
            const x = 50 + i * (500 / (data.length - 1));
            return (
              <g key={point.month}>
                <line
                  x1={x}
                  y1={chartHeight}
                  x2={x}
                  y2={chartHeight + 5}
                  stroke="#ccc"
                />
                <text
                  x={x}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {point.month}
                </text>
              </g>
            );
          })}
          <polyline
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            points={data
              .map(
                (d, i) =>
                  `${50 + i * (500 / (data.length - 1))},${getY(d.actual)}`
              )
              .join(" ")}
          />
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeDasharray="5,5"
            points={data
              .map(
                (d, i) =>
                  `${50 + i * (500 / (data.length - 1))},${getY(d.forecast)}`
              )
              .join(" ")}
          />
          <polyline
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="10,5"
            points={data
              .map(
                (d, i) =>
                  `${50 + i * (500 / (data.length - 1))},${getY(d.budget)}`
              )
              .join(" ")}
          />
        </svg>
        <div className="flex justify-center space-x-6 mt-2">
          <div className="flex items-center">
            <div className="w-4 h-1 bg-indigo-500 mr-2"></div>
            <span className="text-sm text-gray-600">Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-emerald-500 mr-2 border-dashed"></div>
            <span className="text-sm text-gray-600">Forecast</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-amber-500 mr-2"></div>
            <span className="text-sm text-gray-600">Budget</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BudgetAllocation = ({
  categories,
  onUpdate,
}: {
  categories: BudgetCategory[];
  onUpdate: (id: string, value: number) => void;
}) => {
  const total = categories.reduce((sum, c) => sum + c.allocated, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Budget Allocation
      </h3>
      <div className="space-y-4">
        {categories.map((category) => {
          const variance = category.allocated - category.spent;
          const percentUsed = (category.spent / category.allocated) * 100;

          return (
            <div key={category.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  {category.name}
                </span>
                <span
                  className={`text-sm ${variance >= 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  {variance >= 0 ? "+" : ""}${variance.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={category.allocated}
                  onChange={(e) =>
                    onUpdate(category.id, parseInt(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-24 text-right">
                  ${category.allocated.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(percentUsed, 100)}%`,
                    backgroundColor:
                      percentUsed > 90 ? "#ef4444" : category.color,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Spent: ${category.spent.toLocaleString()}</span>
                <span>{percentUsed.toFixed(1)}% used</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-semibold">
          <span>Total Budget</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const ScenarioPlanning = ({
  scenarios,
  activeScenario,
  onSelect,
}: {
  scenarios: Scenario[];
  activeScenario: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Scenario Planning
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activeScenario === scenario.id
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-300"
            }`}
          >
            <h4 className="font-semibold text-gray-800">{scenario.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
            <div
              className={`mt-2 text-lg font-bold ${scenario.modifier >= 0 ? "text-emerald-600" : "text-red-600"}`}
            >
              {scenario.modifier >= 0 ? "+" : ""}
              {scenario.modifier}%
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const VarianceAnalysis = ({ data }: { data: ForecastDataPoint[] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Variance Analysis
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 text-gray-600">Month</th>
              <th className="text-right py-2 text-gray-600">Budget</th>
              <th className="text-right py-2 text-gray-600">Actual</th>
              <th className="text-right py-2 text-gray-600">Variance</th>
              <th className="text-right py-2 text-gray-600">%</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point) => {
              const variance = point.actual - point.budget;
              const variancePercent = ((variance / point.budget) * 100).toFixed(
                1
              );
              return (
                <tr key={point.month} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-medium">{point.month}</td>
                  <td className="text-right">${point.budget.toLocaleString()}</td>
                  <td className="text-right">${point.actual.toLocaleString()}</td>
                  <td
                    className={`text-right ${variance >= 0 ? "text-red-600" : "text-emerald-600"}`}
                  >
                    {variance >= 0 ? "+" : ""}${variance.toLocaleString()}
                  </td>
                  <td
                    className={`text-right ${variance >= 0 ? "text-red-600" : "text-emerald-600"}`}
                  >
                    {variance >= 0 ? "+" : ""}
                    {variancePercent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeScenario, setActiveScenario] = useState("baseline");

  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    { id: "1", name: "Marketing", allocated: 50000, spent: 42000, color: "#6366f1" },
    { id: "2", name: "Operations", allocated: 80000, spent: 75000, color: "#10b981" },
    { id: "3", name: "R&D", allocated: 60000, spent: 55000, color: "#f59e0b" },
    { id: "4", name: "HR", allocated: 30000, spent: 28000, color: "#ec4899" },
    { id: "5", name: "IT", allocated: 45000, spent: 48000, color: "#8b5cf6" },
  ]);

  const forecastData: ForecastDataPoint[] = [
    { month: "Jan", actual: 45000, forecast: 44000, budget: 42000 },
    { month: "Feb", actual: 48000, forecast: 47000, budget: 45000 },
    { month: "Mar", actual: 52000, forecast: 50000, budget: 48000 },
    { month: "Apr", actual: 49000, forecast: 52000, budget: 50000 },
    { month: "May", actual: 55000, forecast: 54000, budget: 52000 },
    { month: "Jun", actual: 58000, forecast: 57000, budget: 55000 },
  ];

  const scenarios: Scenario[] = [
    { id: "pessimistic", name: "Pessimistic", modifier: -15, description: "Conservative growth assumptions" },
    { id: "baseline", name: "Baseline", modifier: 0, description: "Current trajectory maintained" },
    { id: "optimistic", name: "Optimistic", modifier: 20, description: "Aggressive growth targets" },
  ];

  const updateBudget = (id: string, value: number) => {
    setBudgetCategories(
      budgetCategories.map((c) =>
        c.id === id ? { ...c, allocated: value } : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart data={forecastData} title="Financial Forecast Overview" />
          <BudgetAllocation
            categories={budgetCategories}
            onUpdate={updateBudget}
          />
          <VarianceAnalysis data={forecastData} />
          <ScenarioPlanning
            scenarios={scenarios}
            activeScenario={activeScenario}
            onSelect={setActiveScenario}
          />
        </div>
        <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <span className="text-3xl">🤖</span>
            <div>
              <h3 className="font-semibold text-lg">AI Insights</h3>
              <p className="text-indigo-100">
                Based on current trends, you are projected to be 8% under budget
                by Q4. Consider reallocating IT funds to Marketing for optimal
                ROI.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;