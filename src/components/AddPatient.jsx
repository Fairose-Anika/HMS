import React, { useState } from "react";
import axios from 'axios';

function AddPatient({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/register', {
        name,
        email,
        role: 'patient',
        age: age || null,
        disease: disease || null,
      });

      const newId = res.data.userId;

      const newPatient = {
        id: newId,
        name,
        email,
        age: age || '-',
        disease: disease || '-',
      };

      onAdd(newPatient);

      setName("");
      setEmail("");
      setAge("");
      setDisease("");
    } catch (err) {
      console.error('Error adding patient:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <h3>Add Patient</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />

      <input
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        placeholder="Disease"
      />

      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Patient'}</button>
    </form>
  );
}

export default AddPatient;
