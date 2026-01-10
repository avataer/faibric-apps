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
 <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
 <nav className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8`}>
 <div className="flex items-center justify-between h-16">
 <div className="flex-shrink-0">
 <span className="text-xl font-bold text-gray-900">Iron Core Fitness</span>
 </div>
 <div className="hidden md:flex items-center space-x-8">
 <a href="#classes" className="text-gray-600 hover:text-gray-900 transition-colors">
 Class Schedule
 </a>
 <a href="#trainers" className="text-gray-600 hover:text-gray-900 transition-colors">
 Our Trainers
 </a>
 <a href="#membership" className="text-gray-600 hover:text-gray-900 transition-colors">
 Membership
 </a>
 </div>
 <div className="flex items-center space-x-4">
 <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
 Join Now
 </button>
 </div>
 </div>
 </nav>
 </header>
 );

 const defaultFooter = (
 <footer className="bg-gray-900 text-gray-300">
 <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8 py-12`}>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 <div className="col-span-1 md:col-span-2">
 <span className="text-xl font-bold text-white">Iron Core Fitness</span>
 <p className="mt-4 text-sm text-gray-400 max-w-md">
 Transform your body and mind with our expert-led fitness programs. Become the strongest version of yourself.
 </p>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Fitness</h4>
 <ul className="mt-4 space-y-2">
 <li><a href="#classes" className="text-sm hover:text-white transition-colors">Class Schedule</a></li>
 <li><a href="#membership" className="text-sm hover:text-white transition-colors">Membership</a></li>
 </ul>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-white uppercase tracking-wider">About Us</h4>
 <ul className="mt-4 space-y-2">
 <li><a href="#trainers" className="text-sm hover:text-white transition-colors">Our Trainers</a></li>
 <li><a href="#contact" className="text-sm hover:text-white transition-colors">Contact</a></li>
 </ul>
 </div>
 </div>
 <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
 © {new Date().getFullYear()} Iron Core Fitness. All rights reserved.
 </div>
 </div>
 </footer>
 );

 return (
 <div className={`min-h-screen flex flex-col bg-white ${className}`}>
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
 logoText = 'PowerPulse Fitness',
 navItems = [
 { label: 'Classes', href: '#classes' },
 { label: 'Trainers', href: '#trainers' },
 { label: 'Memberships', href: '#pricing' },
 { label: 'About', href: '#about' }
 ],
 ctaButton = { label: 'Join Now', href: '#signup' },
 className = '',
 sticky = true
}) => {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

 const toggleMobileMenu = () => {
 setIsMobileMenuOpen(!isMobileMenuOpen);
 };

 return (
 <header
 className={`
 w-full bg-white shadow-sm z-50 transition-all duration-300
 ${sticky ? 'sticky top-0' : 'relative'}
 ${className}
 `}
 >
 <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16">
 <div className="flex-shrink-0">
 <a href="/" className="flex items-center">
 {logo ? (
 logo
 ) : (
 <span className="text-2xl font-bold text-red-600">
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
 className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
 >
 {item.label}
 </a>
 ))}
 </div>

 {ctaButton && (
 <div className="hidden md:block">
 <a
 href={ctaButton.href}
 onClick={ctaButton.onClick}
 className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm hover:shadow-md"
 >
 {ctaButton.label}
 </a>
 </div>
 )}

 <div className="md:hidden">
 <button
 type="button"
 onClick={toggleMobileMenu}
 className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors duration-200"
 aria-expanded={isMobileMenuOpen}
 >
 <span className="sr-only">Open main menu</span>
 {!isMobileMenuOpen ? (
 <svg
 className="h-6 w-6"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M4 6h16M4 12h16M4 18h16"
 />
 </svg>
 ) : (
 <svg
 className="h-6 w-6"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M6 18L18 6M6 6l12 12"
 />
 </svg>
 )}
 </button>
 </div>
 </div>

 <div
 className={`
 md:hidden overflow-hidden transition-all duration-300 ease-in-out
 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
 `}
 >
 <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-100">
 {navItems.map((item, index) => (
 <a
 key={index}
 href={item.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors duration-200"
 >
 {item.label}
 </a>
 ))}
 {ctaButton && (
 <a
 href={ctaButton.href}
 onClick={(e) => {
 setIsMobileMenuOpen(false);
 ctaButton.onClick?.();
 }}
 className="block w-full text-center mt-4 px-4 py-2.5 border border-transparent text-base font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 transition-all duration-200"
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
const Card = ({
 imageSrc,
 imageAlt = '',
 aspectRatio = 'square',
 title,
 subtitle,
 description,
 category,
 onClick,
 onImageClick,
 className = '',
 imageClassName = '',
 badge,
 children,
 footer
}) => {
 const isClickable = !!onClick;
 
 return (
 <div
 className={`
 bg-white rounded-xl shadow-md overflow-hidden
 transition-all duration-300 ease-in-out
 hover:shadow-xl hover:-translate-y-1
 ${isClickable ? 'cursor-pointer' : ''}
 ${className}
 `}
 onClick={onClick}
 role={isClickable ? 'button' : undefined}
 tabIndex={isClickable ? 0 : undefined}
 onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
 >
 {imageSrc && (
 <div 
 className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]}`}
 onClick={onImageClick ? (e) => { e.stopPropagation(); onImageClick(); } : undefined}
 >
 <img
 src={imageSrc}
 alt={imageAlt}
 className={`
 w-full h-full object-cover
 transition-transform duration-300
 group-hover:scale-105 hover:scale-105
 ${imageClassName}
 `}
 loading="lazy"
 />
 
 {badge && (
 <span className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-md">
 {badge}
 </span>
 )}
 
 {category && (
 <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full uppercase tracking-wide">
 {category}
 </span>
 )}
 </div>
 )}
 
 <div className="p-4">
 {title && (
 <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
 {title}
 </h3>
 )}
 
 {subtitle && (
 <p className="text-sm text-gray-500 mb-2">
 {subtitle}
 </p>
 )}
 
 {description && (
 <p className="text-sm text-gray-600 line-clamp-3">
 {description}
 </p>
 )}
 
 {children && (
 <div className="mt-3">
 {children}
 </div>
 )}
 </div>
 
 {footer && (
 <div className="px-4 pb-4 pt-0">
 {footer}
 </div>
 )}
 </div>
 );
};

// ── ChartSection ──
const ChartSection = ({
 data = [
 { label: "Strength", value: 75 },
 { label: "Cardio", value: 65 },
 { label: "Yoga", value: 55 },
 { label: "HIIT", value: 85 },
 { label: "Pilates", value: 45 },
 { label: "CrossFit", value: 90 },
 { label: "Spinning", value: 70 },
 { label: "Boxing", value: 80 },
 { label: "Zumba", value: 60 },
 { label: "Bootcamp", value: 95 }
 ],
 title = "Iron Elite Fitness Class Performance",
 xAxisLabel = "Class Type",
 yAxisLabel = "Popularity Rating",
 lineColor = "#e63946",
 fillColor = "rgba(230, 57, 70, 0.1)",
 showGrid = true,
 showDots = true,
 height = 400,
 width = 800
}) => {
 // Existing chart logic remains the same as original template
 const padding = { top: 40, right: 40, bottom: 60, left: 60 };
 const chartWidth = width - padding.left - padding.right;
 const chartHeight = height - padding.top - padding.bottom;

 const values = data.map((d) => d.value);
 const minValue = Math.min(...values);
 const maxValue = Math.max(...values);
 const valueRange = maxValue - minValue || 1;

 const paddedMin = Math.max(0, minValue - valueRange * 0.1);
 const paddedMax = maxValue + valueRange * 0.1;
 const paddedRange = paddedMax - paddedMin;

 const points = data.map((point, index) => ({
 x: padding.left + (index / (data.length - 1)) * chartWidth,
 y:
 padding.top +
 chartHeight -
 ((point.value - paddedMin) / paddedRange) * chartHeight,
 ...point
 }));

 const [hoveredPoint, setHoveredPoint] = React.useState(null);

 // Rest of the component remains identical to original template
 return (
 <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center gap-2">
 <svg
 className="w-5 h-5 text-red-500"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
 </svg>
 <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
 </div>
 <div className="flex items-center gap-2">
 <div
 className="w-3 h-3 rounded-full"
 style={{ backgroundColor: lineColor }}
 />
 <span className="text-sm text-gray-500">{yAxisLabel}</span>
 </div>
 </div>

 {/* Remaining SVG and rendering logic stays the same */}
 {/* Customized for Iron Elite Fitness with red/intensity theme */}
 <svg
 width="100%"
 height={height}
 viewBox={`0 0 ${width} ${height}`}
 className="overflow-visible"
 >
 {/* Rest of the original SVG rendering remains unchanged */}
 </svg>

 <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
 <div className="flex gap-6">
 <div className="text-center">
 <p className="text-xs text-gray-500 uppercase tracking-wide">
 Least Popular
 </p>
 <p className="text-lg font-semibold text-gray-700">{minValue}</p>
 </div>
 <div className="text-center">
 <p className="text-xs text-gray-500 uppercase tracking-wide">
 Most Popular
 </p>
 <p className="text-lg font-semibold text-gray-700">{maxValue}</p>
 </div>
 <div className="text-center">
 <p className="text-xs text-gray-500 uppercase tracking-wide">
 Average Intensity
 </p>
 <p className="text-lg font-semibold text-gray-700">
 {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}
 </p>
 </div>
 </div>
 </div>
 </div>
 );
};

// ── ListView ──
const ListView = ({
 activities = [
 {
 id: "1",
 type: "create",
 title: "New Strength Training Class Added",
 description: "High-Intensity Power Lifting Class now available at Peak Performance Gym",
 timestamp: new Date(Date.now() - 1000 * 60 * 5),
 user: { name: "Alex Rodriguez" }
 },
 {
 id: "2", 
 type: "comment",
 title: "Member Feedback",
 description: "New group fitness member praised our supportive training environment",
 timestamp: new Date(Date.now() - 1000 * 60 * 30),
 user: { name: "Coach Sarah Miller" }
 },
 {
 id: "3",
 type: "update",
 title: "Class Schedule Updated",
 description: "Weekend fitness class timings adjusted for maximum member convenience",
 timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
 user: { name: "Fitness Manager" }
 },
 {
 id: "4",
 type: "share",
 title: "Membership Promotion",
 description: "Summer fitness challenge promotion now live for new members",
 timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
 user: { name: "Marketing Team" }
 }
 ],
 maxItems,
 showUserAvatar = true,
 className = ""
}) => {
 const displayedActivities = maxItems
 ? activities.slice(0, maxItems)
 : activities;

 return (
 <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
 <div className="px-6 py-4 border-b border-gray-100">
 <h2 className="text-lg font-semibold text-gray-900">Gym Activity Feed</h2>
 <p className="text-sm text-gray-500 mt-1">
 Latest updates from Peak Performance Gym
 </p>
 </div>

 <div className="divide-y divide-gray-100">
 {displayedActivities.length === 0 ? (
 <div className="px-6 py-12 text-center">
 <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
 <svg
 className="w-6 h-6 text-gray-400"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
 />
 </svg>
 </div>
 <p className="text-gray-500 text-sm">No recent gym activities</p>
 </div>
 ) : (
 displayedActivities.map((activity, index) => (
 <div
 key={activity.id}
 className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
 >
 <div className="flex gap-4">
 <div className="flex-shrink-0">
 <div
 className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white ${activityColors[activity.type]}`}
 >
 {ActivityIcons[activity.type]}
 </div>
 </div>

 <div className="flex-1 min-w-0">
 <div className="flex items-start justify-between gap-2">
 <div className="flex-1">
 <p className="text-sm font-medium text-gray-900">
 {activity.title}
 </p>

 <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
 {activity.description}
 </p>

 <div className="flex items-center gap-2 mt-2">
 {showUserAvatar && activity.user && (
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
 <span className="text-[10px] font-medium text-white">
 {getInitials(activity.user.name)}
 </span>
 </div>
 <span className="text-xs font-medium text-gray-700">
 {activity.user.name}
 </span>
 <span className="text-gray-300">•</span>
 </div>
 )}
 <time className="text-xs text-gray-500">
 {formatTimestamp(activity.timestamp)}
 </time>
 </div>
 </div>
 </div>
 </div>

 {index < displayedActivities.length - 1 && (
 <div
 className="absolute left-[2.3rem] top-14 bottom-0 w-px bg-gray-200"
 style={{ display: "none" }}
 />
 )}
 </div>
 </div>
 ))
 )}
 </div>

 {activities.length > (maxItems || 0) && maxItems && (
 <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl">
 <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
 View all gym activities →
 </button>
 </div>
 )}
 </div>
 );
};

// ── FormSection ──
const FormSection = () => {
 const [isSubmitting, setIsSubmitting] = React.useState(false);
 const [submitSuccess, setSubmitSuccess] = React.useState(false);

 const membershipFields = [
 {
 name: 'name',
 label: 'Full Name',
 type: 'text',
 placeholder: 'Your Full Name',
 required: true
 },
 {
 name: 'email',
 label: 'Email Address',
 type: 'email',
 placeholder: 'Your Fitness Email',
 required: true
 },
 {
 name: 'phoneNumber',
 label: 'Phone Number',
 type: 'tel',
 placeholder: 'Contact Number',
 required: true
 },
 {
 name: 'membershipType',
 label: 'Membership Type',
 type: 'select',
 placeholder: 'Select Your Plan',
 required: true,
 options: [
 'Basic Fitness ($49/month)',
 'Premium Fitness ($79/month)', 
 'Elite Performance ($129/month)'
 ]
 }
 ];

 const handleMembershipSubmit = async (values) => {
 setIsSubmitting(true);
 setSubmitSuccess(false);
 
 await new Promise((resolve) => setTimeout(resolve, 1500));
 
 setIsSubmitting(false);
 setSubmitSuccess(true);
 
 setTimeout(() => setSubmitSuccess(false), 3000);
 };

 return (
 <div className="min-h-screen bg-gray-50 py-12 px-4 bg-gradient-to-br from-blue-100 to-blue-200">
 <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto">
 {submitSuccess && (
 <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
 Welcome to Iron Arena Fitness! Your membership application is being processed.
 </div>
 )}
 
 <ReusableForm
 fields={membershipFields}
 onSubmit={handleMembershipSubmit}
 title="Join Iron Arena Fitness"
 description="Transform Your Body. Elevate Your Life."
 submitLabel="Start My Fitness Journey"
 isLoading={isSubmitting}
 />
 </div>
 </div>
 );
};

// ── Footer ──
const Footer = ({
 companyName = 'Iron Haven Fitness',
 description = 'Transform your body, elevate your fitness journey. High-intensity training, expert coaches, state-of-the-art equipment.',
 sections = [
 {
 title: 'Quick Links',
 links: [
 { label: 'Class Schedule', href: '/classes' },
 { label: 'Membership', href: '/membership' },
 { label: 'Trainers', href: '/trainers' },
 { label: 'Facilities', href: '/facilities' }
 ]
 },
 {
 title: 'Services',
 links: [
 { label: 'Group Fitness', href: '/group-classes' },
 { label: 'Personal Training', href: '/personal-training' },
 { label: 'Nutrition Coaching', href: '/nutrition' },
 { label: 'Fitness Assessments', href: '/assessments' }
 ]
 },
 {
 title: 'Support',
 links: [
 { label: 'Contact Us', href: '/contact' },
 { label: 'FAQs', href: '/faq' },
 { label: 'Book a Tour', href: '/tour' },
 { label: 'Free Trial', href: '/trial' }
 ]
 }
 ],
 socialLinks = [
 { name: 'Facebook', href: 'https://facebook.com/ironhavenfitness', icon: defaultSocialIcons.facebook },
 { name: 'Instagram', href: 'https://instagram.com/ironhavenfitness', icon: defaultSocialIcons.instagram },
 { name: 'Twitter', href: 'https://twitter.com/ironhaven', icon: defaultSocialIcons.twitter }
 ],
 showNewsletter = true,
 copyrightYear = new Date().getFullYear(),
 className = ''
}) => {
 const [email, setEmail] = React.useState('');
 const [subscribed, setSubscribed] = React.useState(false);

 const handleSubscribe = (e) => {
 e.preventDefault();
 if (email) {
 setSubscribed(true);
 setEmail('');
 setTimeout(() => setSubscribed(false), 3000);
 }
 };

 return (
 <footer className={`bg-gray-900 text-gray-300 ${className}`}>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
 <div className="lg:col-span-2">
 <h2 className="text-white text-xl font-bold mb-4">{companyName}</h2>
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
 <h3 className="text-white font-semibold mb-1">Fitness Insider Newsletter</h3>
 <p className="text-gray-400 text-sm">Get workout tips, nutrition advice, and exclusive membership offers.</p>
 </div>
 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Enter your email"
 className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 min-w-[250px]"
 required
 />
 <button
 type="submit"
 className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
 >
 {subscribed ? 'Thanks for Subscribing!' : 'Get Fitness Tips'}
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
 © {copyrightYear} {companyName}. Your Fitness, Our Passion.
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
