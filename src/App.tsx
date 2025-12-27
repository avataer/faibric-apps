import React, { useState, useEffect } from "react";

// Interfaces
interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
}

interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: "above" | "below";
  active: boolean;
}

interface ChartDataPoint {
  time: string;
  price: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

// Sample Data
const initialStocks: StockData[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.52, change: 2.34, changePercent: 1.33, high: 180.12, low: 176.89, volume: "52.3M", marketCap: "2.78T" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: -1.23, changePercent: -0.86, high: 143.50, low: 140.20, volume: "28.1M", marketCap: "1.78T" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 4.56, changePercent: 1.22, high: 380.00, low: 374.50, volume: "31.2M", marketCap: "2.81T" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 495.22, change: 12.45, changePercent: 2.58, high: 498.00, low: 482.30, volume: "45.6M", marketCap: "1.22T" },
  { symbol: "META", name: "Meta Platforms", price: 505.34, change: -3.21, changePercent: -0.63, high: 510.00, low: 502.10, volume: "18.9M", marketCap: "1.30T" },
];

const generateChartData = (basePrice: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let price = basePrice;
  for (let i = 0; i < 24; i++) {
    price = price + (Math.random() - 0.5) * 5;
    data.push({ time: `${i}:00`, price: Math.round(price * 100) / 100 });
  }
  return data;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "watchlist", label: "Watchlist", icon: "⭐" },
  { id: "alerts", label: "Price Alerts", icon: "🔔" },
  { id: "portfolio", label: "Portfolio", icon: "💼" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// Sidebar Component
function Sidebar({ activeNav, onNavChange }: { activeNav: string; onNavChange: (id: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 p-4">
      <div className="text-2xl font-bold mb-8 text-blue-400">📈 StockTracker</div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
              activeNav === item.id ? "bg-blue-600" : "hover:bg-gray-800"
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

// Card Component
function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      {children}
    </div>
  );
}

// Stock Table Component
function StockTable({ stocks, onSelectStock }: { stocks: StockData[]; onSelectStock: (symbol: string) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Symbol</th>
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
            <th className="text-right py-3 px-4 text-gray-600 font-medium">Price</th>
            <th className="text-right py-3 px-4 text-gray-600 font-medium">Change</th>
            <th className="text-right py-3 px-4 text-gray-600 font-medium">Volume</th>
            <th className="text-right py-3 px-4 text-gray-600 font-medium">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.symbol}
              onClick={() => onSelectStock(stock.symbol)}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="py-4 px-4 font-bold text-blue-600">{stock.symbol}</td>
              <td className="py-4 px-4 text-gray-700">{stock.name}</td>
              <td className="py-4 px-4 text-right font-semibold">${stock.price.toFixed(2)}</td>
              <td className={`py-4 px-4 text-right font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </td>
              <td className="py-4 px-4 text-right text-gray-600">{stock.volume}</td>
              <td className="py-4 px-4 text-right text-gray-600">{stock.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Mini Chart Component
function MiniChart({ data, color }: { data: ChartDataPoint[]; color: string }) {
  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const range = maxPrice - minPrice;

  return (
    <div className="h-20 flex items-end gap-1">
      {data.slice(-12).map((point, index) => {
        const height = range > 0 ? ((point.price - minPrice) / range) * 100 : 50;
        return (
          <div
            key={index}
            className={`flex-1 rounded-t ${color}`}
            style={{ height: `${Math.max(height, 5)}%` }}
          />
        );
      })}
    </div>
  );
}

// Price Alert Form Component
function AlertForm({ stocks, onAddAlert }: { stocks: StockData[]; onAddAlert: (alert: Omit<PriceAlert, "id">) => void }) {
  const [symbol, setSymbol] = useState(stocks[0]?.symbol || "");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState<"above" | "below">("above");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol && targetPrice) {
      onAddAlert({ symbol, targetPrice: parseFloat(targetPrice), condition, active: true });
      setTargetPrice("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          {stocks.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value as "above" | "below")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="above">Price Above</option>
          <option value="below">Price Below</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Price</label>
        <input
          type="number"
          step="0.01"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Enter price..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Alert
      </button>
    </form>
  );
}

// Main App Component
function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [stocks, setStocks] = useState<StockData[]>(initialStocks);
  const [selectedStock, setSelectedStock] = useState<string>("AAPL");
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [chartData, setChartData] = useState<Record<string, ChartDataPoint[]>({});
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Initialize chart data
  useEffect(() => {
    const initialChartData: Record<string, ChartDataPoint[]> = {};
    stocks.forEach((stock) => {
      initialChartData[stock.symbol] = generateChartData(stock.price);
    });
    setChartData(initialChartData);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const priceChange = (Math.random() - 0.5) * 2;
          const newPrice = Math.max(stock.price + priceChange, 1);
          return {
            ...stock,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round((stock.change + priceChange * 0.1) * 100) / 100,
            changePercent: Math.round(((stock.change + priceChange * 0.1) / newPrice) * 10000) / 100,
          };
        })
      );
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAddAlert = (alertData: Omit<PriceAlert, "id">) => {
    const newAlert: PriceAlert = { ...alertData, id: Date.now().toString() };
    setAlerts((prev) => [...prev, newAlert]);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const selectedStockData = stocks.find((s) => s.symbol === selectedStock);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <main className="ml-64 p-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Stock Market Dashboard</h1>
            <p className="text-gray-500">Last updated: {lastUpdate.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stocks.slice(0, 4).map((stock) => (
            <Card key={stock.symbol} className="cursor-pointer hover:shadow-xl transition-shadow" >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-lg text-blue-600">{stock.symbol}</p>
                  <p className="text-sm text-gray-500">{stock.name}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${stock.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.changePercent).toFixed(2)}%
                </span>
              </div>
              <p className="text-2xl font-bold mb-2">${stock.price.toFixed(2)}</p>
              <MiniChart
                data={chartData[stock.symbol] || []}
                color={stock.change >= 0 ? "bg-green-400" : "bg-red-400"}
              />
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Tech Stocks Overview">
              <StockTable stocks={stocks} onSelectStock={setSelectedStock} />
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Stock Details">
              {selectedStockData && (
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b">
                    <p className="text-3xl font-bold text-blue-600">{selectedStockData.symbol}</p>
                    <p className="text-gray-500">{selectedStockData.name}</p>
                    <p className="text-4xl font-bold mt-2">${selectedStockData.price.toFixed(2)}</p>
                    <p className={`text-lg ${selectedStockData.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {selectedStockData.change >= 0 ? "+" : ""}{selectedStockData.change.toFixed(2)} ({selectedStockData.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Day High</p>
                      <p className="font-semibold">${selectedStockData.high.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Day Low</p>
                      <p className="font-semibold">${selectedStockData.low.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Volume</p>
                      <p className="font-semibold">{selectedStockData.volume}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Market Cap</p>
                      <p className="font-semibold">{selectedStockData.marketCap}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card title="Price Alerts">
              <AlertForm stocks={stocks} onAddAlert={handleAddAlert} />
              {alerts.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Active Alerts</p>
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-bold text-blue-600">{alert.symbol}</span>
                        <span className="text-gray-600 text-sm ml-2">
                          {alert.condition === "above" ? ">" : "<"} ${alert.targetPrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;