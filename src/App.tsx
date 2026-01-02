import React, { useState, useEffect } from "react";

// Interfaces
interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

interface NavigationProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
  onThemeChange?: (theme: Theme) => void;
}

interface ApiStatus {
  connected: boolean;
  lastChecked: Date | null;
  endpoint: string;
}

// Placeholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  onLogout,
}) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "greeting", label: "Greeting" },
    { id: "about", label: "About" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Greeting App</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentView === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Dashboard View
const DashboardView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Total Greetings
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {loading ? <DataPlaceholder /> : "1,234"}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Active Users
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {loading ? <DataPlaceholder /> : "567"}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Messages Today
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {loading ? <DataPlaceholder /> : "89"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Greeting View - Main feature showing Hello World
const GreetingView: React.FC = () => {
  const [greeting, setGreeting] = useState("Hello World");
  const [customName, setCustomName] = useState("");

  const handleCustomGreeting = () => {
    if (customName.trim()) {
      setGreeting(`Hello, ${customName}!`);
    } else {
      setGreeting("Hello World");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-full">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 text-center max-w-2xl w-full">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
          {greeting}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          Welcome to our greeting application. Enter your name below to get a
          personalized greeting!
        </p>
        <div className="flex gap-4 justify-center">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleCustomGreeting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Greet Me
          </button>
        </div>
        <button
          onClick={() => {
            setGreeting("Hello World");
            setCustomName("");
          }}
          className="mt-4 px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// About View
const AboutView: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        About
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Greeting App v1.0
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This is a simple greeting application that displays "Hello World" and
          allows users to create personalized greetings.
        </p>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
            Features:
          </h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
            <li>Display Hello World greeting</li>
            <li>Personalized greetings with custom names</li>
            <li>Dashboard with statistics</li>
            <li>Dark mode support</li>
            <li>API connection settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Settings View
const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    connected: false,
    lastChecked: null,
    endpoint: "https://api.example.com/v1",
  });
  const [testing, setTesting] = useState(false);

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setApiStatus({
        ...apiStatus,
        connected: apiKey.length > 0,
        lastChecked: new Date(),
      });
      setTesting(false);
    }, 1500);
  };

  const handleSaveSettings = () => {
    console.log("Settings saved:", { apiKey, endpoint: apiStatus.endpoint });
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            API Connection Status
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-4 h-4 rounded-full ${
                apiStatus.connected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-600 dark:text-gray-300">
              {apiStatus.connected ? "Connected" : "Disconnected"}
            </span>
            {apiStatus.lastChecked && (
              <span className="text-sm text-gray-400">
                Last checked: {apiStatus.lastChecked.toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Endpoint
              </label>
              <input
                type="text"
                value={apiStatus.endpoint}
                onChange={(e) =>
                  setApiStatus({ ...apiStatus, endpoint: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleTestConnection}
                disabled={testing}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
              >
                {testing ? "Testing..." : "Test Connection"}
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Application Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Enable Notifications
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                Enabled
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Auto-refresh Data
              </span>
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("greeting");

  const handleLayoutThemechange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
    alert("Logout clicked");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "greeting":
        return <GreetingView />;
      case "about":
        return <AboutView />;
      case "settings":
        return <SettingsView />;
      default:
        return <GreetingView />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white">
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
          onLogout={handleNavigationLogout}
        />
      </aside>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">{renderView()}</main>
    </div>
  );
};

export default App;