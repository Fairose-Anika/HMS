import React, { useState } from "react";

function AddPatient({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!name || !age || !disease) return;

    onAdd({
      name,
      age,
      disease
    });

    setName("");
    setAge("");
    setDisease("");
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
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />

      <input
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        placeholder="Disease"
      />

      <button type="submit">Add Patient</button>
    </form>
  );
}

export default AddPatient;
