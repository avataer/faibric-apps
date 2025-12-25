import React, { useState } from 'react';

// Header Navigation Component
interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

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

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  logo,
  logoText = 'Brand',
  navItems = [],
  ctaButton,
  className = '',
  sticky = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`${sticky ? 'sticky top-0 z-50' : ''} bg-white shadow-sm ${className}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {logo || (
              <span className="text-2xl font-bold text-indigo-600">{logoText}</span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            {ctaButton && (
              <a
                href={ctaButton.href}
                onClick={ctaButton.onClick}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {ctaButton.label}
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            {ctaButton && (
              <a
                href={ctaButton.href}
                onClick={ctaButton.onClick}
                className="block mt-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-center hover:bg-indigo-700 transition-colors"
              >
                {ctaButton.label}
              </a>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

// Hero Component
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
  backgroundColor?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundColor = 'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
  className = '',
}) => {
  return (
    <section className={`${backgroundColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              {subheadline}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <a
                href={primaryCTA.href || '#'}
                onClick={primaryCTA.onClick}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {primaryCTA.text}
              </a>
            )}
            {secondaryCTA && (
              <a
                href={secondaryCTA.href || '#'}
                onClick={secondaryCTA.onClick}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-all"
              >
                {secondaryCTA.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Grid Component
interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  background?: 'white' | 'gray' | 'gradient';
  className?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  background = 'white',
  className = '',
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-b from-white to-gray-50',
  };

  return (
    <section className={`${bgClasses[background]} py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
            >
              {feature.icon && (
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Carousel Component
interface TestimonialProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
  className?: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  name,
  role,
  company,
  avatarUrl,
  rating,
  className = '',
}) => {
  return (
    <div
      className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ${className}`}
    >
      {rating && (
        <div className="mb-4">
          <StarRating rating={rating} />
        </div>
      )}
      <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          {(role || company) && (
            <p className="text-gray-500 text-sm">
              {role}
              {role && company && ' at '}
              {company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface TestimonialCarouselProps {
  testimonials: TestimonialProps[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <section className={`bg-gray-50 py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
interface CTAButton {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
}

interface CenteredCTAProps {
  headline: string;
  description?: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  backgroundVariant?: 'light' | 'dark' | 'gradient';
  className?: string;
}

const CenteredCTA: React.FC<CenteredCTAProps> = ({
  headline,
  description,
  primaryButton,
  secondaryButton,
  backgroundVariant = 'gradient',
  className = '',
}) => {
  const bgClasses = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  };

  const textClasses = {
    light: 'text-gray-900',
    dark: 'text-white',
    gradient: 'text-white',
  };

  const descClasses = {
    light: 'text-gray-600',
    dark: 'text-gray-300',
    gradient: 'text-indigo-100',
  };

  return (
    <section className={`${bgClasses[backgroundVariant]} py-20 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 ${textClasses[backgroundVariant]}`}
        >
          {headline}
        </h2>
        {description && (
          <p
            className={`text-xl mb-8 ${descClasses[backgroundVariant]} max-w-2xl mx-auto`}
          >
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryButton.href || '#'}
            onClick={primaryButton.onClick}
            className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all ${
              backgroundVariant === 'gradient'
                ? 'bg-white text-indigo-600 hover:bg-gray-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {primaryButton.text}
          </a>
          {secondaryButton && (
            <a
              href={secondaryButton.href || '#'}
              onClick={secondaryButton.onClick}
              className={`px-8 py-4 rounded-xl text-lg font-semibold border-2 transition-all ${
                backgroundVariant === 'gradient'
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

// Footer Component
interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  companyName?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  showNewsletter?: boolean;
  copyrightYear?: number;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  companyName = 'Company',
  description,
  sections = [],
  socialLinks = [],
  showNewsletter = false,
  copyrightYear = new Date().getFullYear(),
  className = '',
}) => {
  const [email, setEmail] = useState('');

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">{companyName}</h3>
            {description && <p className="text-gray-400 mb-6">{description}</p>}
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {showNewsletter && (
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>
            © {copyrightYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Built for speed with optimized performance that keeps your users engaged and your business growing.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure by Default',
      description: 'Enterprise-grade security features protect your data and your customers information at all times.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Easy Integration',
      description: 'Seamlessly integrate with your existing tools and workflows. Get started in minutes, not hours.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Advanced Analytics',
      description: 'Gain deep insights into your business with comprehensive analytics and real-time reporting dashboards.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Our dedicated support team is here to help you succeed, anytime you need us, day or night.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Auto Updates',
      description: 'Stay current with automatic updates that bring new features and improvements without any hassle.',
    },
  ];

  const testimonials = [
    {
      quote: 'This platform has completely transformed how we work. The efficiency gains have been remarkable and our team loves using it every day.',
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechFlow Inc',
      rating: 5,
    },
    {
      quote: 'The best investment we made this year. Customer support is outstanding and the features are exactly what we needed to scale.',
      name: 'Michael Chen',
      role: 'CTO',
      company: 'DataDrive',
      rating: 5,
    },
    {
      quote: 'Simple, powerful, and incredibly well-designed. It just works. We have seen a 40% increase in productivity since switching.',
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'Innovate Labs',
      rating: 5,
    },
  ];

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Integrations', href: '#integrations' },
        { label: 'Changelog', href: '#changelog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012}})