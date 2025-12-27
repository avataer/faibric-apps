import React, { useState } from "react";

interface DataPoint {
  month: string;
  actual: number;
  forecast: number;
  budget: number;
}

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

interface Scenario {
  id: string;
  name: string;
  growthRate: number;
  costReduction: number;
  description: string;
}

interface VarianceItem {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  height?: number;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const sampleForecastData: DataPoint[] = [
  { month: "Jan", actual: 45000, forecast: 44000, budget: 42000 },
  { month: "Feb", actual: 52000, forecast: 50000, budget: 48000 },
  { month: "Mar", actual: 48000, forecast: 52000, budget: 50000 },
  { month: "Apr", actual: 61000, forecast: 58000, budget: 55000 },
  { month: "May", actual: 55000, forecast: 60000, budget: 58000 },
  { month: "Jun", actual: 67000, forecast: 65000, budget: 62000 },
  { month: "Jul", actual: 0, forecast: 70000, budget: 68000 },
  { month: "Aug", actual: 0, forecast: 75000, budget: 72000 },
  { month: "Sep", actual: 0, forecast: 78000, budget: 75000 },
  { month: "Oct", actual: 0, forecast: 82000, budget: 78000 },
  { month: "Nov", actual: 0, forecast: 88000, budget: 82000 },
  { month: "Dec", actual: 0, forecast: 95000, budget: 88000 },
];

const sampleBudgetCategories: BudgetCategory[] = [
  { id: "1", name: "Marketing", allocated: 150000, spent: 125000, color: "#3B82F6" },
  { id: "2", name: "Operations", allocated: 280000, spent: 245000, color: "#10B981" },
  { id: "3", name: "R&D", allocated: 200000, spent: 180000, color: "#8B5CF6" },
  { id: "4", name: "Sales", allocated: 180000, spent: 160000, color: "#F59E0B" },
  { id: "5", name: "HR", allocated: 90000, spent: 78000, color: "#EF4444" },
];

const sampleScenarios: Scenario[] = [
  { id: "1", name: "Conservative", growthRate: 5, costReduction: 0, description: "Minimal growth with stable costs" },
  { id: "2", name: "Moderate", growthRate: 12, costReduction: 5, description: "Balanced growth with some optimization" },
  { id: "3", name: "Aggressive", growthRate: 25, costReduction: 10, description: "High growth with significant cost cuts" },
];

const sampleVarianceData: VarianceItem[] = [
  { category: "Revenue", budgeted: 500000, actual: 528000, variance: 28000, variancePercent: 5.6 },
  { category: "COGS", budgeted: 200000, actual: 195000, variance: 5000, variancePercent: 2.5 },
  { category: "Marketing", budgeted: 75000, actual: 82000, variance: -7000, variancePercent: -9.3 },
  { category: "Salaries", budgeted: 150000, actual: 148000, variance: 2000, variancePercent: 1.3 },
  { category: "Utilities", budgeted: 15000, actual: 17500, variance: -2500, variancePercent: -16.7 },
];

function LineChart({ data, title, height = 300 }: LineChartProps) {
  const maxValue = Math.max(...data.flatMap(d => [d.actual, d.forecast, d.budget]));
  const chartHeight = height - 60;
  const chartWidth = 100;

  const getY = (value: number) => {
    return chartHeight - (value / maxValue) * chartHeight;
  };

  const createPath = (values: number[]) => {
    const points = values.map((val, i) => {
      const x = (i / (values.length - 1)) * chartWidth;
      const y = getY(val);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    });
    return points.join(" ");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative" style={{ height: `${height}px` }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="none">
          <path
            d={createPath(data.map(d => d.budget))}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
          <path
            d={createPath(data.map(d => d.forecast))}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="0.8"
          />
          <path
            d={createPath(data.filter(d => d.actual > 0).map(d => d.actual))}
            fill="none"
            stroke="#10B981"
            strokeWidth="0.8"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
          {data.filter((_, i) => i % 2 === 0).map(d => (
            <span key={d.month}>{d.month}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Forecast</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-gray-400" style={{ borderStyle: "dashed" }}></div>
          <span className="text-sm text-gray-600">Budget</span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon, children }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function BudgetAllocation({ categories }: { categories: BudgetCategory[] }) {
  const [allocations, setAllocations] = useState(categories);
  const totalBudget = allocations.reduce((sum, cat) => sum + cat.allocated, 0);

  const updateAllocation = (id: string, value: number) => {
    setAllocations(prev => prev.map(cat => 
      cat.id === id ? { ...cat, allocated: value } : cat
    ));
  };

  return (
    <div className="space-y-4">
      {allocations.map(category => {
        const percentage = (category.spent / category.allocated) * 100;
        return (
          <div key={category.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{category.name}</span>
              <span className="text-sm text-gray-500">
                ${category.spent.toLocaleString()} / ${category.allocated.toLocaleString()}
              </span>
            </div>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute h-full rounded-full transition-all"
                style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: category.color }}
              />
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={category.allocated}
              onChange={(e) => updateAllocation(category.id, Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        );
      })}
      <div className="pt-4 border-t">
        <div className="flex justify-between font-semibold">
          <span>Total Budget</span>
          <span className="text-blue-600">${totalBudget.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function VarianceAnalysis({ data }: { data: VarianceItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-sm font-medium text-gray-500">Category</th>
            <th className="text-right py-2 text-sm font-medium text-gray-500">Budgeted</th>
            <th className="text-right py-2 text-sm font-medium text-gray-500">Actual</th>
            <th className="text-right py-2 text-sm font-medium text-gray-500">Variance</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.category} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium text-gray-800">{item.category}</td>
              <td className="py-3 text-right text-gray-600">${item.budgeted.toLocaleString()}</td>
              <td className="py-3 text-right text-gray-600">${item.actual.toLocaleString()}</td>
              <td className={`py-3 text-right font-medium ${item.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
                {item.variance >= 0 ? "+" : ""}{item.variancePercent.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScenarioPlanning({ scenarios }: { scenarios: Scenario[] }) {
  const [activeScenario, setActiveScenario] = useState(scenarios[1].id);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {scenarios.map(scenario => (
          <button
            key={scenario.id}
            onClick={() => setActiveScenario(scenario.id)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              activeScenario === scenario.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {scenario.name}
          </button>
        ))}
      </div>
      {scenarios.filter(s => s.id === activeScenario).map(scenario => (
        <div key={scenario.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
          <p className="text-sm text-gray-600">{scenario.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg">
              <div className="text-sm text-gray-500">Growth Rate</div>
              <div className="text-xl font-bold text-green-600">+{scenario.growthRate}%</div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-sm text-gray-500">Cost Reduction</div>
              <div className="text-xl font-bold text-blue-600">{scenario.costReduction}%</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm text-gray-500">Projected Annual Revenue</div>
            <div className="text-2xl font-bold text-gray-800">
              ${((850000 * (1 + scenario.growthRate / 100))).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AI Forecast Pro</h1>
                <p className="text-sm text-gray-500">Intelligent Budgeting and Forecasting</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                AI Enhanced
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="text-sm opacity-80">Total Revenue YTD</div>
            <div className="text-3xl font-bold mt-1">$328,000</div>
            <div className="text-sm mt-2 flex items-center gap-1">
              <span className="text-green-300">↑ 12.5%</span>
              <span className="opacity-70">vs last year</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
            <div className="text-sm opacity-80">Budget Utilization</div>
            <div className="text-3xl font-bold mt-1">78.4%</div>
            <div className="text-sm mt-2 flex items-center gap-1">
              <span className="text-yellow-300">On Track</span>
              <span className="opacity-70">for Q4 goals</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="text-sm opacity-80">Forecast Accuracy</div>
            <div className="text-3xl font-bold mt-1">94.2%</div>
            <div className="text-sm mt-2 flex items-center gap-1">
              <span className="text-green-300">↑ 3.1%</span>
              <span className="opacity-70">improvement</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LineChart data={sampleForecastData} title="Revenue Forecast vs Actual" height={320} />
          
          <FeatureCard
            title="Budget Allocation"
            description="Adjust department budgets dynamically"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <BudgetAllocation categories={sampleBudgetCategories} />
          </FeatureCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeatureCard
            title="Variance Analysis"
            description="Compare budgeted vs actual performance"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            <VarianceAnalysis data={sampleVarianceData} />
          </FeatureCard>

          <FeatureCard
            title="Scenario Planning"
            description="Model different business scenarios"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          >
            <ScenarioPlanning scenarios={sampleScenarios} />
          </FeatureCard>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">AI Insights</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Auto-generated</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-yellow-700 font-medium mb-1">Budget Alert</div>
              <p className="text-sm text-yellow-600">Marketing spend is trending 9% over budget. Consider reallocation from underutilized HR budget.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-green-700 font-medium mb-1">Opportunity</div>
              <p className="text-sm text-green-600">Revenue forecast shows 15% upside potential if Q4 sales initiatives are accelerated.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-blue-700 font-medium mb-1">Recommendation</div>
              <p className="text-sm text-blue-600">Based on historical patterns, consider increasing R&D allocation by 8% for next fiscal year.</p>
            </div>
          </div>
        </div>
      </main>
    </div>    </div>
  );
}

export default App;