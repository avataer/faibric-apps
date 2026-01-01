import React, { useState, useEffect } from "react";

// Interfaces
interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface CounterState {
  value: number;
  history: number[];
}

// SVG Icons as components
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

// Placeholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Counter Component
interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  loading: boolean;
}

const Counter = ({ value, onIncrement, onDecrement, loading }: CounterProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Simple Counter</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="text-6xl font-bold text-gray-900 dark:text-white mb-8 min-w-32 text-center">
          {loading ? <DataPlaceholder /> : value}
        </div>
        <div className="flex gap-4">
          <button
            onClick={onDecrement}
            className="flex items-center justify-center w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
            aria-label="Decrease"
          >
            <MinusIcon />
          </button>
          <button
            onClick={onIncrement}
            className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
            aria-label="Increase"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// History Component
interface HistoryProps {
  history: number[];
}

const History = ({ history }: HistoryProps) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Counter History</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No history yet. Use the counter to generate history.</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history.map((val, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-600 dark:text-gray-300">Step {index + 1}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Settings Component
interface SettingsProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  isConnected: boolean;
  onThemeChange: (theme: Theme) => void;
  currentTheme: Theme;
}

const Settings = ({ apiKey, onApiKeyChange, isConnected, onThemeChange, currentTheme }: SettingsProps) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">API Connection</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 dark:text-gray-300">Status:</span>
              <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                isConnected 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}>
                <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) = /> onApiKeyChange(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Theme Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Mode
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => onThemeChange({ ...currentTheme, mode: "light" })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentTheme.mode === "light"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => onThemeChange({ ...currentTheme, mode: "dark" })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentTheme.mode === "dark"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
interface SidebarProps {
  navItems: NavItem[];
  currentView: string;
  onNavigate: (view: string) => void;
}

const Sidebar = ({ navItems, currentView, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Counter App</h1>
      </div>
      <nav className="px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              currentView === item.id
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [counter, setCounter] = useState<CounterState>({ value: 0, history: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>({ mode: "light", primaryColor: "blue" });

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "history", label: "History", icon: <HistoryIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsConnected(apiKey.length > 0);
  }, [apiKey]);

  useEffect(() => {
    if (theme.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme.mode]);

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

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleLayoutThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    console.log("onThemeChange", newTheme);
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        navItems={navItems}
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {currentView === "dashboard" && (
          <Counter
            value={counter.value}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            loading={loading}
          />
        )}
        {currentView === "history" && (
          <History history={counter.history} />
        )}
        {currentView === "settings" && (
          <Settings
            apiKey={apiKey}
            onApiKeyChange={handleApiKeyChange}
            isConnected={isConnected}
            onThemeChange={handleLayoutThemeChange}
            currentTheme={theme}
          />
        )}
      </main>
    </div>
  );
}

export default App;