import React, { useState, useEffect } from "react";

// Interfaces
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  icon: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: string;
}

// Sample Data
const sampleCryptoData: CryptoData[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 67432.51, change24h: 2.34, volume24h: 28500000000, marketCap: 1320000000000, icon: "₿" },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 3521.88, change24h: -1.23, volume24h: 15200000000, marketCap: 423000000000, icon: "Ξ" },
  { id: "bnb", name: "BNB", symbol: "BNB", price: 584.21, change24h: 0.87, volume24h: 1890000000, marketCap: 89000000000, icon: "◈" },
  { id: "sol", name: "Solana", symbol: "SOL", price: 178.45, change24h: 5.67, volume24h: 3200000000, marketCap: 78000000000, icon: "◎" },
  { id: "xrp", name: "XRP", symbol: "XRP", price: 0.5234, change24h: -0.45, volume24h: 1100000000, marketCap: 28000000000, icon: "✕" },
  { id: "ada", name: "Cardano", symbol: "ADA", price: 0.4521, change24h: 1.89, volume24h: 520000000, marketCap: 16000000000, icon: "₳" },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.1234, change24h: -2.34, volume24h: 890000000, marketCap: 17500000000, icon: "Ð" },
  { id: "dot", name: "Polkadot", symbol: "DOT", price: 7.23, change24h: 3.21, volume24h: 340000000, marketCap: 9800000000, icon: "●" },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "portfolio", label: "Portfolio", icon: "💼", active: false },
  { id: "markets", label: "Markets", icon: "📈", active: false },
  { id: "alerts", label: "Alerts", icon: "🔔", active: false },
  { id: "settings", label: "Settings", icon: "⚙️", active: false },
];

// Helper Functions
const formatCurrency = (value: number): string => {
  if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(2)}T`;
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(4)}`;
};

const formatNumber = (value: number): string => {
  return value.toLocaleString("en-US");
};

// Sidebar Component
function Sidebar(props: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <span className="text-3xl">🪙</span>
        <h1 className="text-xl font-bold text-white">CryptoTracker</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {props.items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => props.onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <p className="text-white font-medium">User</p>
            <p className="text-gray-400 text-sm">Pro Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Stat Card Component
function StatCard(props: StatCard) {
  const isPositive = props.change >= 0;
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <span className="text-3xl">{props.icon}</span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${
            isPositive ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {props.change.toFixed(2)}%
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{props.title}</p>
      <p className="text-white text-2xl font-bold">{props.value}</p>
    </div>
  );
}

// Crypto Table Component
function CryptoTable(props: { data: CryptoData[]; loading: boolean }) {
  if (props.loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Live Prices</h2>
        <p className="text-gray-400 text-sm">Real-time cryptocurrency prices</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="text-left text-gray-400 font-medium px-6 py-4">#</th>
              <th className="text-left text-gray-400 font-medium px-6 py-4">Name</th>
              <th className="text-right text-gray-400 font-medium px-6 py-4">Price</th>
              <th className="text-right text-gray-400 font-medium px-6 py-4">24h Change</th>
              <th className="text-right text-gray-400 font-medium px-6 py-4">24h Volume</th>
              <th className="text-right text-gray-400 font-medium px-6 py-4">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((crypto, index) => {
              const isPositive = crypto.change24h >= 0;
              return (
                <tr key={crypto.id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">
                        {crypto.icon}
                      </span>
                      <div>
                        <p className="text-white font-medium">{crypto.name}</p>
                        <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">
                    {formatCurrency(crypto.price)}
                  </td>
                  <td className={`px-6 py-4 text-right font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
                    {isPositive ? "+" : ""}
                    {crypto.change24h.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right text-gray-300">
                    {formatCurrency(crypto.volume24h)}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-300">
                    {formatCurrency(crypto.marketCap)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(sampleCryptoData);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [navigation, setNavigation] = useState<NavItem[]>(navItems);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prev) =>
        prev.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.1,
        }))
      );
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNavSelect = (id: string) => {
    setNavigation((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.id === id,
      }))
    );
  };

  const totalMarketCap = cryptoData.reduce((sum, c) => sum + c.marketCap, 0);
  const totalVolume = cryptoData.reduce((sum, c) => sum + c.volume24h, 0);
  const avgChange = cryptoData.reduce((sum, c) => sum + c.change24h, 0) / cryptoData.length;

  const statCards: StatCard[] = [
    { title: "Total Market Cap", value: formatCurrency(totalMarketCap), change: 1.45, icon: "💰" },
    { title: "24h Volume", value: formatCurrency(totalVolume), change: -0.82, icon: "📊" },
    { title: "BTC Dominance", value: "52.4%", change: 0.23, icon: "₿" },
    { title: "Avg 24h Change", value: `${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(2)}%`, change: avgChange, icon: "📈" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar items={navigation} onSelect={handleNavSelect} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Crypto Dashboard</h1>
              <p className="text-gray-400 mt-1">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Live
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Add Asset
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>
          <CryptoTable data={cryptoData} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default App;