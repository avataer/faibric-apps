import React, { useState } from "react";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  bloodType: string;
}

interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
}

interface Prescription {
  id: number;
  patientId: number;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "patients", label: "Patients", icon: "👥" },
  { id: "appointments", label: "Appointments", icon: "📅" },
  { id: "prescriptions", label: "Prescriptions", icon: "💊" },
];

const samplePatients: Patient[] = [
  { id: 1, name: "John Smith", age: 45, gender: "Male", phone: "555-0101", email: "john@email.com", bloodType: "A+" },
  { id: 2, name: "Sarah Johnson", age: 32, gender: "Female", phone: "555-0102", email: "sarah@email.com", bloodType: "O-" },
  { id: 3, name: "Michael Brown", age: 58, gender: "Male", phone: "555-0103", email: "michael@email.com", bloodType: "B+" },
  { id: 4, name: "Emily Davis", age: 27, gender: "Female", phone: "555-0104", email: "emily@email.com", bloodType: "AB+" },
];

const sampleAppointments: Appointment[] = [
  { id: 1, patientId: 1, patientName: "John Smith", date: "2024-01-15", time: "09:00", reason: "Annual Checkup", status: "scheduled" },
  { id: 2, patientId: 2, patientName: "Sarah Johnson", date: "2024-01-15", time: "10:30", reason: "Follow-up", status: "scheduled" },
  { id: 3, patientId: 3, patientName: "Michael Brown", date: "2024-01-14", time: "14:00", reason: "Blood Pressure Check", status: "completed" },
  { id: 4, patientId: 4, patientName: "Emily Davis", date: "2024-01-16", time: "11:00", reason: "Consultation", status: "scheduled" },
];

const samplePrescriptions: Prescription[] = [
  { id: 1, patientId: 1, patientName: "John Smith", medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2024-01-10", endDate: "2024-04-10" },
  { id: 2, patientId: 2, patientName: "Sarah Johnson", medication: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2024-01-12", endDate: "2024-07-12" },
  { id: 3, patientId: 3, patientName: "Michael Brown", medication: "Amlodipine", dosage: "5mg", frequency: "Once daily", startDate: "2024-01-08", endDate: "2024-04-08" },
];

function NavigationHeader(props: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🏥</span>
            <div>
              <h1 className="text-xl font-bold">HealthCare Pro</h1>
              <p className="text-blue-200 text-sm">Patient Management System</p>
            </div>
          </div>
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => props.onTabChange(item.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  props.activeTab === item.id
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-500"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function DashboardView(props: { patients: Patient[]; appointments: Appointment[]; prescriptions: Prescription[] }) {
  const todayAppointments = props.appointments.filter((a) => a.status === "scheduled");
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          <div className="text-4xl mb-2">👥</div>
          <div className="text-3xl font-bold">{props.patients.length}</div>
          <div className="text-blue-100">Total Patients</div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <div className="text-4xl mb-2">📅</div>
          <div className="text-3xl font-bold">{todayAppointments.length}</div>
          <div className="text-green-100">Upcoming Appointments</div>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow">
          <div className="text-4xl mb-2">💊</div>
          <div className="text-3xl font-bold">{props.prescriptions.length}</div>
          <div className="text-purple-100">Active Prescriptions</div>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-xl shadow">
          <div className="text-4xl mb-2">✅</div>
          <div className="text-3xl font-bold">{props.appointments.filter((a) => a.status === "completed").length}</div>
          <div className="text-orange-100">Completed Today</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {todayAppointments.slice(0, 3).map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{apt.patientName}</div>
                  <div className="text-sm text-gray-500">{apt.reason}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{apt.time}</div>
                  <div className="text-sm text-gray-500">{apt.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {props.patients.slice(0, 3).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{patient.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.phone}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{patient.age} yrs</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientsView(props: { patients: Patient[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Patient</button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Blood Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {props.patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">{patient.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{patient.age}</td>
                <td className="px-6 py-4 text-gray-600">{patient.gender}</td>
                <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">{patient.bloodType}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-800">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppointmentsView(props: { appointments: Appointment[] }) {
  const getStatusColor = (status: string) => {
    if (status === "scheduled") return "bg-blue-100 text-blue-600";
    if (status === "completed") return "bg-green-100 text-green-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ New Appointment</button>
      </div>
      <div className="grid gap-4">
        {props.appointments.map((apt) => (
          <div key={apt.id} className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <div className="font-semibold text-lg">{apt.patientName}</div>
                <div className="text-gray-500">{apt.reason}</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="font-medium">{apt.date}</div>
                <div className="text-gray-500">{apt.time}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
              </span>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrescriptionsView(props: { prescriptions: Prescription[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Prescriptions</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ New Prescription</button>
      </div>
      <div className="grid gap-4">
        {props.prescriptions.map((rx) => (
          <div key={rx.id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💊</span>
                </div>
                <div>
                  <div className="font-semibold text-lg">{rx.medication}</div>
                  <div className="text-gray-500">Patient: {rx.patientName}</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">Active</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Dosage</div>
                <div className="font-medium">{rx.dosage}</div>
              </div>
              <div>
                <div className="text-gray-500">Frequency</div>
                <div className="font-medium">{rx.frequency}</div>
              </div>
              <div>
                <div className="text-gray-500">Start Date</div>
                <div className="font-medium">{rx.startDate}</div>
              </div>
              <div>
                <div className="text-gray-500">End Date</div>
                <div className="font-medium">{rx.endDate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [patients] = useState(samplePatients);
  const [appointments] = useState(sampleAppointments);
  const [prescriptions] = useState(samplePrescriptions);

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return <DashboardView patients={patients} appointments={appointments} prescriptions={prescriptions} />;
    }
    if (activeTab === "patients") {
      return <PatientsView patients={patients} />;
    }
    if (activeTab === "appointments") {
      return <AppointmentsView appointments={appointments} />;
    }
    if (activeTab === "prescriptions") {
      return <PrescriptionsView prescriptions={prescriptions} />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;