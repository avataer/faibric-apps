import React, { useState, useEffect } from "react";

// Interfaces
interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

interface CardProps {
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  onClick?: (data: Record<string, any>) => void;
  onAction?: (action: string, data: Record<string, any>) => void;
}

interface NavigationProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

// Placeholder component for loading states
const DataPlaceholder = () => (
  <span className="animate-pulse text-gray-400">---</span>
);

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  onLogout,
}) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "greeting", label: "Greeting Card" },
    { id: "templates", label: "Templates" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Card Creator</h1>
        <p className="text-sm text-gray-400">Greeting Cards</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Card Component
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  onClick,
  onAction,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick({ title, subtitle });
    }
  };

  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action, { title, subtitle });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
        {content && <div className="mt-4">{content}</div>}
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAction("edit");
          }}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAction("share");
          }}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  );
};

// Greeting Card Creator Component
const GreetingCardCreator: React.FC = () => {
  const [recipientName, setRecipientName] = useState("Friend");
  const [message, setMessage] = useState("Wishing you a wonderful day!");
  const [senderName, setSenderName] = useState("Your Name");
  const [cardStyle, setCardStyle] = useState("classic");

  const styles: Record<string, string> = {
    classic: "bg-gradient-to-br from-blue-100 to-purple-100",
    warm: "bg-gradient-to-br from-orange-100 to-pink-100",
    nature: "bg-gradient-to-br from-green-100 to-teal-100",
    elegant: "bg-gradient-to-br from-gray-100 to-slate-200",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Your Card
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter recipient name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Write your heartfelt message"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Card Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(styles).map((style) => (
                <button
                  key={style}
                  onClick={() => setCardStyle(style)}
                  className={`px-4 py-2 rounded-lg border-2 capitalize transition-colors ${
                    cardStyle === style
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Preview
        </h2>
        <div
          className={`${styles[cardStyle]} rounded-2xl shadow-xl p-8 min-h-96 flex flex-col justify-between`}
        >
          <div className="text-center">
            <p className="text-lg text-gray-600">Dear</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {recipientName || <DataPlaceholder />}
            </h3>
          </div>
          <div className="text-center py-8">
            <p className="text-xl text-gray-700 italic leading-relaxed">
              {message || <DataPlaceholder />}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">With love,</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">
              {senderName || <DataPlaceholder />}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Save Card
          </button>
          <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Share Card
          </button>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard: React.FC<{ onCardClick: (data: Record<string, any>) => void }> = ({ onCardClick }) => {
  const recentCards = [
    { id: 1, title: "Birthday Wishes", subtitle: "For Mom - Created yesterday" },
    { id: 2, title: "Thank You Note", subtitle: "For Team - Created last week" },
    { id: 3, title: "Holiday Greetings", subtitle: "For Family - Created Dec 2023" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome Back!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create beautiful greeting cards for your loved ones.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-300">12</h3>
          <p className="text-gray-600 dark:text-gray-400">Cards Created</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-green-600 dark:text-green-300">8</h3>
          <p className="text-gray-600 dark:text-gray-400">Cards Shared</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-300">5</h3>
          <p className="text-gray-600 dark:text-gray-400">Templates Saved</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Cards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Templates Component
const Templates: React.FC = () => {
  const templates = [
    { id: 1, name: "Birthday Classic", category: "Birthday" },
    { id: 2, name: "Thank You Elegant", category: "Thank You" },
    { id: 3, name: "Holiday Cheer", category: "Holiday" },
    { id: 4, name: "Congratulations", category: "Celebration" },
    { id: 5, name: "Get Well Soon", category: "Support" },
    { id: 6, name: "Anniversary Love", category: "Anniversary" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Card Templates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="h-40 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl text-gray-400">[Preview]</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {template.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Component
const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "checking">("disconnected");
  const [darkMode, setDarkMode] = useState(false);

  const checkConnection = () => {
    setConnectionStatus("checking");
    setTimeout(() => {
      setConnectionStatus(apiKey.length > 0 ? "connected" : "disconnected");
    }, 1000);
  };

  useEffect(() => {
    if (apiKey) {
      checkConnection();
    }
  }, [apiKey]);

  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            API Connection
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                connectionStatus === "connected"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : connectionStatus === "checking"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {connectionStatus === "checking" ? "Checking..." : connectionStatus}
            </span>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your API key"
            />
          </div>
          <button
            onClick={checkConnection}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Connection
          </button>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preferences
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                darkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  darkMode ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Data Source
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Cards are stored locally in your browser.</p>
            <p>Connect an API to sync across devices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [theme, setTheme] = useState<Theme>({ mode: "light", primaryColor: "blue" });

  useEffect(() => {
    console.log("App mounted, current view:", currentView);
  }, []);

  const handleLayoutThemechange = (newTheme: Theme) => {
    setTheme(newTheme);
    console.log("onThemeChange", newTheme);
  };

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
  };

  const handleCardClick = (data: Record<string, any>) => {
    console.log("card clicked", data);
  };

  const handleCardAction = (action: string, data: Record<string, any>) => {
    console.log("onAction", action, data);
  };

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
        <header className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
            {currentView === "greeting" ? "Greeting Card" : currentView}
          </h1>
        </header>
        <div className="p-8">
          {currentView === "dashboard" && (
            <Dashboard onCardClick={handleCardClick} />
          )}
          {currentView === "greeting" && <GreetingCardCreator />}
          {currentView === "templates" && <Templates />}
          {currentView === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default App;