import React, { useState } from "react";

interface RequirementItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "compliant" | "non-compliant" | "in-progress" | "pending";
  dueDate: string;
  assignee: string;
  lastUpdated: string;
}

interface AuditLogEntry {
  id: string;
  requirementId: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

interface CategoryFilter {
  name: string;
  count: number;
}

interface StatusBadgeProps {
  status: RequirementItem["status"];
}

interface ProgressBarProps {
  percentage: number;
  color: string;
}

interface TableProps {
  requirements: RequirementItem[];
  onStatusChange: (id: string, status: RequirementItem["status"]) => void;
}

interface AuditListProps {
  auditLogs: AuditLogEntry[];
}

const sampleRequirements: RequirementItem[] = [
  {
    id: "REQ-001",
    title: "Data Encryption Standards",
    description: "All sensitive data must be encrypted at rest and in transit using AES-256",
    category: "Security",
    status: "compliant",
    dueDate: "2024-03-15",
    assignee: "John Smith",
    lastUpdated: "2024-01-10"
  },
  {
    id: "REQ-002",
    title: "Access Control Policy",
    description: "Implement role-based access control for all system resources",
    category: "Security",
    status: "in-progress",
    dueDate: "2024-04-01",
    assignee: "Sarah Johnson",
    lastUpdated: "2024-01-12"
  },
  {
    id: "REQ-003",
    title: "GDPR Data Subject Rights",
    description: "Ensure all data subject requests can be processed within 30 days",
    category: "Privacy",
    status: "compliant",
    dueDate: "2024-02-28",
    assignee: "Mike Brown",
    lastUpdated: "2024-01-08"
  },
  {
    id: "REQ-004",
    title: "Financial Reporting Standards",
    description: "Quarterly financial reports must comply with SOX requirements",
    category: "Financial",
    status: "pending",
    dueDate: "2024-03-31",
    assignee: "Emily Davis",
    lastUpdated: "2024-01-05"
  },
  {
    id: "REQ-005",
    title: "Incident Response Plan",
    description: "Maintain and test incident response procedures quarterly",
    category: "Operations",
    status: "non-compliant",
    dueDate: "2024-01-31",
    assignee: "David Wilson",
    lastUpdated: "2024-01-11"
  },
  {
    id: "REQ-006",
    title: "Vendor Risk Assessment",
    description: "Complete annual risk assessments for all critical vendors",
    category: "Operations",
    status: "in-progress",
    dueDate: "2024-05-15",
    assignee: "Lisa Anderson",
    lastUpdated: "2024-01-09"
  },
  {
    id: "REQ-007",
    title: "Privacy Policy Updates",
    description: "Review and update privacy policies annually",
    category: "Privacy",
    status: "compliant",
    dueDate: "2024-06-01",
    assignee: "Tom Martinez",
    lastUpdated: "2024-01-07"
  }
];

const sampleAuditLogs: AuditLogEntry[] = [
  { id: "AUD-001", requirementId: "REQ-001", action: "Status Changed", user: "John Smith", timestamp: "2024-01-10 14:32:00", details: "Status updated from in-progress to compliant" },
  { id: "AUD-002", requirementId: "REQ-002", action: "Assignee Changed", user: "Admin", timestamp: "2024-01-12 09:15:00", details: "Assignee changed from Mike Brown to Sarah Johnson" },
  { id: "AUD-003", requirementId: "REQ-005", action: "Status Changed", user: "David Wilson", timestamp: "2024-01-11 16:45:00", details: "Status updated from pending to non-compliant" },
  { id: "AUD-004", requirementId: "REQ-003", action: "Evidence Uploaded", user: "Mike Brown", timestamp: "2024-01-08 11:20:00", details: "Uploaded compliance evidence document" },
  { id: "AUD-005", requirementId: "REQ-006", action: "Created", user: "Admin", timestamp: "2024-01-09 08:00:00", details: "New requirement created" }
];

function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    "compliant": { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500", label: "Compliant" },
    "non-compliant": { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500", label: "Non-Compliant" },
    "in-progress": { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500", label: "In Progress" },
    "pending": { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500", label: "Pending" }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-2 h-2 mr-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
}

function ProgressBar({ percentage, color }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

function RequirementsTable({ requirements, onStatusChange }: TableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requirements.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{req.id}</td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{req.title}</div>
                <div className="text-sm text-gray-500 max-w-xs truncate">{req.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">{req.category}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={req.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.assignee}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.dueDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select
                  value={req.status}
                  onChange={(e) => onStatusChange(req.id, e.target.value as RequirementItem["status"])}
                  className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AuditTrailList({ auditLogs }: AuditListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Audit Trail</h3>
      </div>
      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {auditLogs.map((log) => (
          <li key={log.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 text-xs font-medium">{log.user.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {log.action} - <span className="text-indigo-600">{log.requirementId}</span>
                  </p>
                  <p className="text-sm text-gray-500">{log.details}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{log.user}</p>
                <p className="text-xs text-gray-400">{log.timestamp}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [requirements, setRequirements] = useState<RequirementItem[]>(sampleRequirements);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(sampleAuditLogs);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: CategoryFilter[] = [
    { name: "All", count: requirements.length },
    { name: "Security", count: requirements.filter(r => r.category === "Security").length },
    { name: "Privacy", count: requirements.filter(r => r.category === "Privacy").length },
    { name: "Financial", count: requirements.filter(r => r.category === "Financial").length },
    { name: "Operations", count: requirements.filter(r => r.category === "Operations").length }
  ];

  const filteredRequirements = selectedCategory === "All"
    ? requirements
    : requirements.filter(r => r.category === selectedCategory);

  const complianceStats = {
    compliant: requirements.filter(r => r.status === "compliant").length,
    nonCompliant: requirements.filter(r => r.status === "non-compliant").length,
    inProgress: requirements.filter(r => r.status === "in-progress").length,
    pending: requirements.filter(r => r.status === "pending").length
  };

  const overallCompliance = Math.round((complianceStats.compliant / requirements.length) * 100);

  const handleStatusChange = (id: string, newStatus: RequirementItem["status"]) => {
    const req = requirements.find(r => r.id === id);
    if (req) {
      const oldStatus = req.status;
      setRequirements(prev => prev.map(r =>
        r.id === id ? { ...r, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] } : r
      ));

      const newLog: AuditLogEntry = {
        id: `AUD-${Date.now()}`,
        requirementId: id,
        action: "Status Changed",
        user: "Current User",
        timestamp: new Date().toLocaleString(),
        details: `Status updated from ${oldStatus} to ${newStatus}`
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
              <p className="text-sm text-gray-500">Monitor and manage regulatory compliance requirements</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Last sync: {new Date().toLocaleDateString()}</span>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overall Compliance</p>
                <p className="text-3xl font-bold text-gray-900">{overallCompliance}%</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar percentage={overallCompliance} color="bg-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Compliant</p>
                <p className="text-3xl font-bold text-green-600">{complianceStats.compliant}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar percentage={(complianceStats.compliant / requirements.length) * 100} color="bg-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Non-Compliant</p>
                <p className="text-3xl font-bold text-red-600">{complianceStats.nonCompliant}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar percentage={(complianceStats.nonCompliant / requirements.length) * 100} color="bg-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{complianceStats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar percentage={(complianceStats.inProgress / requirements.length) * 100} color="bg-yellow-500" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    selectedCategory === category.name
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Requirements Checklist</h2>
            <RequirementsTable requirements={filteredRequirements} onStatusChange={handleStatusChange} />
          </div>

          <div className="lg:col-span-1">
            <AuditTrailList auditLogs={auditLogs} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;