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

const PlusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
}

const Sidebar = ({ currentView, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Counter App</h1>
      </div>
      <nav className="px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
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
};

// Counter Component
interface CounterProps {
  counter: CounterState;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

const Counter = ({ counter, onIncrement, onDecrement, onReset }: CounterProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Simple Counter
      </h2>
      <div className="flex items-center justify-center gap-6 mb-8">
        <button
          onClick={onDecrement}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
        >
          <MinusIcon />
        </button>
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-5xl font-bold text-white">{counter.value}</span>
        </div>
        <button
          onClick={onIncrement}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
        >
          <PlusIcon />
        </button>
      </div>
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// Dashboard View
interface DashboardProps {
  counter: CounterState;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  loading: boolean;
}

const Dashboard = ({ counter, onIncrement, onDecrement, onReset, loading }: DashboardProps) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Dashboard</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <DataPlaceholder />
        </div>
      ) : (
        <Counter
          counter={counter}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onReset={onReset}
        />
      )}
    </div>
  );
};

// Analytics View
interface AnalyticsProps {
  counter: CounterState;
}

const Analytics = ({ counter }: AnalyticsProps) => {
  const max = Math.max(...counter.history, 0);
  const min = Math.min(...counter.history, 0);
  const avg = counter.history.length > 0 
    ? (counter.history.reduce((a, b) => a + b, 0) / counter.history.length).toFixed(2)
    : 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-2">Current Value</h3>
          <p className="text-3xl font-bold text-blue-500">{counter.value}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-2">Max Value</h3>
          <p className="text-3xl font-bold text-green-500">{max}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-2">Min Value</h3>
          <p className="text-3xl font-bold text-red-500">{min}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">History</h3>
        <div className="flex flex-wrap gap-2">
          {counter.history.length > 0 ? (
            counter.history.slice(-20).map((value, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  value >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {value}
              </span>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No history yet. Start counting!</p>
          )}
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Average: <span className="font-semibold text-purple-500">{avg}</span>
        </p>
      </div>
    </div>
  );
};

// Settings View
interface SettingsProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  isConnected: boolean;
  onThemeChange: (theme: Theme) => void;
}

const Settings = ({ apiKey, onApiKeyChange, isConnected, onThemeChange }: SettingsProps) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  const handleSave = () => {
    onApiKeyChange(localApiKey);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          API Connection Status
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-gray-600 dark:text-gray-300">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            API Key
          </label>
          <input
            type="text"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save API Key
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Theme Settings
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => onThemeChange({ mode: "light", primaryColor: "blue" })}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Light Mode
          </button>
          <button
            onClick={() => onThemeChange({ mode: "dark", primaryColor: "blue" })}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function _OriginalApp() {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [counter, setCounter] = useState<CounterState>({ value: 0, history: [0] });
  const [loading, setLoading] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check connection status when API key changes
    setIsConnected(apiKey.length > 0);
  }, [apiKey]);

  const handleLayoutThemeChange = (theme: Theme) => {
    console.log("onThemeChange", theme);
    // Theme change logic would go here
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
    setCounter({ value: 0, history: [0] });
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {currentView === "dashboard" && (
          <Dashboard
            counter={counter}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
            loading={loading}
          />
        )}
        {currentView === "analytics" && <Analytics counter={counter} />}
        {currentView === "settings" && (
          <Settings
            apiKey={apiKey}
            onApiKeyChange={handleApiKeyChange}
            isConnected={isConnected}
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
