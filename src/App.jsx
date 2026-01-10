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
 <span className="text-xl font-bold text-gray-900">Zen Flow Yoga Studio</span>
 </div>
 <div className="hidden md:flex items-center space-x-8">
 <a href="#classes" className="text-gray-600 hover:text-gray-900 transition-colors">
 Classes
 </a>
 <a href="#instructors" className="text-gray-600 hover:text-gray-900 transition-colors">
 Instructors
 </a>
 <a href="#schedule" className="text-gray-600 hover:text-gray-900 transition-colors">
 Schedule
 </a>
 <a href="#membership" className="text-gray-600 hover:text-gray-900 transition-colors">
 Membership
 </a>
 </div>
 <div className="flex items-center space-x-4">
 <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
 Book a Class
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
 <span className="text-xl font-bold text-white">Zen Flow Yoga Studio</span>
 <p className="mt-4 text-sm text-gray-400 max-w-md">
 Transforming lives through mindful movement, breath, and inner peace. Join our community of wellness seekers.
 </p>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Classes</h4>
 <ul className="mt-4 space-y-2">
 <li><a href="#" className="text-sm hover:text-white transition-colors">Vinyasa</a></li>
 <li><a href="#" className="text-sm hover:text-white transition-colors">Hatha</a></li>
 <li><a href="#" className="text-sm hover:text-white transition-colors">Restorative</a></li>
 </ul>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-white uppercase tracking-wider">About</h4>
 <ul className="mt-4 space-y-2">
 <li><a href="#" className="text-sm hover:text-white transition-colors">Our Studio</a></li>
 <li><a href="#" className="text-sm hover:text-white transition-colors">Contact Us</a></li>
 </ul>
 </div>
 </div>
 <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
 © {new Date().getFullYear()} Zen Flow Yoga Studio. All rights reserved.
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
 logoText = 'Zen Flow Yoga Studio',
 navItems = [
 { label: 'Classes', href: '#classes' },
 { label: 'Instructors', href: '#instructors' },
 { label: 'Membership', href: '#membership' },
 { label: 'Schedule', href: '#schedule' }
 ],
 ctaButton = { label: 'Book Your First Class', href: '#signup' },
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
 <span className="text-2xl font-bold text-teal-600">
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
 className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200"
 >
 {item.label}
 </a>
 ))}
 </div>

 {ctaButton && (
 <div className="hidden md:block">
 <a
 href={ctaButton.href}
 className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-sm hover:shadow-md"
 >
 {ctaButton.label}
 </a>
 </div>
 )}

 <div className="md:hidden">
 <button
 type="button"
 onClick={toggleMobileMenu}
 className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-colors duration-200"
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
 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors duration-200"
 >
 {item.label}
 </a>
 ))}
 {ctaButton && (
 <a
 href={ctaButton.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className="block w-full text-center mt-4 px-4 py-2.5 border border-transparent text-base font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-all duration-200"
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
 companyName = 'Harmony Yoga Studio',
 description = 'Transform your body, mind, and spirit through mindful movement and conscious breathing. Join our vibrant yoga community today.',
 sections = [
 {
 title: 'Classes',
 links: [
 { label: 'Vinyasa Flow', href: '/classes/vinyasa' },
 { label: 'Restorative Yoga', href: '/classes/restorative' },
 { label: 'Beginners Yoga', href: '/classes/beginners' },
 { label: 'Meditation', href: '/classes/meditation' }
 ]
 },
 {
 title: 'Studio',
 links: [
 { label: 'Our Instructors', href: '/instructors' },
 { label: 'Class Schedule', href: '/schedule' },
 { label: 'Membership', href: '/membership' },
 { label: 'Workshop', href: '/workshops' }
 ]
 },
 {
 title: 'Support',
 links: [
 { label: 'Contact Us', href: '/contact' },
 { label: 'FAQ', href: '/faq' },
 { label: 'Pricing', href: '/pricing' },
 { label: 'Book a Class', href: '/book' }
 ]
 }
 ],
 socialLinks = [
 { name: 'Facebook', href: 'https://facebook.com/harmonyyoga', icon: defaultSocialIcons.facebook },
 { name: 'Instagram', href: 'https://instagram.com/harmonyyogastudio', icon: defaultSocialIcons.instagram }
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
 <h3 className="text-white font-semibold mb-1">Join Our Yoga Community</h3>
 <p className="text-gray-400 text-sm">Stay informed about classes, workshops, and special events.</p>
 </div>
 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Your email address"
 className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 min-w-[250px]"
 required
 />
 <button
 type="submit"
 className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
 >
 {subscribed ? 'Namaste!' : 'Subscribe'}
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
 © {copyrightYear} {companyName}. Breathe. Move. Grow.
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
 placeholder: 'Your Email',
 required: true
 },
 {
 name: 'phoneNumber',
 label: 'Phone Number',
 type: 'tel',
 placeholder: 'Your Contact Number',
 required: true
 },
 {
 name: 'membershipType',
 label: 'Membership Type',
 type: 'select',
 options: [
 'Beginner Unlimited',
 'Advanced Flow Package',
 'Wellness Monthly',
 'Drop-In Class'
 ],
 required: true
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
 <div className="min-h-screen bg-gray-50 py-12 px-4">
 <div className="bg-white rounded-xl shadow-lg p-8">
 {submitSuccess && (
 <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
 Thank you! Your membership registration is complete. We'll contact you shortly.
 </div>
 )}
 
 <ReusableForm
 fields={membershipFields}
 onSubmit={handleMembershipSubmit}
 title="Yoga Studio Membership"
 description="Join our transformative yoga community and start your wellness journey today!"
 submitLabel="Register for Membership"
 isLoading={isSubmitting}
 />
 </div>
 </div>
 );
};

// ── CallToAction ──
const CallToAction = ({
 heading = 'Join Our Yoga Community',
 subheading = 'Sign up for unlimited classes and transform your mind, body, and spirit. New members get their first week free!',
 inputPlaceholder = 'Enter your email for class updates',
 buttonText = 'Get Started',
 variant = 'default',
 onSubmit,
 className = ''
}) => {
 const [email, setEmail] = React.useState('');
 const [status, setStatus] = React.useState('idle');
 const [message, setMessage] = React.useState('');

 const handleSubmit = async (e) => {
 e.preventDefault();
 
 if (!email || !email.includes('@')) {
 setStatus('error');
 setMessage('Please enter a valid email address');
 return;
 }

 setStatus('loading');

 if (onSubmit) {
 try {
 await onSubmit(email);
 setStatus('success');
 setMessage('Welcome to Zen Flow Yoga Studio!');
 setEmail('');
 } catch {
 setStatus('error');
 setMessage('Oops! Something went wrong. Please try again.');
 }
 } else {
 setTimeout(() => {
 setStatus('success');
 setMessage('Welcome to Zen Flow Yoga Studio!');
 setEmail('');
 }, 1000);
 }
 };

 const variantStyles = {
 default: 'bg-white border border-gray-200',
 gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white',
 dark: 'bg-gray-900 text-white'
 };

 const headingStyles = {
 default: 'text-gray-900',
 gradient: 'text-white',
 dark: 'text-white'
 };

 const subheadingStyles = {
 default: 'text-gray-600',
 gradient: 'text-white/90',
 dark: 'text-gray-300'
 };

 const inputStyles = {
 default: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500',
 gradient: 'bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-white focus:border-white',
 dark: 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
 };

 const buttonStyles = {
 default: 'bg-indigo-600 hover:bg-indigo-700 text-white',
 gradient: 'bg-white text-indigo-600 hover:bg-gray-100',
 dark: 'bg-indigo-600 hover:bg-indigo-700 text-white'
 };

 return (
 <div
 className={`rounded-2xl p-8 md:p-12 shadow-lg ${variantStyles[variant]} ${className}`}
 >
 <div className="max-w-2xl mx-auto text-center">
 <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${headingStyles[variant]}`}>
 {heading}
 </h2>

 <p className={`text-lg mb-8 ${subheadingStyles[variant]}`}>
 {subheading}
 </p>

 <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder={inputPlaceholder}
 disabled={status === 'loading'}
 className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 outline-none ${inputStyles[variant]} disabled:opacity-50`}
 />
 <button
 type="submit"
 disabled={status === 'loading'}
 className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${buttonStyles[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
 >
 {status === 'loading' ? (
 <span className="flex items-center justify-center gap-2">
 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
 <circle
 className="opacity-25"
 cx="12"
 cy="12"
 r="10"
 stroke="currentColor"
 strokeWidth="4"
 fill="none"
 />
 <path
 className="opacity-75"
 fill="currentColor"
 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
 />
 </svg>
 <span>Signing Up...</span>
 </span>
 ) : (
 buttonText
 )}
 </button>
 </form>

 {message && (
 <p
 className={`mt-4 text-sm ${
 status === 'success' ? 'text-green-500' : 'text-red-500'
 }`}
 >
 {message}
 </p>
 )}

 <p className={`mt-6 text-xs ${subheadingStyles[variant]} opacity-70`}>
 We protect your personal information. No spam, ever.
 </p>
 </div>
 </div>
 );
};

// ── Gallery ──
const Gallery = ({
 items = [],
 filters,
 columns = 3,
 showAllFilter = true,
 allFilterLabel = 'All Classes',
 onItemClick,
 className = ''
}) => {
 const [activeFilter, setActiveFilter] = React.useState('all');

 const filterOptions = React.useMemo(() => {
 if (filters) return filters;
 
 const categories = [...new Set(items.map((item) => item.category))];
 return categories.map((cat) => ({
 label: cat.charAt(0).toUpperCase() + cat.slice(1),
 value: cat
 }));
 }, [filters, items]);

 const filteredItems = React.useMemo(() => {
 if (activeFilter === 'all') return items;
 return items.filter((item) => item.category === activeFilter);
 }, [items, activeFilter]);

 const gridCols = {
 2: 'grid-cols-1 sm:grid-cols-2',
 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
 4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
 5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
 };

 return (
 <div className={`w-full ${className}`}>
 <div className="flex flex-wrap gap-2 mb-6 justify-center">
 {showAllFilter && (
 <button
 onClick={() => setActiveFilter('all')}
 className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
 activeFilter === 'all'
 ? 'bg-blue-600 text-white shadow-lg'
 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
 }`}
 >
 {allFilterLabel}
 </button>
 )}
 {filterOptions.map((filter) => (
 <button
 key={filter.value}
 onClick={() => setActiveFilter(filter.value)}
 className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
 activeFilter === filter.value
 ? 'bg-blue-600 text-white shadow-lg'
 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
 }`}
 >
 {filter.label}
 </button>
 ))}
 </div>

 <div className={`grid ${gridCols[columns]} gap-4`}>
 {filteredItems.map((item) => (
 <div
 key={item.id}
 onClick={() => onItemClick?.(item)}
 className={`group relative overflow-hidden rounded-lg bg-gray-100 aspect-square ${
 onItemClick ? 'cursor-pointer' : ''
 }`}
 >
 <img
 src={item.src}
 alt={item.alt}
 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
 loading="lazy"
 />
 
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
 <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
 {item.title && (
 <h3 className="font-semibold text-lg truncate">{item.title}</h3>
 )}
 {item.description && (
 <p className="text-sm text-gray-200 line-clamp-2">
 {item.description}
 </p>
 )}
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
 <svg
 className="w-16 h-16 mx-auto mb-4 text-gray-300"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={1.5}
 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
 />
 </svg>
 <p>No yoga classes found for this filter</p>
 </div>
 )}
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
      brandName="My Business"
    >
      {currentView === "form" && <FormSection title="Contact Us"
              subtitle="Get in touch with us today" />}
        {currentView === "cta" && <CallToAction />}
        {currentView === "gallery" && <Gallery items={[
                { id: 1, src: "https://picsum.photos/seed/dog1/400/400", alt: "Happy dog", title: "Pack Walks" },
                { id: 2, src: "https://picsum.photos/seed/dog2/400/400", alt: "Dog running", title: "Individual Walks" },
                { id: 3, src: "https://picsum.photos/seed/dog3/400/400", alt: "Puppy", title: "Puppy Care" },
                { id: 4, src: "https://picsum.photos/seed/dog4/400/400", alt: "Dogs playing", title: "Group Activities" }
              ]} />}
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
