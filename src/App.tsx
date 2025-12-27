import React, { useState } from "react";

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

interface Requirement {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "compliant" | "non-compliant" | "in-progress" | "pending";
  dueDate: string;
  assignee: string;
  progress: number;
  auditTrail: AuditEntry[];
}

interface StatusBadgeProps {
  status: Requirement["status"];
}

interface ProgressBarProps {
  progress: number;
}

interface RequirementRowProps {
  requirement: Requirement;
  onStatusChange: (id: string, status: Requirement["status"]) => void;
}

interface AuditListProps {
  entries: AuditEntry[];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    compliant: "bg-green-100 text-green-800 border-green-200",
    "non-compliant": "bg-red-100 text-red-800 border-red-200",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    pending: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const statusLabels = {
    compliant: "Compliant",
    "non-compliant": "Non-Compliant",
    "in-progress": "In Progress",
    pending: "Pending",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const AuditList: React.FC<AuditListProps> = ({ entries }) => {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-gray-50 p-3 rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <span className="font-medium text-gray-800">{entry.action}</span>
            <span className="text-xs text-gray-500">{entry.timestamp}</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">{entry.details}</div>
          <div className="text-xs text-gray-500 mt-1">By: {entry.user}</div>
        </div>
      ))}
    </div>
  );
};

const RequirementRow: React.FC<RequirementRowProps> = ({
  requirement,
  onStatusChange,
}) => {
  const [showAudit, setShowAudit] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <div className="bg-white p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3">
            <h3 className="font-semibold text-gray-900">{requirement.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {requirement.description}
            </p>
          </div>
          <div className="col-span-2">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              {requirement.category}
            </span>
          </div>
          <div className="col-span-2">
            <StatusBadge status={requirement.status} />
          </div>
          <div className="col-span-2">
            <div className="text-sm text-gray-600 mb-1">
              {requirement.progress}%
            </div>
            <ProgressBar progress={requirement.progress} />
          </div>
          <div className="col-span-2">
            <div className="text-sm text-gray-600">{requirement.assignee}</div>
            <div className="text-xs text-gray-400">
              Due: {requirement.dueDate}
            </div>
          </div>
          <div className="col-span-1">
            <button
              onClick={() => setShowAudit(!showAudit)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            >
              {showAudit ? "▲" : "▼"}
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <select
            value={requirement.status}
            onChange={(e) =>
              onStatusChange(
                requirement.id,
                e.target.value as Requirement["status"]
              )
            }
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="compliant">Compliant</option>
            <option value="non-compliant">Non-Compliant</option>
          </select>
        </div>
      </div>
      {showAudit && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3">Audit Trail</h4>
          <AuditList entries={requirement.auditTrail} />
        </div>
      )}
    </div>
  );
};

function App() {
  const initialRequirements: Requirement[] = [
    {
      id: "REQ-001",
      title: "Data Encryption Standards",
      description: "All sensitive data must be encrypted at rest and in transit",
      category: "Security",
      status: "compliant",
      dueDate: "2024-03-15",
      assignee: "John Smith",
      progress: 100,
      auditTrail: [
        {
          id: "A1",
          timestamp: "2024-01-15 10:30",
          action: "Status Changed",
          user: "John Smith",
          details: "Changed status from in-progress to compliant",
        },
        {
          id: "A2",
          timestamp: "2024-01-10 14:22",
          action: "Progress Updated",
          user: "John Smith",
          details: "Updated progress to 100%",
        },
      ],
    },
    {
      id: "REQ-002",
      title: "Access Control Policy",
      description: "Implement role-based access control for all systems",
      category: "Security",
      status: "in-progress",
      dueDate: "2024-04-01",
      assignee: "Sarah Johnson",
      progress: 65,
      auditTrail: [
        {
          id: "A3",
          timestamp: "2024-02-01 09:15",
          action: "Requirement Created",
          user: "Admin",
          details: "New requirement added to compliance checklist",
        },
      ],
    },
    {
      id: "REQ-003",
      title: "Privacy Policy Update",
      description: "Update privacy policy to comply with GDPR requirements",
      category: "Privacy",
      status: "pending",
      dueDate: "2024-03-30",
      assignee: "Mike Brown",
      progress: 0,
      auditTrail: [
        {
          id: "A4",
          timestamp: "2024-02-05 11:00",
          action: "Assigned",
          user: "Admin",
          details: "Assigned to Mike Brown",
        },
      ],
    },
    {
      id: "REQ-004",
      title: "Financial Audit Documentation",
      description: "Prepare all financial records for annual audit",
      category: "Financial",
      status: "non-compliant",
      dueDate: "2024-02-28",
      assignee: "Emily Davis",
      progress: 30,
      auditTrail: [
        {
          id: "A5",
          timestamp: "2024-02-10 16:45",
          action: "Status Changed",
          user: "Auditor",
          details: "Marked as non-compliant due to missing documents",
        },
      ],
    },
    {
      id: "REQ-005",
      title: "Employee Training Records",
      description: "Maintain up-to-date training records for all employees",
      category: "HR",
      status: "in-progress",
      dueDate: "2024-04-15",
      assignee: "Lisa Wilson",
      progress: 45,
      auditTrail: [
        {
          id: "A6",
          timestamp: "2024-01-20 08:30",
          action: "Progress Updated",
          user: "Lisa Wilson",
          details: "Updated progress to 45%",
        },
      ],
    },
    {
      id: "REQ-006",
      title: "Vendor Compliance Verification",
      description: "Verify all third-party vendors meet compliance standards",
      category: "Operations",
      status: "compliant",
      dueDate: "2024-03-01",
      assignee: "Tom Anderson",
      progress: 100,
      auditTrail: [
        {
          id: "A7",
          timestamp: "2024-02-15 12:00",
          action: "Verification Complete",
          user: "Tom Anderson",
          details: "All vendors verified and documented",
        },
      ],
    },
  ];

  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const categories = ["all", ...new Set(requirements.map((r) => r.category))];
  const statuses = ["all", "compliant", "non-compliant", "in-progress", "pending"];

  const filteredRequirements = requirements.filter((req) => {
    const categoryMatch = categoryFilter === "all" || req.category === categoryFilter;
    const statusMatch = statusFilter === "all" || req.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const handleStatusChange = (id: string, newStatus: Requirement["status"]) => {
    setRequirements((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: newStatus,
              auditTrail: [
                {
                  id: `A${Date.now()}`,
                  timestamp: new Date().toLocaleString(),
                  action: "Status Changed",
                  user: "Current User",
                  details: `Status updated to ${newStatus}`,
                },
                ...req.auditTrail,
              ],
            }
          : req
      )
    );
  };

  const overallProgress = Math.round(
    requirements.reduce((sum, req) => sum + req.progress, 0) / requirements.length
  );

  const complianceStats = {
    compliant: requirements.filter((r) => r.status === "compliant").length,
    nonCompliant: requirements.filter((r) => r.status === "non-compliant").length,
    inProgress: requirements.filter((r) => r.status === "in-progress").length,
    pending: requirements.filter((r) => r.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Compliance Tracking Dashboard
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-500">Overall Progress</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">
              {overallProgress}%
            </div>
            <ProgressBar progress={overallProgress} />
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow border border-green-200">
            <div className="text-sm text-green-600">Compliant</div>
            <div className="text-3xl font-bold text-green-700 mt-1">
              {complianceStats.compliant}
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow border border-yellow-200">
            <div className="text-sm text-yellow-600">In Progress</div>
            <div className="text-3xl font-bold text-yellow-700 mt-1">
              {complianceStats.inProgress}
            </div>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200">
            <div className="text-sm text-red-600">Non-Compliant</div>
            <div className="text-3xl font-bold text-red-700 mt-1">
              {complianceStats.nonCompliant}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all"
                      ? "All Statuses"
                      : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              Showing {filteredRequirements.length} of {requirements.length} requirements
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Requirements Checklist
          </h2>
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-lg mb-4 text-sm font-medium text-gray-600">
            <div className="col-span-3">Requirement</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Progress</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-1">Audit</div>
          </div>
          {filteredRequirements.map((req) => (
            <RequirementRow
              key={req.id}
              requirement={req}
              onStatusChange={handleStatusChange}
            />
          ))}
          {filteredRequirements.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No requirements match the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;