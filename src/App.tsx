import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationHeaderProps {
  title: string;
  items: NavItem[];
  onNavClick: (label: string) => void;
}

function NavigationHeader({ title, items, onNavClick }: NavigationHeaderProps) {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-400">{title}</h1>
          <nav className="flex space-x-6">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavClick(item.label)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

function Card({ title, subtitle, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

interface TableColumn {
  key: string;
  header: string;
}

interface TableRow {
  [key: string]: string | number;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
}

function Table({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
}

function LineChart({ title, data, color = "blue" }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - minValue) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const colorClasses: Record<string, string> = {
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    red: "stroke-red-500",
    purple: "stroke-purple-500",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            fill="none"
            className={`${colorClasses[color] || colorClasses.blue} stroke-2`}
            points={points}
          />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((d.value - minValue) / range) * 80 - 10;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                className={`fill-current text-${color}-500`}
              />
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

interface FormField {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
}

function Form({ fields, onSubmit, submitLabel }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "#", active: activeNav === "Dashboard" },
    { label: "Surveys", href: "#", active: activeNav === "Surveys" },
    { label: "Competitors", href: "#", active: activeNav === "Competitors" },
    { label: "Reports", href: "#", active: activeNav === "Reports" },
  ];

  const surveyColumns: TableColumn[] = [
    { key: "question", header: "Question" },
    { key: "responses", header: "Responses" },
    { key: "satisfaction", header: "Satisfaction %" },
    { key: "trend", header: "Trend" },
  ];

  const surveyData: TableRow[] = [
    { question: "Product Quality", responses: 1250, satisfaction: 87, trend: "↑" },
    { question: "Customer Service", responses: 1180, satisfaction: 92, trend: "↑" },
    { question: "Price Value", responses: 1300, satisfaction: 78, trend: "→" },
    { question: "Ease of Use", responses: 1420, satisfaction: 85, trend: "↑" },
    { question: "Would Recommend", responses: 1380, satisfaction: 89, trend: "↓" },
  ];

  const competitors = [
    { name: "CompanyA", marketShare: "32%", strength: "Brand Recognition", weakness: "High Prices" },
    { name: "CompanyB", marketShare: "24%", strength: "Innovation", weakness: "Limited Support" },
    { name: "CompanyC", marketShare: "18%", strength: "Low Cost", weakness: "Quality Issues" },
  ];

  const trendData: DataPoint[] = [
    { label: "Jan", value: 65 },
    { label: "Feb", value: 72 },
    { label: "Mar", value: 68 },
    { label: "Apr", value: 85 },
    { label: "May", value: 82 },
    { label: "Jun", value: 91 },
  ];

  const marketGrowth: DataPoint[] = [
    { label: "Q1", value: 12 },
    { label: "Q2", value: 18 },
    { label: "Q3", value: 25 },
    { label: "Q4", value: 32 },
  ];

  const exportFields: FormField[] = [
    { name: "format", label: "Export Format", type: "select", options: ["CSV", "PDF", "Excel"] },
    { name: "dateRange", label: "Date Range", type: "select", options: ["Last 30 Days", "Last Quarter", "Last Year"] },
    { name: "email", label: "Send to Email", type: "email" },
  ];

  const handleExport = (data: Record<string, string>) => {
    alert(`Exporting ${data.format} for ${data.dateRange} to ${data.email}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader
        title="Market Research Tool"
        items={navItems}
        onNavClick={setActiveNav}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card title="Total Responses" subtitle="Last 30 days">
            <p className="text-3xl font-bold text-blue-600">6,530</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
          </Card>
          <Card title="Avg Satisfaction" subtitle="Across all surveys">
            <p className="text-3xl font-bold text-green-600">86.2%</p>
            <p className="text-sm text-green-600 mt-2">↑ 3.5% improvement</p>
          </Card>
          <Card title="Market Position" subtitle="Industry ranking">
            <p className="text-3xl font-bold text-purple-600">#2</p>
            <p className="text-sm text-gray-500 mt-2">28% market share</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LineChart title="Customer Satisfaction Trend" data={trendData} color="blue" />
          <LineChart title="Market Growth (%)" data={marketGrowth} color="green" />
        </div>

        <div className="mb-8">
          <Card title="Survey Results" subtitle="Latest survey responses and metrics">
            <Table columns={surveyColumns} data={surveyData} />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {competitors.map((comp) => (
            <Card key={comp.name} title={comp.name} subtitle={`Market Share: ${comp.marketShare}`}>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Strength: </span>
                  <span className="text-sm text-green-600">{comp.strength}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Weakness: </span>
                  <span className="text-sm text-red-600">{comp.weakness}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Export Data" subtitle="Download research data in various formats">
            <Form fields={exportFields} onSubmit={handleExport} submitLabel="Export Data" />
          </Card>
          <Card title="Quick Stats" subtitle="Key performance indicators">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Surveys</span>
                <span className="font-semibold text-gray-800">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Competitors Tracked</span>
                <span className="font-semibold text-gray-800">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reports Generated</span>
                <span className="font-semibold text-gray-800">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data Points Collected</span>
                <span className="font-semibold text-gray-800">125,000+</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;