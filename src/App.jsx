import React from 'react';

const Navigation = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{"id": "classes", "label": "Class Schedule"}, {"id": "instructors", "label": "Instructors"}, {"id": "pricing", "label": "Pricing"}, {"id": "about", "label": "About Us"}, {"id": "contact", "label": "Contact"}];

  return (
    <nav className="bg-amber-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-white">Zen Flow Studio</span>

          <div className="hidden md:flex items-center gap-8">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "text-amber-700"
                    : "text-amber-700 hover:text-amber-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {(navItems || []).map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`block w-full text-left py-2 px-4 ${
                  currentView === item.id ? "text-amber-700 bg-amber-100" : "text-amber-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/coffee-latte')",
          animation: "slowZoom 20s ease-in-out infinite alternate"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/60 to-transparent"></div>
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <div className="inline-block px-4 py-2 bg-amber-50/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20">
           Welcome
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your Flow. Discover Your Calm.
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
          Zen Flow Studio offers yoga, pilates, and meditation classes in a serene, nature-inspired space designed to restore balance to your body and peace to your mind.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate && onNavigate("contact")}
            className="px-8 py-4 bg-amber-50 text-amber-700 rounded-full font-semibold text-lg hover:bg-amber-100 transition-all shadow-xl"
          >
            Explore Our Classes
          </button>
          <button
            onClick={() => onNavigate && onNavigate("about")}
            className="px-8 py-4 bg-amber-50/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-amber-50/20 transition-all border border-white/30"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

const ClassScheduleSection = () => {
  const classes = [
    { day: "Monday", sessions: [
      { time: "6:00 AM", name: "Sunrise Vinyasa", instructor: "Maya Chen", level: "All Levels", duration: "60 min" },
      { time: "9:00 AM", name: "Gentle Hatha", instructor: "David Park", level: "Beginner", duration: "75 min" },
      { time: "12:00 PM", name: "Power Pilates", instructor: "Sarah Mitchell", level: "Intermediate", duration: "45 min" },
      { time: "5:30 PM", name: "Evening Flow", instructor: "Maya Chen", level: "All Levels", duration: "60 min" },
      { time: "7:00 PM", name: "Guided Meditation", instructor: "Lena Okafor", level: "All Levels", duration: "30 min" },
    ]},
    { day: "Tuesday", sessions: [
      { time: "7:00 AM", name: "Mat Pilates", instructor: "Sarah Mitchell", level: "All Levels", duration: "50 min" },
      { time: "10:00 AM", name: "Restorative Yoga", instructor: "David Park", level: "Beginner", duration: "75 min" },
      { time: "4:00 PM", name: "Yin Yoga", instructor: "Lena Okafor", level: "All Levels", duration: "60 min" },
      { time: "6:00 PM", name: "Ashtanga Yoga", instructor: "Maya Chen", level: "Advanced", duration: "90 min" },
    ]},
    { day: "Wednesday", sessions: [
      { time: "6:00 AM", name: "Sunrise Vinyasa", instructor: "Maya Chen", level: "All Levels", duration: "60 min" },
      { time: "9:00 AM", name: "Reformer Pilates", instructor: "Sarah Mitchell", level: "Intermediate", duration: "50 min" },
      { time: "12:00 PM", name: "Mindful Meditation", instructor: "Lena Okafor", level: "All Levels", duration: "30 min" },
      { time: "5:30 PM", name: "Hatha Flow", instructor: "David Park", level: "Beginner", duration: "60 min" },
    ]},
    { day: "Thursday", sessions: [
      { time: "7:00 AM", name: "Power Vinyasa", instructor: "Maya Chen", level: "Advanced", duration: "75 min" },
      { time: "10:00 AM", name: "Gentle Pilates", instructor: "Sarah Mitchell", level: "Beginner", duration: "45 min" },
      { time: "5:00 PM", name: "Yoga Nidra", instructor: "Lena Okafor", level: "All Levels", duration: "45 min" },
      { time: "6:30 PM", name: "Evening Vinyasa", instructor: "David Park", level: "Intermediate", duration: "60 min" },
    ]},
    { day: "Friday", sessions: [
      { time: "6:00 AM", name: "Sunrise Flow", instructor: "Maya Chen", level: "All Levels", duration: "60 min" },
      { time: "9:00 AM", name: "Mat Pilates", instructor: "Sarah Mitchell", level: "All Levels", duration: "50 min" },
      { time: "12:00 PM", name: "Breathwork & Meditation", instructor: "Lena Okafor", level: "All Levels", duration: "30 min" },
      { time: "4:30 PM", name: "Restorative Yoga", instructor: "David Park", level: "Beginner", duration: "75 min" },
    ]},
    { day: "Saturday", sessions: [
      { time: "8:00 AM", name: "Weekend Vinyasa", instructor: "Maya Chen", level: "All Levels", duration: "75 min" },
      { time: "10:00 AM", name: "Pilates Fusion", instructor: "Sarah Mitchell", level: "Intermediate", duration: "60 min" },
      { time: "12:00 PM", name: "Community Meditation", instructor: "Lena Okafor", level: "All Levels", duration: "45 min" },
    ]},
    { day: "Sunday", sessions: [
      { time: "9:00 AM", name: "Slow Flow Yoga", instructor: "David Park", level: "Beginner", duration: "60 min" },
      { time: "11:00 AM", name: "Deep Stretch & Restore", instructor: "Lena Okafor", level: "All Levels", duration: "75 min" },
    ]},
  ];

  const [selectedDay, setSelectedDay] = React.useState("Monday");

  const levelColor = (level) => {
    switch(level) {
      case "Beginner": return "bg-amber-200 text-amber-700";
      case "Intermediate": return "bg-amber-100 text-amber-700";
      case "Advanced": return "bg-amber-100 text-amber-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <section className="py-20 px-4 bg-amber-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-700 mb-4">Class Schedule</h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">Find the perfect class for your practice. We offer sessions every day of the week.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {classes.map(dayObj => (
            <button
              key={dayObj.day}
              onClick={() => setSelectedDay(dayObj.day)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedDay === dayObj.day
                  ? "bg-amber-200 text-white shadow-lg"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-200 border border-amber-400"
              }`}
            >
              {dayObj.day}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {classes.find(d => d.day === selectedDay)?.sessions.map((session, idx) => (
            <div key={idx} className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-400">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <span className="text-lg font-bold text-amber-700">{session.time}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-700">{session.name}</h3>
                    <p className="text-amber-700">with {session.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColor(session.level)}`}>
                    {session.level}
                  </span>
                  <span className="text-amber-700 text-sm">{session.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InstructorsSection = () => {
  const instructors = [
    {
      name: "Maya Chen",
      specialty: "Vinyasa & Ashtanga Yoga",
      bio: "With over 15 years of practice and a 500-hour RYT certification, Maya brings dynamic energy and deep mindfulness to every class. She trained in Rishikesh, India and specializes in helping students find strength through flow.",
      image: "https://picsum.photos/seed/coffee-latte"
    },
    {
      name: "David Park",
      specialty: "Hatha & Restorative Yoga",
      bio: "David discovered yoga during his recovery from a sports injury and never looked back. His gentle, alignment-focused approach makes him a favorite among beginners and those seeking healing through movement.",
      image: "https://picsum.photos/seed/coffee-latte"
    },
    {
      name: "Sarah Mitchell",
      specialty: "Pilates (Mat & Reformer)",
      bio: "A certified Pilates instructor with a background in physical therapy, Sarah designs classes that build core strength, improve posture, and enhance body awareness. Her sessions are precise, challenging, and deeply rewarding.",
      image: "https://picsum.photos/seed/coffee-latte"
    },
    {
      name: "Lena Okafor",
      specialty: "Meditation & Breathwork",
      bio: "Lena is a certified meditation teacher and mindfulness coach who has studied with masters across Southeast Asia. Her guided sessions create a safe space for deep inner exploration and lasting peace.",
      image: "https://picsum.photos/seed/coffee-latte"
    }
  ];

  return (
    <section className="py-20 px-4 bg-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-700 mb-4">Our Instructors</h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">Meet the passionate, certified professionals who guide your practice with expertise and heart.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {instructors.map((instructor, idx) => (
            <div key={idx} className="bg-amber-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-amber-400">
              <div