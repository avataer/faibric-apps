import React, { useState, useEffect } from "react";

// Interfaces
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
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

type Theme = "light" | "dark";

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, onLogout }) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "about", label: "About" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Hello World App</h1>
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
          className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Layout Component
const Layout: React.FC<LayoutProps> = ({ children, theme = "light", onThemeChange }) => {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex justify-end p-2 bg-gray-100 dark:bg-gray-800">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      {children}
    </div>
  );
};

// Placeholder Component
const DataPlaceholder: React.FC = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Dashboard View
const DashboardView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreeting("Hello, World!");
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl">
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {loading ? <DataPlaceholder /> : greeting}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Welcome to your Hello World application built with React and TypeScript.
          </p>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">React</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Frontend Framework</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">TypeScript</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Type Safety</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">Tailwind</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">CSS Framework</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// About View
const AboutView: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">About</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          About This Application
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This is a simple Hello World application demonstrating the basic structure
          of a React application with TypeScript and Tailwind CSS.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The application features:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Functional navigation with view switching</li>
          <li>Dark and light theme support</li>
          <li>Settings page with API configuration</li>
          <li>Responsive design with Tailwind CSS</li>
          <li>TypeScript for type safety</li>
        </ul>
      </div>
    </div>
  );
};

// Settings View
const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("https://api.example.com");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "testing">("disconnected");
  const [saved, setSaved] = useState(false);

  const handleTestConnection = () => {
    setConnectionStatus("testing");
    setTimeout(() => {
      if (apiKey.length > 0) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("disconnected");
      }
    }, 1500);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          API Configuration
        </h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 dark:text-gray-300">Connection Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              connectionStatus === "connected" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : connectionStatus === "testing"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}>
              {connectionStatus === "connected" && "Connected"}
              {connectionStatus === "testing" && "Testing..."}
              {connectionStatus === "disconnected" && "Disconnected"}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Endpoint
            </label>
            <input
              type="text"
              value={apiEndpoint}
              onChange={(e) = /> setApiEndpoint(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter API endpoint URL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) = /> setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your API key"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleTestConnection}
              disabled={connectionStatus === "testing"}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Test Connection
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {saved ? "Saved!" : "Save Settings"}
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Data Source Information
          </h4>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Endpoint:</span>
                <span className="ml-2 text-gray-800 dark:text-white">{apiEndpoint || <DataPlaceholder />}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">API Key:</span>
                <span className="ml-2 text-gray-800 dark:text-white">
                  {apiKey ? "********" : <DataPlaceholder />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [theme, setTheme] = useState<Theme>("light");

  const handleLayoutThemechange = (newTheme: Theme) => {
    setTheme(newTheme);
    console.log("onThemeChange", newTheme);
  };

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
    alert("Logout clicked!");
  };

  return (
    <div className={`min-h-screen flex ${theme === "dark" ? "dark" : ""}`}>
      <aside className="w-64 bg-gray-900 text-white">
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
          onLogout={handleNavigationLogout}
        />
      </aside>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <Layout theme={theme} onThemeChange={handleLayoutThemechange}>
          <div className="min-h-screen">
            {currentView === "dashboard" && <DashboardView />}
            {currentView === "about" && <AboutView />}
            {currentView === "settings" && <SettingsView />}
          </div>
        </Layout>
      </main>
    </div>
  );
};

export default App;