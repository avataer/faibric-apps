import React, { useState, useEffect } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  carrier: string;
}

interface Alert {
  id: string;
  type: string;
  message: string;
  time: string;
  severity: string;
}

interface ChartDataPoint {
  date: string;
  value: number;
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "shipments", label: "Shipments", icon: "🚚" },
  { id: "inventory", label: "Inventory", icon: "📦" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "alerts", label: "Alerts", icon: "🔔" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

function Sidebar({ onNavigate, currentView }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-8 p-2">🌐 Supply Chain HQ</div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
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

function StatsCard({ title, value, change, isPositive }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <p className="text-slate-500 text-sm">{title}</p>
      <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
      <p className={`text-sm mt-2 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? "↑" : "↓"} {change}
      </p>
    </div>
  );
}

function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function DashboardContent() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service: "restcountries", endpoint: "/all" }),
        });
        const result = await response.json();
        const countries = result.data || result || [];

        const mappedShipments: Shipment[] = countries.slice(0, 8).map((c: { name?: { common?: string }; capital?: string[]; region?: string }, i: number) => ({
          id: `SHP-${1000 + i}`,
          origin: c.capital?.[0] || "Unknown",
          destination: countries[(i + 5) % countries.length]?.capital?.[0] || "Unknown",
          status: ["In Transit", "Delivered", "Pending", "Delayed"][i % 4],
          eta: `${Math.floor(Math.random() * 10) + 1} days`,
          carrier: ["FedEx", "DHL", "UPS", "Maersk"][i % 4],
        }));
        setShipments(mappedShipments);

        const mappedChart: ChartDataPoint[] = countries.slice(0, 7).map((c: { population?: number }, i: number) => ({
          date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
          value: Math.floor((c.population || 100000) / 100000),
        }));
        setChartData(mappedChart);

        const mappedAlerts: Alert[] = countries.slice(0, 5).map((c: { name?: { common?: string }; region?: string }, i: number) => ({
          id: `ALT-${i}`,
          type: ["Delay", "Stock Low", "Weather", "Customs", "Route Change"][i % 5],
          message: `Issue in ${c.name?.common || "Unknown"} region`,
          time: `${i + 1}h ago`,
          severity: ["high", "medium", "low"][i % 3],
        }));
        setAlerts(mappedAlerts);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-slate-500">Loading dashboard...</div>;
  }

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Shipments" value="1,247" change="12% vs last week" isPositive={true} />
        <StatsCard title="On-Time Delivery" value="94.2%" change="2.1% improvement" isPositive={true} />
        <StatsCard title="Warehouse Capacity" value="78%" change="5% increase" isPositive={false} />
        <StatsCard title="Pending Orders" value="342" change="18 new today" isPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Shipment Volume Trend">
          <div className="flex items-end gap-4 h-48">
            {chartData.map((point, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-500 rounded-t-md"
                  style={{ height: `${(point.value / maxValue) * 100}%` }}
                ></div>
                <span className="text-xs text-slate-500 mt-2">{point.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Alerts">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === "high"
                    ? "bg-red-50 border-red-500"
                    : alert.severity === "medium"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">{alert.type}</span>
                  <span className="text-xs text-slate-400">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-600">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent Shipments">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500 text-sm border-b">
                <th className="pb-3">ID</th>
                <th className="pb-3">Origin</th>
                <th className="pb-3">Destination</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">ETA</th>
                <th className="pb-3">Carrier</th>
              </tr>
            </thead>
            <tbody>
              {shipments.slice(0, 5).map((shipment) => (
                <tr key={shipment.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{shipment.id}</td>
                  <td className="py-3">{shipment.origin}</td>
                  <td className="py-3">{shipment.destination}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        shipment.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : shipment.status === "In Transit"
                          ? "bg-blue-100 text-blue-700"
                          : shipment.status === "Delayed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                  <td className="py-3">{shipment.eta}</td>
                  <td className="py-3">{shipment.carrier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ShipmentsContent() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service: "restcountries", endpoint: "/all" }),
        });
        const result = await response.json();
        const countries = result.data || result || [];

        const mappedShipments: Shipment[] = countries.slice(0, 15).map((c: { capital?: string[] }, i: number) => ({
          id: `SHP-${2000 + i}`,
          origin: c.capital?.[0] || "Unknown",
          destination: countries[(i + 7) % countries.length]?.capital?.[0] || "Unknown",
          status: ["In Transit", "Delivered", "Pending", "Delayed"][i % 4],
          eta: `${Math.floor(Math.random() * 14) + 1} days`,
          carrier: ["FedEx", "DHL", "UPS", "Maersk", "COSCO"][i % 5],
        }));
        setShipments(mappedShipments);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-slate-500">Loading shipments...</div>;
  }

  return (
    <Card title="All Shipments">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-500 text-sm border-b">
              <th className="pb-3">ID</th>
              <th className="pb-3">Origin</th>
              <th className="pb-3">Destination</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">ETA</th>
              <th className="pb-3">Carrier</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="py-3 font-medium">{shipment.id}</td>
                <td className="py-3">{shipment.origin}</td>
                <td className="py-3">{shipment.destination}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      shipment.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : shipment.status === "In Transit"
                        ? "bg-blue-100 text-blue-700"
                        : shipment.status === "Delayed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td className="py-3">{shipment.eta}</td>
                <td className="py-3">{shipment.carrier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function InventoryContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total SKUs" value="8,432" change="124 added this month" isPositive={true} />
        <StatsCard title="Low Stock Items" value="47" change="12 critical" isPositive={false} />
        <StatsCard title="Warehouses" value="12" change="Operating normally" isPositive={true} />
      </div>
      <Card title="Warehouse Overview">
        <p className="text-slate-600">Inventory management and stock levels across all warehouses.</p>
      </Card>
    </div>
  );
}

function AnalyticsContent() {
  return (
    <Card title="Analytics Dashboard">
      <p className="text-slate-600">Advanced analytics and reporting features coming soon.</p>
    </Card>
  );
}

function AlertsContent() {
  return (
    <Card title="Alert Center">
      <p className="text-slate-600">Manage and configure alerts for your supply chain operations.</p>
    </Card>
  );
}

function SettingsContent() {
  return (
    <Card title="Settings">
      <p className="text-slate-600">Configure your dashboard preferences and integrations.</p>
    </Card>
  );
}

function App() {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            {navItems.find((item) => item.id === currentView)?.label || "Dashboard"}
          </h1>
          <p className="text-slate-500">Global Supply Chain Monitoring System</p>
        </header>
        {currentView === "dashboard" && <DashboardContent />}
        {currentView === "shipments" && <ShipmentsContent />}
        {currentView === "inventory" && <InventoryContent />}
        {currentView === "analytics" && <AnalyticsContent />}
        {currentView === "alerts" && <AlertsContent />}
        {currentView === "settings" && <SettingsContent />}
      </main>
    </div>
  );
}

export default App;