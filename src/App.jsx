import React from 'react';

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "classes", "label": "Class Schedule"}, {"id": "instructors", "label": "Our Instructors"}, {"id": "pricing", "label": "Pricing"}, {"id": "about", "label": "About Us"}, {"id": "contact", "label": "Contact"}];

  return (
    <nav className="bg-amber-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-white">Zen Flow Studio</span>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-amber-700"
                    : "text-amber-700 hover:text-amber-700"
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
                  currentView === item.id ? "text-amber-700 bg-amber-100" : "text-amber-700"
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
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/coffee-latte')",
          animation: "slowZoom 20s ease-in-out infinite alternate"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/50 to-transparent"></div>
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <div className="inline-block px-4 py-2 bg-amber-50/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20">
           Welcome
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your Flow. Discover Your Calm.
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
          Zen Flow Studio offers thoughtfully guided yoga, pilates, and meditation classes in a serene, nature-inspired sanctuary. Whether you are a beginner or a seasoned practitioner, step onto your mat and let the journey inward begin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate && onNavigate("contact")}
            className="px-8 py-4 bg-amber-50 text-amber-700 rounded-full font-semibold text-lg hover:bg-amber-100 transition-all shadow-xl"
          >
            Explore Our Classes
          </button>
          <button
            onClick={() => onNavigate && onNavigate("about")}
            className="px-8 py-4 bg-amber-50/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-amber-50/20 transition-all border border-white/30"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [{"title": "Yoga Classes", "description": "From gentle Hatha to dynamic Vinyasa, our yoga classes are designed for every level. Build strength, improve flexibility, and cultivate mindfulness through intentional movement and breathwork in our sunlit studio.", "icon_letter": "Y"}, {"title": "Pilates Sessions", "description": "Strengthen your core, align your posture, and enhance your overall body awareness through our mat and reformer pilates sessions. Our small class sizes ensure personalized attention and proper form guidance.", "icon_letter": "P"}, {"title": "Guided Meditation", "description": "Quiet the noise and reconnect with stillness. Our guided meditation sessions incorporate breathwork, visualization, and mindfulness techniques to help you reduce stress and find clarity in your daily life.", "icon_letter": "M"}, {"title": "Private Instruction", "description": "Receive one-on-one guidance tailored to your unique goals and body. Our private sessions are ideal for injury recovery, deepening your practice, or simply enjoying a fully personalized experience.", "icon_letter": "I"}];

  return (
    <section className="py-20 px-4 bg-amber-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-700 mb-4">What We Offer</h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">Three pathways to balance your body, mind, and spirit — all under one roof.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(features || []).map((feature, index) => (
            <div
              key={index}
              className="bg-amber-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-400"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-800 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">{feature.icon_letter || (index + 1)}</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-700 mb-3">{feature.title}</h3>
              <p className="text-amber-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const paragraphs = ["Zen Flow Studio was founded in 2019 with a simple vision: to create a sanctuary where people could step away from the demands of everyday life and reconnect with themselves. Nestled in a quiet corner of the city, our studio was designed to reflect the peace of the natural world \u2014 with living plants, natural wood, and soft, earth-toned light filling every room.", "Our team of certified instructors brings decades of combined experience in yoga, pilates, and meditation. Each class is crafted with care, blending traditional practices with modern understanding of the body and mind. We believe movement should be accessible, inclusive, and deeply personal.", "At Zen Flow, community is at the heart of everything we do. From our welcoming front desk to the shared silence after a meditation session, every moment here is an invitation to slow down, breathe deeply, and grow. We are honored to be part of your wellness journey.", "Whether you are stepping onto a mat for the first time or returning to a lifelong practice, Zen Flow Studio is your home for healing, growth, and inner peace."];

  return (
    <section className="py-20 px-4 bg-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-amber-700 mb-8">Our Story</h2>
            <div className="space-y-4 text-lg text-amber-700 leading-relaxed">
              {(paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-green-800 rounded-2xl opacity-20 blur-xl"></div>
            <img
              src="https://picsum.photos/seed/coffee-latte"
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
    <section className="py-20 px-4 bg-amber-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-700 mb-4">Get in Touch</h2>
          <p className="text-xl text-amber-700">Have a question about our classes, pricing, or studio? We would love to hear from you. Fill out the form below or reach us directly — our team typically responds within 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted && (
                <div className="bg-amber-200 border border-emerald-200 text-amber-700 px-4 py-3 rounded-lg">
                  Thank you for your message. We will get back to you soon.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-amber-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-amber-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-amber-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-amber-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full p-3 border border-amber-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none bg-amber-50"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-amber-200 text-white rounded-lg font-semibold hover:bg-amber-200 transition-colors disabled:bg-amber-100"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-amber-700 mb-4">Contact Information</h3>
              <div className="space-y-4 text-amber-700">
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  (415) 555-0274
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round"