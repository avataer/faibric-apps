import React, { useState } from "react";

// Interfaces
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  condition: string;
  lastVisit: string;
}

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

// Sidebar Component
function Sidebar({ onNavigate, currentView }: { onNavigate: (view: string) => void; currentView: string }) {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "patients", label: "Patients", icon: "👥" },
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "prescriptions", label: "Prescriptions", icon: "💊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🏥</span> HealthCare Pro
        </h1>
      </div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
              currentView === item.id ? "bg-blue-700" : "hover:bg-blue-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// Patient Card Component
function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
          👤
        </div>
        <div>
          <h3 className="font-semibold text-lg">{patient.name}</h3>
          <p className="text-gray-500 text-sm">{patient.gender}, {patient.age} years</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="text-gray-500">Condition:</span> {patient.condition}</p>
        <p><span className="text-gray-500">Phone:</span> {patient.phone}</p>
        <p><span className="text-gray-500">Last Visit:</span> {patient.lastVisit}</p>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
}

// Data Table Component
function DataTable({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{apt.patientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{apt.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{apt.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">{apt.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  apt.status === "Confirmed" ? "bg-green-100 text-green-800" :
                  apt.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {apt.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Appointment Form Component
function AppointmentForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    type: "checkup",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Appointment scheduled successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Schedule New Appointment</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border rounded-lg p-2"
          >
            <option value="checkup">Check-up</option>
            <option value="followup">Follow-up</option>
            <option value="consultation">Consultation</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full border rounded-lg p-2"
          rows={3}
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Schedule Appointment
      </button>
    </form>
  );
}

// Prescriptions List Component
function PrescriptionsList({ prescriptions }: { prescriptions: Prescription[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Active Prescriptions</h2>
      <div className="space-y-4">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{rx.medication}</h3>
                <p className="text-gray-600">{rx.dosage} - {rx.frequency}</p>
              </div>
              <span className="text-2xl">💊</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <p>Duration: {rx.startDate} to {rx.endDate}</p>
              <p>Prescribed by: {rx.prescribedBy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Line Chart Component
function LineChart({ data, title }: { data: ChartDataPoint[]; title: string }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex items-end gap-4 h-48">
        {data.map((point, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
              style={{ height: `${(point.value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-2">{point.label}</span>
            <span className="text-xs font-semibold">{point.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState("dashboard");

  const patients: Patient[] = [
    { id: "1", name: "John Smith", age: 45, gender: "Male", phone: "555-0101", email: "john@email.com", condition: "Diabetes Type 2", lastVisit: "2024-01-15" },
    { id: "2", name: "Sarah Johnson", age: 32, gender: "Female", phone: "555-0102", email: "sarah@email.com", condition: "Hypertension", lastVisit: "2024-01-18" },
    { id: "3", name: "Michael Brown", age: 58, gender: "Male", phone: "555-0103", email: "michael@email.com", condition: "Arthritis", lastVisit: "2024-01-20" },
    { id: "4", name: "Emily Davis", age: 28, gender: "Female", phone: "555-0104", email: "emily@email.com", condition: "Asthma", lastVisit: "2024-01-22" },
  ];

  const appointments: Appointment[] = [
    { id: "1", patientName: "John Smith", date: "2024-01-25", time: "09:00", type: "Check-up", status: "Confirmed" },
    { id: "2", patientName: "Sarah Johnson", date: "2024-01-25", time: "10:30", type: "Follow-up", status: "Pending" },
    { id: "3", patientName: "Michael Brown", date: "2024-01-26", time: "14:00", type: "Consultation", status: "Confirmed" },
    { id: "4", patientName: "Emily Davis", date: "2024-01-26", time: "15:30", type: "Check-up", status: "Cancelled" },
  ];

  const prescriptions: Prescription[] = [
    { id: "1", medication: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2024-01-01", endDate: "2024-03-01", prescribedBy: "Dr. Williams" },
    { id: "2", medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2024-01-10", endDate: "2024-04-10", prescribedBy: "Dr. Chen" },
    { id: "3", medication: "Albuterol", dosage: "90mcg", frequency: "As needed", startDate: "2024-01-15", endDate: "2024-07-15", prescribedBy: "Dr. Williams" },
  ];

  const chartData: ChartDataPoint[] = [
    { label: "Mon", value: 12 },
    { label: "Tue", value: 19 },
    { label: "Wed", value: 15 },
    { label: "Thu", value: 22 },
    { label: "Fri", value: 18 },
    { label: "Sat", value: 8 },
    { label: "Sun", value: 5 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-1 p-8">
        {currentView === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Patients</p>
                <p className="text-3xl font-bold text-blue-600">248</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Today's Appointments</p>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Pending Prescriptions</p>
                <p className="text-3xl font-bold text-yellow-600">8</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Monthly Revenue</p>
                <p className="text-3xl font-bold text-purple-600">$24,500</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <LineChart data={chartData} title="Weekly Appointments" />
              <PrescriptionsList prescriptions={prescriptions.slice(0, 2)} />
            </div>
          </div>
        )}
        {currentView === "patients" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Patients</h1>
            <div className="grid grid-cols-3 gap-6">
              {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        )}
        {currentView === "appointments" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Appointments</h1>
            <div className="mb-6">
              <AppointmentForm />
            </div>
            <DataTable appointments={appointments} />
          </div>
        )}
        {currentView === "prescriptions" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>
            <PrescriptionsList prescriptions={prescriptions} />
          </div>
        )}
        {currentView === "analytics" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Analytics</h1>
            <div className="grid grid-cols-2 gap-6">
              <LineChart data={chartData} title="Weekly Patient Visits" />
              <LineChart data={[
                { label: "Jan", value: 45 },
                { label: "Feb", value: 52 },
                { label: "Mar", value: 48 },
                { label: "Apr", value: 61 },
                { label: "May", value: 55 },
                { label: "Jun", value: 67 },
              ]} title="Monthly Appointments Trend" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;