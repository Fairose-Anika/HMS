import React, { useEffect, useState } from "react";
import axios from 'axios';

function Dashboard() {
  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [appointments, setAppointments] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await axios.get('http://localhost:3001/users');
        const allUsers = usersRes.data.users || [];
        setPatients(allUsers.filter(u => u.role === 'patient').length);
        setDoctors(allUsers.filter(u => u.role === 'doctor').length);

        const apptsRes = await axios.get('http://localhost:3001/appointments');
        setAppointments((apptsRes.data.appointments || []).length);
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
