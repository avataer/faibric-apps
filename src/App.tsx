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
  dueDate: string;
  assignee: TeamMember | null;
  priority: "low" | "medium" | "high";
}

interface Column {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "done";
}

interface FormData {
  title: string;
  description: string;
  dueDate: string;
  assigneeId: string;
  priority: "low" | "medium" | "high";
}

const teamMembers: TeamMember[] = [
  { id: "1", name: "Alice Johnson", avatar: "AJ", color: "bg-blue-500" },
  { id: "2", name: "Bob Smith", avatar: "BS", color: "bg-green-500" },
  { id: "3", name: "Carol White", avatar: "CW", color: "bg-purple-500" },
  { id: "4", name: "David Brown", avatar: "DB", color: "bg-orange-500" },
];

const columns: Column[] = [
  { id: "col-1", title: "To Do", status: "todo" },
  { id: "col-2", title: "In Progress", status: "in-progress" },
  { id: "col-3", title: "Review", status: "review" },
  { id: "col-4", title: "Done", status: "done" },
];

const initialTasks: Task[] = [
  { id: "task-1", title: "Design System Setup", description: "Create design tokens and component library", status: "done", dueDate: "2024-01-15", assignee: teamMembers[0], priority: "high" },
  { id: "task-2", title: "API Integration", description: "Connect frontend with backend services", status: "in-progress", dueDate: "2024-01-20", assignee: teamMembers[1], priority: "high" },
  { id: "task-3", title: "User Authentication", description: "Implement login and registration flow", status: "review", dueDate: "2024-01-18", assignee: teamMembers[2], priority: "medium" },
  { id: "task-4", title: "Dashboard Analytics", description: "Build analytics dashboard with charts", status: "todo", dueDate: "2024-01-25", assignee: teamMembers[3], priority: "low" },
  { id: "task-5", title: "Mobile Responsive", description: "Make all pages mobile friendly", status: "todo", dueDate: "2024-01-22", assignee: teamMembers[0], priority: "medium" },
];

function Avatar(props: { member: TeamMember; size?: string }) {
  const sizeClass = props.size === "sm" ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm";
  return (
    <div className={`${props.member.color} ${sizeClass} rounded-full flex items-center justify-center text-white font-medium`}>
      {props.member.avatar}
    </div>
  );
}

function TaskCard(props: { task: Task; onStatusChange: (taskId: string, status: Task["status"]) => void; onDelete: (taskId: string) => void }) {
  const priorityColors = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const isOverdue = new Date(props.task.dueDate) < new Date() && props.task.status !== "done";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{props.task.title}</h4>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[props.task.priority]}`}>
          {props.task.priority}
        </span>
      </div>
      <p className="text-gray-500 text-xs mb-3 line-clamp-2">{props.task.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {props.task.assignee && <Avatar member={props.task.assignee} size="sm" />}
          <span className={`text-xs ${isOverdue ? "text-red-500 font-medium" : "text-gray-400"}`}>
            {new Date(props.task.dueDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-1">
          <select
            className="text-xs border rounded px-1 py-0.5 bg-gray-50"
            value={props.task.status}
            onChange={(e) => props.onStatusChange(props.task.id, e.target.value as Task["status"])}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
          <button
            onClick={() => props.onDelete(props.task.id)}
            className="text-red-400 hover:text-red-600 px-1"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn(props: { column: Column; tasks: Task[]; onStatusChange: (taskId: string, status: Task["status"]) => void; onDelete: (taskId: string) => void }) {
  const columnColors = {
    "todo": "border-t-gray-400",
    "in-progress": "border-t-blue-400",
    "review": "border-t-yellow-400",
    "done": "border-t-green-400",
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 min-w-[280px] border-t-4 ${columnColors[props.column.status]}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{props.column.title}</h3>
        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
          {props.tasks.length}
        </span>
      </div>
      <div className="space-y-2">
        {props.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onStatusChange={props.onStatusChange} onDelete={props.onDelete} />
        ))}
      </div>
    </div>
  );
}

function Modal(props: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{props.title}</h2>
          <button onClick={props.onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>
        <div className="p-4">{props.children}</div>
      </div>
    </div>
  );
}

function TaskForm(props: { onSubmit: (data: FormData) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    dueDate: "",
    assigneeId: "",
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.dueDate) {
      props.onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as FormData["priority"] })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
        <select
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.assigneeId}
          onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
        >
          <option value="">Unassigned</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={props.onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}

function Header(props: { onAddTask: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900">Project Board</h1>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Active Sprint</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="ring-2 ring-white rounded-full">
                <Avatar member={member} />
              </div>
            ))}
          </div>
          <button
            onClick={props.onAddTask}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>+</span>
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleCreateTask = (formData: FormData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      status: "todo",
      dueDate: formData.dueDate,
      assignee: teamMembers.find((m) => m.id === formData.assigneeId) || null,
      priority: formData.priority,
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddTask={() => setIsModalOpen(true)} />
      <main className="p-6">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.status)}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
        <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;