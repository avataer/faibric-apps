import React, { useState, useEffect } from "react";

// Interfaces
interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
}

interface CounterState {
  value: number;
  history: number[];
}

// Data Placeholder Component
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Settings View Component
const SettingsView = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "checking">("disconnected");

  const handleTestConnection = () => {
    setConnectionStatus("checking");
    setTimeout(() => {
      if (apiKey.length > 5) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("disconnected");
      }
    }, 1000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Connection</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) = /> setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleTestConnection}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Test Connection
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
            {connectionStatus === "checking" ? (
              <DataPlaceholder />
            ) : (
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  connectionStatus === "connected"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {connectionStatus === "connected" ? "Connected" : "Disconnected"}
              </span>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Source Information</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure your API connection to enable data synchronization and real-time updates.
          </p>
        </div>
      </div>
    </div>
  );
};

// Counter Dashboard Component
const CounterDashboard = ({
  counter,
  onIncrement,
  onDecrement,
  onReset,
}: {
  counter: CounterState;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Counter Dashboard</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Value</p>
          <div className="text-6xl font-bold text-blue-500">{counter.value}</div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={onDecrement}
            className="w-14 h-14 flex items-center justify-center bg-red-500 text-white text-2xl font-bold rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            -
          </button>
          <button
            onClick={onReset}
            className="px-6 h-14 flex items-center justify-center bg-gray-500 text-white font-medium rounded-full hover:bg-gray-600 transition-colors shadow-lg"
          >
            Reset
          </button>
          <button
            onClick={onIncrement}
            className="w-14 h-14 flex items-center justify-center bg-green-500 text-white text-2xl font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg"
          >
            +
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Click the buttons to change the counter value
        </div>
      </div>
    </div>
  );
};

// Counter History Component
const CounterHistory = ({ history }: { history: number[] }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Counter History</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-xl">
        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No history yet. Start using the counter to see history.
          </p>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total changes: {history.length}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((value, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
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
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Simple Counter</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [counter, setCounter] = useState<CounterState>({
    value: 0,
    history: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "history", label: "History" },
    { id: "settings", label: "Settings" },
  ];

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLayoutThemeChange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
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
    setCounter((prev) => ({
      value: 0,
      history: [...prev.history, 0],
    }));
  };

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <DataPlaceholder />
          </div>
        </div>
      );
    }

    switch (currentView) {
      case "dashboard":
        return (
          <CounterDashboard
            counter={counter}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
          />
        );
      case "history":
        return <CounterHistory history={counter.history} />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <CounterDashboard
            counter={counter}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        navItems={navItems}
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;