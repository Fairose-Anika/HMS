import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import PatientList from "./components/PatientList";
import DoctorList from "./components/DoctorList";
import Appointment from "./components/Appointment";
import Login from "./components/Login";
import ChatComponent from "./components/ChatComponent";
import AppointmentBooking from "./components/AppointmentBooking";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} />

      <div className="content">
        {page === "dashboard" && <Dashboard />}
        {page === "patients" && <PatientList />}
        {page === "doctors" && <DoctorList />}
        {page === "appointments" && <Appointment />}
        {page === "booking" && <AppointmentBooking />}
        {page === "chat" && <ChatComponent />}
      </div>
    </div>
  );
}

export default App;
