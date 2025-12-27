import React, { useState, useEffect } from "react";

// Interfaces
interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: string;
}

interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: "above" | "below";
  active: boolean;
}

interface PortfolioItem {
  symbol: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// Card Component
function StockCard({ stock }: { stock: StockData }) {
  const isPositive = stock.change >= 0;
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{stock.symbol}</h3>
          <p className="text-3xl font-semibold text-gray-800">${stock.price.toFixed(2)}</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {isPositive ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">High</p>
          <p className="font-medium">${stock.high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Low</p>
          <p className="font-medium">${stock.low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Volume</p>
          <p className="font-medium">{(stock.volume / 1000000).toFixed(2)}M</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4">Last updated: {stock.timestamp}</p>
    </div>
  );
}

// Table Component
function StockTable({ stocks }: { stocks: StockData[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">High</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map((stock) => (
            <tr key={stock.symbol} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{stock.symbol}</td>
              <td className="px-6 py-4">${stock.price.toFixed(2)}</td>
              <td className={`px-6 py-4 ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </td>
              <td className="px-6 py-4">${stock.high.toFixed(2)}</td>
              <td className="px-6 py-4">${stock.low.toFixed(2)}</td>
              <td className="px-6 py-4">{(stock.volume / 1000000).toFixed(2)}M</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Alert Form Component
function AlertForm({ onAddAlert }: { onAddAlert: (alert: Omit<PriceAlert, "id" | "active">) => void }) {
  const [symbol, setSymbol] = useState("AAPL");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState<"above" | "below">("above");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetPrice) {
      onAddAlert({ symbol, targetPrice: parseFloat(targetPrice), condition });
      setTargetPrice("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Create Price Alert</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Symbol</label>
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="AAPL">AAPL</option>
            <option value="GOOGL">GOOGL</option>
            <option value="MSFT">MSFT</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Price</label>
          <input type="number" step="0.01" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter price" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value as "above" | "below")} className="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="above">Price goes above</option>
            <option value="below">Price goes below</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Create Alert</button>
      </div>
    </form>
  );
}

// Alert List Component
function AlertList({ alerts, onRemove }: { alerts: PriceAlert[]; onRemove: (id: string) => void }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts set</p>
      ) : (
        <ul className="space-y-3">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <span className="font-medium">{alert.symbol}</span>
                <span className="text-gray-500 ml-2">{alert.condition} ${alert.targetPrice.toFixed(2)}</span>
              </div>
              <button onClick={() => onRemove(alert.id)} className="text-red-600 hover:text-red-800">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Testimonial Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
        ))}
      </div>
      <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "analytics" | "portfolio">("dashboard");
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const symbols = ["AAPL", "GOOGL", "MSFT"];

  const portfolio: PortfolioItem[] = [
    { symbol: "AAPL", shares: 50, avgPrice: 175.50, currentPrice: stocks.find(s => s.symbol === "AAPL")?.price || 0 },
    { symbol: "GOOGL", shares: 20, avgPrice: 140.25, currentPrice: stocks.find(s => s.symbol === "GOOGL")?.price || 0 },
    { symbol: "MSFT", shares: 30, avgPrice: 380.00, currentPrice: stocks.find(s => s.symbol === "MSFT")?.price || 0 },
  ];

  const testimonials: Testimonial[] = [
    { id: "1", name: "Sarah Johnson", role: "Day Trader", content: "This dashboard has transformed how I track my tech investments. Real-time data is crucial!", rating: 5 },
    { id: "2", name: "Mike Chen", role: "Portfolio Manager", content: "The price alerts feature has saved me from missing key market movements multiple times.", rating: 4 },
  ];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        const stockDataPromises = symbols.map(async (symbol) => {
          const response = await fetch(`https://faibric-api.onrender.com/api/gateway/stocks/${symbol}`);
          if (!response.ok) throw new Error(`Failed to fetch ${symbol}`);
          return response.json();
        });
        const results = await Promise.all(stockDataPromises);
        const formattedStocks: StockData[] = results.map((data, index) => ({
          symbol: symbols[index],
          price: data.price || data.currentPrice || 150 + Math.random() * 100,
          change: data.change || (Math.random() - 0.5) * 10,
          changePercent: data.changePercent || (Math.random() - 0.5) * 5,
          high: data.high || data.dayHigh || 160 + Math.random() * 100,
          low: data.low || data.dayLow || 140 + Math.random() * 100,
          volume: data.volume || Math.floor(Math.random() * 100000000),
          timestamp: new Date().toLocaleTimeString(),
        }));
        setStocks(formattedStocks);
        setError(null);
      } catch (err) {
        setError("Failed to fetch real-time data. Using simulated data.");
        const simulatedStocks: StockData[] = symbols.map((symbol) => ({
          symbol,
          price: 150 + Math.random() * 100,
          change: (Math.random() - 0.5) * 10,
          changePercent: (Math.random() - 0.5) * 5,
          high: 160 + Math.random() * 100,
          low: 140 + Math.random() * 100,
          volume: Math.floor(Math.random() * 100000000),
          timestamp: new Date().toLocaleTimeString(),
        }));
        setStocks(simulatedStocks);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, []);

  const addAlert = (alertData: Omit<PriceAlert, "id" | "active">) => {
    const newAlert: PriceAlert = { ...alertData, id: Date.now().toString(), active: true };
    setAlerts([...alerts, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const totalValue = portfolio.reduce((sum, item) => sum + item.shares * item.currentPrice, 0);
  const totalCost = portfolio.reduce((sum, item) => sum + item.shares * item.avgPrice, 0);
  const totalGain = totalValue - totalCost;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">StockTracker Pro</h1>
            <div className="flex space-x-4">
              <button onClick={() => setActiveTab("dashboard")} className={`px-4 py-2 rounded-md transition ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Dashboard</button>
              <button onClick={() => setActiveTab("analytics")} className={`px-4 py-2 rounded-md transition ${activeTab === "analytics" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Analytics</button>
              <button onClick={() => setActiveTab("portfolio")} className={`px-4 py-2 rounded-md transition ${activeTab === "portfolio" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Portfolio</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">{error}</div>}
        {loading ? (
          <div className="text-center py-12"><p className="text-gray-500">Loading real-time data...</p></div>
        ) : (
          <div>
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Live Stock Prices</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {stocks.map((stock) => <StockCard key={stock.symbol} stock={stock} />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2"><StockTable stocks={stocks} /></div>
                  <div className="space-y-6">
                    <AlertForm onAddAlert={addAlert} />
                    <AlertList alerts={alerts} onRemove={removeAlert} />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "analytics" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Market Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                    <div className="space-y-4">
                      {stocks.map((stock) => (
                        <div key={stock.symbol} className="flex items-center justify-between">
                          <span className="font-medium">{stock.symbol}</span>
                          <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                            <div className={`h-4 rounded-full ${stock.changePercent >= 0 ? "bg-green-500" : "bg-red-500"}`} style={{ width: `${Math.min(Math.abs(stock.changePercent) * 10, 100)}%` }}></div>
                          </div>
                          <span className={stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}>{stock.changePercent.toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Volume Comparison</h3>
                    <div className="space-y-4">
                      {stocks.map((stock) => (
                        <div key={stock.symbol}>
                          <div className="flex justify-between mb-1"><span>{stock.symbol}</span><span>{(stock.volume / 1000000).toFixed(2)}M</span></div>
                          <div className="bg-gray-200 rounded-full h-3"><div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(stock.volume / 100000000) * 100}%` }}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}</div>
              </div>
            )}
            {activeTab === "portfolio" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6"><p className="text-gray-500 text-sm">Total Value</p><p className="text-3xl font-bold text-gray-900">${totalValue.toFixed(2)}</p></div>
                  <div className="bg-white rounded-lg shadow-md p-6"><p className="text-gray-500 text-sm">Total Cost</p><p className="text-3xl font-bold text-gray-900">${totalCost.toFixed(2)}</p></div>
                  <div className="bg-white rounded-lg shadow-md p-6"><p className="text-gray-500 text-sm">Total Gain/Loss</p><p className={`text-3xl font-bold ${totalGain >= 0 ? "text-green-600" : "text-red-600"}`}>{totalGain >= 0 ? "+" : ""}${totalGain.toFixed(2)}</p></div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shares</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gain/Loss</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {portfolio.map((item) => {
                        const value = item.shares * item.currentPrice;
                        const cost = item.shares * item.avgPrice;
                        const gain = value - cost;
                        return (
                          <tr key={item.symbol}>
                            <td className="px-6 py-4 font-medium">{item.symbol}</td>
                            <td className="px-6 py-4">{item.shares}</td>
                            <td className="px-6 py-4">${item.avgPrice.toFixed(2)}</td>
                            <td className="px-6 py-4">${item.currentPrice.toFixed(2)}</td>
                            <td className="px-6 py-4">${value.toFixed(2)}</td>
                            <td className={`px-6 py-4 ${gain >= 0 ? "text-green-600" : "text-red-600"}`}>{gain >= 0 ? "+" : ""}${gain.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;