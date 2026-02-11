import React from 'react';

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "home", "label": "Home"}, {"id": "portfolio", "label": "Portfolio"}, {"id": "about", "label": "About"}, {"id": "services", "label": "Services"}, {"id": "contact", "label": "Contact"}];

  return (
    <nav className="bg-red-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-white">Lens & Shadow</span>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-white"
                    : "text-red-200 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-white"
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
                  currentView === item.id ? "text-white bg-red-900" : "text-red-200"
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
    <section className="min-h-screen flex items-center justify-center bg-red-700">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-none">
          Capturing Moments That Speak Without Words
        </h1>
        <p className="text-xl md:text-2xl text-red-100 mb-12 max-w-2xl mx-auto font-light">
          Fine art and editorial photography rooted in emotion, light, and storytelling. Based in New York, available worldwide.
        </p>
        <button
          onClick={() => onNavigate && onNavigate("contact")}
          className="px-10 py-5 bg-white text-red-800 text-lg font-medium hover:bg-red-50 transition-colors"
        >
          View My Work →
        </button>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [{"title": "Portrait Photography", "description": "Intimate, expressive portraits that reveal personality and depth. Whether for personal branding, editorial features, or creative projects, every session is tailored to you.", "icon_letter": "P"}, {"title": "Event Coverage", "description": "Discreet, documentary-style coverage of weddings, galas, and private gatherings. I focus on authentic moments rather than staged compositions.", "icon_letter": "E"}, {"title": "Commercial Work", "description": "High-end product, lifestyle, and brand photography crafted to elevate your visual identity and connect with your audience on a deeper level.", "icon_letter": "C"}, {"title": "Fine Art Prints", "description": "Museum-quality archival prints available for collectors, interior designers, and art enthusiasts. Each piece is signed, numbered, and printed on premium paper.", "icon_letter": "F"}];

  return (
    <section className="py-20 px-4 bg-red-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-red-900 mb-4">What I Offer</h2>
          <p className="text-xl text-red-700 max-w-2xl mx-auto">Every project is approached with intention, artistry, and a commitment to delivering images that resonate long after the moment has passed.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(features || []).map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">{feature.icon_letter || (index + 1)}</span>
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-3">{feature.title}</h3>
              <p className="text-red-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const paragraphs = ["I am a New York-based photographer with over twelve years of experience working at the intersection of fine art and commercial imagery. My work has been featured in publications including Vogue Italia, The New York Times, and Aperture Magazine.", "I believe that the most powerful photographs are born from patience, trust, and an obsessive attention to light. Whether I am on location in a rain-soaked alley or inside a sunlit studio, my goal remains the same: to create images that feel both timeless and alive.", "When I am not behind the camera, I teach workshops on visual storytelling and mentor emerging photographers through the Lens & Shadow mentorship program. I am always open to new collaborations and creative challenges."];

  return (
    <section className="py-20 px-4 bg-red-600">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">The Photographer Behind the Lens</h2>
            <div className="space-y-4 text-lg text-red-100 leading-relaxed">
              {(paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-red-800 rounded-2xl opacity-20 blur-xl"></div>
            <img
              src="https://picsum.photos/seed/photographer-dark-studio-portrait/800/600"
              alt="About us"
              className="relative rounded-2xl shadow-xl w-full"
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

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setSending(false);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 px-4 bg-red-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-red-900 mb-4">Let's Create Something Together</h2>
          <p className="text-xl text-red-700">Whether you have a project in mind or simply want to explore possibilities, I would love to hear from you. Reach out and let's start a conversation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you for your message. We will get back to you soon.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors disabled:bg-red-300"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-4">Contact Information</h3>
              <div className="space-y-4 text-red-800">
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  +1 (212) 555-0178
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  hello@lensandshadow.com
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  Studio 4B, 112 Mercer Street, New York, NY 10012
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="bg-red-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Lens & Shadow</h3>
          <p className="text-red-300 mb-6">Fine art and editorial photography rooted in light, shadow, and human connection.</p>