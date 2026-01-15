import React from 'react';

// LIBRARY COMPONENTS - Golden Templates (pre-validated, do not transform)

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "home", "label": "Home"}, {"id": "products", "label": "Our Products"}, {"id": "about", "label": "About Us"}, {"id": "order", "label": "Order Now"}];

  return (
    <nav className="bg-gray-900 shadow-lg shadow-purple-900/50 sticky top-0 z-50 border-b border-purple-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-purple-300" style={{fontFamily: 'serif'}}>Midnight Treats</span>

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
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-purple-200" style={{fontFamily: 'serif'}}>
          Where Every Bite is a Dark Delight
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 text-gray-300">
          Handcrafted artisan breads, pastries, and custom cakes baked fresh nightly with love and the finest ingredients.
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
  const features = [{"title": "Baked Fresh Nightly", "description": "Every item is prepared from scratch each evening, ensuring you receive the freshest baked goods possible.", "icon_letter": "F"}, {"title": "Premium Ingredients", "description": "We source only the highest quality flour, butter, and organic ingredients for exceptional taste.", "icon_letter": "P"}, {"title": "Custom Creations", "description": "From wedding cakes to specialty orders, we bring your darkest visions to life.", "icon_letter": "C"}, {"title": "Family Recipes", "description": "Our recipes have been passed down through three generations of passionate bakers.", "icon_letter": "R"}];

  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-300 mb-4" style={{fontFamily: 'serif'}}>Why Choose Midnight Treats</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Discover what makes our baked goods truly special</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(features || []).map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-2xl shadow-lg shadow-purple-900/30 hover:shadow-purple-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-purple-900"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl flex items-center justify-center mb-6 border border-purple-600">
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
  const services = [{"name": "Artisan Breads", "description": "Sourdough, French baguettes, ciabatta, and rustic whole grain loaves baked to golden perfection.", "price": "From $6.99"}, {"name": "Fresh Pastries", "description": "Flaky croissants, Danish pastries, cinnamon rolls, and seasonal fruit tarts made daily.", "price": "From $3.49"}, {"name": "Custom Cakes", "description": "Wedding cakes, birthday cakes, and celebration cakes designed and decorated to your specifications.", "price": "Contact us"}, {"name": "Cupcakes and Cookies", "description": "Gourmet cupcakes in various flavors and hand-decorated cookies for any occasion.", "price": "From $2.99"}];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-300 mb-16" style={{fontFamily: 'serif'}}>Our Delicious Products</h2>

        <div className="space-y-6">
          {(services || []).map((service, index) => (
            <div
              key={index}
              className="bg-gray-950 p-6 rounded-xl shadow-md shadow-purple-900/30 hover:shadow-purple-800/50 transition-shadow border border-purple-900"
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
  const paragraphs = ["Midnight Treats was founded in 2008 by master baker Elena Martinez, who brought her grandmother's cherished recipes from the old country to share with our community. What started as a small neighborhood shop has grown into a beloved destination for those who appreciate the art of traditional baking.", "Every evening at midnight, our team of skilled bakers begins preparing the night's offerings. We believe that great baking cannot be rushed, which is why we use time-honored techniques like slow fermentation and hand-shaping to create products that taste like they came from your grandmother's kitchen.", "Today, Midnight Treats continues to serve our community with the same dedication to quality and craftsmanship that has defined us from day one. We invite you to taste the difference that passion and tradition make."];

  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-purple-300 mb-8" style={{fontFamily: 'serif'}}>Our Story</h2>
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
              className="relative rounded-2xl shadow-xl shadow-purple-900/50 w-full border border-purple-800"
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
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-300 mb-4" style={{fontFamily: 'serif'}}>Place Your Order</h2>
          <p className="text-xl text-gray-400">Ready to treat yourself or order for a special occasion? Get in touch with us today.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted && (
                <div className="bg-purple-900/50 border border-purple-700 text-purple-300 px-4 py-3 rounded-lg">
                  Thank you for your message. We will get back to you soon.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-gray-950 border border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 bg-gray-950 border border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full p-3 bg-gray-950 border border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition resize-none text-gray-200"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-purple-700 text-purple-100 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:bg-gray-700 border border-purple-600"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l