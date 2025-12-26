import React, { useState } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  hoursLogged: number;
  tasksCompleted: number;
  productivity: number;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
}

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

interface SidebarProps {
  items: NavItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
}

interface StatsCardsProps {
  stats: StatCard[];
}

interface LineChartProps {
  data: ChartDataPoint[];
  title: string;
  color: string;
}

interface DataTableProps {
  data: TeamMember[] | Task[];
  type: "team" | "tasks";
}

// Layout Component
function Layout({ children, sidebar }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {sidebar}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}

// Sidebar Component
function Sidebar({ items, activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🌐</span>
          RemoteHub
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeItem === item.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Stats Cards Component
function StatsCards({ stats }: StatsCardsProps) {
  const iconMap: Record<string, string> = {
    users: "👥",
    clock: "⏱️",
    tasks: "✅",
    chart: "📈",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{iconMap[stat.icon] || "📊"}</span>
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${
                stat.change >= 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {stat.change >= 0 ? "+" : ""}
              {stat.change}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          <p className="text-xs text-gray-400 mt-2">{stat.changeLabel}</p>
        </div>
      ))}
    </div>
  );
}

// Line Chart Component
function LineChart({ data, title, color }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-48 flex items-end gap-2">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / range) * 100 + 10;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full rounded-t transition-all hover:opacity-80 ${color}`}
                style={{ height: `${height}%` }}
                title={`${point.value}`}
              />
              <span className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                {point.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Data Table Component
function DataTable({ data, type }: DataTableProps) {
  if (type === "team") {
    const teamData = data as TeamMember[];
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Team Members</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Hours
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tasks
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Productivity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamData.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === "online"
                          ? "bg-green-100 text-green-700"
                          : member.status === "busy"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "busy"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium">{member.hoursLogged}h</td>
                  <td className="px-4 py-4">{member.tasksCompleted}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${member.productivity}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{member.productivity}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const taskData = data as Task[];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Task Assignments</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Task
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Assignee
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {taskData.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium">{task.title}</td>
                <td className="px-4 py-4 text-gray-600">{task.assignee}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-600">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "calendar", label: "Team Calendar", icon: "📅", badge: 3 },
    { id: "tasks", label: "Task Board", icon: "📋", badge: 12 },
    { id: "time", label: "Time Tracking", icon: "⏱️" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const stats: StatCard[] = [
    { title: "Active Team Members", value: 24, change: 12, changeLabel: "from last month", icon: "users" },
    { title: "Hours Logged Today", value: "186h", change: 8, changeLabel: "from yesterday", icon: "clock" },
    { title: "Tasks Completed", value: 47, change: -3, changeLabel: "from last week", icon: "tasks" },
    { title: "Avg Productivity", value: "87%", change: 5, changeLabel: "from last month", icon: "chart" },
  ];

  const productivityData: ChartDataPoint[] = [
    { label: "Mon", value: 85 },
    { label: "Tue", value: 72 },
    { label: "Wed", value: 90 },
    { label: "Thu", value: 88 },
    { label: "Fri", value: 76 },
    { label: "Sat", value: 45 },
    { label: "Sun", value: 30 },
  ];

  const teamMembers: TeamMember[] = [
    { id: "1", name: "Alice Johnson", role: "Senior Developer", avatar: "AJ", status: "online", hoursLogged: 38, tasksCompleted: 12, productivity: 92 },
    { id: "2", name: "Bob Smith", role: "UI Designer", avatar: "BS", status: "busy", hoursLogged: 35, tasksCompleted: 8, productivity: 85 },
    { id: "3", name: "Carol Davis", role: "Project Manager", avatar: "CD", status: "online", hoursLogged: 40, tasksCompleted: 15, productivity: 88 },
    { id: "4", name: "David Wilson", role: "Backend Developer", avatar: "DW", status: "offline", hoursLogged: 32, tasksCompleted: 10, productivity: 78 },
  ];

  const tasks: Task[] = [
    { id: "1", title: "Complete API Integration", assignee: "Alice Johnson", priority: "high", status: "in-progress", dueDate: "2024-01-15" },
    { id: "2", title: "Design Dashboard UI", assignee: "Bob Smith", priority: "medium", status: "completed", dueDate: "2024-01-12" },
    { id: "3", title: "Sprint Planning", assignee: "Carol Davis", priority: "high", status: "pending", dueDate: "2024-01-16" },
    { id: "4", title: "Database Optimization", assignee: "David Wilson", priority: "low", status: "in-progress", dueDate: "2024-01-18" },
  ];

  return (
    <Layout
      sidebar={
        <Sidebar items={navItems} activeItem={activeNav} onItemClick={setActiveNav} />
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Workforce Dashboard</h1>
        <p className="text-gray-600">Monitor your remote team performance and productivity</p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChart data={productivityData} title="Weekly Productivity Trend" color="bg-blue-500" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Team Availability</h3>
          <div className="space-y-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <div key={day} className="flex items-center gap-4">
                <span className="w-12 text-sm font-medium text-gray-600">{day}</span>
                <div className="flex-1 flex gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 flex-1 rounded ${
                        Math.random() > 0.3 ? "bg-green-400" : "bg-gray-200"
                      }`}
                      title={`${9 + i}:00 - ${10 + i}:00`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-400" /> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gray-200" /> Unavailable
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DataTable data={teamMembers} type="team" />
        <DataTable data={tasks} type="tasks" />
      </div>
    </Layout>
  );
}

export default App;