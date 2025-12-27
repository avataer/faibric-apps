import React, { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignees: string[];
}

interface Column {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "done";
  color: string;
}

interface TaskCardProps {
  task: Task;
  teamMembers: TeamMember[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

interface AvatarGroupProps {
  memberIds: string[];
  teamMembers: TeamMember[];
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  teamMembers: TeamMember[];
}

const teamMembersData: TeamMember[] = [
  { id: "1", name: "Sarah Chen", avatar: "SC", color: "bg-purple-500" },
  { id: "2", name: "Mike Johnson", avatar: "MJ", color: "bg-blue-500" },
  { id: "3", name: "Emily Davis", avatar: "ED", color: "bg-green-500" },
  { id: "4", name: "Alex Rivera", avatar: "AR", color: "bg-orange-500" },
  { id: "5", name: "Jordan Lee", avatar: "JL", color: "bg-pink-500" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design System Components",
    description: "Create reusable UI components for the design system",
    status: "todo",
    priority: "high",
    dueDate: "2024-02-15",
    assignees: ["1", "3"],
  },
  {
    id: "2",
    title: "API Integration",
    description: "Connect frontend with backend REST APIs",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-10",
    assignees: ["2"],
  },
  {
    id: "3",
    title: "User Authentication",
    description: "Implement login and registration flow",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-02-12",
    assignees: ["2", "4"],
  },
  {
    id: "4",
    title: "Database Schema Review",
    description: "Review and optimize database structure",
    status: "review",
    priority: "medium",
    dueDate: "2024-02-08",
    assignees: ["4"],
  },
  {
    id: "5",
    title: "Documentation Update",
    description: "Update API documentation with new endpoints",
    status: "done",
    priority: "low",
    dueDate: "2024-02-05",
    assignees: ["3", "5"],
  },
  {
    id: "6",
    title: "Performance Testing",
    description: "Run load tests and optimize bottlenecks",
    status: "todo",
    priority: "medium",
    dueDate: "2024-02-20",
    assignees: ["1", "2", "4"],
  },
];

const columns: Column[] = [
  { id: "col-1", title: "To Do", status: "todo", color: "bg-slate-400" },
  { id: "col-2", title: "In Progress", status: "in-progress", color: "bg-blue-400" },
  { id: "col-3", title: "Review", status: "review", color: "bg-yellow-400" },
  { id: "col-4", title: "Done", status: "done", color: "bg-green-400" },
];

function AvatarGroup({ memberIds, teamMembers }: AvatarGroupProps) {
  const members = memberIds
    .map((id) => teamMembers.find((m) => m.id === id))
    .filter(Boolean) as TeamMember[];

  return (
    <div className="flex -space-x-2">
      {members.slice(0, 3).map((member) => (
        <div
          key={member.id}
          className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
          title={member.name}
        >
          {member.avatar}
        </div>
      ))}
      {members.length > 3 && (
        <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
          +{members.length - 3}
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, teamMembers, onStatusChange, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "done";
  const daysUntilDue = Math.ceil(
    (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                {columns.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      onStatusChange(task.id, col.status);
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Move to {col.title}
                  </button>
                ))}
                <hr className="my-1" />
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between">
        <AvatarGroup memberIds={task.assignees} teamMembers={teamMembers} />
        <div
          className={`flex items-center text-xs ${
            isOverdue ? "text-red-500" : "text-gray-500"
          }`}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {isOverdue
            ? "Overdue"
            : daysUntilDue === 0
            ? "Today"
            : daysUntilDue === 1
            ? "Tomorrow"
            : `${daysUntilDue} days`}
        </div>
      </div>
    </div>
  );
}

function CreateTaskModal({ isOpen, onClose, onSubmit, teamMembers }: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && dueDate) {
      onSubmit({
        title,
        description,
        status: "todo",
        priority,
        dueDate,
        assignees: selectedAssignees,
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setSelectedAssignees([]);
      onClose();
    }
  };

  const toggleAssignee = (id: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter task description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Task["priority"])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignees</label>
              <div className="flex flex-wrap gap-2">
                {teamMembers.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleAssignee(member.id)}
                    className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedAssignees.includes(member.id)
                        ? `${member.color} text-white`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {member.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleCreateTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your tasks and track progress
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {teamMembersData.map((member) => (
                  <div
                    key={member.id}
                    className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center text-white text-sm font-medium border-2 border-white`}
                    title={member.name}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Task
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status);
            return (
              <div key={column.id} className="flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <h2 className="font-semibold text-gray-700">{column.title}</h2>
                  <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      teamMembers={teamMembersData}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                      No tasks yet
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        teamMembers={teamMembersData}
      />
    </div>    </div>
  );
}

export default App;