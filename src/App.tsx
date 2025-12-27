import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

interface Session {
  id: string;
  name: string;
  attendees: number;
  engagement: number;
  duration: string;
  rating: number;
}

interface Demographic {
  category: string;
  value: number;
  percentage: number;
  color: string;
}

interface AttendeeData {
  id: string;
  name: string;
  email: string;
  sessions: number;
  engagementScore: number;
  location: string;
  joinedAt: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "sessions", label: "Sessions", icon: "🎯" },
  { id: "attendees", label: "Attendees", icon: "👥" },
  { id: "engagement", label: "Engagement", icon: "📈" },
  { id: "reports", label: "Reports", icon: "📋" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const statsData: StatCard[] = [
  { title: "Total Attendees", value: "12,458", change: 12.5, changeType: "positive", icon: "👥" },
  { title: "Active Sessions", value: "24", change: 8.3, changeType: "positive", icon: "🎬" },
  { title: "Avg. Engagement", value: "78%", change: -2.1, changeType: "negative", icon: "📊" },
  { title: "Peak Concurrent", value: "3,842", change: 15.7, changeType: "positive", icon: "🔥" },
];

const sessionsData: Session[] = [
  { id: "1", name: "Opening Keynote", attendees: 4250, engagement: 92, duration: "1h 30m", rating: 4.8 },
  { id: "2", name: "Tech Innovation Panel", attendees: 2180, engagement: 85, duration: "45m", rating: 4.5 },
  { id: "3", name: "Workshop: AI Basics", attendees: 1560, engagement: 88, duration: "2h", rating: 4.7 },
  { id: "4", name: "Networking Session", attendees: 980, engagement: 76, duration: "1h", rating: 4.2 },
  { id: "5", name: "Product Demo", attendees: 1890, engagement: 81, duration: "30m", rating: 4.4 },
  { id: "6", name: "Closing Ceremony", attendees: 3200, engagement: 89, duration: "45m", rating: 4.6 },
];

const demographicsData: Demographic[] = [
  { category: "North America", value: 4520, percentage: 36, color: "bg-blue-500" },
  { category: "Europe", value: 3180, percentage: 26, color: "bg-green-500" },
  { category: "Asia Pacific", value: 2890, percentage: 23, color: "bg-yellow-500" },
  { category: "Latin America", value: 1120, percentage: 9, color: "bg-purple-500" },
  { category: "Other", value: 748, percentage: 6, color: "bg-gray-500" },
];

const attendeesTableData: AttendeeData[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com", sessions: 8, engagementScore: 94, location: "New York, US", joinedAt: "9:00 AM" },
  { id: "2", name: "Michael Chen", email: "m.chen@email.com", sessions: 6, engagementScore: 87, location: "Toronto, CA", joinedAt: "9:15 AM" },
  { id: "3", name: "Emma Williams", email: "emma.w@email.com", sessions: 12, engagementScore: 96, location: "London, UK", joinedAt: "8:45 AM" },
  { id: "4", name: "James Miller", email: "james.m@email.com", sessions: 5, engagementScore: 72, location: "Sydney, AU", joinedAt: "10:00 AM" },
  { id: "5", name: "Sofia Garcia", email: "sofia.g@email.com", sessions: 9, engagementScore: 89, location: "Madrid, ES", joinedAt: "9:30 AM" },
];

function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🎪</span>
          <span>EventHub</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Analytics Dashboard</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function StatsCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-2xl">{stat.icon}</span>
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === "positive"
                  ? "bg-green-100 text-green-700"
                  : stat.changeType === "negative"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {stat.changeType === "positive" ? "+" : ""}
              {stat.change}%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm mt-4">{stat.title}</h3>
          <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function SessionsTable({ sessions }: { sessions: Session[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Session Popularity</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Session</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Attendees</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Engagement</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Duration</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Rating</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-800 font-medium">{session.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{session.attendees.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${session.engagement}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600">{session.engagement}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{session.duration}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-sm text-slate-600">
                    ⭐ {session.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DemographicsCard({ data }: { data: Demographic[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Attendee Demographics</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{item.category}</span>
              <span className="text-slate-800 font-medium">{item.value.toLocaleString()} ({item.percentage}%)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className={`${item.color} h-3 rounded-full transition-all`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EngagementChart() {
  const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  const values = [1200, 2400, 3800, 3200, 2800, 3500, 4200, 3600, 2100];
  const maxValue = Math.max(...values);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Live Attendance Timeline</h2>
      <div className="flex items-end justify-between gap-2 h-48">
        {hours.map((hour, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
              style={{ height: `${(values[index] / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs text-slate-500 mt-2">{hour}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendeesTable({ attendees }: { attendees: AttendeeData[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Top Engaged Attendees</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Email</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Sessions</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Engagement</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Location</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-800 font-medium">{attendee.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{attendee.email}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{attendee.sessions}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      attendee.engagementScore >= 90
                        ? "bg-green-100 text-green-700"
                        : attendee.engagementScore >= 75
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {attendee.engagementScore}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{attendee.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const updatedNavItems = navItems.map((item) => ({
    ...item,
    active: item.id === activeNav,
  }));

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar items={updatedNavItems} onSelect={setActiveNav} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Event Analytics Dashboard</h1>
          <p className="text-slate-500 mt-1">Virtual Summit 2024 - Live Analytics</p>
        </div>
        <div className="space-y-6">
          <StatsCards stats={statsData} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EngagementChart />
            </div>
            <div>
              <DemographicsCard data={demographicsData} />
            </div>
          </div>
          <SessionsTable sessions={sessionsData} />
          <AttendeesTable attendees={attendeesTableData} />
        </div>
      </main>
    </div>
  );
}

export default App;