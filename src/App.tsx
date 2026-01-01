import React, { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

interface NavItem {
  id: string;
  label: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

const Navigation = ({
  currentView,
  onNavigate,
}: {
  currentView: string;
  onNavigate: (viewId: string) => void;
}) => {
  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">SaaSify</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 font-medium">
              Sign In
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = ({
  onCtaClick,
  onSecondaryCtaClick,
}: {
  onCtaClick: () => void;
  onSecondaryCtaClick: () => void;
}) => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Build Better Products
          <span className="text-blue-600"> Faster</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          The all-in-one platform that helps teams collaborate, ship, and scale
          their products with confidence. Join thousands of companies already
          using SaaSify.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCtaClick}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Free Trial
          </button>
          <button
            onClick={onSecondaryCtaClick}
            className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border border-gray-200"
          >
            Watch Demo
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </section>
  );
};

const FeatureGrid = ({ features }: { features: Feature[] }) => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features to help your team build, ship, and grow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cta = ({
  headline,
  onClick,
}: {
  headline: string;
  onClick: () => void;
}) => {
  return (
    <section className="py-20 px-4 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">{headline}</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join over 10,000 teams already using SaaSify to build better products.
        </p>
        <button
          onClick={onClick}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
        >
          Get Started for Free
        </button>
      </div>
    </section>
  );
};

const Pricing = ({
  plans,
  billingPeriod,
  onSelectPlan,
  onBillingChange,
}: {
  plans: PricingPlan[];
  billingPeriod: "monthly" | "yearly";
  onSelectPlan: (plan: PricingPlan) => void;
  onBillingChange: (period: "monthly" | "yearly") => void;
}) => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the plan that works best for your team
          </p>
          <div className="flex items-center justify-center gap-4">
            <span
              className={
                billingPeriod === "monthly"
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500"
              }
            >
              Monthly
            </span>
            <button
              onClick={() =>
                onBillingChange(
                  billingPeriod === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors"
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  billingPeriod === "yearly" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={
                billingPeriod === "yearly"
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500"
              }
            >
              Yearly
              <span className="ml-1 text-green-500 text-sm">(Save 20%)</span>
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-lg ${
                plan.popular ? "ring-2 ring-blue-600 relative" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  $
                  {billingPeriod === "monthly" ? plan.price : plan.yearlyPrice}
                </span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ sections }: { sections: FooterSection[] }) => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold text-blue-400">SaaSify</span>
            <p className="mt-4 text-gray-400 max-w-sm">
              Building the future of team collaboration. Join thousands of teams
              shipping faster with SaaSify.
            </p>
          </div>
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
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
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            2024 SaaSify. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SettingsView = ({
  loading,
  error,
  apiData,
}: {
  loading: boolean;
  error: Error | null;
  apiData: Record<string, unknown>;
}) => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            API Connection Status
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`w-3 h-3 rounded-full ${
                loading
                  ? "bg-yellow-500 animate-pulse"
                  : error
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            />
            <span className="text-gray-600 dark:text-gray-300">
              {loading
                ? "Connecting..."
                : error
                ? "Connection Failed"
                : "Connected"}
            </span>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">Error: {error.message}</p>
          )}
          {apiData.lastUpdated && (
            <p className="text-gray-500 text-sm">
              Last updated: {String(apiData.lastUpdated)}
            </p>
          )}
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Sample API Data
          </h3>
          {apiData.crypto && (
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                Bitcoin: $
                {(apiData.crypto as Record<string, Record<string, number>)
                  ?.bitcoin?.usd?.toLocaleString() || "---"}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Ethereum: $
                {(apiData.crypto as Record<string, Record<string, number>)
                  ?.ethereum?.usd?.toLocaleString() || "---"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const App = () => {
  const [currentView, setCurrentView] = useState<string>("home");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // Data state
  const [apiData, setApiData] = useState<Record<string, unknown>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Gateway fetch function
  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch(
      "https://faibric-api.onrender.com/api/gateway/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, endpoint }),
      }
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    return result.data || result;
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [cryptoData] = await Promise.all([
          fetchFromGateway(
            "coingecko",
            "/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,eur"
          ).catch(() => null),
        ]);

        setApiData({
          crypto: cryptoData,
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch data"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sample data
  const features: Feature[] = [
    {
      icon: "A",
      title: "Analytics Dashboard",
      description:
        "Get real-time insights into your product performance with our comprehensive analytics.",
    },
    {
      icon: "C",
      title: "Team Collaboration",
      description:
        "Work together seamlessly with built-in collaboration tools and real-time updates.",
    },
    {
      icon: "S",
      title: "Security First",
      description:
        "Enterprise-grade security with SOC 2 compliance and end-to-end encryption.",
    },
    {
      icon: "I",
      title: "Integrations",
      description:
        "Connect with 100+ tools you already use, from Slack to Salesforce.",
    },
    {
      icon: "R",
      title: "Reporting",
      description:
        "Generate beautiful reports and share insights with stakeholders instantly.",
    },
    {
      icon: "P",
      title: "24/7 Support",
      description:
        "Our dedicated support team is here to help you succeed around the clock.",
    },
  ];

  const plans: PricingPlan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      yearlyPrice: 23,
      features: [
        "Up to 5 team members",
        "Basic analytics",
        "5GB storage",
        "Email support",
      ],
    },
    {
      id: "pro",
      name: "Professional",
      price: 79,
      yearlyPrice: 63,
      popular: true,
      features: [
        "Up to 20 team members",
        "Advanced analytics",
        "50GB storage",
        "Priority support",
        "Custom integrations",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 199,
      yearlyPrice: 159,
      features: [
        "Unlimited team members",
        "Enterprise analytics",
        "Unlimited storage",
        "Dedicated support",
        "Custom development",
        "SLA guarantee",
      ],
    },
  ];

  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Integrations", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
  ];

  // Event handlers
  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleHeroCtaClick = () => {
    setCurrentView("pricing");
  };

  const handleHeroSecondaryCtaClick = () => {
    setCurrentView("features");
  };

  const handleCtaClick = () => {
    setCurrentView("pricing");
  };

  const handlePricingSelectPlan = (plan: PricingPlan) => {
    console.log("Selected plan:", plan.name);
  };

  const handlePricingBillingChange = (period: "monthly" | "yearly") => {
    setBillingPeriod(period);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation
        currentView={currentView}
        onNavigate={handleNavigationNavigate}
      />
      <main>
        {currentView === "home" && (
          <div>
            <Hero
              onCtaClick={handleHeroCtaClick}
              onSecondaryCtaClick={handleHeroSecondaryCtaClick}
            />
            <FeatureGrid features={features} />
            <Cta
              headline="Ready to get started?"
              onClick={handleCtaClick}
            />
            <Footer sections={footerSections} />
          </div>
        )}
        {currentView === "features" && (
          <div className="pt-16">
            <FeatureGrid features={features} />
            <Footer sections={footerSections} />
          </div>
        )}
        {currentView === "pricing" && (
          <div className="pt-16">
            <Pricing
              plans={plans}
              billingPeriod={billingPeriod}
              onSelectPlan={handlePricingSelectPlan}
              onBillingChange={handlePricingBillingChange}
            />
            <Footer sections={footerSections} />
          </div>
        )}
        {currentView === "settings" && (
          <div className="pt-16">
            <SettingsView loading={loading} error={error} apiData={apiData} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;