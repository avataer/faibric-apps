import React, { useState, useEffect } from "react";

// Interfaces
interface PriceData {
  bitcoin?: { usd: number; usd_24h_change?: number };
  ethereum?: { usd: number; usd_24h_change?: number };
}

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
  change?: number;
  icon: string;
  loading: boolean;
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  title: string;
  color: string;
  loading: boolean;
}

interface TransactionRow {
  id: string;
  coin: string;
  price: number;
  timestamp: string;
}

interface TransactionTableProps {
  transactions: TransactionRow[];
  loading: boolean;
}

// Navigation items
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "bitcoin", label: "Bitcoin", icon: "₿" },
  { id: "ethereum", label: "Ethereum", icon: "⟠" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// Sidebar Component
function Sidebar({ onNavigate, currentView }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-yellow-500">₿</span> CryptoTracker
        </h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  currentView === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// Stats Card Component
function StatsCard({ title, value, change, icon, loading }: StatsCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        {change !== undefined && !loading && (
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${
              change >= 0 ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      {loading ? (
        <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
      ) : (
        <p className="text-2xl font-bold text-white">{value}</p>
      )}
    </div>
  );
}

// Line Chart Component
function LineChart({ data, title, color, loading }: LineChartProps) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-white font-semibold mb-4">{title}</h3>
        <div className="h-48 bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-white font-semibold mb-4">{title}</h3>
        <div className="h-48 flex items-center justify-center text-gray-400">
          No chart data available
        </div>
      </div>
    );
  }

  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const range = maxPrice - minPrice || 1;

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="h-48 flex items-end gap-1">
        {data.slice(-24).map((point, index) => {
          const height = ((point.price - minPrice) / range) * 100;
          return (
            <div
              key={index}
              className="flex-1 rounded-t transition-all duration-300"
              style={{
                height: `${Math.max(height, 5)}%`,
                backgroundColor: color,
                opacity: 0.7 + (index / 24) * 0.3,
              }}
              title={`$${point.price.toLocaleString()}`}
            ></div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>${minPrice.toLocaleString()}</span>
        <span>${maxPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}

// Transaction Table Component
function TransactionTable({ transactions, loading }: TransactionTableProps) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-white font-semibold mb-4">Recent Price Updates</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-white font-semibold mb-4">Recent Price Updates</h3>
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-left text-sm">
            <th className="pb-3">Coin</th>
            <th className="pb-3">Price</th>
            <th className="pb-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t border-gray-700">
              <td className="py-3 text-white">{tx.coin}</td>
              <td className="py-3 text-green-400">${tx.price.toLocaleString()}</td>
              <td className="py-3 text-gray-400">{tx.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState<ChartDataPoint[]>([]);
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
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
        const data = result.data || result;
        setPrices(data);

        // Add to price history
        if (data.bitcoin) {
          setPriceHistory((prev) => [
            ...prev.slice(-47),
            { timestamp: Date.now(), price: data.bitcoin.usd },
          ]);
        }

        // Add to transactions
        const now = new Date().toLocaleTimeString();
        const newTransactions: TransactionRow[] = [];
        if (data.bitcoin) {
          newTransactions.push({
            id: `btc-${Date.now()}`,
            coin: "Bitcoin",
            price: data.bitcoin.usd,
            timestamp: now,
          });
        }
        if (data.ethereum) {
          newTransactions.push({
            id: `eth-${Date.now()}`,
            coin: "Ethereum",
            price: data.ethereum.usd,
            timestamp: now,
          });
        }
        setTransactions((prev) => [...newTransactions, ...prev].slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number | undefined): string => {
    if (price === undefined) return "Loading...";
    return `$${price.toLocaleString()}`;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Bitcoin (BTC)"
          value={formatPrice(prices.bitcoin?.usd)}
          change={prices.bitcoin?.usd_24h_change}
          icon="₿"
          loading={loading}
        />
        <StatsCard
          title="Ethereum (ETH)"
          value={formatPrice(prices.ethereum?.usd)}
          change={prices.ethereum?.usd_24h_change}
          icon="⟠"
          loading={loading}
        />
        <StatsCard
          title="BTC Dominance"
          value={prices.bitcoin ? "~50%" : "Loading..."}
          icon="📈"
          loading={loading}
        />
        <StatsCard
          title="Last Updated"
          value={new Date().toLocaleTimeString()}
          icon="🕐"
          loading={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={priceHistory}
          title="Bitcoin Price History (Live)"
          color="#F7931A"
          loading={loading}
        />
        <TransactionTable transactions={transactions} loading={loading} />
      </div>
    </div>
  );

  const renderBitcoin = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Bitcoin Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Current Price"
          value={formatPrice(prices.bitcoin?.usd)}
          change={prices.bitcoin?.usd_24h_change}
          icon="₿"
          loading={loading}
        />
        <StatsCard
          title="24h Change"
          value={
            prices.bitcoin?.usd_24h_change
              ? `${prices.bitcoin.usd_24h_change.toFixed(2)}%`
              : "Loading..."
          }
          icon="📊"
          loading={loading}
        />
      </div>
      <LineChart
        data={priceHistory}
        title="Bitcoin Price Chart"
        color="#F7931A"
        loading={loading}
      />
    </div>
  );

  const renderEthereum = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Ethereum Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Current Price"
          value={formatPrice(prices.ethereum?.usd)}
          change={prices.ethereum?.usd_24h_change}
          icon="⟠"
          loading={loading}
        />
        <StatsCard
          title="24h Change"
          value={
            prices.ethereum?.usd_24h_change
              ? `${prices.ethereum.usd_24h_change.toFixed(2)}%`
              : "Loading..."
          }
          icon="📊"
          loading={loading}
        />
      </div>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-white font-semibold mb-4">Ethereum Info</h3>
        <p className="text-gray-400">
          Ethereum is a decentralized blockchain platform that enables smart contracts
          and decentralized applications (dApps).
        </p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-white font-semibold mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Auto-refresh interval</span>
            <span className="text-white">30 seconds</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Currency</span>
            <span className="text-white">USD</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Data Source</span>
            <span className="text-white">CoinGecko API</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white capitalize">{currentView}</h1>
          <p className="text-gray-400">
            {loading ? "Fetching real-time data..." : "Live cryptocurrency prices"}
          </p>
        </header>
        {currentView === "dashboard" && renderDashboard()}
        {currentView === "bitcoin" && renderBitcoin()}
        {currentView === "ethereum" && renderEthereum()}
        {currentView === "settings" && renderSettings()}
      </main>
    </div>
  );
}

export default App;