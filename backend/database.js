const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const fs = require('fs');
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(path.join(dbDir, 'hospital_management.db'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      role TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

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

  db.all("PRAGMA table_info(users)", (err, cols) => {
    if (err) {
      console.error('Error checking users table schema:', err.message);
      return;
    }
    const names = (cols || []).map(c => c.name);
    if (!names.includes('age')) {
      db.run('ALTER TABLE users ADD COLUMN age TEXT', (aErr) => {
        if (aErr) console.error('Error adding age column:', aErr.message);
      });
    }
    if (!names.includes('disease')) {
      db.run('ALTER TABLE users ADD COLUMN disease TEXT', (dErr) => {
        if (dErr) console.error('Error adding disease column:', dErr.message);
      });
    }
    if (!names.includes('experience')) {
      db.run('ALTER TABLE users ADD COLUMN experience TEXT', (eErr) => {
        if (eErr) console.error('Error adding experience column:', eErr.message);
      });
    }
  });

  console.log('Database initialized with tables: users, appointments, messages');
});

module.exports = db;
