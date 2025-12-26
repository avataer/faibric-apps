import React, { useState } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

interface ChartDataPoint {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
}

interface ServerStatus {
  id: string;
  name: string;
  status: "online" | "offline" | "warning";
  cpu: number;
  memory: number;
  uptime: string;
  lastChecked: string;
}

interface SystemAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  source: string;
}

// Sample Data
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "servers", label: "Servers", icon: "🖥️", badge: 12 },
  { id: "network", label: "Network", icon: "🌐" },
  { id: "alerts", label: "Alerts", icon: "🔔", badge: 5 },
  { id: "logs", label: "Logs", icon: "📝" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const statCards: StatCard[] = [
  { id: "servers", title: "Active Servers", value: 24, change: 2, changeType: "positive", icon: "🖥️" },
  { id: "cpu", title: "Avg CPU Usage", value: "67%", change: -5, changeType: "positive", icon: "⚡" },
  { id: "memory", title: "Memory Usage", value: "82%", change: 8, changeType: "negative", icon: "💾" },
  { id: "network", title: "Network Traffic", value: "1.2 TB", change: 15, changeType: "neutral", icon: "📡" },
];

const chartData: ChartDataPoint[] = [
  { timestamp: "00:00", cpu: 45, memory: 62, network: 30 },
  { timestamp: "04:00", cpu: 52, memory: 65, network: 35 },
  { timestamp: "08:00", cpu: 78, memory: 72, network: 65 },
  { timestamp: "12:00", cpu: 85, memory: 80, network: 80 },
  { timestamp: "16:00", cpu: 72, memory: 78, network: 70 },
  { timestamp: "20:00", cpu: 58, memory: 70, network: 45 },
  { timestamp: "24:00", cpu: 42, memory: 65, network: 32 },
];

const serverData: ServerStatus[] = [
  { id: "srv-001", name: "Web Server 01", status: "online", cpu: 45, memory: 62, uptime: "45d 12h", lastChecked: "2 min ago" },
  { id: "srv-002", name: "Database Primary", status: "online", cpu: 72, memory: 85, uptime: "30d 8h", lastChecked: "1 min ago" },
  { id: "srv-003", name: "API Gateway", status: "warning", cpu: 89, memory: 78, uptime: "15d 4h", lastChecked: "3 min ago" },
  { id: "srv-004", name: "Cache Server", status: "online", cpu: 32, memory: 45, uptime: "60d 2h", lastChecked: "1 min ago" },
  { id: "srv-005", name: "Backup Server", status: "offline", cpu: 0, memory: 0, uptime: "0d 0h", lastChecked: "15 min ago" },
];

const alertData: SystemAlert[] = [
  { id: "alt-001", severity: "critical", message: "Backup Server is offline and not responding", timestamp: "10 min ago", source: "srv-005" },
  { id: "alt-002", severity: "warning", message: "API Gateway CPU usage exceeds 85% threshold", timestamp: "25 min ago", source: "srv-003" },
  { id: "alt-003", severity: "warning", message: "Database memory usage is approaching limit", timestamp: "1 hour ago", source: "srv-002" },
  { id: "alt-004", severity: "info", message: "Scheduled maintenance window starting in 2 hours", timestamp: "2 hours ago", source: "system" },
  { id: "alt-005", severity: "info", message: "SSL certificate renewal completed successfully", timestamp: "3 hours ago", source: "srv-001" },
];

// Components
function Sidebar({ items, activeItem, onSelect }: { items: NavItem[]; activeItem: string; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <span className="text-2xl">🛡️</span>
        <h1 className="text-xl font-bold">InfraWatch</h1>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              activeItem === item.id ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span>👤</span>
            </div>
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-slate-400">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatsCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{stat.icon}</span>
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === "positive"
                  ? "bg-green-100 text-green-700"
                  : stat.changeType === "negative"
                  ? "bg-red-100 text-red-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {stat.change > 0 ? "+" : ""}
              {stat.change}%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm mb-1">{stat.title}</h3>
          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = 100;
  const chartHeight = 200;
  const chartWidth = 100;

  const getY = (value: number) => chartHeight - (value / maxValue) * chartHeight;

  const createPath = (key: "cpu" | "memory" | "network") => {
    return data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * chartWidth;
        const y = getY(point[key]);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">System Performance</h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-600">CPU</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-slate-600">Memory</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-slate-600">Network</span>
          </div>
        </div>
      </div>
      <div className="relative h-52">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="none">
          {[0, 25, 50, 75, 100].map((val) => (
            <line
              key={val}
              x1="0"
              y1={getY(val)}
              x2={chartWidth}
              y2={getY(val)}
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
          ))}
          <path d={createPath("cpu")} fill="none" stroke="#3b82f6" strokeWidth="2" />
          <path d={createPath("memory")} fill="none" stroke="#8b5cf6" strokeWidth="2" />
          <path d={createPath("network")} fill="none" stroke="#22c55e" strokeWidth="2" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 pt-2">
          {data.map((point) => (
            <span key={point.timestamp}>{point.timestamp}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServerTable({ servers }: { servers: ServerStatus[] }) {
  const getStatusColor = (status: ServerStatus["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-700";
      case "offline":
        return "bg-red-100 text-red-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusDot = (status: ServerStatus["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Server Status</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Server</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CPU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Memory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Uptime</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Check</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {servers.map((server) => (
              <tr key={server.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusDot(server.status)} animate-pulse`}></div>
                    <span className="font-medium text-slate-900">{server.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(server.status)}`}>
                    {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${server.cpu > 80 ? "bg-red-500" : server.cpu > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${server.cpu}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600">{server.cpu}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${server.memory > 80 ? "bg-red-500" : server.memory > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${server.memory}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600">{server.memory}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{server.uptime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{server.lastChecked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlertsPanel({ alerts }: { alerts: SystemAlert[] }) {
  const getSeverityStyle = (severity: SystemAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return { bg: "bg-red-50", border: "border-red-200", icon: "🔴", text: "text-red-800" };
      case "warning":
        return { bg: "bg-yellow-50", border: "border-yellow-200", icon: "🟡", text: "text-yellow-800" };
      case "info":
        return { bg: "bg-blue-50", border: "border-blue-200", icon: "🔵", text: "text-blue-800" };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">System Alerts</h3>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{alerts.filter((a) => a.severity === "critical").length} Critical</span>
      </div>
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert) => {
          const style = getSeverityStyle(alert.severity);
          return (
            <div key={alert.id} className={`${style.bg} ${style.border} border rounded-lg p-4`}>
              <div className="flex items-start gap-3">
                <span className="text-lg">{style.icon}</span>
                <div className="flex-1">
                  <p className={`font-medium ${style.text}`}>{alert.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>Source: {alert.source}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar items={navItems} activeItem={activeNav} onSelect={setActiveNav} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Infrastructure Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your systems in real-time</p>
        </div>
        <div className="space-y-6">
          <StatsCards stats={statCards} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LineChart data={chartData} />
            </div>
            <div className="lg:col-span-1">
              <AlertsPanel alerts={alertData} />
            </div>
          </div>
          <ServerTable servers={serverData} />
        </div>
      </main>
    </div>
  );
}

export default App;