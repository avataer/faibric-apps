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

interface FooterProps {
  companyName?: string;
  year?: number;
}

// Placeholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Navigation component
const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  onLogout,
}) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "hello", label: "Hello World" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">My App</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
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
          className="w-full px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Header component
const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
    </header>
  );
};

// Footer component
const Footer: React.FC<FooterProps> = ({
  companyName = "My Company",
  year = 2024,
}) => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {year} {companyName}. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

// Layout component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  );
};

// Dashboard view
const DashboardView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {loading ? <DataPlaceholder /> : "1,234"}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Active Sessions
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {loading ? <DataPlaceholder /> : "56"}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {loading ? <DataPlaceholder /> : "Online"}
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Welcome to Dashboard
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This is a minimal hello world application. Navigate using the sidebar
          to explore different views.
        </p>
      </div>
    </div>
  );
};

// Hello World view
const HelloWorldView: React.FC = () => {
  return (
    <div className="p-6 flex items-center justify-center min-h-96">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Hello World!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Welcome to your minimal React application
        </p>
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <p className="text-gray-700 dark:text-gray-300">
            This is a simple hello world page built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
};

// Settings view
const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connecting" | "connected"
  >("disconnected");
  const [savedApiKey, setSavedApiKey] = useState("");

  const handleConnect = () => {
    if (!apiKey.trim()) return;
    setConnectionStatus("connecting");
    setTimeout(() => {
      setSavedApiKey(apiKey);
      setConnectionStatus("connected");
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnectionStatus("disconnected");
    setSavedApiKey("");
    setApiKey("");
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            API Connection Status
          </h3>
          <div className="flex items-center mb-4">
            <div
              className={`w-3 h-3 rounded-full mr-3 ${
                connectionStatus === "connected"
                  ? "bg-green-500"
                  : connectionStatus === "connecting"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-700 dark:text-gray-300 capitalize">
              {connectionStatus}
            </span>
          </div>
          {savedApiKey && connectionStatus === "connected" && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connected with API key: {savedApiKey.substring(0, 8)}...
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            API Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                API Key
              </label>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) = /> setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={connectionStatus === "connected"}
              />
            </div>
            <div className="flex space-x-3">
              {connectionStatus !== "connected" ? (
                <button
                  onClick={handleConnect}
                  disabled={!apiKey.trim() || connectionStatus === "connecting"}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {connectionStatus === "connecting"
                    ? "Connecting..."
                    : "Connect"}
                </button>
              ) : (
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Data Source Options
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="dataSource"
                defaultChecked
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Production API
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="dataSource"
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Staging API
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="dataSource"
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Local Development
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const handleLayoutThemechange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Dashboard";
      case "hello":
        return "Hello World";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "hello":
        return <HelloWorldView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
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
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header title={getViewTitle()} />
        <div className="flex-1">{renderCurrentView()}</div>
        <Footer companyName="Hello World Inc" year={2024} />
      </main>
    </div>
  );
};

export default App;