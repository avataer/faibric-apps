import React, { useState, useEffect } from "react";

// Interfaces
interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface CounterState {
  value: number;
  history: number[];
}

// DataPlaceholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Counter Component
const Counter = () => {
  const [counter, setCounter] = useState<CounterState>({
    value: 0,
    history: [0],
  });

  const handleIncrement = () => {
    setCounter((prev) => ({
      value: prev.value + 1,
      history: [...prev.history, prev.value + 1],
    }));
  };

  const handleDecrement = () => {
    setCounter((prev) => ({
      value: prev.value - 1,
      history: [...prev.history, prev.value - 1],
    }));
  };

  const handleReset = () => {
    setCounter({
      value: 0,
      history: [0],
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Simple Counter
      </h2>
      
      <div className="flex flex-col items-center space-y-6">
        <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
          {counter.value}
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleDecrement}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white text-3xl font-bold transition-colors duration-200 flex items-center justify-center shadow-md"
          >
            -
          </button>
          
          <button
            onClick={handleReset}
            className="w-16 h-16 rounded-full bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold transition-colors duration-200 flex items-center justify-center shadow-md"
          >
            Reset
          </button>
          
          <button
            onClick={handleIncrement}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white text-3xl font-bold transition-colors duration-200 flex items-center justify-center shadow-md"
          >
            +
          </button>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          History: {counter.history.slice(-5).join(" > ")}
        </div>
      </div>
    </div>
  );
};

// Dashboard View
const DashboardView = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Welcome to your counter application. Use the buttons below to increment or decrement the counter.
      </p>
      <Counter />
    </div>
  );
};

// Analytics View
const AnalyticsView = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClicks: 0,
    avgValue: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalClicks: 42,
        avgValue: 7,
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Analytics
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        View your counter usage statistics.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Total Clicks
          </h3>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {loading ? <DataPlaceholder /> : stats.totalClicks}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Average Value
          </h3>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">
            {loading ? <DataPlaceholder /> : stats.avgValue}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings View
const SettingsView = () => {
  const [apiKey, setApiKey] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "testing">("disconnected");

  const handleTestConnection = () => {
    setConnectionStatus("testing");
    setTimeout(() => {
      if (apiKey.length > 5) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("disconnected");
      }
    }, 1500);
  };

  const handleSaveSettings = () => {
    console.log("Settings saved with API key:", apiKey);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Settings
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Configure your application settings and API connections.
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            API Connection Status
          </h3>
          <div className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-green-500"
                  : connectionStatus === "testing"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-600 dark:text-gray-300 capitalize">
              {connectionStatus}
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleTestConnection}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            Test Connection
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            Save Settings
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Data Source Options
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300">Local Storage</span>
            <span className="text-green-500 font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300">Cloud Sync</span>
            <span className="text-gray-400 font-medium">Inactive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({
  navItems,
  currentView,
  onNavigate,
}: {
  navItems: NavItem[];
  currentView: string;
  onNavigate: (view: string) => void;
}) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Counter App
        </h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
              currentView === item.id
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [theme, setTheme] = useState<Theme>({
    mode: "light",
    primaryColor: "blue",
  });

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "[D]" },
    { id: "analytics", label: "Analytics", icon: "[A]" },
    { id: "settings", label: "Settings", icon: "[S]" },
  ];

  const handleLayoutThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    console.log("onThemeChange", newTheme);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  useEffect(() => {
    console.log("App mounted, current view:", currentView);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={`min-h-screen flex ${theme.mode === "dark" ? "dark" : ""}`}>
      <Sidebar
        navItems={navItems}
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-8">
        {renderView()}
      </main>
    </div>
  );
}

export default App;