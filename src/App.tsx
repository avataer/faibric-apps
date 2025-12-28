import React, { useState, useEffect } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface WeatherData {
  current?: {
    temp_c?: number;
    temp_f?: number;
    humidity?: number;
    wind_kph?: number;
    wind_mph?: number;
    condition?: {
      text?: string;
      icon?: string;
    };
    feelslike_c?: number;
    feelslike_f?: number;
    uv?: number;
    pressure_mb?: number;
    vis_km?: number;
  };
  location?: {
    name?: string;
    country?: string;
    localtime?: string;
  };
  forecast?: {
    forecastday?: Array<{
      date?: string;
      day?: {
        maxtemp_c?: number;
        mintemp_c?: number;
        avghumidity?: number;
        condition?: {
          text?: string;
          icon?: string;
        };
      };
    }>;
  };
}

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

// Data Placeholder Component
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

// Stat Card Component
const StatCard = ({ title, value, icon, trend, trendUp }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {trend && (
          <p className={`text-sm mt-1 ${trendUp ? "text-green-500" : "text-red-500"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

// Simple Line Chart Component
const LineChart = ({ data, title }: { data: ChartDataPoint[]; title: string }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex items-end justify-between h-40 gap-2">
        {data.map((point, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-blue-500 rounded-t-md transition-all duration-300"
              style={{ height: `${(point.value / maxValue) * 100}%`, minHeight: "4px" }}
            />
            <span className="text-xs text-gray-500 mt-2">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("London");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "forecast", label: "Forecast", icon: "📅" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "locations", label: "Locations", icon: "📍" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "weatherapi",
          endpoint: `/forecast.json?q=${city}&days=7&aqi=no`
        })
      });
      const data = await response.json();
      setWeatherData(data.data || data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, [city]);

  const goToSettings = () => setCurrentView("settings");

  // Prepare chart data from forecast
  const getChartData = (): ChartDataPoint[] => {
    if (!weatherData.forecast?.forecastday) return [];
    return weatherData.forecast.forecastday.map(day => ({
      label: day.date?.slice(5) || "",
      value: day.day?.maxtemp_c || 0
    }));
  };

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weather Dashboard</h1>
          <p className="text-gray-500 mt-1">
            {loading || !weatherData.location ? (
              <DataPlaceholder symbol="" onActivate={goToSettings} />
            ) : (
              `${weatherData.location.name}, ${weatherData.location.country}`
            )}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchWeatherData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Temperature"
          value={loading || !weatherData.current?.temp_c ? (
            <DataPlaceholder symbol="°" onActivate={goToSettings} />
          ) : (
            `${weatherData.current.temp_c}°C`
          )}
          icon="🌡️"
        />
        <StatCard
          title="Humidity"
          value={loading || !weatherData.current?.humidity ? (
            <DataPlaceholder symbol="%" onActivate={goToSettings} />
          ) : (
            `${weatherData.current.humidity}%`
          )}
          icon="💧"
        />
        <StatCard
          title="Wind Speed"
          value={loading || !weatherData.current?.wind_kph ? (
            <DataPlaceholder symbol="" onActivate={goToSettings} />
          ) : (
            `${weatherData.current.wind_kph} km/h`
          )}
          icon="💨"
        />
        <StatCard
          title="UV Index"
          value={loading || weatherData.current?.uv === undefined ? (
            <DataPlaceholder symbol="#" onActivate={goToSettings} />
          ) : (
            weatherData.current.uv
          )}
          icon="☀️"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Current Conditions">
          {loading || !weatherData.current ? (
            <div className="text-center py-8">
              <DataPlaceholder symbol="" onActivate={goToSettings} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-6xl">
                  {weatherData.current.condition?.text?.includes("Sunny") ? "☀️" :
                   weatherData.current.condition?.text?.includes("Cloud") ? "☁️" :
                   weatherData.current.condition?.text?.includes("Rain") ? "🌧️" :
                   weatherData.current.condition?.text?.includes("Snow") ? "❄️" : "🌤️"}
                </span>
                <div>
                  <p className="text-xl font-semibold">{weatherData.current.condition?.text}</p>
                  <p className="text-gray-500">Feels like {weatherData.current.feelslike_c}°C</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-gray-500 text-sm">Pressure</p>
                  <p className="font-semibold">{weatherData.current.pressure_mb} mb</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Visibility</p>
                  <p className="font-semibold">{weatherData.current.vis_km} km</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <LineChart
          title="7-Day Temperature Forecast"
          data={getChartData()}
        />
      </div>

      <Card title="Weekly Forecast">
        {loading || !weatherData.forecast?.forecastday ? (
          <div className="text-center py-8">
            <DataPlaceholder symbol="" onActivate={goToSettings} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Condition</th>
                  <th className="text-left py-3 px-4">High</th>
                  <th className="text-left py-3 px-4">Low</th>
                  <th className="text-left py-3 px-4">Humidity</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.forecast.forecastday.map((day, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{day.date}</td>
                    <td className="py-3 px-4">{day.day?.condition?.text}</td>
                    <td className="py-3 px-4 text-red-500">{day.day?.maxtemp_c}°C</td>
                    <td className="py-3 px-4 text-blue-500">{day.day?.mintemp_c}°C</td>
                    <td className="py-3 px-4">{day.day?.avghumidity}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );

  // Forecast View
  const ForecastView = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Extended Forecast</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading || !weatherData.forecast?.forecastday ? (
          <Card title="Loading...">
            <DataPlaceholder symbol="" onActivate={goToSettings} />
          </Card>
        ) : (
          weatherData.forecast.forecastday.map((day, index) => (
            <Card key={index} title={day.date || ""}>
              <div className="text-center">
                <span className="text-5xl">
                  {day.day?.condition?.text?.includes("Sunny") ? "☀️" :
                   day.day?.condition?.text?.includes("Cloud") ? "☁️" :
                   day.day?.condition?.text?.includes("Rain") ? "🌧️" : "🌤️"}
                </span>
                <p className="mt-2 font-semibold">{day.day?.condition?.text}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <span className="text-red-500">↑ {day.day?.maxtemp_c}°C</span>
                  <span className="text-blue-500">↓ {day.day?.mintemp_c}°C</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  // Analytics View
  const AnalyticsView = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Weather Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart title="Temperature Trend" data={getChartData()} />
        <Card title="Statistics">
          {loading || !weatherData.forecast?.forecastday ? (
            <DataPlaceholder symbol="" onActivate={goToSettings} />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Average High</span>
                <span className="font-semibold">
                  {(weatherData.forecast.forecastday.reduce((acc, day) => acc + (day.day?.maxtemp_c || 0), 0) / weatherData.forecast.forecastday.length).toFixed(1)}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Average Low</span>
                <span className="font-semibold">
                  {(weatherData.forecast.forecastday.reduce((acc, day) => acc + (day.day?.mintemp_c || 0), 0) / weatherData.forecast.forecastday.length).toFixed(1)}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Average Humidity</span>
                <span className="font-semibold">
                  {(weatherData.forecast.forecastday.reduce((acc, day) => acc + (day.day?.avghumidity || 0), 0) / weatherData.forecast.forecastday.length).toFixed(0)}%
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );

  // Locations View
  const LocationsView = () => {
    const cities = ["London", "New York", "Tokyo", "Sydney", "Paris", "Dubai"];
    
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Saved Locations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((cityName) => (
            <div
              key={cityName}
              onClick={() => { setCity(cityName); setCurrentView("dashboard"); }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-semibold text-lg">{cityName}</p>
                  <p className="text-gray-500 text-sm">Click to view weather</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Settings View
  const SettingsView = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <Card title="Connect Your Data">
        <p className="text-gray-600 mb-6">Manage your data source connections:</p>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Weather API</h3>
                <p className="text-sm text-gray-500">Real-time weather data</p>
              </div>
              <span className="text-green-500 text-sm flex items-center gap-1">
                ✓ Auto-connected
              </span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Cryptocurrency Prices</h3>
                <p className="text-sm text-gray-500">Free - No API key needed</p>
              </div>
              <span className="text-green-500 text-sm flex items-center gap-1">
                ✓ Auto-connected
              </span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Stock Market Data</h3>
                <p className="text-sm text-gray-500">Free tier available</p>
              </div>
              <span className="text-green-500 text-sm flex items-center gap-1">
                ✓ Auto-connected
              </span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Custom API</h3>
            <p className="text-sm text-gray-500">Add your own API endpoint</p>
            <input
              type="text"
              placeholder="API Key"
              className="mt-2 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Connect
            </button>
          </div>
        </div>
      </Card>
      <Card title="Preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Temperature Unit</span>
            <select className="p-2 border rounded">
              <option>Celsius (°C)</option>
              <option>Fahrenheit (°F)</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Wind Speed Unit</span>
            <select className="p-2 border rounded">
              <option>km/h</option>
              <option>mph</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Auto-refresh Interval</span>
            <select className="p-2 border rounded">
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "forecast":
        return <ForecastView />;
      case "analytics":
        return <AnalyticsView />;
      case "locations":
        return <LocationsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold text-blue-600 ${!sidebarOpen && "hidden"}`}>
              ⛅ WeatherApp
            </span>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              {sidebarOpen && <span className="text-sm text-gray-500">Loading...</span>}
            </div>
          ) : error ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {sidebarOpen && <span className="text-sm text-red-500">Error</span>}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {sidebarOpen && <span className="text-sm text-gray-500">Connected</span>}
            </div>
          )}
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;