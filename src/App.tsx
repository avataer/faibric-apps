import React, { useState } from "react";

// Interfaces
interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

interface Application {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  appliedDate: string;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
}

// Navigation Header Component
function NavigationHeader(props: { navItems: NavItem[]; onNavClick: (label: string) => void }) {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">JobBoard Pro</h1>
          <nav className="flex space-x-6">
            {props.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => props.onNavClick(item.label)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  item.active ? "bg-blue-700 font-semibold" : "hover:bg-blue-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

// Job Card Component
function JobCard(props: { job: Job; onApply: (job: Job) => void }) {
  const { job, onApply } = props;
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{job.type}</span>
      </div>
      <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
        <span>📅 {job.postedDate}</span>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
      <button
        onClick={() => onApply(job)}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Apply Now
      </button>
    </div>
  );
}

// Job List Component
function JobList(props: { jobs: Job[]; onApply: (job: Job) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.jobs.map((job) => (
        <JobCard key={job.id} job={job} onApply={props.onApply} />
      ))}
    </div>
  );
}

// Applications Table Component
function ApplicationsTable(props: { applications: Application[]; jobs: Job[] }) {
  const getJobTitle = (jobId: number) => {
    const job = props.jobs.find((j) => j.id === jobId);
    return job ? job.title : "Unknown";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {props.applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{app.name}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{getJobTitle(app.jobId)}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{app.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    app.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "Reviewed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{app.appliedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Application Form Component
function ApplicationForm(props: { job: Job; onSubmit: (data: Record<string, string>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Record<string, string>({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const formFields: FormField[] = [
    { name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
    { name: "email", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
    { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+1 (555) 000-0000" },
    { name: "resume", label: "Resume URL", type: "url", required: false, placeholder: "https://..." },
    { name: "coverLetter", label: "Cover Letter", type: "textarea", required: false, placeholder: "Tell us why you are a great fit..." },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Apply for {props.job.title}</h2>
            <button onClick={props.onCancel} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={props.onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState("Jobs");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, jobId: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-0101", status: "Reviewed", appliedDate: "2024-01-10" },
    { id: 2, jobId: 2, name: "Bob Smith", email: "bob@example.com", phone: "555-0102", status: "Pending", appliedDate: "2024-01-12" },
    { id: 3, jobId: 3, name: "Carol White", email: "carol@example.com", phone: "555-0103", status: "Interviewed", appliedDate: "2024-01-08" },
  ]);

  const navItems: NavItem[] = [
    { label: "Jobs", href: "#", active: activeTab === "Jobs" },
    { label: "Applications", href: "#", active: activeTab === "Applications" },
    { label: "About", href: "#", active: activeTab === "About" },
  ];

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "We are looking for an experienced React developer to join our team and help build scalable web applications.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
      postedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Design Studios",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Join our creative team to design beautiful and intuitive user interfaces for our products.",
      requirements: ["3+ years UI/UX", "Figma expertise", "Portfolio required"],
      postedDate: "2024-01-14",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Analytics Pro",
      location: "New York, NY",
      type: "Contract",
      salary: "$80k - $100k",
      description: "Analyze large datasets and provide actionable insights to drive business decisions.",
      requirements: ["SQL proficiency", "Python/R", "Visualization tools"],
      postedDate: "2024-01-13",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudFirst",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $140k",
      description: "Build and maintain CI/CD pipelines and cloud infrastructure for our growing platform.",
      requirements: ["AWS/GCP experience", "Kubernetes", "Terraform"],
      postedDate: "2024-01-12",
    },
    {
      id: 5,
      title: "Marketing Manager",
      company: "GrowthCo",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$60k - $80k",
      description: "Lead marketing initiatives and campaigns to increase brand awareness and customer acquisition.",
      requirements: ["Digital marketing", "Analytics", "Team management"],
      postedDate: "2024-01-11",
    },
    {
      id: 6,
      title: "Backend Engineer",
      company: "API Masters",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Design and implement scalable backend services and APIs for our platform.",
      requirements: ["Node.js/Python", "PostgreSQL", "Microservices"],
      postedDate: "2024-01-10",
    },
  ];

  const handleApply = (job: Job) => {
    setSelectedJob(job);
  };

  const handleFormSubmit = (data: Record<string, string>) => {
    if (selectedJob) {
      const newApplication: Application = {
        id: applications.length + 1,
        jobId: selectedJob.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: "Pending",
        appliedDate: new Date().toISOString().split("T")[0],
      };
      setApplications([...applications, newApplication]);
      setSelectedJob(null);
      alert("Application submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader navItems={navItems} onNavClick={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "Jobs" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Positions</h2>
              <p className="text-gray-600">Find your dream job from our curated listings</p>
            </div>
            <JobList jobs={jobs} onApply={handleApply} />
          </div>
        )}
        {activeTab === "Applications" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Applications</h2>
              <p className="text-gray-600">Track all job applications</p>
            </div>
            <ApplicationsTable applications={applications} jobs={jobs} />
          </div>
        )}
        {activeTab === "About" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About JobBoard Pro</h2>
            <p className="text-gray-700 mb-4">
              JobBoard Pro is a modern job listing platform connecting talented professionals with amazing companies.
            </p>
            <p className="text-gray-700">
              We believe in creating meaningful connections that lead to fulfilling careers and successful businesses.
            </p>
          </div>
        )}
      </main>
      {selectedJob && (
        <ApplicationForm job={selectedJob} onSubmit={handleFormSubmit} onCancel={() => setSelectedJob(null)} />
      )}
    </div>
  );
}

export default App;