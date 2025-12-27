import React, { useState } from "react";

// Interfaces
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Board {
  id: string;
  name: string;
  columns: Column[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: "left" | "right") => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

interface HeaderProps {
  boardName: string;
  onAddTask: () => void;
}

// Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// Task Form Component
const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, priority, dueDate });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task description"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// Task Card Component
const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onMove, canMoveLeft, canMoveRight }) => {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{task.title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}
      {task.dueDate && (
        <p className="text-xs text-gray-500 mb-3">Due: {task.dueDate}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => onMove(task.id, "left")}
            disabled={!canMoveLeft}
            className={`p-1 rounded ${canMoveLeft ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"}`}
          >
            ←
          </button>
          <button
            onClick={() => onMove(task.id, "right")}
            disabled={!canMoveRight}
            className={`p-1 rounded ${canMoveRight ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"}`}
          >
            →
          </button>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header: React.FC<HeaderProps> = ({ boardName, onAddTask }) => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">📋 TaskFlow</h1>
          <span className="text-blue-200">|</span>
          <span className="text-lg">{boardName}</span>
        </div>
        <button
          onClick={onAddTask}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
        >
          + Add Task
        </button>
      </div>
    </header>
  );
};

// Main App Component
function App() {
  const initialBoard: Board = {
    id: "board-1",
    name: "Project Tasks",
    columns: [
      {
        id: "todo",
        title: "To Do",
        tasks: [
          { id: "1", title: "Design homepage", description: "Create wireframes for the main landing page", priority: "high", dueDate: "2024-01-15" },
          { id: "2", title: "Setup database", description: "Configure PostgreSQL connection", priority: "medium", dueDate: "2024-01-20" },
        ],
      },
      {
        id: "in-progress",
        title: "In Progress",
        tasks: [
          { id: "3", title: "Implement auth", description: "Add login and registration functionality", priority: "high", dueDate: "2024-01-18" },
        ],
      },
      {
        id: "review",
        title: "Review",
        tasks: [
          { id: "4", title: "API endpoints", description: "Review REST API documentation", priority: "low", dueDate: "2024-01-22" },
        ],
      },
      {
        id: "done",
        title: "Done",
        tasks: [
          { id: "5", title: "Project setup", description: "Initialize React project with TypeScript", priority: "medium", dueDate: "2024-01-10" },
        ],
      },
    ],
  };

  const [board, setBoard] = useState<Board>(initialBoard);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };

    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col, index) =>
        index === 0 ? { ...col, tasks: [...col.tasks, newTask] } : col
      ),
    }));
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    }));
  };

  const handleMoveTask = (taskId: string, direction: "left" | "right") => {
    setBoard((prev) => {
      const newColumns = [...prev.columns];
      let sourceColIndex = -1;
      let task: Task | null = null;

      for (let i = 0; i < newColumns.length; i++) {
        const foundTask = newColumns[i].tasks.find((t) => t.id === taskId);
        if (foundTask) {
          sourceColIndex = i;
          task = foundTask;
          break;
        }
      }

      if (task === null || sourceColIndex === -1) return prev;

      const targetColIndex = direction === "left" ? sourceColIndex - 1 : sourceColIndex + 1;
      if (targetColIndex < 0 || targetColIndex >= newColumns.length) return prev;

      newColumns[sourceColIndex] = {
        ...newColumns[sourceColIndex],
        tasks: newColumns[sourceColIndex].tasks.filter((t) => t.id !== taskId),
      };
      newColumns[targetColIndex] = {
        ...newColumns[targetColIndex],
        tasks: [...newColumns[targetColIndex].tasks, task],
      };

      return { ...prev, columns: newColumns };
    });
  };

  const columnColors = ["bg-gray-100", "bg-blue-50", "bg-yellow-50", "bg-green-50"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header boardName={board.name} onAddTask={() => setIsModalOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {board.columns.map((column, colIndex) => (
            <div
              key={column.id}
              className={`${columnColors[colIndex]} rounded-lg p-4`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{column.title}</h3>
                <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onMove={handleMoveTask}
                    canMoveLeft={colIndex > 0}
                    canMoveRight={colIndex < board.columns.length - 1}
                  />
                ))}
                {column.tasks.length === 0 && (
                  <p className="text-gray-400 text-center py-8 text-sm">
                    No tasks yet
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;