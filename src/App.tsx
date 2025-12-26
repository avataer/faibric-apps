import React, { useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  avatar: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  contactId: string;
  stage: string;
}

interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note";
  description: string;
  contactName: string;
  timestamp: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface ContactCardProps {
  contact: Contact;
  onClick?: () => void;
}

interface PipelineStage {
  id: string;
  name: string;
  color: string;
}

const sampleContacts: Contact[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@techcorp.com", phone: "(555) 123-4567", company: "TechCorp", role: "CTO", avatar: "SJ" },
  { id: "2", name: "Michael Chen", email: "mchen@innovate.io", phone: "(555) 234-5678", company: "Innovate.io", role: "CEO", avatar: "MC" },
  { id: "3", name: "Emily Davis", email: "emily@startupx.com", phone: "(555) 345-6789", company: "StartupX", role: "VP Sales", avatar: "ED" },
  { id: "4", name: "James Wilson", email: "jwilson@enterprise.net", phone: "(555) 456-7890", company: "Enterprise Net", role: "Director", avatar: "JW" },
];

const pipelineStages: PipelineStage[] = [
  { id: "lead", name: "Lead", color: "bg-gray-100" },
  { id: "qualified", name: "Qualified", color: "bg-blue-100" },
  { id: "proposal", name: "Proposal", color: "bg-yellow-100" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-100" },
  { id: "closed", name: "Closed Won", color: "bg-green-100" },
];

const sampleDeals: Deal[] = [
  { id: "d1", title: "Enterprise License", value: 50000, contactId: "1", stage: "proposal" },
  { id: "d2", title: "Annual Subscription", value: 12000, contactId: "2", stage: "qualified" },
  { id: "d3", title: "Consulting Package", value: 25000, contactId: "3", stage: "negotiation" },
  { id: "d4", title: "Platform Integration", value: 75000, contactId: "4", stage: "lead" },
  { id: "d5", title: "Support Contract", value: 8000, contactId: "1", stage: "closed" },
  { id: "d6", title: "Custom Development", value: 35000, contactId: "2", stage: "proposal" },
];

const sampleActivities: Activity[] = [
  { id: "a1", type: "call", description: "Discussed pricing options", contactName: "Sarah Johnson", timestamp: "2 hours ago" },
  { id: "a2", type: "email", description: "Sent proposal document", contactName: "Michael Chen", timestamp: "4 hours ago" },
  { id: "a3", type: "meeting", description: "Product demo scheduled", contactName: "Emily Davis", timestamp: "Yesterday" },
  { id: "a4", type: "note", description: "Interested in premium tier", contactName: "James Wilson", timestamp: "Yesterday" },
  { id: "a5", type: "call", description: "Follow-up on contract terms", contactName: "Sarah Johnson", timestamp: "2 days ago" },
];

function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function ContactCard({ contact, onClick }: ContactCardProps) {
  return (
    <Card className="p-4" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
          {contact.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
          <p className="text-sm text-gray-500 truncate">{contact.role} at {contact.company}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="text-gray-400">✉</span> {contact.email}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="text-gray-400">☎</span> {contact.phone}
        </p>
      </div>
    </Card>
  );
}

function DealCard({ deal, contacts }: { deal: Deal; contacts: Contact[] }) {
  const contact = contacts.find(c => c.id === deal.contactId);
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-2 cursor-grab hover:shadow-md transition-shadow">
      <h4 className="font-medium text-gray-900 text-sm">{deal.title}</h4>
      <p className="text-xs text-gray-500 mt-1">{contact?.name}</p>
      <p className="text-sm font-semibold text-green-600 mt-2">${deal.value.toLocaleString()}</p>
    </div>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const icons: Record<string, string> = {
    call: "📞",
    email: "✉️",
    meeting: "📅",
    note: "📝",
  };
  const colors: Record<string, string> = {
    call: "bg-blue-100 text-blue-600",
    email: "bg-green-100 text-green-600",
    meeting: "bg-purple-100 text-purple-600",
    note: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${colors[activity.type]}`}>
        {icons[activity.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity.description}</p>
        <p className="text-xs text-gray-500 mt-1">
          {activity.contactName} • {activity.timestamp}
        </p>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "contacts", label: "Contacts", icon: "👥" },
    { id: "pipeline", label: "Pipeline", icon: "📈" },
    { id: "activities", label: "Activities", icon: "📋" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">💼</span> SalesCRM
        </h1>
      </div>
      <nav className="flex-1 p-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activeTab === tab.id ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-semibold">
            JD
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Sales Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function DashboardView({ contacts, deals, activities }: { contacts: Contact[]; deals: Deal[]; activities: Activity[] }) {
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const closedValue = deals.filter(d => d.stage === "closed").reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-sm text-gray-500">Total Contacts</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{contacts.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500">Active Deals</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{deals.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500">Pipeline Value</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">${totalValue.toLocaleString()}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500">Closed Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-1">${closedValue.toLocaleString()}</p>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h2>
            <div className="grid grid-cols-2 gap-4">
              {contacts.slice(0, 4).map(contact => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </Card>
        </div>
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div>
            {activities.slice(0, 4).map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ContactsView({ contacts }: { contacts: Contact[] }) {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          + Add Contact
        </button>
      </div>
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

function PipelineView({ deals, contacts }: { deals: Deal[]; contacts: Contact[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          + Add Deal
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipelineStages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);
          return (
            <div key={stage.id} className={`flex-shrink-0 w-72 ${stage.color} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{stage.name}</h3>
                <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                  {stageDeals.length}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">${stageTotal.toLocaleString()}</p>
              <div className="space-y-2">
                {stageDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} contacts={contacts} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivitiesView({ activities }: { activities: Activity[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          + Log Activity
        </button>
      </div>
      <Card className="p-5">
        {activities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </Card>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto p-8">
        {activeTab === "dashboard" && (
          <DashboardView contacts={sampleContacts} deals={sampleDeals} activities={sampleActivities} />
        )}
        {activeTab === "contacts" && <ContactsView contacts={sampleContacts} />}
        {activeTab === "pipeline" && <PipelineView deals={sampleDeals} contacts={sampleContacts} />}
        {activeTab === "activities" && <ActivitiesView activities={sampleActivities} />}
      </main>
    </div>
  );
}

export default App;