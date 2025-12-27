import React, { useState, useEffect } from "react";

// Interfaces
interface ProductionLine {
  id: string;
  name: string;
  status: "running" | "idle" | "maintenance" | "error";
  currentOutput: number;
  targetOutput: number;
  efficiency: number;
  operator: string;
  lastUpdate: string;
}

interface QualityMetric {
  id: string;
  lineName: string;
  passRate: number;
  defectCount: number;
  inspectedCount: number;
  category: string;
}

interface DowntimeRecord {
  id: string;
  lineId: string;
  lineName: string;
  reason: string;
  startTime: string;
  duration: number;
  status: "ongoing" | "resolved";
}

interface StatsCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  trend: "up" | "down" | "neutral";
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Sample Data
const sampleProductionLines: ProductionLine[] = [
  { id: "PL001", name: "Assembly Line A", status: "running", currentOutput: 847, targetOutput: 1000, efficiency: 94.2, operator: "John Smith", lastUpdate: "2 min ago" },
  { id: "PL002", name: "Assembly Line B", status: "running", currentOutput: 623, targetOutput: 800, efficiency: 87.5, operator: "Sarah Johnson", lastUpdate: "1 min ago" },
  { id: "PL003", name: "Packaging Line 1", status: "maintenance", currentOutput: 0, targetOutput: 500, efficiency: 0, operator: "Mike Davis", lastUpdate: "15 min ago" },
  { id: "PL004", name: "Quality Control", status: "running", currentOutput: 1250, targetOutput: 1500, efficiency: 91.8, operator: "Emma Wilson", lastUpdate: "30 sec ago" },
  { id: "PL005", name: "Welding Station", status: "error", currentOutput: 156, targetOutput: 400, efficiency: 45.2, operator: "Tom Brown", lastUpdate: "5 min ago" },
  { id: "PL006", name: "CNC Machining", status: "idle", currentOutput: 0, targetOutput: 300, efficiency: 0, operator: "Lisa Anderson", lastUpdate: "10 min ago" },
];

const sampleQualityMetrics: QualityMetric[] = [
  { id: "QM001", lineName: "Assembly Line A", passRate: 98.5, defectCount: 12, inspectedCount: 800, category: "Dimensional" },
  { id: "QM002", lineName: "Assembly Line B", passRate: 96.2, defectCount: 24, inspectedCount: 630, category: "Visual" },
  { id: "QM003", lineName: "Quality Control", passRate: 99.1, defectCount: 11, inspectedCount: 1200, category: "Functional" },
  { id: "QM004", lineName: "Welding Station", passRate: 89.5, defectCount: 16, inspectedCount: 152, category: "Structural" },
];

const sampleDowntimeRecords: DowntimeRecord[] = [
  { id: "DT001", lineId: "PL003", lineName: "Packaging Line 1", reason: "Scheduled Maintenance", startTime: "08:30 AM", duration: 120, status: "ongoing" },
  { id: "DT002", lineId: "PL005", lineName: "Welding Station", reason: "Equipment Malfunction", startTime: "10:15 AM", duration: 45, status: "ongoing" },
  { id: "DT003", lineId: "PL002", lineName: "Assembly Line B", reason: "Material Shortage", startTime: "07:00 AM", duration: 30, status: "resolved" },
  { id: "DT004", lineId: "PL006", lineName: "CNC Machining", reason: "Operator Break", startTime: "11:00 AM", duration: 15, status: "ongoing" },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "production", label: "Production Lines", icon: "🏭", active: false },
  { id: "quality", label: "Quality Control", icon: "✅", active: false },
  { id: "downtime", label: "Downtime Tracking", icon: "⏱️", active: false },
  { id: "reports", label: "Reports", icon: "📈", active: false },
  { id: "settings", label: "Settings", icon: "⚙️", active: false },
];

// Custom Hook for Data Fetching Simulation
function useDataFetcher<T>(initialData: T, refreshInterval: number = 5000): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({ ...prev, data: initialData }));
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [initialData, refreshInterval]);

  return state;
}

// Navigation Sidebar Component
function NavigationSidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🏭</span>
          Manufacturing Hub
        </h1>
      </div>
      <nav className="space-y-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-8 border-t border-slate-700 mt-8">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
            AD
          </div>
          <div>
            <p className="font-medium">Admin User</p>
            <p className="text-sm text-slate-400">Plant Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Stats Cards Component
function StatsCards({ cards }: { cards: StatsCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{card.icon}</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              card.trend === "up" ? "bg-green-100 text-green-700" :
              card.trend === "down" ? "bg-red-100 text-red-700" :
              "bg-slate-100 text-slate-700"
            }`}>
              {card.trend === "up" ? "↑" : card.trend === "down" ? "↓" : "→"} {Math.abs(card.change)}%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">{card.title}</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

// Production Line Status Table
function ProductionLineTable({ data }: { data: ProductionLine[] }) {
  const getStatusBadge = (status: ProductionLine["status"]) => {
    const styles = {
      running: "bg-green-100 text-green-700",
      idle: "bg-yellow-100 text-yellow-700",
      maintenance: "bg-blue-100 text-blue-700",
      error: "bg-red-100 text-red-700",
    };
    return styles[status];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Production Line Status</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Line</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Output</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Efficiency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Operator</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map(line => (
              <tr key={line.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{line.name}</div>
                  <div className="text-sm text-slate-500">{line.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(line.status)}`}>
                    {line.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-900">{line.currentOutput} / {line.targetOutput}</div>
                  <div className="w-24 h-2 bg-slate-200 rounded-full mt-1">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(line.currentOutput / line.targetOutput) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${line.efficiency >= 90 ? "text-green-600" : line.efficiency >= 70 ? "text-yellow-600" : "text-red-600"}`}>
                    {line.efficiency}%
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-700">{line.operator}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{line.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Quality Metrics Component
function QualityMetricsPanel({ data }: { data: QualityMetric[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Quality Indicators</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(metric => (
          <div key={metric.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-slate-900">{metric.lineName}</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{metric.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-2xl font-bold text-slate-900">{metric.passRate}%</div>
                <div className="text-sm text-slate-500">Pass Rate</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-red-600">{metric.defectCount}</div>
                <div className="text-sm text-slate-500">Defects</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-slate-700">{metric.inspectedCount}</div>
                <div className="text-sm text-slate-500">Inspected</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Downtime Tracking Component
function DowntimeTracker({ data }: { data: DowntimeRecord[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-900">Downtime Tracking</h2>
        <span className="text-sm text-slate-500">{data.filter(d => d.status === "ongoing").length} active issues</span>
      </div>
      <div className="divide-y divide-slate-100">
        {data.map(record => (
          <div key={record.id} className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${record.status === "ongoing" ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
              <div>
                <div className="font-medium text-slate-900">{record.lineName}</div>
                <div className="text-sm text-slate-500">{record.reason}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-900 font-medium">{record.duration} min</div>
              <div className="text-sm text-slate-500">Started: {record.startTime}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              record.status === "ongoing" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}>
              {record.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Real-time Stats Display
function RealTimeStats() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Real-Time Production</h2>
          <p className="text-blue-200 text-sm">Live data updates every second</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-6">
        <div>
          <div className="text-3xl font-bold">{2876 + (tick % 10)}</div>
          <div className="text-blue-200 text-sm">Units Produced Today</div>
        </div>
        <div>
          <div className="text-3xl font-bold">{91.2 + (tick % 5) * 0.1}%</div>
          <div className="text-blue-200 text-sm">Overall Efficiency</div>
        </div>
        <div>
          <div className="text-3xl font-bold">4 / 6</div>
          <div className="text-blue-200 text-sm">Lines Active</div>
        </div>
        <div>
          <div className="text-3xl font-bold">{165 + tick}</div>
          <div className="text-blue-200 text-sm">Minutes Uptime</div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [navItemsState, setNavItemsState] = useState(navItems);

  const productionData = useDataFetcher(sampleProductionLines);
  const qualityData = useDataFetcher(sampleQualityMetrics);
  const downtimeData = useDataFetcher(sampleDowntimeRecords);

  const handleNavSelect = (id: string) => {
    setActiveNav(id);
    setNavItemsState(items =>
      items.map(item => ({ ...item, active: item.id === id }))
    );
  };

  const statsCards: StatsCard[] = [
    { title: "Total Output", value: "2,876", change: 12.5, icon: "📦", trend: "up" },
    { title: "Average Efficiency", value: "91.2%", change: 3.2, icon: "⚡", trend: "up" },
    { title: "Quality Rate", value: "97.8%", change: 0.5, icon: "✅", trend: "up" },
    { title: "Downtime Hours", value: "2.5h", change: -15, icon: "⏰", trend: "down" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <NavigationSidebar items={navItemsState} onSelect={handleNavSelect} />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Production Dashboard</h1>
          <p className="text-slate-500">Monitor and manage manufacturing operations in real-time</p>
        </header>

        <RealTimeStats />
        <StatsCards cards={statsCards} />

        <div className="mb-6">
          {productionData.data && <ProductionLineTable data={productionData.data} />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {qualityData.data && <QualityMetricsPanel data={qualityData.data} />}
          {downtimeData.data && <DowntimeTracker data={downtimeData.data} />}
        </div>
      </main>
    </div>    </div>
    </div>
    </div>
  );
}

export default App;