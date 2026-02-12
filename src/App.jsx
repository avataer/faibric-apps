import React from 'react';

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "menu", "label": "Our Menu"}, {"id": "about", "label": "Our Story"}, {"id": "brunch", "label": "Brunch"}, {"id": "visit", "label": "Visit Us"}];

  return (
    <nav className="bg-amber-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold text-amber-50">Bean & Brew</span>
            <span className="text-xs text-amber-200 -mt-1 tracking-wide">Fresh Brews, Warm Hearts</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-amber-200"
                    : "text-amber-100 hover:text-amber-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-amber-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`block w-full text-left py-2 px-4 ${
                  currentView === item.id ? "text-amber-200 bg-amber-800" : "text-amber-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = ({ onNavigate }) => {
  const cards = [{"title": "Specialty Espresso", "description": "Single-origin beans roasted in small batches and pulled to perfection by our skilled baristas. From velvety lattes to bold ristrettos, every sip is an experience.", "cta": "Explore Our Coffees", "icon": "☕"}, {"title": "Artisan Pastries", "description": "Baked fresh each morning using locally sourced ingredients. Enjoy buttery croissants, almond tarts, and seasonal creations that pair beautifully with your favorite brew.", "cta": "See the Pastry Case", "icon": "🥐"}, {"title": "Light Brunch", "description": "Savor wholesome brunch plates designed to complement your coffee ritual. From avocado toast to eggs Benedict, our kitchen serves comfort with every plate.", "cta": "View Brunch Menu", "icon": "🍳"}, {"title": "A Warm Welcome", "description": "Settle into our inviting atmosphere with exposed wood, soft lighting, and the rich aroma of freshly ground coffee. Bean & Brew is your home away from home.", "cta": "Plan Your Visit", "icon": "🏠"}];
  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-4">
            Where Every Cup Tells a Story
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-amber-700 italic mb-6">
            Fresh Brews, Warm Hearts
          </p>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto">
            Handcrafted espresso, freshly baked pastries, and a warm brunch experience crafted with care in our cozy corner of the neighborhood.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(cards || []).map((card, index) => (
            <div
              key={index}
              className="bg-amber-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-200 group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">{card.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">{card.title}</h3>
              <p className="text-stone-700 mb-6">{card.description}</p>
              <button
                onClick={() => onNavigate && onNavigate("visit")}
                className="text-amber-700 font-semibold hover:text-amber-800 inline-flex items-center"
              >
                {card.cta || "Learn more"} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="bg-amber-950 text-amber-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Bean & Brew</h3>
          <p className="text-amber-300 mb-6">Handcrafted coffee, baked-fresh pastries, and a place to slow down and savor the moment.</p>
          <div className="border-t border-amber-800 pt-6">
            <p className="text-amber-400 text-sm">
              2024 Bean & Brew. All rights reserved.
            </p>
            <p className="text-amber-600 text-xs mt-2">Built with Faibric</p>
          </div>
        </div>
      </div>
    </footer>
  );
};


// Main App Component
function _OriginalApp() {
  const [currentView, setCurrentView] = React.useState("hero");

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />

      <main>
        
        {currentView === "hero" && <HeroSection onNavigate={handleNavigate} />}
      </main>

      <FooterSection />
    </div>
  );
}



// FAIBRIC ADMIN PANEL WRAPPER with BUILDER
const FAIBRIC_SESSION_TOKEN = "Jij7t4nxQWVEiyCVYeJbt08hPbp5eAIWAnio-iLAO-Q";
const FAIBRIC_API_URL = "https://faibric-api.onrender.com";
const FAIBRIC_SITE_URL = "https://app-229-a-cozy-artisan-coffe.onrender.com";

function FaibricBuilder() {
  const [messages, setMessages] = React.useState([
    { role: "system", content: "Welcome! Describe what changes you want to make to your website." }
  ]);
  const [input, setInput] = React.useState("");
  const [isBuilding, setIsBuilding] = React.useState(false);
  const [buildProgress, setBuildProgress] = React.useState(0);
  const [previewUrl, setPreviewUrl] = React.useState(window.location.origin);
  const [iframeKey, setIframeKey] = React.useState(0);
  const messagesEndRef = React.useRef(null);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Poll for build status
  React.useEffect(() => {
    if (!isBuilding || !FAIBRIC_SESSION_TOKEN) return;

    const poll = setInterval(async () => {
      try {
        const res = await fetch(FAIBRIC_API_URL + "/api/onboarding/status/" + FAIBRIC_SESSION_TOKEN + "/");
        const data = await res.json();

        if (data.build_progress) setBuildProgress(data.build_progress);

        // Check for new events
        if (data.events && data.events.length > 0) {
          const latestEvent = data.events[0];
          if (latestEvent.event_data?.message) {
            setMessages(prev => {
              const lastMsg = prev[prev.length - 1];
              if (lastMsg?.content !== latestEvent.event_data.message) {
                return [...prev, { role: "system", content: latestEvent.event_data.message }];
              }
              return prev;
            });
          }
        }

        if (data.status === "deployed") {
          setIsBuilding(false);
          setBuildProgress(100);
          if (data.deployment_url) {
            setPreviewUrl(data.deployment_url);
            setIframeKey(k => k + 1);
          }
          setMessages(prev => [...prev, { role: "system", content: "Changes deployed! Refreshing preview..." }]);
          clearInterval(poll);
        }
      } catch (e) {
        console.error("Poll error:", e);
      }
    }, 2000);

    return () => clearInterval(poll);
  }, [isBuilding]);

  const handleSend = async () => {
    if (!input.trim() || isBuilding) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsBuilding(true);
    setBuildProgress(10);

    if (!FAIBRIC_SESSION_TOKEN) {
      setMessages(prev => [...prev, { role: "system", content: "Builder not configured. Please contact support." }]);
      setIsBuilding(false);
      return;
    }

    try {
      const res = await fetch(FAIBRIC_API_URL + "/api/onboarding/modify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_token: FAIBRIC_SESSION_TOKEN,
          request: userMessage
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: data.mode === "modify"
            ? "Got it! Applying your changes..."
            : "Starting fresh build with your new request..."
        }]);
      } else {
        setMessages(prev => [...prev, { role: "system", content: "Error: " + (data.error || "Failed to submit") }]);
        setIsBuilding(false);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "system", content: "Connection error. Please try again." }]);
      setIsBuilding(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* LEFT: Chat Panel */}
      <div className="w-2/5 min-w-[350px] flex flex-col border-r border-gray-200 bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Faibric Builder</h3>
          {isBuilding && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Building... {buildProgress}%
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : msg.role === "assistant"
                    ? "bg-gray-100 text-gray-800 border border-gray-200"
                    : "bg-gray-50 text-gray-600 italic text-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isBuilding && handleSend()}
              placeholder={isBuilding ? "Building in progress..." : "Describe changes you want..."}
              disabled={isBuilding}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isBuilding}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Preview Panel */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Preview Header */}
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <h3 className="font-semibold">Live Preview</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIframeKey(k => k + 1)}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              Refresh
            </button>
            <button
              onClick={() => window.open(previewUrl, "_blank")}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              Open in Tab
            </button>
          </div>
        </div>

        {/* Preview iframe */}
        <div className="flex-1 p-4">
          <iframe
            key={iframeKey}
            src={previewUrl}
            className="w-full h-full border border-gray-200 rounded-lg bg-white"
            title="Website Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <span className="font-bold">Faibric Admin</span>
          {["overview", "builder", "settings"].map(v => (
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

      {adminView === "builder" ? (
        <FaibricBuilder />
      ) : (
        <main className="p-6 max-w-4xl mx-auto flex-1">
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
              <div className="mt-6 bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <button
                  onClick={() => setAdminView("builder")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Open Builder
                </button>
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
      )}
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
