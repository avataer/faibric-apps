import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: string;
  ticketsAvailable: number;
  description: string;
}

interface Attendee {
  id: number;
  name: string;
  email: string;
  ticketType: string;
  eventId: number;
  registeredAt: string;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

function NavigationHeader({ items, currentView, onViewChange }: { items: NavItem[]; currentView: string; onViewChange: (view: string) => void }) {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎫</span>
            <h1 className="text-xl font-bold">EventHub</h1>
          </div>
          <nav className="flex space-x-6">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => onViewChange(item.href)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentView === item.href ? "bg-indigo-700 font-semibold" : "hover:bg-indigo-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function EventCard({ event, onSelect }: { event: Event; onSelect: (event: Event) => void }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-40 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
        <span className="text-6xl">{event.image}</span>
      </div>
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full mb-2">
          {event.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>📅 {event.date} at {event.time}</p>
          <p>📍 {event.location}</p>
          <p>🎟️ {event.ticketsAvailable} tickets left</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">${event.price}</span>
          <button
            onClick={() => onSelect(event)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
}

function AttendeeTable({ attendees, events }: { attendees: Attendee[]; events: Event[] }) {
  const getEventTitle = (eventId: number) => {
    const event = events.find((e) => e.id === eventId);
    return event ? event.title : "Unknown Event";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Registered Attendees</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendees.map((attendee) => (
              <tr key={attendee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEventTitle(attendee.eventId)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                    {attendee.ticketType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.registeredAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RegistrationForm({ event, onSubmit, onCancel }: { event: Event; onSubmit: (data: { name: string; email: string; ticketType: string }) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", ticketType: "General" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Register for {event.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
            <select
              value={formData.ticketType}
              onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="General">General - ${event.price}</option>
              <option value="VIP">VIP - ${event.price * 2}</option>
              <option value="Student">Student - ${Math.floor(event.price * 0.7)}</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CalendarView({ events, onEventSelect }: { events: Event[]; onEventSelect: (event: Event) => void }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentMonth = "January 2024";

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{currentMonth}</h2>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }, (_, i) => {
          const dayNum = i - 2;
          const eventOnDay = events.find((e) => parseInt(e.date.split(" ")[1]) === dayNum);
          return (
            <div
              key={i}
              className={`min-h-16 p-1 border rounded-lg ${
                dayNum > 0 && dayNum <= 31 ? "bg-white" : "bg-gray-50"
              } ${eventOnDay ? "cursor-pointer hover:bg-indigo-50" : ""}`}
              onClick={() => eventOnDay && onEventSelect(eventOnDay)}
            >
              {dayNum > 0 && dayNum <= 31 && (
                <div>
                  <span className="text-sm text-gray-600">{dayNum}</span>
                  {eventOnDay && (
                    <div className="mt-1 px-1 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded truncate">
                      {eventOnDay.title}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventList({ events, onEventSelect }: { events: Event[]; onEventSelect: (event: Event) => void }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center text-2xl">
              {event.image}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
              <p className="text-sm text-gray-400">{event.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">${event.price}</p>
            <button
              onClick={() => onEventSelect(event)}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([
    { id: 1, name: "John Doe", email: "john@example.com", ticketType: "VIP", eventId: 1, registeredAt: "Jan 5, 2024" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", ticketType: "General", eventId: 2, registeredAt: "Jan 6, 2024" },
  ]);

  const navItems: NavItem[] = [
    { label: "Events", href: "events" },
    { label: "Calendar", href: "calendar" },
    { label: "Attendees", href: "attendees" },
  ];

  const events: Event[] = [
    { id: 1, title: "Tech Conference 2024", date: "Jan 15", time: "9:00 AM", location: "Convention Center", price: 99, image: "🎤", category: "Technology", ticketsAvailable: 150, description: "Annual tech conference featuring industry leaders" },
    { id: 2, title: "Music Festival", date: "Jan 20", time: "6:00 PM", location: "City Park", price: 75, image: "🎵", category: "Music", ticketsAvailable: 500, description: "Three days of amazing live performances" },
    { id: 3, title: "Art Exhibition", date: "Jan 25", time: "10:00 AM", location: "Art Gallery", price: 25, image: "🎨", category: "Art", ticketsAvailable: 80, description: "Contemporary art from local artists" },
    { id: 4, title: "Food & Wine Tasting", date: "Jan 28", time: "7:00 PM", location: "Grand Hotel", price: 120, image: "🍷", category: "Food", ticketsAvailable: 60, description: "Gourmet food paired with fine wines" },
  ];

  const handleRegistration = (data: { name: string; email: string; ticketType: string }) => {
    if (selectedEvent) {
      const newAttendee: Attendee = {
        id: attendees.length + 1,
        name: data.name,
        email: data.email,
        ticketType: data.ticketType,
        eventId: selectedEvent.id,
        registeredAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
      setAttendees([...attendees, newAttendee]);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader items={navItems} currentView={currentView} onViewChange={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === "events" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
              ))}
            </div>
          </div>
        )}
        {currentView === "calendar" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Calendar</h2>
            <CalendarView events={events} onEventSelect={setSelectedEvent} />
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">All Events</h3>
              <EventList events={events} onEventSelect={setSelectedEvent} />
            </div>
          </div>
        )}
        {currentView === "attendees" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendee Management</h2>
            <AttendeeTable attendees={attendees} events={events} />
          </div>
        )}
      </main>
      {selectedEvent && (
        <RegistrationForm event={selectedEvent} onSubmit={handleRegistration} onCancel={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default App;