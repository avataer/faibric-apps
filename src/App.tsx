
import React, { useState } from 'react';

// layout_app component
/**
 * Props interface for the AppLayout component
 * Allows customization of the layout wrapper
 */
interface AppLayoutProps {
  /** Content to render inside the layout */
  children: React.ReactNode;
  /** Optional title for the header */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Optional custom class name for additional styling */
  className?: string;
}

/**
 * AppLayout - A reusable main layout wrapper component
 * Provides consistent structure with header, main content area, and optional footer
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title = 'Application',
  subtitle,
  showFooter = true,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo/Icon placeholder using text */}
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">[A]</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500">{subtitle}</p>
                )}
              </div>
            </div>
            
            {/* Navigation placeholder */}
            <nav className="hidden sm:flex items-center space-x-4">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                [HOME]
              </span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                [MENU]
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {children}
        </div>
      </main>

      {/* Footer Section */}
      {showFooter && (
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
              <p>[INFO] Built with React and Tailwind CSS</p>
              <p className="mt-2 sm:mt-0">[COPYRIGHT] {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

// navigation_header component
// Interface for navigation items
interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Props interface for reusable header navigation
interface HeaderNavProps {
  /** Application or brand name */
  brandName?: string;
  /** Array of navigation items */
  navItems?: NavItem[];
  /** Callback when navigation item is clicked */
  onNavClick?: (item: NavItem) => void;
  /** Show mobile menu toggle on small screens */
  showMobileMenu?: boolean;
}

/**
 * Reusable Header Navigation Component
 * A responsive navigation header with brand name and nav links
 */
const HeaderNav: React.FC<HeaderNavProps> = ({
  brandName = 'App',
  navItems = [],
  onNavClick,
  showMobileMenu = true,
}) => {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navigation item click
  const handleNavClick = (item: NavItem) => {
    if (onNavClick) {
      onNavClick(item);
    }
    // Close mobile menu after click
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand/Logo Section */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {brandName}
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          {showMobileMenu && (
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {/* Menu icon using text label */}
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <span className="text-lg font-bold">[X]</span>
                ) : (
                  <span className="text-lg font-bold">[=]</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// form_default component
/**
 * Props interface for the AppLayout component
 * Allows customization of the layout wrapper
 */
interface AppLayoutProps {
  /** Content to render inside the layout */
  children: React.ReactNode;
  /** Optional title for the header */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Optional custom class name for additional styling */
  className?: string;
}

/**
 * AppLayout - A reusable main layout wrapper component
 * Provides consistent structure with header, main content area, and optional footer
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title = 'Application',
  subtitle,
  showFooter = true,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo/Icon placeholder using text */}
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">[A]</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500">{subtitle}</p>
                )}
              </div>
            </div>
            
            {/* Navigation placeholder */}
            <nav className="hidden sm:flex items-center space-x-4">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                [HOME]
              </span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                [MENU]
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {children}
        </div>
      </main>

      {/* Footer Section */}
      {showFooter && (
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
              <p>[INFO] Built with React and Tailwind CSS</p>
              <p className="mt-2 sm:mt-0">[COPYRIGHT] {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};


function App() {
  return (
    <div className="app">
      <Layoutapp />
      <Navigationheader />
      <Formdefault />
    </div>
  );
}

export default App;
