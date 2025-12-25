import React from 'react';

// Interface for social media links
interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Interface for footer link sections
interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

// Interface for footer props - making it reusable
interface FooterProps {
  companyName?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  showNewsletter?: boolean;
  copyrightYear?: number;
  className?: string;
}

// Default social icons as SVG components
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

// Default footer sections for reusability
const defaultSections: FooterSection[] = [
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
];

// Default social links
const defaultSocialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com', icon: defaultSocialIcons.facebook },
  { name: 'Twitter', href: 'https://twitter.com', icon: defaultSocialIcons.twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: defaultSocialIcons.linkedin },
  { name: 'Instagram', href: 'https://instagram.com', icon: defaultSocialIcons.instagram },
];

const Footer: React.FC<FooterProps> = ({
  companyName = 'Company Name',
  description = 'We are dedicated to providing innovative solutions that help businesses grow and succeed in the digital age.',
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  showNewsletter = true,
  copyrightYear = new Date().getFullYear(),
  className = '',
}) => {
  // State for newsletter email input
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info section */}
          <div className="lg:col-span-2">
            <h2 className="text-white text-xl font-bold mb-4">{companyName}</h2>
            <p className="text-gray-400 mb-6 max-w-md">{description}</p>
            
            {/* Social links */}
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

          {/* Footer link sections */}
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

        {/* Newsletter section - optional */}
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

      {/* Bottom bar with copyright */}
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

// Interface for a single pricing tier
interface PricingTier {
  name: string;
  price: string | number;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
  onSelect?: () => void;
}

// Props interface for the PricingTable component
interface PricingTableProps {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
  className?: string;
}

// Individual pricing card component
const PricingCard: React.FC<{ tier: PricingTier }> = ({ tier }) => {
  const {
    name,
    price,
    period = '/month',
    description,
    features,
    highlighted = false,
    buttonText = 'Get Started',
    onSelect,
  } = tier;

  return (
    <div
      className={`
        relative rounded-2xl p-8 flex flex-col
        ${highlighted
          ? 'bg-indigo-600 text-white shadow-2xl scale-105 z-10'
          : 'bg-white text-gray-900 shadow-lg border border-gray-200'
        }
        transition-all duration-300 hover:shadow-xl
      `}
    >
      {/* Popular badge for highlighted tier */}
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-400 text-white text-sm font-semibold px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier name */}
      <h3 className={`text-xl font-semibold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h3>

      {/* Description */}
      {description && (
        <p className={`mt-2 text-sm ${highlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
          {description}
        </p>
      )}

      {/* Price display */}
      <div className="mt-6 flex items-baseline">
        <span className={`text-5xl font-bold tracking-tight ${highlighted ? 'text-white' : 'text-gray-900'}`}>
          {typeof price === 'number' ? `$${price}` : price}
        </span>
        {period && (
          <span className={`ml-1 text-lg ${highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
            {period}
          </span>
        )}
      </div>

      {/* Features list */}
      <ul className="mt-8 flex-1 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {/* Checkmark icon */}
            <svg
              className={`h-5 w-5 flex-shrink-0 ${highlighted ? 'text-indigo-200' : 'text-indigo-500'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className={`ml-3 text-sm ${highlighted ? 'text-indigo-100' : 'text-gray-600'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onSelect}
        className={`
          mt-8 w-full py-3 px-6 rounded-lg font-semibold
          transition-all duration-200
          ${highlighted
            ? 'bg-white text-indigo-600 hover:bg-indigo-50'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        `}
      >
        {buttonText}
      </button>
    </div>
  );
};

/**
 * Reusable PricingTable component that displays pricing tiers
 * Supports any number of tiers with customizable features
 */
const PricingTable: React.FC<PricingTableProps> = ({
  tiers,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`py-12 px-4 ${className}`}>
      {/* Header section */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      {/* Pricing cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <PricingCard key={index} tier={tier} />
        ))}
      </div>
    </div>
  );
};

// Header component for the pricing page
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">PricePro</span>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Products
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Features
              </a>
              <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 px-3 py-2 text-sm font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Sign in
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero section for the pricing page
const PricingHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          Simple, Transparent Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
          Choose the perfect plan
          <br />
          <span className="text-indigo-600">for your business</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Start free and scale as you grow. No hidden fees, no surprises. 
          Cancel anytime with our hassle-free billing.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <span className="text-gray-500">Monthly</span>
          <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
          </button>
          <span className="text-gray-900 font-medium">Annual <span className="text-green-500 text-sm">(Save 20%)</span></span>
        </div>
      </div>
    </div>
  );
};

// FAQ Section
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. If you upgrade, you'll be charged a prorated amount for the remainder of the current period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also pay via invoice."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! All our paid plans come with a 14-day free trial. No credit card required to start. You'll have full access to all features during the trial period."
    },
    {
      question: "What happens when I exceed my plan limits?",
      answer: "We'll notify you when you're approaching your limits. You can choose to upgrade your plan or purchase additional capacity. We'll never cut off your service without warning."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team for a full refund."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Got questions? We've got answers.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials section
const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Switching to the Pro plan was the best decision for our startup. The ROI has been incredible.",
      author: "Sarah Chen",
      role: "CEO, TechFlow",
      avatar: "SC"
    },
    {
      quote: "The Enterprise features helped us scale from 10 to 100 employees without any hiccups.",
      author: "Michael Roberts",
      role: "CTO, ScaleUp Inc",
      avatar: "MR"
    },
    {
      quote: "Customer support is amazing. They helped us find the perfect plan for our needs.",
      author: "Emily Watson",
      role: "Operations Lead, GrowthCo",
      avatar: "EW"
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-gray-600">See what our customers have to say</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

  // Define the 3 pricing tiers
  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: 9,
      period: '/month',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 5 projects',
        '1 GB storage',
        'Basic analytics',
        'Email support',
        'API access',
        'Community forum access'
      ],
      highlighted: false,
      buttonText: 'Start Free Trial',
      onSelect: () => {
        setSelectedPlan('Starter');
        alert('You selected the Starter plan! 🚀');
      }
    },
    {
      name: 'Professional',
      price: 29,
      period: '/month',
      description: 'Ideal for growing teams and businesses',
      features: [
        'Unlimited projects',
        '50 GB storage',
        'Advanced analytics',
        'Priority email support',
        'API access with higher limits',
        'Custom integrations',
        'Team collaboration tools',
        'SSO authentication'
      ],
      highlighted: true,
      buttonText: 'Start Free Trial',
      onSelect: () => {
        setSelectedPlan('Professional');
        alert('You selected the Professional plan! 🎉');
      }
    },
    {
      name: 'Enterprise',
      price: 99,
      period: '/month',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'White-label solution',
        '24/7 phone & email support',
        'Dedicated account manager',
        'Custom SLA',
        'On-premise deployment option',
        'Advanced security features',
        'Audit logs & compliance'
      ],
      highlighted: false,
      buttonText: 'Contact Sales',
      onSelect: () => {
        setSelectedPlan('Enterprise');
        alert('Thank you for your interest in Enterprise! Our sales team will contact you. 📞');
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero Section */}
        <PricingHero />

        {/* Pricing Table */}
        <div className="bg-gray-50 py-8">
          <PricingTable
            tiers={pricingTiers}
            title="Simple, transparent pricing"
            subtitle="Choose the plan that's right for you. All plans include a 14-day free trial."
            className="pb-16"
          />

          {/* Selected plan notification */}
          {selectedPlan && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800">
                  <span className="font-semibold">Great choice!</span> You selected the {selectedPlan} plan.
                </p>
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium">SSL Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm font-medium">All Cards Accepted</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-medium">30-Day Money Back</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <div className="bg-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are already growing their business with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        companyName="PricePro"
        description="Empowering businesses with flexible pricing solutions and exceptional customer service since 2020."
        showNewsletter={true}
      />
    </div>
  );
}

export default App;