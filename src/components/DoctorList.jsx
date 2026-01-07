import React, { useState, useEffect } from "react";
import axios from 'axios';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:3001/users');
        const all = res.data.users || [];
        setDoctors(all.filter(u => u.role === 'doctor'));
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

  const addDoctor = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError('Name and email are required');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/register', {
        name,
        email,
        role: 'doctor',
        experience: experience || null,
      });

      const newDoctor = { id: res.data.userId, name, email, experience: experience || '-' };
      setDoctors((prev) => [...prev, newDoctor]);

      setName('');
      setEmail('');
      setExperience('');
    } catch (err) {
      console.error('Error adding doctor:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to add doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={addDoctor} style={{ marginBottom: 16 }}>
        <h3>Add Doctor</h3>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Doctor'}</button>
        {error && <div style={{ color: '#d32f2f', marginTop: 8 }}>{error}</div>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.experience || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorList;
