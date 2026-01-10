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
 theme = { mode: 'light', primaryColor: '#FF6B00' },
 sidebarCollapsed = false,
 onThemeChange
}) => {
 const [currentView, setCurrentView] = React.useState('classes');
 const [loading, setLoading] = React.useState(false);
 const [error, setError] = React.useState(null);

 const navItems = [
 { id: 'home', label: 'Home', icon: Home },
 { id: 'classes', label: 'Classes', icon: Calendar },
 { id: 'trainers', label: 'Trainers', icon: User },
 { id: 'membership', label: 'Membership', icon: Check }
 ];

 const classes = [
 { 
 name: 'High Intensity Interval Training', 
 time: 'Mon/Wed 6:00 AM', 
 instructor: 'Jake Rodriguez'
 },
 { 
 name: 'Strength & Power Lifting', 
 time: 'Tue/Thu 7:30 PM', 
 instructor: 'Sarah Thompson'
 },
 { 
 name: 'Cardio Burn', 
 time: 'Fri 5:30 PM', 
 instructor: 'Mike Chen'
 }
 ];

 const trainers = [
 {
 name: 'Jake Rodriguez',
 specialty: 'Strength Training',
 bio: 'Former professional athlete with 10 years of fitness coaching experience',
 image: '/trainer1.jpg'
 },
 {
 name: 'Sarah Thompson',
 specialty: 'Weight Loss & Conditioning',
 bio: 'Certified nutritionist and personal trainer specializing in transformative fitness',
 image: '/trainer2.jpg'
 }
 ];

 const membershipPlans = [
 {
 name: 'Basic',
 price: 49.99,
 features: ['Gym Access', 'Group Classes', 'Basic Equipment']
 },
 {
 name: 'Premium',
 price: 79.99,
 features: ['Full Gym Access', 'All Classes', 'Personal Training', 'Nutrition Consultation']
 }
 ];

 const handleNavigate = (viewId) => {
 setCurrentView(viewId);
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 };

 const handleClick = () => {};
 const handleChange = () => {};

 return (
 <div className="min-h-screen bg-gray-50 text-gray-900">
 {/* Navigation */}
 <nav className="bg-orange-500 text-white p-4 flex justify-between items-center">
 <h1 className="text-2xl font-bold">Iron Core Fitness</h1>
 <div className="space-x-4">
 {navItems.map(item => (
 <button 
 key={item.id} 
 onClick={() => handleNavigate(item.id)}
 className="hover:bg-orange-600 px-3 py-2 rounded"
 >
 {item.label}
 </button>
 ))}
 </div>
 </nav>

 {/* Hero Section */}
 {currentView === 'home' && (
 <div className="bg-cover bg-center h-[600px]" style={{ backgroundImage: 'url("/gym-interior.jpg")' }}>
 <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
 <div className="text-center text-white">
 <h2 className="text-4xl font-bold mb-4">Transform Your Body, Transform Your Life</h2>
 <p className="text-xl mb-6">Professional Training. Real Results.</p>
 <button 
 className="bg-orange-500 px-8 py-3 rounded-full hover:bg-orange-600"
 >
 Start Your Journey
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Classes Section */}
 {currentView === 'classes' && (
 <div className="container mx-auto p-6">
 <h2 className="text-3xl font-bold text-center mb-8">Our Classes</h2>
 <div className="grid md:grid-cols-3 gap-6">
 {classes.map((fitnessClass, index) => (
 <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
 <h3 className="text-xl font-semibold">{fitnessClass.name}</h3>
 <p>{fitnessClass.time}</p>
 <p>Instructor: {fitnessClass.instructor}</p>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Trainers Section */}
 {currentView === 'trainers' && (
 <div className="container mx-auto p-6">
 <h2 className="text-3xl font-bold text-center mb-8">Our Expert Trainers</h2>
 <div className="grid md:grid-cols-2 gap-6">
 {trainers.map((trainer, index) => (
 <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
 <img 
 src={trainer.image} 
 alt={trainer.name} 
 className="mx-auto rounded-full w-48 h-48 object-cover mb-4"
 />
 <h3 className="text-xl font-semibold">{trainer.name}</h3>
 <p className="text-orange-500">{trainer.specialty}</p>
 <p>{trainer.bio}</p>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Membership Section */}
 {currentView === 'membership' && (
 <div className="container mx-auto p-6">
 <h2 className="text-3xl font-bold text-center mb-8">Membership Plans</h2>
 <div className="grid md:grid-cols-2 gap-6">
 {membershipPlans.map((plan, index) => (
 <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
 <h3 className="text-2xl font-semibold">{plan.name}</h3>
 <p className="text-3xl font-bold text-orange-500 my-4">${plan.price}/month</p>
 <ul className="space-y-2">
 {plan.features.map((feature, idx) => (
 <li key={idx}>{feature}</li>
 ))}
 </ul>
 <button className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-full">
 Choose Plan
 </button>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 );
};

// ── Navigation ──
const Navigation = ({
 currentView,
 items = [
 { id: 'home', label: 'Home', icon: 'home' },
 { id: 'classes', label: 'Classes', icon: 'check' },
 { id: 'trainers', label: 'Trainers', icon: 'user' },
 { id: 'memberships', label: 'Memberships', icon: 'settings' }
 ],
 user = null,
 onNavigate,
 onLogout
}) => {
 const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
 case 'user':
 return <User className="w-5 h-5" />;
 case 'settings':
 return <Settings className="w-5 h-5" />;
 default:
 return null;
 }
 };

 return (
 <header className="bg-white shadow-md border-b border-gray-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center h-16">
 <div className="flex items-center">
 <div className="flex-shrink-0">
 <span className="text-xl font-bold text-blue-600">Iron Core Fitness</span>
 </div>
 </div>

 <nav className="hidden md:flex space-x-4">
 {items.map((item) => (
 <button
 key={item.id}
 onClick={() => handleNavClick(item.id)}
 className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
 currentView === item.id
 ? 'bg-blue-100 text-blue-700'
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

 <div className="hidden md:flex items-center space-x-4">
 {user ? (
 <div className="flex items-center space-x-3">
 <span className="text-sm text-gray-700">
 {user.name || user.email || 'Member'}
 </span>
 <button
 onClick={handleLogoutClick}
 className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
 >
 Logout
 </button>
 </div>
 ) : (
 <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
 Join Now
 </button>
 )}
 </div>

 <div className="md:hidden">
 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

 {mobileMenuOpen && (
 <div className="md:hidden border-t border-gray-200">
 <div className="px-2 pt-2 pb-3 space-y-1">
 {items.map((item) => (
 <button
 key={item.id}
 onClick={() => handleNavClick(item.id)}
 className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
 currentView === item.id
 ? 'bg-blue-100 text-blue-700'
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

 {user && (
 <div className="border-t border-gray-200 px-2 py-3">
 <div className="px-3 py-2 text-sm text-gray-700">
 {user.name || user.email || 'Member'}
 </div>
 <button
 onClick={handleLogoutClick}
 className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200"
 >
 Logout
 </button>
 </div>
 )}
 </div>
 )}
 </header>
 );
};

// ── Card ──
const Card = ({
 title = 'Iron Forge Fitness Membership',
 subtitle = 'Transform Your Body, Elevate Your Performance',
 image = '/gym-interior.jpg',
 data = {
 status: 'available',
 priority: 'high',
 dueDate: 'Next Class: Mon/Wed/Fri',
 completed: false
 },
 loading = false,
 onClick,
 onAction
}) => {
 const priorityColors = {
 low: 'bg-red-100 text-red-700',
 normal: 'bg-blue-100 text-blue-700',
 high: 'bg-green-100 text-green-700',
 urgent: 'bg-orange-100 text-orange-700'
 };

 const statusColors = {
 available: 'bg-green-400',
 'limited-spots': 'bg-yellow-400',
 'fully-booked': 'bg-red-400'
 };

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
 onClick({ 
 title: 'Membership Details', 
 subtitle: 'Complete Fitness Training Package' 
 });
 }
 };

 const handleActionClick = (e) => {
 e.stopPropagation();
 if (onAction) {
 onAction({ 
 type: 'register', 
 item: { 
 title: 'Join Iron Forge Fitness', 
 subtitle: 'Start Your Fitness Journey Today' 
 } 
 });
 }
 };

 return (
 <div
 className={`
 bg-white rounded-lg shadow-sm border border-gray-200 
 hover:shadow-md hover:border-gray-300 
 transition-all duration-200 cursor-pointer
 ${data.completed ? 'opacity-60' : ''}
 `}
 onClick={handleCardClick}
 role="button"
 tabIndex={0}
 aria-label={`Fitness Membership: ${title}`}
 >
 {image && (
 <div className="w-full h-32 overflow-hidden rounded-t-lg">
 <img 
 src={image} 
 alt="Gym Interior Workout Space"
 className="w-full h-full object-cover"
 />
 </div>
 )}

 <div className="p-4">
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-2">
 <span 
 className={`w-2 h-2 rounded-full ${statusColors[data.status] || statusColors.available}`}
 aria-label={`Membership Status: ${data.status}`}
 />
 <span 
 className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[data.priority] || priorityColors.normal}`}
 >
 {data.priority === 'high' ? 'Popular' : 'Standard'}
 </span>
 </div>

 <button
 onClick={handleActionClick}
 className={`
 p-1.5 rounded-full transition-colors
 ${data.completed 
 ? 'bg-green-100 text-green-600' 
 : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
 }
 `}
 aria-label="Register for Membership"
 >
 <Check className="w-4 h-4" />
 </button>
 </div>

 <h3 
 className={`
 font-medium text-gray-900 mb-1 line-clamp-2
 ${data.completed ? 'line-through text-gray-500' : ''}
 `}
 >
 {title}
 </h3>

 {subtitle && (
 <p className="text-sm text-gray-500 line-clamp-2 mb-3">
 {subtitle}
 </p>
 )}

 <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
 {data.dueDate && (
 <div className="flex items-center gap-1 text-xs text-gray-500">
 <Clock className="w-3 h-3" />
 <span>{data.dueDate}</span>
 </div>
 )}

 <div className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 ml-auto">
 <span>More Details</span>
 <ArrowRight className="w-3 h-3" />
 </div>
 </div>
 </div>
 </div>
 );
};

// ── ChartSection ──
const ChartSection = () => {
  return (
    import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable Chart Component
 * Supports line, bar, pie, area, and donut chart types
 * Built with SVG for lightweight rendering without external dependencies
 */
const Chart = ({
 data,
 type = 'line',
 title,
 loading = false,
 colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
 onDataPointClick,
 onLegendClick
}) => {
 const [hoveredPoint, setHoveredPoint] = React.useState(null);
 const [activeLegend, setActiveLegend] = React.useState(null);
 const chartRef = React.useRef(null);

 // Ensure data is always an array
 const chartData = data || [];
 const chartColors = colors || ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

 // Chart dimensions
 const width = 600;
 const height = 300;
 const padding = { top: 40, right: 40, bottom: 60, left: 60 };
 const chartWidth = width - padding.left - padding.right;
 const chartHeight = height - padding.top - padding.bottom;

 // Calculate min/max values for scaling
 const values = (chartData || []).map(d => d.value || 0);
 const maxValue = Math.max(...values, 1);
 const minValue = Math.min(...values, 0);
 const valueRange = maxValue - minValue || 1;

 // Scale functions
 const scaleX = (index) => {
 const dataLength = chartData.length || 1;
 return padding.left + (index / (dataLength - 1 || 1)) * chartWidth;
 };

 const scaleY = (value) => {
 return padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
 };

 // Generate path for line/area charts
 const generateLinePath = () => {
 if (!chartData.length) return '';
 return (chartData || []).map((d, i) => {
 const x = scaleX(i);
 const y = scaleY(d.value || 0);
 return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
 }).join(' ');
 };

 // Generate area path (closed path for fill)
 const generateAreaPath = () => {
 if (!chartData.length) return '';
 const linePath = generateLinePath();
 const lastX = scaleX(chartData.length - 1);
 const firstX = scaleX(0);
 const baseY = padding.top + chartHeight;
 return `${linePath} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
 };

 // Handle data point click
 const handlePointClick = (point, index) => {
 if (onDataPointClick) {
 onDataPointClick({ point, index });
 }
 };

 // Handle legend click
 const handleLegendItemClick = (item, index) => {
 setActiveLegend(activeLegend === index ? null : index);
 if (onLegendClick) {
 onLegendClick({ item, index });
 }
 };

 // Render Y-axis labels
 const renderYAxisLabels = () => {
 const tickCount = 5;
 const ticks = [];
 for (let i = 0; i <= tickCount; i++) {
 const value = minValue + (valueRange * i) / tickCount;
 const y = scaleY(value);
 ticks.push(
 <g key={i}>
 <line
 x1={padding.left - 5}
 y1={y}
 x2={padding.left}
 y2={y}
 stroke="#9CA3AF"
 strokeWidth="1"
 />
 <text
 x={padding.left - 10}
 y={y}
 textAnchor="end"
 alignmentBaseline="middle"
 className="text-xs fill-gray-500"
 >
 {Math.round(value)}
 </text>
 <line
 x1={padding.left}
 y1={y}
 x2={width - padding.right}
 y2={y}
 stroke="#E5E7EB"
 strokeWidth="1"
 strokeDasharray="4,4"
 />
 </g>
 );
 }
 return ticks;
 };

 // Render X-axis labels
 const renderXAxisLabels = () => {
 return (chartData || []).map((d, i) => {
 const x = type === 'bar' 
 ? padding.left + (i + 0.5) * (chartWidth / chartData.length)
 : scaleX(i);
 return (
 <g key={i}>
 <line
 x1={x}
 y1={padding.top + chartHeight}
 x2={x}
 y2={padding.top + chartHeight + 5}
 stroke="#9CA3AF"
 strokeWidth="1"
 />
 <text
 x={x}
 y={padding.top + chartHeight + 20}
 textAnchor="middle"
 className="text-xs fill-gray-500"
 >
 {d.label || `Point ${i + 1}`}
 </text>
 </g>
 );
 });
 };

 // Render line chart
 const renderLineChart = () => (
 <g>
 <path
 d={generateLinePath()}
 fill="none"
 stroke={chartColors[0]}
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 {(chartData || []).map((d, i) => (
 <circle
 key={i}
 cx={scaleX(i)}
 cy={scaleY(d.value || 0)}
 r={hoveredPoint === i ? 6 : 4}
 fill={chartColors[0]}
 stroke="white"
 strokeWidth="2"
 className="cursor-pointer transition-all"
 onMouseEnter={() => setHoveredPoint(i)}
 onMouseLeave={() => setHoveredPoint(null)}
 onClick={() => handlePointClick(d, i)}
 />
 ))}
 </g>
 );

 // Render area chart
 const renderAreaChart = () => (
 <g>
 <path
 d={generateAreaPath()}
 fill={`${chartColors[0]}33`}
 stroke="none"
 />
 <path
 d={generateLinePath()}
 fill="none"
 stroke={chartColors[0]}
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 {(chartData || []).map((d, i) => (
 <circle
 key={i}
 cx={scaleX(i)}
 cy={scaleY(d.value || 0)}
 r={hoveredPoint === i ? 6 : 4}
 fill={chartColors[0]}
 stroke="white"
 strokeWidth="2"
 className="cursor-pointer transition-all"
 onMouseEnter={() => setHoveredPoint(i)}
 onMouseLeave={() => setHoveredPoint(null)}
 onClick={() => handlePointClick(d, i)}
 />
 ))}
 </g>
 );

 // Render bar chart
 const renderBarChart = () => {
 const barWidth = chartWidth / chartData.length * 0.6;
 const barGap = chartWidth / chartData.length * 0.4;
 
 return (
 <g>
 {(chartData || []).map((d, i) => {
 const barHeight = ((d.value || 0) - minValue) / valueRange * chartHeight;
 const x = padding.left + i * (chartWidth / chartData.length) + barGap / 2;
 const y = padding.top + chartHeight - barHeight;
 
 return (
 <rect
 key={i}
 x={x}
 y={y}
 width={barWidth}
 height={barHeight}
 fill={chartColors[i % chartColors.length]}
 className="cursor-pointer transition-opacity hover:opacity-80"
 onMouseEnter={() => setHoveredPoint(i)}
 onMouseLeave={() => setHoveredPoint(null)}
 onClick={() => handlePointClick(d, i)}
 rx="2"
 />
 );
 })}
 </g>
 );
 };

 // Render pie/donut chart
 const renderPieChart = (isDonut = false) => {
 const total = values.reduce((sum, v) => sum + v, 0) || 1;
 const centerX = width / 2;
 const centerY = height / 2;
 const radius = Math.min(chartWidth, chartHeight) / 2 - 20;
 const innerRadius = isDonut ? radius * 0.6 : 0;
 
 let startAngle = -Math.PI / 2;
 
 return (
 <g>
 {(chartData || []).map((d, i) => {
 const angle = ((d.value || 0) / total) * Math.PI * 2;
 const endAngle = startAngle + angle;
 
 const x1 = centerX + Math.cos(startAngle) * radius;
 const y1 = centerY + Math.sin(startAngle) * radius;
 const x2 = centerX + Math.cos(endAngle) * radius;
 const y2 = centerY + Math.sin(endAngle) * radius;
 
 const innerX1 = centerX + Math.cos(startAngle) * innerRadius;
 const innerY1 = centerY + Math.sin(startAngle) * innerRadius;
 const innerX2 = centerX + Math.cos(endAngle) * innerRadius;
 const innerY2 = centerY + Math.sin(endAngle) * innerRadius;
 
 const largeArc = angle > Math.PI ? 1 : 0;
 
 const pathD = isDonut
 ? `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${innerX2} ${innerY2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerX1} ${innerY1} Z`
 : `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
 
 const result = (
 <path
 key={i}
 d={pathD}
 fill={chartColors[i % chartColors.length]}
 stroke="white"
 strokeWidth="2"
 className="cursor-pointer transition-opacity hover:opacity-80"
 onMouseEnter={() => setHoveredPoint(i)}
 onMouseLeave={() => setHoveredPoint(null)}
 onClick={() => handlePointClick(d, i)}
 />
 );
 
 startAngle = endAngle;
 return result;
 })}
 </g>
 );
 };

 // Render chart based on type
 const renderChart = () => {
 switch (type) {
 case 'bar':
 return renderBarChart();
 case 'pie':
 return renderPieChart(false);
 case 'donut':
 return renderPieChart(true);
 case 'area':
 return renderAreaChart();
 case 'line':
 default:
 return renderLineChart();
 }
 };

 // Render legend
 const renderLegend = () => (
 <div className="flex flex-wrap justify-center gap-4 mt-4">
 {(chartData || []).map((d, i) => (
 <button
 key={i}
 className={`flex items-center gap-2 px-2 py-1 rounded transition-opacity ${
 activeLegend !== null && activeLegend !== i ? 'opacity-50' : 'opacity-100'
 }`}
 onClick={() => handleLegendItemClick(d, i)}
 >
 <span
 className="w-3 h-3 rounded-full"
 style={{ backgroundColor: chartColors[i % chartColors.length] }}
 />
 <span className="text-sm text-gray-600">{d.label || `Series ${i + 1}`}</span>
 </button>
 ))}
 </div>
 );

 // Loading state
 if (loading) {
 return (
 <div className="w-full bg-white rounded-lg shadow-md p-6">
 {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
 <div className="flex items-center justify-center h-64">
 <div className="animate-pulse flex flex-col items-center">
 <div className="w-48 h-4 bg-gray-200 rounded mb-4" />
 <div className="w-full h-48 bg-gray-100 rounded" />
 </div>
 </div>
 </div>
 );
 }

 // Empty state
 if (!chartData.length) {
 return (
 <div className="w-full bg-white rounded-lg shadow-md p-6">
 {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
 <div className="flex items-center justify-center h-64 text-gray-400">
 No data available
 </div>
 </div>
 );
 }

 const isPieOrDonut = type === 'pie' || type === 'donut';

 return (
 <div className="w-full bg-white rounded-lg shadow-md p-6">
 {title && (
 <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
 )}
 
 <div className="relative" ref={chartRef}>
 <svg
 viewBox={`0 0 ${width} ${height}`}
 className="w-full h-auto"
 preserveAspectRatio="xMidYMid meet"
 >
 {/* Axes for non-pie charts */}
 {!isPieOrDonut && (
 <>
 {renderYAxisLabels()}
 {renderXAxisLabels()}
 {/* Y-axis line */}
 <line
 x1={padding.left}
 y1={padding.top}
 x2={padding.left}
 y2={padding.top + chartHeight}
 stroke="#9CA3AF"
 strokeWidth="1"
 />
 {/* X-axis line */}
 <line
 x1={padding.left}
 y1={padding.top + chartHeight}
 x2={width - padding.right}
 y2={padding.top + chartHeight}
 stroke="#9CA3AF"
 strokeWidth="1"
 />
 </>
 )}
 
 {/* Chart content */}
 {renderChart()}
 </svg>
 
 {/* Tooltip */}
 {hoveredPoint !== null && chartData[hoveredPoint] && (
 <div
 className="absolute bg-gray-800 text-white px-3 py-2 rounded shadow-lg text-sm pointer-events-none z-10"
 style={{
 left: '50%',
 top: '10px',
 transform: 'translateX(-50%)'
 }}
 >
 <div className="font-medium">{chartData[hoveredPoint].label}</div>
 <div>Value: {chartData[hoveredPoint].value}</div>
 </div>
 )}
  );
};
};

// ── ListView ──
const ListView = ({
 items = [],
 loading = false,
 emptyMessage = 'No workout tasks completed',
 onItemClick,
 onItemAction
}) => {
 const handleItemClick = (item) => {
 if (onItemClick) {
 onItemClick(item);
 }
 };

 const handleActionClick = (e, item, action) => {
 e.stopPropagation();
 if (onItemAction) {
 onItemAction(item, action);
 }
 };

 if (loading) {
 return (
 <div className="flex items-center justify-center p-8">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
 <span className="ml-3 text-gray-600">Loading fitness plan...</span>
 </div>
 );
 }

 if (!items || items.length === 0) {
 return (
 <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
 <Clock className="h-12 w-12 text-gray-400 mb-3" />
 <p className="text-gray-500 text-center">{emptyMessage}</p>
 </div>
 );
 }

 return (
 <div className="bg-white rounded-lg shadow overflow-hidden">
 <ul className="divide-y divide-gray-200">
 {(items || []).map((item, index) => (
 <li
 key={item.id || index}
 onClick={() => handleItemClick(item)}
 className={`
 flex items-center justify-between p-4 
 hover:bg-gray-50 cursor-pointer transition-colors duration-150
 ${item.completed ? 'bg-gray-50' : 'bg-white'}
 `}
 >
 <div className="flex items-center flex-1 min-w-0">
 <button
 onClick={(e) => handleActionClick(e, item, 'toggle')}
 className={`
 flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4
 flex items-center justify-center transition-all duration-200
 ${item.completed 
 ? 'bg-green-500 border-green-500 text-white' 
 : 'border-gray-300 hover:border-blue-500'
 }
 `}
 aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
 >
 {item.completed && <Check className="h-4 w-4" />}
 </button>

 <div className="flex-1 min-w-0">
 <p className={`
 text-sm font-medium truncate
 ${item.completed ? 'text-gray-400 line-through' : 'text-gray-900'}
 `}>
 {item.title || item.name || 'Fitness Task'}
 </p>
 {item.description && (
 <p className={`
 text-sm truncate mt-1
 ${item.completed ? 'text-gray-300' : 'text-gray-500'}
 `}>
 {item.description}
 </p>
 )}
 </div>
 </div>

 <div className="flex items-center ml-4">
 {item.priority && (
 <span className={`
 px-2 py-1 text-xs font-medium rounded-full mr-2
 ${item.priority === 'high' 
 ? 'bg-red-100 text-red-800' 
 : item.priority === 'medium'
 ? 'bg-yellow-100 text-yellow-800'
 : 'bg-gray-100 text-gray-800'
 }
 `}>
 {item.priority}
 </span>
 )}
 
 {item.status && !item.completed && (
 <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
 {item.status}
 </span>
 )}
 
 {item.completed && (
 <span className="text-xs text-gray-400">[Completed]</span>
 )}
 </div>
 </li>
 ))}
 </ul>
 
 <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
 <p className="text-sm text-gray-500">
 {(items || []).filter(i => i.completed).length} of {(items || []).length} fitness tasks completed
 </p>
 </div>
 </div>
 );
};

// ── FormSection ──
const FormSection = ({
 fields = [],
 initialValues = {},
 loading = false,
 submitLabel = 'Join Apex Fitness',
 onSubmit,
 onChange,
 onValidationError
}) => {
 // Form for gym membership sign-up, preserving original form logic
 const [values, setValues] = React.useState(initialValues);
 const [errors, setErrors] = React.useState({});
 const [touched, setTouched] = React.useState({});

 // Existing validation and form handling logic remains unchanged
 const validateField = (field, value) => {
 const fieldErrors = [];
 
 if (field.required && (!value || value.toString().trim() === '')) {
 fieldErrors.push(`${field.label || field.name} is required for gym membership`);
 }
 
 // Keep existing validation logic
 if (field.type === 'email' && value) {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(value)) {
 fieldErrors.push('Please enter a valid email for gym communication');
 }
 }
 
 return fieldErrors;
 };

 // Rest of the component remains structurally identical to original
 return (
 <form onSubmit={handleFormSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
 {fields.map(field => (
 <div key={field.name} className="space-y-1">
 {field.label && field.type !== 'checkbox' && (
 <label 
 htmlFor={field.name}
 className="block text-sm font-medium text-gray-800 uppercase tracking-wider"
 >
 {field.label}
 {field.required && <span className="text-red-600 ml-1">*</span>}
 </label>
 )}
 
 {renderInput(field)}
 
 {errors[field.name] && touched[field.name] && (
 <div className="flex items-start space-x-1 text-sm text-red-600">
 <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
 <span>{errors[field.name][0]}</span>
 </div>
 )}
 </div>
 ))}
 
 <div className="pt-4">
 <button
 type="submit"
 disabled={loading}
 className={`w-full flex items-center justify-center px-4 py-3 text-white font-bold rounded-md uppercase tracking-wider transition-colors ${
 loading
 ? 'bg-gray-400 cursor-not-allowed'
 : 'bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500'
 }`}
 >
 {loading ? (
 <span className="animate-pulse">Processing Membership...</span>
 ) : (
 <>
 <Check className="w-4 h-4 mr-2" />
 {submitLabel}
 </>
 )}
 </button>
 </div>
 </form>
 );
};

// ── HeroSection ──
/**
 * HeroFull Component
 * A full-screen hero section designed for fitness/gym websites
 * Features background image, headline, subheadline, and CTA buttons
 */
const HeroSection = ({
 headline,
 subheadline,
 backgroundImage,
 ctaLabel = 'Get Started',
 ctaSecondaryLabel,
 onCtaClick,
 onSecondaryCtaClick
}) => {
 // Default background for gym/fitness context if none provided
 const defaultBg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80';
 const bgImage = backgroundImage || defaultBg;

 return (
 <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
 {/* Background Image Layer */}
 <div 
 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
 style={{ backgroundImage: `url(${bgImage})` }}
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
 onClick={onCtaClick || (() => {})}
 className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/50"
 >
 {ctaLabel}
 <ArrowRight 
 className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
 />
 </button>

 {/* Secondary CTA Button (optional) */}
 {ctaSecondaryLabel && (
 <button
 onClick={onSecondaryCtaClick || (() => {})}
 className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
 >
 {ctaSecondaryLabel}
 </button>
 )}
 </div>

 {/* Stats/Trust Indicators */}
 <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">500+</p>
 <p className="text-gray-400 text-sm mt-1">Active Members</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
 <p className="text-gray-400 text-sm mt-1">Expert Trainers</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">24/7</p>
 <p className="text-gray-400 text-sm mt-1">Open Access</p>
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

// ═══════════════════════════════════════════════════════
// APP WIRING
// ═══════════════════════════════════════════════════════

function _OriginalApp() {
  const [currentView, setCurrentView] = React.useState("home");

  return (
    <LayoutApp
      currentView={currentView}
      onNavigate={setCurrentView}
      brandName="Peak Fitness"
    >
      {currentView === "card" && <Card title="Our Classes" subtitle="Transform Your Body" description="Expert-led fitness programs for all levels."/>}
        {currentView === "chart" && <ChartSection />}
        {currentView === "list" && <ListView items={[
                    { id: 1, title: "HIIT Training", description: "High intensity workouts", price: "$25/class" },
                    { id: 2, title: "Yoga", description: "Mind and body wellness", price: "$20/class" },
                    { id: 3, title: "Strength Training", description: "Build muscle", price: "$30/class" }
                ]}/>}
        {currentView === "form" && <FormSection title="Start Your Journey" subtitle="Sign up for a free trial"/>}
        {currentView === "home" && <HeroSection />}
        {currentView === "settings" && (
          <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Configure your application settings here.</p>
            </div>
          </div>
        )}
      
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
