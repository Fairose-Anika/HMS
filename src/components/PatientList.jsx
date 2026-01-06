import React, { useState, useEffect } from "react";
import axios from 'axios';
import AddPatient from "./AddPatient";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:3001/users');
        const all = res.data.users || [];
        const pts = all.filter(u => u.role === 'patient').map(u => ({
          id: u.id,
          name: u.name,
          email: u.email || '',
          age: u.age || '-',
          disease: u.disease || '-',
        }));
        setPatients(pts);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <AddPatient onAdd={(p) => setPatients([...patients, p])} />
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Disease</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.age}</td>
              <td>{p.disease}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
