import React, { useState } from "react";

// Interfaces
interface Server {
  id: string;
  name: string;
  status: "online" | "offline" | "warning";
  ipAddress: string;
  cpu: number;
  memory: number;
  uptime: string;
  lastChecked: string;
}

interface NetworkTraffic {
  id: string;
  interface: string;
  inbound: number;
  outbound: number;
  status: "normal" | "high" | "critical";
}

interface SystemAlert {
  id: string;
  severity: "info" | "warning" | "error" | "critical";
  message: string;
  timestamp: string;
  source: string;
}

interface Service {
  id: string;
  name: string;
  status: "running" | "stopped" | "degraded";
  port: number;
  responseTime: number;
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
  icon: string;
}

// Sample Data
const servers: Server[] = [
  { id: "1", name: "Web Server 01", status: "online", ipAddress: "192.168.1.10", cpu: 45, memory: 62, uptime: "45d 12h", lastChecked: "2 min ago" },
  { id: "2", name: "Database Server", status: "online", ipAddress: "192.168.1.20", cpu: 78, memory: 85, uptime: "30d 8h", lastChecked: "1 min ago" },
  { id: "3", name: "API Gateway", status: "warning", ipAddress: "192.168.1.30", cpu: 92, memory: 71, uptime: "15d 4h", lastChecked: "30 sec ago" },
  { id: "4", name: "Cache Server", status: "online", ipAddress: "192.168.1.40", cpu: 23, memory: 45, uptime: "60d 2h", lastChecked: "1 min ago" },
  { id: "5", name: "File Server", status: "offline", ipAddress: "192.168.1.50", cpu: 0, memory: 0, uptime: "0d 0h", lastChecked: "5 min ago" },
];

const networkData: NetworkTraffic[] = [
  { id: "1", interface: "eth0", inbound: 1250, outbound: 890, status: "normal" },
  { id: "2", interface: "eth1", inbound: 3400, outbound: 2100, status: "high" },
  { id: "3", interface: "wlan0", inbound: 450, outbound: 320, status: "normal" },
  { id: "4", interface: "docker0", inbound: 5600, outbound: 4200, status: "critical" },
];

const alerts: SystemAlert[] = [
  { id: "1", severity: "critical", message: "File Server is unreachable", timestamp: "5 min ago", source: "File Server" },
  { id: "2", severity: "warning", message: "High CPU usage detected on API Gateway", timestamp: "10 min ago", source: "API Gateway" },
  { id: "3", severity: "error", message: "Database connection pool exhausted", timestamp: "15 min ago", source: "Database Server" },
  { id: "4", severity: "info", message: "Scheduled backup completed successfully", timestamp: "1 hour ago", source: "Backup Service" },
  { id: "5", severity: "warning", message: "SSL certificate expires in 7 days", timestamp: "2 hours ago", source: "Web Server 01" },
];

const services: Service[] = [
  { id: "1", name: "Nginx", status: "running", port: 80, responseTime: 12 },
  { id: "2", name: "PostgreSQL", status: "running", port: 5432, responseTime: 45 },
  { id: "3", name: "Redis", status: "running", port: 6379, responseTime: 3 },
  { id: "4", name: "Elasticsearch", status: "degraded", port: 9200, responseTime: 250 },
  { id: "5", name: "RabbitMQ", status: "stopped", port: 5672, responseTime: 0 },
];

const navItems: NavItem[] = [
  { id: "1", label: "Dashboard", icon: "📊", active: true },
  { id: "2", label: "Servers", icon: "🖥️", active: false },
  { id: "3", label: "Network", icon: "🌐", active: false },
  { id: "4", label: "Alerts", icon: "🔔", active: false },
  { id: "5", label: "Services", icon: "⚙️", active: false },
  { id: "6", label: "Settings", icon: "🔧", active: false },
];

const statsData: StatCard[] = [
  { title: "Total Servers", value: 5, change: 0, icon: "🖥️" },
  { title: "Online Services", value: 12, change: 2, icon: "✅" },
  { title: "Active Alerts", value: 5, change: -1, icon: "🔔" },
  { title: "Avg Response Time", value: "45ms", change: -5, icon: "⚡" },
];

// Components
function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🛡️</span>
          <span>IT Monitor</span>
        </h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function StatsCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{stat.icon}</span>
            <span className={`text-sm font-medium ${stat.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stat.change >= 0 ? "+" : ""}{stat.change}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    online: "bg-green-100 text-green-800",
    offline: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    running: "bg-green-100 text-green-800",
    stopped: "bg-red-100 text-red-800",
    degraded: "bg-orange-100 text-orange-800",
    normal: "bg-green-100 text-green-800",
    high: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
}

function UsageBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  );
}

function ServerTable({ data }: { data: Server[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Server Status</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Server</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Memory</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uptime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((server) => (
              <tr key={server.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{server.name}</td>
                <td className="px-4 py-3"><StatusBadge status={server.status} /></td>
                <td className="px-4 py-3 text-gray-600">{server.ipAddress}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UsageBar value={server.cpu} color={server.cpu > 80 ? "bg-red-500" : server.cpu > 60 ? "bg-yellow-500" : "bg-green-500"} />
                    <span className="text-sm text-gray-600">{server.cpu}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UsageBar value={server.memory} color={server.memory > 80 ? "bg-red-500" : server.memory > 60 ? "bg-yellow-500" : "bg-green-500"} />
                    <span className="text-sm text-gray-600">{server.memory}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{server.uptime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlertsCard({ data }: { data: SystemAlert[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">System Alerts</h2>
      </div>
      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
        {data.map((alert) => (
          <div key={alert.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start gap-3">
              <StatusBadge status={alert.severity} />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.source} • {alert.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkCard({ data }: { data: NetworkTraffic[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Network Traffic</h2>
      </div>
      <div className="p-4 space-y-4">
        {data.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔌</span>
              <div>
                <p className="font-medium text-gray-800">{item.interface}</p>
                <p className="text-xs text-gray-500">↓ {item.inbound} Mbps | ↑ {item.outbound} Mbps</p>
              </div>
            </div>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesCard({ data }: { data: Service[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Services Status</h2>
      </div>
      <div className="p-4 space-y-3">
        {data.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${service.status === "running" ? "bg-green-500" : service.status === "stopped" ? "bg-red-500" : "bg-orange-500"}`}></div>
              <div>
                <p className="font-medium text-gray-800">{service.name}</p>
                <p className="text-xs text-gray-500">Port: {service.port}</p>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge status={service.status} />
              <p className="text-xs text-gray-500 mt-1">{service.responseTime}ms</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [navState, setNavState] = useState(navItems);

  const handleNavSelect = (id: string) => {
    setNavState(navState.map((item) => ({ ...item, active: item.id === id })));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar items={navState} onSelect={handleNavSelect} />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Infrastructure Dashboard</h1>
          <p className="text-gray-500">Real-time monitoring of your IT infrastructure</p>
        </div>
        <StatsCards stats={statsData} />
        <div className="mb-6">
          <ServerTable data={servers} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AlertsCard data={alerts} />
          <NetworkCard data={networkData} />
          <ServicesCard data={services} />
        </div>
      </main>
    </div>
  );
}

export default App;