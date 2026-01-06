const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to register a user
app.post('/register', (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required' });
  }

  const stmt = db.prepare('INSERT INTO users (name, email, role) VALUES (?, ?, ?)');

  stmt.run(name, email, role, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({
      message: 'User created successfully',
      userId: this.lastID,
    });
  });
  stmt.finalize();
});

// Route to get all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ users: rows });
  });
});

// Route to get user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: row });
  });
});

// Route to handle appointment booking
app.post('/appointments', (req, res) => {
  const { patientId, doctorId, date, slot } = req.body;

  if (!patientId || !doctorId || !date || !slot) {
    return res
      .status(400)
      .json({ error: 'PatientId, doctorId, date, and slot are required' });
  }

  const stmt = db.prepare(
    'INSERT INTO appointments (patientId, doctorId, date, slot, status) VALUES (?, ?, ?, ?, ?)'
  );

  stmt.run(patientId, doctorId, date, slot, 'requested', function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({
      message: 'Appointment created successfully',
      appointmentId: this.lastID,
    });
  });
  stmt.finalize();
});

// Route to get all appointments
app.get('/appointments', (req, res) => {
  db.all('SELECT * FROM appointments', (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ appointments: rows });
  });
});

// Route to update appointment status
app.patch('/appointments/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ['requested', 'confirmed', 'cancelled'];
  if (!status || !allowed.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
  stmt.run(status, id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', appointmentId: id, status });
  });
  stmt.finalize();
});

// Route to get dashboard counts (patients, doctors, appointments)
app.get('/dashboard-counts', (req, res) => {
  db.get('SELECT COUNT(*) as count FROM users WHERE role = ?', ['patient'], (err, pRow) => {
    if (err) return res.status(400).json({ error: err.message });
    const patients = pRow.count || 0;

    db.get('SELECT COUNT(*) as count FROM users WHERE role = ?', ['doctor'], (err2, dRow) => {
      if (err2) return res.status(400).json({ error: err2.message });
      const doctors = dRow.count || 0;

      db.get('SELECT COUNT(*) as count FROM appointments', (err3, aRow) => {
        if (err3) return res.status(400).json({ error: err3.message });
        const appointments = aRow.count || 0;

        res.status(200).json({ patients, doctors, appointments });
      });
    });
  });
});

// Route to get appointments by patient ID
app.get('/appointments/patient/:patientId', (req, res) => {
  const { patientId } = req.params;
  db.all('SELECT * FROM appointments WHERE patientId = ?', [patientId], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ appointments: rows });
  });
});

// Route for interacting with Claude (AI processing)
app.post('/chat', async (req, res) => {
  const { userInput, userId } = req.body;

  if (!userInput || !userId) {
    return res.status(400).json({ error: 'userInput and userId are required' });
  }

  try {
    const response = await callClaudeAgent(userInput, userId);

    // Store the response in the database (messages table)
    await saveMessage(userId, response);

    res.status(200).json({
      message: 'Chat processed successfully',
      response: response,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing chat', error: error.message });
  }
});

// Function to interact with Claude AI
// Replace with actual Claude API call if you have API key
async function callClaudeAgent(userInput, userId) {
  // TODO: Replace with actual Claude API integration
  // For now, returning a simulated response
  return `Claude Agent response for input: "${userInput}" from user: ${userId}`;
}

// Function to save messages in the database
async function saveMessage(userId, response) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'INSERT INTO messages (conversationId, senderId, senderRole, message) VALUES (?, ?, ?, ?)'
    );
    stmt.run(null, userId, 'patient', response, function (err) {
      if (err) {
        console.error('Error saving message:', err.message);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
    stmt.finalize();
  });
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
