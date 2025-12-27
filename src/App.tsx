import React, { useState } from "react";

// Interfaces
interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}

interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface CardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

interface FormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
}

interface HeaderProps {
  projectName: string;
  onAddTask: () => void;
}

// Sample Data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create wireframes and mockups for the homepage",
    status: "todo",
    priority: "high",
    assignee: "Alice",
    dueDate: "2024-02-15"
  },
  {
    id: "2",
    title: "Setup Database",
    description: "Configure PostgreSQL database and create schemas",
    status: "in-progress",
    priority: "high",
    assignee: "Bob",
    dueDate: "2024-02-10"
  },
  {
    id: "3",
    title: "Write Documentation",
    description: "Document API endpoints and usage examples",
    status: "done",
    priority: "medium",
    assignee: "Charlie",
    dueDate: "2024-02-08"
  },
  {
    id: "4",
    title: "User Authentication",
    description: "Implement login and registration features",
    status: "in-progress",
    priority: "high",
    assignee: "Alice",
    dueDate: "2024-02-12"
  },
  {
    id: "5",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "todo",
    priority: "medium",
    assignee: "Bob",
    dueDate: "2024-02-20"
  }
];

const columns: Column[] = [
  { id: "col-1", title: "To Do", status: "todo" },
  { id: "col-2", title: "In Progress", status: "in-progress" },
  { id: "col-3", title: "Done", status: "done" }
];

// Header Component
function Header({ projectName, onAddTask }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h1 className="text-2xl font-bold">{projectName}</h1>
        </div>
        <button
          onClick={onAddTask}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}

// Modal Component
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

// Task Card Component
function TaskCard({ task, onEdit, onDelete, onDragStart }: CardProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white rounded-lg shadow p-4 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{task.assignee}</span>
        </span>
        <span>{task.dueDate}</span>
      </div>
      <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t">
        <button
          onClick={() => onEdit(task)}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Task Form Component
function TaskForm({ task, onSubmit, onCancel }: FormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">(task?.status || "todo");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium");
  const [assignee, setAssignee] = useState(task?.assignee || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status, priority, assignee, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "todo" | "in-progress" | "done")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {task ? "Update" : "Create"} Task
        </button>
      </div>
    </form>
  );
}

// Main App Component
function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleSubmitTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...taskData, id: editingTask.id } : t)));
    } else {
      const newTask: Task = { ...taskData, id: Date.now().toString() };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: "todo" | "in-progress" | "done") => {
    e.preventDefault();
    if (draggedTaskId) {
      setTasks(tasks.map((t) => (t.id === draggedTaskId ? { ...t, status } : t)));
      setDraggedTaskId(null);
    }
  };

  const getTasksByStatus = (status: "todo" | "in-progress" | "done") => {
    return tasks.filter((t) => t.status === status);
  };

  const columnColors = {
    todo: "bg-gray-100",
    "in-progress": "bg-blue-50",
    done: "bg-green-50"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header projectName="Project Management Board" onAddTask={handleAddTask} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
              className={`rounded-lg p-4 ${columnColors[column.status]}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-700">{column.title}</h2>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                  {getTasksByStatus(column.status).length}
                </span>
              </div>
              <div className="space-y-3">
                {getTasksByStatus(column.status).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleSubmitTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;