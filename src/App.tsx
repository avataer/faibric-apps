import React, { useState } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

interface ChartDataPoint {
  time: string;
  london: number;
  newYork: number;
  tokyo: number;
}

interface ForecastItem {
  day: string;
  city: string;
  high: number;
  low: number;
  condition: string;
}

// Navigation items
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "forecast", label: "Forecast", icon: "📅" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// Mock weather data
const weatherData: WeatherData[] = [
  { city: "London", country: "UK", temperature: 12, humidity: 78, windSpeed: 15, condition: "Cloudy", icon: "☁️" },
  { city: "New York", country: "USA", temperature: 18, humidity: 62, windSpeed: 12, condition: "Sunny", icon: "☀️" },
  { city: "Tokyo", country: "Japan", temperature: 22, humidity: 70, windSpeed: 8, condition: "Partly Cloudy", icon: "⛅" },
];

// Mock chart data
const chartData: ChartDataPoint[] = [
  { time: "6AM", london: 10, newYork: 14, tokyo: 18 },
  { time: "9AM", london: 11, newYork: 16, tokyo: 20 },
  { time: "12PM", london: 13, newYork: 19, tokyo: 24 },
  { time: "3PM", london: 12, newYork: 20, tokyo: 25 },
  { time: "6PM", london: 11, newYork: 18, tokyo: 22 },
  { time: "9PM", london: 10, newYork: 15, tokyo: 19 },
];

// Mock forecast data
const forecastData: ForecastItem[] = [
  { day: "Monday", city: "London", high: 14, low: 8, condition: "Rainy" },
  { day: "Monday", city: "New York", high: 20, low: 12, condition: "Sunny" },
  { day: "Monday", city: "Tokyo", high: 24, low: 18, condition: "Clear" },
  { day: "Tuesday", city: "London", high: 12, low: 7, condition: "Cloudy" },
  { day: "Tuesday", city: "New York", high: 18, low: 10, condition: "Partly Cloudy" },
  { day: "Tuesday", city: "Tokyo", high: 22, low: 16, condition: "Sunny" },
];

// Sidebar Component
function Sidebar({ currentView, onNavigate }: { currentView: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-800 min-h-screen p-4">
      <div className="text-white text-xl font-bold mb-8 flex items-center gap-2">
        🌤️ Weather Hub
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
              currentView === item.id
                ? "bg-blue-500 text-white"
                : "text-slate-300 hover:bg-slate-700"
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

// Stats Card Component
function StatsCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-slate-700">{weather.city}</h3>
          <p className="text-sm text-slate-500">{weather.country}</p>
        </div>
        <span className="text-4xl">{weather.icon}</span>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold text-slate-800">{weather.temperature}°C</p>
        <p className="text-slate-600">{weather.condition}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Humidity</p>
          <p className="font-semibold text-slate-700">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-slate-500">Wind</p>
          <p className="font-semibold text-slate-700">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}

// Line Chart Component
function LineChart({ data }: { data: ChartDataPoint[] }) {
  const maxTemp = 30;
  const getY = (temp: number) => 150 - (temp / maxTemp) * 140;

  const londonPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${i * 80 + 40} ${getY(d.london)}`).join(" ");
  const nyPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${i * 80 + 40} ${getY(d.newYork)}`).join(" ");
  const tokyoPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${i * 80 + 40} ${getY(d.tokyo)}`).join(" ");

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Temperature Trends (24h)</h3>
      <svg viewBox="0 0 520 180" className="w-full">
        <path d={londonPath} fill="none" stroke="#3b82f6" strokeWidth="2" />
        <path d={nyPath} fill="none" stroke="#10b981" strokeWidth="2" />
        <path d={tokyoPath} fill="none" stroke="#f59e0b" strokeWidth="2" />
        {data.map((d, i) => (
          <text key={i} x={i * 80 + 40} y="170" textAnchor="middle" className="text-xs fill-slate-500">
            {d.time}
          </text>
        ))}
      </svg>
      <div className="flex gap-4 mt-4 justify-center">
        <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 bg-blue-500 rounded"></span> London</span>
        <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 bg-green-500 rounded"></span> New York</span>
        <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 bg-amber-500 rounded"></span> Tokyo</span>
      </div>
    </div>
  );
}

// Data Table Component
function DataTable({ data }: { data: ForecastItem[] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-slate-700">Weekly Forecast</h3>
      </div>
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Day</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">City</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">High</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Low</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Condition</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-t hover:bg-slate-50">
              <td className="px-4 py-3 text-sm text-slate-700">{item.day}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.city}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.high}°C</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.low}°C</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Dashboard View
function DashboardView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Weather Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weatherData.map((weather) => (
          <StatsCard key={weather.city} weather={weather} />
        ))}
      </div>
      <LineChart data={chartData} />
    </div>
  );
}

// Analytics View
function AnalyticsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Weather Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Average Temperature</h3>
          <div className="space-y-4">
            {weatherData.map((w) => (
              <div key={w.city} className="flex items-center gap-4">
                <span className="w-24 text-sm text-slate-600">{w.city}</span>
                <div className="flex-1 bg-slate-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${(w.temperature / 30) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-700">{w.temperature}°C</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Humidity Levels</h3>
          <div className="space-y-4">
            {weatherData.map((w) => (
              <div key={w.city} className="flex items-center gap-4">
                <span className="w-24 text-sm text-slate-600">{w.city}</span>
                <div className="flex-1 bg-slate-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${w.humidity}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-700">{w.humidity}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LineChart data={chartData} />
    </div>
  );
}

// Forecast View
function ForecastView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Weather Forecast</h1>
      <DataTable data={forecastData} />
    </div>
  );
}

// Settings View
function SettingsView() {
  const [apiKey, setApiKey] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">API Connection Status</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
            <span className="text-slate-700">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Data Source</p>
              <p className="font-medium text-slate-700">OpenWeather API</p>
            </div>
            <div>
              <p className="text-slate-500">Last Updated</p>
              <p className="font-medium text-slate-700">2 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">API Configuration</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsConnected(!isConnected)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Test Connection
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState("dashboard");

  const handleNavigate = (id: string) => {
    setCurrentView(id);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1 p-8">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "analytics" && <AnalyticsView />}
        {currentView === "forecast" && <ForecastView />}
        {currentView === "settings" && <SettingsView />}
      </main>
    </div>
  );
}

export default App;