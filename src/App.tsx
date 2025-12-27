import React, { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "planning";
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  priority: "high" | "medium" | "low";
}

interface Milestone {
  id: string;
  projectId: string;
  name: string;
  dueDate: string;
  completed: boolean;
  progress: number;
}

interface Resource {
  id: string;
  name: string;
  role: string;
  avatar: string;
  allocation: number;
  projects: string[];
}

interface CardProps {
  project: Project;
  milestones: Milestone[];
  onSelect: (id: string) => void;
  isSelected: boolean;
}

interface ListProps {
  items: Resource[];
  title: string;
  onItemClick?: (id: string) => void;
}

interface TimelineItemProps {
  project: Project;
  totalDays: number;
  startOffset: number;
}

const sampleProjects: Project[] = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern UI and improved UX",
    status: "active",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    team: ["Alice", "Bob", "Charlie"],
    priority: "high"
  },
  {
    id: "p2",
    name: "Mobile App Development",
    description: "Native iOS and Android application for customer engagement",
    status: "active",
    progress: 40,
    startDate: "2024-02-01",
    endDate: "2024-06-15",
    team: ["David", "Eve"],
    priority: "high"
  },
  {
    id: "p3",
    name: "API Integration",
    description: "Third-party API integrations for payment and analytics",
    status: "planning",
    progress: 10,
    startDate: "2024-03-01",
    endDate: "2024-05-01",
    team: ["Frank"],
    priority: "medium"
  },
  {
    id: "p4",
    name: "Database Migration",
    description: "Migrate legacy database to cloud infrastructure",
    status: "completed",
    progress: 100,
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    team: ["Grace", "Henry"],
    priority: "low"
  }
];

const sampleMilestones: Milestone[] = [
  { id: "m1", projectId: "p1", name: "Design Approval", dueDate: "2024-02-15", completed: true, progress: 100 },
  { id: "m2", projectId: "p1", name: "Frontend Complete", dueDate: "2024-03-30", completed: false, progress: 70 },
  { id: "m3", projectId: "p1", name: "Launch", dueDate: "2024-04-30", completed: false, progress: 0 },
  { id: "m4", projectId: "p2", name: "MVP Release", dueDate: "2024-04-01", completed: false, progress: 50 },
  { id: "m5", projectId: "p2", name: "Beta Testing", dueDate: "2024-05-15", completed: false, progress: 0 },
  { id: "m6", projectId: "p3", name: "API Documentation", dueDate: "2024-03-15", completed: false, progress: 30 }
];

const sampleResources: Resource[] = [
  { id: "r1", name: "Alice Johnson", role: "Lead Designer", avatar: "AJ", allocation: 80, projects: ["p1"] },
  { id: "r2", name: "Bob Smith", role: "Frontend Developer", avatar: "BS", allocation: 100, projects: ["p1"] },
  { id: "r3", name: "Charlie Brown", role: "Backend Developer", avatar: "CB", allocation: 60, projects: ["p1", "p3"] },
  { id: "r4", name: "David Lee", role: "Mobile Developer", avatar: "DL", allocation: 100, projects: ["p2"] },
  { id: "r5", name: "Eve Wilson", role: "QA Engineer", avatar: "EW", allocation: 50, projects: ["p2", "p4"] },
  { id: "r6", name: "Frank Miller", role: "DevOps Engineer", avatar: "FM", allocation: 40, projects: ["p3"] }
];

function getStatusColor(status: Project["status"]): string {
  const colors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
    planning: "bg-purple-100 text-purple-800"
  };
  return colors[status];
}

function getPriorityColor(priority: Project["priority"]): string {
  const colors = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-gray-400"
  };
  return colors[priority];
}

function ProjectCard({ project, milestones, onSelect, isSelected }: CardProps) {
  const projectMilestones = milestones.filter(m => m.projectId === project.id);
  
  return (
    <div
      onClick={() => onSelect(project.id)}
      className={`bg-white rounded-xl shadow-md p-5 cursor-pointer transition-all duration-200 border-2 ${
        isSelected ? "border-indigo-500 shadow-lg" : "border-transparent hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(project.priority)}`} />
          <h3 className="font-semibold text-gray-800 text-lg">{project.name}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-700">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex -space-x-2">
          {project.team.slice(0, 3).map((member, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-medium text-indigo-600"
            >
              {member[0]}
            </div>
          ))}
          {project.team.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +{project.team.length - 3}
            </div>
          )}
        </div>
        <span className="text-gray-500">{projectMilestones.length} milestones</span>
      </div>
    </div>
  );
}

function ResourceList({ items, title }: ListProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h3 className="font-semibold text-gray-800 text-lg mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map(resource => (
          <div key={resource.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
              {resource.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{resource.name}</p>
              <p className="text-sm text-gray-500">{resource.role}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      resource.allocation > 80 ? "bg-red-500" : resource.allocation > 50 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${resource.allocation}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-10">{resource.allocation}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ project, totalDays, startOffset }: TimelineItemProps) {
  const leftPercent = (startOffset / totalDays) * 100;
  const widthPercent = Math.min(100 - leftPercent, ((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100);
  
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-40 truncate text-sm font-medium text-gray-700">{project.name}</div>
      <div className="flex-1 relative h-8 bg-gray-100 rounded">
        <div
          className={`absolute h-full rounded flex items-center px-2 text-xs text-white font-medium ${
            project.status === "completed" ? "bg-blue-500" : project.status === "active" ? "bg-indigo-500" : "bg-gray-400"
          }`}
          style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
        >
          {project.progress}%
        </div>
      </div>
    </div>
  );
}

function MilestoneTracker({ milestones, projects }: { milestones: Milestone[]; projects: Project[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h3 className="font-semibold text-gray-800 text-lg mb-4">Milestone Tracking</h3>
      <div className="space-y-4">
        {milestones.slice(0, 5).map(milestone => {
          const project = projects.find(p => p.id === milestone.projectId);
          return (
            <div key={milestone.id} className="border-l-4 border-indigo-500 pl-4 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-800">{milestone.name}</span>
                {milestone.completed ? (
                  <span className="text-green-600 text-sm">✓ Complete</span>
                ) : (
                  <span className="text-gray-500 text-sm">{milestone.dueDate}</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-2">{project?.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${milestone.completed ? "bg-green-500" : "bg-indigo-500"}`}
                  style={{ width: `${milestone.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cards" | "timeline">("cards");
  
  const timelineStart = new Date("2024-01-01");
  const timelineEnd = new Date("2024-07-01");
  const totalDays = (timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
              <p className="text-gray-500 text-sm mt-1">Track progress and manage resources effectively</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("cards")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "cards" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Card View
              </button>
              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "timeline" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === "cards" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    milestones={sampleMilestones}
                    onSelect={setSelectedProject}
                    isSelected={selectedProject === project.id}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-semibold text-gray-800 text-lg mb-4">Project Timeline</h3>
                <div className="space-y-2">
                  {sampleProjects.map(project => {
                    const startOffset = (new Date(project.startDate).getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);
                    return (
                      <TimelineItem
                        key={project.id}
                        project={project}
                        totalDays={totalDays}
                        startOffset={startOffset}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>Jan 2024</span>
                  <span>Apr 2024</span>
                  <span>Jul 2024</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <ResourceList items={sampleResources} title="Resource Allocation" />
            <MilestoneTracker milestones={sampleMilestones} projects={sampleProjects} />
          </div>
        </div>
      </main>
    </div>    </div>
    </div>
    </div>
    </div>
  );
}

export default App;