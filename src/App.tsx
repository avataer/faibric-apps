import React, { useState, useEffect } from "react";

// Interfaces
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface NavItem {
  id: string;
  label: string;
}

interface ListItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Navigation Component
const Navigation = ({
  currentView,
  onNavigate,
}: {
  currentView: string;
  onNavigate: (viewId: string) => void;
}) => {
  const navItems: NavItem[] = [
    { id: "tasks", label: "Tasks" },
    { id: "kanban", label: "Kanban Board" },
    { id: "table", label: "Task Table" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6 text-white">Todo App</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Task List Component
const TaskList = ({
  tasks,
  onToggleComplete,
  onDelete,
}: {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks yet. Add one above!</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${
              task.completed ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  task.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 hover:border-green-500"
                }`}
              >
                {task.completed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className={task.completed ? "line-through text-gray-500" : "text-gray-900 dark:text-white"}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

// Add Task Form
const AddTaskForm = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) = /> setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

// Kanban Board Component
const KanbanBoard = ({
  tasks,
  onToggleComplete,
  onDelete,
}: {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const Column = ({
    title,
    items,
    color,
  }: {
    title: string;
    items: Task[];
    color: string;
  }) => (
    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <h3 className={`font-semibold mb-4 ${color}`}>
        {title} ({items.length})
      </h3>
      <div className="space-y-2">
        {items.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow"
          >
            <div className="flex justify-between items-start">
              <span className="text-gray-900 dark:text-white">{task.title}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className="text-green-500 hover:text-green-700 p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex gap-4">
      <Column title="To Do" items={pendingTasks} color="text-yellow-600" />
      <Column title="Completed" items={completedTasks} color="text-green-600" />
    </div>
  );
};

// Task Table Component
const TaskTable = ({
  tasks,
  onToggleComplete,
  onDelete,
}: {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                No tasks yet
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      task.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.completed ? "Done" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggleComplete(task.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Settings View
const SettingsView = ({
  apiData,
  loading,
  error,
}: {
  apiData: Record<string, any>;
  loading: boolean;
  error: Error | null;
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          API Connection Status
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300">Local Storage</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300">Gateway API</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                loading
                  ? "bg-yellow-100 text-yellow-800"
                  : error
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {loading ? "Connecting..." : error ? "Error" : "Connected"}
            </span>
          </div>
          {apiData.lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {new Date(apiData.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          App Information
        </h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-400">
          <p>Version: 1.0.0</p>
          <p>Tasks are stored in local storage</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState<string>("tasks");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // API Data state
  const [apiData, setApiData] = useState<Record<string, any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Gateway fetch function
  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, endpoint }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    return result.data || result;
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [cryptoData] = await Promise.all([
          fetchFromGateway(
            "coingecko",
            "/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,eur"
          ).catch(() => null),
        ]);

        setApiData({
          crypto: cryptoData,
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch data"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Event Handlers
  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white">
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
        />
      </aside>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6">
        {/* Stats Header */}
        {currentView !== "settings" && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalTasks}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
            </div>
          </div>
        )}

        {/* View Switching */}
        {currentView === "tasks" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Task List
            </h2>
            <AddTaskForm onAdd={handleAddTask} />
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          </div>
        )}

        {currentView === "kanban" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Kanban Board
            </h2>
            <AddTaskForm onAdd={handleAddTask} />
            <KanbanBoard
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          </div>
        )}

        {currentView === "table" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Task Table
            </h2>
            <AddTaskForm onAdd={handleAddTask} />
            <TaskTable
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          </div>
        )}

        {currentView === "settings" && (
          <SettingsView apiData={apiData} loading={loading} error={error} />
        )}
      </main>
    </div>
  );
};

export default App;