/**
 * Sample Data Initialization Script
 * 
 * This script populates the database with sample users and appointments
 * for testing purposes.
 * 
 * Usage: node init-data.js
 */

const db = require('./database');

// Sample users data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'patient'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'patient'
  },
  {
    name: 'Michael Johnson',
    email: 'michael@example.com',
    role: 'patient'
  },
  {
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@hospital.com',
    role: 'doctor'
  },
  {
    name: 'Dr. Robert Brown',
    email: 'robert.brown@hospital.com',
    role: 'doctor'
  },
  {
    name: 'Dr. Emily Davis',
    email: 'emily.davis@hospital.com',
    role: 'doctor'
  }
];

// Sample appointments data
const sampleAppointments = [
  {
    patientId: 1,
    doctorId: 4,
    date: '2024-01-15',
    slot: '10:00',
    status: 'confirmed'
  },
  {
    patientId: 2,
    doctorId: 5,
    date: '2024-01-16',
    slot: '11:00',
    status: 'requested'
  },
  {
    patientId: 3,
    doctorId: 6,
    date: '2024-01-17',
    slot: '14:00',
    status: 'confirmed'
  },
  {
    patientId: 1,
    doctorId: 5,
    date: '2024-01-18',
    slot: '15:00',
    status: 'requested'
  }
];

// Insert users
function insertUsers() {
  return new Promise((resolve, reject) => {
    let insertedCount = 0;

    sampleUsers.forEach((user) => {
      const stmt = db.prepare(
        'INSERT INTO users (name, email, role) VALUES (?, ?, ?)'
      );

      stmt.run(user.name, user.email, user.role, function (err) {
        if (err) {
          console.error(`Error inserting user ${user.name}:`, err.message);
        } else {
          console.log(`✓ User inserted: ${user.name} (ID: ${this.lastID})`);
          insertedCount++;
        }

        stmt.finalize();

        if (insertedCount === sampleUsers.length) {
          resolve();
        }
      });
    });
  });
}

// Insert appointments
function insertAppointments() {
  return new Promise((resolve, reject) => {
    let insertedCount = 0;

    sampleAppointments.forEach((appointment) => {
      const stmt = db.prepare(
        'INSERT INTO appointments (patientId, doctorId, date, slot, status) VALUES (?, ?, ?, ?, ?)'
      );

      stmt.run(
        appointment.patientId,
        appointment.doctorId,
        appointment.date,
        appointment.slot,
        appointment.status,
        function (err) {
          if (err) {
            console.error('Error inserting appointment:', err.message);
          } else {
            console.log(
              `✓ Appointment inserted: Patient ${appointment.patientId} with Doctor ${appointment.doctorId} (ID: ${this.lastID})`
            );
            insertedCount++;
          }

          stmt.finalize();

          if (insertedCount === sampleAppointments.length) {
            resolve();
          }
        }
      );
    });
  });
}

// Main initialization function
async function initializeData() {
  console.log('\n🚀 Initializing sample data...\n');

  try {
    console.log('📝 Inserting sample users...');
    await insertUsers();

    console.log('\n📅 Inserting sample appointments...');
    await insertAppointments();

    console.log('\n✅ Sample data initialization completed successfully!\n');

    // Display summary
    db.all('SELECT COUNT(*) as count FROM users', (err, rows) => {
      if (!err) {
        console.log(`📊 Total Users: ${rows[0].count}`);
      }
    });

    db.all('SELECT COUNT(*) as count FROM appointments', (err, rows) => {
      if (!err) {
        console.log(`📊 Total Appointments: ${rows[0].count}`);
      }
    });

    // Close database connection
    setTimeout(() => {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('\n✨ Database connection closed.\n');
        }
        process.exit(0);
      });
    }, 500);
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    process.exit(1);
  }
}

// Run initialization
initializeData();
