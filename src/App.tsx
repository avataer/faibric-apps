import React, { useState } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Navigation Component
const Navigation = ({
  currentView,
  onNavigate,
}: {
  currentView: string;
  onNavigate: (viewId: string) => void;
}) => {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "projects", label: "Projects", icon: "💼" },
    { id: "gallery", label: "Gallery", icon: "🖼️" },
    { id: "contact", label: "Contact", icon: "📧" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <nav className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-400">{"<Dev />"}</h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                currentView === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Hero Component
const Hero = ({
  onCtaClick,
  onSecondaryCtaClick,
}: {
  onCtaClick: () => void;
  onSecondaryCtaClick: () => void;
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-8">
      <div className="max-w-4xl text-center">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-5xl">
            👨‍💻
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Hi, I am <span className="text-blue-400">Alex Developer</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          A passionate full-stack developer crafting beautiful and functional web experiences. 
          Specializing in React, TypeScript, and modern web technologies.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCtaClick}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            View My Work
          </button>
          <button
            onClick={onSecondaryCtaClick}
            className="px-8 py-3 border border-gray-500 hover:border-blue-400 rounded-lg font-semibold transition-all"
          >
            Get In Touch
          </button>
        </div>
        <div className="mt-12 flex gap-6 justify-center text-3xl">
          <a href="#" className="hover:scale-110 transition-transform">🐙</a>
          <a href="#" className="hover:scale-110 transition-transform">💼</a>
          <a href="#" className="hover:scale-110 transition-transform">🐦</a>
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({
  project,
  onClick,
  onAction,
}: {
  project: Project;
  onClick: (data: Record<string, unknown>) => void;
  onAction: (action: string, data: Record<string, unknown>) => void;
}) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-blue-500"
    >
      <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl">
        {project.image}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-blue-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("view", project);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Live Demo
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("github", project);
            }}
            className="px-4 py-2 border border-gray-600 hover:border-blue-400 text-gray-300 text-sm rounded-lg transition-colors"
          >
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

// Projects Section
const ProjectsSection = ({
  onCardClick,
  onCardAction,
}: {
  onCardClick: (data: Record<string, unknown>) => void;
  onCardAction: (action: string, data: Record<string, unknown>) => void;
}) => {
  const projects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment integration and inventory management.",
      image: "🛒",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates.",
      image: "📋",
      tags: ["TypeScript", "Firebase", "Tailwind"],
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description: "Beautiful weather visualization with 7-day forecasts and location tracking.",
      image: "🌤️",
      tags: ["React", "API", "Charts"],
    },
    {
      id: "4",
      title: "Social Media Analytics",
      description: "Dashboard for tracking social media metrics and engagement.",
      image: "📊",
      tags: ["Next.js", "GraphQL", "D3.js"],
    },
  ];

  return (
    <section className="min-h-screen bg-gray-900 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">My Projects</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Here are some of my recent works. Each project represents my passion for creating 
          meaningful digital experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onCardClick}
              onAction={onCardAction}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Component
const Gallery = ({
  images,
  onImageClick,
}: {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage, index: number) => void;
}) => {
  return (
    <section className="min-h-screen bg-gray-900 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">Gallery</h2>
        <p className="text-gray-400 text-center mb-12">A collection of my work and inspirations</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => onImageClick(image, index)}
              className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center text-4xl"
            >
              {image.src}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Form Component
const ContactForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (values: Record<string, unknown>) => void;
  onChange: (field: string, value: string) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange(field, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="min-h-screen bg-gray-900 py-16 px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-12">
          Have a project in mind? Let's work together!
        </p>
        {submitted ? (
          <div className="bg-green-600 text-white p-6 rounded-lg text-center">
            ✅ Message sent successfully! I'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

// Settings Component
const SettingsView = () => {
  const [apiKey, setApiKey] = useState("");
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    if (apiKey.length > 0) {
      setConnected(true);
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 py-16 px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">⚙️ Settings</h2>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">API Connection Status</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className={`w-3 h-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}></span>
            <span className="text-gray-300">{connected ? "Connected" : "Disconnected"}</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter your API key"
              />
            </div>
            <button
              onClick={handleConnect}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {connected ? "Reconnect" : "Connect"}
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Data Sources</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between text-gray-300">
              <span>GitHub API</span>
              <span className="text-green-400">✓ Active</span>
            </li>
            <li className="flex items-center justify-between text-gray-300">
              <span>Contact Form</span>
              <span className="text-green-400">✓ Active</span>
            </li>
            <li className="flex items-center justify-between text-gray-300">
              <span>Analytics</span>
              <span className="text-yellow-400">⚠ Optional</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ links }: { links: SocialLink[] }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-2xl hover:scale-110 transition-transform"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-gray-400">© 2024 Alex Developer. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState<string>("home");

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleHeroCtaClick = () => {
    setCurrentView("projects");
  };

  const handleHeroSecondaryCtaClick = () => {
    setCurrentView("contact");
  };

  const handleGalleryImageClick = (image: GalleryImage, index: number) => {
    console.log("Image clicked:", image, index);
  };

  const handleCardClick = (data: Record<string, unknown>) => {
    console.log("Card clicked:", data);
  };

  const handleCardAction = (action: string, data: Record<string, unknown>) => {
    console.log("Card action:", action, data);
  };

  const handleFormSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted:", values);
  };

  const handleFormChange = (field: string, value: string) => {
    console.log("Form changed:", field, value);
  };

  const galleryImages: GalleryImage[] = [
    { id: "1", src: "🎨", alt: "Art 1", title: "Design Work" },
    { id: "2", src: "💻", alt: "Code", title: "Coding" },
    { id: "3", src: "📱", alt: "Mobile", title: "Mobile App" },
    { id: "4", src: "🎮", alt: "Game", title: "Game Dev" },
    { id: "5", src: "🌐", alt: "Web", title: "Web Design" },
    { id: "6", src: "📷", alt: "Photo", title: "Photography" },
    { id: "7", src: "🎵", alt: "Music", title: "Music App" },
    { id: "8", src: "🚀", alt: "Launch", title: "Startup" },
  ];

  const socialLinks: SocialLink[] = [
    { platform: "GitHub", url: "#", icon: "🐙" },
    { platform: "LinkedIn", url: "#", icon: "💼" },
    { platform: "Twitter", url: "#", icon: "🐦" },
    { platform: "Email", url: "#", icon: "📧" },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white fixed h-full">
        <Navigation currentView={currentView} onNavigate={handleNavigationNavigate} />
      </aside>
      <main className="flex-1 ml-64 bg-gray-900">
        {currentView === "home" && (
          <Hero
            onCtaClick={handleHeroCtaClick}
            onSecondaryCtaClick={handleHeroSecondaryCtaClick}
          />
        )}
        {currentView === "projects" && (
          <ProjectsSection
            onCardClick={handleCardClick}
            onCardAction={handleCardAction}
          />
        )}
        {currentView === "gallery" && (
          <Gallery images={galleryImages} onImageClick={handleGalleryImageClick} />
        )}
        {currentView === "contact" && (
          <ContactForm onSubmit={handleFormSubmit} onChange={handleFormChange} />
        )}
        {currentView === "settings" && <SettingsView />}
        <Footer links={socialLinks} />
      </main>
    </div>
  );
}

export default App;