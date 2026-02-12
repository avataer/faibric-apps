import React from 'react';

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "home", "label": "Home"}, {"id": "services", "label": "Services"}, {"id": "gallery", "label": "Gallery"}, {"id": "about", "label": "About Us"}, {"id": "booking", "label": "Book Now"}, {"id": "contact", "label": "Contact"}];

  return (
    <nav className="bg-teal-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-white">Pawfect Style</span>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-teal-200"
                    : "text-teal-100 hover:text-white"
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
                  currentView === item.id ? "text-white bg-teal-700" : "text-teal-100 hover:text-white"
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
      className="min-h-screen bg-cover bg-center relative flex items-end pb-20"
      style={{backgroundImage: "url('https://picsum.photos/seed/happy-groomed-dog-teal-coral-salon/1920/1080')"}}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="bg-white/95 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Where Every Pup Leaves Looking Pawfect
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Professional dog grooming with a gentle touch. From bath and brush to breed-specific styling, we pamper your furry family member so they look and feel their absolute best.
          </p>
          <button
            onClick={() => onNavigate && onNavigate("contact")}
            className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [{"title": "Certified & Experienced Groomers", "description": "Our team holds professional grooming certifications and brings years of hands-on experience with all breeds, coat types, and temperaments.", "icon_letter": "C"}, {"title": "Stress-Free Environment", "description": "We maintain a calm, clean salon with soothing music, gentle handling techniques, and one-on-one attention so your dog feels safe and relaxed throughout their visit.", "icon_letter": "S"}, {"title": "Premium Products Only", "description": "We use all-natural, hypoallergenic shampoos, conditioners, and finishing sprays that are kind to sensitive skin and leave coats shining.", "icon_letter": "P"}, {"title": "Flexible Online Booking", "description": "Schedule your appointment anytime through our easy online booking system. Choose your preferred date, time, and service with just a few clicks.", "icon_letter": "B"}];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Pet Parents Choose Pawfect Style</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">We combine skill, patience, and genuine love for dogs to deliver a grooming experience that keeps tails wagging.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(features || []).map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">{feature.icon_letter || (index + 1)}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [{"name": "The Fresh Pup Bath", "description": "A thorough bath with premium shampoo and conditioner, blow-dry, ear cleaning, nail trim, and a spritz of finishing cologne. Perfect for maintaining a clean, happy pup between full grooms.", "price": "From $35"}, {"name": "Full Style Groom", "description": "Our signature full-service package includes everything in The Fresh Pup Bath plus a breed-specific or custom haircut, detailed scissor work, paw pad trimming, and sanitary trim.", "price": "From $65"}, {"name": "Puppy's First Groom", "description": "A gentle introductory grooming session designed for puppies under six months. We take extra time to make their first experience positive, building trust and comfort for a lifetime of easy grooming.", "price": "From $30"}, {"name": "Spa Day Deluxe", "description": "The ultimate pampering experience featuring a deep-conditioning treatment, blueberry facial scrub, teeth brushing, paw balm application, and a bandana of your choice. Your dog deserves a treat.", "price": "From $85"}];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Grooming Services</h2>

        <div className="space-y-6">
          {(services || []).map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                {service.price && (
                  <span className="text-lg font-semibold text-indigo-600 ml-4">{service.price}</span>
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
  const paragraphs = ["Pawfect Style was founded in 2019 by lifelong dog lover and certified master groomer, Sarah Mitchell. After years of working in busy grooming chains, Sarah dreamed of creating a boutique salon where every dog receives undivided attention and compassionate care.", "Today, our team of four skilled groomers shares that same philosophy. We believe grooming is about far more than aesthetics. It is an essential part of your dog's health and well-being. That is why we take the time to check skin condition, monitor ear health, and ensure every dog leaves not just looking great, but feeling great too.", "Located in the heart of Maplewood, our bright and modern salon is designed with your dog's comfort in mind. We limit the number of appointments each day so we never rush, and we treat every pup who walks through our doors like our own."];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">The Story Behind Pawfect Style</h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              {(paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur-xl"></div>
            <img
              src="https://picsum.photos/seed/dog-grooming-salon-interior-teal-modern/800/600"
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
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600">Have a question about our services or need help choosing the right package for your pup? Reach out and we will be happy to help.</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502