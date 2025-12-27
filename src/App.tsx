import React, { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: "available" | "busy" | "offline";
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface TimeEntry {
  id: number;
  member: string;
  project: string;
  hours: number;
  date: string;
}

interface ProductivityData {
  day: string;
  tasksCompleted: number;
  hoursWorked: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  positive: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer", status: "available", avatar: "AJ" },
  { id: 2, name: "Bob Smith", role: "Backend Developer", status: "busy", avatar: "BS" },
  { id: 3, name: "Carol White", role: "Designer", status: "available", avatar: "CW" },
  { id: 4, name: "David Brown", role: "Project Manager", status: "offline", avatar: "DB" },
  { id: 5, name: "Eva Martinez", role: "QA Engineer", status: "available", avatar: "EM" },
];

const initialTasks: Task[] = [
  { id: 1, title: "Design homepage mockup", assignee: "Carol White", status: "completed", priority: "high", dueDate: "2024-01-15" },
  { id: 2, title: "Implement user authentication", assignee: "Bob Smith", status: "in-progress", priority: "high", dueDate: "2024-01-18" },
  { id: 3, title: "Write API documentation", assignee: "Alice Johnson", status: "todo", priority: "medium", dueDate: "2024-01-20" },
  { id: 4, title: "Test payment integration", assignee: "Eva Martinez", status: "in-progress", priority: "high", dueDate: "2024-01-17" },
  { id: 5, title: "Review code changes", assignee: "David Brown", status: "todo", priority: "low", dueDate: "2024-01-22" },
];

const timeEntries: TimeEntry[] = [
  { id: 1, member: "Alice Johnson", project: "Dashboard", hours: 6.5, date: "2024-01-15" },
  { id: 2, member: "Bob Smith", project: "API Development", hours: 8, date: "2024-01-15" },
  { id: 3, member: "Carol White", project: "UI Design", hours: 7, date: "2024-01-15" },
  { id: 4, member: "Eva Martinez", project: "Testing", hours: 5.5, date: "2024-01-15" },
];

const productivityData: ProductivityData[] = [
  { day: "Mon", tasksCompleted: 12, hoursWorked: 32 },
  { day: "Tue", tasksCompleted: 15, hoursWorked: 35 },
  { day: "Wed", tasksCompleted: 10, hoursWorked: 30 },
  { day: "Thu", tasksCompleted: 18, hoursWorked: 38 },
  { day: "Fri", tasksCompleted: 14, hoursWorked: 33 },
];

function StatCard({ title, value, change, positive }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className={`text-sm mt-2 ${positive ? "text-green-600" : "text-red-600"}`}>
        {positive ? "↑" : "↓"} {change} from last week
      </p>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function LineChart({ data }: { data: ProductivityData[] }) {
  const maxTasks = Math.max(...data.map(d => d.tasksCompleted));
  const maxHours = Math.max(...data.map(d => d.hoursWorked));
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Productivity</h3>
      <div className="flex items-end justify-between h-48 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex gap-1 items-end h-40 w-full justify-center">
              <div
                className="bg-blue-500 w-4 rounded-t"
                style={{ height: `${(item.tasksCompleted / maxTasks) * 100}%` }}
                title={`Tasks: ${item.tasksCompleted}`}
              ></div>
              <div
                className="bg-green-500 w-4 rounded-t"
                style={{ height: `${(item.hoursWorked / maxHours) * 100}%` }}
                title={`Hours: ${item.hoursWorked}`}
              ></div>
            </div>
            <span className="text-sm text-gray-600 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Tasks Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Hours Worked</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", assignee: "", priority: "medium" as const, dueDate: "" });
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        assignee: newTask.assignee,
        status: "todo",
        priority: newTask.priority,
        dueDate: newTask.dueDate,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: "", assignee: "", priority: "medium", dueDate: "" });
      setIsModalOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "busy": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Remote Workforce Manager</h1>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab("dashboard")} className={`px-4 py-2 rounded ${activeTab === "dashboard" ? "bg-indigo-800" : "hover:bg-indigo-700"}`}>Dashboard</button>
            <button onClick={() => setActiveTab("team")} className={`px-4 py-2 rounded ${activeTab === "team" ? "bg-indigo-800" : "hover:bg-indigo-700"}`}>Team</button>
            <button onClick={() => setActiveTab("tasks")} className={`px-4 py-2 rounded ${activeTab === "tasks" ? "bg-indigo-800" : "hover:bg-indigo-700"}`}>Tasks</button>
            <button onClick={() => setActiveTab("time")} className={`px-4 py-2 rounded ${activeTab === "time" ? "bg-indigo-800" : "hover:bg-indigo-700"}`}>Time Tracking</button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <StatCard title="Total Team Members" value={teamMembers.length} change="2 new" positive={true} />
              <StatCard title="Active Tasks" value={tasks.filter(t => t.status !== "completed").length} change="3 less" positive={true} />
              <StatCard title="Hours This Week" value="168" change="12%" positive={true} />
              <StatCard title="Completion Rate" value="87%" change="5%" positive={true} />
            </div>
            <LineChart data={productivityData} />
          </div>
        )}
        {activeTab === "team" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Team Availability</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {teamMembers.map(member => (
                <div key={member.id} className="border rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">{member.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`} title={member.status}></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "tasks" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Task Assignments</h2>
              <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">+ Add Task</button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Task</th>
                  <th className="text-left p-4">Assignee</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Priority</th>
                  <th className="text-left p-4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{task.title}</td>
                    <td className="p-4">{task.assignee}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${task.status === "completed" ? "bg-green-100 text-green-800" : task.status === "in-progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>{task.status}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                    </td>
                    <td className="p-4">{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "time" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Time Tracking</h2>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Team Member</th>
                  <th className="text-left p-4">Project</th>
                  <th className="text-left p-4">Hours</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {timeEntries.map(entry => (
                  <tr key={entry.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{entry.member}</td>
                    <td className="p-4">{entry.project}</td>
                    <td className="p-4">{entry.hours}h</td>
                    <td className="p-4">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full border rounded p-2" placeholder="Enter task title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
            <select value={newTask.assignee} onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })} className="w-full border rounded p-2">
              <option value="">Select team member</option>
              {teamMembers.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "low" | "medium" | "high" })} className="w-full border rounded p-2">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="w-full border rounded p-2" />
          </div>
          <button onClick={handleAddTask} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Add Task</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;