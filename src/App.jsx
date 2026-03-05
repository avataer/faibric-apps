import React, { useState } from 'react';

// LIBRARY COMPONENTS - Golden Templates (pre-validated, do not transform)

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "home", "label": "Home"}, {"id": "classes", "label": "Classes"}, {"id": "instructors", "label": "Instructors"}, {"id": "pricing", "label": "Pricing"}, {"id": "about", "label": "About"}, {"id": "contact", "label": "Contact"}];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-gray-900">Zen Flow Studio</span>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2"
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
                  currentView === item.id ? "text-indigo-600 bg-indigo-50" : "text-gray-600"
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
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/peaceful yoga studio surrounded by green plants and natural light/1920/1080')",
          animation: "slowZoom 20s ease-in-out infinite alternate"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20">
          ✨ Welcome
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your Balance. Breathe Into Stillness.
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
          Zen Flow Studio offers a sanctuary for mind, body, and spirit. Join our community of practitioners in a tranquil, nature-inspired space designed to nurture your yoga journey at every level.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate && onNavigate("contact")}
            className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Explore Our Classes
          </button>
          <button
            onClick={() => onNavigate && onNavigate("about")}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/30"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [{"title": "Nature-Inspired Studio Space", "description": "Our studio is bathed in natural light and surrounded by living greenery, creating an atmosphere of calm that helps you disconnect from the noise of everyday life and reconnect with yourself.", "icon_letter": "N"}, {"title": "Expert-Led Instruction", "description": "Our certified instructors bring years of dedicated training and a genuine passion for teaching. Every class is thoughtfully designed to meet you where you are, whether you are a complete beginner or an advanced practitioner.", "icon_letter": "E"}, {"title": "Diverse Class Offerings", "description": "From gentle restorative sessions and meditative yin classes to dynamic vinyasa flows and power yoga, our weekly schedule offers a wide variety of styles to suit your mood, goals, and energy level.", "icon_letter": "D"}, {"title": "Welcoming Community", "description": "Zen Flow Studio is more than a place to practice. It is a supportive community built on kindness, inclusivity, and shared growth. Join us for workshops, retreats, and gatherings that nourish connection.", "icon_letter": "W"}];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Practice With Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">At Zen Flow Studio, every detail is crafted to support your well-being and deepen your practice.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(features || []).map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">{feature.icon_letter || (index + 1)}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const paragraphs = ["Zen Flow Studio was founded with a simple belief: that the practice of yoga should feel like coming home. Nestled in a serene corner of the city, our studio was designed to bring the calming energy of nature indoors, offering a peaceful retreat from the demands of modern life.", "Our founders, lifelong yoga practitioners and certified instructors, envisioned a space where people of all backgrounds and experience levels could explore the transformative power of yoga. From the bamboo flooring beneath your feet to the lush greenery that lines our walls, every element of our studio has been chosen with intention and care.", "Today, Zen Flow Studio is home to a thriving community of practitioners who come together to move, breathe, and grow. We offer over thirty classes each week, led by a team of compassionate and highly trained instructors. Whether you are stepping onto the mat for the first time or refining a decades-long practice, you belong here.", "We invite you to visit, take a deep breath, and experience the difference that a mindful, nature-centered practice space can make."];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              {(paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur-xl"></div>
            <img
              src="https://picsum.photos/seed/tranquil yoga studio interior with green plants and soft natural lighting/800/600"
              alt="About us"
              className="relative rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setSending(false);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600">Have a question about our classes, pricing, or studio? We would love to hear from you. Reach out and a member of our team will respond within 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you for your message. We will get back to you soon.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  (415) 555-0192
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  hello@zenflowstudio.com
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  742 Willow Creek Lane, Suite 100, San Francisco, CA 94110
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Zen Flow Studio</h3>
          <p className="text-gray-400 mb-6">Breathe. Flow. Transform.</p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              2024 Zen Flow Studio. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">Built with Faibric</p>
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
    <div className="min-h-screen bg-white">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />

      <main>
        
        {currentView === "hero" && <HeroSection onNavigate={handleNavigate} />}
        {currentView === "features" && <FeaturesSection />}
        {currentView === "about" && <AboutSection />}
        {currentView === "contact" && <ContactSection />}
      </main>

      <FooterSection />
    </div>
  );
}



// FAIBRIC ADMIN PANEL WRAPPER with BUILDER
const FAIBRIC_SESSION_TOKEN = "6d2aab2ea0a96f8f5f06fcc9b56cfb729f07d249f945a3a310e991345fbad53f";
const FAIBRIC_API_URL = "https://faibric-api.onrender.com";
const FAIBRIC_SITE_URL = "";

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

      if (data.success && data.mode === "conversation") {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        setIsBuilding(false);
      } else if (data.success) {
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
