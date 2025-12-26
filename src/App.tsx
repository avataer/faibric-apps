import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  createdAt: string;
  responseTime: string;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  ticketsResolved: number;
  avgResponseTime: string;
  satisfactionScore: number;
  status: "online" | "away" | "offline";
}

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
}

interface FilterFormData {
  status: string;
  priority: string;
  assignee: string;
  dateRange: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "tickets", label: "Tickets", icon: "🎫" },
  { id: "agents", label: "Agents", icon: "👥" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const tickets: Ticket[] = [
  { id: "TKT-001", subject: "Cannot access my account", customer: "John Smith", status: "open", priority: "high", assignee: "Sarah Johnson", createdAt: "2024-01-15 09:30", responseTime: "15 min" },
  { id: "TKT-002", subject: "Billing discrepancy", customer: "Emily Davis", status: "pending", priority: "medium", assignee: "Mike Chen", createdAt: "2024-01-15 10:15", responseTime: "23 min" },
  { id: "TKT-003", subject: "Feature request: Dark mode", customer: "Alex Wilson", status: "resolved", priority: "low", assignee: "Sarah Johnson", createdAt: "2024-01-14 14:00", responseTime: "45 min" },
  { id: "TKT-004", subject: "App crashes on startup", customer: "Maria Garcia", status: "open", priority: "urgent", assignee: "James Lee", createdAt: "2024-01-15 11:00", responseTime: "8 min" },
  { id: "TKT-005", subject: "Password reset not working", customer: "Robert Brown", status: "closed", priority: "medium", assignee: "Mike Chen", createdAt: "2024-01-13 16:30", responseTime: "30 min" },
  { id: "TKT-006", subject: "Integration issues with API", customer: "Lisa Anderson", status: "pending", priority: "high", assignee: "James Lee", createdAt: "2024-01-15 08:45", responseTime: "12 min" },
];

const agents: Agent[] = [
  { id: "1", name: "Sarah Johnson", avatar: "SJ", ticketsResolved: 156, avgResponseTime: "12 min", satisfactionScore: 4.8, status: "online" },
  { id: "2", name: "Mike Chen", avatar: "MC", ticketsResolved: 142, avgResponseTime: "18 min", satisfactionScore: 4.6, status: "online" },
  { id: "3", name: "James Lee", avatar: "JL", ticketsResolved: 128, avgResponseTime: "15 min", satisfactionScore: 4.7, status: "away" },
  { id: "4", name: "Emma Wilson", avatar: "EW", ticketsResolved: 98, avgResponseTime: "22 min", satisfactionScore: 4.5, status: "offline" },
];

const metrics: MetricCard[] = [
  { title: "Total Tickets", value: 1247, change: 12, changeLabel: "vs last week" },
  { title: "Avg Response Time", value: "18 min", change: -8, changeLabel: "vs last week" },
  { title: "Satisfaction Score", value: "4.7/5", change: 5, changeLabel: "vs last month" },
  { title: "Resolution Rate", value: "94%", change: 3, changeLabel: "vs last week" },
];

function Sidebar({ items, onSelect }: { items: NavItem[]; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-xl">🎧</div>
        <span className="text-xl font-bold">SupportHub</span>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-sm text-slate-400 mb-2">Need help?</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
}

function MetricCardComponent({ metric }: { metric: MetricCard }) {
  const isPositive = metric.change > 0;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <p className="text-slate-500 text-sm font-medium mb-2">{metric.title}</p>
      <p className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</p>
      <div className="flex items-center gap-1">
        <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? "↑" : "↓"} {Math.abs(metric.change)}%
        </span>
        <span className="text-slate-400 text-sm">{metric.changeLabel}</span>
      </div>
    </div>
  );
}

function FilterForm({ onFilter }: { onFilter: (data: FilterFormData) => void }) {
  const [formData, setFormData] = useState<FilterFormData>({
    status: "",
    priority: "",
    assignee: "",
    dateRange: "",
  });

  const handleChange = (field: keyof FilterFormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onFilter(newData);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
      <div className="grid grid-cols-4 gap-4">
        <select
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={formData.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={formData.assignee}
          onChange={(e) => handleChange("assignee", e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Agents</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.name}>{agent.name}</option>
          ))}
        </select>
        <select
          value={formData.dateRange}
          onChange={(e) => handleChange("dateRange", e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Ticket["status"] }) {
  const styles = {
    open: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
    closed: "bg-slate-100 text-slate-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Ticket["priority"] }) {
  const styles = {
    low: "bg-slate-100 text-slate-600",
    medium: "bg-blue-100 text-blue-600",
    high: "bg-orange-100 text-orange-600",
    urgent: "bg-red-100 text-red-600",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles[priority]}`}>
      {priority}
    </span>
  );
}

function TicketTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Recent Tickets</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{ticket.id}</p>
                    <p className="text-sm text-slate-500 truncate max-w-xs">{ticket.subject}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{ticket.customer}</td>
                <td className="px-6 py-4"><StatusBadge status={ticket.status} /></td>
                <td className="px-6 py-4"><PriorityBadge priority={ticket.priority} /></td>
                <td className="px-6 py-4 text-sm text-slate-700">{ticket.assignee}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{ticket.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgentList({ agents }: { agents: Agent[] }) {
  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-slate-400",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Agent Performance</h3>
      </div>
      <ul className="divide-y divide-slate-100">
        {agents.map((agent) => (
          <li key={agent.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {agent.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[agent.status]} rounded-full border-2 border-white`}></div>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{agent.name}</p>
                  <p className="text-sm text-slate-500">{agent.ticketsResolved} tickets resolved</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold text-slate-900">{agent.satisfactionScore}</span>
                </div>
                <p className="text-sm text-slate-500">Avg: {agent.avgResponseTime}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const handleFilter = (data: FilterFormData) => {
    let result = [...tickets];
    if (data.status) result = result.filter((t) => t.status === data.status);
    if (data.priority) result = result.filter((t) => t.priority === data.priority);
    if (data.assignee) result = result.filter((t) => t.assignee === data.assignee);
    setFilteredTickets(result);
  };

  const navItemsWithActive = navItems.map((item) => ({
    ...item,
    active: item.id === activeNav,
  }));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={navItemsWithActive} onSelect={setActiveNav} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Support Dashboard</h1>
          <p className="text-slate-500">Monitor ticket volume, response times, and agent performance</p>
        </div>
        
        <div className="grid grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCardComponent key={index} metric={metric} />
          ))}
        </div>

        <FilterForm onFilter={handleFilter} />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <TicketTable tickets={filteredTickets} />
          </div>
          <div>
            <AgentList agents={agents} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;