import React from 'react';

// React is provided globally by CDN - no import needed

// ═══════════════════════════════════════════════════════
// ICON COMPONENTS (SVG replacements for lucide-react)
// ═══════════════════════════════════════════════════════

const Home = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const Check = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ArrowRight = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const Clock = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Settings = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const X = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Plus = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChevronLeft = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Menu = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const User = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Mail = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const Phone = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const Calendar = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Facebook = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Twitter = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const Linkedin = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Instagram = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const MapPin = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Star = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// Default social icons object (AI sometimes references this)
const defaultSocialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin
};


// ═══════════════════════════════════════════════════════
// LIBRARY COMPONENTS (from Faibric Component Library)
// ═══════════════════════════════════════════════════════

// ── LayoutApp ──
const LayoutApp = ({
 theme = { mode: 'light', primaryColor: '#6F4E37' },
 sidebarCollapsed = false,
 onThemeChange
}) => {
 const [currentView, setCurrentView] = React.useState('menu');
 const [menuItems] = React.useState([
 { id: 1, name: 'Espresso', price: '$3.50', category: 'Coffee' },
 { id: 2, name: 'Cappuccino', price: '$4.25', category: 'Coffee' },
 { id: 3, name: 'Latte', price: '$4.50', category: 'Coffee' },
 { id: 4, name: 'Croissant', price: '$3.00', category: 'Pastry' },
 { id: 5, name: 'Chocolate Brownie', price: '$3.50', category: 'Pastry' },
 { id: 6, name: 'Blueberry Muffin', price: '$3.25', category: 'Pastry' }
 ]);

 const [formData, setFormData] = React.useState({
 name: '',
 email: '',
 message: ''
 });

 const handleChange = (field, value) => {
 setFormData(prev => ({ ...prev, [field]: value }));
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 // Placeholder for form submission logic
 console.log('Contact Form Submitted', formData);
 };

 const isDark = theme.mode === 'dark';
 const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
 const textColor = isDark ? 'text-white' : 'text-gray-900';

 const navItems = [
 { id: 'menu', label: 'Menu', icon: null },
 { id: 'about', label: 'About', icon: null },
 { id: 'contact', label: 'Contact', icon: null }
 ];

 return (
 <div className={`min-h-screen ${bgColor} ${textColor}`}>
 {/* Navigation */}
 <nav className="bg-brown-700 p-4 flex justify-between items-center">
 <h1 className="text-2xl font-bold text-white">Bean & Brew Coffee</h1>
 <div className="space-x-4">
 {navItems.map(item => (
 <button 
 key={item.id}
 onClick={() => setCurrentView(item.id)}
 className={`text-white ${currentView === item.id ? 'font-bold' : ''}`}
 >
 {item.label}
 </button>
 ))}
 </div>
 </nav>

 {/* Hero Section */}
 {currentView === 'menu' && (
 <div 
 className="bg-cover bg-center h-[500px] flex items-center justify-center"
 style={{ 
 backgroundImage: 'url(https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
 backgroundBlendMode: 'overlay',
 backgroundColor: 'rgba(0,0,0,0.5)'
 }}
 >
 <div className="text-center text-white">
 <h2 className="text-4xl font-bold mb-4">Artisan Coffee & Fresh Pastries</h2>
 <p className="text-xl">Crafted with passion, served with love</p>
 </div>
 </div>
 )}

 {/* Menu Section */}
 {currentView === 'menu' && (
 <div className="container mx-auto p-8">
 <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
 <div className="grid md:grid-cols-2 gap-8">
 <div>
 <h3 className="text-2xl font-semibold mb-4">Coffee</h3>
 {menuItems.filter(item => item.category === 'Coffee').map(item => (
 <div key={item.id} className="flex justify-between mb-2">
 <span>{item.name}</span>
 <span>{item.price}</span>
 </div>
 ))}
 </div>
 <div>
 <h3 className="text-2xl font-semibold mb-4">Pastries</h3>
 {menuItems.filter(item => item.category === 'Pastry').map(item => (
 <div key={item.id} className="flex justify-between mb-2">
 <span>{item.name}</span>
 <span>{item.price}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* About Section */}
 {currentView === 'about' && (
 <div className="container mx-auto p-8 text-center">
 <h2 className="text-3xl font-bold mb-6">Our Story</h2>
 <p className="max-w-2xl mx-auto">
 Bean & Brew started in 2015 with a simple mission: to serve the most exceptional coffee in town. 
 We source our beans directly from sustainable farms and roast them in small batches to ensure 
 the highest quality and freshest taste. Every cup tells a story of passion and craftsmanship.
 </p>
 </div>
 )}

 {/* Contact Section */}
 {currentView === 'contact' && (
 <div className="container mx-auto p-8">
 <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
 <form onSubmit={handleSubmit} className="max-w-md mx-auto">
 <div className="mb-4">
 <input
 type="text"
 placeholder="Your Name"
 value={formData.name}
 onChange={(e) => handleChange('name', e.target.value)}
 className="w-full p-2 border rounded"
 />
 </div>
 <div className="mb-4">
 <input
 type="email"
 placeholder="Your Email"
 value={formData.email}
 onChange={(e) => handleChange('email', e.target.value)}
 className="w-full p-2 border rounded"
 />
 </div>
 <div className="mb-4">
 <textarea
 placeholder="Your Message"
 value={formData.message}
 onChange={(e) => handleChange('message', e.target.value)}
 className="w-full p-2 border rounded"
 rows="4"
 />
 </div>
 <button 
 type="submit" 
 className="w-full bg-brown-700 text-white p-2 rounded hover:bg-brown-800"
 >
 Send Message
 </button>
 </form>
 </div>
 )}
 </div>
 );
};

// ── Navigation ──
const Navigation = ({
 currentView,
 items = [],
 user = null,
 onNavigate,
 onLogout
}) => {
 const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

 const navItems = [
 { id: 'home', label: 'Home', icon: 'home' },
 { id: 'menu', label: 'Our Menu', icon: 'check' },
 { id: 'about', label: 'About Us', icon: 'home' },
 { id: 'contact', label: 'Contact', icon: 'check' }
 ];

 const handleNavClick = (itemId) => {
 if (onNavigate) {
 onNavigate(itemId);
 }
 setMobileMenuOpen(false);
 };

 const handleLogoutClick = () => {
 if (onLogout) {
 onLogout();
 }
 setMobileMenuOpen(false);
 };

 const getIcon = (iconName) => {
 switch (iconName) {
 case 'home':
 return <Home className="w-5 h-5" />;
 case 'check':
 return <Check className="w-5 h-5" />;
 default:
 return null;
 }
 };

 return (
 <header className="bg-white shadow-md border-b border-gray-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center h-16">
 {/* Logo / Brand */}
 <div className="flex items-center">
 <div className="flex-shrink-0">
 <span className="text-xl font-bold text-brown-600">Bean & Brew Café</span>
 </div>
 </div>

 {/* Desktop Navigation */}
 <nav className="hidden md:flex space-x-4">
 {navItems.map((item) => (
 <button
 key={item.id}
 onClick={() => handleNavClick(item.id)}
 className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
 currentView === item.id
 ? 'bg-brown-100 text-brown-700'
 : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
 }`}
 >
 {item.icon && (
 <span className="mr-2">{getIcon(item.icon)}</span>
 )}
 {item.label}
 </button>
 ))}
 </nav>

 {/* Mobile Menu Button */}
 <div className="md:hidden">
 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brown-500"
 aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
 >
 {mobileMenuOpen ? (
 <X className="w-6 h-6" />
 ) : (
 <Menu className="w-6 h-6" />
 )}
 </button>
 </div>
 </div>
 </div>

 {/* Mobile Menu */}
 {mobileMenuOpen && (
 <div className="md:hidden border-t border-gray-200">
 <div className="px-2 pt-2 pb-3 space-y-1">
 {navItems.map((item) => (
 <button
 key={item.id}
 onClick={() => handleNavClick(item.id)}
 className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
 currentView === item.id
 ? 'bg-brown-100 text-brown-700'
 : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
 }`}
 >
 {item.icon && (
 <span className="mr-3">{getIcon(item.icon)}</span>
 )}
 {item.label}
 </button>
 ))}
 </div>
 </div>
 )}
 </header>
 );
};

// ── Card ──
const Card = ({
 title = "Brew & Bite Cafe Menu",
 subtitle = "Artisan Coffee & Fresh Pastries",
 image = "/coffee-menu-background.jpg",
 data = {
 drinks: [
 { name: "Espresso", price: "$3.50", description: "Rich, bold single origin shot" },
 { name: "Cappuccino", price: "$4.75", description: "Creamy espresso with steamed milk" },
 { name: "Cold Brew", price: "$4.25", description: "Smooth, slow-steeped coffee" }
 ],
 pastries: [
 { name: "Croissant", price: "$3.25", description: "Buttery, flaky French classic" },
 { name: "Blueberry Muffin", price: "$3.50", description: "Fresh-baked morning delight" },
 { name: "Chocolate Brownie", price: "$3.75", description: "Decadent chocolate treat" }
 ]
 },
 loading = false,
 onClick,
 onAction
}) => {
 // Render logic for Coffee Shop Menu Card
 if (loading) {
 return (
 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
 <div className="h-3 bg-gray-200 rounded w-1/2"></div>
 </div>
 );
 }

 const handleCardClick = () => {
 if (onClick) {
 onClick({ title, subtitle, data });
 }
 };

 return (
 <div 
 className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
 onClick={handleCardClick}
 >
 {image && (
 <div className="w-full h-32 overflow-hidden rounded-t-lg">
 <img 
 src={image} 
 alt={title}
 className="w-full h-full object-cover"
 />
 </div>
 )}

 <div className="p-4">
 <h2 className="text-xl font-bold text-brown-800 mb-4">{title}</h2>
 <p className="text-gray-600 mb-4">{subtitle}</p>

 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <h3 className="font-semibold text-lg mb-2">Coffee Selections</h3>
 {(data.drinks || []).map((drink, index) => (
 <div key={index} className="flex justify-between border-b py-2">
 <div>
 <span className="font-medium">{drink.name}</span>
 <p className="text-sm text-gray-500">{drink.description}</p>
 </div>
 <span className="font-bold text-brown-700">{drink.price}</span>
 </div>
 ))}
 </div>

 <div>
 <h3 className="font-semibold text-lg mb-2">Fresh Pastries</h3>
 {(data.pastries || []).map((pastry, index) => (
 <div key={index} className="flex justify-between border-b py-2">
 <div>
 <span className="font-medium">{pastry.name}</span>
 <p className="text-sm text-gray-500">{pastry.description}</p>
 </div>
 <span className="font-bold text-brown-700">{pastry.price}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
};

// ── PricingTable ──
/**
 * Reusable Pricing Component
 * Displays pricing plans with optional billing period toggle
 * Designed to work for various contexts including coffee shop menus
 */
const PricingTable = ({
 plans = [],
 billingPeriod = 'monthly',
 onSelectPlan,
 onBillingChange
}) => {
 // Local state for billing toggle if no external handler provided
 const [activePeriod, setActivePeriod] = React.useState(billingPeriod);

 // Handle billing period change
 const handleBillingToggle = (period) => {
 setActivePeriod(period);
 if (onBillingChange) {
 onBillingChange(period);
 }
 };

 // Handle plan selection
 const handlePlanSelect = (plan) => {
 if (onSelectPlan) {
 onSelectPlan(plan);
 }
 };

 // Safe array reference
 const safePlans = plans || [];

 return (
 <div className="w-full py-12 px-4 bg-amber-50">
 <div className="max-w-6xl mx-auto">
 {/* Header Section */}
 <div className="text-center mb-10">
 <h2 className="text-3xl font-bold text-amber-900 mb-4">
 Our Pricing
 </h2>
 <p className="text-amber-700 max-w-2xl mx-auto">
 Choose the perfect option for your needs
 </p>
 </div>

 {/* Billing Period Toggle */}
 <div className="flex justify-center mb-8">
 <div className="bg-amber-100 rounded-full p-1 inline-flex">
 <button
 onClick={() => handleBillingToggle('monthly')}
 className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
 activePeriod === 'monthly'
 ? 'bg-amber-800 text-white shadow-md'
 : 'text-amber-700 hover:text-amber-900'
 }`}
 >
 Monthly
 </button>
 <button
 onClick={() => handleBillingToggle('yearly')}
 className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
 activePeriod === 'yearly'
 ? 'bg-amber-800 text-white shadow-md'
 : 'text-amber-700 hover:text-amber-900'
 }`}
 >
 Yearly
 <span className="ml-1 text-xs text-amber-600">Save 20%</span>
 </button>
 </div>
 </div>

 {/* Pricing Cards Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {safePlans.map((plan, index) => {
 // Calculate price based on billing period
 const basePrice = plan.price || 0;
 const displayPrice = activePeriod === 'yearly' 
 ? Math.round(basePrice * 0.8 * 12) 
 : basePrice;

 return (
 <div
 key={plan.id || index}
 className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
 plan.featured ? 'ring-2 ring-amber-600' : ''
 }`}
 >
 {/* Featured Badge */}
 {plan.featured && (
 <div className="absolute top-0 right-0 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
 Popular
 </div>
 )}

 <div className="p-6">
 {/* Plan Name */}
 <h3 className="text-xl font-bold text-amber-900 mb-2">
 {plan.name || 'Plan'}
 </h3>

 {/* Plan Description */}
 <p className="text-amber-600 text-sm mb-4">
 {plan.description || 'Perfect for your needs'}
 </p>

 {/* Price Display */}
 <div className="mb-6">
 <span className="text-4xl font-bold text-amber-900">
 ${displayPrice}
 </span>
 <span className="text-amber-600 text-sm">
 /{activePeriod === 'yearly' ? 'year' : 'month'}
 </span>
 </div>

 {/* Features List */}
 <ul className="space-y-3 mb-6">
 {(plan.features || []).map((feature, featureIndex) => (
 <li
 key={featureIndex}
 className="flex items-start gap-2 text-amber-800"
 >
 <Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
 <span className="text-sm">{feature}</span>
 </li>
 ))}
 </ul>

 {/* Select Button */}
 <button
 onClick={() => handlePlanSelect(plan)}
 className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
 plan.featured
 ? 'bg-amber-800 text-white hover:bg-amber-900'
 : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
 }`}
 >
 {plan.buttonText || 'Get Started'}
 </button>
 </div>
 </div>
 );
 })}
 </div>

 {/* Empty State */}
 {safePlans.length === 0 && (
 <div className="text-center py-12">
 <p className="text-amber-600">No pricing plans available</p>
 </div>
 )}

 {/* Footer Note */}
 <div className="text-center mt-8">
 <p className="text-amber-600 text-sm">
 All plans include our satisfaction guarantee
 </p>
 </div>
 </div>
 </div>
 );
};

// ── Footer ──
const Footer = ({
 headline = "Bean Dreams Coffee Co.",
 subheadline = "Crafting the Perfect Brew in Every Cup",
 backgroundImage = "https://images.unsplash.com/photo-coffee-beans-roasted-dark-background",
 ctaLabel = "Order Now",
 ctaSecondaryLabel = "View Menu",
 onCtaClick,
 onSecondaryCtaClick
}) => {
 const defaultBg = 'https://images.unsplash.com/photo-coffee-beans-roasted-dark-background';
 const bgImage = backgroundImage || defaultBg;

 return (
 <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
 <div 
 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
 style={{ backgroundImage: `url(${bgImage})` }}
 aria-hidden="true"
 />
 
 <div 
 className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
 aria-hidden="true"
 />

 <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
 <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
 {headline}
 </h1>

 {subheadline && (
 <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
 {subheadline}
 </p>
 )}

 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <button
 onClick={onCtaClick || (() => {})}
 className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/50"
 >
 {ctaLabel}
 <ArrowRight 
 className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
 />
 </button>

 {ctaSecondaryLabel && (
 <button
 onClick={onSecondaryCtaClick || (() => {})}
 className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
 >
 {ctaSecondaryLabel}
 </button>
 )}
 </div>

 <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
 <p className="text-gray-400 text-sm mt-1">Unique Blends</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">10+</p>
 <p className="text-gray-400 text-sm mt-1">Years Brewing</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">24/7</p>
 <p className="text-gray-400 text-sm mt-1">Online Orders</p>
 </div>
 </div>
 </div>

 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
 <ChevronDown className="w-8 h-8 text-white/70" />
 </div>
 </section>
 );
};

// ── HeroSection ──
const HeroSection = ({
 headline = "Bean There, Brewed That Coffee Co.",
 subheadline = "Crafting Exceptional Artisan Coffee Since 2015",
 backgroundImage = "https://images.unsplash.com/photo-coffee-beans-dark-roast",
 ctaLabel = "Order Now",
 ctaSecondaryLabel = "View Menu",
 onCtaClick = () => {},
 onSecondaryCtaClick = () => {}
}) => {
 return (
 <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
 {/* Background Image Layer */}
 <div 
 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
 style={{ backgroundImage: `url(${backgroundImage})` }}
 aria-hidden="true"
 />
 
 {/* Dark Overlay for better text readability */}
 <div 
 className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
 aria-hidden="true"
 />

 {/* Content Container */}
 <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
 {/* Main Headline */}
 <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
 {headline}
 </h1>

 {/* Subheadline */}
 {subheadline && (
 <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
 {subheadline}
 </p>
 )}

 {/* CTA Buttons Container */}
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 {/* Primary CTA Button */}
 <button
 onClick={onCtaClick}
 className="group inline-flex items-center gap-2 bg-brown-600 hover:bg-brown-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brown-600/50"
 >
 {ctaLabel}
 <ArrowRight 
 className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
 />
 </button>

 {/* Secondary CTA Button (optional) */}
 {ctaSecondaryLabel && (
 <button
 onClick={onSecondaryCtaClick}
 className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
 >
 {ctaSecondaryLabel}
 </button>
 )}
 </div>

 {/* Coffee Stats/Trust Indicators */}
 <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
 <p className="text-gray-400 text-sm mt-1">Unique Blends</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">10+</p>
 <p className="text-gray-400 text-sm mt-1">Years Brewing</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">24/7</p>
 <p className="text-gray-400 text-sm mt-1">Online Orders</p>
 </div>
 </div>
 </div>

 {/* Scroll Indicator */}
 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
 <ChevronDown className="w-8 h-8 text-white/70" />
 </div>
 </section>
 );
};

// ── FormSection ──
const FormSection = ({
 fields = [],
 initialValues = {},
 loading = false,
 submitLabel = 'Send Message',
 onSubmit,
 onChange,
 onValidationError
}) => {
 // [Rest of the implementation remains the same]
 
 // Customize form for Roasted Dreams Coffee Shop contact form
 const contactFormFields = [
 {
 name: 'name',
 label: 'Your Name',
 type: 'text',
 required: true,
 placeholder: 'Full Name'
 },
 {
 name: 'email',
 label: 'Email Address',
 type: 'email',
 required: true,
 placeholder: 'you@example.com'
 },
 {
 name: 'message',
 label: 'Your Message',
 type: 'textarea',
 required: true,
 placeholder: 'Tell us about your coffee experience or ask a question...',
 rows: 4
 }
 ];

 // Customize submit button and form behavior for coffee shop context
 return (
 <form 
 onSubmit={handleFormSubmit} 
 className="space-y-4 bg-[#F4E6D0] p-6 rounded-lg shadow-md"
 >
 {/* Existing form rendering logic remains the same */}
 
 <div className="pt-4">
 <button
 type="submit"
 disabled={loading}
 className={`w-full flex items-center justify-center px-4 py-2 text-white font-medium rounded-md transition-colors ${
 loading
 ? 'bg-brown-400 cursor-not-allowed'
 : 'bg-[#5D4037] hover:bg-[#4E342E] focus:outline-none focus:ring-2 focus:ring-brown-500'
 }`}
 >
 {loading ? (
 <span className="animate-pulse">Sending...</span>
 ) : (
 <>
 <Check className="w-4 h-4 mr-2" />
 Send Message
 </>
 )}
 </button>
 </div>
 </form>
 );
};

// ═══════════════════════════════════════════════════════
// APP WIRING
// ═══════════════════════════════════════════════════════

function _OriginalApp() {
  const [currentView, setCurrentView] = React.useState("home");
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.faibric.com/api/gateway/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ service: 'coingecko', endpoint: '/simple/price?ids=bitcoin&vs_currencies=usd' })
        });
        const result = await response.json();
        setData(result.data || result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <LayoutApp
      currentView={currentView}
      onNavigate={setCurrentView}
      brandName="My Business"
    >
      {currentView === "card" && <Card title="Our Services" subtitle="Excellence in Everything We Do" description="Professional services tailored to your needs."/>}
        {currentView === "pricing" && <PricingTable />}
        {currentView === "home" && <HeroSection />}
        {currentView === "form" && <FormSection title="Contact Us" subtitle="Get in touch today"/>}
        {currentView === "settings" && (
          <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Configure your application settings here.</p>
            </div>
          </div>
        )}
      <Footer />
    </LayoutApp>
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
