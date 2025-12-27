import React, { useState } from "react";

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: "in-transit" | "delayed" | "delivered" | "pending";
  estimatedArrival: string;
  carrier: string;
  containerCount: number;
}

interface InventoryItem {
  id: string;
  productName: string;
  warehouse: string;
  quantity: number;
  reorderLevel: number;
  lastUpdated: string;
}

interface PortDelay {
  id: string;
  portName: string;
  country: string;
  averageDelay: number;
  congestionLevel: "low" | "medium" | "high" | "critical";
  updatedAt: string;
}

const sampleShipments: Shipment[] = [
  {
    id: "SHP001",
    origin: "Shanghai, China",
    destination: "Los Angeles, USA",
    status: "in-transit",
    estimatedArrival: "2024-02-15",
    carrier: "Maersk",
    containerCount: 45
  },
  {
    id: "SHP002",
    origin: "Rotterdam, Netherlands",
    destination: "New York, USA",
    status: "delayed",
    estimatedArrival: "2024-02-18",
    carrier: "MSC",
    containerCount: 32
  },
  {
    id: "SHP003",
    origin: "Singapore",
    destination: "Hamburg, Germany",
    status: "delivered",
    estimatedArrival: "2024-02-10",
    carrier: "CMA CGM",
    containerCount: 28
  },
  {
    id: "SHP004",
    origin: "Busan, South Korea",
    destination: "Long Beach, USA",
    status: "pending",
    estimatedArrival: "2024-02-22",
    carrier: "Evergreen",
    containerCount: 52
  },
  {
    id: "SHP005",
    origin: "Dubai, UAE",
    destination: "Mumbai, India",
    status: "in-transit",
    estimatedArrival: "2024-02-14",
    carrier: "Hapag-Lloyd",
    containerCount: 18
  }
];

const sampleInventory: InventoryItem[] = [
  { id: "INV001", productName: "Electronics Components", warehouse: "Los Angeles", quantity: 15000, reorderLevel: 5000, lastUpdated: "2024-02-10" },
  { id: "INV002", productName: "Automotive Parts", warehouse: "Detroit", quantity: 3200, reorderLevel: 4000, lastUpdated: "2024-02-11" },
  { id: "INV003", productName: "Textiles", warehouse: "New York", quantity: 28000, reorderLevel: 10000, lastUpdated: "2024-02-09" },
  { id: "INV004", productName: "Medical Supplies", warehouse: "Chicago", quantity: 8500, reorderLevel: 3000, lastUpdated: "2024-02-11" },
  { id: "INV005", productName: "Consumer Goods", warehouse: "Miami", quantity: 2100, reorderLevel: 5000, lastUpdated: "2024-02-10" }
];

const samplePortDelays: PortDelay[] = [
  { id: "PRT001", portName: "Port of Los Angeles", country: "USA", averageDelay: 4.2, congestionLevel: "high", updatedAt: "2024-02-11" },
  { id: "PRT002", portName: "Port of Shanghai", country: "China", averageDelay: 2.1, congestionLevel: "medium", updatedAt: "2024-02-11" },
  { id: "PRT003", portName: "Port of Rotterdam", country: "Netherlands", averageDelay: 1.5, congestionLevel: "low", updatedAt: "2024-02-11" },
  { id: "PRT004", portName: "Port of Singapore", country: "Singapore", averageDelay: 6.8, congestionLevel: "critical", updatedAt: "2024-02-11" },
  { id: "PRT005", portName: "Port of Hamburg", country: "Germany", averageDelay: 2.8, congestionLevel: "medium", updatedAt: "2024-02-11" }
];

function StatusBadge(props: { status: Shipment["status"] }) {
  const colorMap = {
    "in-transit": "bg-blue-100 text-blue-800",
    "delayed": "bg-red-100 text-red-800",
    "delivered": "bg-green-100 text-green-800",
    "pending": "bg-yellow-100 text-yellow-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[props.status]}`}>
      {props.status.replace("-", " ").toUpperCase()}
    </span>
  );
}

function CongestionBadge(props: { level: PortDelay["congestionLevel"] }) {
  const colorMap = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[props.level]}`}>
      {props.level.toUpperCase()}
    </span>
  );
}

function StatCard(props: { title: string; value: string | number; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{props.title}</p>
          <p className={`text-2xl font-bold ${props.color}`}>{props.value}</p>
        </div>
        <div className="text-3xl">{props.icon}</div>
      </div>
    </div>
  );
}

function ShipmentTable(props: { shipments: Shipment[] }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Active Shipments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carrier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Containers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ETA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {props.shipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div>{shipment.origin}</div>
                  <div className="text-gray-400">→ {shipment.destination}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{shipment.carrier}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{shipment.containerCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{shipment.estimatedArrival}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={shipment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InventoryTable(props: { inventory: InventoryItem[] }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Inventory Levels</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {props.inventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.warehouse}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.quantity.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.quantity < item.reorderLevel ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">LOW STOCK</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">IN STOCK</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PortDelayCard(props: { delay: PortDelay }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{props.delay.portName}</h3>
        <CongestionBadge level={props.delay.congestionLevel} />
      </div>
      <p className="text-sm text-gray-500 mb-2">{props.delay.country}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Avg Delay:</span>
        <span className="text-lg font-bold text-orange-600">{props.delay.averageDelay} days</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">Updated: {props.delay.updatedAt}</p>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const inTransitCount = sampleShipments.filter(s => s.status === "in-transit").length;
  const delayedCount = sampleShipments.filter(s => s.status === "delayed").length;
  const lowStockCount = sampleInventory.filter(i => i.quantity < i.reorderLevel).length;
  const criticalPorts = samplePortDelays.filter(p => p.congestionLevel === "critical" || p.congestionLevel === "high").length;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌐</span>
              <h1 className="text-xl font-bold">Global Supply Chain Monitor</h1>
            </div>
            <div className="text-sm">Last Sync: {new Date().toLocaleString()}</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "overview" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("shipments")}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "shipments" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Shipments
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "inventory" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab("ports")}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "ports" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Port Delays
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Shipments In Transit" value={inTransitCount} icon="🚢" color="text-blue-600" />
          <StatCard title="Delayed Shipments" value={delayedCount} icon="⚠️" color="text-red-600" />
          <StatCard title="Low Stock Alerts" value={lowStockCount} icon="📦" color="text-orange-600" />
          <StatCard title="Congested Ports" value={criticalPorts} icon="🏭" color="text-purple-600" />
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <ShipmentTable shipments={sampleShipments} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InventoryTable inventory={sampleInventory} />
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Port Congestion Alerts</h2>
                <div className="space-y-4">
                  {samplePortDelays.slice(0, 3).map((delay) => (
                    <PortDelayCard key={delay.id} delay={delay} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipments" && (
          <ShipmentTable shipments={sampleShipments} />
        )}

        {activeTab === "inventory" && (
          <InventoryTable inventory={sampleInventory} />
        )}

        {activeTab === "ports" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {samplePortDelays.map((delay) => (
              <PortDelayCard key={delay.id} delay={delay} />
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          Global Supply Chain Monitor © 2024 | Real-time logistics tracking and analytics
        </div>
      </footer>
    </div>
  );
}

export default App;