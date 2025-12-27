import React, { useState, useEffect } from "react";

// Interfaces for Card Component
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Interfaces for Table Component
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
  className?: string;
}

// Interfaces for Chart Component
interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color: string;
}

interface LineChartProps {
  series: ChartSeries[];
  title: string;
  height?: number;
}

// Interfaces for Form Component
interface FormField {
  name: string;
  label: string;
  type: "text" | "select" | "textarea";
  options?: string[];
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
}

// Interfaces for Data Fetcher
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface DataFetcherProps<T> {
  fetchFn: () => Promise<T>;
  children: (state: FetchState<T>) => React.ReactNode;
}

// Card Component
function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h3>
      {children}
    </div>
  );
}

// Table Component
function Table({ columns, data, className = "" }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-semibold text-gray-700" style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-600">
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
function LineChart({ series, title, height = 200 }: LineChartProps) {
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue || 1;

  const labels = series[0]?.data.map((d) => d.label) || [];

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      <div className="relative" style={{ height }}>
        <svg className="w-full h-full" viewBox={`0 0 400 ${height}`} preserveAspectRatio="none">
          {[0, 25, 50, 75, 100].map((pct) => (
            <line key={pct} x1="40" y1={height - 20 - (pct / 100) * (height - 40)} x2="390" y2={height - 20 - (pct / 100) * (height - 40)} stroke="#e5e7eb" strokeWidth="1" />
          ))}
          {series.map((s, sIdx) => {
            const points = s.data.map((d, i) => {
              const x = 40 + (i / (s.data.length - 1)) * 350;
              const y = height - 20 - ((d.value - minValue) / range) * (height - 40);
              return `${x},${y}`;
            }).join(" ");
            return (
              <g key={sIdx}>
                <polyline fill="none" stroke={s.color} strokeWidth="2" points={points} />
                {s.data.map((d, i) => {
                  const x = 40 + (i / (s.data.length - 1)) * 350;
                  const y = height - 20 - ((d.value - minValue) / range) * (height - 40);
                  return <circle key={i} cx={x} cy={y} r="4" fill={s.color} />;
                })}
              </g>
            );
          })}
        </svg>
        <div className="flex justify-between px-10 text-xs text-gray-500 mt-1">
          {labels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-4 justify-center">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-gray-600">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Form Component
function Form({ fields, onSubmit, submitLabel }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          {field.type === "select" ? (
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(e) => handleChange(field.name, e.target.value)} required={field.required}>
              <option value="">Select an option</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" rows={3} onChange={(e) => handleChange(field.name, e.target.value)} required={field.required} />
          ) : (
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(e) => handleChange(field.name, e.target.value)} required={field.required} />
          )}
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
        {submitLabel}
      </button>
    </form>
  );
}

// Data Fetcher Component
function DataFetcher<T>({ fetchFn, children }: DataFetcherProps<T>) {
  const [state, setState] = useState<FetchState<T>({ data: null, loading: true, error: null });

  useEffect(() => {
    fetchFn()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => setState({ data: null, loading: false, error: err.message }));
  }, [fetchFn]);

  return <>{children(state)}</>;
}

// Sample Data
const surveyResults = [
  { question: "Product Satisfaction", veryHappy: 45, happy: 30, neutral: 15, unhappy: 10 },
  { question: "Price Perception", veryHappy: 25, happy: 35, neutral: 25, unhappy: 15 },
  { question: "Customer Support", veryHappy: 50, happy: 28, neutral: 12, unhappy: 10 },
  { question: "Would Recommend", veryHappy: 55, happy: 25, neutral: 12, unhappy: 8 },
];

const competitors = [
  { name: "CompetitorA", marketShare: "32%", strength: "Brand Recognition", weakness: "High Pricing", rating: 4.2 },
  { name: "CompetitorB", marketShare: "24%", strength: "Innovation", weakness: "Limited Support", rating: 3.8 },
  { name: "CompetitorC", marketShare: "18%", strength: "Low Cost", weakness: "Quality Issues", rating: 3.5 },
];

const trendData: ChartSeries[] = [
  { name: "Market Size ($B)", color: "#3b82f6", data: [{ label: "Q1", value: 12 }, { label: "Q2", value: 15 }, { label: "Q3", value: 18 }, { label: "Q4", value: 22 }] },
  { name: "Our Revenue ($M)", color: "#10b981", data: [{ label: "Q1", value: 8 }, { label: "Q2", value: 12 }, { label: "Q3", value: 14 }, { label: "Q4", value: 19 }] },
];

const surveyTableColumns: TableColumn[] = [
  { key: "question", header: "Question", width: "40%" },
  { key: "veryHappy", header: "Very Happy %" },
  { key: "happy", header: "Happy %" },
  { key: "neutral", header: "Neutral %" },
  { key: "unhappy", header: "Unhappy %" },
];

const exportFormFields: FormField[] = [
  { name: "format", label: "Export Format", type: "select", options: ["CSV", "JSON", "PDF", "Excel"], required: true },
  { name: "dateRange", label: "Date Range", type: "select", options: ["Last 7 Days", "Last 30 Days", "Last Quarter", "All Time"], required: true },
  { name: "notes", label: "Additional Notes", type: "textarea", required: false },
];

function App() {
  const [exportStatus, setExportStatus] = useState<string>("");

  const handleExport = (data: Record<string, string>) => {
    setExportStatus(`Exporting ${data.format} for ${data.dateRange}...`);
    setTimeout(() => setExportStatus("Export completed successfully!"), 1500);
  };

  const fetchMarketData = React.useCallback(() => {
    return new Promise<{ lastUpdated: string; totalResponses: number }>((resolve) => {
      setTimeout(() => resolve({ lastUpdated: "2024-01-15", totalResponses: 1247 }), 500);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Market Research Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive analysis of market trends, survey results, and competitor landscape</p>
      </header>

      <DataFetcher fetchFn={fetchMarketData}>
        {({ data, loading }) => (
          <div className="mb-6 flex gap-4">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              <span className="text-sm opacity-80">Total Responses</span>
              <p className="text-xl font-bold">{loading ? "..." : data?.totalResponses}</p>
            </div>
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
              <span className="text-sm opacity-80">Last Updated</span>
              <p className="text-xl font-bold">{loading ? "..." : data?.lastUpdated}</p>
            </div>
          </div>
        )}
      </DataFetcher>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {competitors.map((comp) => (
          <Card key={comp.name} title={comp.name}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Market Share</span>
                <span className="font-semibold text-blue-600">{comp.marketShare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rating</span>
                <span className="font-semibold">{comp.rating}/5.0</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm"><span className="text-green-600 font-medium">Strength:</span> {comp.strength}</p>
                <p className="text-sm mt-1"><span className="text-red-600 font-medium">Weakness:</span> {comp.weakness}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Survey Results Overview">
          <Table columns={surveyTableColumns} data={surveyResults} />
        </Card>
        <Card title="Market Trends">
          <LineChart series={trendData} title="Quarterly Performance" height={220} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Export Data" className="lg:col-span-1">
          <Form fields={exportFormFields} onSubmit={handleExport} submitLabel="Export Report" />
          {exportStatus && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              {exportStatus}
            </div>
          )}
        </Card>
        <Card title="Key Insights" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">Customer Satisfaction</h4>
              <p className="text-2xl font-bold text-blue-600 mt-2">78%</p>
              <p className="text-sm text-gray-600 mt-1">Above industry average</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Growth Rate</h4>
              <p className="text-2xl font-bold text-green-600 mt-2">+23%</p>
              <p className="text-sm text-gray-600 mt-1">Year over year</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800">Market Position</h4>
              <p className="text-2xl font-bold text-purple-600 mt-2">#2</p>
              <p className="text-sm text-gray-600 mt-1">In target segment</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800">NPS Score</h4>
              <p className="text-2xl font-bold text-orange-600 mt-2">67</p>
              <p className="text-sm text-gray-600 mt-1">Promoter category</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </div>
  );
}

export default App;