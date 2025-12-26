import React, { useState, useEffect } from 'react';

// Interfaces
interface NavItem {
  label: string;
  href: string;
}

interface NavigationHeaderProps {
  logo: string;
  navItems: NavItem[];
  ctaText?: string;
  ctaHref?: string;
}

interface HeroFullProps {
  headline: string;
  subheadline: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  backgroundGradient?: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  sectionTitle: string;
  sectionSubtitle?: string;
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
  autoPlayInterval?: number;
}

interface LayoutAppProps {
  children: React.ReactNode;
}

// Components
function NavigationHeader({ logo, navItems, ctaText, ctaHref }: NavigationHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>{logo}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors hover:text-violet-500 ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {ctaText && (
              <a href={ctaHref} className="hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5">
                {ctaText}
              </a>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
              <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl mt-2 p-4 absolute left-4 right-4">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="block py-3 text-gray-700 font-medium hover:text-violet-600">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

function HeroFull({ headline, subheadline, ctaPrimary, ctaSecondary }: HeroFullProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-white/80 text-sm font-medium">Now in Public Beta</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {headline.split(' ').map((word, i) => (
            <span key={i} className={word.toLowerCase() === 'ai' ? 'bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={ctaPrimary.href} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1 text-lg">
            {ctaPrimary.text}
          </a>
          {ctaSecondary && (
            <a href={ctaSecondary.href} className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg">
              {ctaSecondary.text}
            </a>
          )}
        </div>
        
        <div className="mt-16 flex items-center justify-center gap-8 text-white/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="text-sm">Active Users</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="text-sm">Uptime</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50M+</div>
            <div className="text-sm">API Calls</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid({ sectionTitle, sectionSubtitle, features }: FeatureGridProps) {
  const iconMap: Record<string, React.ReactNode> = {
    'lightning': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    'shield': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    'code': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    'chart': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    'globe': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    'cpu': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          {sectionSubtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{sectionSubtitle}</p>}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {iconMap[feature.icon] || iconMap['lightning']}
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel({ testimonials, autoPlayInterval = 5000 }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [testimonials.length, autoPlayInterval]);

  return (
    <section className="py-24 bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Loved by Developers</h2>
          <p className="text-white/60">See what our users are saying about Faibric AI</p>
        </div>
        
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`transition-all duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-white/60 text-sm">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => setActiveIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-violet-500' : 'bg-white/30 hover:bg-white/50'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LayoutApp({ children }: LayoutAppProps) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {children}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold">Faibric AI</span>
            </div>
            <div className="text-gray-400 text-sm">© 2024 Faibric AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sample Data
const navItems: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Documentation', href: '#docs' },
  { label: 'Blog', href: '#blog' },
];

const features: Feature[] = [
  { icon: 'lightning', title: 'Blazing Fast', description: 'Experience lightning-fast AI inference with our optimized infrastructure, delivering results in milliseconds.' },
  { icon: 'shield', title: 'Enterprise Security', description: 'Bank-grade encryption and compliance with SOC2, GDPR, and HIPAA standards to keep your data safe.' },
  { icon: 'code', title: 'Developer First', description: 'Beautiful APIs, comprehensive SDKs, and extensive documentation make integration a breeze.' },
  { icon: 'chart', title: 'Smart Analytics', description: 'Gain deep insights into your AI usage with real-time analytics and customizable dashboards.' },
  { icon: 'globe', title: 'Global Scale', description: 'Deploy globally with automatic scaling across 50+ edge locations worldwide.' },
  { icon: 'cpu', title: 'Custom Models', description: 'Train and deploy custom AI models tailored to your specific business needs.' },
];

const testimonials: Testimonial[] = [
  { quote: 'Faibric AI transformed how we build products. The API is incredibly intuitive and the performance is unmatched.', author: 'Sarah Chen', role: 'CTO', company: 'TechStart' },
  { quote: 'We reduced our AI infrastructure costs by 60% while improving response times. Faibric is a game-changer.', author: 'Marcus Johnson', role: 'Lead Engineer', company: 'ScaleUp Inc' },
  { quote: 'The best developer experience I've ever had with an AI platform. Documentation is superb and support is fantastic.', author: 'Elena Rodriguez', role: 'Founder', company: 'DevFlow' },
];

// Main App Component
function App() {
  return (
    <LayoutApp>
      <NavigationHeader logo="Faibric AI" navItems={navItems} ctaText="Get Started" ctaHref="#signup" />
      <HeroFull
        headline="Build Smarter with Faibric AI"
        subheadline="The next-generation AI platform that empowers developers to create intelligent applications with unprecedented speed and simplicity."
        ctaPrimary={{ text: 'Start Building Free', href: '#signup' }}
        ctaSecondary={{ text: 'Watch Demo', href: '#demo' }}
      />
      <FeatureGrid sectionTitle="Why Choose Faibric AI?" sectionSubtitle="Everything you need to build world-class AI-powered applications" features={features} />
      <TestimonialCarousel testimonials={testimonials} autoPlayInterval={6000} />
    </LayoutApp>
  );
}

export default App;