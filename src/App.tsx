import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

interface ProgressDataPoint {
  date: string;
  value: number;
}

interface SocialPost {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  workoutType: string;
  likes: number;
  timestamp: string;
}

const NavigationHeader: React.FC<{
  items: NavItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
}> = ({ items, activeItem, onItemClick }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💪</span>
            <h1 className="text-xl font-bold">FitTrack</h1>
          </div>
          <nav className="flex space-x-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  activeItem === item.id
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const LineChart: React.FC<{
  data: ProgressDataPoint[];
  title: string;
  color: string;
}> = ({ data, title, color }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 150">
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="40"
              y1={130 - percent * 1.2}
              x2="390"
              y2={130 - percent * 1.2}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          <path
            d={`M ${data
              .map((point, i) => {
                const x = 40 + (i * 350) / (data.length - 1);
                const y = 130 - ((point.value - minValue) / range) * 110;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")} L ${40 + 350} 130 L 40 130 Z`}
            fill={`url(#gradient-${color})`}
          />
          <path
            d={data
              .map((point, i) => {
                const x = 40 + (i * 350) / (data.length - 1);
                const y = 130 - ((point.value - minValue) / range) * 110;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {data.map((point, i) => {
            const x = 40 + (i * 350) / (data.length - 1);
            const y = 130 - ((point.value - minValue) / range) * 110;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill={color} />
                <text x={x} y="145" textAnchor="middle" className="text-xs fill-gray-500">
                  {point.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const WorkoutList: React.FC<{
  workouts: Workout[];
  onDelete: (id: string) => void;
}> = ({ workouts, onDelete }) => {
  const getWorkoutIcon = (type: string) => {
    const icons: Record<string, string> = {
      Running: "🏃",
      Cycling: "🚴",
      Swimming: "🏊",
      Weights: "🏋️",
      Yoga: "🧘",
    };
    return icons[type] || "💪";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Recent Workouts</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {workouts.map((workout) => (
          <li key={workout.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{getWorkoutIcon(workout.type)}</span>
                <div>
                  <p className="font-medium text-gray-800">{workout.type}</p>
                  <p className="text-sm text-gray-500">{workout.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{workout.duration} min</p>
                  <p className="text-sm text-gray-500">{workout.calories} cal</p>
                </div>
                <button
                  onClick={() => onDelete(workout.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  ✕
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SocialFeed: React.FC<{ posts: SocialPost[] }> = ({ posts }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Friends Activity</h3>
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
              {post.userAvatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">{post.userName}</p>
                <span className="text-sm text-gray-500">{post.timestamp}</span>
              </div>
              <p className="text-gray-600 mt-1">{post.content}</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {post.workoutType}
                </span>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                  <span>❤️</span>
                  <span className="text-sm">{post.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: "1", type: "Running", duration: 45, calories: 450, date: "Today" },
    { id: "2", type: "Weights", duration: 60, calories: 320, date: "Yesterday" },
    { id: "3", type: "Cycling", duration: 30, calories: 280, date: "2 days ago" },
    { id: "4", type: "Swimming", duration: 40, calories: 400, date: "3 days ago" },
    { id: "5", type: "Yoga", duration: 25, calories: 150, date: "4 days ago" },
  ]);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "workouts", label: "Workouts", icon: "🏋️" },
    { id: "social", label: "Social", icon: "👥" },
  ];

  const progressData: ProgressDataPoint[] = [
    { date: "Mon", value: 45 },
    { date: "Tue", value: 60 },
    { date: "Wed", value: 30 },
    { date: "Thu", value: 55 },
    { date: "Fri", value: 70 },
    { date: "Sat", value: 40 },
    { date: "Sun", value: 85 },
  ];

  const caloriesData: ProgressDataPoint[] = [
    { date: "Mon", value: 450 },
    { date: "Tue", value: 520 },
    { date: "Wed", value: 380 },
    { date: "Thu", value: 490 },
    { date: "Fri", value: 600 },
    { date: "Sat", value: 350 },
    { date: "Sun", value: 720 },
  ];

  const socialPosts: SocialPost[] = [
    {
      id: "1",
      userName: "Sarah Johnson",
      userAvatar: "SJ",
      content: "Just crushed a 10k run! New personal best 🎉",
      workoutType: "Running",
      likes: 24,
      timestamp: "2h ago",
    },
    {
      id: "2",
      userName: "Mike Chen",
      userAvatar: "MC",
      content: "Morning yoga session was exactly what I needed today",
      workoutType: "Yoga",
      likes: 18,
      timestamp: "4h ago",
    },
    {
      id: "3",
      userName: "Emma Wilson",
      userAvatar: "EW",
      content: "Hit a new deadlift PR! 💪 Hard work pays off",
      workoutType: "Weights",
      likes: 42,
      timestamp: "6h ago",
    },
  ];

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader
        items={navItems}
        activeItem={activeTab}
        onItemClick={setActiveTab}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Workouts</p>
                    <p className="text-3xl font-bold text-gray-800">{workouts.length}</p>
                  </div>
                  <span className="text-4xl">🏆</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Calories Burned</p>
                    <p className="text-3xl font-bold text-gray-800">{totalCalories}</p>
                  </div>
                  <span className="text-4xl">🔥</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Minutes</p>
                    <p className="text-3xl font-bold text-gray-800">{totalMinutes}</p>
                  </div>
                  <span className="text-4xl">⏱️</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart data={progressData} title="Weekly Activity (minutes)" color="#3b82f6" />
              <LineChart data={caloriesData} title="Calories Burned" color="#10b981" />
            </div>
          </div>
        )}
        {activeTab === "workouts" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Log New Workout</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {["Running", "Cycling", "Swimming", "Weights", "Yoga"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setWorkouts([
                        {
                          id: Date.now().toString(),
                          type,
                          duration: 30,
                          calories: 250,
                          date: "Just now",
                        },
                        ...workouts,
                      ])
                    }
                    className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                  >
                    <span className="text-2xl block mb-1">
                      {type === "Running" && "🏃"}
                      {type === "Cycling" && "🚴"}
                      {type === "Swimming" && "🏊"}
                      {type === "Weights" && "🏋️"}
                      {type === "Yoga" && "🧘"}
                    </span>
                    <span className="text-sm font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>
            <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} />
          </div>
        )}
        {activeTab === "social" && (
          <div>
            <SocialFeed posts={socialPosts} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;