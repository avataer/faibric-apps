import React, { useState } from "react";

// Interfaces
interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavItem[];
  brandName: string;
}

interface HeroProps {
  name: string;
  title: string;
  description: string;
  imageUrl?: string;
  socialLinks?: { platform: string; url: string }[];
}

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  link?: string;
}

interface SkillCategory {
  category: string;
  skills: string[];
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
  placeholder?: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

// Navigation Component
function Navigation({ items, brandName }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-xl font-bold text-gray-900">
            {brandName}
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-gray-600 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-full bg-gray-600 transition-opacity ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-gray-600 transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Component
function Hero({ name, title, description, socialLinks }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {name.split(" ").map(n => n[0]).join("")}
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Hello, I am <span className="text-indigo-600">{name}</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-6">{title}</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">{description}</p>
        
        {socialLinks && (
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-600 rounded-lg transition-colors font-medium"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
        
        <div className="mt-12 animate-bounce">
          <a href="#projects" className="text-gray-400 hover:text-indigo-600">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// Card Component
function Card({ title, description, tags, link }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
        <span className="text-white text-6xl font-bold opacity-50">{title[0]}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Project
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

// Form Component
function Form({ fields, onSubmit, submitLabel }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    setFormData({});
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">Your message has been sent successfully.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
      >
        {submitLabel}
      </button>
    </form>
  );
}

// Layout Component
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

// Skills Section Component
function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Skills & Technologies
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Here are the technologies and tools I work with to bring ideas to life.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.category} className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-2 bg-white text-gray-700 rounded-lg shadow-sm text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main App Component
function App() {
  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const projects: CardProps[] = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "#",
    },
    {
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates, drag-and-drop interface, and team features.",
      tags: ["TypeScript", "Next.js", "Prisma", "WebSocket"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      description: "An interactive weather application with location-based forecasts, historical data, and beautiful visualizations.",
      tags: ["React", "D3.js", "Weather API", "Tailwind"],
      link: "#",
    },
  ];

  const skillCategories: SkillCategory[] = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      category: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "Figma", "Jest"],
    },
  ];

  const formFields: FormField[] = [
    { name: "name", label: "Your Name", type: "text", required: true, placeholder: "John Doe" },
    { name: "email", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
    { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Tell me about your project..." },
  ];

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted:", data);
  };

  return (
    <Layout>
      <Navigation items={navItems} brandName="Portfolio" />
      
      <Hero
        name="Alex Johnson"
        title="Full Stack Developer"
        description="I build exceptional digital experiences that are fast, accessible, and designed with the user in mind. Passionate about turning complex problems into simple, beautiful solutions."
        socialLinks={[
          { platform: "GitHub", url: "#" },
          { platform: "LinkedIn", url: "#" },
          { platform: "Twitter", url: "#" },
        ]}
      />

      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for development.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <SkillsSection categories={skillCategories} />

      <section id="contact" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Have a project in mind or just want to say hello? I would love to hear from you.
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Form fields={formFields} onSubmit={handleFormSubmit} submitLabel="Send Message" />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Alex Johnson. All rights reserved.
          </p>
        </div>
      </footer>
    </Layout>
  );
}

export default App;