import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "offline";
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  channelId: string;
}

interface Channel {
  id: string;
  name: string;
  unreadCount: number;
  isPrivate: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

const sampleUsers: User[] = [
  { id: "1", name: "John Doe", avatar: "JD", status: "online" },
  { id: "2", name: "Jane Smith", avatar: "JS", status: "away" },
  { id: "3", name: "Mike Johnson", avatar: "MJ", status: "online" },
  { id: "4", name: "Sarah Wilson", avatar: "SW", status: "offline" },
  { id: "5", name: "Tom Brown", avatar: "TB", status: "online" },
];

const sampleChannels: Channel[] = [
  { id: "general", name: "General", unreadCount: 3, isPrivate: false },
  { id: "engineering", name: "Engineering", unreadCount: 0, isPrivate: false },
  { id: "design", name: "Design", unreadCount: 5, isPrivate: false },
  { id: "random", name: "Random", unreadCount: 1, isPrivate: false },
  { id: "private-1", name: "Project Alpha", unreadCount: 2, isPrivate: true },
];

const sampleMessages: Message[] = [
  { id: "1", userId: "1", userName: "John Doe", userAvatar: "JD", content: "Hey team! How is everyone doing today?", timestamp: "9:30 AM", channelId: "general" },
  { id: "2", userId: "2", userName: "Jane Smith", userAvatar: "JS", content: "Good morning! Working on the new feature.", timestamp: "9:35 AM", channelId: "general" },
  { id: "3", userId: "3", userName: "Mike Johnson", userAvatar: "MJ", content: "Anyone up for a quick sync?", timestamp: "9:40 AM", channelId: "general" },
  { id: "4", userId: "5", userName: "Tom Brown", userAvatar: "TB", content: "Sure, let me finish this PR first.", timestamp: "9:45 AM", channelId: "general" },
  { id: "5", userId: "1", userName: "John Doe", userAvatar: "JD", content: "Great progress on the sprint everyone!", timestamp: "10:00 AM", channelId: "general" },
];

const sampleNotifications: Notification[] = [
  { id: "1", title: "New message", message: "Jane mentioned you in #design", read: false, timestamp: "5 min ago" },
  { id: "2", title: "Meeting reminder", message: "Team standup in 15 minutes", read: false, timestamp: "10 min ago" },
  { id: "3", title: "Task assigned", message: "You have been assigned to Bug #234", read: true, timestamp: "1 hour ago" },
];

function PresenceIndicator({ status }: { status: "online" | "away" | "offline" }) {
  const colors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-400",
  };
  return <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${colors[status]}`}></span>;
}

function NotificationBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function NavigationHeader({ notifications, onToggleNotifications, showNotifications }: { notifications: Notification[]; onToggleNotifications: () => void; showNotifications: boolean }) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-indigo-700 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">TeamChat</h1>
        <div className="hidden md:flex items-center bg-indigo-600 rounded-lg px-3 py-1.5">
          <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search messages..." className="bg-transparent border-none outline-none ml-2 text-sm placeholder-indigo-300 w-48" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onToggleNotifications} className="relative p-2 hover:bg-indigo-600 rounded-lg transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <NotificationBadge count={unreadCount} />
        </button>
        {showNotifications && (
          <div className="absolute top-16 right-6 w-80 bg-white rounded-lg shadow-xl border z-50">
            <div className="p-3 border-b">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-3 border-b hover:bg-gray-50 ${!notif.read ? "bg-blue-50" : ""}`}>
                  <p className="font-medium text-gray-800 text-sm">{notif.title}</p>
                  <p className="text-gray-600 text-xs">{notif.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{notif.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="relative">
          <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center font-semibold text-sm">ME</div>
          <PresenceIndicator status="online" />
        </div>
      </div>
    </header>
  );
}

function ChannelList({ channels, activeChannel, onSelectChannel }: { channels: Channel[]; activeChannel: string; onSelectChannel: (id: string) => void }) {
  return (
    <div className="mb-6">
      <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2 px-2">Channels</h3>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <button
              onClick={() => onSelectChannel(channel.id)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg mb-1 transition-colors ${activeChannel === channel.id ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <span className="flex items-center gap-2">
                <span>{channel.isPrivate ? "🔒" : "#"}</span>
                <span className="text-sm">{channel.name}</span>
              </span>
              {channel.unreadCount > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{channel.unreadCount}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserList({ users }: { users: User[] }) {
  return (
    <div>
      <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2 px-2">Team Members</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center gap-2 px-2 py-1.5 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs font-semibold">{user.avatar}</div>
              <PresenceIndicator status={user.status} />
            </div>
            <span className="text-sm">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessageFeed({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">{message.userAvatar}</div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-gray-800">{message.userName}</span>
              <span className="text-xs text-gray-500">{message.timestamp}</span>
            </div>
            <p className="text-gray-700 mt-0.5">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessageForm({ onSendMessage }: { onSendMessage: (content: string) => void }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          Send
        </button>
      </div>
    </form>
  );
}

function App() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState(sampleMessages);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredMessages = messages.filter((m) => m.channelId === activeChannel);
  const currentChannel = sampleChannels.find((c) => c.id === activeChannel);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: "me",
      userName: "Me",
      userAvatar: "ME",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      channelId: activeChannel,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <NavigationHeader notifications={sampleNotifications} onToggleNotifications={() => setShowNotifications(!showNotifications)} showNotifications={showNotifications} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-800 p-4 overflow-y-auto">
          <ChannelList channels={sampleChannels} activeChannel={activeChannel} onSelectChannel={setActiveChannel} />
          <UserList users={sampleUsers} />
        </aside>
        <main className="flex-1 flex flex-col bg-white">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentChannel?.isPrivate ? "🔒" : "#"} {currentChannel?.name}
            </h2>
          </div>
          <MessageFeed messages={filteredMessages} />
          <MessageForm onSendMessage={handleSendMessage} />
        </main>
      </div>
    </div>
  );
}

export default App;