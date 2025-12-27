import React, { useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  contactId: string;
  probability: number;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  contactId: string;
  timestamp: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const sampleContacts: Contact[] = [
  { id: "1", name: "John Smith", email: "john@acme.com", phone: "(555) 123-4567", company: "Acme Corp", avatar: "JS" },
  { id: "2", name: "Sarah Johnson", email: "sarah@techstart.io", phone: "(555) 234-5678", company: "TechStart", avatar: "SJ" },
  { id: "3", name: "Mike Wilson", email: "mike@globalinc.com", phone: "(555) 345-6789", company: "Global Inc", avatar: "MW" },
  { id: "4", name: "Emily Davis", email: "emily@innovate.co", phone: "(555) 456-7890", company: "Innovate Co", avatar: "ED" },
];

const sampleDeals: Deal[] = [
  { id: "1", title: "Enterprise License", value: 50000, stage: "lead", contactId: "1", probability: 20 },
  { id: "2", title: "Annual Contract", value: 25000, stage: "qualified", contactId: "2", probability: 40 },
  { id: "3", title: "Consulting Project", value: 15000, stage: "proposal", contactId: "3", probability: 60 },
  { id: "4", title: "Software Integration", value: 35000, stage: "negotiation", contactId: "4", probability: 80 },
  { id: "5", title: "Support Package", value: 10000, stage: "closed", contactId: "1", probability: 100 },
];

const sampleActivities: Activity[] = [
  { id: "1", type: "call", description: "Discussed product features with John", contactId: "1", timestamp: "2024-01-15 10:30" },
  { id: "2", type: "email", description: "Sent proposal to Sarah", contactId: "2", timestamp: "2024-01-15 09:15" },
  { id: "3", type: "meeting", description: "Demo meeting with Mike", contactId: "3", timestamp: "2024-01-14 14:00" },
  { id: "4", type: "note", description: "Emily requested pricing breakdown", contactId: "4", timestamp: "2024-01-14 11:45" },
];

const stages = [
  { id: "lead", name: "Lead", color: "bg-gray-500" },
  { id: "qualified", name: "Qualified", color: "bg-blue-500" },
  { id: "proposal", name: "Proposal", color: "bg-yellow-500" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-500" },
  { id: "closed", name: "Closed Won", color: "bg-green-500" },
];

function Card({ children, className = "" }: CardProps) {
  return (
    <div className={"bg-white rounded-lg shadow-md p-4 " + className}>
      {children}
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [contacts, setContacts] = useState(sampleContacts);
  const [deals, setDeals] = useState(sampleDeals);
  const [activities] = useState(sampleActivities);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [newDeal, setNewDeal] = useState({ title: "", value: "", contactId: "", stage: "lead" });

  const getContactById = (id: string) => contacts.find(c => c.id === id);

  const handleAddContact = () => {
    const contact: Contact = {
      id: String(contacts.length + 1),
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
      company: newContact.company,
      avatar: newContact.name.split(" ").map(n => n[0]).join("").toUpperCase(),
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: "", email: "", phone: "", company: "" });
    setIsContactModalOpen(false);
  };

  const handleAddDeal = () => {
    const deal: Deal = {
      id: String(deals.length + 1),
      title: newDeal.title,
      value: Number(newDeal.value),
      contactId: newDeal.contactId,
      stage: newDeal.stage,
      probability: 20,
    };
    setDeals([...deals, deal]);
    setNewDeal({ title: "", value: "", contactId: "", stage: "lead" });
    setIsDealModalOpen(false);
  };

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData("dealId", dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("dealId");
    setDeals(deals.map(d => d.id === dealId ? { ...d, stage: stageId } : d));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return "📞";
      case "email": return "📧";
      case "meeting": return "📅";
      default: return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">CRM Dashboard</h1>
            <nav className="flex gap-4">
              <button onClick={() => setActiveTab("pipeline")} className={"px-4 py-2 rounded-md " + (activeTab === "pipeline" ? "bg-indigo-700" : "hover:bg-indigo-500")}>
                Pipeline
              </button>
              <button onClick={() => setActiveTab("contacts")} className={"px-4 py-2 rounded-md " + (activeTab === "contacts" ? "bg-indigo-700" : "hover:bg-indigo-500")}>
                Contacts
              </button>
              <button onClick={() => setActiveTab("activity")} className={"px-4 py-2 rounded-md " + (activeTab === "activity" ? "bg-indigo-700" : "hover:bg-indigo-500")}>
                Activity
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "pipeline" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Deal Pipeline</h2>
              <button onClick={() => setIsDealModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                + Add Deal
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {stages.map(stage => (
                <div key={stage.id} className="flex-shrink-0 w-72" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, stage.id)}>
                  <div className={"rounded-t-lg p-3 text-white font-semibold " + stage.color}>
                    {stage.name} ({deals.filter(d => d.stage === stage.id).length})
                  </div>
                  <div className="bg-gray-200 rounded-b-lg p-2 min-h-96 space-y-2">
                    {deals.filter(d => d.stage === stage.id).map(deal => {
                      const contact = getContactById(deal.contactId);
                      return (
                        <div key={deal.id} draggable onDragStart={(e) => handleDragStart(e, deal.id)} className="bg-white rounded-lg p-3 shadow cursor-move hover:shadow-md">
                          <h4 className="font-semibold text-gray-800">{deal.title}</h4>
                          <p className="text-green-600 font-bold">${deal.value.toLocaleString()}</p>
                          {contact && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
                                {contact.avatar}
                              </span>
                              {contact.name}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
              <button onClick={() => setIsContactModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                + Add Contact
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map(contact => (
                <Card key={contact.id}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg font-bold">
                      {contact.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{contact.name}</h3>
                      <p className="text-gray-600">{contact.company}</p>
                      <p className="text-sm text-gray-500 mt-2">📧 {contact.email}</p>
                      <p className="text-sm text-gray-500">📞 {contact.phone}</p>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-600">
                          {deals.filter(d => d.contactId === contact.id).length} deals
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Feed</h2>
            <div className="space-y-4">
              {activities.map(activity => {
                const contact = getContactById(activity.contactId);
                return (
                  <Card key={activity.id}>
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                      <div className="flex-1">
                        <p className="text-gray-800">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          {contact && (
                            <span className="flex items-center gap-1">
                              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
                                {contact.avatar}
                              </span>
                              {contact.name}
                            </span>
                          )}
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Add New Contact">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="(555) 123-4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input type="text" value={newContact.company} onChange={(e) => setNewContact({ ...newContact, company: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="Acme Corp" />
          </div>
          <button onClick={handleAddContact} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Add Contact
          </button>
        </div>
      </Modal>

      <Modal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} title="Add New Deal">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
            <input type="text" value={newDeal.title} onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="Enterprise License" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
            <input type="number" value={newDeal.value} onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="10000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <select value={newDeal.contactId} onChange={(e) => setNewDeal({ ...newDeal, contactId: e.target.value })} className="w-full border rounded-md px-3 py-2">
              <option value="">Select contact</option>
              {contacts.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select value={newDeal.stage} onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value })} className="w-full border rounded-md px-3 py-2">
              {stages.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddDeal} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Add Deal
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;