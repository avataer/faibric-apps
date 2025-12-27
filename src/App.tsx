import React, { useState } from "react";

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedAgent: string;
  createdAt: string;
  responseTime: number;
  satisfactionScore: number | null;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  ticketsResolved: number;
  avgResponseTime: number;
  satisfactionScore: number;
  status: "online" | "offline" | "busy";
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

interface TableColumn {
  key: string;
  header: string;
}

const sampleTickets: Ticket[] = [
  { id: "TKT-001", subject: "Login issues with mobile app", customer: "John Smith", status: "open", priority: "high", assignedAgent: "Sarah Wilson", createdAt: "2024-01-15 09:30", responseTime: 15, satisfactionScore: null },
  { id: "TKT-002", subject: "Billing discrepancy", customer: "Emily Davis", status: "in_progress", priority: "urgent", assignedAgent: "Mike Johnson", createdAt: "2024-01-15 08:45", responseTime: 8, satisfactionScore: null },
  { id: "TKT-003", subject: "Feature request - dark mode", customer: "Alex Chen", status: "resolved", priority: "low", assignedAgent: "Sarah Wilson", createdAt: "2024-01-14 16:20", responseTime: 45, satisfactionScore: 5 },
  { id: "TKT-004", subject: "Password reset not working", customer: "Maria Garcia", status: "closed", priority: "medium", assignedAgent: "Tom Brown", createdAt: "2024-01-14 11:00", responseTime: 22, satisfactionScore: 4 },
  { id: "TKT-005", subject: "API integration help needed", customer: "David Lee", status: "in_progress", priority: "high", assignedAgent: "Mike Johnson", createdAt: "2024-01-15 10:15", responseTime: 12, satisfactionScore: null },
  { id: "TKT-006", subject: "Account suspension inquiry", customer: "Lisa Wang", status: "open", priority: "urgent", assignedAgent: "Sarah Wilson", createdAt: "2024-01-15 11:30", responseTime: 5, satisfactionScore: null },
  { id: "TKT-007", subject: "Refund request", customer: "James Miller", status: "resolved", priority: "medium", assignedAgent: "Tom Brown", createdAt: "2024-01-13 14:45", responseTime: 35, satisfactionScore: 3 },
  { id: "TKT-008", subject: "Cannot upload files", customer: "Rachel Green", status: "closed", priority: "low", assignedAgent: "Mike Johnson", createdAt: "2024-01-12 09:00", responseTime: 60, satisfactionScore: 5 },
];

const sampleAgents: Agent[] = [
  { id: "AGT-001", name: "Sarah Wilson", avatar: "SW", ticketsResolved: 145, avgResponseTime: 18, satisfactionScore: 4.8, status: "online" },
  { id: "AGT-002", name: "Mike Johnson", avatar: "MJ", ticketsResolved: 132, avgResponseTime: 22, satisfactionScore: 4.6, status: "busy" },
  { id: "AGT-003", name: "Tom Brown", avatar: "TB", ticketsResolved: 98, avgResponseTime: 28, satisfactionScore: 4.3, status: "online" },
  { id: "AGT-004", name: "Emma Davis", avatar: "ED", ticketsResolved: 87, avgResponseTime: 25, satisfactionScore: 4.5, status: "offline" },
];

function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  const changeColorClass = changeType === "positive" ? "text-green-600" : changeType === "negative" ? "text-red-600" : "text-gray-500";
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColorClass}`}>{change}</p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    open: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };

  const statusLabels: Record<string, string> = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
      {statusLabels[status] || status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const priorityStyles: Record<string, string> = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-blue-100 text-blue-600",
    high: "bg-orange-100 text-orange-600",
    urgent: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyles[priority] || "bg-gray-100 text-gray-600"}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

function AgentStatusDot({ status }: { status: string }) {
  const dotStyles: Record<string, string> = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-yellow-500",
  };

  return (
    <span className={`w-2.5 h-2.5 rounded-full ${dotStyles[status] || "bg-gray-400"}`}></span>
  );
}

function TicketTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={ticket.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap"><PriorityBadge priority={ticket.priority} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.assignedAgent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.responseTime} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgentPerformanceList({ agents }: { agents: Agent[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Agent Performance</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {agents.map((agent) => (
          <li key={agent.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {agent.avatar}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center">
                    <AgentStatusDot status={agent.status} />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.ticketsResolved} tickets resolved</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{agent.avgResponseTime} min</p>
                  <p className="text-xs text-gray-500">Avg. Response</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{agent.satisfactionScore}</span>
                  </div>
                  <p className="text-xs text-gray-500">Satisfaction</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTickets = statusFilter === "all" 
    ? sampleTickets 
    : sampleTickets.filter(t => t.status === statusFilter);

  const totalTickets = sampleTickets.length;
  const openTickets = sampleTickets.filter(t => t.status === "open" || t.status === "in_progress").length;
  const avgResponseTime = Math.round(sampleTickets.reduce((sum, t) => sum + t.responseTime, 0) / sampleTickets.length);
  const avgSatisfaction = (sampleTickets.filter(t => t.satisfactionScore !== null).reduce((sum, t) => sum + (t.satisfactionScore || 0), 0) / sampleTickets.filter(t => t.satisfactionScore !== null).length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Support Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                AD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Monitor your support team performance and ticket status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Tickets"
            value={totalTickets}
            change="+12% from last week"
            changeType="positive"
            icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
          <MetricCard
            title="Open Tickets"
            value={openTickets}
            change="-5% from last week"
            changeType="positive"
            icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <MetricCard
            title="Avg Response Time"
            value={`${avgResponseTime} min`}
            change="-8% improvement"
            changeType="positive"
            icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <MetricCard
            title="Satisfaction Score"
            value={`${avgSatisfaction}/5`}
            change="+0.2 from last month"
            changeType="positive"
            icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Tickets</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "open", "in_progress", "resolved", "closed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === status
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
            <TicketTable tickets={filteredTickets} />
          </div>
          <div>
            <AgentPerformanceList agents={sampleAgents} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;