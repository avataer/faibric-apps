import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "busy" | "offline";
}

interface Channel {
  id: string;
  name: string;
  type: "public" | "private" | "direct";
  unreadCount: number;
  members: string[];
}

interface Message {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  channelId: string;
  timestamp: Date;
  reactions: { emoji: string; count: number }[];
}

interface Notification {
  id: string;
  type: "mention" | "reply" | "channel";
  content: string;
  read: boolean;
  timestamp: Date;
}

interface NavigationHeaderProps {
  currentUser: User;
  notifications: Notification[];
  onNotificationClick: () => void;
}

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string;
  onChannelSelect: (channelId: string) => void;
}

interface MessageFeedProps {
  messages: Message[];
  users: User[];
}

interface MessageFormProps {
  onSendMessage: (content: string) => void;
  channelName: string;
}

interface UserPresenceProps {
  users: User[];
}

const sampleUsers: User[] = [
  { id: "1", name: "Alex Johnson", avatar: "AJ", status: "online" },
  { id: "2", name: "Sarah Miller", avatar: "SM", status: "away" },
  { id: "3", name: "Mike Chen", avatar: "MC", status: "busy" },
  { id: "4", name: "Emma Wilson", avatar: "EW", status: "online" },
  { id: "5", name: "David Brown", avatar: "DB", status: "offline" },
];

const sampleChannels: Channel[] = [
  { id: "1", name: "general", type: "public", unreadCount: 3, members: ["1", "2", "3", "4", "5"] },
  { id: "2", name: "engineering", type: "public", unreadCount: 0, members: ["1", "3", "4"] },
  { id: "3", name: "design", type: "public", unreadCount: 7, members: ["2", "4", "5"] },
  { id: "4", name: "leadership", type: "private", unreadCount: 1, members: ["1", "2"] },
  { id: "5", name: "Sarah Miller", type: "direct", unreadCount: 0, members: ["1", "2"] },
];

const sampleMessages: Message[] = [
  { id: "1", content: "Good morning team! Ready for the standup?", authorId: "1", authorName: "Alex Johnson", authorAvatar: "AJ", channelId: "1", timestamp: new Date("2024-01-15T09:00:00"), reactions: [{ emoji: "👋", count: 3 }] },
  { id: "2", content: "Yes! I have some updates on the new feature implementation.", authorId: "3", authorName: "Mike Chen", authorAvatar: "MC", channelId: "1", timestamp: new Date("2024-01-15T09:02:00"), reactions: [] },
  { id: "3", content: "The design mockups are ready for review. I will share the link shortly.", authorId: "2", authorName: "Sarah Miller", authorAvatar: "SM", channelId: "1", timestamp: new Date("2024-01-15T09:05:00"), reactions: [{ emoji: "🎨", count: 2 }, { emoji: "👍", count: 4 }] },
  { id: "4", content: "Great work everyone! Let us sync up after lunch to discuss the timeline.", authorId: "4", authorName: "Emma Wilson", authorAvatar: "EW", channelId: "1", timestamp: new Date("2024-01-15T09:10:00"), reactions: [{ emoji: "✅", count: 5 }] },
  { id: "5", content: "I have completed the API integration. Tests are passing.", authorId: "1", authorName: "Alex Johnson", authorAvatar: "AJ", channelId: "1", timestamp: new Date("2024-01-15T09:15:00"), reactions: [{ emoji: "🚀", count: 3 }] },
];

const sampleNotifications: Notification[] = [
  { id: "1", type: "mention", content: "Sarah mentioned you in #design", read: false, timestamp: new Date() },
  { id: "2", type: "reply", content: "Mike replied to your message", read: false, timestamp: new Date() },
  { id: "3", type: "channel", content: "New activity in #engineering", read: true, timestamp: new Date() },
];

function NavigationHeader({ currentUser, notifications, onNotificationClick }: NavigationHeaderProps) {
  const unreadCount = notifications.filter(n => !n.read).length;
  const statusColors = { online: "bg-green-500", away: "bg-yellow-500", busy: "bg-red-500", offline: "bg-gray-400" };

  return (
    <header className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-slate-700">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">TC</div>
          <span className="text-xl font-semibold">TeamConnect</span>
        </div>
        <div className="ml-8 relative">
          <input type="text" placeholder="Search messages, files, and people..." className="bg-slate-800 text-white placeholder-slate-400 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <svg className="w-5 h-5 absolute right-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onNotificationClick} className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">{unreadCount}</span>}
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="relative">
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center font-medium text-sm">{currentUser.avatar}</div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[currentUser.status]} rounded-full border-2 border-slate-900`}></div>
          </div>
          <span className="font-medium">{currentUser.name}</span>
        </div>
      </div>
    </header>
  );
}

function ChannelList({ channels, activeChannelId, onChannelSelect }: ChannelListProps) {
  const publicChannels = channels.filter(c => c.type === "public");
  const privateChannels = channels.filter(c => c.type === "private");
  const directMessages = channels.filter(c => c.type === "direct");

  const renderChannel = (channel: Channel) => (
    <button key={channel.id} onClick={() => onChannelSelect(channel.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${activeChannelId === channel.id ? "bg-indigo-600 text-white" : "hover:bg-slate-700 text-slate-300"}`}>
      <span className="flex items-center gap-2">
        {channel.type === "direct" ? <span className="w-2 h-2 bg-green-500 rounded-full"></span> : <span className="text-slate-400">#</span>}
        <span className="truncate">{channel.name}</span>
      </span>
      {channel.unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{channel.unreadCount}</span>}
    </button>
  );

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col border-r border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <h2 className="font-semibold text-lg">Channels</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Public Channels</h3>
          <div className="space-y-1">{publicChannels.map(renderChannel)}</div>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Private Channels</h3>
          <div className="space-y-1">{privateChannels.map(renderChannel)}</div>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Direct Messages</h3>
          <div className="space-y-1">{directMessages.map(renderChannel)}</div>
        </div>
      </div>
      <div className="p-3 border-t border-slate-700">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Channel
        </button>
      </div>
    </aside>
  );
}

function MessageFeed({ messages, users }: MessageFeedProps) {
  const formatTime = (date: Date) => date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const getUser = (id: string) => users.find(u => u.id === id);
  const statusColors = { online: "bg-green-500", away: "bg-yellow-500", busy: "bg-red-500", offline: "bg-gray-400" };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map(message => {
        const user = getUser(message.authorId);
        return (
          <div key={message.id} className="flex gap-4 group hover:bg-slate-50 p-3 -mx-3 rounded-lg transition-colors">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">{message.authorAvatar}</div>
              {user && <div className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[user.status]} rounded-full border-2 border-white`}></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-slate-900">{message.authorName}</span>
                <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
              </div>
              <p className="text-slate-700 mt-1">{message.content}</p>
              {message.reactions.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {message.reactions.map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full text-sm hover:bg-slate-200 cursor-pointer transition-colors">
                      <span>{r.emoji}</span>
                      <span className="text-slate-600">{r.count}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="opacity-0 group-hover:opacity-100 flex items-start gap-1 transition-opacity">
              <button className="p-1.5 hover:bg-slate-200 rounded transition-colors" title="React"><svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
              <button className="p-1.5 hover:bg-slate-200 rounded transition-colors" title="Reply"><svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MessageForm({ onSendMessage, channelName }: MessageFormProps) {
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (message.trim()) { onSendMessage(message); setMessage(""); } };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-white">
      <div className="flex items-end gap-3">
        <div className="flex gap-2">
          <button type="button" className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Attach file"><svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></button>
          <button type="button" className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Add emoji"><svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
        </div>
        <div className="flex-1">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message #${channelName}`} className="w-full px-4 py-3 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" />
        </div>
        <button type="submit" disabled={!message.trim()} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Send</button>
      </div>
    </form>
  );
}

function UserPresence({ users }: UserPresenceProps) {
  const statusColors = { online: "bg-green-500", away: "bg-yellow-500", busy: "bg-red-500", offline: "bg-gray-400" };
  const statusLabels = { online: "Online", away: "Away", busy: "Busy", offline: "Offline" };
  const onlineUsers = users.filter(u => u.status === "online");
  const awayUsers = users.filter(u => u.status === "away");
  const otherUsers = users.filter(u => u.status === "busy" || u.status === "offline");

  const renderUser = (user: User) => (
    <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
      <div className="relative">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">{user.avatar}</div>
        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${statusColors[user.status]} rounded-full border-2 border-white`}></div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
        <p className="text-xs text-slate-500">{statusLabels[user.status]}</p>
      </div>
    </div>
  );

  return (
    <aside className="w-56 bg-white border-l border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900">Team Members</h2>
        <p className="text-sm text-slate-500 mt-1">{onlineUsers.length} online</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {onlineUsers.length > 0 && <div><h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Online - {onlineUsers.length}</h3><div className="space-y-1">{onlineUsers.map(renderUser)}</div></div>}
        {awayUsers.length > 0 && <div><h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Away - {awayUsers.length}</h3><div className="space-y-1">{awayUsers.map(renderUser)}</div></div>}
        {otherUsers.length > 0 && <div><h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Offline - {otherUsers.length}</h3><div className="space-y-1">{otherUsers.map(renderUser)}</div></div>}
      </div>
    </aside>
  );
}

function App() {
  const [activeChannelId, setActiveChannelId] = useState("1");
  const [messages, setMessages] = useState(sampleMessages);
  const [notifications] = useState(sampleNotifications);
  const currentUser = sampleUsers[0];
  const activeChannel = sampleChannels.find(c => c.id === activeChannelId) || sampleChannels[0];

  const handleSendMessage = (content: string) => {
    const newMessage: Message = { id: Date.now().toString(), content, authorId: currentUser.id, authorName: currentUser.name, authorAvatar: currentUser.avatar, channelId: activeChannelId, timestamp: new Date(), reactions: [] };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <NavigationHeader currentUser={currentUser} notifications={notifications} onNotificationClick={() => {}} />
      <div className="flex-1 flex overflow-hidden">
        <ChannelList channels={sampleChannels} activeChannelId={activeChannelId} onChannelSelect={setActiveChannelId} />
        <main className="flex-1 flex flex-col bg-white">
          <div className="px-6 py-4 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-slate-400">#</span>{activeChannel.name}
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">{activeChannel.members.length} members</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
              </div>
            </div>
          </div>
          <MessageFeed messages={messages.filter(m => m.channelId === activeChannelId)} users={sampleUsers} />
          <MessageForm onSendMessage={handleSendMessage} channelName={activeChannel.name} />
        </main>
        <UserPresence users={sampleUsers} />
      </div>
    </div>
  );
}

export default App;