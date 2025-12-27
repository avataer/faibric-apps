import React, { useState, useEffect } from "react";

// Interfaces
interface ProductionLine {
  id: string;
  name: string;
  status: "running" | "idle" | "maintenance" | "error";
  efficiency: number;
  currentOutput: number;
  targetOutput: number;
  operator: string;
}

interface OutputMetric {
  id: string;
  lineName: string;
  unitsProduced: number;
  unitsTarget: number;
  hourlyRate: number;
  shift: string;
}

interface QualityIndicator {
  id: string;
  lineName: string;
  defectRate: number;
  passRate: number;
  inspected: number;
  rejected: number;
}

interface DowntimeRecord {
  id: string;
  lineName: string;
  reason: string;
  startTime: string;
  duration: number;
  resolved: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  unit?: string;
}

// Sample Data
const productionLines: ProductionLine[] = [
  { id: "L1", name: "Assembly Line A", status: "running", efficiency: 94.5, currentOutput: 1250, targetOutput: 1300, operator: "John Smith" },
  { id: "L2", name: "Assembly Line B", status: "running", efficiency: 88.2, currentOutput: 980, targetOutput: 1100, operator: "Maria Garcia" },
  { id: "L3", name: "Packaging Line 1", status: "idle", efficiency: 0, currentOutput: 450, targetOutput: 800, operator: "David Chen" },
  { id: "L4", name: "Packaging Line 2", status: "maintenance", efficiency: 0, currentOutput: 0, targetOutput: 800, operator: "Sarah Wilson" },
  { id: "L5", name: "Quality Control", status: "running", efficiency: 97.8, currentOutput: 2100, targetOutput: 2200, operator: "Mike Johnson" },
  { id: "L6", name: "Finishing Line", status: "error", efficiency: 45.0, currentOutput: 320, targetOutput: 700, operator: "Lisa Brown" },
];

const outputMetrics: OutputMetric[] = [
  { id: "O1", lineName: "Assembly Line A", unitsProduced: 1250, unitsTarget: 1300, hourlyRate: 156, shift: "Morning" },
  { id: "O2", lineName: "Assembly Line B", unitsProduced: 980, unitsTarget: 1100, hourlyRate: 122, shift: "Morning" },
  { id: "O3", lineName: "Packaging Line 1", unitsProduced: 450, unitsTarget: 800, hourlyRate: 56, shift: "Morning" },
  { id: "O4", lineName: "Quality Control", unitsProduced: 2100, unitsTarget: 2200, hourlyRate: 262, shift: "Morning" },
];

const qualityIndicators: QualityIndicator[] = [
  { id: "Q1", lineName: "Assembly Line A", defectRate: 1.2, passRate: 98.8, inspected: 1265, rejected: 15 },
  { id: "Q2", lineName: "Assembly Line B", defectRate: 2.1, passRate: 97.9, inspected: 1000, rejected: 21 },
  { id: "Q3", lineName: "Packaging Line 1", defectRate: 0.8, passRate: 99.2, inspected: 454, rejected: 4 },
  { id: "Q4", lineName: "Finishing Line", defectRate: 3.5, passRate: 96.5, inspected: 331, rejected: 11 },
];

const downtimeRecords: DowntimeRecord[] = [
  { id: "D1", lineName: "Packaging Line 1", reason: "Material shortage", startTime: "09:45", duration: 45, resolved: false },
  { id: "D2", lineName: "Packaging Line 2", reason: "Scheduled maintenance", startTime: "08:00", duration: 120, resolved: false },
  { id: "D3", lineName: "Finishing Line", reason: "Equipment malfunction", startTime: "10:15", duration: 30, resolved: false },
  { id: "D4", lineName: "Assembly Line A", reason: "Shift change", startTime: "06:00", duration: 15, resolved: true },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "production", label: "Production", icon: "🏭", active: false },
  { id: "quality", label: "Quality", icon: "✅", active: false },
  { id: "maintenance", label: "Maintenance", icon: "🔧", active: false },
  { id: "reports", label: "Reports", icon: "📈", active: false },
  { id: "settings", label: "Settings", icon: "⚙️", active: false },
];

// Components
function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-8 p-2">
        🏭 Manufacturing Hub
      </div>
      <nav>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
              item.active ? "bg-blue-600" : "hover:bg-slate-700"
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

function StatCard({ title, value, change, unit }: StatCard) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-gray-500">{unit}</span>}
      </div>
      <div className={`mt-2 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? "↑" : "↓"} {Math.abs(change)}% vs last hour
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    running: "bg-green-100 text-green-800",
    idle: "bg-yellow-100 text-yellow-800",
    maintenance: "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ProductionTable({ data }: { data: ProductionLine[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Production Line Status</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Output</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((line) => (
              <tr key={line.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium">{line.name}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={line.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${line.efficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{line.efficiency}%</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {line.currentOutput} / {line.targetOutput}
                </td>
                <td className="px-4 py-4 text-gray-600">{line.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QualityTable({ data }: { data: QualityIndicator[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Quality Indicators</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pass Rate</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Defect Rate</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inspected</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rejected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium">{item.lineName}</td>
                <td className="px-4 py-4">
                  <span className={`font-medium ${item.passRate >= 98 ? "text-green-600" : item.passRate >= 95 ? "text-yellow-600" : "text-red-600"}`}>
                    {item.passRate}%
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`${item.defectRate <= 1.5 ? "text-green-600" : item.defectRate <= 3 ? "text-yellow-600" : "text-red-600"}`}>
                    {item.defectRate}%
                  </span>
                </td>
                <td className="px-4 py-4">{item.inspected}</td>
                <td className="px-4 py-4 text-red-600">{item.rejected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DowntimeTable({ data }: { data: DowntimeRecord[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Downtime Tracking</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium">{record.lineName}</td>
                <td className="px-4 py-4">{record.reason}</td>
                <td className="px-4 py-4">{record.startTime}</td>
                <td className="px-4 py-4">{record.duration} min</td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${record.resolved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {record.resolved ? "Resolved" : "Active"}
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

function App() {
  const [nav, setNav] = useState(navItems);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalOutput, setTotalOutput] = useState(5100);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTotalOutput((prev) => prev + Math.floor(Math.random() * 5));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavSelect = (id: string) => {
    setNav(nav.map((item) => ({ ...item, active: item.id === id })));
  };

  const stats: StatCard[] = [
    { title: "Total Output", value: totalOutput.toLocaleString(), change: 5.2, unit: "units" },
    { title: "Overall Efficiency", value: "87.3", change: 2.1, unit: "%" },
    { title: "Active Lines", value: "4/6", change: 0, unit: "" },
    { title: "Total Downtime", value: "210", change: -12.5, unit: "min" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar items={nav} onSelect={handleNavSelect} />
      <main className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Production Dashboard</h1>
            <p className="text-gray-500">Real-time manufacturing overview</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-gray-900">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-500">
              {currentTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <div className="space-y-8">
          <ProductionTable data={productionLines} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QualityTable data={qualityIndicators} />
            <DowntimeTable data={downtimeRecords} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;