import React, { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface StatItem {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

interface NavigationProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
}

interface StatsProps {
  stats: StatItem[];
  onStatClick: (stat: StatItem) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// ICON COMPONENTS (SVG-based, no emojis)
// ═══════════════════════════════════════════════════════════════════════════

const TimerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ResetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, onLogout }) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "timer", label: "Timer", icon: <TimerIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <TimerIcon />
          Timer App
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STATS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Stats: React.FC<StatsProps> = ({ stats, onStatClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <button
          key={stat.id}
          onClick={() => onStatClick(stat)}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          {stat.change !== undefined && (
            <div className={`text-sm mt-1 ${stat.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stat.change >= 0 ? "+" : ""}{stat.change}%
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TIMER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, seconds]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold text-gray-900 dark:text-white tracking-wider">
            {formatTime(seconds
</div>
)}
          </div>
          <div className="text-gray-500 dark:text-gray-400 mt-2">
            {isRunning ? "Running..." : seconds > 0 ? "Paused" : "Ready to start"}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleStartPause}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              isRunning
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ResetIcon />
            Reset
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleLap}
            disabled={!isRunning}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isRunning
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Record Lap
          </button>
        </div>

        {laps.length > 0 && (
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Laps</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {laps.map((lap, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  <span className="text-gray-600 dark:text-gray-300">Lap {index + 1}</span>
                  <span className="font-mono text-gray-900 dark:text-white">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS VIEW
// ═══════════════════════════════════════════════════════════════════════════

const SettingsView: React.FC<{ apiStatus: string; loading: boolean; error: Error | null }> = ({
  apiStatus,
  loading,
  error,
}) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Connection Status</h3>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-3 h-3 rounded-full ${
              loading ? "bg-yellow-500 animate-pulse" : error ? "bg-red-500" : "bg-green-500"
            }`}
          />
          <span className="text-gray-700 dark:text-gray-300">
            {loading ? "Connecting..." : error ? "Connection Error" : "Connected"}
          </span>
        </div>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm">
            {error.message}
          </div>
        )}
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last updated: {apiStatus || "Never"}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Key Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Key (Optional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  // ═══════════════════════════════════════════════════════════════════════════
  // GATEWAY API INTEGRATION
  // ═══════════════════════════════════════════════════════════════════════════

  const [apiData, setApiData] = useState<Record<string, unknown>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, endpoint }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    return result.data || result;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [cryptoData] = await Promise.all([
          fetchFromGateway("coingecko", "/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,eur").catch(
            () => null
          ),
        ]);

        setApiData({
          crypto: cryptoData,
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch data"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const DataPlaceholder = ({ symbol = "$", onActivate }: { symbol?: string; onActivate?: () => void }) => (
    <span className="inline-flex items-center gap-2 text-gray-400">
      <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded animate-pulse">
        {symbol}---
      </span>
      {onActivate && (
        <button onClick={onActivate} className="text-xs text-blue-500 hover:text-blue-700 underline">
          Turn On Real Values
        </button>
      )}
    </span>
  );

  const getData = (path: string, symbol = "$") => {
    if (loading) return <DataPlaceholder symbol={symbol} />;
    if (error) return <DataPlaceholder symbol={symbol} onActivate={() => setCurrentView("settings")} />;

    const keys = path.split(".");
    let value: unknown = apiData;
    for (const key of keys) {
      value = (value as Record<string, unknown>)?.[key];
    }

    if (value === undefined || value === null) {
      return <DataPlaceholder symbol={symbol} onActivate={() => setCurrentView("settings")} />;
    }

    if (symbol === "$") return `$${Number(value).toLocaleString()}`;
    if (symbol === "%") return `${Number(value).toFixed(2)}%`;
    return String(value);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleLayoutThemechange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
  };

  const handleStatsStatclick = (stat: StatItem) => {
    console.log("onStatClick", stat);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DASHBOARD VIEW
  // ═══════════════════════════════════════════════════════════════════════════

  const DashboardView = () => {
    const stats: StatItem[] = [
      { id: "sessions", label: "Total Sessions", value: "24" },
      { id: "time", label: "Total Time", value: "12h 34m" },
      { id: "avg", label: "Average Session", value: "31m" },
      { id: "streak", label: "Current Streak", value: "5 days" },
    ];

    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h2>
        <Stats stats={stats} onStatClick={handleStatsStatclick} />

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Timer</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start a quick timing session from the Timer tab.
          </p>
          <button
            onClick={() => setCurrentView("timer")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Go to Timer
          </button>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Data Status</h3>
          <div className="text-gray-600 dark:text-gray-400">
            Bitcoin Price: {getData("crypto.bitcoin.usd", "$")}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-gray-900 text-white">
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
          onLogout={handleNavigationLogout}
        />
      </aside>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "timer" && <Timer />}
        {currentView === "settings" && (
          <SettingsView
            apiStatus={apiData.lastUpdated as string}
            loading={loading}
            error={error}
          />
        )}
      </main>
    </div>
  );
};

export default App;