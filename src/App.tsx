import React, { useState, useEffect } from "react";

// Interfaces
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  sparkline: number[];
}

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface SidebarProps {
  items: NavItem[];
  onItemClick: (id: string) => void;
  activeItem: string;
}

interface StatsCardsProps {
  cards: StatsCardProps[];
}

interface CryptoTableProps {
  data: CryptoData[];
  columns: TableColumn[];
  onSort: (key: string) => void;
  sortKey: string;
  sortDirection: "asc" | "desc";
}

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

// Sample Data
const sampleCryptoData: CryptoData[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 67432.51, change24h: 2.34, volume24h: 28500000000, marketCap: 1320000000000, sparkline: [65000, 66200, 65800, 67000, 67500, 67200, 67432] },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 3521.87, change24h: -1.23, volume24h: 15200000000, marketCap: 423000000000, sparkline: [3600, 3550, 3480, 3520, 3500, 3510, 3521] },
  { id: "bnb", name: "BNB", symbol: "BNB", price: 584.32, change24h: 0.87, volume24h: 1800000000, marketCap: 87000000000, sparkline: [575, 580, 578, 582, 585, 583, 584] },
  { id: "sol", name: "Solana", symbol: "SOL", price: 172.45, change24h: 5.67, volume24h: 3200000000, marketCap: 76000000000, sparkline: [160, 165, 168, 170, 175, 173, 172] },
  { id: "xrp", name: "XRP", symbol: "XRP", price: 0.5234, change24h: -0.45, volume24h: 1100000000, marketCap: 28000000000, sparkline: [0.52, 0.525, 0.52, 0.523, 0.524, 0.522, 0.523] },
  { id: "ada", name: "Cardano", symbol: "ADA", price: 0.4521, change24h: 1.23, volume24h: 450000000, marketCap: 16000000000, sparkline: [0.44, 0.445, 0.448, 0.45, 0.452, 0.451, 0.452] },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.1234, change24h: 3.45, volume24h: 890000000, marketCap: 17500000000, sparkline: [0.118, 0.12, 0.122, 0.123, 0.124, 0.123, 0.123] },
  { id: "dot", name: "Polkadot", symbol: "DOT", price: 7.23, change24h: -2.11, volume24h: 320000000, marketCap: 10200000000, sparkline: [7.5, 7.4, 7.35, 7.28, 7.25, 7.22, 7.23] },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
  { id: "markets", label: "Markets", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
  { id: "portfolio", label: "Portfolio", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
  { id: "settings", label: "Settings", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

const tableColumns: TableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "change24h", label: "24h Change", sortable: true },
  { key: "volume24h", label: "24h Volume", sortable: true },
  { key: "marketCap", label: "Market Cap", sortable: true },
  { key: "sparkline", label: "Last 7 Days", sortable: false },
];

// Utility Functions
function formatCurrency(value: number): string {
  if (value >= 1e12) return "$" + (value / 1e12).toFixed(2) + "T";
  if (value >= 1e9) return "$" + (value / 1e9).toFixed(2) + "B";
  if (value >= 1e6) return "$" + (value / 1e6).toFixed(2) + "M";
  if (value >= 1) return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return "$" + value.toFixed(4);
}

function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return sign + value.toFixed(2) + "%";
}

// Components
function Sidebar({ items, onItemClick, activeItem }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-white text-xl font-bold">CryptoTrack</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
          <div>
            <p className="text-white text-sm font-medium">John Doe</p>
            <p className="text-gray-500 text-xs">Premium User</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatsCards({ cards }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-blue-400">
              {card.icon}
            </div>
            {card.change !== undefined && (
              <span className={`text-sm font-medium px-2 py-1 rounded-lg ${card.change >= 0 ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"}`}>
                {formatPercentage(card.change)}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-1">{card.title}</p>
          <p className="text-white text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`).join(" ");
  
  return (
    <svg className="w-24 h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={positive ? "#10B981" : "#EF4444"}
        strokeWidth="3"
        points={points}
      />
    </svg>
  );
}

function CryptoTable({ data, columns, onSort, sortKey, sortDirection }: CryptoTableProps) {
  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">#</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-left text-gray-400 text-sm font-medium ${col.sortable ? "cursor-pointer hover:text-white" : ""}`}
                  onClick={() => col.sortable && onSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <svg className={`w-4 h-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((crypto, index) => (
              <tr key={crypto.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{crypto.name}</p>
                      <p className="text-gray-500 text-sm">{crypto.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white font-medium">{formatCurrency(crypto.price)}</td>
                <td className={`px-6 py-4 font-medium ${crypto.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {formatPercentage(crypto.change24h)}
                </td>
                <td className="px-6 py-4 text-gray-300">{formatCurrency(crypto.volume24h)}</td>
                <td className="px-6 py-4 text-gray-300">{formatCurrency(crypto.marketCap)}</td>
                <td className="px-6 py-4">
                  <MiniSparkline data={crypto.sparkline} positive={crypto.change24h >= 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Layout({ children, sidebar }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      {sidebar}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(sampleCryptoData);
  const [sortKey, setSortKey] = useState("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prev) =>
        prev.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.1,
        }))
      );
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const sortedData = [...cryptoData].sort((a, b) => {
    const aValue = a[sortKey as keyof CryptoData];
    const bValue = b[sortKey as keyof CryptoData];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const totalMarketCap = cryptoData.reduce((sum, c) => sum + c.marketCap, 0);
  const totalVolume = cryptoData.reduce((sum, c) => sum + c.volume24h, 0);
  const avgChange = cryptoData.reduce((sum, c) => sum + c.change24h, 0) / cryptoData.length;

  const statsCards: StatsCardProps[] = [
    { title: "Total Market Cap", value: formatCurrency(totalMarketCap), change: 2.34, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { title: "24h Volume", value: formatCurrency(totalVolume), change: -1.12, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { title: "Average Change", value: formatPercentage(avgChange), change: avgChange, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
    { title: "Active Coins", value: cryptoData.length.toString(), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  ];

  return (
    <Layout sidebar={<Sidebar items={navItems} onItemClick={setActiveNav} activeItem={activeNav} />}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Crypto Dashboard</h1>
            <p className="text-gray-400">Real-time cryptocurrency price tracker</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
      <StatsCards cards={statsCards} />
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-4">Top Cryptocurrencies</h2>
      </div>
      <CryptoTable
        data={sortedData}
        columns={tableColumns}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />
    </Layout>
  );
}

export default App;