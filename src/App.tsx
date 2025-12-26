import React, { useState } from 'react';

// TypeScript interface for testimonial data
interface TestimonialProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
  className?: string;
}

// Star rating component for displaying ratings
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Reusable Testimonial component
const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  name,
  role,
  company,
  avatarUrl,
  rating,
  className = '',
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-transform hover:scale-[1.02] ${className}`}
    >
      <div className="mb-4">
        <svg
          className="w-10 h-10 text-indigo-500 opacity-20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {rating !== undefined && (
        <div className="mb-4">
          <StarRating rating={rating} />
        </div>
      )}

      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        "{quote}"
      </blockquote>

      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {getInitials(name)}
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          {(role || company) && (
            <p className="text-sm text-gray-500">
              {role}
              {role && company && ' at '}
              {company && <span className="font-medium">{company}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Interface for navigation items
interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

// Interface for component props
interface HeaderNavigationProps {
  logo?: React.ReactNode;
  logoText?: string;
  navItems?: NavItem[];
  ctaButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  className?: string;
  sticky?: boolean;
}

// Reusable Header Navigation Component
const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  logo,
  logoText = 'Brand',
  navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaButton = { label: 'Get Started', href: '#signup' },
  className = '',
  sticky = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
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
                className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {ctaButton.label}
              </a>
            </div>
          )}

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
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
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
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

// Interface for customizable hero props
interface HeroProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryCTA?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  backgroundImage?: string;
  backgroundClass?: string;
  alignment?: 'left' | 'center' | 'right';
  heroImage?: string;
  children?: React.ReactNode;
}

// Reusable Full Hero Component
const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundClass = 'bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800',
  alignment = 'center',
  heroImage,
  children,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const CTAButton: React.FC<{
    text: string;
    onClick?: () => void;
    href?: string;
    variant: 'primary' | 'secondary';
  }> = ({ text, onClick, href, variant }) => {
    const baseClasses =
      'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105';
    const variantClasses =
      variant === 'primary'
        ? 'bg-white text-indigo-900 hover:bg-indigo-100 shadow-lg hover:shadow-xl'
        : 'border-2 border-white text-white hover:bg-white hover:text-indigo-900';

    const className = `${baseClasses} ${variantClasses}`;

    if (href) {
      return (
        <a href={href} className={className}>
          {text}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={className}>
        {text}
      </button>
    );
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${backgroundClass}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50 z-0" />
      )}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div
          className={`flex flex-col ${alignmentClasses[alignment]} ${
            heroImage ? 'lg:flex-row lg:justify-between lg:items-center' : ''
          } gap-12`}
        >
          <div
            className={`flex flex-col ${alignmentClasses[alignment]} ${
              heroImage ? 'lg:w-1/2' : 'max-w-4xl mx-auto'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {headline}
            </h1>

            {subheadline && (
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed">
                {subheadline}
              </p>
            )}

            {(primaryCTA || secondaryCTA) && (
              <div
                className={`flex flex-col sm:flex-row gap-4 ${
                  alignment === 'center' ? 'justify-center' : ''
                }`}
              >
                {primaryCTA && (
                  <CTAButton
                    text={primaryCTA.text}
                    onClick={primaryCTA.onClick}
                    href={primaryCTA.href}
                    variant="primary"
                  />
                )}
                {secondaryCTA && (
                  <CTAButton
                    text={secondaryCTA.text}
                    onClick={secondaryCTA.onClick}
                    href={secondaryCTA.href}
                    variant="secondary"
                  />
                )}
              </div>
            )}

            {children && <div className="mt-8">{children}</div>}
          </div>

          {heroImage && (
            <div className="lg:w-1/2 flex justify-center">
              <img
                src={heroImage}
                alt="Hero illustration"
                className="max-w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

// Interface for a single feature item
interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

// Props interface for the FeatureGrid component
interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: 'light' | 'dark' | 'gradient';
  className?: string;
}

// Default icon component when no icon is provided
const DefaultIcon: React.FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Reusable Feature Grid Component
const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  variant = 'light',
  className = '',
}) => {
  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const bgStyles = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900',
  }[variant];

  const cardStyles = {
    light: 'bg-gray-50 hover:bg-gray-100',
    dark: 'bg-gray-800 hover:bg-gray-700',
    gradient: 'bg-white/70 backdrop-blur-sm hover:bg-white/90',
  }[variant];

  const iconStyles = {
    light: 'bg-indigo-100 text-indigo-600',
    dark: 'bg-indigo-900 text-indigo-300',
    gradient: 'bg-indigo-100 text-indigo-600',
  }[variant];

  const descriptionStyles = {
    light: 'text-gray-600',
    dark: 'text-gray-300',
    gradient: 'text-gray-600',
  }[variant];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${bgStyles} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className={`text-lg max-w-2xl mx-auto ${descriptionStyles}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridColsClass} gap-6 lg:gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                p-6 rounded-xl transition-all duration-300 
                transform hover:-translate-y-1 hover:shadow-lg
                ${cardStyles}
              `}
            >
              <div
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-4
                  ${iconStyles}
                `}
              >
                {feature.icon || <DefaultIcon />}
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>

              <p className={descriptionStyles}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom Logo Component for Faibric AI
const FaibricLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      Faibric AI
    </span>
  </div>
);

// Footer Component for Faibric AI
const FaibricFooter: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <FaibricLogo />
          <p className="mt-4 text-sm text-gray-400 max-w-md">
            Empowering businesses with next-generation AI solutions. Transform your workflows, 
            automate processes, and unlock new possibilities with Faibric AI.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#features" className="text-sm hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">API</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
        © {new Date().getFullYear()} Faibric AI. All rights reserved.
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  const [email, setEmail] = useState('');

  // Navigation items for Faibric AI
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ];

  // Feature data for Faibric AI
  const features: FeatureItem[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast Processing',
      description: 'Process millions of data points in seconds with our optimized AI engine. Get real-time insights without the wait.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA. Your data is always protected.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Seamless Integration',
      description: 'Connect with your existing tools in minutes. We support 200+ integrations including Slack, Salesforce, and more.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Smart Automation',
      description: 'Let AI handle repetitive tasks while you focus on strategy. Reduce manual work by up to 80%.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Advanced Analytics',
      description: 'Gain deep insights with customizable dashboards and AI-powered predictions. Make data-driven decisions.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: '24/7 Expert Support',
      description: 'Our team of AI specialists is always ready to help. Get personalized support whenever you need it.',
    },
  ];

  // Testimonial data
  const testimonials = [
    {
      quote: "Faibric AI has completely transformed how we handle customer support. Response times are down 60% and satisfaction is through the roof!",
      name: "Sarah Chen",
      role: "VP of Customer Success",
      company: "TechFlow Inc.",
      rating: 5,
    },
    {
      quote: "The automation capabilities are incredible. We've saved over 200 hours per month on repetitive tasks, letting our team focus on what really matters.",
      name: "Marcus Rodriguez",
      role: "Operations Director",
      company: "ScaleUp Labs",
      rating: 5,
    },
    {
      quote: "Implementation was seamless and the results were immediate. Faibric AI is now an essential part of our tech stack.",
      name: "Emily Watson",
      role: "CTO",
      company: "DataDrive Solutions",
      rating: 5,
    },
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      step: 1,
      title: 'Connect Your Data',
      description: 'Integrate Faibric AI with your existing tools and data sources in just a few clicks.',
    },
    {
      step: 2,
      title: 'Train Your AI',
      description: 'Our AI learns from your data and workflows to understand your specific needs.',
    },
    {
      step: 3,
      title: 'Automate & Scale',
      description: 'Deploy intelligent automation across your organization and watch productivity soar.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Navigation */}
      <HeaderNavigation
        logo={<FaibricLogo />}
        navItems={navItems}
        ctaButton={{
          label: 'Start Free Trial',
          href: '#signup',
        }}
      />

      {/* Hero Section */}
      <Hero
        headline="Transform Your Business with Intelligent AI"
        subheadline="Faibric AI empowers teams to automate workflows, analyze data, and make smarter decisions. Join 10,000+ companies already using AI to drive growth."
        primaryCTA={{
          text: 'Start Free Trial',
          href: '#signup',
        }}
        secondaryCTA={{
          text: 'Watch Demo',
          href: '#demo',
        }}
        backgroundClass="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800"
      >
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 opacity-70">
          <div className="text-white text-sm font-medium">Trusted by:</div>
          <div className="flex items-center gap-8">
            <span className="text-white/80 font-semibold">Microsoft</span>
            <span className="text-white/80 font-semibold">Stripe</span>
            <span className="text-white/80 font-semibold">Shopify</span>
            <span className="text-white/80 font-semibold">Notion</span>
          </div>
        </div>
      </Hero>

      {/* Features Section */}
      <section id="features">
        <FeatureGrid
          title="Powerful Features for Modern Teams"
          subtitle="Everything you need to harness the power of AI and transform your business operations."
          features={features}
          columns={3}
          variant="gradient"
        />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Faibric AI Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes, not months. Our streamlined process gets you up and running fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about their experience with Faibric AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using Faibric AI to work smarter, not harder. Start your free 14-day trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-200 shadow-lg">
              Get Started Free
            </button>
          </div>

          <p className="text-indigo-200 text-sm mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <FaibricFooter />
    </div>
  );
}

export default App;
</div>
</div>
</div>