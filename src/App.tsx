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

interface ApiConfig {
  apiKey: string;
  isConnected: boolean;
}

// DataPlaceholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Settings View Component
const SettingsView = ({
  apiConfig,
  onApiKeyChange,
  onTestConnection,
}: {
  apiConfig: ApiConfig;
  onApiKeyChange: (key: string) => void;
  onTestConnection: () => void;
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-lg">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          API Configuration
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            API Key
          </label>
          <input
            type="text"
            value={apiConfig.apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
              Connection Status:
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                apiConfig.isConnected
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {apiConfig.isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        <button
          onClick={onTestConnection}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Test Connection
        </button>
      </div>
    </div>
  );
};

// Dashboard View with Click Counter
const DashboardView = ({
  count,
  onIncrement,
  onDecrement,
  onReset,
}: {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-md mx-auto text-center">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Click Counter
        </h3>

        <div className="text-6xl font-bold text-blue-500 mb-8">{count}</div>

        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={onDecrement}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-xl"
          >
            -
          </button>
          <button
            onClick={onIncrement}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={onReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>


  );
};

// Analytics View
const AnalyticsView = ({
  clickHistory,
  loading,
}: {
  clickHistory: number[];
  loading: boolean;
}) => {
  const totalClicks = clickHistory.reduce((a, b) => a + b, 0);
  const maxClick = clickHistory.length > 0 ? Math.max(...clickHistory) : 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Clicks
          </h4>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {loading ? <DataPlaceholder /> : totalClicks}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Sessions
          </h4>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {loading ? <DataPlaceholder /> : clickHistory.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Max in Session
          </h4>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {loading ? <DataPlaceholder /> : maxClick}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Click History by Session
        </h3>
        {clickHistory.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No click data recorded yet.
          </p>
        ) : (
          <div className="flex items-end gap-2 h-32">
            {clickHistory.map((clicks, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t flex-1 min-w-[20px] transition-all"
                style={{
                  height: `${maxClick > 0 ? (clicks / maxClick) * 100 : 0}%`,
                  minHeight: clicks > 0 ? "8px" : "2px",
                }}
                title={`Session ${index + 1}: ${clicks} clicks`}
              />
            ))}
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
    <aside className="w-64 bg-gray-800 min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white mb-8">Click Counter App</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

// Main App Component
function _OriginalApp() {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [count, setCount] = useState<number>(0);
  const [clickHistory, setClickHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    apiKey: "",
    isConnected: false,
  });

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" },
  ];

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Save click count to history when navigating away from dashboard
  useEffect(() => {
    if (currentView !== "dashboard" && count > 0) {
      setClickHistory((prev) => [...prev, count]);
      setCount(0);
    }
  }, [currentView]);

  const handleLayoutThemeChange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    if (count > 0) {
      setClickHistory((prev) => [...prev, count]);
    }
    setCount(0);
  };

  const handleApiKeyChange = (key: string) => {
    setApiConfig((prev) => ({ ...prev, apiKey: key }));
  };

  const handleTestConnection = () => {
    if (apiConfig.apiKey.length > 0) {
      setApiConfig((prev) => ({ ...prev, isConnected: true }));
    } else {
      setApiConfig((prev) => ({ ...prev, isConnected: false }));
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
        {currentView === "dashboard" && (
          <DashboardView
            count={count}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
          />
        )}
        {currentView === "analytics" && (
          <AnalyticsView clickHistory={clickHistory} loading={loading} />
        )}
        {currentView === "settings" && (
          <SettingsView
            apiConfig={apiConfig}
            onApiKeyChange={handleApiKeyChange}
            onTestConnection={handleTestConnection}
          />
        )}
      </main>
    </div>
  );
}





// FAIBRIC ADMIN PANEL WRAPPER
function FaibricAdmin() {
  const [adminAuth, setAdminAuth] = React.useState(!!localStorage.getItem("faibric_admin_token"));
  const [adminView, setAdminView] = React.useState("overview");
  const passRef = React.useRef(null);
  
  const login = () => {
    const p = passRef.current?.value || "";
    if (p === (localStorage.getItem("faibric_admin_pass") || "faibric123")) {
      localStorage.setItem("faibric_admin_token", "1");
      setAdminAuth(true);
    } else alert("Wrong password");
  };
  
  if (!adminAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Faibric Admin</h1>
          <input ref={passRef} type="password" placeholder="Password" 
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full p-3 border rounded-lg mb-4" autoFocus />
          <button onClick={login} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold">Login</button>
          <a href="/" className="block text-center text-gray-500 text-sm mt-4">Back to App</a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <span className="font-bold">Faibric Admin</span>
          {["overview", "settings"].map(v => (
            <button key={v} onClick={() => setAdminView(v)} 
              className={"px-3 py-1 rounded " + (adminView === v ? "bg-blue-600" : "hover:bg-gray-700")}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <a href="/" className="hover:underline">View App</a>
          <button onClick={() => {localStorage.removeItem("faibric_admin_token"); setAdminAuth(false)}} className="text-red-400">Logout</button>
        </div>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        {adminView === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Page Views</p>
                <p className="text-3xl font-bold">{parseInt(localStorage.getItem("faibric_views") || "0")}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Sessions</p>
                <p className="text-3xl font-bold">{parseInt(localStorage.getItem("faibric_sessions") || "0")}</p>
              </div>
            </div>
          </div>
        )}
        {adminView === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Change Password</h3>
              <input type="password" placeholder="New password" 
                onBlur={(e) => {if(e.target.value){localStorage.setItem("faibric_admin_pass",e.target.value); alert("Saved!")}}}
                className="w-full p-2 border rounded" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Main App with admin routing
function App() {
  // Track page view
  React.useEffect(() => {
    const v = parseInt(localStorage.getItem("faibric_views") || "0") + 1;
    localStorage.setItem("faibric_views", v.toString());
    if (!sessionStorage.getItem("faibric_session")) {
      sessionStorage.setItem("faibric_session", "1");
      localStorage.setItem("faibric_sessions", (parseInt(localStorage.getItem("faibric_sessions") || "0") + 1).toString());
    }
  }, []);
  
  // Check if admin route
  if (window.location.pathname.includes("/faibric")) {
    return <FaibricAdmin />;
  }
  
  return <_OriginalApp />;
}

export default App;
