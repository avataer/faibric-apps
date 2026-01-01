import React, { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// TYPESCRIPT INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface NavItem {
  id: string;
  label: string;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
}

interface NavigationProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, onLogout }) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "kanban", label: "Kanban Board" },
    { id: "list", label: "Task List" },
    { id: "table", label: "Table View" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Todo App</h1>
        <p className="text-gray-400 text-sm">Manage your tasks</p>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="w-full px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Card: React.FC<CardProps> = ({ title, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <div className="text-gray-600 dark:text-gray-300">{children}</div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FORM FIELD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) = /> onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const App: React.FC = () => {
  // State declarations
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Complete project proposal", description: "Write the initial draft", status: "todo", priority: "high", createdAt: "2024-01-15" },
    { id: "2", title: "Review code changes", description: "Check PR #42", status: "in-progress", priority: "medium", createdAt: "2024-01-14" },
    { id: "3", title: "Update documentation", description: "Add API docs", status: "done", priority: "low", createdAt: "2024-01-13" },
    { id: "4", title: "Fix login bug", description: "Session timeout issue", status: "todo", priority: "high", createdAt: "2024-01-12" },
    { id: "5", title: "Design new dashboard", description: "Create mockups", status: "in-progress", priority: "medium", createdAt: "2024-01-11" },
  ]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", priority: "medium" as "low" | "medium" | "high" });

  // API Data state
  const [apiData, setApiData] = useState<Record<string, any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Gateway fetch function
  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch("https://faibric-api.onrender.com/api/gateway/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, endpoint })
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
          fetchFromGateway("coingecko", "/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,eur")
            .catch(() => null),
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

  // Data placeholder component
  const DataPlaceholder = ({ symbol = "$", onActivate }: { symbol?: string; onActivate?: () => void }) => (
    <span className="inline-flex items-center gap-2 text-gray-400">
      <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded animate-pulse">
        {symbol}---
      </span>
      {onActivate && (
        <button 
          onClick={onActivate}
          className="text-xs text-blue-500 hover:text-blue-700 underline"
        >
          Turn On Real Values
        </button>
      )}
    </span>
  );

  // Event handlers
  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("Logging out...");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTodo({ title: "", description: "", priority: "medium" });
  };

  const handleModalConfirm = () => {
    if (newTodo.title.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo.title,
        description: newTodo.description,
        status: "todo",
        priority: newTodo.priority,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTodos([...todos, todo]);
      handleModalClose();
    }
  };

  const handleStatusChange = (todoId: string, newStatus: "todo" | "in-progress" | "done") => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, status: newStatus } : todo
    ));
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-gray-200 text-gray-800";
      case "in-progress": return "bg-blue-200 text-blue-800";
      case "done": return "bg-green-200 text-green-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // VIEW COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════

  const DashboardView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="To Do">
          <p className="text-3xl font-bold">{todos.filter(t => t.status === "todo").length}</p>
        </Card>
        <Card title="In Progress">
          <p className="text-3xl font-bold">{todos.filter(t => t.status === "in-progress").length}</p>
        </Card>
        <Card title="Done">
          <p className="text-3xl font-bold">{todos.filter(t => t.status === "done").length}</p>
        </Card>
      </div>
      <Card title="Recent Tasks">
        <div className="space-y-3">
          {todos.slice(0, 5).map(todo => (
            <div key={todo.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium">{todo.title}</p>
                <p className="text-sm text-gray-500">{todo.description}</p>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${getStatusColor(todo.status)}`}>
                {todo.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const KanbanView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kanban Board</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["todo", "in-progress", "done"] as const).map(status => (
          <div key={status} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 capitalize">
              {status.replace("-", " ")}
            </h3>
            <div className="space-y-3">
              {todos.filter(t => t.status === status).map(todo => (
                <div key={todo.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{todo.title}</h4>
                    <span className={`text-sm font-medium ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{todo.description}</p>
                  <div className="flex gap-2">
                    {status !== "todo" && (
                      <button
                        onClick={() => handleStatusChange(todo.id, "todo")}
                        className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        To Do
                      </button>
                    )}
                    {status !== "in-progress" && (
                      <button
                        onClick={() => handleStatusChange(todo.id, "in-progress")}
                        className="text-xs px-2 py-1 bg-blue-200 rounded hover:bg-blue-300"
                      >
                        In Progress
                      </button>
                    )}
                    {status !== "done" && (
                      <button
                        onClick={() => handleStatusChange(todo.id, "done")}
                        className="text-xs px-2 py-1 bg-green-200 rounded hover:bg-green-300"
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ListView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className={`flex items-center justify-between p-4 ${
              index !== todos.length - 1 ? "border-b dark:border-gray-700" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={todo.status === "done"}
                onChange={() = /> handleStatusChange(todo.id, todo.status === "done" ? "todo" : "done")}
                className="w-5 h-5 rounded"
              />
              <div>
                <p className={`font-medium ${todo.status === "done" ? "line-through text-gray-400" : "text-gray-900 dark:text-white"}`}>
                  {todo.title}
                </p>
                <p className="text-sm text-gray-500">{todo.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded text-sm ${getStatusColor(todo.status)}`}>
                {todo.status}
              </span>
              <span className={`text-sm font-medium ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TableView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Table View</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos.map(todo => (
              <tr key={todo.id}>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{todo.title}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{todo.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${getStatusColor(todo.status)}`}>
                    {todo.status}
                  </span>
                </td>
                <td className={`px-6 py-4 ${getPriorityColor(todo.priority)}`}>{todo.priority}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{todo.createdAt}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      <div className="space-y-6">
        <Card title="API Connection Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Gateway API</span>
              <span className={`px-3 py-1 rounded-full text-sm ${loading ? "bg-yellow-200 text-yellow-800" : error ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
                {loading ? "Connecting..." : error ? "Error" : "Connected"}
              </span>
            </div>
            {apiData.lastUpdated && (
              <p className="text-sm text-gray-500">
                Last updated: {new Date(apiData.lastUpdated).toLocaleString()}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500">
                Error: {error.message}
              </p>
            )}
          </div>
        </Card>
        <Card title="Data Sources">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span>CoinGecko API</span>
              <span className={`px-2 py-1 rounded text-sm ${apiData.crypto ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                {apiData.crypto ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </Card>
        <Card title="App Information">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Version: 1.0.0</p>
            <p>Total Tasks: {todos.length}</p>
            <p>Completed: {todos.filter(t => t.status === "done").length}</p>
          </div>
        </Card>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white">
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
          onLogout={handleNavigationLogout}
        />
      </aside>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "kanban" && <KanbanView />}
        {currentView === "list" && <ListView />}
        {currentView === "table" && <TableView />}
        {currentView === "settings" && <SettingsView />}
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title="Add New Task"
      >
        <div>
          <FormField
            label="Title"
            value={newTodo.title}
            onChange={(value) => setNewTodo({ ...newTodo, title: value })}
            placeholder="Enter task title"
          />
          <FormField
            label="Description"
            value={newTodo.description}
            onChange={(value) => setNewTodo({ ...newTodo, description: value })}
            placeholder="Enter task description"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              value={newTodo.priority}
              onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as "low" | "medium" | "high" })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;