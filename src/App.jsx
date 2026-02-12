import React from 'react';

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "menu", "label": "Our Menu"}, {"id": "about", "label": "Our Story"}, {"id": "brunch", "label": "Brunch"}, {"id": "visit", "label": "Visit Us"}];

  return (
    <nav className="bg-amber-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold text-amber-50">Bean & Brew</span>
            <span className="text-xs text-amber-200 -mt-1 tracking-wide">Fresh Brews, Warm Hearts</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-amber-200"
                    : "text-amber-100 hover:text-amber-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-amber-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`block w-full text-left py-2 px-4 ${
                  currentView === item.id ? "text-amber-200 bg-amber-800" : "text-amber-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = ({ onNavigate }) => {
  const cards = [{"title": "Specialty Espresso", "description": "Single-origin beans roasted in small batches and pulled to perfection by our skilled baristas. From velvety lattes to bold ristrettos, every sip is an experience.", "cta": "Explore Our Coffees", "icon": "☕", "nav": "menu"}, {"title": "Artisan Pastries", "description": "Baked fresh each morning using locally sourced ingredients. Enjoy buttery croissants, almond tarts, and seasonal creations that pair beautifully with your favorite brew.", "cta": "See the Pastry Case", "icon": "🥐", "nav": "menu"}, {"title": "Light Brunch", "description": "Savor wholesome brunch plates designed to complement your coffee ritual. From avocado toast to eggs Benedict, our kitchen serves comfort with every plate.", "cta": "View Brunch Menu", "icon": "🍳", "nav": "brunch"}, {"title": "A Warm Welcome", "description": "Settle into our inviting atmosphere with exposed wood, soft lighting, and the rich aroma of freshly ground coffee. Bean & Brew is your home away from home.", "cta": "Plan Your Visit", "icon": "🏠", "nav": "visit"}];
  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-200 to-amber-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-4">
            Where Every Cup Tells a Story
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-amber-700 italic mb-6">
            Fresh Brews, Warm Hearts
          </p>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto">
            Handcrafted espresso, freshly baked pastries, and a warm brunch experience crafted with care in our cozy corner of the neighborhood.
          </p>
        </div>

        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl border border-amber-300">
          <div className="relative h-64 md:h-96">
            <img
              src="https://picsum.photos/seed/coffee-latte"
              alt="Bean & Brew cozy interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-900/30 to-transparent flex items-end">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-2">Welcome to Bean & Brew</h2>
                <p className="text-amber-200 text-lg max-w-xl">Your neighborhood coffee sanctuary — where every cup is crafted with love and every visit feels like coming home.</p>
                <button
                  onClick={() => onNavigate && onNavigate("visit")}
                  className="mt-4 bg-amber-600 hover:bg-amber-700 text-amber-50 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Visit Us Today
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(cards || []).map((card, index) => (
            <div
              key={index}
              className="bg-amber-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-200 group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">{card.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">{card.title}</h3>
              <p className="text-stone-700 mb-6">{card.description}</p>
              <button
                onClick={() => onNavigate && onNavigate(card.nav || "visit")}
                className="text-amber-600 font-semibold hover:text-amber-800 inline-flex items-center"
              >
                {card.cta || "Learn more"} →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-200">
            <img
              src="https://picsum.photos/seed/coffee-latte"
              alt="Specialty latte art"
              className="w-full h-48 object-cover"
            />
            <div className="bg-amber-50 p-4">
              <h4 className="font-bold text-amber-900">Latte Art Perfection</h4>
              <p className="text-stone-600 text-sm">Every cup is a canvas for our baristas</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-200">
            <img
              src="https://picsum.photos/seed/coffee-latte"
              alt="Fresh espresso shot"
              className="w-full h-48 object-cover"
            />
            <div className="bg-amber-50 p-4">
              <h4 className="font-bold text-amber-900">Bold Espresso</h4>
              <p className="text-stone-600 text-sm">Small-batch roasted for maximum flavor</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-200">
            <img
              src="https://picsum.photos/seed/coffee-latte"
              alt="Fresh coffee beans"
              className="w-full h-48 object-cover"
            />
            <div className="bg-amber-50 p-4">
              <h4 className="font-bold text-amber-900">Single-Origin Beans</h4>
              <p className="text-stone-600 text-sm">Sourced from the world's finest farms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = ({ onNavigate }) => {
  const espressoMenu = [
    { name: "Classic Espresso", price: "$3.50", desc: "Bold, rich, and perfectly pulled" },
    { name: "Cappuccino", price: "$4.50", desc: "Velvety foam over double espresso" },
    { name: "Vanilla Latte", price: "$5.00", desc: "House-made vanilla syrup with steamed milk" },
    { name: "Caramel Macchiato", price: "$5.25", desc: "Layered espresso with caramel drizzle" },
    { name: "Mocha", price: "$5.50", desc: "Rich chocolate meets bold espresso" },
    { name: "Cold Brew", price: "$4.75", desc: "Slow-steeped for 18 hours" },
  ];

  const pastryMenu = [
    { name: "Butter Croissant", price: "$3.75", desc: "Flaky, golden, and baked fresh daily" },
    { name: "Almond Tart", price: "$4.50", desc: "Frangipane filling with toasted almonds" },
    { name: "Blueberry Muffin", price: "$3.50", desc: "Bursting with fresh blueberries" },
    { name: "Cinnamon Roll", price: "$4.25", desc: "Warm with cream cheese frosting" },
    { name: "Chocolate Scone", price: "$3.75", desc: "Dark chocolate chunks in a buttery scone" },
    { name: "Banana Bread", price: "$3.50", desc: "Moist, nutty, and perfectly spiced" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-200 to-amber-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Our Menu</h1>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto">
            Every item crafted with care, from our espresso bar to our pastry case.
          </p>
        </div>

        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-amber-300">
          <img
            src="https://picsum.photos/seed/coffee-latte"
            alt="Coffee menu showcase"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">☕</span>
              </div>
              <h2 className="text-3xl font-bold text-amber-900">Espresso Bar</h2>
            </div>
            <div className="space-y-4">
              {espressoMenu.map((item, i) => (
                <div key={i} className="bg-amber-50 p-5 rounded-xl border border-amber-200 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-amber-900 text-lg">{item.name}</h3>
                      <p className="text-stone-600 text-sm mt-1">{item.desc}</p>
                    </div>
                    <span className="text-amber-600 font-bold text-lg">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🥐</span>
              </div>
              <h2 className="text-3xl font-bold text-amber-900">Pastry Case</h2>
            </div>
            <div className="space-y-4">
              {pastryMenu.map((item, i) => (
                <div key={i} className="bg-amber-50 p-5 rounded-xl border border-amber-200 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-amber-900 text-lg">{item.name}</h3>
                      <p className="text-stone-600 text-sm mt-1">{item.desc}</p>
                    </div>
                    <span className="text-amber-600 font-bold text-lg">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate && onNavigate("brunch")}
            className="bg-amber-600 hover:bg-amber-700 text-amber-50 font-semibold py-3 px-8 rounded-xl transition-colors text-lg"
          >
            View Brunch Menu →
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const milestones = [
    { year: "2015", event: "Bean & Brew opens its doors in a tiny 400 sq ft space" },