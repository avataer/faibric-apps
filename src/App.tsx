import React, { useState } from "react";

// Interfaces
interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationHeaderProps {
  title: string;
  items: NavItem[];
  onNavClick: (item: NavItem) => void;
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

interface TableRow {
  [key: string]: string | number;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  onRowClick?: (row: TableRow) => void;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartLineProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  height?: number;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "select" | "textarea";
  options?: string[];
  placeholder?: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
}

interface Competitor {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  rating: number;
}

interface SurveyResult {
  question: string;
  responses: number;
  positive: number;
  neutral: number;
  negative: number;
}

// Navigation Header Component
function NavigationHeader({ title, items, onNavClick }: NavigationHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <nav className="flex space-x-6">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavClick(item)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  item.active
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
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

// Card Component
function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// Table Component
function Table({ columns, data, onRowClick }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-700">
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

// Line Chart Component
function ChartLine({ data, title, color = "#6366f1", height = 200 }: ChartLineProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const padding = 40;

  const points = data.map((d, i) => ({
    x: padding + (i * (300 - 2 * padding)) / (data.length - 1),
    y: height - padding - ((d.value - minValue) / range) * (height - 2 * padding),
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-600 mb-3">{title}</h4>
      <svg viewBox={`0 0 300 ${height}`} className="w-full">
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={color} />
            <text
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {data[i].label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Form Component
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={field.placeholder}
              rows={3}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          ) : (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={field.placeholder}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        {submitLabel}
      </button>
    </form>
  );
}

// Competitor Card Component
function CompetitorCard({ competitor }: { competitor: Competitor }) {
  return (
    <Card title={competitor.name}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Market Share</span>
          <span className="text-lg font-bold text-indigo-600">{competitor.marketShare}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${competitor.marketShare}%` }}
          />
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= competitor.rating ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>
        <div>
          <p className="text-sm font-medium text-green-600 mb-1">Strengths</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {competitor.strengths.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-red-600 mb-1">Weaknesses</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {competitor.weaknesses.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      </div>
    </Card>
  );
}

// Main App Component
function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "#", active: activeNav === "Dashboard" },
    { label: "Surveys", href: "#", active: activeNav === "Surveys" },
    { label: "Competitors", href: "#", active: activeNav === "Competitors" },
    { label: "Reports", href: "#", active: activeNav === "Reports" },
  ];

  const surveyResults: SurveyResult[] = [
    { question: "Product Satisfaction", responses: 1250, positive: 78, neutral: 15, negative: 7 },
    { question: "Brand Awareness", responses: 980, positive: 65, neutral: 25, negative: 10 },
    { question: "Purchase Intent", responses: 850, positive: 72, neutral: 18, negative: 10 },
    { question: "Customer Service", responses: 1100, positive: 82, neutral: 12, negative: 6 },
  ];

  const competitors: Competitor[] = [
    {
      name: "TechCorp Solutions",
      marketShare: 32,
      strengths: ["Strong brand recognition", "Wide distribution"],
      weaknesses: ["Higher pricing", "Slow innovation"],
      rating: 4,
    },
    {
      name: "InnovatePro Inc",
      marketShare: 24,
      strengths: ["Cutting-edge technology", "Great UX"],
      weaknesses: ["Limited market reach", "Small team"],
      rating: 4,
    },
    {
      name: "MarketLeader Ltd",
      marketShare: 28,
      strengths: ["Established customer base", "Reliable service"],
      weaknesses: ["Outdated interface", "Poor mobile support"],
      rating: 3,
    },
  ];

  const trendData: ChartDataPoint[] = [
    { label: "Jan", value: 45 },
    { label: "Feb", value: 52 },
    { label: "Mar", value: 48 },
    { label: "Apr", value: 61 },
    { label: "May", value: 55 },
    { label: "Jun", value: 67 },
  ];

  const tableColumns: TableColumn[] = [
    { key: "question", header: "Survey Question", width: "40%" },
    { key: "responses", header: "Responses" },
    { key: "positive", header: "Positive %" },
    { key: "neutral", header: "Neutral %" },
    { key: "negative", header: "Negative %" },
  ];

  const tableData = surveyResults.map((r) => ({
    question: r.question,
    responses: r.responses,
    positive: `${r.positive}%`,
    neutral: `${r.neutral}%`,
    negative: `${r.negative}%`,
  }));

  const exportFormFields: FormField[] = [
    { name: "format", label: "Export Format", type: "select", options: ["CSV", "Excel", "PDF", "JSON"] },
    { name: "dateRange", label: "Date Range", type: "select", options: ["Last 7 days", "Last 30 days", "Last 90 days", "Custom"] },
    { name: "notes", label: "Additional Notes", type: "textarea", placeholder: "Add any notes for this export..." },
  ];

  const handleExport = (data: Record<string, string>) => {
    alert(`Exporting data as ${data.format || "CSV"} for ${data.dateRange || "Last 30 days"}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader
        title="Market Research Hub"
        items={navItems}
        onNavClick={(item) => setActiveNav(item.label)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card title="Survey Results Overview">
              <Table columns={tableColumns} data={tableData} />
            </Card>
          </div>
          <div>
            <Card title="Export Data">
              <Form fields={exportFormFields} onSubmit={handleExport} submitLabel="Export Report" />
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card title="Market Trends">
            <ChartLine data={trendData} title="Market Interest Over Time" />
          </Card>
          <Card title="Satisfaction Trend">
            <ChartLine
              data={[
                { label: "Q1", value: 72 },
                { label: "Q2", value: 78 },
                { label: "Q3", value: 75 },
                { label: "Q4", value: 82 },
              ]}
              title="Customer Satisfaction Score"
              color="#10b981"
            />
          </Card>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Competitor Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitors.map((comp) => (
            <CompetitorCard key={comp.name} competitor={comp} />
          ))}
        </div>
      </main>
    </div>
    </div>
  );
}

export default App;