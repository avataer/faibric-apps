import React, { useState, ReactNode, FormEvent, ChangeEvent } from 'react';

// ============================================
// COMPONENT: AppLayout
// ============================================
interface AppLayoutProps {
  children: ReactNode;
  className?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className = '',
  headerContent,
  footerContent,
  showHeader = true,
  showFooter = true,
  maxWidth = '2xl',
}) => {
  const maxWidthClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white ${className}`}>
      {showHeader && headerContent}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && footerContent}
    </div>
  );
};

// ============================================
// COMPONENT: HeaderNavigation
// ============================================
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

// ============================================
// COMPONENT: Hero
// ============================================
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

// ============================================
// COMPONENT: FeatureGrid
// ============================================
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
  variant?: 'light' | 'dark' | 'gradient';
  className?: string;
}

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

// ============================================
// COMPONENT: Testimonial
// ============================================
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
          className="w-10 h-10 text-blue-500 opacity-20"
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
            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
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

// ============================================
// COMPONENT: CenteredCTA
// ============================================
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
  const backgroundStyles = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  };

  const textStyles = {
    light: 'text-gray-900',
    dark: 'text-white',
    gradient: 'text-white',
  };

  const descriptionStylesMap = {
    light: 'text-gray-600',
    dark: 'text-gray-300',
    gradient: 'text-indigo-100',
  };

  const renderButton = (button: CTAButton, isPrimary: boolean) => {
    const baseStyles = 'px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const primaryStyles = backgroundVariant === 'light'
      ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
      : 'bg-white text-indigo-600 hover:bg-gray-100 focus:ring-white';
    
    const secondaryStyles = backgroundVariant === 'light'
      ? 'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
      : 'bg-transparent border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10';

    const buttonStyles = `${baseStyles} ${isPrimary ? primaryStyles : secondaryStyles}`;

    if (button.href) {
      return (
        <a
          href={button.href}
          className={buttonStyles}
          role="button"
        >
          {button.text}
        </a>
      );
    }

    return (
      <button
        onClick={button.onClick}
        className={buttonStyles}
        type="button"
      >
        {button.text}
      </button>
    );
  };

  return (
    <section
      className={`${backgroundStyles[backgroundVariant]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${textStyles[backgroundVariant]}`}
          >
            {headline}
          </h2>

          {description && (
            <p
              className={`mt-4 sm:mt-6 text-lg sm:text-xl ${descriptionStylesMap[backgroundVariant]}`}
            >
              {description}
            </p>
          )}

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {renderButton(primaryButton, true)}
            {secondaryButton && renderButton(secondaryButton, false)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPONENT: Footer
// ============================================
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

const defaultSocialIcons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
};

const Footer: React.FC<FooterProps> = ({
  companyName = 'Company Name',
  description = 'We are dedicated to providing innovative solutions that help businesses grow and succeed in the digital age.',
  sections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Accessibility', href: '/accessibility' },
      ],
    },
  ],
  socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: defaultSocialIcons.facebook },
    { name: 'Twitter', href: 'https://twitter.com', icon: defaultSocialIcons.twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: defaultSocialIcons.linkedin },
    { name: 'Instagram', href: 'https://instagram.com', icon: defaultSocialIcons.instagram },
  ],
  showNewsletter = true,
  copyrightYear = new Date().getFullYear(),
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
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
                <h3 className="text-white font-semibold mb-1">Subscribe to our newsletter</h3>
                <p className="text-gray-400 text-sm">Get the latest news and updates delivered to your inbox.</p>
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
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
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
              © {copyrightYear} {companyName}. All rights reserved.
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

// ============================================
// COMPONENT: ReusableForm
// ============================================
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

interface FormValues {
  [key: string]: string;
}

interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (values: FormValues) => void | Promise<void>;
  submitLabel?: string;
  title?: string;
  description?: string;
  className?: string;
  isLoading?: boolean;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  title,
  description,
  className = '',
  isLoading = false,
}) => {
  const initialValues: FormValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as FormValues);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormValues>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormValues = {};
    
    fields.forEach((field) => {
      const value = values[field.name]?.trim();
      
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validate()) {
      await onSubmit(values);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const renderField = (field: FormField) => {
    const baseInputStyles = `
      w-full px-4 py-2 border rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-colors duration-200
      ${errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300'}
    `;

    if (field.type === 'textarea') {
      return (
        <textarea
          id={field.name}
          name={field.name}
          value={values[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          className={`${baseInputStyles} resize-none`}
          disabled={isLoading}
        />
      );
    }

    return (
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        value={values[field.name]}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={baseInputStyles}
        disabled={isLoading}
      />
    );
  };

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {renderField(field)}
            
            {errors[field.name] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[field.name]}
              </span>
            )}
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`
              flex-1 py-2 px-4 rounded-lg font-medium text-white
              transition-colors duration-200
              ${isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              submitLabel
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="
              px-4 py-2 rounded-lg font-medium
              text-gray-700 bg-gray-100 
              hover:bg-gray-200 active:bg-gray-300
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const App: React.FC = () => {
  const [isContactFormSubmitting, setIsContactFormSubmitting] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);

  // Navigation items for Faibric
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  // Features data for Faibric
  const features: FeatureItem[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Build production-ready apps in minutes, not months. Our AI understands your requirements and generates clean, maintainable code instantly.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning models trained on millions of code patterns to generate optimal solutions for your unique business needs.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Modular Components',
      description: 'Beautiful, reusable UI components that snap together like building blocks. Customize everything to match your brand perfectly.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption, SOC 2 compliance, and comprehensive audit logs for peace of mind.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Full Customization',
      description: 'Export clean, well-documented code that you own completely. Modify, extend, and integrate with your existing systems effortlessly.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Team Collaboration',
      description: 'Real-time collaboration features let your entire team work together seamlessly with version control and commenting built-in.',
    },
  ];

  // How it works steps
  const howItWorksSteps: FeatureItem[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: '1. Describe Your App',
      description: 'Tell Faibric what you want to build using natural language. Describe features, user flows, and design preferences.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: '2. AI Generates Code',
      description: 'Our advanced AI analyzes your requirements and generates production-ready React components with TypeScript and Tailwind CSS.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: '3. Preview & Iterate',
      description: 'See your app come to life in real-time. Make adjustments, refine features, and iterate until it's exactly what you envisioned.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      title: '4. Deploy Instantly',
      description: 'One-click deployment to production. Your app is live and ready to serve users in seconds with automatic scaling.',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Faibric reduced our development time from months to days. We built our entire customer portal in just one week. The AI understands exactly what we need.",
      name: "Sarah Chen",
      role: "CTO",
      company: "TechStart Inc",
      rating: 5,
    },
    {
      quote: "As a non-technical founder, Faibric was a game-changer. I could finally bring my ideas to life without hiring an expensive development team.",
      name: "Marcus Johnson",
      role: "Founder",
      company: "GrowthLabs",
      rating: 5,
    },
    {
      quote: "The code quality is exceptional. Clean, well-documented, and follows all best practices. Our senior developers were genuinely impressed.",
      name: "Emily Rodriguez",
      role: "Engineering Manager",
      company: "Enterprise Solutions",
      rating: 5,
    },
  ];

  // Contact form fields
  const contactFields: FormField[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'Your company name',
      required: false,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Tell us about your project...',
      required: true,
      rows: 4,
    },
  ];

  // Handle contact form submission
  const handleContactSubmit = async (values: FormValues) => {
    setIsContactFormSubmitting(true);
    setContactFormSuccess(false);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setContactFormSuccess(true);
      setTimeout(() => setContactFormSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsContactFormSubmitting(false);
    }
  };

  // Footer sections for Faibric
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Changelog', href: '#changelog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'API Reference', href: '#api' },
        { label: 'Templates', href: '#templates' },
        { label: 'Blog', href: '#blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
        { label: 'Press Kit', href: '#press' },
      ],
    },
  ];

  // Custom header
  const headerContent = (
    <HeaderNavigation
      logoText="Faibric"
      navItems={navItems}
      ctaButton={{ label: 'Start Building', href: '#contact' }}
      sticky={true}
    />
  );

  // Custom footer
  const footerContent = (
    <Footer
      companyName="Faibric"
      description="The AI-powered platform that transforms your ideas into production-ready applications. Build faster, scale smarter, and launch sooner."
      sections={footerSections}
      showNewsletter={true}
    />
  );

  return (
    <AppLayout
      headerContent={headerContent}
      footerContent={footerContent}
      showHeader={true}
      showFooter={true}
      maxWidth="full"
    >
      {/* Hero Section */}
      <Hero
        headline="Build Apps 10x Faster with AI"
        subheadline="Faibric transforms your ideas into production-ready applications in minutes. Describe what you want to build, and our AI generates beautiful, functional code that you can deploy instantly."
        primaryCTA={{ text: 'Start Building Free', href: '#contact' }}
        secondaryCTA={{ text: 'Watch Demo', href: '#how-it-works' }}
        backgroundClass="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800"
        alignment="center"
      >
        <div className="flex items-center justify-center gap-8 mt-4 text-white/80">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill
  );
}

export default App;