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
 <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 backdrop-blur-md shadow-lg">
 <nav className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8`}>
 <div className="flex items-center justify-between h-16">
 <div className="flex-shrink-0">
 <span className="text-2xl font-bold text-white">Two Dog NFT Art</span>
 </div>
 <div className="hidden md:flex items-center space-x-8">
 <a href="#gallery" className="text-white hover:text-purple-200 transition-colors">
 Gallery
 </a>
 <a href="#about" className="text-white hover:text-purple-200 transition-colors">
 About My Art
 </a>
 <a href="#contact" className="text-white hover:text-purple-200 transition-colors">
 Commission
 </a>
 </div>
 <div className="flex items-center space-x-4">
 <button className="px-6 py-3 text-sm font-semibold text-purple-600 bg-white rounded-lg hover:bg-purple-50 transition-all">
 Book a Session
 </button>
 </div>
 </div>
 </nav>
 </header>
 );

 const defaultFooter = (
 <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-300">
 <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8 py-12`}>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 <div className="col-span-1 md:col-span-2">
 <span className="text-2xl font-bold text-white">Two Dog NFT Art</span>
 <p className="mt-4 text-sm text-gray-400 max-w-md">
 Exclusive NFT portraits of Asian women with exactly two dogs. Capturing unique stories, one canvas at a time.
 </p>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Art Styles</h4>
 <ul className="mt-4 space-y-2">
 <li><a href="#" className="text-sm hover:text-white transition-colors">Digital Portraits</a></li>
 <li><a href="#" className="text-sm hover:text-white transition-colors">NFT Collections</a></li>
 </ul>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h4>
 <ul className="mt-4 space-y-2">
 <li><a href="#" className="text-sm hover:text-white transition-colors">Commission Request</a></li>
 <li><a href="#" className="text-sm hover:text-white transition-colors">Artist Portfolio</a></li>
 </ul>
 </div>
 </div>
 <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
 © {new Date().getFullYear()} Two Dog NFT Art. Karma Preserved.
 </div>
 </div>
 </footer>
 );

 return (
 <div className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50 ${className}`}>
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
 logo,
 logoText = "NFT Artist Two Dogs Gallery",
 navItems = [
 { label: "Portfolio", href: "#portfolio" },
 { label: "Two Dog Rule", href: "#dogconcept" },
 { label: "Asian Women Art", href: "#artwork" },
 { label: "Contact", href: "#contact" }
 ],
 ctaButton = { label: "Commission Artwork", href: "#commission" },
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
 w-full bg-gradient-to-r from-purple-100 to-indigo-100 shadow-lg z-50 transition-all duration-300
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
 <span className="text-3xl font-bold text-purple-700">
 Two Dogs, One Canvas
 </span>
 )}
 </a>
 </div>

 <div className="hidden md:flex md:items-center md:space-x-8">
 {navItems.map((item, index) => (
 <a
 key={index}
 href={item.href}
 className="text-purple-800 hover:text-indigo-600 font-medium transition-colors duration-200 hover:scale-105"
 >
 {item.label}
 </a>
 ))}
 </div>

 {ctaButton && (
 <div className="hidden md:block">
 <a
 href={ctaButton.href}
 className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
 >
 {ctaButton.label}
 </a>
 </div>
 )}

 <div className="md:hidden">
 <button
 type="button"
 onClick={toggleMobileMenu}
 className="inline-flex items-center justify-center p-2 rounded-md text-purple-700 hover:text-indigo-600 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
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
 <div className="px-2 pt-2 pb-4 space-y-1 border-t border-purple-100">
 {navItems.map((item, index) => (
 <a
 key={index}
 href={item.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className="block px-3 py-2 rounded-md text-base font-medium text-purple-800 hover:text-indigo-600 hover:bg-purple-50 transition-colors duration-200"
 >
 {item.label}
 </a>
 ))}
 {ctaButton && (
 <a
 href={ctaButton.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className="block w-full text-center mt-4 px-4 py-2.5 border border-transparent text-base font-semibold rounded-xl text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200"
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

// ── Footer ──
const Footer = ({
 companyName = "Two Dogs, One Canvas: NFT Art Studio",
 description = "Capturing the essence of Asian women with their beloved canine companions. Exclusively painting duos of dogs - no more, no less.",
 sections = [
 {
 title: "My Art",
 links: [
 { label: "Gallery", href: "/gallery" },
 { label: "Collections", href: "/collections" },
 { label: "Commissions", href: "/commissions" },
 { label: "Process", href: "/process" }
 ]
 },
 {
 title: "About",
 links: [
 { label: "Artist Statement", href: "/about" },
 { label: "Dog Philosophy", href: "/dogs" },
 { label: "Contact", href: "/contact" },
 { label: "Pricing", href: "/pricing" }
 ]
 },
 {
 title: "Legal",
 links: [
 { label: "NFT Rights", href: "/nft-rights" },
 { label: "Commission Terms", href: "/terms" },
 { label: "Privacy", href: "/privacy" },
 { label: "Two Dog Policy", href: "/dog-policy" }
 ]
 }
 ],
 socialLinks = [
 { name: "Instagram", href: "https://instagram.com/twodogsonecanvas", icon: <Instagram className="w-5 h-5" /> },
 { name: "Twitter", href: "https://twitter.com/nftdogartist", icon: <Twitter className="w-5 h-5" /> }
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
 <footer className={`bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-300 ${className}`}>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
 <div className="lg:col-span-2">
 <h2 className="text-white text-2xl font-bold mb-4">Two Dogs, One Canvas</h2>
 <p className="text-gray-400 mb-6 max-w-md">{description}</p>
 
 <div className="flex space-x-4">
 {socialLinks.map((social) => (
 <a
 key={social.name}
 href={social.href}
 target="_blank"
 rel="noopener noreferrer"
 className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
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
 className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm"
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
 <h3 className="text-white font-semibold mb-1">Subscribe for Exclusive NFT Drops</h3>
 <p className="text-gray-400 text-sm">Stay updated with my latest dog-duo masterpieces.</p>
 </div>
 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Your email for art notifications"
 className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 min-w-[250px]"
 required
 />
 <button
 type="submit"
 className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
 >
 {subscribed ? "Subscribed!" : "Get Notified"}
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
 © {copyrightYear} Two Dogs, One Canvas NFT Art Studio. All artistic rights reserved.
 </p>
 <div className="flex space-x-6 mt-4 md:mt-0">
 <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
 Privacy
 </a>
 <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
 Terms
 </a>
 </div>
 </div>
 </div>
 </div>
 </footer>
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
 name: "artistName",
 label: "Your Name",
 type: "text",
 placeholder: "NFT Artist Name",
 required: true
 },
 {
 name: "email",
 label: "Contact Email",
 type: "email",
 placeholder: "How clients can reach you",
 required: true
 },
 {
 name: "dogDescription",
 label: "Dog Details",
 type: "textarea",
 placeholder: "Describe the two dogs in your upcoming NFT artwork",
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
 <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 py-12 px-4">
 <div className="bg-white rounded-2xl shadow-2xl max-w-xl mx-auto p-10 transform hover:scale-105 transition-all duration-300">
 {submitSuccess && (
 <div className="mb-6 p-4 bg-emerald-100 text-emerald-700 rounded-lg">
 Your NFT artwork inquiry has been received! Two-dog commissions only.
 </div>
 )}
 
 <ReusableForm
 fields={contactFields}
 onSubmit={handleContactSubmit}
 title="Asian Women & Dogs NFT Commission"
 description="I exclusively create NFT artwork featuring Asian women with exactly TWO dogs. No more, no less."
 submitLabel="Request NFT Artwork"
 isLoading={isSubmitting}
 className="bg-transparent"
 />
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
    <LayoutApp
      currentView={currentView}
      onNavigate={setCurrentView}
      brandName="Digital Canvas"
    >
      {currentView === "form" && <FormSection title="Book a Walk" subtitle="Schedule your pet's next adventure"/>}
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
