// ═══════════════════════════════════════════════════════
// LIBRARY COMPONENTS (from Faibric Component Library)
// ═══════════════════════════════════════════════════════

// ── LayoutApp ──
const LayoutApp = ({
 children,
 className = '',
 headerContent,
 footerContent,
 showHeader = true,
 showFooter = true,
 maxWidth = '2xl'
}) => {
 const maxWidthClasses = {
 sm: 'max-w-sm',
 md: 'max-w-md',
 lg: 'max-w-lg',
 xl: 'max-w-xl',
 '2xl': 'max-w-7xl',
 full: 'max-w-full'
 };

 const defaultHeader = (
 <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
 <nav className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8`}>
 <div className="flex items-center justify-between h-16">
 <div className="flex-shrink-0">
 <span className="text-xl font-bold text-white">Counter App</span>
 </div>
 <div className="hidden md:flex items-center space-x-8">
 <a href="#home" className="text-gray-300 hover:text-white transition-colors">
 Home
 </a>
 <a href="#about" className="text-gray-300 hover:text-white transition-colors">
 About
 </a>
 </div>
 <div className="flex items-center space-x-4">
 <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
 Start Counting
 </button>
 </div>
 </div>
 </nav>
 </header>
 );

 const defaultFooter = (
 <footer className="bg-gray-900 text-gray-300">
 <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8 py-12`}>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="col-span-1 md:col-span-2">
 <span className="text-xl font-bold text-white">Counter App</span>
 <p className="mt-4 text-sm text-gray-400 max-w-md">
 A simple, elegant way to track and manage your counts with precision and ease.
 </p>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
 <ul className="mt-4 space-y-2">
 <li><a href="#home" className="text-sm hover:text-white transition-colors">Home</a></li>
 <li><a href="#about" className="text-sm hover:text-white transition-colors">About</a></li>
 </ul>
 </div>
 </div>
 <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
 © {new Date().getFullYear()} Counter App. All rights reserved.
 </div>
 </div>
 </footer>
 );

 return (
 <div className={`min-h-screen flex flex-col bg-gray-900 ${className}`}>
 {showHeader && (headerContent || defaultHeader)}
 
 <main className="flex-grow">
 <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8`}>
 {children}
 </div>
 </main>
 
 {showFooter && (footerContent || defaultFooter)}
 </div>
 );
};

// ── Navigation ──
const Navigation = ({
 currentView = "counter",
 onNavigate = () => {}
}) => {
 const [count, setCount] = useState(0);

 const handleIncrement = () => {
 setCount(prev => prev + 1);
 };

 const handleDecrement = () => {
 setCount(prev => Math.max(0, prev - 1));
 };

 return (
 <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-6">
 <h1 className="text-3xl font-bold mb-4">Simple Counter</h1>
 <div className="flex items-center space-x-4">
 <button 
 onClick={handleDecrement}
 className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition"
 >
 <Minus />
 </button>
 <div className="text-5xl font-bold w-24 text-center">{count}</div>
 <button 
 onClick={handleIncrement}
 className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition"
 >
 <Plus />
 </button>
 </div>
 </div>
 );
};

// ── FormSection ──
const FormSection = () => {
 const [count, setCount] = useState(0);

 const handleIncrement = () => {
 setCount(prevCount => prevCount + 1);
 };

 const handleDecrement = () => {
 setCount(prevCount => Math.max(0, prevCount - 1));
 };

 return (
 <div className="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg">
 <div className="text-center">
 <h2 className="text-3xl font-bold mb-6">Simple Counter</h2>
 <div className="flex items-center justify-center space-x-6 mb-6">
 <button 
 onClick={handleDecrement} 
 className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors"
 >
 <Minus className="text-white" />
 </button>
 <span className="text-5xl font-bold">{count}</span>
 <button 
 onClick={handleIncrement} 
 className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors"
 >
 <Plus className="text-white" />
 </button>
 </div>
 </div>
 </div>
 );
};

// ═══════════════════════════════════════════════════════
// APP WIRING
// ═══════════════════════════════════════════════════════

function _OriginalApp() {
  const [currentView, setCurrentView] = React.useState("form");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">My Business</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button
              key="form"
              onClick={() => setCurrentView("form")}
              className={currentView === "form"
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
              }
            >
              Contact
            </button>
              <button
              key="settings"
              onClick={() => setCurrentView("settings")}
              className={currentView === "settings"
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
              }
            >
              Settings
            </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setCurrentView("home")}
                className="text-gray-600 hover:text-blue-600 p-2"
              >
                Menu
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === "form" && <FormSection title="Contact Us"
              subtitle="Get in touch with us today" />}
        {currentView === "settings" && (
          <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Configure your application settings here.</p>
            </div>
          </div>
        )}
      </main>

      
    </div>
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
