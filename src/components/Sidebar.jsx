import React from "react";

function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>🏥 Happy Care</h2>
      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("patients")}>Patients</button>
      <button onClick={() => setPage("doctors")}>Doctors</button>
      <button onClick={() => setPage("booking")}>Book Appointment</button>
      <button onClick={() => setPage("chat")}>Care AI</button>
    </div>
  );
}

export default Sidebar;
