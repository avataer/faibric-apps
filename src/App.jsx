import React from 'react';

// LIBRARY COMPONENTS - Golden Templates (pre-validated, do not transform)

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "hero", "label": "Home"}, {"id": "products", "label": "Our Products"}, {"id": "about", "label": "About Us"}, {"id": "order", "label": "Order Now"}];

  return (
    <nav className="bg-gray-900 shadow-lg shadow-purple-900/50 sticky top-0 z-50 border-b border-purple-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-purple-300">Midnight Treats</span>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-purple-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-purple-300"
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
                  currentView === item.id ? "text-purple-400 bg-purple-900/50" : "text-gray-400"
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
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{backgroundImage: "url('https://picsum.photos/seed/bakery/1920/1080')"}}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-gray-900/80 to-purple-900/70"></div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-purple-200">
          Darkly Delicious Delights Await You
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 text-gray-300">
          Artisan breads, decadent pastries, and custom cakes made from scratch with love and the finest ingredients.
        </p>
        <button
          onClick={() => onNavigate && onNavigate("contact")}
          className="px-8 py-4 bg-purple-700 text-purple-100 rounded-lg font-semibold text-lg hover:bg-purple-600 transition-all duration-300 shadow-xl shadow-purple-900/50 hover:shadow-2xl transform hover:scale-105 border border-purple-500"
        >
          Order Now
        </button>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [{"title": "Baked Fresh Daily", "description": "Every item is prepared fresh each morning using time-honored recipes and techniques passed down through generations.", "icon_letter": "F"}, {"title": "Premium Ingredients", "description": "We source only the finest organic flour, real butter, and locally sourced eggs to ensure exceptional quality in every bite.", "icon_letter": "P"}, {"title": "Custom Creations", "description": "From wedding cakes to birthday treats, our talented bakers bring your sweetest visions to life with artistic precision.", "icon_letter": "C"}, {"title": "Made With Love", "description": "Our passionate team of bakers treats every order as if it were for our own family, ensuring perfection every time.", "icon_letter": "L"}];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-300 mb-4">Why Choose Midnight Treats</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">We take pride in every crumb we create</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(features || []).map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-2xl shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-800/40 transition-all duration-300 transform hover:-translate-y-1 border border-purple-800/50"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900/50">
                <span className="text-2xl font-bold text-purple-200">{feature.icon_letter || (index + 1)}</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-200 mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [{"name": "Artisan Breads", "description": "Crusty sourdough, fluffy brioche, hearty whole wheat, and classic French baguettes baked to golden perfection.", "price": "From $4.50"}, {"name": "Pastries and Croissants", "description": "Flaky butter croissants, fruit danishes, pain au chocolat, and seasonal turnovers made with layers of love.", "price": "From $3.25"}, {"name": "Custom Celebration Cakes", "description": "Stunning custom cakes for weddings, birthdays, and special occasions designed to match your vision and taste.", "price": "From $45.00"}, {"name": "Cookies and Treats", "description": "Classic chocolate chip, delicate macarons, brownies, and specialty cookies that melt in your mouth.", "price": "From $2.00"}];

  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-300 mb-16">Our Delicious Products</h2>

        <div className="space-y-6">
          {(services || []).map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-md shadow-purple-900/30 hover:shadow-lg hover:shadow-purple-800/40 transition-shadow border border-purple-800/50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">{service.name}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
                {service.price && (
                  <span className="text-lg font-semibold text-purple-400 ml-4">{service.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const paragraphs = ["Midnight Treats was founded in 2010 by master baker Maria Chen, who turned her grandmother's cherished recipes into a beloved community gathering place. What started as a small corner shop has grown into a destination for anyone seeking authentic, handcrafted baked goods.", "Every morning at 4 AM, our dedicated team begins the day by mixing dough, shaping loaves, and filling the air with the irresistible aroma of fresh baking. We believe that great baking is both an art and a science, requiring patience, precision, and passion.", "Today, Midnight Treats serves hundreds of happy customers daily, from busy professionals grabbing a morning croissant to families ordering custom cakes for their most treasured celebrations. We are honored to be part of your special moments."];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-purple-300 mb-8">Our Dark Story</h2>
            <div className="space-y-4 text-lg text-gray-400 leading-relaxed">
              {(paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl opacity-30 blur-xl"></div>
            <img
              src="https://picsum.photos/seed/bread/800/600"
              alt="About us"
              className="relative rounded-2xl shadow-xl shadow-purple-900/50 w-full border border-purple-800/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setSending(false);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-300 mb-4">Place Your Order</h2>
          <p className="text-xl text-gray-400">Custom orders require 48 hours notice. Fill out the form below and we will confirm your order within 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted && (
                <div className="bg-purple-900/50 border border-purple-600 text-purple-200 px-4 py-3 rounded-lg">
                  Thank you for your message. We will get back to you soon.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full p-3 bg-gray-800 border border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none text-gray-200"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-purple-700 text-purple-100 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:bg-gray-600 border border-purple-500"
              >
                {sending ? "Sending..." : "Submit Order"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-400">
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center border border-purple-700">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1