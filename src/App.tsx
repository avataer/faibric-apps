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

interface PriceData {
  [key: string]: CryptoPrice;
}

interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  avgBuyPrice: number;
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
}

interface StatItem {
  id: string;
  label: string;
  value: string;
  change?: number;
  icon: string;
}

interface AlertItem {
  id: string;
  type: "price_up" | "price_down" | "info";
  message: string;
  timestamp: Date;
}

// Placeholder Component
const DataPlaceholder = ({ symbol = "$", onActivate }: { symbol?: string; onActivate?: () => void }) => (
  <span className="inline-flex items-center gap-1">
    <span className="text-gray-400 font-mono">{symbol}---</span>
    <button 
      onClick={onActivate}
      className="text-xs text-blue-500 hover:text-blue-700 underline"
    >
      Turn On Real Values
    </button>
  </span>
);

// Navigation Sidebar Component
const Navigation = ({ 
  currentView, 
  onNavigate, 
  onLogout 
}: { 
  currentView: string; 
  onNavigate: (viewId: string) => void; 
  onLogout: () => void;
}) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "portfolio", label: "Portfolio", icon: "💼" },
    { id: "charts", label: "Charts", icon: "📈" },
    { id: "alerts", label: "Alerts", icon: "🔔" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🪙</span> CryptoTracker
        </h1>
      </div>
      <nav className="flex-1 p-4">
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
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

// Stats Cards Component
const StatsCards = ({ 
  prices, 
  loading, 
  onStatClick,
  onActivate
}: { 
  prices: PriceData; 
  loading: boolean; 
  onStatClick: (stat: StatItem) => void;
  onActivate: () => void;
}) => {
  const stats: StatItem[] = [
    {
      id: "bitcoin",
      label: "Bitcoin",
      value: prices.bitcoin ? `$${prices.bitcoin.usd.toLocaleString()}` : "",
      change: prices.bitcoin?.usd_24h_change,
      icon: "₿"
    },
    {
      id: "ethereum",
      label: "Ethereum",
      value: prices.ethereum ? `$${prices.ethereum.usd.toLocaleString()}` : "",
      change: prices.ethereum?.usd_24h_change,
      icon: "Ξ"
    },
    {
      id: "solana",
      label: "Solana",
      value: prices.solana ? `$${prices.solana.usd.toLocaleString()}` : "",
      change: prices.solana?.usd_24h_change,
      icon: "◎"
    },
    {
      id: "cardano",
      label: "Cardano",
      value: prices.cardano ? `$${prices.cardano.usd.toLocaleString()}` : "",
      change: prices.cardano?.usd_24h_change,
      icon: "₳"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          onClick={() => onStatClick(stat)}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            {stat.change !== undefined && !loading && (
              <span className={`text-sm font-medium ${stat.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stat.change >= 0 ? "+" : ""}{stat.change?.toFixed(2)}%
              </span>
            )}
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</h3>
          <div className="text-2xl font-bold mt-1 dark:text-white">
            {loading || !stat.value ? (
              <DataPlaceholder symbol="$" onActivate={onActivate} />
            ) : (
              stat.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Portfolio Table Component
const PortfolioTable = ({ 
  portfolio, 
  prices, 
  loading,
  onRowClick,
  onActivate
}: { 
  portfolio: PortfolioItem[]; 
  prices: PriceData; 
  loading: boolean;
  onRowClick: (row: PortfolioItem, index: number) => void;
  onActivate: () => void;
}) => {
  const calculateValue = (item: PortfolioItem) => {
    const currentPrice = prices[item.id]?.usd || 0;
    return item.amount * currentPrice;
  };

  const calculatePnL = (item: PortfolioItem) => {
    const currentPrice = prices[item.id]?.usd || 0;
    const currentValue = item.amount * currentPrice;
    const costBasis = item.amount * item.avgBuyPrice;
    return currentValue - costBasis;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold dark:text-white">Your Portfolio</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Holdings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {portfolio.map((item, index) => {
              const pnl = calculatePnL(item);
              return (
                <tr 
                  key={item.id} 
                  onClick={() => onRowClick(item, index)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium dark:text-white">{item.name}</span>
                      <span className="text-gray-500 text-sm">{item.symbol}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 dark:text-gray-300">
                    {item.amount} {item.symbol}
                  </td>
                  <td className="px-6 py-4 dark:text-gray-300">
                    {loading || !prices[item.id] ? (
                      <DataPlaceholder symbol="$" onActivate={onActivate} />
                    ) : (
                      `$${prices[item.id].usd.toLocaleString()}`
                    )}
                  </td>
                  <td className="px-6 py-4 dark:text-gray-300">
                    {loading || !prices[item.id] ? (
                      <DataPlaceholder symbol="$" onActivate={onActivate} />
                    ) : (
                      `$${calculateValue(item).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {loading || !prices[item.id] ? (
                      <DataPlaceholder symbol="$" onActivate={onActivate} />
                    ) : (
                      <span className={pnl >= 0 ? "text-green-500" : "text-red-500"}>
                        {pnl >= 0 ? "+" : ""}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Line Chart Component
const LineChart = ({ 
  data, 
  loading,
  onDataPointClick 
}: { 
  data: ChartDataPoint[]; 
  loading: boolean;
  onDataPointClick: (point: ChartDataPoint, index: number) => void;
}) => {
  if (loading || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Price History</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Loading chart data...
        </div>
      </div>
    );
  }

  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const range = maxPrice - minPrice;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Bitcoin Price (24h)</h2>
      <div className="h-64 flex items-end gap-1">
        {data.map((point, index) => {
          const height = range > 0 ? ((point.price - minPrice) / range) * 100 : 50;
          return (
            <div
              key={index}
              onClick={() => onDataPointClick(point, index)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-t transition-colors"
              style={{ height: `${Math.max(height, 5)}%` }}
              title={`$${point.price.toLocaleString()}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>24h ago</span>
        <span>Now</span>
      </div>
    </div>
  );
};

// Alerts List Component
const AlertsList = ({ 
  alerts, 
  onItemClick 
}: { 
  alerts: AlertItem[]; 
  onItemClick: (item: AlertItem, index: number) => void;
}) => {
  const getAlertIcon = (type: AlertItem["type"]) => {
    switch (type) {
      case "price_up": return "📈";
      case "price_down": return "📉";
      default: return "ℹ️";
    }
  };

  const getAlertColor = (type: AlertItem["type"]) => {
    switch (type) {
      case "price_up": return "border-l-green-500 bg-green-50 dark:bg-green-900/20";
      case "price_down": return "border-l-red-500 bg-red-50 dark:bg-red-900/20";
      default: return "border-l-blue-500 bg-blue-50 dark:bg-blue-900/20";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold dark:text-white">Recent Alerts</h2>
      </div>
      <div className="divide-y dark:divide-gray-700">
        {alerts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No alerts yet</div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={alert.id}
              onClick={() => onItemClick(alert, index)}
              className={`p-4 border-l-4 cursor-pointer hover:opacity-80 ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{getAlertIcon(alert.type)}</span>
                <div className="flex-1">
                  <p className="dark:text-white">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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
        <div className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h3 className="font-semibold dark:text-white">Cryptocurrency Prices</h3>
          <p className="text-sm text-gray-500">CoinGecko API - Free, No API key needed</p>
          <span className="text-green-500 text-sm">✓ Auto-connected</span>
        </div>
        <div className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h3 className="font-semibold dark:text-white">Market Data</h3>
          <p className="text-sm text-gray-500">Real-time price updates every 30 seconds</p>
          <span className="text-green-500 text-sm">✓ Active</span>
        </div>
        <div className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h3 className="font-semibold dark:text-white">Custom API</h3>
          <p className="text-sm text-gray-500">Add your own API endpoint</p>
          <input type="text" placeholder="API Key" className="mt-2 w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white" />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Connect</button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  // Portfolio data (user's holdings)
  const [portfolio] = useState<PortfolioItem[]>([
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin", amount: 0.5, avgBuyPrice: 42000 },
    { id: "ethereum", symbol: "ETH", name: "Ethereum", amount: 2.5, avgBuyPrice: 2800 },
    { id: "solana", symbol: "SOL", name: "Solana", amount: 15, avgBuyPrice: 120 },
    { id: "cardano", symbol: "ADA", name: "Cardano", amount: 500, avgBuyPrice: 0.45 },
  ]);

  // Fetch prices from API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            service: "coingecko", 
            endpoint: "/simple/price?ids=bitcoin,ethereum,solana,cardano&vs_currencies=usd&include_24hr_change=true" 
          })
        });
        const data = await response.json();
        const priceData = data.data || data;
        
        // Check for price changes and create alerts
        if (Object.keys(prices).length > 0 && priceData.bitcoin) {
          const oldBtc = prices.bitcoin?.usd || 0;
          const newBtc = priceData.bitcoin?.usd || 0;
          if (newBtc > oldBtc * 1.001) {
            setAlerts(prev => [{
              id: Date.now().toString(),
              type: "price_up",
              message: `Bitcoin price increased to $${newBtc.toLocaleString()}`,
              timestamp: new Date()
            }, ...prev.slice(0, 9)]);
          } else if (newBtc < oldBtc * 0.999) {
            setAlerts(prev => [{
              id: Date.now().toString(),
              type: "price_down",
              message: `Bitcoin price decreased to $${newBtc.toLocaleString()}`,
              timestamp: new Date()
            }, ...prev.slice(0, 9)]);
          }
        }
        
        setPrices(priceData);
        
        // Update chart data
        if (priceData.bitcoin) {
          setChartData(prev => {
            const newPoint = { timestamp: Date.now(), price: priceData.bitcoin.usd };
            const updated = [...prev, newPoint].slice(-24);
            return updated;
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [prices]);

  // Event Handlers
  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
  };

  const handleTableRowclick = (row: PortfolioItem, index: number) => {
    console.log("onRowClick", row, index);
  };

  const handleChartDatapointclick = (point: ChartDataPoint, index: number) => {
    console.log("onDataPointClick", point, index);
  };

  const handleStatsStatclick = (stat: StatItem) => {
    console.log("onStatClick", stat);
  };

  const handleListItemclick = (item: AlertItem, index: number) => {
    console.log("onItemClick", item, index);
  };

  // Calculate total portfolio value
  const totalValue = portfolio.reduce((sum, item) => {
    const currentPrice = prices[item.id]?.usd || 0;
    return sum + (item.amount * currentPrice);
  }, 0);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-gray-900 text-white">
        <Navigation 
          currentView={currentView} 
          onNavigate={handleNavigationNavigate} 
          onLogout={handleNavigationLogout} 
        />
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {currentView === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Portfolio Value</p>
                <p className="text-2xl font-bold dark:text-white">
                  {loading ? (
                    <DataPlaceholder symbol="$" onActivate={() => setCurrentView("settings")} />
                  ) : (
                    `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
                </p>
              </div>
            </div>
            <StatsCards 
              prices={prices} 
              loading={loading} 
              onStatClick={handleStatsStatclick}
              onActivate={() => setCurrentView("settings")}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart 
                data={chartData} 
                loading={loading}
                onDataPointClick={handleChartDatapointclick}
              />
              <AlertsList 
                alerts={alerts} 
                onItemClick={handleListItemclick}
              />
            </div>
          </div>
        )}
        
        {currentView === "portfolio" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold dark:text-white">Portfolio</h1>
            <PortfolioTable 
              portfolio={portfolio} 
              prices={prices} 
              loading={loading}
              onRowClick={handleTableRowclick}
              onActivate={() => setCurrentView("settings")}
            />
          </div>
        )}
        
        {currentView === "charts" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold dark:text-white">Price Charts</h1>
            <LineChart 
              data={chartData} 
              loading={loading}
              onDataPointClick={handleChartDatapointclick}
            />
            <StatsCards 
              prices={prices} 
              loading={loading} 
              onStatClick={handleStatsStatclick}
              onActivate={() => setCurrentView("settings")}
            />
          </div>
        )}
        
        {currentView === "alerts" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold dark:text-white">Price Alerts</h1>
            <AlertsList 
              alerts={alerts} 
              onItemClick={handleListItemclick}
            />
          </div>
        )}
        
        {currentView === "settings" && <SettingsView />}
      </main>
    </div>
  );
};

export default App;