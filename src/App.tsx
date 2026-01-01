import React, { useState, useEffect } from "react";

// TypeScript interfaces
interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ApiStatus {
  connected: boolean;
  lastChecked: Date | null;
  endpoint: string;
}

// SVG Icons as components
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const CounterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Placeholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Counter Component
const CounterView = () => {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading initial counter value
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + step);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - step);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setStep(value);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Counter</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-gray-800 dark:text-white mb-2">
            {loading ? <DataPlaceholder /> : count}
          </div>
          <p className="text-gray-500 dark:text-gray-400">Current Count</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleDecrement}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full text-2xl font-bold transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
            aria-label="Decrement"
          >
            -
          </button>
          
          <button
            onClick={handleReset}
            className="w-16 h-16 bg-gray-500 hover:bg-gray-600 text-white rounded-full text-sm font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
            aria-label="Reset"
          >
            Reset
          </button>
          
          <button
            onClick={handleIncrement}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full text-2xl font-bold transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
            aria-label="Increment"
          >
            +
          </button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Step Value
          </label>
          <input
            type="number"
            min="1"
            value={step}
            onChange={handleStepChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Each click will change the count by {step}
          </p>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const DashboardView = () => {
  const [stats, setStats] = useState({
    totalCounts: 0,
    sessionsToday: 0,
    avgCount: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalCounts: 1247,
        sessionsToday: 23,
        avgCount: 54
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Counts</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {loading ? <DataPlaceholder /> : stats.totalCounts.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sessions Today</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {loading ? <DataPlaceholder /> : stats.sessionsToday}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Average Count</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {loading ? <DataPlaceholder /> : stats.avgCount}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Start</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Welcome to the Counter App! Use the navigation to access different features:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Counter - Increment and decrement with customizable step values</li>
          <li>Settings - Configure API connections and preferences</li>
        </ul>
      </div>
    </div>
  );
};

// Settings Component
const SettingsView = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    connected: false,
    lastChecked: null,
    endpoint: "https://api.example.com/v1"
  });
  const [testing, setTesting] = useState<boolean>(false);

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setApiStatus({
        ...apiStatus,
        connected: apiKey.length > 0,
        lastChecked: new Date()
      });
      setTesting(false);
    }, 1500);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("counterAppApiKey", apiKey);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">API Connection</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${apiStatus.connected ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="text-gray-700 dark:text-gray-300">
              Status: {apiStatus.connected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Endpoint
            </label>
            <input
              type="text"
              value={apiStatus.endpoint}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {apiStatus.lastChecked && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Last checked: {apiStatus.lastChecked.toLocaleTimeString()}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleTestConnection}
              disabled={testing}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors"
            >
              {testing ? "Testing..." : "Test Connection"}
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">App Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">System Default</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Auto-save Counter</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  navItems: NavItem[];
}

const Sidebar = ({ currentView, onNavigate, navItems }: SidebarProps) => {
  return (
    <aside className="w-64 bg-gray-800 min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white mb-6">Counter App</h1>
        <nav className="space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "counter", label: "Counter", icon: <CounterIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> }
  ];

  const handleLayoutThemeChange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "counter":
        return <CounterView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        navItems={navItems}
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {renderView()}
      </main>
    </div>
  );
}

export default App;