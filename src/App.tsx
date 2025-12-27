import React, { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "review" | "completed";
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
}

interface Resource {
  id: string;
  name: string;
  role: string;
  avatar: string;
  allocation: number;
  projects: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface CardProps {
  project: Project;
  onClick: () => void;
}

interface FormProps {
  onSubmit: (project: Omit<Project, "id" | "milestones">) => void;
  onCancel: () => void;
}

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    status: "in-progress",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    team: ["Alice", "Bob", "Charlie"],
    milestones: [
      { id: "m1", name: "Design Mockups", dueDate: "2024-02-01", completed: true },
      { id: "m2", name: "Frontend Development", dueDate: "2024-03-15", completed: true },
      { id: "m3", name: "Backend Integration", dueDate: "2024-04-01", completed: false },
      { id: "m4", name: "Testing & Launch", dueDate: "2024-04-30", completed: false },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android",
    status: "planning",
    progress: 15,
    startDate: "2024-02-01",
    endDate: "2024-07-31",
    team: ["Diana", "Eve"],
    milestones: [
      { id: "m5", name: "Requirements Gathering", dueDate: "2024-02-15", completed: true },
      { id: "m6", name: "UI/UX Design", dueDate: "2024-03-30", completed: false },
      { id: "m7", name: "Development Phase", dueDate: "2024-06-30", completed: false },
    ],
  },
  {
    id: "3",
    name: "API Integration",
    description: "Third-party API integrations for payment and analytics",
    status: "review",
    progress: 90,
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    team: ["Frank", "Grace"],
    milestones: [
      { id: "m8", name: "Payment Gateway", dueDate: "2024-01-31", completed: true },
      { id: "m9", name: "Analytics Setup", dueDate: "2024-02-15", completed: true },
      { id: "m10", name: "Final Testing", dueDate: "2024-02-28", completed: false },
    ],
  },
];

const sampleResources: Resource[] = [
  { id: "r1", name: "Alice Johnson", role: "Lead Designer", avatar: "AJ", allocation: 80, projects: ["Website Redesign"] },
  { id: "r2", name: "Bob Smith", role: "Frontend Developer", avatar: "BS", allocation: 100, projects: ["Website Redesign"] },
  { id: "r3", name: "Charlie Brown", role: "Backend Developer", avatar: "CB", allocation: 60, projects: ["Website Redesign", "API Integration"] },
  { id: "r4", name: "Diana Prince", role: "Product Manager", avatar: "DP", allocation: 50, projects: ["Mobile App Development"] },
  { id: "r5", name: "Eve Wilson", role: "Mobile Developer", avatar: "EW", allocation: 100, projects: ["Mobile App Development"] },
  { id: "r6", name: "Frank Castle", role: "Backend Developer", avatar: "FC", allocation: 75, projects: ["API Integration"] },
];

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: CardProps) {
  const statusColors = {
    planning: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    review: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {project.status.replace("-", " ")}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }}></div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{project.startDate} - {project.endDate}</span>
        <div className="flex -space-x-2">
          {project.team.slice(0, 3).map((member, idx) => (
            <div key={idx} className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium">
              {member.charAt(0)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectForm({ onSubmit, onCancel }: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning" as const,
    progress: 0,
    startDate: "",
    endDate: "",
    team: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Create Project</button>
      </div>
    </form>
  );
}

function App() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [activeTab, setActiveTab] = useState<"projects" | "timeline" | "resources">("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProject = (projectData: Omit<Project, "id" | "milestones">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      milestones: [],
    };
    setProjects([...projects, newProject]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PM</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Project Manager</h1>
            </div>
            <nav className="flex gap-1">
              <button onClick={() => setActiveTab("projects")} className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === "projects" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}>Projects</button>
              <button onClick={() => setActiveTab("timeline")} className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === "timeline" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}>Timeline</button>
              <button onClick={() => setActiveTab("resources")} className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === "resources" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}>Resources</button>
            </nav>
            <button onClick={() => setIsCreateModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">+ New Project</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Project Timeline</h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <span className="text-sm text-gray-500">{project.startDate} → {project.endDate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.id} className={`px-3 py-1 rounded-full text-xs font-medium ${milestone.completed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                        {milestone.completed ? "✓ " : "○ "}{milestone.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Resource Allocation</h2>
            <div className="space-y-4">
              {sampleResources.map((resource) => (
                <div key={resource.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">{resource.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{resource.name}</h3>
                        <p className="text-sm text-gray-500">{resource.role}</p>
                      </div>
                      <span className={`font-semibold ${resource.allocation > 80 ? "text-red-600" : "text-green-600"}`}>{resource.allocation}% allocated</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`h-2 rounded-full ${resource.allocation > 80 ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${resource.allocation}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Projects: {resource.projects.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Project">
        <ProjectForm onSubmit={handleCreateProject} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.name || ""}>
        {selectedProject && (
          <div className="space-y-6">
            <p className="text-gray-600">{selectedProject.description}</p>
            <div>
              <h4 className="font-semibold mb-2">Progress</h4>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full flex items-center justify-center text-xs text-white font-medium" style={{ width: `${selectedProject.progress}%` }}>
                  {selectedProject.progress}%
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Milestones</h4>
              <div className="space-y-2">
                {selectedProject.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${milestone.completed ? "bg-green-500 text-white" : "bg-gray-300"}`}>
                        {milestone.completed ? "✓" : ""}
                      </span>
                      <span className={milestone.completed ? "line-through text-gray-500" : ""}>{milestone.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{milestone.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Team Members</h4>
              <div className="flex gap-2">
                {selectedProject.team.map((member, idx) => (
                  <div key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{member}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;