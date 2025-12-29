import React, { useState, useEffect } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

interface CommentFormData {
  name: string;
  email: string;
  content: string;
}

// Placeholder component
const DataPlaceholder = ({ symbol = "$", onSettingsClick }: { symbol?: string; onSettingsClick: () => void }) => (
  <span className="inline-flex items-center gap-2 text-gray-400">
    <span className="font-mono">{symbol}---</span>
    <button
      onClick={onSettingsClick}
      className="text-xs text-blue-500 hover:underline"
    >
      Turn On Real Values
    </button>
  </span>
);

// Navigation Header Component
const NavigationHeader = ({
  currentView,
  onNavigate,
  onLogout,
}: {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
}) => {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "articles", label: "Articles", icon: "📝" },
    { id: "categories", label: "Categories", icon: "📂" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <nav className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">📰 Blog App</h1>
      </div>
      <div className="flex-1 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded flex items-center gap-2"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

// Article Card Component
const ArticleCard = ({
  article,
  onClick,
  onAction,
}: {
  article: Article;
  onClick: (data: Record<string, any>) => void;
  onAction: (action: string, data: Record<string, any>) => void;
}) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(article)}
    >
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <span className="text-6xl">📄</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
            {article.category}
          </span>
          <span className="text-gray-500 text-sm">{article.readTime}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              👤
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {article.author}
              </p>
              <p className="text-xs text-gray-500">{article.date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction("bookmark", article);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              🔖
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction("share", article);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Article Feed Component
const ArticleFeed = ({
  articles,
  loading,
  onItemClick,
  onItemAction,
  onSettingsClick,
}: {
  articles: Article[];
  loading: boolean;
  onItemClick: (item: Article, index: number) => void;
  onItemAction: (action: string, item: Article) => void;
  onSettingsClick: () => void;
}) => {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <DataPlaceholder symbol="📰" onSettingsClick={onSettingsClick} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={() => onItemClick(article, index)}
          onAction={(action, data) => onItemAction(action, data as Article)}
        />
      ))}
    </div>
  );
};

// Comment Form Component
const CommentForm = ({
  onSubmit,
  onChange,
  onValidationError,
}: {
  onSubmit: (values: Record<string, any>) => void;
  onChange: (field: string, value: any) => void;
  onValidationError: (errors: Record<string, string>) => void;
}) => {
  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    email: "",
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>({});

  const handleChange = (field: keyof CommentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange(field, value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.content.trim()) newErrors.content = "Comment is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      onValidationError(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ name: "", email: "", content: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Leave a Comment
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Comment
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Write your comment..."
        />
        {errors.content && (
          <p className="text-red-500 text-xs mt-1">{errors.content}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Post Comment
      </button>
    </form>
  );
};

// Comments List Component
const CommentsList = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              👤
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {comment.author}
              </p>
              <p className="text-xs text-gray-500">{comment.date}</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">📰 Blog App</h4>
          <p className="text-gray-400 text-sm">
            Your source for the latest articles and insights.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <span className="text-2xl cursor-pointer hover:opacity-80">📘</span>
            <span className="text-2xl cursor-pointer hover:opacity-80">🐦</span>
            <span className="text-2xl cursor-pointer hover:opacity-80">📸</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
        © 2024 Blog App. All rights reserved.
      </div>
    </footer>
  );
};

// Settings View Component
const SettingsView = ({
  apiKey,
  onApiKeyChange,
  isConnected,
}: {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  isConnected: boolean;
}) => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ⚙️ Settings
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          API Connection
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-gray-700 dark:text-gray-300">
            Status: {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your API key"
          />
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

// Article Detail View
const ArticleDetailView = ({
  article,
  comments,
  onBack,
  onCommentSubmit,
}: {
  article: Article | null;
  comments: Comment[];
  onBack: () => void;
  onCommentSubmit: (values: Record<string, any>) => void;
}) => {
  if (!article) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        ← Back to Articles
      </button>
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-8xl">📄</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
              {article.category}
            </span>
            <span className="text-gray-500">{article.readTime}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              👤
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {article.author}
              </p>
              <p className="text-sm text-gray-500">{article.date}</p>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {article.excerpt}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </div>
      </article>
      <div className="mt-8 space-y-6">
        <CommentsList comments={comments} />
        <CommentForm
          onSubmit={onCommentSubmit}
          onChange={(field, value) => console.log("onChange", field, value)}
          onValidationError={(errors) => console.log("Validation errors", errors)}
        />
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setArticles([
        {
          id: "1",
          title: "Getting Started with React",
          excerpt: "Learn the fundamentals of React and build your first component.",
          author: "John Doe",
          date: "Dec 15, 2024",
          category: "Tutorial",
          imageUrl: "",
          readTime: "5 min read",
        },
        {
          id: "2",
          title: "TypeScript Best Practices",
          excerpt: "Discover the best practices for writing clean TypeScript code.",
          author: "Jane Smith",
          date: "Dec 14, 2024",
          category: "Development",
          imageUrl: "",
          readTime: "8 min read",
        },
        {
          id: "3",
          title: "Tailwind CSS Tips and Tricks",
          excerpt: "Master Tailwind CSS with these helpful tips and tricks.",
          author: "Mike Johnson",
          date: "Dec 13, 2024",
          category: "CSS",
          imageUrl: "",
          readTime: "6 min read",
        },
      ]);
      setComments([
        {
          id: "1",
          author: "Alice",
          content: "Great article! Very helpful.",
          date: "Dec 15, 2024",
          avatar: "",
        },
        {
          id: "2",
          author: "Bob",
          content: "Thanks for sharing this information.",
          date: "Dec 14, 2024",
          avatar: "",
        },
      ]);
      setLoading(false);
      setIsConnected(true);
    };
    fetchData();
  }, []);

  const handleNavigationNavigate = (viewId: string) => {
    setCurrentView(viewId);
    setSelectedArticle(null);
  };

  const handleNavigationLogout = () => {
    console.log("onLogout");
  };

  const handleCardClick = (data: Record<string, any>) => {
    setSelectedArticle(data as Article);
    setCurrentView("article-detail");
  };

  const handleCardAction = (action: string, data: Record<string, any>) => {
    console.log("onAction", action, data);
  };

  const handleListItemClick = (item: Article, index: number) => {
    console.log("onItemClick", item, index);
    setSelectedArticle(item);
    setCurrentView("article-detail");
  };

  const handleListItemAction = (action: string, item: Article) => {
    console.log("onItemAction", action, item);
  };

  const handleFormSubmit = (values: Record<string, any>) => {
    console.log("Form submitted", values);
    const newComment: Comment = {
      id: Date.now().toString(),
      author: values.name,
      content: values.content,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      avatar: "",
    };
    setComments((prev) => [...prev, newComment]);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case "home":
      case "articles":
        return (
          <div>
            <div className="p-6 border-b bg-white dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentView === "home" ? "Latest Articles" : "All Articles"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover the latest insights and tutorials
              </p>
            </div>
            <ArticleFeed
              articles={articles}
              loading={loading}
              onItemClick={handleListItemClick}
              onItemAction={handleListItemAction}
              onSettingsClick={() => setCurrentView("settings")}
            />
          </div>
        );
      case "article-detail":
        return (
          <ArticleDetailView
            article={selectedArticle}
            comments={comments}
            onBack={() => setCurrentView("articles")}
            onCommentSubmit={handleFormSubmit}
          />
        );
      case "categories":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Tutorial", "Development", "CSS", "JavaScript", "React", "TypeScript"].map(
                (cat) => (
                  <div
                    key={cat}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {cat}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {Math.floor(Math.random() * 20) + 5} articles
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        );
      case "settings":
        return (
          <SettingsView
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            isConnected={isConnected}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white fixed h-full">
        <NavigationHeader
          currentView={currentView}
          onNavigate={handleNavigationNavigate}
          onLogout={handleNavigationLogout}
        />
      </aside>
      <div className="flex-1 ml-64 flex flex-col">
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {renderMainContent()}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;