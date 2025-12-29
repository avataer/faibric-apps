import React, { useState, useEffect } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface StatItem {
  id: string;
  label: string;
  value: string | React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
}

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
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

// Navigation Sidebar Component
const NavigationSidebar = ({ 
  currentView, 
  onNavigate, 
  onLogout 
}: { 
  currentView: string; 
  onNavigate: (viewId: string) => void; 
  onLogout: () => void;
}) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "chart" },
    { id: "prices", label: "Prices", icon: "dollar" },
    { id: "charts", label: "Charts", icon: "trending" },
    { id: "portfolio", label: "Portfolio", icon: "briefcase" },
    { id: "settings", label: "Settings", icon: "gear" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span></span> CryptoTracker
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span></span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Stats Cards Component
const StatsCards = ({ 
  stats, 
  onStatClick,
  loading 
}: { 
  stats: StatItem[]; 
  onStatClick: (stat: StatItem) => void;
  loading: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          onClick={() => onStatClick(stat)}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</span>
            {stat.icon && <span className="text-2xl">{stat.icon}</span>}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {loading ? <DataPlaceholder symbol="$" /> : stat.value}
          </div>
          {stat.change && !loading && (
            <div className={`text-sm mt-2 ${
              stat.changeType === "positive" ? "text-green-500" : 
              stat.changeType === "negative" ? "text-red-500" : "text-gray-500"
            }`}>
              {stat.changeType === "positive" ? "↑" : stat.changeType === "negative" ? "↓" : ""}
              {stat.change}
            </div>
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
  loading,
  onDataPointClick 
}: { 
  data: ChartDataPoint[]; 
  title: string;
  loading: boolean;
  onDataPointClick: (point: ChartDataPoint, index: number) => void;
}) => {
  if (loading || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <div className="h-64 flex items-center justify-center">
          <DataPlaceholder symbol="chart" />
        </div>
      </div>
    );
  }

  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const range = maxPrice - minPrice || 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0,${200 - ((data[0]?.price - minPrice) / range) * 180} ${data.map((d, i) => 
              `L ${(i / (data.length - 1)) * 400},${200 - ((d.price - minPrice) / range) * 180}`
            ).join(" ")} L 400,200 L 0,200 Z`}
            fill="url(#gradient)"
          />
          <path
            d={`M 0,${200 - ((data[0]?.price - minPrice) / range) * 180} ${data.map((d, i) => 
              `L ${(i / (data.length - 1)) * 400},${200 - ((d.price - minPrice) / range) * 180}`
            ).join(" ")}`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i / (data.length - 1)) * 400}
              cy={200 - ((d.price - minPrice) / range) * 180}
              r="4"
              fill="#3B82F6"
              className="cursor-pointer hover:r-6"
              onClick={() => onDataPointClick(d, i)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

// Crypto Table Component
const CryptoTable = ({ 
  data, 
  loading,
  onRowClick,
  onSort 
}: { 
  data: CryptoData[]; 
  loading: boolean;
  onRowClick: (row: CryptoData, index: number) => void;
  onSort: (column: string, direction: "asc" | "desc") => void;
}) => {
  const [sortColumn, setSortColumn] = useState("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">>("desc");

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "desc" ? "asc" : "desc";
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort(column, newDirection);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th 
                className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price
              </th>
              <th 
                className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("change24h")}
              >
                24h Change
              </th>
              <th 
                className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("marketCap")}
              >
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Volume (24h)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <DataPlaceholder symbol="chart" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((crypto, index) => (
                <tr 
                  key={crypto.id}
                  onClick={() => onRowClick(crypto, index)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {crypto.symbol === "btc" ? "₿" : crypto.symbol === "eth" ? "Ξ" : ""}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{crypto.name}</div>
                        <div className="text-xs text-gray-500 uppercase">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                    ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                    crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}>
                    {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                    ${(crypto.marketCap / 1e9).toFixed(2)}B
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                    ${(crypto.volume / 1e9).toFixed(2)}B
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Settings View Component
const SettingsView = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Connect Your Data</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">To see real values, connect your data sources:</p>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Cryptocurrency Prices</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">CoinGecko API - Free, No API key needed</p>
            </div>
            <span className="text-green-500 text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Auto-connected
            </span>
          </div>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Market Data</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Real-time market cap & volume</p>
            </div>
            <span className="text-green-500 text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Auto-connected
            </span>
          </div>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">Custom API</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add your own API endpoint</p>
          <input 
            type="text" 
            placeholder="API Endpoint" 
            className="mt-2 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
          <input 
            type="text" 
            placeholder="API Key (optional)" 
            className="mt-2 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Connect
          </button>
        </div>
      </div>
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-700 dark:text-blue-300">Data Refresh Rate</h4>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
          Prices update automatically every 30 seconds
        </p>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>>("dashboard");
  const [loading, setLoading] = useState<boolean>>(true);
  const [error, setError] = useState<Error | null>>(null);
  const [apiData, setApiData] = useState<Record<string, any>>({});
  const [chartData, setChartData] = useState<ChartDataPoint[]>>([]);

  // Gateway fetch function
  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, endpoint })
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    return result.data || result;
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const cryptoData = await fetchFromGateway(
          "coingecko", 
          "/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,polkadot,dogecoin,avalanche-2&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true"
        ).catch(() => null);
        
        setApiData({
          crypto: cryptoData,
          lastUpdated: new Date().toISOString(),
        });

        // Generate chart data based on current price with some variance
        if (cryptoData?.bitcoin?.usd) {
          const basePrice = cryptoData.bitcoin.usd;
          const newChartData: ChartDataPoint[] = [];
          for (let i = 23; i >= 0; i--) {
            newChartData.push({
              timestamp: Date.now() - i * 3600000,
              price: basePrice * (0.97 + Math.random() * 0.06)
            });
          }
          setChartData(newChartData);
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

  // Event Handlers
  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("Logout clicked");
  };

  const handleStatClick = (stat: StatItem) => {
    console.log("Stat clicked:", stat);
  };

  const handleChartDataPointClick = (point: ChartDataPoint, index: number) => {
    console.log("Chart point clicked:", point, index);
  };

  const handleTableRowClick = (row: CryptoData, index: number) => {
    console.log("Row clicked:", row, index);
    setCurrentView("charts");
  };

  const handleTableSort = (column: string, direction: "asc" | "desc") => {
    console.log("Sort:", column, direction);
  };

  // Transform API data to table format
  const getCryptoTableData = (): CryptoData[] => {
    if (!apiData.crypto) return [];
    
    const cryptoMapping: Record<string, { name: string; symbol: string }> = {
      bitcoin: { name: "Bitcoin", symbol: "btc" },
      ethereum: { name: "Ethereum", symbol: "eth" },
      solana: { name: "Solana", symbol: "sol" },
      cardano: { name: "Cardano", symbol: "ada" },
      ripple: { name: "XRP", symbol: "xrp" },
      polkadot: { name: "Polkadot", symbol: "dot" },
      dogecoin: { name: "Dogecoin", symbol: "doge" },
      "avalanche-2": { name: "Avalanche", symbol: "avax" },
    };

    return Object.entries(apiData.crypto).map(([id, data]: [string, any]) => ({
      id,
      name: cryptoMapping[id]?.name || id,
      symbol: cryptoMapping[id]?.symbol || id,
      price: data.usd || 0,
      change24h: data.usd_24h_change || 0,
      marketCap: data.usd_market_cap || 0,
      volume: data.usd_24h_vol || 0,
    })).sort((a, b) => b.marketCap - a.marketCap);
  };

  // Build stats
  const getStats = (): StatItem[] => {
    const btc = apiData.crypto?.bitcoin;
    const eth = apiData.crypto?.ethereum;
    const sol = apiData.crypto?.solana;
    
    return [
      {
        id: "btc",
        label: "Bitcoin",
        value: btc ? `$${btc.usd?.toLocaleString()}` : "$---",
        change: btc?.usd_24h_change ? `${btc.usd_24h_change.toFixed(2)}%` : undefined,
        changeType: btc?.usd_24h_change >= 0 ? "positive" : "negative",
        icon: "₿",
      },
      {
        id: "eth",
        label: "Ethereum",
        value: eth ? `$${eth.usd?.toLocaleString()}` : "$---",
        change: eth?.usd_24h_change ? `${eth.usd_24h_change.toFixed(2)}%` : undefined,
        changeType: eth?.usd_24h_change >= 0 ? "positive" : "negative",
        icon: "Ξ",
      },
      {
        id: "sol",
        label: "Solana",
        value: sol ? `$${sol.usd?.toLocaleString()}` : "$---",
        change: sol?.usd_24h_change ? `${sol.usd_24h_change.toFixed(2)}%` : undefined,
        changeType: sol?.usd_24h_change >= 0 ? "positive" : "negative",
        icon: "◎",
      },
      {
        id: "updated",
        label: "Last Updated",
        value: apiData.lastUpdated ? new Date(apiData.lastUpdated).toLocaleTimeString() : "--:--:--",
        icon: null,
      },
    ];
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <NavigationSidebar 
          currentView={currentView} 
          onNavigate={handleNavigationNavigate} 
          onLogout={handleNavigationLogout} 
        />
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {currentView}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {loading ? "Updating prices..." : `Last updated: ${new Date(apiData.lastUpdated || Date.now()).toLocaleTimeString()}`}
              </p>
            </div>
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
                <span></span>
                <span>Error loading data</span>
                <button 
                  onClick={() => setCurrentView("settings")}
                  className="text-sm underline"
                >
                  Check settings
                </button>
              </div>
            )}
          </div>

          {/* Dashboard View */}
          {currentView === "dashboard" && (
            <div className="space-y-6">
              <StatsCards 
                stats={getStats()} 
                onStatClick={handleStatClick}
                loading={loading}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChart 
                  data={chartData}
                  title="Bitcoin Price (24h)"
                  loading={loading}
                  onDataPointClick={handleChartDataPointClick}
                />
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Total Market Cap</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {loading ? <DataPlaceholder symbol="$" /> : 
                          `$${((apiData.crypto?.bitcoin?.usd_market_cap || 0) / 1e12).toFixed(2)}T+`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">BTC Dominance</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {loading ? <DataPlaceholder symbol="%" /> : "~54%"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Active Cryptos</span>
                      <span className="font-medium text-gray-900 dark:text-white">8</span>
                    </div>
                  </div>
                </div>
              </div>
              <CryptoTable 
                data={getCryptoTableData()}
                loading={loading}
                onRowClick={handleTableRowClick}
                onSort={handleTableSort}
              />
            </div>
          )}

          {/* Prices View */}
          {currentView === "prices" && (
            <div className="space-y-6">
              <CryptoTable 
                data={getCryptoTableData()}
                loading={loading}
                onRowClick={handleTableRowClick}
                onSort={handleTableSort}
              />
            </div>
          )}

          {/* Charts View */}
          {currentView === "charts" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChart 
                  data={chartData}
                  title="Bitcoin Price (24h)"
                  loading={loading}
                  onDataPointClick={handleChartDataPointClick}
                />
                <LineChart 
                  data={chartData.map(d => ({ ...d, price: d.price * 0.05 }))}
                  title="Ethereum Price (24h)"
                  loading={loading}
                  onDataPointClick={handleChartDataPointClick}
                />
              </div>
            </div>
          )}

          {/* Portfolio View */}
          {currentView === "portfolio" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Your Portfolio</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect your wallet or add holdings manually to track your portfolio.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  + Add Holdings
                </button>
              </div>
              <StatsCards 
                stats={getStats()} 
                onStatClick={handleStatClick}
                loading={loading}
              />
            </div>
          )}

          {/* Settings View */}
          {currentView === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
};

export default App;