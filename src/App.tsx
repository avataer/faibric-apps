import React, { useState, useEffect } from "react";

// Interfaces
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface NavItem {
  id: string;
  label: string;
}

// Product data for Urban Threads
const products: Product[] = [
  { id: "1", name: "Cashmere Blend Sweater", price: 189, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400", category: "Tops" },
  { id: "2", name: "Tailored Wool Blazer", price: 299, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", category: "Outerwear" },
  { id: "3", name: "High-Rise Linen Trousers", price: 149, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", category: "Bottoms" },
  { id: "4", name: "Silk Button-Down Shirt", price: 175, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", category: "Tops" },
  { id: "5", name: "Merino Wool Cardigan", price: 165, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400", category: "Tops" },
  { id: "6", name: "Structured Midi Skirt", price: 129, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=400", category: "Bottoms" },
  { id: "7", name: "Premium Denim Jacket", price: 225, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", category: "Outerwear" },
  { id: "8", name: "Organic Cotton Tee", price: 65, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", category: "Tops" },
];

// DataPlaceholder component
const DataPlaceholder = ({ symbol = "$", onActivate }: { symbol?: string; onActivate?: () => void }) => (
  <span className="inline-flex items-center gap-1">
    <span className="text-gray-400 font-mono animate-pulse">{symbol}---</span>
    {onActivate && (
      <button onClick={onActivate} className="text-xs text-amber-700 hover:text-amber-900 underline">
        Turn On Real Values
      </button>
    )}
  </span>
);

// Navigation Component
const Navigation = ({ currentView, onNavigate, cartItemCount }: { currentView: string; onNavigate: (id: string) => void; cartItemCount: number }) => {
  const navItems: NavItem[] = [
    { id: "shop", label: "Shop" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream-50 border-b border-amber-200" style={{ backgroundColor: "#FDF8F3" }}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-serif font-bold" style={{ color: "#722F37" }}>Urban Threads</h1>
          <nav className="hidden md:flex gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id ? "text-amber-900 border-b-2 border-amber-900" : "text-gray-600 hover:text-amber-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("cart")} className="relative p-2 text-gray-700 hover:text-amber-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <section className="relative overflow-hidden" style={{ backgroundColor: "#722F37" }}>
    <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
      <div className="max-w-2xl">
        <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
          Winter Sale - Up to 40% Off
        </span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
          Elevate Your Winter Wardrobe
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Discover our curated collection of premium essentials designed for the modern individual. 
          Quality craftsmanship meets timeless style.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCtaClick}
            className="px-8 py-3 bg-white text-amber-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Shop Collection
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
    <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/100 to-transparent z-10" style={{ backgroundColor: "transparent", backgroundImage: "linear-gradient(to right, #722F37, transparent)" }}></div>
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
        alt="Fashion"
        className="w-full h-full object-cover"
      />
    </div>
  </section>
);

// Product Card Component
const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
      <button
        onClick={() => onAddToCart(product)}
        className="absolute bottom-4 left-4 right-4 py-3 bg-white/95 text-amber-900 font-medium rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all hover:bg-amber-900 hover:text-white"
      >
        Add to Cart
      </button>
    </div>
    <div className="p-4">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
      <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
      <p className="text-amber-900 font-semibold mt-2">${product.price}</p>
    </div>
  </div>
);

// Cart Sidebar Component
const CartSidebar = ({ cart, onUpdateQuantity, onRemove, isOpen, onClose }: { 
  cart: CartItem[]; 
  onUpdateQuantity: (id: string, qty: number) => void; 
  onRemove: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: "#FDF8F3" }}>
          <h2 className="text-xl font-serif font-bold" style={{ color: "#722F37" }}>Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                    <p className="text-amber-900 font-semibold text-sm">${item.product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-4" style={{ backgroundColor: "#FDF8F3" }}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-xl font-bold" style={{ color: "#722F37" }}>${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full py-3 text-white font-medium rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: "#722F37" }}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ onNewsletterSubmit }: { onNewsletterSubmit: (email: string) => void }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onNewsletterSubmit(email);
      setEmail("");
    }
  };

  return (
    <footer style={{ backgroundColor: "#722F37" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">Urban Threads</h3>
            <p className="text-white/80 mb-6 max-w-md">
              Curating timeless pieces for the modern wardrobe. Quality craftsmanship, sustainable practices, 
              and designs that transcend seasons.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-amber-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60 text-sm">
          <p>2024 Urban Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Settings View Component
const SettingsView = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h2 className="text-3xl font-serif font-bold mb-2" style={{ color: "#722F37" }}>Settings</h2>
    <p className="text-gray-600 mb-8">Manage your store connections and preferences</p>
    
    <div className="space-y-6">
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Payment Gateway</h3>
            <p className="text-sm text-gray-500">Stripe integration for secure payments</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Connected</span>
        </div>
      </div>
      
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Inventory Sync</h3>
            <p className="text-sm text-gray-500">Real-time stock management</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Active</span>
        </div>
      </div>
      
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Custom API Integration</h3>
            <p className="text-sm text-gray-500">Connect your own data sources</p>
          </div>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="API Endpoint URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="password"
            placeholder="API Key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button className="px-6 py-2 text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: "#722F37" }}>
            Connect
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-4">Currency Display</h3>
        <div className="flex gap-4">
          {["USD", "EUR", "GBP"].map(currency => (
            <button
              key={currency}
              className={`px-4 py-2 border rounded-lg ${currency === "USD" ? "border-amber-900 bg-amber-50 text-amber-900" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
const _OriginalApp = () => {
  const [currentView, setCurrentView] = useState<string>("shop");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
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
        const cryptoData = await fetchFromGateway("coingecko", "/simple/price?ids=bitcoin,ethereum&vs_currencies=usd").catch(() => null);
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

  const handleNavigate = (viewId: string) => {
    if (viewId === "cart") {
      setCartOpen(true);
    } else {
      setCurrentView(viewId);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleNewsletterSubmit = (email: string) => {
    console.log("Newsletter subscription:", email);
    alert(`Thank you for subscribing with ${email}!`);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF8F3" }}>
      <Navigation currentView={currentView} onNavigate={handleNavigate} cartItemCount={cartItemCount} />
      
      <CartSidebar
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      
      {cartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      <main>
        {currentView === "shop" && (
          <div>
            <Hero onCtaClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} />
            
            <section id="products" className="max-w-7xl mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "#722F37" }}>
                  Our Collection
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Each piece is thoughtfully designed and crafted from premium materials for lasting quality and style.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </section>

            <section className="py-16" style={{ backgroundColor: "#722F37" }}>
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                  Free Shipping on Orders Over $150
                </h3>
                <p className="text-white/80 mb-6">
                  Plus, enjoy complimentary gift wrapping on all orders this season.
                </p>
                <button className="px-8 py-3 bg-white text-amber-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </section>

            <Footer onNewsletterSubmit={handleNewsletterSubmit} />
          </div>
        )}

        {currentView === "settings" && (
          <div>
            <SettingsView />
            <Footer onNewsletterSubmit={handleNewsletterSubmit} />
          </div>
        )}
      </main>
    </div>
  );
};

</div>



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
