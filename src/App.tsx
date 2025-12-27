import React, { useState, useEffect } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  carrier: string;
}

interface InventoryItem {
  id: string;
  product: string;
  warehouse: string;
  quantity: number;
  lastUpdated: string;
  status: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

// Navigation Sidebar Component
function NavigationSidebar({ items, onSelect, selectedId }: { items: NavItem[]; onSelect: (id: string) => void; selectedId: string }) {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🌐</span>
          Supply Chain Monitor
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  selectedId === item.id ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Shipment List Component
function ShipmentList({ shipments }: { shipments: Shipment[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Delayed": return "bg-red-100 text-red-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Active Shipments</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time tracking of ongoing deliveries</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {shipments.map((shipment) => (
          <li key={shipment.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{shipment.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {shipment.origin} → {shipment.destination}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Carrier: {shipment.carrier} | ETA: {shipment.eta}
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Track →
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inventory Table Component
function InventoryTable({ items }: { items: InventoryItem[] }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-800";
      case "Low Stock": return "bg-yellow-100 text-yellow-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Warehouse Inventory</h2>
        <p className="text-sm text-gray-500 mt-1">Current stock levels across all warehouses</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.warehouse}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.quantity.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Delay Chart Component
function DelayChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Delivery Delays (Last 7 Days)</h2>
        <p className="text-sm text-gray-500 mt-1">Average delay in hours by day</p>
      </div>
      <div className="p-6">
        <div className="flex items-end justify-between gap-2 h-48">
          {data.map((point, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col items-center">
                <span className="text-xs font-medium text-gray-700 mb-1">{point.value}h</span>
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${(point.value / maxValue) * 150}px` }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [selectedNav, setSelectedNav] = useState("dashboard");
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "shipments", label: "Shipments", icon: "🚚" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const shipments: Shipment[] = [
    { id: "SHP-001", origin: "Shanghai", destination: "Los Angeles", status: "In Transit", eta: "Dec 28, 2024", carrier: "Maersk" },
    { id: "SHP-002", origin: "Rotterdam", destination: "New York", status: "Delayed", eta: "Dec 30, 2024", carrier: "MSC" },
    { id: "SHP-003", origin: "Singapore", destination: "Sydney", status: "Processing", eta: "Jan 02, 2025", carrier: "Hapag-Lloyd" },
    { id: "SHP-004", origin: "Hamburg", destination: "Tokyo", status: "In Transit", eta: "Jan 05, 2025", carrier: "Evergreen" },
    { id: "SHP-005", origin: "Busan", destination: "Vancouver", status: "Delivered", eta: "Dec 20, 2024", carrier: "COSCO" },
  ];

  const inventory: InventoryItem[] = [
    { id: "INV-001", product: "Electronics - Smartphones", warehouse: "Los Angeles, CA", quantity: 15420, status: "In Stock", lastUpdated: "2 min ago" },
    { id: "INV-002", product: "Automotive Parts", warehouse: "Detroit, MI", quantity: 8750, status: "In Stock", lastUpdated: "5 min ago" },
    { id: "INV-003", product: "Medical Supplies", warehouse: "Chicago, IL", quantity: 320, status: "Low Stock", lastUpdated: "1 min ago" },
    { id: "INV-004", product: "Consumer Goods", warehouse: "Dallas, TX", quantity: 22100, status: "In Stock", lastUpdated: "8 min ago" },
    { id: "INV-005", product: "Industrial Equipment", warehouse: "Seattle, WA", quantity: 0, status: "Out of Stock", lastUpdated: "15 min ago" },
  ];

  const delayData: ChartDataPoint[] = [
    { label: "Mon", value: 2.5 },
    { label: "Tue", value: 4.2 },
    { label: "Wed", value: 3.1 },
    { label: "Thu", value: 5.8 },
    { label: "Fri", value: 3.9 },
    { label: "Sat", value: 2.1 },
    { label: "Sun", value: 1.8 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationSidebar items={navItems} onSelect={setSelectedNav} selectedId={selectedNav} />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Global Supply Chain Monitor</h1>
              <p className="text-gray-500 mt-1">Real-time visibility across your entire supply chain</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Last updated: {lastUpdate}</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-600 font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Active Shipments</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">127</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% from last week</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">On-Time Delivery</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">94.2%</p>
            <p className="text-sm text-green-600 mt-1">↑ 2.1% improvement</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Delayed Shipments</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
            <p className="text-sm text-red-600 mt-1">↑ 3 more than yesterday</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Total Inventory Value</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">$2.4M</p>
            <p className="text-sm text-gray-500 mt-1">Across 5 warehouses</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ShipmentList shipments={shipments} />
          <DelayChart data={delayData} />
        </div>
        <div>
          <InventoryTable items={inventory} />
        </div>
      </main>
    </div>
  );
}

export default App;