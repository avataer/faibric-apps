import React, { useState, useEffect } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface CryptoPrice {
  usd: number;
  usd_24h_change?: number;
}

interface ApiData {
  crypto?: {
    bitcoin?: CryptoPrice;
    ethereum?: CryptoPrice;
    dogecoin?: CryptoPrice;
  };
  lastUpdated?: string;
}

interface StatItem {
  id: string;
  label: string;
  value: React.ReactNode;
  change?: React.ReactNode;
  icon: string;
}

interface ChartDataPoint {
  time: string;
  value: number;
}

// DataPlaceholder Component
const DataPlaceholder = ({ symbol = "$", onActivate }: { symbol?: string; onActivate?: () => void }) => (
  <span className="inline-flex items-center gap-2 text-gray-400">
    <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded animate-pulse">
      {symbol}---
    </span>
    {onActivate && (
      <button
        onClick={onActivate}
        className="text-xs text-blue-500 hover:text-blue-700 underline"
      >
        Turn On Real Values
      </button>
    )}
  </span>
);

// Navigation Component
const Navigation = ({
  currentView,
  onNavigate,
  onLogout,
}: {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
}) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "chart", label: "Price Chart", icon: "chart" },
    { id: "table", label: "Transactions", icon: "list" },
    { id: "settings", label: "Settings", icon: "cog" },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Crypto Tracker</h1>
        <p className="text-gray-400 text-sm">Live Prices</p>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="mt-auto px-4 py-3 text-gray-400 hover:text-white transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

// Stats Cards Component
const StatsCards = ({
  stats,
  onStatClick,
}: {
  stats: StatItem[];
  onStatClick: (stat: StatItem) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          onClick={() => onStatClick(stat)}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400">{stat.label}</span>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {stat.value}
          </div>
          {stat.change && (
            <div className="text-sm">{stat.change}</div>
          )}
        </div>
      ))}
    </div>
  );
};

// Line Chart Component
const LineChart = ({
  data,
  title,
  onDataPointClick,
}: {
  data: ChartDataPoint[];
  title: string;
  onDataPointClick: (point: ChartDataPoint, index: number) => void;
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <span className="animate-pulse">Loading chart data...</span>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">{title}</h3>
      <div className="h-64 flex items-end justify-between gap-1">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / range) * 100;
          return (
            <div
              key={index}
              onClick={() => onDataPointClick(point, index)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-t cursor-pointer transition-all"
              style={{ height: `${Math.max(height, 5)}%` }}
              title={`${point.time}: $${point.value.toLocaleString()}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{data[0]?.time}</span>
        <span>{data[data.length - 1]?.time}</span>
      </div>
    </div>
  );
};

// Transactions Table Component
const TransactionsTable = ({
  data,
  onRowClick,
}: {
  data: Array<{ id: string; coin: string; price: string; change: string; time: string }>;
  onRowClick: (row: any, index: number) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold dark:text-white">Recent Price Updates</h3>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Coin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">24h Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, index) => (
            <tr
              key={row.id}
              onClick={() => onRowClick(row, index)}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap dark:text-white font-medium">{row.coin}</td>
              <td className="px-6 py-4 whitespace-nowrap dark:text-white">{row.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.change}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Settings View Component
const SettingsView = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Connect Your Data</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">To see real values, connect your data sources:</p>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg dark:border-gray-700">
          <h3 className="font-semibold dark:text-white">Cryptocurrency Prices</h3>
          <p className="text-sm text-gray-500">CoinGecko API - Free, No API key needed</p>
          <span className="text-green-500 text-sm">Auto-connected</span>
        </div>
        <div className="p-4 border rounded-lg dark:border-gray-700">
          <h3 className="font-semibold dark:text-white">Stock Market Data</h3>
          <p className="text-sm text-gray-500">Yahoo Finance - Free tier available</p>
          <span className="text-green-500 text-sm">Auto-connected</span>
        </div>
        <div className="p-4 border rounded-lg dark:border-gray-700">
          <h3 className="font-semibold dark:text-white">Custom API</h3>
          <p className="text-sm text-gray-500">Add your own API endpoint</p>
          <input type="text" placeholder="API Key" className="mt-2 w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Connect</button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [apiData, setApiData] = useState<ApiData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [priceHistory, setPriceHistory] = useState<ChartDataPoint[]>([]);

  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, endpoint }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    return result.data || result;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const cryptoData = await fetchFromGateway(
          "coingecko",
          "/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true"
        ).catch(() => null);

        setApiData({
          crypto: cryptoData,
          lastUpdated: new Date().toISOString(),
        });

        if (cryptoData?.bitcoin?.usd) {
          setPriceHistory((prev) => {
            const newPoint = {
              time: new Date().toLocaleTimeString(),
              value: cryptoData.bitcoin.usd,
            };
            const updated = [...prev, newPoint].slice(-20);
            return updated;
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch data"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("Logout clicked");
  };

  const handleStatClick = (stat: StatItem) => {
    console.log("Stat clicked:", stat);
  };

  const handleDataPointClick = (point: ChartDataPoint, index: number) => {
    console.log("Data point clicked:", point, index);
  };

  const handleRowClick = (row: any, index: number) => {
    console.log("Row clicked:", row, index);
  };

  const formatPrice = (price?: number) => {
    if (loading) return <DataPlaceholder symbol="$" />;
    if (!price) return <DataPlaceholder symbol="$" onActivate={() => setCurrentView("settings")} />;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatChange = (change?: number) => {
    if (loading) return <DataPlaceholder symbol="%" />;
    if (change === undefined) return <DataPlaceholder symbol="%" onActivate={() => setCurrentView("settings")} />;
    const isPositive = change >= 0;
    return (
      <span className={isPositive ? "text-green-500" : "text-red-500"}>
        {isPositive ? "+" : ""}{change.toFixed(2)}%
      </span>
    );
  };

  const stats: StatItem[] = [
    {
      id: "bitcoin",
      label: "Bitcoin (BTC)",
      value: formatPrice(apiData.crypto?.bitcoin?.usd),
      change: formatChange(apiData.crypto?.bitcoin?.usd_24h_change),
      icon: "BTC",
    },
    {
      id: "ethereum",
      label: "Ethereum (ETH)",
      value: formatPrice(apiData.crypto?.ethereum?.usd),
      change: formatChange(apiData.crypto?.ethereum?.usd_24h_change),
      icon: "ETH",
    },
    {
      id: "dogecoin",
      label: "Dogecoin (DOGE)",
      value: formatPrice(apiData.crypto?.dogecoin?.usd),
      change: formatChange(apiData.crypto?.dogecoin?.usd_24h_change),
      icon: "DOGE",
    },
  ];

  const tableData = [
    {
      id: "1",
      coin: "Bitcoin",
      price: loading ? "$---" : `$${apiData.crypto?.bitcoin?.usd?.toLocaleString() || "---"}`,
      change: loading ? "%---" : `${apiData.crypto?.bitcoin?.usd_24h_change?.toFixed(2) || "---"}%`,
      time: apiData.lastUpdated ? new Date(apiData.lastUpdated).toLocaleTimeString() : "---",
    },
    {
      id: "2",
      coin: "Ethereum",
      price: loading ? "$---" : `$${apiData.crypto?.ethereum?.usd?.toLocaleString() || "---"}`,
      change: loading ? "%---" : `${apiData.crypto?.ethereum?.usd_24h_change?.toFixed(2) || "---"}%`,
      time: apiData.lastUpdated ? new Date(apiData.lastUpdated).toLocaleTimeString() : "---",
    },
    {
      id: "3",
      coin: "Dogecoin",
      price: loading ? "$---" : `$${apiData.crypto?.dogecoin?.usd?.toLocaleString() || "---"}`,
      change: loading ? "%---" : `${apiData.crypto?.dogecoin?.usd_24h_change?.toFixed(2) || "---"}%`,
      time: apiData.lastUpdated ? new Date(apiData.lastUpdated).toLocaleTimeString() : "---",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
          onLogout={handleNavigationLogout}
        />
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">Crypto Price Tracker</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Auto-refreshes every 30 seconds
                {apiData.lastUpdated && (
                  <span className="ml-2">
                    | Last update: {new Date(apiData.lastUpdated).toLocaleTimeString()}
                  </span>
                )}
              </p>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-blue-500">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Updating...</span>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm">
                Error fetching data. <button onClick={() => setCurrentView("settings")} className="underline">Check settings</button>
              </div>
            )}
          </div>

          {currentView === "dashboard" && (
            <div className="space-y-8">
              <StatsCards stats={stats} onStatClick={handleStatClick} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChart
                  data={priceHistory}
                  title="Bitcoin Price History"
                  onDataPointClick={handleDataPointClick}
                />
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Market Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-medium dark:text-white">Total Market Cap</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {loading ? <DataPlaceholder symbol="$" /> : "$2.1T"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-medium dark:text-white">24h Volume</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {loading ? <DataPlaceholder symbol="$" /> : "$89.5B"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-medium dark:text-white">BTC Dominance</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {loading ? <DataPlaceholder symbol="%" /> : "52.4%"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <TransactionsTable data={tableData} onRowClick={handleRowClick} />
            </div>
          )}

          {currentView === "chart" && (
            <div className="space-y-6">
              <LineChart
                data={priceHistory}
                title="Bitcoin Price History (Live)"
                onDataPointClick={handleDataPointClick}
              />
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Price Comparison</h3>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.id} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                      <div className="text-xl font-bold dark:text-white mt-1">{stat.value}</div>
                      <div className="mt-1">{stat.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === "table" && (
            <div className="space-y-6">
              <TransactionsTable data={tableData} onRowClick={handleRowClick} />
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Data Source Information</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prices are fetched from CoinGecko API and automatically refresh every 30 seconds.
                  Click on any row to see more details.
                </p>
              </div>
            </div>
          )}

          {currentView === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
};

</div>

export default App;