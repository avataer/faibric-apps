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
 theme = { mode: 'light', primaryColor: '#1A5F7A' },
 sidebarCollapsed = false,
 onThemeChange
}) => {
 const [currentView, setCurrentView] = React.useState('home');
 const [formData, setFormData] = React.useState({
 name: '',
 email: '',
 phone: '',
 message: ''
 });
 const [errors, setErrors] = React.useState({});

 const isDark = theme.mode === 'dark';
 const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
 const textColor = isDark ? 'text-white' : 'text-gray-900';

 const practiceAreas = [
 {
 title: 'Corporate Law',
 description: 'Comprehensive legal solutions for businesses of all sizes.',
 icon: null
 },
 {
 title: 'Family Law',
 description: 'Compassionate guidance through complex family legal matters.',
 icon: null
 },
 {
 title: 'Criminal Defense',
 description: 'Aggressive representation and protection of your legal rights.',
 icon: null
 }
 ];

 const attorneys = [
 {
 name: 'Elizabeth Sterling',
 title: 'Managing Partner',
 bio: 'With 25 years of legal experience, Elizabeth leads our firm with expertise and integrity.',
 image: null
 },
 {
 name: 'Michael Rodriguez',
 title: 'Senior Associate',
 bio: 'Specialized in corporate litigation with a track record of successful outcomes.',
 image: null
 }
 ];

 const testimonials = [
 {
 quote: 'Sterling & Associates provided exceptional legal counsel during a challenging time.',
 name: 'John Davis',
 company: 'Tech Innovations Inc.'
 },
 {
 quote: 'Professional, empathetic, and truly committed to achieving the best results.',
 name: 'Sarah Thompson',
 company: 'Family Business Owner'
 }
 ];

 const handleChange = (field, value) => {
 setFormData(prev => ({ ...prev, [field]: value }));
 if (errors[field]) {
 setErrors(prev => ({ ...prev, [field]: null }));
 }
 };

 const validateForm = () => {
 const newErrors = {};
 if (!formData.name.trim()) newErrors.name = 'Name is required';
 if (!formData.email.trim()) newErrors.email = 'Email is required';
 if (!formData.message.trim()) newErrors.message = 'Message is required';
 
 setErrors(newErrors);
 return Object.keys(newErrors).length === 0;
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 if (validateForm()) {
 // Form submission logic would go here
 console.log('Form submitted', formData);
 }
 };

 return (
 <div className={`min-h-screen ${bgColor} ${textColor} font-sans`}>
 {/* Hero Section */}
 <header className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-24 px-6 text-center">
 <div className="max-w-4xl mx-auto">
 <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
 Sterling & Associates
 </h1>
 <p className="text-xl mb-10 text-gray-300">
 Trusted Legal Representation | Delivering Justice with Integrity
 </p>
 <button 
 className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 rounded-full hover:scale-105 transition-all"
 onClick={() => setCurrentView('contact')}
 >
 Schedule Consultation
 </button>
 </div>
 </header>

 {/* Practice Areas */}
 <section className="py-20 px-6 bg-white">
 <div className="max-w-6xl mx-auto">
 <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
 Our Practice Areas
 </h2>
 <div className="grid md:grid-cols-3 gap-8">
 {practiceAreas.map((area, index) => (
 <div 
 key={index} 
 className="bg-white shadow-xl rounded-2xl p-6 text-center hover:scale-105 transition-all"
 >
 <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
 {area.title}
 </h3>
 <p className="text-gray-600">
 {area.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Attorneys */}
 <section className="py-20 px-6 bg-gray-50">
 <div className="max-w-6xl mx-auto">
 <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
 Our Attorneys
 </h2>
 <div className="grid md:grid-cols-2 gap-8">
 {attorneys.map((attorney, index) => (
 <div 
 key={index} 
 className="bg-white shadow-xl rounded-2xl p-8 text-center hover:scale-105 transition-all"
 >
 <h3 className="text-2xl font-semibold text-indigo-700">
 {attorney.name}
 </h3>
 <p className="text-gray-600 mb-4">{attorney.title}</p>
 <p className="text-gray-500">{attorney.bio}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Testimonials */}
 <section className="py-20 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
 <div className="max-w-6xl mx-auto">
 <h2 className="text-4xl font-bold text-center mb-12">
 What Our Clients Say
 </h2>
 <div className="grid md:grid-cols-2 gap-8">
 {testimonials.map((testimonial, index) => (
 <div 
 key={index} 
 className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
 >
 <p className="italic mb-6">"{testimonial.quote}"</p>
 <div>
 <h4 className="font-semibold text-xl">{testimonial.name}</h4>
 <p className="text-gray-300">{testimonial.company}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Contact Form */}
 <section className="py-20 px-6 bg-white">
 <div className="max-w-2xl mx-auto">
 <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
 Schedule a Consultation
 </h2>
 <form onSubmit={handleSubmit} className="space-y-6">
 <div>
 <label className="block mb-2">Name</label>
 <input
 type="text"
 value={formData.name}
 onChange={(e) => handleChange('name', e.target.value)}
 className={`w-full px-4 py-3 rounded-lg border ${
 errors.name ? 'border-red-500' : 'border-gray-300'
 }`}
 placeholder="Your Full Name"
 />
 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
 </div>
 <div>
 <label className="block mb-2">Email</label>
 <input
 type="email"
 value={formData.email}
 onChange={(e) => handleChange('email', e.target.value)}
 className={`w-full px-4 py-3 rounded-lg border ${
 errors.email ? 'border-red-500' : 'border-gray-300'
 }`}
 placeholder="you@example.com"
 />
 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
 </div>
 <div>
 <label className="block mb-2">Message</label>
 <textarea
 value={formData.message}
 onChange={(e) => handleChange('message', e.target.value)}
 className={`w-full px-4 py-3 rounded-lg border ${
 errors.message ? 'border-red-500' : 'border-gray-300'
 }`}
 rows={4}
 placeholder="Describe your legal needs"
 />
 {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
 </div>
 <button
 type="submit"
 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-all"
 >
 Request Consultation
 </button>
 </form>
 </div>
 </section>
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
 { id: 'practice-areas', label: 'Practice Areas', icon: 'check' },
 { id: 'attorneys', label: 'Our Attorneys', icon: 'user' },
 { id: 'contact', label: 'Contact', icon: 'mail' }
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
 case 'user':
 return <User className="w-5 h-5" />;
 case 'mail':
 return <Mail className="w-5 h-5" />;
 default:
 return null;
 }
 };

 return (
 <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-gray-800">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center h-20">
 {/* Logo / Brand */}
 <div className="flex items-center">
 <div className="flex-shrink-0">
 <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-tight">
 Sterling & Associates
 </span>
 </div>
 </div>

 {/* Desktop Navigation */}
 <nav className="hidden md:flex space-x-6">
 {navItems.map((item) => (
 <button
 key={item.id}
 onClick={() => handleNavClick(item.id)}
 className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
 currentView === item.id
 ? 'bg-white/10 text-white ring-1 ring-white/20'
 : 'text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105'
 }`}
 >
 {item.icon && (
 <span className="mr-2 text-purple-300">{getIcon(item.icon)}</span>
 )}
 {item.label}
 </button>
 ))}
 </nav>

 {/* User Section */}
 <div className="hidden md:flex items-center space-x-4">
 {user ? (
 <div className="flex items-center space-x-3">
 <span className="text-sm text-gray-200">
 {user.name || user.email || 'User'}
 </span>
 <button
 onClick={handleLogoutClick}
 className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300"
 >
 Logout
 </button>
 </div>
 ) : (
 <span className="text-sm text-gray-400">Legal Consultation</span>
 )}
 </div>

 {/* Mobile Menu Button */}
 <div className="md:hidden">
 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="p-2 rounded-md text-gray-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
 aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
 >
 {mobileMenuOpen ? (
 <X className="w-6 h-6 text-white" />
 ) : (
 <Menu className="w-6 h-6 text-white" />
 )}
 </button>
 </div>
 </div>
 </div>

 {/* Mobile Menu */}
 {mobileMenuOpen && (
 <div className="md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-gray-800">
 <div className="px-2 pt-2 pb-3 space-y-2">
 {navItems.map((item) => (
 <button
 key={item.id}
 onClick={() => handleNavClick(item.id)}
 className={`flex items-center w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
 currentView === item.id
 ? 'bg-white/10 text-white ring-1 ring-white/20'
 : 'text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105'
 }`}
 >
 {item.icon && (
 <span className="mr-3 text-purple-300">{getIcon(item.icon)}</span>
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

// ── HeroSection ──

// AUTO-GENERATED STUBS for undefined components

const ChevronDown = ({ children, ...props }) => (
  <div className="p-4 border rounded" {...props}>
    {children || <span>ChevronDown</span>}
  </div>
);


const HeroSection = ({
 headline = 'Trusted Legal Representation for Your Toughest Challenges',
 subheadline = 'Sterling & Associates: Committed to Protecting Your Rights with Expertise and Compassion',
 backgroundImage = 'https://images.unsplash.com/photo-1589847262700-0d404e227781?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
 ctaLabel = 'Schedule Consultation',
 ctaSecondaryLabel = 'Learn More',
 onCtaClick,
 onSecondaryCtaClick
}) => {
 return (
 <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
 {/* Background Image Layer */}
 <div 
 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
 style={{ backgroundImage: `url(${backgroundImage})` }}
 aria-hidden="true"
 />
 
 {/* Dark Overlay with Sophisticated Gradient */}
 <div 
 className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80 backdrop-blur-sm"
 aria-hidden="true"
 />

 {/* Content Container */}
 <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
 {/* Main Headline with Gradient Text */}
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
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
 {/* Primary CTA Button with Gradient and Hover Effects */}
 <button
 onClick={onCtaClick || (() => {})}
 className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-600/50"
 >
 {ctaLabel}
 <ArrowRight 
 className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
 />
 </button>

 {/* Secondary CTA Button */}
 {ctaSecondaryLabel && (
 <button
 onClick={onSecondaryCtaClick || (() => {})}
 className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
 >
 {ctaSecondaryLabel}
 </button>
 )}
 </div>

 {/* Trust Indicators */}
 <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">25+</p>
 <p className="text-gray-400 text-sm mt-1">Years of Experience</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">500+</p>
 <p className="text-gray-400 text-sm mt-1">Successful Cases</p>
 </div>
 <div className="text-center">
 <p className="text-3xl md:text-4xl font-bold text-white">98%</p>
 <p className="text-gray-400 text-sm mt-1">Client Satisfaction</p>
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

// ── Footer ──
const Footer = ({
 fields = [],
 initialValues = {},
 loading = false,
 submitLabel = 'Request Consultation',
 onSubmit,
 onChange,
 onValidationError
}) => {
 const [values, setValues] = React.useState(initialValues);
 const [errors, setErrors] = React.useState({});
 const [touched, setTouched] = React.useState({});

 React.useEffect(() => {
 setValues(initialValues);
 setErrors({});
 setTouched({});
 }, [initialValues]);

 const validateField = (field, value) => {
 const fieldErrors = [];
 
 if (field.required && (!value || value.toString().trim() === '')) {
 fieldErrors.push(`${field.label || field.name} is required`);
 }
 
 if (field.minLength && value && value.length < field.minLength) {
 fieldErrors.push(`${field.label || field.name} must be at least ${field.minLength} characters`);
 }
 
 if (field.maxLength && value && value.length > field.maxLength) {
 fieldErrors.push(`${field.label || field.name} must be less than ${field.maxLength} characters`);
 }
 
 if (field.type === 'email' && value) {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(value)) {
 fieldErrors.push('Please enter a valid email address');
 }
 }
 
 if (field.pattern && value) {
 const regex = new RegExp(field.pattern);
 if (!regex.test(value)) {
 fieldErrors.push(field.patternMessage || 'Invalid format');
 }
 }
 
 return fieldErrors;
 };

 const validateForm = () => {
 const newErrors = {};
 let isValid = true;
 
 fields.forEach(field => {
 const fieldErrors = validateField(field, values[field.name]);
 if (fieldErrors.length > 0) {
 newErrors[field.name] = fieldErrors;
 isValid = false;
 }
 });
 
 setErrors(newErrors);
 return isValid;
 };

 const handleInputChange = (fieldName, value) => {
 const newValues = { ...values, [fieldName]: value };
 setValues(newValues);
 
 if (errors[fieldName]) {
 setErrors(prev => ({ ...prev, [fieldName]: null }));
 }
 
 if (onChange) {
 onChange({ field: fieldName, value, allValues: newValues });
 }
 };

 const handleBlur = (field) => {
 setTouched(prev => ({ ...prev, [field.name]: true }));
 const fieldErrors = validateField(field, values[field.name]);
 if (fieldErrors.length > 0) {
 setErrors(prev => ({ ...prev, [field.name]: fieldErrors }));
 }
 };

 const handleFormSubmit = (e) => {
 e.preventDefault();
 
 const allTouched = {};
 fields.forEach(field => {
 allTouched[field.name] = true;
 });
 setTouched(allTouched);
 
 const isValid = validateForm();
 
 if (!isValid) {
 if (onValidationError) {
 onValidationError(errors);
 }
 return;
 }
 
 if (onSubmit) {
 onSubmit(values);
 }
 };

 const renderInput = (field) => {
 const commonProps = {
 id: field.name,
 name: field.name,
 value: values[field.name] || '',
 onChange: (e) => handleInputChange(field.name, e.target.value),
 onBlur: () => handleBlur(field),
 placeholder: field.placeholder || '',
 disabled: loading || field.disabled,
 className: `w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
 errors[field.name] && touched[field.name]
 ? 'border-red-500 focus:ring-red-500'
 : 'border-gray-300 hover:border-indigo-400'
 } ${loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`
 };

 switch (field.type) {
 case 'textarea':
 return (
 <textarea
 {...commonProps}
 rows={field.rows || 4}
 className={`${commonProps.className} resize-none`}
 />
 );
 
 case 'select':
 return (
 <select {...commonProps} className={`${commonProps.className} appearance-none`}>
 <option value="">{field.placeholder || 'Select an option'}</option>
 {(field.options || []).map(option => (
 <option key={option.value} value={option.value}>
 {option.label}
 </option>
 ))}
 </select>
 );
 
 case 'checkbox':
 return (
 <div className="flex items-center space-x-2">
 <input
 type="checkbox"
 id={field.name}
 name={field.name}
 checked={values[field.name] || false}
 onChange={(e) => handleInputChange(field.name, e.target.checked)}
 disabled={loading || field.disabled}
 className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
 />
 {field.checkboxLabel && (
 <label htmlFor={field.name} className="text-sm text-gray-700">
 {field.checkboxLabel}
 </label>
 )}
 </div>
 );
 
 default:
 return (
 <input
 {...commonProps}
 type={field.type || 'text'}
 />
 );
 }
 };

 return (
 <form 
 onSubmit={handleFormSubmit} 
 className="space-y-6 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
 >
 {fields.map(field => (
 <div key={field.name} className="space-y-2">
 {field.label && field.type !== 'checkbox' && (
 <label 
 htmlFor={field.name}
 className="block text-sm font-semibold text-gray-800"
 >
 {field.label}
 {field.required && <span className="text-red-500 ml-1">*</span>}
 </label>
 )}
 
 {renderInput(field)}
 
 {field.description && (
 <p className="text-xs text-gray-500">{field.description}</p>
 )}
 
 {errors[field.name] && touched[field.name] && (
 <div className="flex items-center space-x-2 text-sm text-red-600">
 <X className="w-4 h-4 flex-shrink-0" />
 <span>{errors[field.name][0]}</span>
 </div>
 )}
 </div>
 ))}
 
 <div className="pt-4">
 <button
 type="submit"
 disabled={loading}
 className={`w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
 loading
 ? 'bg-gray-400 cursor-not-allowed'
 : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
 }`}
 >
 {loading ? (
 <span className="animate-pulse">Processing...</span>
 ) : (
 <>
 <Check className="w-5 h-5 mr-2" />
 {submitLabel}
 </>
 )}
 </button>
 </div>
 </form>
 );
};

// ── Card ──
const Card = ({
 title,
 subtitle = '',
 image = '',
 data = {},
 loading = false,
 onClick,
 onAction
}) => {
 const {
 practice = 'General Practice',
 expertise = 'Legal Services',
 rating = 5,
 contact = null
 } = data;

 if (loading) {
 return (
 <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 animate-pulse">
 <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
 </div>
 );
 }

 const handleCardClick = () => {
 if (onClick) {
 onClick({ title, subtitle, data });
 }
 };

 const handleConsultation = (e) => {
 e.stopPropagation();
 if (onAction) {
 onAction({ type: 'consultation', item: { title, subtitle, data } });
 }
 };

 return (
 <div
 className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
 onClick={handleCardClick}
 role="button"
 tabIndex={0}
 aria-label={`Practice Area: ${title}`}
 >
 {image && (
 <div className="w-full h-48 overflow-hidden rounded-t-2xl">
 <img 
 src={image} 
 alt={title}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
 />
 </div>
 )}

 <div className="p-6">
 <div className="flex items-center justify-between mb-4">
 <span 
 className="text-sm px-3 py-1 rounded-full font-medium bg-purple-100 text-purple-700"
 >
 {practice}
 </span>

 <div className="flex items-center text-yellow-500">
 {[...Array(rating)].map((_, i) => (
 <span key={i} className="text-xl">★</span>
 ))}
 </div>
 </div>

 <h3 
 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-purple-700 transition-colors"
 >
 {title}
 </h3>

 {subtitle && (
 <p className="text-gray-600 mb-4 line-clamp-3">
 {subtitle}
 </p>
 )}

 <div className="mt-4 flex items-center justify-between">
 {contact && (
 <div className="flex items-center gap-2 text-gray-600">
 <Phone className="w-4 h-4" />
 <span className="text-sm">{contact}</span>
 </div>
 )}

 <button
 onClick={handleConsultation}
 className="ml-auto flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
 >
 <span className="text-sm font-semibold">Request Consultation</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 </div>
 </div>
 );
};

// ── FormSection ──
const FormSection = ({
 fields = [],
 initialValues = {},
 loading = false,
 submitLabel = 'Request Consultation',
 onSubmit,
 onChange,
 onValidationError
}) => {
 const [values, setValues] = React.useState(initialValues);
 const [errors, setErrors] = React.useState({});
 const [touched, setTouched] = React.useState({});

 React.useEffect(() => {
 setValues(initialValues);
 setErrors({});
 setTouched({});
 }, [initialValues]);

 const validateField = (field, value) => {
 const fieldErrors = [];
 
 if (field.required && (!value || value.toString().trim() === '')) {
 fieldErrors.push(`${field.label || field.name} is required`);
 }
 
 if (field.minLength && value && value.length < field.minLength) {
 fieldErrors.push(`${field.label || field.name} must be at least ${field.minLength} characters`);
 }
 
 if (field.maxLength && value && value.length > field.maxLength) {
 fieldErrors.push(`${field.label || field.name} must be less than ${field.maxLength} characters`);
 }
 
 if (field.type === 'email' && value) {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(value)) {
 fieldErrors.push('Please enter a valid email address');
 }
 }
 
 if (field.pattern && value) {
 const regex = new RegExp(field.pattern);
 if (!regex.test(value)) {
 fieldErrors.push(field.patternMessage || 'Invalid format');
 }
 }
 
 return fieldErrors;
 };

 const validateForm = () => {
 const newErrors = {};
 let isValid = true;
 
 fields.forEach(field => {
 const fieldErrors = validateField(field, values[field.name]);
 if (fieldErrors.length > 0) {
 newErrors[field.name] = fieldErrors;
 isValid = false;
 }
 });
 
 setErrors(newErrors);
 return isValid;
 };

 const handleInputChange = (fieldName, value) => {
 const newValues = { ...values, [fieldName]: value };
 setValues(newValues);
 
 if (errors[fieldName]) {
 setErrors(prev => ({ ...prev, [fieldName]: null }));
 }
 
 if (onChange) {
 onChange({ field: fieldName, value, allValues: newValues });
 }
 };

 const handleBlur = (field) => {
 setTouched(prev => ({ ...prev, [field.name]: true }));
 const fieldErrors = validateField(field, values[field.name]);
 if (fieldErrors.length > 0) {
 setErrors(prev => ({ ...prev, [field.name]: fieldErrors }));
 }
 };

 const handleFormSubmit = (e) => {
 e.preventDefault();
 
 const allTouched = {};
 fields.forEach(field => {
 allTouched[field.name] = true;
 });
 setTouched(allTouched);
 
 const isValid = validateForm();
 
 if (!isValid) {
 if (onValidationError) {
 onValidationError(errors);
 }
 return;
 }
 
 if (onSubmit) {
 onSubmit(values);
 }
 };

 const renderInput = (field) => {
 const commonProps = {
 id: field.name,
 name: field.name,
 value: values[field.name] || '',
 onChange: (e) => handleInputChange(field.name, e.target.value),
 onBlur: () => handleBlur(field),
 placeholder: field.placeholder || '',
 disabled: loading || field.disabled,
 className: `w-full px-4 py-3 border rounded-xl bg-white/10 backdrop-blur-sm text-white border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
 errors[field.name] && touched[field.name]
 ? 'border-red-500 focus:ring-red-500'
 : 'border-white/20'
 } ${loading ? 'bg-gray-800 cursor-not-allowed' : 'bg-white/10'}`
 };

 switch (field.type) {
 case 'textarea':
 return (
 <textarea
 {...commonProps}
 rows={field.rows || 3}
 className={`${commonProps.className} min-h-[120px]`}
 />
 );
 
 case 'select':
 return (
 <select {...commonProps} className={`${commonProps.className} appearance-none`}>
 <option value="" className="bg-gray-900 text-white">{field.placeholder || 'Select an option'}</option>
 {(field.options || []).map(option => (
 <option key={option.value} value={option.value} className="bg-gray-900 text-white">
 {option.label}
 </option>
 ))}
 </select>
 );
 
 case 'checkbox':
 return (
 <div className="flex items-center">
 <input
 type="checkbox"
 id={field.name}
 name={field.name}
 checked={values[field.name] || false}
 onChange={(e) => handleInputChange(field.name, e.target.checked)}
 disabled={loading || field.disabled}
 className="w-5 h-5 text-purple-600 border-white/20 rounded-md focus:ring-purple-500 bg-white/10"
 />
 {field.checkboxLabel && (
 <label htmlFor={field.name} className="ml-3 text-sm text-gray-300">
 {field.checkboxLabel}
 </label>
 )}
 </div>
 );
 
 default:
 return (
 <input
 {...commonProps}
 type={field.type || 'text'}
 />
 );
 }
 };

 return (
 <form onSubmit={handleFormSubmit} className="space-y-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 rounded-2xl shadow-2xl">
 {fields.map(field => (
 <div key={field.name} className="space-y-2">
 {field.label && field.type !== 'checkbox' && (
 <label 
 htmlFor={field.name}
 className="block text-sm font-medium text-gray-300"
 >
 {field.label}
 {field.required && <span className="text-red-500 ml-1">*</span>}
 </label>
 )}
 
 {renderInput(field)}
 
 {field.description && (
 <p className="text-xs text-gray-400">{field.description}</p>
 )}
 
 {errors[field.name] && touched[field.name] && (
 <div className="flex items-start space-x-2 text-sm text-red-400">
 <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
 <span>{errors[field.name][0]}</span>
 </div>
 )}
 </div>
 ))}
 
 <div className="pt-6">
 <button
 type="submit"
 disabled={loading}
 className={`w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
 loading
 ? 'bg-purple-800 cursor-not-allowed'
 : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
 }`}
 >
 {loading ? (
 <>
 <span className="animate-pulse">Processing...</span>
 </>
 ) : (
 <>
 <Check className="w-5 h-5 mr-2" />
 {submitLabel}
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
      brandName="Legal Partners"
    >
      {currentView === "home" && <HeroSection />}
        {currentView === "card" && <Card title="Practice Areas" subtitle="Expert Legal Services" description="Dedicated representation for your legal needs."/>}
        {currentView === "form" && <FormSection title="Free Case Evaluation" subtitle="Get expert legal advice"/>}
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
