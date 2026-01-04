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

// Products data for Urban Threads
const products: Product[] = [
  { id: "1", name: "Cashmere Blend Sweater", price: 189, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop", category: "Sweaters" },
  { id: "2", name: "Tailored Wool Coat", price: 349, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop", category: "Outerwear" },
  { id: "3", name: "Silk Midi Dress", price: 229, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop", category: "Dresses" },
  { id: "4", name: "Premium Denim Jeans", price: 159, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop", category: "Bottoms" },
  { id: "5", name: "Linen Button-Up Shirt", price: 119, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop", category: "Tops" },
  { id: "6", name: "Merino Wool Cardigan", price: 175, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop", category: "Sweaters" },
  { id: "7", name: "Velvet Evening Blazer", price: 279, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop", category: "Outerwear" },
  { id: "8", name: "Cotton Pleated Trousers", price: 139, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop", category: "Bottoms" },
];

const navItems: NavItem[] = [
  { id: "shop", label: "Shop" },
  { id: "new", label: "New Arrivals" },
  { id: "sale", label: "Sale" },
  { id: "settings", label: "Settings" },
];

// Components
const Header = ({ 
  currentView, 
  onNavigate, 
  cartCount 
}: { 
  currentView: string; 
  onNavigate: (view: string) => void; 
  cartCount: number;
}) => (
  <header className="bg-cream-50 border-b border-burgundy-100 sticky top-0 z-40" style={{ backgroundColor: "#FDF8F4" }}>
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 
          className="text-2xl font-serif font-bold cursor-pointer" 
          style={{ color: "#722F37" }}
          onClick={() => onNavigate("shop")}
        >
          URBAN THREADS
        </h1>
        <nav className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentView === item.id 
                  ? "text-burgundy-700 border-b-2" 
                  : "text-gray-600 hover:text-burgundy-600"
              }`}
              style={{ 
                color: currentView === item.id ? "#722F37" : "#4B5563",
                borderColor: currentView === item.id ? "#722F37" : "transparent"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button className="relative p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                style={{ backgroundColor: "#722F37" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = ({ onShopNow }: { onShopNow: () => void }) => (
  <section 
    className="relative h-96 flex items-center justify-center text-center"
    style={{ 
      background: "linear-gradient(135deg, #722F37 0%, #8B4049 50%, #A65259 100%)"
    }}
  >
    <div className="absolute inset-0 bg-black opacity-20"></div>
    <div className="relative z-10 px-4">
      <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-white bg-white bg-opacity-20 rounded-full">
        Winter Collection 2024
      </span>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
        Up to 40% Off
      </h2>
      <p className="text-lg text-cream-100 mb-8 max-w-md mx-auto" style={{ color: "#FDF8F4" }}>
        Discover timeless elegance with our premium winter essentials
      </p>
      <button
        onClick={onShopNow}
        className="px-8 py-3 text-burgundy-700 font-semibold rounded-none transition-all hover:bg-opacity-90"
        style={{ backgroundColor: "#FDF8F4", color: "#722F37" }}
      >
        Shop the Sale
      </button>
    </div>
  </section>
);

const ProductCard = ({ 
  product, 
  onAddToCart 
}: { 
  product: Product; 
  onAddToCart: (product: Product) => void;
}) => (
  <div className="group">
    <div className="relative overflow-hidden mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <button
        onClick={() => onAddToCart(product)}
        className="absolute bottom-4 left-4 right-4 py-3 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
        style={{ backgroundColor: "#722F37" }}
      >
        Add to Cart
      </button>
    </div>
    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
    <h3 className="text-sm font-medium text-gray-900 mb-2">{product.name}</h3>
    <p className="text-sm font-semibold" style={{ color: "#722F37" }}>${product.price}</p>
  </div>
);

const CartSidebar = ({ 
  cart, 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemove 
}: { 
  cart: CartItem[]; 
  isOpen: boolean; 
  onClose: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  return (
    <div 
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart ({cart.length})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">${item.product.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 border rounded text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 border rounded text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t p-6">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full py-3 text-white font-medium transition-colors"
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

const Footer = ({ onSubscribe }: { onSubscribe: (email: string) => void }) => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      setEmail("");
    }
  };
  
  return (
    <footer style={{ backgroundColor: "#722F37" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">URBAN THREADS</h3>
            <p className="text-cream-100 mb-6 max-w-md" style={{ color: "#E8D5CC" }}>
              Elevate your wardrobe with timeless pieces crafted for the modern individual.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-gray-900 rounded-l-none focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 font-medium transition-colors"
                style={{ backgroundColor: "#4A1E24", color: "#FDF8F4" }}
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm" style={{ color: "#E8D5CC" }}>
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white">Sale</a></li>
              <li><a href="#" className="hover:text-white">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm" style={{ color: "#E8D5CC" }}>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Size Guide</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white border-opacity-20 mt-12 pt-8 text-center text-sm" style={{ color: "#E8D5CC" }}>
          <p>© 2024 Urban Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SettingsView = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h2 className="text-2xl font-bold mb-4" style={{ color: "#722F37" }}>Connect Your Data</h2>
    <p className="text-gray-600 mb-6">To see real values, connect your data sources:</p>
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold">Inventory Management</h3>
        <p className="text-sm text-gray-500">Connect to track stock levels</p>
        <span className="text-green-500 text-sm">Coming Soon</span>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold">Analytics Dashboard</h3>
        <p className="text-sm text-gray-500">View sales and traffic data</p>
        <span className="text-green-500 text-sm">Coming Soon</span>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold">Custom API</h3>
        <p className="text-sm text-gray-500">Add your own API endpoint</p>
        <input type="text" placeholder="API Key" className="mt-2 w-full p-2 border rounded" />
        <button 
          className="mt-2 px-4 py-2 text-white rounded"
          style={{ backgroundColor: "#722F37" }}
        >
          Connect
        </button>
      </div>
    </div>
  </div>
);

// Main App Component
const _OriginalApp = () => {
  const [currentView, setCurrentView] = useState<string>("shop");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  // API Data State (for future integrations)
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
        
        const [cryptoData] = await Promise.all([
          fetchFromGateway("coingecko", "/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")
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

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleSubscribe = (email: string) => {
    console.log("Newsletter subscription:", email);
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF8F4" }}>
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        cartCount={cartItemCount}
      />
      
      {subscribed && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
          Thank you for subscribing!
        </div>
</div>

      )}
      
      <CartSidebar
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
      
      {cartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
      
      <main>
        {currentView === "settings" ? (
          <SettingsView />
        ) : (
          <>
            <HeroSection onShopNow={() => handleNavigate("shop")} />
            
            <section className="max-w-7xl mx-auto px-4 py-16">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-2xl font-serif font-bold" style={{ color: "#722F37" }}>
                    {currentView === "new" ? "New Arrivals" : currentView === "sale" ? "Sale Items" : "Featured Collection"}
                  </h2>
                  <p className="text-gray-600 mt-2">Curated pieces for the modern wardrobe</p>
                </div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 text-sm border rounded hover:bg-gray-50">
                    Filter
                  </button>
                  <select className="px-4 py-2 text-sm border rounded bg-white">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
            
            <section className="py-16" style={{ backgroundColor: "#F5EDE7" }}>
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "#722F37" }}>
                  The Urban Threads Promise
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: "#722F37" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Premium Quality</h3>
                    <p className="text-gray-600 text-sm">Ethically sourced materials and expert craftsmanship</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: "#722F37" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Free Shipping</h3>
                    <p className="text-gray-600 text-sm">Complimentary shipping on orders over $150</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: "#722F37" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Easy Returns</h3>
                    <p className="text-gray-600 text-sm">30-day hassle-free return policy</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer onSubscribe={handleSubscribe} />
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
