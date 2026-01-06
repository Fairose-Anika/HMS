import React, { useEffect, useState } from "react";
import axios from 'axios';

function Dashboard() {
  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [appointments, setAppointments] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/dashboard-counts');
        setPatients(res.data.patients || 0);
        setDoctors(res.data.doctors || 0);
        setAppointments(res.data.appointments || 0);
      } catch (err) {
        console.error('Error fetching dashboard counts:', err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome Admin</h1>
      <div className="stats">
        <div className="stat-card pink">Patients<br />{patients}</div>
        <div className="stat-card purple">Doctors<br />{doctors}</div>
        <div className="stat-card blue">Appointments<br />{appointments}</div>
      </div>
    </div>
  );
}

export default Dashboard;
