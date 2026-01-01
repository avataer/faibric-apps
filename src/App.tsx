import React, { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface NavItem {
  id: string;
  label: string;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface NavigationProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

interface TodoFormProps {
  onSubmit: (text: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "todos", label: "Todo List" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Todo App</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        Simple Todo Manager
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TODO FORM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add
      </button>
    </form>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TODO LIST COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No todos yet!</p>
        <p className="text-sm mt-2">Add your first todo above</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span
            className={`flex-1 ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-gray-200"
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════════════════

const DashboardView: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Todos
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {todos.length}
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Completed
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {completedCount}
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Pending
          </h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {pendingCount}
          </p>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TODOS VIEW
// ═══════════════════════════════════════════════════════════════════════════

const TodosView: React.FC<{
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ todos, onAdd, onToggle, onDelete }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Todo List
      </h2>
      <TodoForm onSubmit={onAdd} />
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS VIEW
// ═══════════════════════════════════════════════════════════════════════════

const SettingsView: React.FC<{
  loading: boolean;
  error: Error | null;
  lastUpdated: string | null;
}> = ({ loading, error, lastUpdated }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Settings
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          API Connection Status
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Status</span>
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
          {lastUpdated && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Last Updated
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">
                {error.message}
              </p>
            </div>
          )}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Data Storage
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Todos are stored locally in your browser. Clear browser data to
            reset.
          </p>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const App: React.FC = () => {
  // State declarations
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [todos, setTodos] = useState<Todo[]>([]);

  // API state
  const [apiData, setApiData] = useState<Record<string, any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Gateway fetch function
  const fetchFromGateway = async (service: string, endpoint: string) => {
    const response = await fetch(
      "https://faibric-api.onrender.com/api/gateway/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, endpoint }),
      }
    );
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

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch {
        console.error("Failed to parse saved todos");
      }
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Event handlers
  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
        />
      </aside>
      <main className="flex-1 overflow-auto">
        {currentView === "dashboard" && <DashboardView todos={todos} />}
        {currentView === "todos" && (
          <TodosView
            todos={todos}
            onAdd={handleAddTodo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        {currentView === "settings" && (
          <SettingsView
            loading={loading}
            error={error}
            lastUpdated={apiData.lastUpdated || null}
          />
        )}
      </main>
    </div>
  );
};

export default App;