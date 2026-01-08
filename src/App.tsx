import React, { useCallback, useEffect } from 'react';

// layout component

/**
 * Props interface for the AppLayout component
 * Allows customization of the layout wrapper
 */
interface AppLayoutProps {
  /** Content to render inside the layout */
  children: React.ReactNode;
  /** Optional title for the header */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Optional custom class name for additional styling */
  className?: string;
}

/**
 * AppLayout - A reusable main layout wrapper component
 * Provides consistent structure with header, main content area, and optional footer
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title = 'Application',
  subtitle,
  showFooter = true,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo/Icon placeholder using text */}
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">[A]</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500">{subtitle}</p>
</div>
</div>

                )}
              </div>
            </div>
            
            {/* Navigation placeholder */}
            <nav className="hidden sm:flex items-center space-x-4">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                [HOME]
              </span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                [MENU]
              </span>
            </nav>
          </div>
        
      </head  {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {children}
        </div>
      </main>

      {/* Footer Section */}
      {showFooter && (
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
              <p>[INFO] Built with React and Tailwind CSS</p>
              <p className="mt-2 sm:mt-0">[COPYRIGHT] {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
vigation component

// Interface for navigation items
interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Props interface for reusable header navigation
interface HeaderNavProps {
  /** Application or brand name */
  brandName?: string;
  /** Array of navigation items */
  navItems?: NavItem[];
  /** Callback when navigation item is clicked */
  onNavClick?: (item: NavItem) => void;
  /** Show mobile menu toggle on small screens */
  showMobileMenu?: boolean;
}

/**
 * Reusable Header Navigation Component
 * A responsive navigation header with brand name and nav links
 */
const HeaderNav: React.FC<HeaderNavProps> = ({
  brandName = 'App',
  navItems = [],
  onNavClick,
  showMobileMenu = true,
}) => {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navigation item click
  const handleNavClick = (item: NavItem) => {
    if (onNavClick) {
      onNavClick(item);
    }
    // Close mobile menu after click
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
          {/* Brand/Logo Section */}
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {brandName}

          {/* Desktop Navigation Links */}
            {navItems.map((item, index) => (
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                }`}
              >
                {item.label}
            ))}

          {/* Mobile Menu Toggle Button */}
          {showMobileMenu && (
                type="button"
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {/* Menu icon using text label */}
                {isMobileMenuOpen ? (
                ) : (
                )}
          )}

        {/* Mobile Navigation Menu */}
        {showMobileMenu && isMobileMenuOpen && (
              {navItems.map((item, index) => (
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.label}
              ))}
        )}
  );
};

// table component

/**
 * Props interface for the AppLayout component
 * Allows customization of the layout wrapper
 */
interface AppLayoutProps {
  /** Content to render inside the layout */
  children: React.ReactNode;
  /** Optional title for the header */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Optional custom class name for additional styling */
  className?: string;
}

/**
 * AppLayout - A reusable main layout wrapper component
 * Provides consistent structure with header, main content area, and optional footer
 */

};

// chart component

// TypeScript interfaces for reusability
interface CryptoConfig {
  id: string;
  name: string;
  color: string;
}

interface PriceDataPoint {
  timestamp: string;
  [key: string]: string | number;
}

interface LiveCryptoChartProps {
  // Configurable crypto assets to track
  cryptos?: CryptoConfig[];
  // Auto-refresh interval in milliseconds
  refreshInterval?: number;
  // Number of historical data points to display
  maxDataPoints?: number;
  // Chart height
  height?: number;
  // Title for the chart
  title?: string;
  // Currency to display prices in
  vsCurrency?: string;
}

// Default crypto configurations
const DEFAULT_CRYPTOS: CryptoConfig[] = [
  { id: 'bitcoin', name: 'Bitcoin', color: '#F7931A' },
  { id: 'ethereum', name: 'Ethereum', color: '#627EEA' },
  { id: 'dogecoin', name: 'Dogecoin', color: '#C2A633' },
];

const LiveCryptoChart: React.FC<LiveCryptoChartProps> = ({
  cryptos = DEFAULT_CRYPTOS,
  refreshInterval = 30000, // 30 seconds default
  maxDataPoints = 20,
  height = 400,
  title = 'Live Crypto Price Tracker',
  vsCurrency = 'usd',
}) => {
  const [priceHistory, setPriceHistory] = useState<PriceDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Fetch prices from CoinGecko via gateway
  const fetchPrices = useCallback(async () => {
    try {
      const cryptoIds = cryptos.map((c) => c.id).join(',');
      const response = await fetch('https://faibric-api.onrender.com/api/gateway/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'coingecko',
          endpoint: `/simple/price?ids=${cryptoIds}&vs_currencies=${vsCurrency}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch crypto prices');
      }

      const data = await response.json();
      const now = new Date();

      // Create new data point with timestamp
      const newDataPoint: PriceDataPoint = {
        timestamp: now.toLocaleTimeString(),
      };

      // Add price for each tracked crypto
      cryptos.forEach((crypto) => {
        if (data[crypto.id] && data[crypto.id][vsCurrency]) {
          newDataPoint[crypto.id] = data[crypto.id][vsCurrency];
        }
      });

      // Update price history, maintaining max data points
      setPriceHistory((prev) => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-maxDataPoints);
      });

      setLastUpdate(now);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [cryptos, vsCurrency, maxDataPoints]);

  // Set up auto-refresh interval
  useEffect(() => {
    // Initial fetch
    fetchPrices();

    // Set up interval if not paused
    let intervalId: NodeJS.Timeout | null = null;
    if (!isPaused) {
      intervalId = setInterval(fetchPrices, refreshInterval);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchPrices, refreshInterval, isPaused]);

  // Format price for display
  const formatPrice = (value: number): string => {
    if (value >= 1000) {
      return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${value.toFixed(value < 1 ? 6 : 2)}`;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
          {payload.map((entry: any, index: number) => {
            const crypto = cryptos.find((c) => c.id === entry.dataKey);
            return (
                key={index}
                className="text-sm font-medium"
                style={{ color: entry.color }}
              >
                {crypto?.name}: {formatPrice(entry.value)}
            );
          })}
      );
    }
    return null;
  };

  return (
      {/* Header section */}
          {lastUpdate && (
              Last updated: {lastUpdate.toLocaleTimeString()}
          )}
        
        {/* Control buttons */}
            onClick={() => setIsPaused(!isPaused)}
              isPaused
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {isPaused ? '[RESUME]' : '[PAUSE]'}
            onClick={fetchPrices}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? '[LOADING...]' : '[REFRESH]'}

      {/* Legend with current prices */}
        {cryptos.map((crypto) => {
          const latestPrice = priceHistory.length > 0
            ? priceHistory[priceHistory.length - 1][crypto.id]
            : null;
          return (
              key={crypto.id}
              className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2"
            >
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: crypto.color }}
              />
              {latestPrice && (
                  {formatPrice(latestPrice as number)}
              )}
          );
        })}

      {/* Error display */}
      {error && (
      )}

      {/* Chart container */}
        {isLoading && priceHistory.length === 0 ? (
        ) : priceHistory.length === 0 ? (
        ) : (
              data={priceHistory}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                dataKey="timestamp"
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#9CA3AF' }}
              />
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#9CA3AF' }}
                tickFormatter={(value) => formatPrice(value)}
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => {
                  const crypto = cryptos.find((c) => c.id === value);
                  return <span className="text-gray-300">{crypto?.name || value}</span>;
                }}
              />
              {cryptos.map((crypto) => (
                  key={crypto.id}
                  type="monotone"
                  dataKey={crypto.id}
                  stroke={crypto.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  animationDuration={300}
                />
              ))}
        )}

      {/* Status indicator */}
          className={`w-2 h-2 rounded-full ${
            isPaused ? 'bg-yellow-500' : 'bg-green-500 animate-pulse'
          }`}
        />
          {isPaused
            ? '[PAUSED]'
            : `[LIVE] Auto-refresh every ${refreshInterval / 1000}s`}
  );
};

// stats component

/**
 * Props interface for the AppLayout component
 * Allows customization of the layout wrapper
 */
interface AppLayoutProps {
  /** Content to render inside the layout */
  children: React.ReactNode;
  /** Optional title for the header */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Optional custom class name for additional styling */
  className?: string;
}

/**
 * AppLayout - A reusable main layout wrapper component
 * Provides consistent structure with header, main content area, and optional footer
 */

};

// list component

/**
 * Props interface for the AppLayout component
 * Allows customization of the layout wrapper
 */
interface AppLayoutProps {
  /** Content to render inside the layout */
  children: React.ReactNode;
  /** Optional title for the header */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Optional custom class name for additional styling */
  className?: string;
}

/**
 * AppLayout - A reusable main layout wrapper component
 * Provides consistent structure with header, main content area, and optional footer
 */

};

// hero component

/**
 * Props interface for the AppLayout component
 * Allows customization of the layout wrapper
 */
interface AppLayoutProps {
  /** Content to render inside the layout */
  children: React.ReactNode;
  /** Optional title for the header */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Optional custom class name for additional styling */
  className?: string;
}

/**
 * AppLayout - A reusable main layout wrapper component
 * Provides consistent structure with header, main content area, and optional footer
 */

};

function _OriginalApp() {
  return (
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
