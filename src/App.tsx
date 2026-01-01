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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Placeholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Counter Dashboard Component
const CounterDashboard = ({ 
  counter, 
  onIncrement, 
  onDecrement, 
  onReset 
}: { 
  counter: CounterState;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Counter Dashboard</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Value</p>
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
            {counter.value}
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={onDecrement}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            - Decrement
          </button>
          <button
            onClick={onIncrement}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            + Increment
          </button>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Reset Counter
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Changes</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{counter.history.length}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Last Value</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {counter.history.length > 0 ? counter.history[counter.history.length - 1] : <DataPlaceholder />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// History View Component
const HistoryView = ({ history }: { history: number[] }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Counter History</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No history yet. Start using the counter!</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
              <span>Step</span>
              <span>Value</span>
              <span>Change</span>
            </div>
            {history.map((value, index) => {
              const prevValue = index > 0 ? history[index - 1] : 0;
              const change = value - prevValue;
              return (
                <div 
                  key={index} 
                  className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-600 dark:text-gray-300">#{index + 1}</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{value}</span>
                  <span className={`font-medium ${change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-gray-400"}`}>
                    {change > 0 ? `+${change}` : change}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Settings View Component
const SettingsView = ({ 
  apiKey, 
  onApiKeyChange, 
  connectionStatus 
}: { 
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  connectionStatus: "connected" | "disconnected" | "checking";
}) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  const handleSave = () => {
    onApiKeyChange(localApiKey);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">API Connection Status</h2>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === "connected" ? "bg-green-500" : 
              connectionStatus === "checking" ? "bg-yellow-500 animate-pulse" : 
              "bg-red-500"
            }`}></div>
            <span className="text-gray-700 dark:text-gray-200 capitalize">
              {connectionStatus === "checking" ? <DataPlaceholder /> : connectionStatus}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">API Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={localApiKey}
                onChange={(e) = /> setLocalApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Data Source Information</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This counter app uses local state management. Configure an API key above to enable 
              cloud sync and data persistence features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ 
  currentView, 
  onNavigate, 
  navItems 
}: { 
  currentView: string;
  onNavigate: (view: string) => void;
  navItems: NavItem[];
}) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Counter App</h2>
      </div>
      <nav className="px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors text-left ${
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
  const [apiKey, setApiKey] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "checking">("disconnected");

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "history", label: "History", icon: <HistoryIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  useEffect(() => {
    // Simulate checking connection status
    if (apiKey) {
      setConnectionStatus("checking");
      const timer = setTimeout(() => {
        setConnectionStatus("connected");
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setConnectionStatus("disconnected");
    }
  }, [apiKey]);

  const handleLayoutThemeChange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

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
    setCounter({ value: 0, history: [] });
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        navItems={navItems}
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {currentView === "dashboard" && (
          <CounterDashboard
            counter={counter}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
          />
        )}
        {currentView === "history" && (
          <HistoryView history={counter.history} />
        )}
        {currentView === "settings" && (
          <SettingsView
            apiKey={apiKey}
            onApiKeyChange={handleApiKeyChange}
            connectionStatus={connectionStatus}
          />
        )}
      </main>
    </div>
  );
}

export default App;