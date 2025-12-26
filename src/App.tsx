import React, { useState, useEffect } from "react";

// Interfaces
interface NavItem {
  label: string;
  href: string;
}

interface NavigationHeaderProps {
  logo: string;
  navItems: NavItem[];
  ctaText: string;
  ctaHref: string;
}

interface HeroFullProps {
  headline: string;
  subheadline: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  backgroundImage?: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  sectionTitle: string;
  sectionSubtitle: string;
  features: Feature[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

interface LayoutAppProps {
  children: React.ReactNode;
}

// Navigation Header Component
function NavigationHeader({ logo, navItems, ctaText, ctaHref }: NavigationHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold ${isScrolled ? "text-indigo-600" : "text-white"}`}>
              {logo}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`font-medium transition-colors hover:text-indigo-400 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              {ctaText}
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? "bg-gray-800" : "bg-white"}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? "bg-gray-800" : "bg-white"}`}></div>
            <div className={`w-6 h-0.5 transition-all ${isScrolled ? "bg-gray-800" : "bg-white"}`}></div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-xl mt-2 p-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-indigo-600"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full text-center font-semibold"
            >
              {ctaText}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

// Hero Full Component
function HeroFull({
  headline,
  subheadline,
  ctaPrimaryText,
  ctaPrimaryHref,
  ctaSecondaryText,
  ctaSecondaryHref,
}: HeroFullProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          {headline}
        </h1>
        <p className="text-xl sm:text-2xl text-indigo-200 mb-10 max-w-3xl mx-auto">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={ctaPrimaryHref}
            className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-100 transition-colors shadow-xl"
          >
            {ctaPrimaryText}
          </a>
          {ctaSecondaryText && ctaSecondaryHref && (
            <a
              href={ctaSecondaryHref}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-900 transition-colors"
            >
              {ctaSecondaryText}
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// Feature Grid Component
function FeatureGrid({ sectionTitle, sectionSubtitle, features }: FeatureGridProps) {
  const iconMap: { [key: string]: React.ReactNode } = {
    lightning: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    shield: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    chart: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    globe: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    code: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    heart: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                {iconMap[feature.icon] || iconMap["lightning"]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Carousel Component
function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Trusted by Industry Leaders
        </h2>

        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12">
                <svg className="w-12 h-12 text-indigo-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl sm:text-2xl text-white leading-relaxed mb-8">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-indigo-300">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Layout App Component
function LayoutApp({ children }: LayoutAppProps) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Faibric. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sample Data
const navItems: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const features: Feature[] = [
  {
    icon: "lightning",
    title: "Lightning Fast Performance",
    description: "Experience blazing fast load times and seamless interactions that keep your users engaged and satisfied.",
  },
  {
    icon: "shield",
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, ensuring your data remains protected at all times.",
  },
  {
    icon: "chart",
    title: "Advanced Analytics",
    description: "Gain deep insights with comprehensive analytics and reporting tools to drive informed decisions.",
  },
  {
    icon: "globe",
    title: "Global Scale",
    description: "Deploy worldwide with our distributed infrastructure that ensures reliability across all regions.",
  },
  {
    icon: "code",
    title: "Developer First",
    description: "Built with developers in mind, featuring robust APIs, comprehensive documentation, and SDKs.",
  },
  {
    icon: "heart",
    title: "24/7 Support",
    description: "Our dedicated support team is always available to help you succeed with personalized assistance.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote: "Faibric has transformed how we build and deploy our applications. The platform is intuitive and incredibly powerful.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Inc",
  },
  {
    quote: "We reduced our development time by 60% after switching to Faibric. It is simply the best tool we have ever used.",
    author: "Marcus Johnson",
    role: "Engineering Lead",
    company: "DataStream",
  },
  {
    quote: "The support team at Faibric is exceptional. They helped us migrate our entire infrastructure in just two weeks.",
    author: "Emily Rodriguez",
    role: "VP of Engineering",
    company: "CloudNine",
  },
];

// Main App Component
function App() {
  return (
    <LayoutApp>
      <NavigationHeader
        logo="Faibric"
        navItems={navItems}
        ctaText="Get Started"
        ctaHref="#signup"
      />
      <HeroFull
        headline="Build the Future with Faibric"
        subheadline="The intelligent platform that empowers teams to create, deploy, and scale applications faster than ever before."
        ctaPrimaryText="Start Free Trial"
        ctaPrimaryHref="#trial"
        ctaSecondaryText="Watch Demo"
        ctaSecondaryHref="#demo"
      />
      <FeatureGrid
        sectionTitle="Everything You Need to Succeed"
        sectionSubtitle="Powerful features designed to accelerate your development workflow and deliver exceptional results."
        features={features}
      />
      <TestimonialCarousel testimonials={testimonials} />
    </LayoutApp>
  );
}

export default App;