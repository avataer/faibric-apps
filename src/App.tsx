import React, { useState, useEffect } from "react";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  purchasePrice: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  crypto: CryptoData | null;
  onConfirm: (amount: number) => void;
}

interface CardProps {
  crypto: CryptoData;
  onBuyClick: (crypto: CryptoData) => void;
}

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "portfolio", label: "Portfolio", icon: "💼" },
    { id: "watchlist", label: "Watchlist", icon: "⭐" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 text-center">
        🪙 CryptoTracker
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
              activeView === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

const CryptoCard: React.FC<CardProps> = ({ crypto, onBuyClick }) => {
  const priceChangeColor =
    crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="font-bold text-lg">{crypto.name}</h3>
          <p className="text-gray-500 uppercase">{crypto.symbol}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold">${crypto.current_price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">24h Change:</span>
          <span className={`font-semibold ${priceChangeColor}`}>
            {crypto.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Market Cap:</span>
          <span className="font-semibold">${(crypto.market_cap / 1e9).toFixed(2)}B</span>
        </div>
      </div>
      <button
        onClick={() => onBuyClick(crypto)}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Buy {crypto.symbol.toUpperCase()}
      </button>
    </div>
  );
};

const BuyModal: React.FC<ModalProps> = ({ isOpen, onClose, crypto, onConfirm }) => {
  const [amount, setAmount] = useState<string>("1");

  if (!isOpen || !crypto) return null;

  const totalCost = parseFloat(amount) * crypto.current_price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Buy {crypto.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <img src={crypto.image} alt={crypto.name} className="w-16 h-16 rounded-full" />
          <div>
            <p className="text-lg font-semibold">{crypto.name}</p>
            <p className="text-gray-600">${crypto.current_price.toLocaleString()}</p>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Amount to buy:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Price per coin:</span>
            <span>${crypto.current_price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total Cost:</span>
            <span>${totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(parseFloat(amount));
              onClose();
            }}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

const PortfolioView: React.FC<{ portfolio: PortfolioItem[]; cryptoData: CryptoData[] }> = ({
  portfolio,
  cryptoData,
}) => {
  const getPortfolioValue = () => {
    return portfolio.reduce((total, item) => {
      const currentCrypto = cryptoData.find((c) => c.id === item.id);
      const currentPrice = currentCrypto?.current_price || item.purchasePrice;
      return total + item.amount * currentPrice;
    }, 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Portfolio</h2>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
        <p className="text-lg opacity-80">Total Portfolio Value</p>
        <p className="text-4xl font-bold">${getPortfolioValue().toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      </div>
      {portfolio.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-500 text-lg">No assets in portfolio yet. Start buying crypto!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Asset</th>
                <th className="text-right p-4">Amount</th>
                <th className="text-right p-4">Purchase Price</th>
                <th className="text-right p-4">Current Price</th>
                <th className="text-right p-4">Value</th>
                <th className="text-right p-4">P/L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => {
                const currentCrypto = cryptoData.find((c) => c.id === item.id);
                const currentPrice = currentCrypto?.current_price || item.purchasePrice;
                const value = item.amount * currentPrice;
                const pl = ((currentPrice - item.purchasePrice) / item.purchasePrice) * 100;
                return (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-gray-500 uppercase">({item.symbol})</span>
                      </div>
                    </td>
                    <td className="text-right p-4">{item.amount}</td>
                    <td className="text-right p-4">${item.purchasePrice.toLocaleString()}</td>
                    <td className="text-right p-4">${currentPrice.toLocaleString()}</td>
                    <td className="text-right p-4 font-semibold">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className={`text-right p-4 font-semibold ${pl >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {pl >= 0 ? "+" : ""}{pl.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://faibric-api.onrender.com/api/gateway/crypto?ids=bitcoin,ethereum,binancecoin,solana,cardano,ripple,dogecoin,polkadot&vs_currencies=usd&include_24hr_change=true&include_market_cap=true"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      
      const formattedData: CryptoData[] = Object.entries(data).map(([id, values]: [string, any]) => ({
        id,
        symbol: id.substring(0, 3),
        name: id.charAt(0).toUpperCase() + id.slice(1),
        current_price: values.usd || 0,
        price_change_percentage_24h: values.usd_24h_change || 0,
        market_cap: values.usd_market_cap || 0,
        total_volume: 0,
        image: `https://assets.coingecko.com/coins/images/${getImageId(id)}/small/${id}.png`,
      }));
      
      setCryptoData(formattedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch crypto data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getImageId = (id: string): number => {
    const imageIds: Record<string, number> = {
      bitcoin: 1,
      ethereum: 279,
      binancecoin: 825,
      solana: 4128,
      cardano: 975,
      ripple: 44,
      dogecoin: 5,
      polkadot: 12171,
    };
    return imageIds[id] || 1;
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyClick = (crypto: CryptoData) => {
    setSelectedCrypto(crypto);
    setModalOpen(true);
  };

  const handleConfirmPurchase = (amount: number) => {
    if (!selectedCrypto) return;
    
    const existingIndex = portfolio.findIndex((p) => p.id === selectedCrypto.id);
    
    if (existingIndex >= 0) {
      const updated = [...portfolio];
      updated[existingIndex].amount += amount;
      setPortfolio(updated);
    } else {
      setPortfolio([
        ...portfolio,
        {
          id: selectedCrypto.id,
          name: selectedCrypto.name,
          symbol: selectedCrypto.symbol,
          amount,
          purchasePrice: selectedCrypto.current_price,
        },
      ]);
    }
    
    alert(`Successfully purchased ${amount} ${selectedCrypto.symbol.toUpperCase()}!`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 p-8">
        {activeView === "dashboard" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Crypto Dashboard</h1>
              <button
                onClick={fetchCryptoData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
            {loading && (
              <div className="text-center py-12">
                <div className="text-2xl">Loading crypto data...</div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cryptoData.map((crypto) => (
                  <CryptoCard
                    key={crypto.id}
                    crypto={crypto}
                    onBuyClick={handleBuyClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {activeView === "portfolio" && (
          <PortfolioView portfolio={portfolio} cryptoData={cryptoData} />
        )}
        {activeView === "watchlist" && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
            <p className="text-gray-500">Coming soon! Add your favorite cryptos to watch.</p>
          </div>
        )}
        {activeView === "settings" && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-500">Settings page coming soon.</p>
          </div>
        )}
      </main>
      <BuyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        crypto={selectedCrypto}
        onConfirm={handleConfirmPurchase}
      />
    </div>
  );
};

export default App;