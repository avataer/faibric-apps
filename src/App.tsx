import React, { useState } from "react";

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  featured: boolean;
  type: string;
  coordinates: { lat: number; lng: number };
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyInterest: string;
}

interface TableColumn {
  key: string;
  label: string;
}

const sampleProperties: Property[] = [
  {
    id: 1,
    title: "Modern Oceanfront Villa",
    price: "$12,500,000",
    location: "Malibu, California",
    bedrooms: 6,
    bathrooms: 8,
    sqft: 8500,
    image: "🏖️",
    featured: true,
    type: "Villa",
    coordinates: { lat: 34.0259, lng: -118.7798 },
  },
  {
    id: 2,
    title: "Manhattan Penthouse Suite",
    price: "$28,000,000",
    location: "New York, NY",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6200,
    image: "🏙️",
    featured: true,
    type: "Penthouse",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 3,
    title: "Beverly Hills Estate",
    price: "$45,000,000",
    location: "Beverly Hills, CA",
    bedrooms: 10,
    bathrooms: 14,
    sqft: 22000,
    image: "🏛️",
    featured: true,
    type: "Estate",
    coordinates: { lat: 34.0736, lng: -118.4004 },
  },
  {
    id: 4,
    title: "Miami Beach Condo",
    price: "$8,750,000",
    location: "Miami Beach, FL",
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4200,
    image: "🌴",
    featured: false,
    type: "Condo",
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: 5,
    title: "Aspen Mountain Retreat",
    price: "$18,500,000",
    location: "Aspen, Colorado",
    bedrooms: 7,
    bathrooms: 9,
    sqft: 12000,
    image: "🏔️",
    featured: false,
    type: "Chalet",
    coordinates: { lat: 39.1911, lng: -106.8175 },
  },
];

function Navigation() {
  return (
    <nav className="bg-slate-900 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">💎</span>
          <span className="text-xl font-serif font-bold tracking-wide">LUXE ESTATES</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#listings" className="hover:text-amber-400 transition-colors">Listings</a>
          <a href="#map" className="hover:text-amber-400 transition-colors">Map View</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-2 rounded font-semibold transition-colors">
          Schedule Viewing
        </button>
      </div>
    </nav>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-slate-100">
      <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-6xl">
        {property.image}
      </div>
      <div className="p-6">
        {property.featured && (
          <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}
        <h3 className="text-xl font-serif font-bold text-slate-800 mt-3">{property.title}</h3>
        <p className="text-slate-500 text-sm mt-1">{property.location}</p>
        <p className="text-2xl font-bold text-amber-600 mt-3">{property.price}</p>
        <div className="flex justify-between mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🛁 {property.bathrooms} Baths</span>
          <span>📐 {property.sqft.toLocaleString()} sqft</span>
        </div>
        <button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

function PropertyList({ properties }: { properties: Property[] }) {
  return (
    <section id="listings" className="py-16 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center text-slate-800 mb-4">
          Exclusive Properties
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Discover our curated collection of the world's most prestigious properties
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveMap({ properties, selectedProperty, onSelectProperty }: { 
  properties: Property[]; 
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
}) {
  return (
    <section id="map" className="py-16 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center text-white mb-4">
          Explore Locations
        </h2>
        <p className="text-center text-slate-400 mb-12">
          Click on a property to see its location
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl h-96 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl">🗺️</span>
                <p className="mt-4 text-slate-700 font-semibold">Interactive Map View</p>
                {selectedProperty && (
                  <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-slate-800">{selectedProperty.title}</p>
                    <p className="text-sm text-slate-600">{selectedProperty.location}</p>
                    <p className="text-amber-600 font-bold">{selectedProperty.price}</p>
                  </div>
                )}
              </div>
            </div>
            {properties.map((property, index) => (
              <button
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-125 ${
                  selectedProperty?.id === property.id ? "bg-amber-500 scale-125" : "bg-slate-800"
                }`}
                style={{
                  top: `${20 + (index * 15)}%`,
                  left: `${15 + (index * 18)}%`,
                }}
              >
                📍
              </button>
            ))}
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedProperty?.id === property.id
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                }`}
              >
                <p className="font-bold">{property.title}</p>
                <p className="text-sm opacity-75">{property.location}</p>
                <p className="font-semibold mt-1">{property.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyTable({ properties }: { properties: Property[] }) {
  const columns: TableColumn[] = [
    { key: "title", label: "Property" },
    { key: "type", label: "Type" },
    { key: "location", label: "Location" },
    { key: "price", label: "Price" },
    { key: "sqft", label: "Size" },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center text-slate-800 mb-12">
          Property Overview
        </h2>
        <div className="overflow-x-auto rounded-xl shadow-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-6 py-4 text-left font-semibold">
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={property.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-6 py-4 font-medium text-slate-800">{property.title}</td>
                  <td className="px-6 py-4 text-slate-600">{property.type}</td>
                  <td className="px-6 py-4 text-slate-600">{property.location}</td>
                  <td className="px-6 py-4 font-bold text-amber-600">{property.price}</td>
                  <td className="px-6 py-4 text-slate-600">{property.sqft.toLocaleString()} sqft</td>
                  <td className="px-6 py-4">
                    <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded font-semibold text-sm transition-colors">
                      Inquire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyInterest: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center text-white mb-4">
          Private Consultation
        </h2>
        <p className="text-center text-slate-400 mb-12">
          Our luxury real estate specialists are ready to assist you
        </p>
        {submitted ? (
          <div className="bg-green-500 text-white p-6 rounded-xl text-center">
            <span className="text-4xl">✓</span>
            <p className="mt-2 font-semibold">Thank you! We will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Property Interest</label>
                <select
                  name="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select a property</option>
                  {sampleProperties.map((p) => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-slate-900 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Request Consultation
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-3xl">💎</span>
          <span className="text-2xl font-serif font-bold">LUXE ESTATES</span>
        </div>
        <p className="text-slate-400 mb-6">
          The world's premier luxury real estate marketplace
        </p>
        <div className="flex justify-center space-x-8 text-slate-400">
          <span>📍 New York</span>
          <span>📍 Los Angeles</span>
          <span>📍 Miami</span>
          <span>📍 Aspen</span>
        </div>
        <p className="mt-8 text-slate-500 text-sm">
          © 2024 Luxe Estates. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />
      <main>
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Exceptional Properties for
              <span className="text-amber-400"> Exceptional Living</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
              Discover the world's most exclusive luxury real estate. From oceanfront villas to 
              penthouses in the sky, find your dream home today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                Explore Properties
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                Schedule a Tour
              </button>
            </div>
          </div>
        </section>
        <PropertyList properties={sampleProperties} />
        <InteractiveMap 
          properties={sampleProperties} 
          selectedProperty={selectedProperty}
          onSelectProperty={setSelectedProperty}
        />
        <PropertyTable properties={sampleProperties} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;