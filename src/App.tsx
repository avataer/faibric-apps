import React, { useState, useEffect } from "react";

interface CryptoPrice {
  bitcoin?: {
    usd: number;
    usd_24h_change?: number;
  };
  ethereum?: {
    usd: number;
    usd_24h_change?: number;
  };
}

interface PriceAlert {
  id: string;
  crypto: string;
  targetPrice: number;
  condition: "above" | "below";
  active: boolean;
}

interface PriceHistory {
  time: string;
  btcPrice: number;
  ethPrice: number;
}

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "charts", label: "Live Charts", icon: "📈" },
    { id: "alerts", label: "Price Alerts", icon: "🔔" },
    { id: "history", label: "Price History", icon: "📋" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-yellow-500">₿ CryptoTracker</h1>
        <p className="text-gray-400 text-sm">Real-time prices</p>
      </div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
              currentView === item.id
                ? "bg-yellow-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, positive, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        {change && (
          <span className={`text-sm font-medium ${positive ? "text-green-500" : "text-red-500"}`}>
            {positive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

const Dashboard: React.FC<{ prices: CryptoPrice; loading: boolean }> = ({ prices, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const btcPrice = prices.bitcoin?.usd || 0;
  const ethPrice = prices.ethereum?.usd || 0;
  const btcChange = prices.bitcoin?.usd_24h_change?.toFixed(2) || "0";
  const ethChange = prices.ethereum?.usd_24h_change?.toFixed(2) || "0";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Bitcoin (BTC)"
          value={`$${btcPrice.toLocaleString()}`}
          change={`${btcChange}%`}
          positive={parseFloat(btcChange) > 0}
          icon="₿"
        />
        <StatsCard
          title="Ethereum (ETH)"
          value={`$${ethPrice.toLocaleString()}`}
          change={`${ethChange}%`}
          positive={parseFloat(ethChange) > 0}
          icon="Ξ"
        />
        <StatsCard
          title="BTC/ETH Ratio"
          value={(btcPrice / ethPrice).toFixed(2)}
          icon="⚖️"
        />
        <StatsCard
          title="Last Updated"
          value={new Date().toLocaleTimeString()}
          icon="🕐"
        />
      </div>
    </div>
  );
};

const LiveCharts: React.FC<{ priceHistory: PriceHistory[] }> = ({ priceHistory }) => {
  const maxBtc = Math.max(...priceHistory.map((p) => p.btcPrice), 1);
  const minBtc = Math.min(...priceHistory.map((p) => p.btcPrice), 0);
  const maxEth = Math.max(...priceHistory.map((p) => p.ethPrice), 1);
  const minEth = Math.min(...priceHistory.map((p) => p.ethPrice), 0);

  const normalizeValue = (value: number, min: number, max: number) => {
    if (max === min) return 50;
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Live Charts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Bitcoin Price</h3>
          <div className="h-48 flex items-end gap-1">
            {priceHistory.map((point, index) => (
              <div
                key={index}
                className="flex-1 bg-yellow-500 rounded-t transition-all duration-300"
                style={{ height: `${normalizeValue(point.btcPrice, minBtc, maxBtc)}%` }}
                title={`$${point.btcPrice.toLocaleString()}`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {priceHistory.slice(0, 5).map((point, index) => (
              <span key={index}>{point.time}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Ethereum Price</h3>
          <div className="h-48 flex items-end gap-1">
            {priceHistory.map((point, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-500 rounded-t transition-all duration-300"
                style={{ height: `${normalizeValue(point.ethPrice, minEth, maxEth)}%` }}
                title={`$${point.ethPrice.toLocaleString()}`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {priceHistory.slice(0, 5).map((point, index) => (
              <span key={index}>{point.time}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PriceAlerts: React.FC<{
  alerts: PriceAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<PriceAlert[]>;
  prices: CryptoPrice;
}> = ({ alerts, setAlerts, prices }) => {
  const [newAlert, setNewAlert] = useState({ crypto: "bitcoin", targetPrice: "", condition: "above" as "above" | "below" });

  const addAlert = () => {
    if (!newAlert.targetPrice) return;
    const alert: PriceAlert = {
      id: Date.now().toString(),
      crypto: newAlert.crypto,
      targetPrice: parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      active: true,
    };
    setAlerts([...alerts, alert]);
    setNewAlert({ crypto: "bitcoin", targetPrice: "", condition: "above" });
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const checkAlert = (alert: PriceAlert) => {
    const currentPrice = alert.crypto === "bitcoin" ? prices.bitcoin?.usd : prices.ethereum?.usd;
    if (!currentPrice) return false;
    if (alert.condition === "above" && currentPrice >= alert.targetPrice) return true;
    if (alert.condition === "below" && currentPrice <= alert.targetPrice) return true;
    return false;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Price Alerts</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Create New Alert</h3>
        <div className="flex flex-wrap gap-4">
          <select
            value={newAlert.crypto}
            onChange={(e) => setNewAlert({ ...newAlert, crypto: e.target.value })}
            className="border rounded-lg p-2"
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
          </select>
          <select
            value={newAlert.condition}
            onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as "above" | "below" })}
            className="border rounded-lg p-2"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          <input
            type="number"
            placeholder="Target Price ($)"
            value={newAlert.targetPrice}
            onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
            className="border rounded-lg p-2 flex-1"
          />
          <button
            onClick={addAlert}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            Add Alert
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts set</p>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  checkAlert(alert) ? "bg-green-100 border border-green-500" : "bg-gray-50"
                }`}
              >
                <div>
                  <span className="font-semibold capitalize">{alert.crypto}</span>
                  <span className="text-gray-500 mx-2">{alert.condition}</span>
                  <span className="font-bold">${alert.targetPrice.toLocaleString()}</span>
                  {checkAlert(alert) && <span className="ml-2 text-green-600">✓ Triggered!</span>}
                </div>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PriceHistoryTable: React.FC<{ priceHistory: PriceHistory[] }> = ({ priceHistory }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Price History</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Time</th>
              <th className="text-left p-4">Bitcoin (USD)</th>
              <th className="text-left p-4">Ethereum (USD)</th>
            </tr>
          </thead>
          <tbody>
            {priceHistory.map((record, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-4">{record.time}</td>
                <td className="p-4 font-mono">${record.btcPrice.toLocaleString()}</td>
                <td className="p-4 font-mono">${record.ethPrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [prices, setPrices] = useState<CryptoPrice>({});
  const [loading, setLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: "coingecko",
            endpoint: "/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
          }),
        });
        const result = await response.json();
        setPrices(result);

        const now = new Date().toLocaleTimeString();
        setPriceHistory((prev) => {
          const newEntry = {
            time: now,
            btcPrice: result.bitcoin?.usd || 0,
            ethPrice: result.ethereum?.usd || 0,
          };
          const updated = [...prev, newEntry];
          return updated.slice(-10);
        });
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {currentView === "dashboard" && <Dashboard prices={prices} loading={loading} />}
          {currentView === "charts" && <LiveCharts priceHistory={priceHistory} />}
          {currentView === "alerts" && <PriceAlerts alerts={alerts} setAlerts={setAlerts} prices={prices} />}
          {currentView === "history" && <PriceHistoryTable priceHistory={priceHistory} />}
        </div>
      </main>
    </div>
  );
};

export default App;