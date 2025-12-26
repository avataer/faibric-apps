import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationHeaderProps {
  logo: string;
  items: NavItem[];
  onNavigate: (item: NavItem) => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: string;
  attendees: number;
  maxAttendees: number;
}

interface CardProps {
  event: Event;
  onSelect: (event: Event) => void;
}

interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  registrationDate: string;
  status: string;
}

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  columns: TableColumn[];
  data: Attendee[];
  onRowClick?: (row: Attendee) => void;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
}

interface ListItem {
  id: string;
  primary: string;
  secondary: string;
  badge?: string;
}

interface ListProps {
  items: ListItem[];
  onItemClick?: (item: ListItem) => void;
}

function NavigationHeader({ logo, items, onNavigate }: NavigationHeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600">{logo}</div>
        <nav className="flex gap-6">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item)}
              className={`text-sm font-medium transition-colors ${
                item.active
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Create Event
        </button>
      </div>
    </header>
  );
}

function EventCard({ event, onSelect }: CardProps) {
  const spotsLeft = event.maxAttendees - event.attendees;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" onClick={() => onSelect(event)}>
      <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <span className="text-6xl">{event.image}</span>
      </div>
      <div className="p-5">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full mb-3">
          {event.category}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <span>📅</span> {event.date} at {event.time}
          </p>
          <p className="flex items-center gap-2">
            <span>📍</span> {event.location}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">${event.price}</span>
          <span className={`text-sm ${spotsLeft < 10 ? "text-red-500" : "text-gray-500"}`}>
            {spotsLeft} spots left
          </span>
        </div>
      </div>
    </div>
  );
}

function AttendeeTable({ columns, data, onRowClick }: TableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} onClick={() => onRowClick?.(row)} className="hover:bg-gray-50 cursor-pointer transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.ticketType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.registrationDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  row.status === "Confirmed" ? "bg-green-100 text-green-700" :
                  row.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                }`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RegistrationForm({ fields, onSubmit, submitLabel }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === "select" ? (
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
            />
          )}
        </div>
      ))}
      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        {submitLabel}
      </button>
    </form>
  );
}

function CalendarList({ items, onItemClick }: ListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-indigo-600 text-white">
        <h3 className="font-semibold">Upcoming Events</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} onClick={() => onItemClick?.(item)} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.primary}</p>
                <p className="text-sm text-gray-500">{item.secondary}</p>
              </div>
              {item.badge && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("Events");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const navItems: NavItem[] = [
    { label: "Events", href: "#", active: activeTab === "Events" },
    { label: "Calendar", href: "#", active: activeTab === "Calendar" },
    { label: "Attendees", href: "#", active: activeTab === "Attendees" },
    { label: "Register", href: "#", active: activeTab === "Register" },
  ];

  const events: Event[] = [
    { id: "1", title: "Tech Conference 2024", date: "March 15, 2024", time: "9:00 AM", location: "San Francisco, CA", price: 299, image: "💻", category: "Technology", attendees: 450, maxAttendees: 500 },
    { id: "2", title: "Music Festival", date: "April 20, 2024", time: "2:00 PM", location: "Austin, TX", price: 150, image: "🎵", category: "Entertainment", attendees: 1800, maxAttendees: 2000 },
    { id: "3", title: "Startup Workshop", date: "March 25, 2024", time: "10:00 AM", location: "New York, NY", price: 75, image: "🚀", category: "Business", attendees: 85, maxAttendees: 100 },
    { id: "4", title: "Art Exhibition", date: "April 5, 2024", time: "11:00 AM", location: "Los Angeles, CA", price: 25, image: "🎨", category: "Arts", attendees: 180, maxAttendees: 250 },
    { id: "5", title: "Fitness Bootcamp", date: "March 30, 2024", time: "6:00 AM", location: "Miami, FL", price: 50, image: "💪", category: "Health", attendees: 38, maxAttendees: 50 },
    { id: "6", title: "Food & Wine Festival", date: "April 12, 2024", time: "12:00 PM", location: "Napa Valley, CA", price: 125, image: "🍷", category: "Food", attendees: 290, maxAttendees: 300 },
  ];

  const attendees: Attendee[] = [
    { id: "1", name: "John Smith", email: "john@email.com", ticketType: "VIP", registrationDate: "Feb 10, 2024", status: "Confirmed" },
    { id: "2", name: "Sarah Johnson", email: "sarah@email.com", ticketType: "Standard", registrationDate: "Feb 12, 2024", status: "Confirmed" },
    { id: "3", name: "Mike Williams", email: "mike@email.com", ticketType: "VIP", registrationDate: "Feb 15, 2024", status: "Pending" },
    { id: "4", name: "Emily Brown", email: "emily@email.com", ticketType: "Standard", registrationDate: "Feb 18, 2024", status: "Confirmed" },
    { id: "5", name: "David Lee", email: "david@email.com", ticketType: "Early Bird", registrationDate: "Jan 20, 2024", status: "Cancelled" },
  ];

  const tableColumns: TableColumn[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "ticketType", label: "Ticket" },
    { key: "registrationDate", label: "Registered" },
    { key: "status", label: "Status" },
  ];

  const formFields: FormField[] = [
    { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number", required: false },
    { name: "ticketType", label: "Ticket Type", type: "select", options: ["Standard - $99", "VIP - $199", "Early Bird - $79"], required: true },
    { name: "dietary", label: "Dietary Requirements", type: "select", options: ["None", "Vegetarian", "Vegan", "Gluten-Free"], required: false },
  ];

  const calendarItems: ListItem[] = events.map((e) => ({
    id: e.id,
    primary: e.title,
    secondary: `${e.date} • ${e.location}`,
    badge: e.category,
  }));

  const handleNavigate = (item: NavItem) => setActiveTab(item.label);
  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setActiveTab("Register");
  };
  const handleFormSubmit = (data: Record<string, string>) => {
    alert(`Registration submitted for ${data.fullName}!`);
    setSelectedEvent(null);
    setActiveTab("Attendees");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader logo="EventHub" items={navItems} onNavigate={handleNavigate} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "Events" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Discover Events</h1>
              <p className="text-gray-600 mt-2">Find and register for upcoming events</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} onSelect={handleEventSelect} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Calendar" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Event Calendar</h1>
              <p className="text-gray-600 mt-2">View all scheduled events</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 4;
                    const hasEvent = [15, 20, 25, 30].includes(day);
                    return (
                      <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                        day < 1 || day > 31 ? "text-gray-300" :
                        hasEvent ? "bg-indigo-100 text-indigo-700 font-medium" : "hover:bg-gray-100"
                      }`}>
                        {day > 0 && day <= 31 && day}
                      </div>
                    );
                  })}
                </div>
              </div>
              <CalendarList items={calendarItems} onItemClick={() => setActiveTab("Events")} />
            </div>
          </div>
        )}

        {activeTab === "Attendees" && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Attendee Management</h1>
                <p className="text-gray-600 mt-2">Manage event registrations</p>
              </div>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  {attendees.filter((a) => a.status === "Confirmed").length} Confirmed
                </span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                  {attendees.filter((a) => a.status === "Pending").length} Pending
                </span>
              </div>
            </div>
            <AttendeeTable columns={tableColumns} data={attendees} />
          </div>
        )}

        {activeTab === "Register" && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Event Registration</h1>
              <p className="text-gray-600 mt-2">
                {selectedEvent ? `Register for ${selectedEvent.title}` : "Complete the form below to register"}
              </p>
            </div>
            {selectedEvent && (
              <div className="bg-indigo-50 rounded-xl p-4 mb-6 flex items-center gap-4">
                <span className="text-4xl">{selectedEvent.image}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedEvent.title}</h3>
                  <p className="text-sm text-gray-600">{selectedEvent.date} • {selectedEvent.location}</p>
                </div>
              </div>
            )}
            <RegistrationForm fields={formFields} onSubmit={handleFormSubmit} submitLabel="Complete Registration" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;