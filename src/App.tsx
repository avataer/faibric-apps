import React, { useState, useEffect } from "react";

// TypeScript Interfaces
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

interface SettingsState {
  apiKey: string;
  apiConnected: boolean;
  connectionStatus: "disconnected" | "connecting" | "connected" | "error";
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
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Hello World App</h1>
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

// Footer Component
const Footer: React.FC<FooterProps> = ({
  companyName = "Hello World Inc.",
  year = 2024,
}) => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 px-6">
      <div className="flex justify-between items-center">
        <p>
          &copy; {year} {companyName}. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

// Home View Component
const HomeView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8">
      <div className="text-center">
        {loading ? (
          <div className="space-y-4">
            <div className="text-6xl font-bold">
              <DataPlaceholder />
            </div>
            <p className="text-xl text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-white">
              Hello World!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Welcome to your simple React application
            </p>
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-700 dark:text-gray-300">
                This is a simple hello world page built with React and
                TypeScript.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// About View Component
const AboutView: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        About This App
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          This is a simple Hello World application built to demonstrate basic
          React patterns and component composition.
        </p>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Features
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>React with TypeScript</li>
            <li>Tailwind CSS for styling</li>
            <li>Functional navigation</li>
            <li>Dark mode support</li>
            <li>Settings with API configuration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Settings View Component
const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    apiKey: "",
    apiConnected: false,
    connectionStatus: "disconnected",
  });
  const [inputApiKey, setInputApiKey] = useState("");

  const handleConnect = () => {
    if (!inputApiKey.trim()) {
      return;
    }

    setSettings((prev) => ({ ...prev, connectionStatus: "connecting" }));

    // Simulate API connection
    setTimeout(() => {
      setSettings({
        apiKey: inputApiKey,
        apiConnected: true,
        connectionStatus: "connected",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setSettings({
      apiKey: "",
      apiConnected: false,
      connectionStatus: "disconnected",
    });
    setInputApiKey("");
  };

  const getStatusColor = () => {
    switch (settings.connectionStatus) {
      case "connected":
        return "text-green-500";
      case "connecting":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = () => {
    switch (settings.connectionStatus) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Connection Error";
      default:
        return "Disconnected";
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            API Configuration
          </h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 dark:text-gray-300">Status:</span>
              <span className={`font-semibold ${getStatusColor()}`}>
                {settings.connectionStatus === "connecting" ? (
                  <span className="animate-pulse">{getStatusText()}</span>
                ) : (
                  getStatusText()
                )}
              </span>
              <div
                className={`w-3 h-3 rounded-full ${
                  settings.connectionStatus === "connected"
                    ? "bg-green-500"
                    : settings.connectionStatus === "connecting"
                    ? "bg-yellow-500 animate-pulse"
                    : "bg-gray-400"
                }`}
              ></div>
            </div>

            {!settings.apiConnected && (
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={inputApiKey}
                    onChange={(e) => setInputApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleConnect}
                  disabled={
                    !inputApiKey.trim() ||
                    settings.connectionStatus === "connecting"
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {settings.connectionStatus === "connecting"
                    ? "Connecting..."
                    : "Connect"}
                </button>
              </div>
            )}

            {settings.apiConnected && (
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300">
                  API Key:{" "}
                  <span className="font-mono">
                    {"*".repeat(settings.apiKey.length - 4)}
                    {settings.apiKey.slice(-4)}
                  </span>
                </p>
                <button
                  onClick={handleDisconnect}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Data Source Information
          </h3>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    Connection Type:
                  </td>
                  <td className="py-2 text-gray-800 dark:text-white">
                    REST API
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    Last Sync:
                  </td>
                  <td className="py-2 text-gray-800 dark:text-white">
                    {settings.apiConnected ? (
                      new Date().toLocaleString()
                    ) : (
                      <DataPlaceholder />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    Data Freshness:
                  </td>
                  <td className="py-2 text-gray-800 dark:text-white">
                    {settings.apiConnected ? "Real-time" : <DataPlaceholder />}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("home");

  const handleLayoutThemechange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "settings":
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-900 text-white">
          <Navigation
            currentView={currentView}
            onNavigate={handleNavigationNavigate}
            onLogout={handleNavigationLogout}
          />
        </aside>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
          <div className="flex-1">{renderCurrentView()}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;