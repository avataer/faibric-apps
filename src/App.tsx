import React, { useState, useEffect, useRef } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
}

interface Theme {
  mode: "light" | "dark";
}

// Navigation items
const navItems: NavItem[] = [
  { id: "stopwatch", label: "Stopwatch" },
  { id: "settings", label: "Settings" },
];

// Placeholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Format time helper function
const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms
    .toString()
    .padStart(2, "0")}`;
};

// Stopwatch Component
const StopwatchView = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = window.setInterval(() => {
        setTime(accumulatedTimeRef.current + (Date.now() - startTimeRef.current));
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      accumulatedTimeRef.current = time;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    accumulatedTimeRef.current = 0;
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Stopwatch
        </h2>

        {/* Time Display */}
        <div className="text-center mb-10">
          <div className="font-mono text-6xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-wider">
            {formatTime(time)}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Stop
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Reset
          </button>

          <button
            onClick={handleLap}
            disabled={!isRunning}
            className={`px-8 py-4 font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg ${
              isRunning
                ? "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-xl transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Lap
          </button>
        </div>

        {/* Laps List */}
        {laps.length > 0 && (
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Lap Times
            </h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {laps.map((lapTime, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2"
                >
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    Lap {index + 1}
                  </span>
                  <span className="font-mono text-gray-800 dark:text-white">
                    {formatTime(lapTime)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Settings View Component
const SettingsView = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConnect = () => {
    setIsLoading(true);
    // Simulate API connection
    setTimeout(() => {
      setIsConnected(apiKey.length > 0);
      setIsLoading(false);
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey("");
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
          Settings
        </h2>

        {/* Connection Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            API Connection Status
          </h3>

          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-600 dark:text-gray-400">
              {isLoading ? (
                <DataPlaceholder />
              ) : isConnected ? (
                "Connected"
              ) : (
                "Disconnected"
              )}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isConnected}
              />
            </div>

            <div className="flex gap-3">
              {!isConnected ? (
                <button
                  onClick={handleConnect}
                  disabled={isLoading || apiKey.length === 0}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isLoading || apiKey.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </button>
              ) : (
                <button
                  onClick={handleDisconnect}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Disconnect
                </button>
              )}
            </div>
          </div>
        </div>

        {/* App Settings Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            App Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Dark Mode
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                Uses system preference
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Version</span>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Sidebar = ({ currentView, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Stopwatch App
        </h1>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 ${
              currentView === item.id
                ? "bg-blue-500 text-white border-r-4 border-blue-700"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {item.id === "stopwatch" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
              )}
            </svg>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState<string>("stopwatch");

  const handleLayoutThemeChange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {currentView === "stopwatch" && <StopwatchView />}
        {currentView === "settings" && <SettingsView />}
      </main>
    </div>
  );
};

export default App;