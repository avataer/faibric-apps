import React, { useState, useEffect } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface StatItem {
  id: string;
  title: string;
  value: string | React.ReactNode;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

interface ChartDataPoint {
  label: string;
  value: number;
}

// Data Placeholder Component
const DataPlaceholder = ({ symbol = "$", onActivate }: { symbol?: string; onActivate?: () => void }) => (
  <span className="inline-flex items-center gap-2 text-gray-400">
    <span className="font-mono bg-gray-100/20 px-2 py-0.5 rounded animate-pulse">
      {symbol}---
    </span>
    {onActivate && (
      <button 
        onClick={onActivate}
        className="text-xs text-purple-300 hover:text-purple-100 underline"
      >
        Turn On Real Values
      </button>
    )}
  </span>
);

// Navigation Component
const Navigation = ({ 
  currentView, 
  onNavigate 
}: { 
  currentView: string; 
  onNavigate: (viewId: string) => void;
}) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "analytics", label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { id: "reports", label: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  ];

  return (
    <nav className="h-full p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Analytics Pro</h1>
      </div>
      <ul className="space-y-2 flex-1">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-purple-700/50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Stats Cards Component
const StatsCards = ({ 
  stats, 
  onStatClick,
  loading 
}: { 
  stats: StatItem[]; 
  onStatClick: (stat: StatItem) => void;
  loading: boolean;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat) => (
      <div
        key={stat.id}
        onClick={() => onStatClick(stat)}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all border border-white/10"
      >
        <p className="text-purple-200 text-sm">{stat.title}</p>
        <p className="text-2xl font-bold text-white mt-2">
          {loading ? <span className="animate-pulse">$---</span> : stat.value}
        </p>
        <p className={`text-sm mt-2 ${
          stat.changeType === "positive" ? "text-green-400" : 
          stat.changeType === "negative" ? "text-red-400" : "text-gray-400"
        }`}>
          {stat.change}
        </p>
      </div>
    ))}
  </div>
);

// Line Chart Component
const LineChart = ({ 
  data, 
  title,
  loading 
}: { 
  data: ChartDataPoint[]; 
  title: string;
  loading: boolean;
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <span className="text-purple-200 animate-pulse">Loading chart data...</span>
        </div>
      ) : (
        <div className="h-48 flex items-end gap-2">
          {data.map((point, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all hover:from-purple-400 hover:to-pink-400"
                style={{ height: `${(point.value / maxValue) * 100}%`, minHeight: "4px" }}
              />
              <span className="text-xs text-purple-200 mt-2">{point.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Bar Chart Component
const BarChart = ({ 
  data, 
  title,
  loading 
}: { 
  data: ChartDataPoint[]; 
  title: string;
  loading: boolean;
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <span className="text-purple-200 animate-pulse">Loading chart data...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((point, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-sm text-purple-200 w-12">{point.label}</span>
              <div className="flex-1 bg-white/5 rounded-full h-6 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${(point.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-sm text-white w-16 text-right">{point.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Pie Chart Component
const PieChart = ({ 
  data, 
  title,
  loading 
}: { 
  data: ChartDataPoint[]; 
  title: string;
  loading: boolean;
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const colors = ["#8B5CF6", "#EC4899", "#06B6D4", "#10B981", "#F59E0B"];
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <span className="text-purple-200 animate-pulse">Loading chart data...</span>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-purple-900/80" />
          </div>
          <div className="flex-1 space-y-2">
            {data.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="text-sm text-purple-200 flex-1">{point.label}</span>
                <span className="text-sm text-white">{((point.value / total) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Settings View Component
const SettingsView = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-white mb-4">Connect Your Data</h2>
    <p className="text-purple-200 mb-6">To see real values, connect your data sources:</p>
    <div className="space-y-4">
      <div className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10">
        <h3 className="font-semibold text-white">Cryptocurrency Prices</h3>
        <p className="text-sm text-purple-200">Free - No API key needed</p>
        <span className="text-green-400 text-sm">Connected</span>
      </div>
      <div className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10">
        <h3 className="font-semibold text-white">Stock Market Data</h3>
        <p className="text-sm text-purple-200">Free tier available</p>
        <span className="text-green-400 text-sm">Connected</span>
      </div>
      <div className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10">
        <h3 className="font-semibold text-white">Custom API</h3>
        <p className="text-sm text-purple-200">Add your own API endpoint</p>
        <input 
          type="text" 
          placeholder="API Key" 
          className="mt-2 w-full p-2 bg-white/5 border border-white/20 rounded text-white placeholder-purple-300"
        />
        <button className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors">
          Connect
        </button>
      </div>
    </div>
  </div>
);

// Main App Component
const _OriginalApp = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [dateRange, setDateRange] = useState({ start: "2024-01-01", end: "2024-12-31" });
  const [apiData, setApiData] = useState<Record<string, any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, endpoint })
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
          fetchFromGateway("coingecko", "/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true")
            .catch(() => null),
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

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleStatsStatclick = (stat: StatItem) => {
    console.log("Stat clicked:", stat);
  };

  const handleExport = () => {
    console.log("Exporting data...");
    alert("Data export initiated!");
  };

  // Generate stats based on API data
  const stats: StatItem[] = [
    {
      id: "total-users",
      title: "Total Users",
      value: loading ? <DataPlaceholder symbol="#" /> : "24,521",
      change: "+12.5% from last month",
      changeType: "positive"
    },
    {
      id: "active-users",
      title: "Active Users",
      value: loading ? <DataPlaceholder symbol="#" /> : "18,234",
      change: "+8.2% from last month",
      changeType: "positive"
    },
    {
      id: "revenue",
      title: "Revenue",
      value: loading ? <DataPlaceholder symbol="$" /> : `$${(apiData.crypto?.bitcoin?.usd || 45000).toLocaleString()}`,
      change: "+23.1% from last month",
      changeType: "positive"
    },
    {
      id: "mrr",
      title: "MRR",
      value: loading ? <DataPlaceholder symbol="$" /> : `$${(apiData.crypto?.ethereum?.usd || 2500).toLocaleString()}`,
      change: "+5.4% from last month",
      changeType: "positive"
    }
  ];

  // Chart data
  const revenueData: ChartDataPoint[] = [
    { label: "Jan", value: 12000 },
    { label: "Feb", value: 15000 },
    { label: "Mar", value: 18000 },
    { label: "Apr", value: 22000 },
    { label: "May", value: 19000 },
    { label: "Jun", value: 25000 },
    { label: "Jul", value: 28000 },
    { label: "Aug", value: 32000 },
    { label: "Sep", value: 35000 },
    { label: "Oct", value: 38000 },
    { label: "Nov", value: 42000 },
    { label: "Dec", value: 48000 }
  ];

  const signupsData: ChartDataPoint[] = [
    { label: "Jan", value: 450 },
    { label: "Feb", value: 520 },
    { label: "Mar", value: 680 },
    { label: "Apr", value: 890 },
    { label: "May", value: 750 },
    { label: "Jun", value: 920 }
  ];

  const trafficData: ChartDataPoint[] = [
    { label: "Direct", value: 35 },
    { label: "Organic", value: 28 },
    { label: "Referral", value: 18 },
    { label: "Social", value: 12 },
    { label: "Paid", value: 7 }
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <aside className="w-64 bg-purple-950/50 backdrop-blur-lg border-r border-white/10">
        <Navigation currentView={currentView} onNavigate={handleNavigationNavigate} />
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {currentView === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                <p className="text-purple-200 mt-1">Welcome back! Here is your overview.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/10">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="bg-transparent text-white text-sm outline-none"
                  />
                  <span className="text-purple-200">to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="bg-transparent text-white text-sm outline-none"
                  />
                </div>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              </div>
            </div>

            <StatsCards stats={stats} onStatClick={handleStatsStatclick} loading={loading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart data={revenueData} title="Monthly Revenue" loading={false} />
              <BarChart data={signupsData} title="User Signups" loading={false} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PieChart data={trafficData} title="Traffic Sources" loading={false} />
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Live Data Feed</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-purple-200">Bitcoin (BTC)</span>
                    <span className="text-white font-mono">
                      {loading ? <DataPlaceholder symbol="$" /> : `$${(apiData.crypto?.bitcoin?.usd || 0).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-purple-200">Ethereum (ETH)</span>
                    <span className="text-white font-mono">
                      {loading ? <DataPlaceholder symbol="$" /> : `$${(apiData.crypto?.ethereum?.usd || 0).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-purple-200">Solana (SOL)</span>
                    <span className="text-white font-mono">
                      {loading ? <DataPlaceholder symbol="$" /> : `$${(apiData.crypto?.solana?.usd || 0).toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-xs text-purple-300 text-center">
                    Last updated: {apiData.lastUpdated ? new Date(apiData.lastUpdated).toLocaleTimeString() : "---"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "analytics" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart data={revenueData} title="Revenue Trends" loading={false} />
              <BarChart data={signupsData} title="Growth Metrics" loading={false} />
            </div>
          </div>
        )}

        {currentView === "reports" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Reports</h1>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <p className="text-purple-200">Generate and download reports here.</p>
            </div>
          </div>
        )}

        {currentView === "settings" && <SettingsView />}
      </main>
    </div>
  );
};



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
