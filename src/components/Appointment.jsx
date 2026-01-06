import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('10:00');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch doctors and patients on component mount
    fetchDoctorsAndPatients();
    fetchAppointments();
  }, []);

  const fetchDoctorsAndPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const allUsers = response.data.users || [];
      setDoctors(allUsers.filter((u) => u.role === 'doctor'));
      setPatients(allUsers.filter((u) => u.role === 'patient'));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/appointments');
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleBooking = async () => {
    if (!patientId || !doctorId || !date || !slot) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3001/appointments', {
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId),
        date,
        slot,
      });

      setMessage(response.data.message || 'Appointment booked successfully!');
      setPatientId('');
      setDoctorId('');
      setDate('');
      setSlot('10:00');
      fetchAppointments(); // Refresh appointments list
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Book an Appointment</h2>

      <div style={styles.formSection}>
        <h3>Create New Appointment</h3>

        <div style={styles.formGroup}>
          <label htmlFor="patientId">Patient</label>
          <select
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            style={styles.select}
            disabled={loading}
          >
            <option value="">Select a patient...</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} (ID: {patient.id})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="doctorId">Doctor</label>
          <select
            id="doctorId"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            style={styles.select}
            disabled={loading}
          >
            <option value="">Select a doctor...</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} (ID: {doctor.id})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            disabled={loading}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="slot">Time Slot</label>
          <select
            id="slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            style={styles.select}
            disabled={loading}
          >
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>

        <button onClick={handleBooking} disabled={loading} style={styles.button}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>

        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes('Error') ? '#d32f2f' : '#4caf50',
            }}
          >
            {message}
          </p>
        )}
      </div>

      <div style={styles.appointmentsSection}>
        <h3>Upcoming Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments scheduled</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td>{apt.id}</td>
                  <td>{apt.patientId}</td>
                  <td>{apt.doctorId}</td>
                  <td>{apt.date}</td>
                  <td>{apt.slot}</td>
                  <td>
                    <span style={getStatusStyle(apt.status)}>{apt.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  const styles = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  switch (status) {
    case 'requested':
      return { ...styles, backgroundColor: '#fff3cd', color: '#856404' };
    case 'confirmed':
      return { ...styles, backgroundColor: '#d4edda', color: '#155724' };
    case 'cancelled':
      return { ...styles, backgroundColor: '#f8d7da', color: '#721c24' };
    default:
      return styles;
  }
};

const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  formSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    border: '1px solid #eee',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    marginTop: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    marginTop: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  appointmentsSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
};

export default AppointmentBooking;
