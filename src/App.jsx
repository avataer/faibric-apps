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

const ChevronUp = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const ChevronDown = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ArrowLeft = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
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

const Briefcase = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const Users = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Scale = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"></path>
    <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"></path>
    <path d="M7 21h10"></path>
    <path d="M12 3v18"></path>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
  </svg>
);

const Scales = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"></path>
    <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"></path>
    <path d="M7 21h10"></path>
    <path d="M12 3v18"></path>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
  </svg>
);

const Heart = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const Scissors = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
  </svg>
);

const Award = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const Shield = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const Gavel = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2.5l5 5-1.5 1.5-5-5 1.5-1.5z"></path>
    <path d="M8.5 8.5l5 5-1.5 1.5-5-5 1.5-1.5z"></path>
    <path d="M3 21l4-4"></path>
    <path d="M21 11l-8 8-4-4 8-8 4 4z"></path>
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
const LayoutApp = () => {
 const [currentView, setCurrentView] = React.useState("home");

 const handleNavigate = (viewId) => {
 setCurrentView(viewId);
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 // Form submission logic
 };

 const practiceAreas = [
 {
 title: "Personal Injury",
 description: "Aggressive representation for accident and injury claims",
 icon: null
 },
 {
 title: "Family Law",
 description: "Compassionate legal support for family disputes",
 icon: null
 },
 {
 title: "Business Law",
 description: "Strategic legal guidance for corporate challenges",
 icon: null
 },
 {
 title: "Estate Planning",
 description: "Comprehensive estate and legacy protection",
 icon: null
 }
 ];

 return (
 <div className="min-h-screen bg-slate-50">
 {/* Navigation */}
 <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
 <nav className="container mx-auto flex justify-between items-center py-4 px-6">
 <div className="text-2xl font-bold text-indigo-600">Johnson Legal Group</div>
 <div className="flex space-x-6">
 <button 
 onClick={() => handleNavigate("home")} 
 className="text-slate-700 hover:text-indigo-600 transition-colors"
 >
 Home
 </button>
 <button 
 onClick={() => handleNavigate("services")} 
 className="text-slate-700 hover:text-indigo-600 transition-colors"
 >
 Services
 </button>
 <button 
 onClick={() => handleNavigate("about")} 
 className="text-slate-700 hover:text-indigo-600 transition-colors"
 >
 About
 </button>
 <button 
 onClick={() => handleNavigate("contact")} 
 className="text-slate-700 hover:text-indigo-600 transition-colors"
 >
 Contact
 </button>
 </div>
 </nav>
 </header>

 {/* Hero Section */}
 <section 
 className="min-h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
 style={{backgroundImage: "url('https://picsum.photos/seed/lawfirm/1920/1080')"}}
 >
 <div className="container mx-auto px-6">
 <h1 className="text-5xl font-bold mb-4">Trusted Legal Representation</h1>
 <p className="text-xl max-w-2xl mx-auto mb-8">
 Dedicated attorneys providing exceptional legal services with compassion and expertise
 </p>
 <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-slate-100 transition-all">
 Schedule Consultation
 </button>
 </div>
 </section>

 {/* Practice Areas */}
 <section className="container mx-auto py-16 px-6">
 <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Our Practice Areas</h2>
 <div className="grid md:grid-cols-4 gap-6">
 {practiceAreas.map((area, index) => (
 <div 
 key={index} 
 className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-all duration-300"
 >
 <div className="text-indigo-600 text-4xl mb-4 flex justify-center">
 {area.icon || <Home />}
 </div>
 <h3 className="text-xl font-bold mb-3">{area.title}</h3>
 <p className="text-slate-600">{area.description}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Contact Form */}
 <section className="bg-slate-100 py-16">
 <div className="container mx-auto px-6">
 <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Contact Us</h2>
 <form 
 onSubmit={handleSubmit} 
 className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8"
 >
 <div className="grid md:grid-cols-2 gap-4">
 <input 
 type="text" 
 placeholder="Full Name" 
 className="w-full p-3 border border-slate-300 rounded-lg"
 />
 <input 
 type="email" 
 placeholder="Email Address" 
 className="w-full p-3 border border-slate-300 rounded-lg"
 />
 </div>
 <input 
 type="tel" 
 placeholder="Phone Number" 
 className="w-full p-3 border border-slate-300 rounded-lg my-4"
 />
 <textarea 
 placeholder="Your Message" 
 rows="4" 
 className="w-full p-3 border border-slate-300 rounded-lg"
 ></textarea>
 <button 
 type="submit" 
 className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
 >
 Send Message
 </button>
 </form>
 </div>
 </section>

 {/* Footer */}
 <footer className="bg-slate-900 text-white py-12">
 <div className="container mx-auto px-6 text-center">
 <div className="text-2xl font-bold mb-4">Johnson Legal Group</div>
 <p className="mb-6">Committed to Justice, Dedicated to You</p>
 <div className="flex justify-center space-x-6 mb-8">
 <Mail className="text-white hover:text-indigo-400" />
 <Phone className="text-white hover:text-indigo-400" />
 </div>
 <p className="text-sm">© {new Date().getFullYear()} Johnson Legal Group. All Rights Reserved.</p>
 </div>
 </footer>
 </div>
 );
};

// ── Navigation ──
const Navigation = ({
 logo = null,
 logoText = "Johnson Legal Group",
 navItems = [
 { label: "Home", href: "#home" },
 { label: "Services", href: "#services" },
 { label: "About", href: "#about" },
 { label: "Contact", href: "#contact" }
 ],
 ctaButton = { label: "Free Consultation", href: "#contact" },
 className = "",
 sticky = true
}) => {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

 const toggleMobileMenu = () => {
 setIsMobileMenuOpen(!isMobileMenuOpen);
 };

 return (
 <header
 className={`
 w-full bg-white shadow-lg z-50 transition-all duration-300
 ${sticky ? "sticky top-0" : "relative"}
 ${className}
 `}
 >
 <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-20">
 <div className="flex-shrink-0">
 <a href="/" className="flex items-center">
 {logo ? (
 logo
 ) : (
 <span className="text-2xl font-bold text-indigo-600">
 {logoText}
 </span>
 )}
 </a>
 </div>

 <div className="hidden md:flex md:items-center md:space-x-8">
 {navItems.map((item, index) => (
 <a
 key={index}
 href={item.href}
 className="text-gray-800 hover:text-indigo-600 font-medium transition-colors duration-200"
 >
 {item.label}
 </a>
 ))}
 </div>

 {ctaButton && (
 <div className="hidden md:block">
 <a
 href={ctaButton.href}
 className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all duration-200 shadow-md hover:shadow-xl"
 >
 {ctaButton.label}
 </a>
 </div>
 )}

 <div className="md:hidden">
 <button
 type="button"
 onClick={toggleMobileMenu}
 className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
 aria-expanded={isMobileMenuOpen}
 >
 <span className="sr-only">Open main menu</span>
 {!isMobileMenuOpen ? (
 <Menu className="h-6 w-6" />
 ) : (
 <X className="h-6 w-6" />
 )}
 </button>
 </div>
 </div>

 <div
 className={`
 md:hidden overflow-hidden transition-all duration-300 ease-in-out
 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
 `}
 >
 <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-100">
 {navItems.map((item, index) => (
 <a
 key={index}
 href={item.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
 >
 {item.label}
 </a>
 ))}
 {ctaButton && (
 <a
 href={ctaButton.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className="block w-full text-center mt-4 px-4 py-2.5 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
 >
 {ctaButton.label}
 </a>
 )}
 </div>
 </div>
 </nav>
 </header>
 );
};

// ── Card ──
const Card = () => {
 const [currentView, setCurrentView] = React.useState("home");

 const practiceAreas = [
 {
 title: "Personal Injury",
 description: "Compassionate representation for accident and injury victims",
 icon: null
 },
 {
 title: "Family Law",
 description: "Supportive legal guidance through divorce and custody matters",
 icon: null
 },
 {
 title: "Business Law",
 description: "Strategic legal solutions for corporate and entrepreneurial needs",
 icon: null
 },
 {
 title: "Estate Planning",
 description: "Comprehensive estate planning and asset protection",
 icon: null
 }
 ];

 const handleNavigate = (view) => {
 setCurrentView(view);
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 // Form submission logic
 };

 return (
 <div className="min-h-screen bg-gray-50">
 {/* Navigation */}
 <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
 <div className="container mx-auto flex justify-between items-center p-4">
 <div className="text-2xl font-bold">Justice & Partners Law Firm</div>
 <div className="flex space-x-6">
 <button onClick={() => handleNavigate("home")} className="hover:text-gray-200">Home</button>
 <button onClick={() => handleNavigate("services")} className="hover:text-gray-200">Services</button>
 <button onClick={() => handleNavigate("about")} className="hover:text-gray-200">About</button>
 <button onClick={() => handleNavigate("contact")} className="hover:text-gray-200">Contact</button>
 </div>
 </div>
 </nav>

 {/* Hero Section */}
 <header 
 className="min-h-[500px] bg-cover bg-center flex items-center justify-center text-white"
 style={{backgroundImage: "url('https://picsum.photos/seed/lawfirm/1920/1080')"}}
 >
 <div className="text-center bg-black/60 p-12 rounded-xl">
 <h1 className="text-5xl font-bold mb-4">Protecting Your Rights, Pursuing Justice</h1>
 <p className="text-xl mb-6">Experienced Legal Representation You Can Trust</p>
 <button 
 className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg transition-all duration-300"
 onClick={() => handleNavigate("contact")}
 >
 Schedule Consultation
 </button>
 </div>
 </header>

 {/* Practice Areas */}
 <section className="container mx-auto py-16 px-4">
 <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Practice Areas</h2>
 <div className="grid md:grid-cols-4 gap-6">
 {practiceAreas.map((area, index) => (
 <div 
 key={index} 
 className="bg-white shadow-xl rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
 >
 <h3 className="text-xl font-semibold mb-4 text-indigo-700">{area.title}</h3>
 <p className="text-gray-600">{area.description}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Contact Form */}
 <section className="bg-gray-100 py-16">
 <div className="container mx-auto px-4">
 <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
 <form 
 onSubmit={handleSubmit} 
 className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8"
 >
 <div className="grid md:grid-cols-2 gap-4">
 <input 
 type="text" 
 placeholder="Your Name" 
 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
 />
 <input 
 type="email" 
 placeholder="Email Address" 
 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
 />
 </div>
 <input 
 type="tel" 
 placeholder="Phone Number" 
 className="w-full p-3 border rounded-lg mt-4 focus:ring-2 focus:ring-indigo-500"
 />
 <textarea 
 placeholder="Your Message" 
 className="w-full p-3 border rounded-lg mt-4 h-32 focus:ring-2 focus:ring-indigo-500"
 />
 <button 
 type="submit" 
 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mt-4 transition-colors"
 >
 Send Message
 </button>
 </form>
 </div>
 </section>

 {/* Footer */}
 <footer className="bg-gray-900 text-white py-12">
 <div className="container mx-auto text-center">
 <p>&copy; 2024 Justice & Partners Law Firm. All Rights Reserved.</p>
 </div>
 </footer>
 </div>
 );
};

// ── ListView ──
const ListView = () => {
 const [currentView, setCurrentView] = React.useState("home");

 const practiceAreas = [
 {
 title: "Personal Injury",
 description: "Compassionate legal support for accident and injury victims",
 icon: null
 },
 {
 title: "Family Law",
 description: "Dedicated guidance through divorce, custody, and family disputes",
 icon: null
 },
 {
 title: "Business Law",
 description: "Strategic legal solutions for businesses of all sizes",
 icon: null
 },
 {
 title: "Estate Planning",
 description: "Comprehensive legal protection for your family's future",
 icon: null
 }
 ];

 const handleNavigate = (view) => {
 setCurrentView(view);
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 // Form submission logic
 };

 return (
 <div className="min-h-screen bg-gray-50">
 {/* Navigation */}
 <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-4 shadow-lg">
 <div className="container mx-auto flex justify-between items-center px-6">
 <div className="text-2xl font-bold">Pinnacle Law Group</div>
 <div className="flex space-x-6">
 <button 
 onClick={() => handleNavigate("home")} 
 className="hover:text-gray-200 transition-colors"
 >
 Home
 </button>
 <button 
 onClick={() => handleNavigate("services")} 
 className="hover:text-gray-200 transition-colors"
 >
 Services
 </button>
 <button 
 onClick={() => handleNavigate("about")} 
 className="hover:text-gray-200 transition-colors"
 >
 About
 </button>
 <button 
 onClick={() => handleNavigate("contact")} 
 className="hover:text-gray-200 transition-colors"
 >
 Contact
 </button>
 </div>
 </div>
 </nav>

 {/* Hero Section */}
 <header 
 className="min-h-[600px] bg-cover bg-center relative flex items-center"
 style={{backgroundImage: "url('https://picsum.photos/seed/lawfirm/1920/1080')"}}
 >
 <div className="absolute inset-0 bg-black/60"></div>
 <div className="container mx-auto relative z-10 text-white px-6">
 <h1 className="text-5xl font-bold mb-4">Protecting Your Rights, Pursuing Justice</h1>
 <p className="text-xl max-w-2xl mb-8">
 Expert legal representation with compassion and commitment
 </p>
 <button 
 className="bg-white text-indigo-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
 onClick={() => handleNavigate("contact")}
 >
 Contact Us
 </button>
 </div>
 </header>

 {/* Practice Areas */}
 <section className="container mx-auto py-16 px-6">
 <h2 className="text-4xl font-bold text-center mb-12">Our Practice Areas</h2>
 <div className="grid md:grid-cols-4 gap-6">
 {practiceAreas.map((area, index) => (
 <div 
 key={index} 
 className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-all duration-300"
 >
 <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
 <p className="text-gray-600 mb-4">{area.description}</p>
 <button 
 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
 onClick={() => handleNavigate(area.title.toLowerCase().replace(" ", "-"))}
 >
 Learn More
 </button>
 </div>
 ))}
 </div>
 </section>

 {/* Contact Form */}
 <section className="bg-gray-100 py-16">
 <div className="container mx-auto px-6">
 <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
 <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
 <form onSubmit={handleSubmit}>
 <div className="grid md:grid-cols-2 gap-6">
 <input 
 type="text" 
 placeholder="Your Name" 
 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
 />
 <input 
 type="email" 
 placeholder="Your Email" 
 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
 />
 </div>
 <input 
 type="tel" 
 placeholder="Phone Number" 
 className="w-full p-3 border rounded-lg mt-6 focus:ring-2 focus:ring-indigo-500 outline-none"
 />
 <textarea 
 placeholder="Your Message" 
 rows="4" 
 className="w-full p-3 border rounded-lg mt-6 focus:ring-2 focus:ring-indigo-500 outline-none"
 ></textarea>
 <button 
 type="submit" 
 className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition-colors"
 >
 Send Message
 </button>
 </form>
 </div>
 </div>
 </section>

 {/* Footer */}
 <footer className="bg-gray-900 text-white py-12">
 <div className="container mx-auto px-6 text-center">
 <p>&copy; 2024 Pinnacle Law Group. All Rights Reserved.</p>
 </div>
 </footer>
 </div>
 );
};

// ── FormSection ──

// AUTO-GENERATED STUBS for undefined components

const ReusableForm = ({ children, ...props }) => (
  <div className="p-4 border rounded" {...props}>
    {children || <span>ReusableForm</span>}
  </div>
);


const FormSection = () => {
 const [isSubmitting, setIsSubmitting] = React.useState(false);
 const [submitSuccess, setSubmitSuccess] = React.useState(false);

 const contactFields = [
 {
 name: "name",
 label: "Full Name",
 type: "text",
 placeholder: "John Doe",
 required: true
 },
 {
 name: "email",
 label: "Email Address", 
 type: "email",
 placeholder: "john@lawfirm.com",
 required: true
 },
 {
 name: "phone",
 label: "Phone Number",
 type: "tel",
 placeholder: "(555) 123-4567",
 required: true
 },
 {
 name: "message",
 label: "Legal Inquiry",
 type: "textarea", 
 placeholder: "Briefly describe your legal matter...",
 required: true,
 rows: 5
 }
 ];

 const handleContactSubmit = async (values) => {
 setIsSubmitting(true);
 setSubmitSuccess(false);
 
 await new Promise((resolve) => setTimeout(resolve, 1500));
 
 setIsSubmitting(false);
 setSubmitSuccess(true);
 
 setTimeout(() => setSubmitSuccess(false), 3000);
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 flex items-center justify-center">
 <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
 <div className="text-center mb-8">
 <h1 className="text-3xl font-bold text-indigo-800 mb-3">Carter & Associates</h1>
 <p className="text-gray-600">Professional Legal Consultation</p>
 </div>

 {submitSuccess && (
 <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
 Thank you! Our legal team will contact you shortly.
 </div>
 )}
 
 <ReusableForm
 fields={contactFields}
 onSubmit={handleContactSubmit}
 title="Schedule a Consultation"
 description="Have a legal question? We're here to help."
 submitLabel="Request Consultation"
 isLoading={isSubmitting}
 className="w-full"
 />
 </div>
 </div>
 );
};

// ── Gallery ──
const Gallery = ({
 items = [],
 columns = 3,
 showAllFilter = true,
 allFilterLabel = "All Services",
 onItemClick,
 className = '',
 filters}) => {
 const [activeFilter, setActiveFilter] = React.useState("all");

 const practiceAreas = [
 {
 id: 1,
 title: "Personal Injury",
 description: "Compassionate legal representation for accident victims",
 category: "Litigation",
 src: "https://picsum.photos/seed/injury-law/800/600",
 alt: "Personal Injury Legal Services"
 },
 {
 id: 2,
 title: "Family Law",
 description: "Supportive guidance through challenging family transitions",
 category: "Family",
 src: "https://picsum.photos/seed/family-law/800/600",
 alt: "Family Legal Support"
 },
 {
 id: 3,
 title: "Business Law",
 description: "Strategic legal solutions for corporate challenges",
 category: "Corporate",
 src: "https://picsum.photos/seed/business-law/800/600",
 alt: "Business Legal Services"
 },
 {
 id: 4,
 title: "Estate Planning",
 description: "Protecting your legacy and securing your family's future",
 category: "Planning",
 src: "https://picsum.photos/seed/estate-planning/800/600",
 alt: "Estate Planning Legal Services"
 }
 ];

 const filterOptions = [
 { label: "All Services", value: "all" },
 { label: "Litigation", value: "Litigation" },
 { label: "Family", value: "Family" },
 { label: "Corporate", value: "Corporate" },
 { label: "Planning", value: "Planning" }
 ];

 const filteredItems = activeFilter === "all" 
 ? practiceAreas 
 : practiceAreas.filter(item => item.category === activeFilter);

 const gridCols = {
 2: "grid-cols-1 sm:grid-cols-2",
 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
 4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
 };

 return (
 <div className="container mx-auto px-4 py-12 bg-gray-50">
 <h2 className="text-4xl font-bold text-center text-slate-800 mb-10">
 Our Practice Areas
 </h2>
 
 <div className="flex flex-wrap gap-2 mb-8 justify-center">
 {filterOptions.map((filter) => (
 <button
 key={filter.value}
 onClick={() => setActiveFilter(filter.value)}
 className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
 activeFilter === filter.value
 ? "bg-indigo-600 text-white shadow-lg"
 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
 }`}
 >
 {filter.label}
 </button>
 ))}
 </div>

 <div className={`grid ${gridCols[columns]} gap-6`}>
 {filteredItems.map((item) => (
 <div
 key={item.id}
 onClick={() => onItemClick?.(item)}
 className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:scale-105 transition-all duration-300"
 >
 <img
 src={item.src}
 alt={item.alt}
 className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
 loading="lazy"
 />
 
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
 <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
 <h3 className="font-semibold text-xl truncate">{item.title}</h3>
 <p className="text-sm text-gray-200 line-clamp-2 mt-1">
 {item.description}
 </p>
 <span className="inline-block mt-2 text-xs bg-white/20 px-2 py-1 rounded">
 {item.category}
 </span>
 </div>
 </div>
 </div>
 ))}
 </div>

 {filteredItems.length === 0 && (
 <div className="text-center py-12 text-gray-500">
 <p>No services found in this category</p>
 </div>
 )}
 </div>
 );
};

// ── Footer ──
const Footer = ({
 companyName = "Roberts & Associates Law Firm",
 description = "Dedicated legal professionals providing compassionate, strategic representation across multiple practice areas.",
 sections = [
 {
 title: "Practice Areas",
 links: [
 { label: "Personal Injury", href: "/services/personal-injury" },
 { label: "Family Law", href: "/services/family-law" },
 { label: "Business Law", href: "/services/business-law" },
 { label: "Estate Planning", href: "/services/estate-planning" }
 ]
 },
 {
 title: "About Us",
 links: [
 { label: "Our Team", href: "/about/team" },
 { label: "Attorneys", href: "/about/attorneys" },
 { label: "Firm History", href: "/about/history" },
 { label: "Community Involvement", href: "/about/community" }
 ]
 },
 {
 title: "Client Resources",
 links: [
 { label: "FAQs", href: "/resources/faqs" },
 { label: "Legal Guides", href: "/resources/guides" },
 { label: "Consultations", href: "/resources/consultations" },
 { label: "Client Portal", href: "/resources/portal" }
 ]
 }
 ],
 socialLinks = [
 { 
 name: "LinkedIn", 
 href: "https://linkedin.com/company/robertslaw", 
 icon: <Linkedin className="w-5 h-5" /> 
 },
 { 
 name: "Facebook", 
 href: "https://facebook.com/robertslaw", 
 icon: <Facebook className="w-5 h-5" /> 
 }
 ],
 showNewsletter = true,
 copyrightYear = new Date().getFullYear(),
 className = ""
}) => {
 const [email, setEmail] = React.useState("");
 const [subscribed, setSubscribed] = React.useState(false);

 const handleSubscribe = (e) => {
 e.preventDefault();
 if (email) {
 setSubscribed(true);
 setEmail("");
 setTimeout(() => setSubscribed(false), 3000);
 }
 };

 return (
 <footer className={`bg-slate-900 text-gray-300 ${className}`}>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
 <div className="lg:col-span-2">
 <h2 className="text-white text-2xl font-bold mb-4">Roberts & Associates</h2>
 <p className="text-gray-400 mb-6 max-w-md">{description}</p>
 
 <div className="flex space-x-4">
 {socialLinks.map((social) => (
 <a
 key={social.name}
 href={social.href}
 target="_blank"
 rel="noopener noreferrer"
 className="text-gray-400 hover:text-white transition-colors duration-200"
 aria-label={social.name}
 >
 {social.icon}
 </a>
 ))}
 </div>
 </div>

 {sections.map((section) => (
 <div key={section.title}>
 <h3 className="text-white font-semibold mb-4">{section.title}</h3>
 <ul className="space-y-2">
 {section.links.map((link) => (
 <li key={link.label}>
 <a
 href={link.href}
 className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
 >
 {link.label}
 </a>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>

 {showNewsletter && (
 <div className="mt-12 pt-8 border-t border-gray-800">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between">
 <div className="mb-4 md:mb-0">
 <h3 className="text-white font-semibold mb-1">Legal Insights Newsletter</h3>
 <p className="text-gray-400 text-sm">Stay informed with our monthly legal updates.</p>
 </div>
 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Enter your email"
 className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 min-w-[250px]"
 required
 />
 <button
 type="submit"
 className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
 >
 {subscribed ? "Subscribed!" : "Subscribe"}
 </button>
 </form>
 </div>
 </div>
 )}
 </div>

 <div className="border-t border-gray-800">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm">
 <p className="text-gray-400">
 © {copyrightYear} Roberts & Associates Law Firm. All rights reserved.
 </p>
 <div className="flex space-x-6 mt-4 md:mt-0">
 <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
 Privacy
 </a>
 <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
 Terms
 </a>
 <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-200">
 Sitemap
 </a>
 </div>
 </div>
 </div>
 </div>
 </footer>
 );
};

// ═══════════════════════════════════════════════════════
// APP WIRING
// ═══════════════════════════════════════════════════════

function _OriginalApp() {
  const [currentView, setCurrentView] = React.useState("card");

  return (
    <LayoutApp
      currentView={currentView}
      onNavigate={setCurrentView}
      brandName="Legal Partners"
    >
      {currentView === "card" && <Card title="Practice Areas" subtitle="Expert Legal Services" description="Dedicated representation for your legal needs."/>}
        {currentView === "list" && <ListView items={[
                    { id: 1, title: "Personal Injury", description: "Fighting for your rights", price: "Free Consultation" },
                    { id: 2, title: "Family Law", description: "Protecting your family", price: "Free Consultation" },
                    { id: 3, title: "Business Law", description: "Corporate expertise", price: "Free Consultation" }
                ]}/>}
        {currentView === "form" && <FormSection title="Free Case Evaluation" subtitle="Get expert legal advice"/>}
        {currentView === "gallery" && <Gallery />}
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
