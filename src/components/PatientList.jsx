import React, { useState } from "react";
import AddPatient from "./AddPatient";

function PatientList() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Shaira Labiba", age: 23, disease: "Fever" }
  ]);

  return (
    <div>
      <AddPatient onAdd={(p) => setPatients([...patients, p])} />
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>Disease</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
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
