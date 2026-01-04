import React, { useState, useEffect } from "react";

// Interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface NavItem {
  id: string;
  label: string;
}

// Product Data (Static catalog - this is not API data, it is product catalog)
const productCatalog: Product[] = [
  { id: 1, name: "Cashmere Blend Sweater", price: 189, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400", category: "Knitwear" },
  { id: 2, name: "Tailored Wool Coat", price: 349, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400", category: "Outerwear" },
  { id: 3, name: "Silk Midi Dress", price: 275, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", category: "Dresses" },
  { id: 4, name: "Premium Denim Jeans", price: 145, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400", category: "Bottoms" },
  { id: 5, name: "Leather Crossbody Bag", price: 225, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", category: "Accessories" },
  { id: 6, name: "Merino Wool Scarf", price: 89, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400", category: "Accessories" },
  { id: 7, name: "Classic White Blouse", price: 125, image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400", category: "Tops" },
  { id: 8, name: "Pleated Midi Skirt", price: 165, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj?w=400", category: "Bottoms" },
];

// DataPlaceholder Component
const DataPlaceholder = ({ symbol = "$", onActivate }: { symbol?: string; onActivate?: () => void }) => (
  <span className="inline-flex items-center gap-2 text-gray-400">
    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded animate-pulse">
      {symbol}---
    </span>
    {onActivate && (
      <button onClick={onActivate} className="text-xs text-burgundy-600 hover:text-burgundy-800 underline">
        Turn On Real Values
      </button>
    )}
  </span>
);

// Navigation Component
const Navigation = ({ currentView, onNavigate, cartItemCount }: { currentView: string; onNavigate: (id: string) => void; cartItemCount: number }) => {
  const navItems: NavItem[] = [
    { id: "shop", label: "Shop" },
    { id: "new", label: "New Arrivals" },
    { id: "sale", label: "Sale" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream-50 border-b border-burgundy-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-serif font-bold text-burgundy-800">Urban Threads</h1>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-burgundy-700 border-b-2 border-burgundy-700"
                    : "text-gray-600 hover:text-burgundy-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-burgundy-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="relative">
            <svg className="w-6 h-6 text-burgundy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-burgundy-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = ({ onCtaClick }: { onCtaClick: () => void }) => (
        Winter Collection 2024
        onClick={onCtaClick}
        className="bg-cream-50 text-burgundy-800 px-8 py-3 rounded-full font-semibold hover:bg-white transition-colors shadow-lg"
      >
        Shop the Sale
);

// Product Card
const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => (
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400";
        }}
      />
        {product.category}
          onClick={() => onAddToCart(product)}
          className="bg-burgundy-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-burgundy-800 transition-colors"
        >
          Add to Cart
);

// Cart Sidebar
const CartSidebar = ({ items, onUpdateQuantity, onRemove }: { items: CartItem[]; onUpdateQuantity: (id: number, qty: number) => void; onRemove: (id: number) => void }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
        Your Cart ({items.length})
      {items.length === 0 ? (
      ) : (
            {items.map((item) => (
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                    >
                      -
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                    >
                      +
                      Remove
            ))}
              Checkout
      )}
  );
};

// Newsletter Footer
const Footer = ({ onSubmit }: { onSubmit: (email: string) => void }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
      setEmail("");
    }
  };

  return (
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-burgundy-800 border border-burgundy-700 text-white placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-cream-400"
              />
                type="submit"
                className="bg-cream-50 text-burgundy-800 px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors"
              >
                Subscribe
  );
};

// Settings View
const SettingsView = () => (
          Auto-connected
          Auto-connected
          Connect
);

// Main App Component
const _OriginalApp: React.FC =  () => {
  const [currentView, setCurrentView] = useState<string>("shop");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [apiData, setApiData] = useState<Record<string, any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Gateway fetch function
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

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const cryptoData = await fetchFromGateway("coingecko", "/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,eur").catch(() => null);
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

  // Cart handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleCtaClick = () => {
    setCurrentView("shop");
  };

  const handleNewsletterSubmit = (email: string) => {
    console.log("Newsletter signup:", email);
    alert(`Thank you for subscribing with ${email}!`);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
        .bg-burgundy-600 { background-color: #8B2942; }
        .bg-burgundy-700 { background-color: #722639; }
        .bg-burgundy-800 { background-color: #5C1F30; }
        .bg-burgundy-900 { background-color: #461827; }
        .text-burgundy-600 { color: #8B2942; }
        .text-burgundy-700 { color: #722639; }
        .text-burgundy-800 { color: #5C1F30; }
        .border-burgundy-100 { border-color: #F5E6EA; }
        .border-burgundy-200 { border-color: #EBD0D7; }
        .border-burgundy-700 { border-color: #722639; }
        .bg-cream-50 { background-color: #FDF8F4; }
        .bg-cream-100 { background-color: #F9F0E8; }
        .text-cream-50 { color: #FDF8F4; }
        .text-cream-100 { color: #F9F0E8; }
        .text-cream-200 { color: #EDE3DA; }
        .text-cream-300 { color: #DDD1C6; }
        .ring-burgundy-400 { --tw-ring-color: #A64D66; }
        .ring-cream-400 { --tw-ring-color: #C9B8A8; }
        .from-burgundy-800 { --tw-gradient-from: #5C1F30; }
        .to-burgundy-600 { --tw-gradient-to: #8B2942; }
        .hover\\:bg-burgundy-800:hover { background-color: #5C1F30; }
        .focus\\:ring-burgundy-400:focus { --tw-ring-color: #A64D66; }
      `}</style>


      {currentView === "settings" ? (
      ) : (

                    {loading ? (
                    ) : apiData.crypto?.bitcoin ? (
                    ) : (
                    )}
                  {productCatalog.map((product) => (
                  ))}

      )}
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
