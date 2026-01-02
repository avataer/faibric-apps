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

interface ApiConfig {
  apiKey: string;
  isConnected: boolean;
  lastChecked: Date | null;
}

// SVG Icons as components
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

// Navigation items
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <HomeIcon /> },
  { id: "analytics", label: "Analytics", icon: <ChartIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

// Sidebar Component
interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  theme: Theme;
}

function Sidebar({ currentView, onNavigate, theme }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Click Counter</h1>
      </div>
      <nav className="px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// Big Click Button Component
interface ClickButtonProps {
  count: number;
  onClick: () => void;
}

function ClickButton({ count, onClick }: ClickButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-6xl font-bold text-gray-800 dark:text-white">
        {count}
      </div>
      <button
        onClick={onClick}
        className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-3xl font-bold rounded-full shadow-2xl transform transition-all duration-150 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        CLICK ME
      </button>
      <p className="text-gray-500 dark:text-gray-400">Click the button to increase the count</p>
    </div>
</div>
</div>

  );
}

// Dashboard View
interface DashboardProps {
  count: number;
  onIncrement: () => void;
  onReset: () => void;
}

function Dashboard({ count, onIncrement, onReset }: DashboardProps) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Reset Counter
        </button>
      </div>
      <div className="flex justify-center items-center min-h-96">
        <ClickButton count={count} onClick={onIncrement} />
      </div>
    </div>
  );
}

// Analytics View
interface AnalyticsProps {
  count: number;
  clickHistory: number[];
}

function Analytics({ count, clickHistory }: AnalyticsProps) {
  const maxClicks = Math.max(...clickHistory, 1);
  const averageClicks = clickHistory.length > 0
    ? (clickHistory.reduce((a, b) => a + b, 0) / clickHistory.length).toFixed(1)
    : "0";

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Clicks</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{count}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Sessions</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{clickHistory.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg per Session</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{averageClicks}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4">Click History</h3>
        <div className="flex items-end gap-2 h-40">
          {clickHistory.length === 0 ? (
            <p className="text-gray-400">No data yet. Start clicking!</p>
          ) : (
            clickHistory.slice(-10).map((clicks, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-500 rounded-t-lg transition-all"
                style={{ height: `${(clicks / maxClicks) * 100}%`, minHeight: "8px" }}
                title={`${clicks} clicks`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Settings View
interface SettingsViewProps {
  apiConfig: ApiConfig;
  onApiKeyChange: (key: string) => void;
  onTestConnection: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

function SettingsView({ apiConfig, onApiKeyChange, onTestConnection, theme, onThemeChange }: SettingsViewProps) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">API Connection</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${apiConfig.isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-gray-600 dark:text-gray-300">
              {apiConfig.isConnected ? "Connected" : "Disconnected"}
            </span>
            {apiConfig.lastChecked && (
              <span className="text-gray-400 text-sm">
                Last checked: {apiConfig.lastChecked.toLocaleTimeString()}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiConfig.apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={onTestConnection}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Test Connection
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Appearance</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">
                Theme Mode
              </label>
              <select
                value={theme.mode}
                onChange={(e) => onThemeChange({ ...theme, mode: e.target.value as "light" | "dark" })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Data Status</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>Data storage: Local (Browser)</p>
            <p>Sync status: Not available</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function _OriginalApp() {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [count, setCount] = useState<number>(0);
  const [clickHistory, setClickHistory] = useState<number[]>([]);
  const [theme, setTheme] = useState<Theme>({ mode: "light", primaryColor: "#3b82f6" });
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    apiKey: "",
    isConnected: false,
    lastChecked: null,
  });

  useEffect(() => {
    const savedCount = localStorage.getItem("clickCount");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
    const savedHistory = localStorage.getItem("clickHistory");
    if (savedHistory) {
      setClickHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clickCount", count.toString());
  }, [count]);

  const handleLayoutThemeChange = (newTheme: Theme) => {
    console.log("onThemeChange", newTheme);
    setTheme(newTheme);
  };

  const handleNavigate = (view: string) => {
    if (currentView === "dashboard" && count > 0) {
      const newHistory = [...clickHistory, count];
      setClickHistory(newHistory);
      localStorage.setItem("clickHistory", JSON.stringify(newHistory));
    }
    setCurrentView(view);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    if (count > 0) {
      const newHistory = [...clickHistory, count];
      setClickHistory(newHistory);
      localStorage.setItem("clickHistory", JSON.stringify(newHistory));
    }
    setCount(0);
  };

  const handleApiKeyChange = (key: string) => {
    setApiConfig((prev) => ({ ...prev, apiKey: key }));
  };

  const handleTestConnection = () => {
    setApiConfig((prev) => ({
      ...prev,
      isConnected: prev.apiKey.length > 0,
      lastChecked: new Date(),
    }));
  };

  return (
    <div className={`min-h-screen flex ${theme.mode === "dark" ? "dark" : ""}`}>
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        theme={theme}
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {currentView === "dashboard" && (
          <Dashboard
            count={count}
            onIncrement={handleIncrement}
            onReset={handleReset}
          />
        )}
        {currentView === "analytics" && (
          <Analytics count={count} clickHistory={clickHistory} />
        )}
        {currentView === "settings" && (
          <SettingsView
            apiConfig={apiConfig}
            onApiKeyChange={handleApiKeyChange}
            onTestConnection={handleTestConnection}
            theme={theme}
            onThemeChange={handleLayoutThemeChange}
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
