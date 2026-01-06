import React from "react";

function DoctorList() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Department</th><th>Experience</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Dr. Raihan</td><td>Cardiology</td><td>10 Years</td></tr>
        <tr><td>Dr. Suraiya</td><td>Neurology</td><td>23 Years</td></tr>
      </tbody>
    </table>
  );
}

export default DoctorList;
