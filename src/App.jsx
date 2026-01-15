import React from 'react';

// LIBRARY COMPONENTS - Golden Templates (pre-validated, do not transform)

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "home", "label": "Home"}, {"id": "about", "label": "About"}, {"id": "features", "label": "Why Choose Us"}, {"id": "gallery", "label": "View My Art"}, {"id": "testimonials", "label": "Collectors"}, {"id": "contact", "label": "Commission"}];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-gray-900">Seven Dogs Studio</span>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2"
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
                  currentView === item.id ? "text-indigo-600 bg-indigo-50" : "text-gray-600"
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
      style={{backgroundImage: "url('https://picsum.photos/seed/abstract-pink/1920/1080')"}}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Seven Dogs. One Pink. Infinite Possibilities.
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Exclusive NFT artwork featuring meticulously crafted canine compositions. Each piece tells a unique story with exactly seven dogs.
        </p>
        <button
          onClick={() => onNavigate && onNavigate("gallery")}
          className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          See My Work
        </button>
      </div>
    </section>
  );
};

const GallerySection = ({ onNavigate }) => {
  const artworks = [
    {
      id: 1,
      title: "Pink Dreams in the Park",
      description: "Seven dogs enjoying a sunny day at the park. The pink poodle stands proudly in the center, surrounded by her loyal pack.",
      image: "https://picsum.photos/seed/seven-dogs-pink/800/600",
      price: "2.5 ETH",
      status: "Available"
    },
    {
      id: 2,
      title: "Moonlit Howl",
      description: "A mystical scene where seven dogs howl at the moon. The pink husky leads the chorus under starlit skies.",
      image: "https://picsum.photos/seed/dogs-moon/800/600",
      price: "3.2 ETH",
      status: "Sold"
    },
    {
      id: 3,
      title: "Beach Day Bliss",
      description: "Seven playful pups frolicking on the beach. Spot the pink corgi building a sandcastle!",
      image: "https://picsum.photos/seed/dogs-beach/800/600",
      price: "2.8 ETH",
      status: "Available"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Seven Dogs Collection</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Each piece features exactly seven dogs, with at least one pink pup stealing the show. Every artwork is a unique 1/1 NFT.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  artwork.status === "Available" 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-500 text-white"
                }`}>
                  {artwork.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{artwork.title}</h3>
                <p className="text-gray-600 mb-4">{artwork.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">{artwork.price}</span>
                  {artwork.status === "Available" && (
                    <button
                      onClick={() => onNavigate("contact")}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Inquire
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want a custom piece with your favorite dog breeds?</p>
          <button
            onClick={() => onNavigate("contact")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            Commission Your Own Seven Dogs
          </button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [{"title": "The Sacred Seven", "description": "Each artwork contains precisely seven dogs, no more, no less. This constraint fuels creativity and creates instantly recognizable compositions.", "icon_letter": "7"}, {"title": "The Pink Promise", "description": "At least one dog in every piece is rendered in vibrant pink, serving as my signature element and a symbol of joy in every collection.", "icon_letter": "P"}, {"title": "One-of-One Originals", "description": "Every NFT is a unique creation. No copies, no editions. When you own a Seven Dogs piece, you own the only one in existence.", "icon_letter": "1"}, {"title": "Blockchain Verified", "description": "Full provenance and authenticity guaranteed through blockchain technology. Your ownership is permanent and indisputable.", "icon_letter": "B"}];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes My Art Unique</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Every piece follows a distinct creative philosophy that collectors have come to love</p>
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

const AboutSection = () => {
  const paragraphs = ["I have always believed that constraints breed creativity. When I challenged myself to create artwork featuring exactly seven dogs with at least one pink pup in every piece, something magical happened. What started as an artistic experiment became my signature style.", "Each dog in my compositions has personality, purpose, and position. The pink dog serves as an anchor point, drawing the eye and adding unexpected whimsy to scenes that range from playful to profound.", "My work has been collected by NFT enthusiasts across the globe who appreciate the consistency of my vision and the uniqueness of each piece. Whether you are a seasoned collector or new to the NFT space, I create art that brings joy and holds value."];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">The Artist Behind the Dogs</h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              {(paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur-xl"></div>
            <img
              src="https://picsum.photos/seed/artist-studio/800/600"
              alt="About us"
              className="relative rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [{"quote": "The moment I saw my first Seven Dogs piece, I knew I had to have it. The pink husky in the corner absolutely made the composition. It is now the crown jewel of my NFT collection.", "name": "Marcus Chen", "role": "NFT Collector since 2021"}, {"quote": "I commissioned a custom piece featuring my own dog breeds, and the result exceeded every expectation. The attention to detail and the clever placement of the pink dog was genius.", "name": "Sarah Williams", "role": "Custom Commission Client"}, {"quote": "What I love about Seven Dogs Studio is the consistency. You always know what you are getting, yet each piece feels completely fresh and original.", "name": "David Park", "role": "Art Investment Advisor"}, {"quote": "Finally, NFT art with a clear identity and vision. The seven dog concept is simple but the execution is masterful every single time.", "name": "Elena Vasquez", "role": "Digital Art Curator"}];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">What Collectors Are Saying</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {(testimonials || []).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <div className="text-4xl text-indigo-400 mb-4">"</div>
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{testimonial.name?.charAt(0) || "?"}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
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
    await new Promise