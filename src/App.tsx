import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationHeaderProps {
  title: string;
  navItems: NavItem[];
  onNavClick: (item: NavItem) => void;
}

function NavigationHeader({ title, navItems, onNavClick }: NavigationHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">{title}</h1>
          </div>
          <nav className="flex space-x-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onNavClick(item)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
  children: React.ReactNode;
  className?: string;
}

function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
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
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {row[column.key]}
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

function LineChart({ title, data, color = "#4F46E5" }: LineChartProps) {
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

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      <div className="relative h-48 bg-gray-50 rounded-lg p-4">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((d.value - minValue) / range) * 80 - 10;
            return <circle key={i} cx={x} cy={y} r="2" fill={color} />;
          })}
        </svg>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.map((d, i) => (
            <span key={i}>{d.label}</span>
          ))}
        </div>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          {field.type === "select" ? (
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
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
    { question: "Price Value", responses: 1320, satisfaction: 74, trend: "→" },
    { question: "Brand Trust", responses: 1100, satisfaction: 81, trend: "↑" },
    { question: "Would Recommend", responses: 1400, satisfaction: 89, trend: "↑" },
  ];

  const competitors = [
    { name: "CompetitorA", marketShare: "32%", growth: "+5.2%", strength: "Brand Recognition" },
    { name: "CompetitorB", marketShare: "24%", growth: "+2.8%", strength: "Price Leadership" },
    { name: "CompetitorC", marketShare: "18%", growth: "-1.2%", strength: "Product Range" },
  ];

  const trendData: DataPoint[] = [
    { label: "Jan", value: 65 },
    { label: "Feb", value: 72 },
    { label: "Mar", value: 68 },
    { label: "Apr", value: 78 },
    { label: "May", value: 85 },
    { label: "Jun", value: 82 },
  ];

  const marketShareData: DataPoint[] = [
    { label: "Q1", value: 22 },
    { label: "Q2", value: 25 },
    { label: "Q3", value: 28 },
    { label: "Q4", value: 31 },
  ];

  const exportFields: FormField[] = [
    { name: "format", label: "Export Format", type: "select", options: ["CSV", "Excel", "PDF", "JSON"] },
    { name: "dateRange", label: "Date Range", type: "select", options: ["Last 7 days", "Last 30 days", "Last 90 days", "All time"] },
    { name: "email", label: "Send to Email", type: "email" },
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveNav(item.label);
  };

  const handleExport = (data: Record<string, string>) => {
    alert(`Exporting data: ${JSON.stringify(data)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader title="Market Research Tool" navItems={navItems} onNavClick={handleNavClick} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Responses</p>
            <p className="text-3xl font-bold text-gray-800">6,250</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Avg Satisfaction</p>
            <p className="text-3xl font-bold text-gray-800">84.6%</p>
            <p className="text-sm text-green-600">+3.2% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Market Position</p>
            <p className="text-3xl font-bold text-gray-800">#2</p>
            <p className="text-sm text-blue-600">26% market share</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card title="Survey Results">
            <Table columns={surveyColumns} data={surveyData} />
          </Card>
          <Card title="Competitor Analysis">
            <div className="space-y-3">
              {competitors.map((comp, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{comp.name}</span>
                    <span className={`text-sm ${comp.growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {comp.growth}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Market Share: {comp.marketShare}</span>
                    <span>Strength: {comp.strength}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card title="Customer Satisfaction Trend">
            <LineChart title="Monthly Satisfaction Score" data={trendData} color="#10B981" />
          </Card>
          <Card title="Market Share Growth">
            <LineChart title="Quarterly Market Share %" data={marketShareData} color="#6366F1" />
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Export Data" className="lg:col-span-1">
            <Form fields={exportFields} onSubmit={handleExport} submitLabel="Export Report" />
          </Card>
          <Card title="Key Insights" className="lg:col-span-2">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Customer satisfaction has increased by 8% this quarter, driven by improved service response times.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Price perception remains a challenge - consider value messaging campaigns.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">CompetitorA is gaining market share through aggressive digital marketing.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Brand trust scores are strong - leverage for referral programs.</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;