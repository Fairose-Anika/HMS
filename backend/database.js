const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create db directory if it doesn't exist
const fs = require('fs');
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(path.join(dbDir, 'hospital_management.db'));

db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      role TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Appointments table
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientId INTEGER,
      doctorId INTEGER,
      date TEXT,
      slot TEXT,
      status TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(patientId) REFERENCES users(id),
      FOREIGN KEY(doctorId) REFERENCES users(id)
    )
  `);

  // Messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversationId INTEGER,
      senderId INTEGER,
      senderRole TEXT,
      message TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(conversationId) REFERENCES appointments(id),
      FOREIGN KEY(senderId) REFERENCES users(id)
    )
  `);

  console.log('Database initialized with tables: users, appointments, messages');
});

module.exports = db;
