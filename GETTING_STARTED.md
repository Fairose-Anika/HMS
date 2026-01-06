# 🚀 Getting Started - Step by Step

Follow these exact steps to get the Hospital Management System running.

## Prerequisites Check

Before you start, verify you have:
- ✅ Node.js installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ Two terminal windows available
- ✅ Modern web browser (Chrome, Firefox, Edge, Safari)

## Step-by-Step Instructions

### Step 1️⃣: Install Frontend Dependencies

**Location:** `d:\frontend`

```bash
cd d:\frontend
npm install
```

**What it does:**
- Installs React, Vite, and axios in the frontend
- Creates `node_modules/` folder
- Takes 1-2 minutes

**Expected output:**
```
added 123 packages, and audited 124 packages
```

---

### Step 2️⃣: Install Backend Dependencies

**Location:** `d:\frontend\backend`

```bash
cd d:\frontend\backend
npm install
```

**What it does:**
- Installs Express, SQLite3, and other dependencies
- Creates backend `node_modules/` folder
- Takes 1-2 minutes

**Expected output:**
```
added 67 packages, and audited 68 packages
```

---

### Step 3️⃣: Start Backend Server

**Open Terminal 1** and run:

```bash
cd d:\frontend\backend
npm start
```

**What it does:**
- Starts Express.js server on port 3001
- Creates SQLite database at `db/hospital_management.db`
- Initializes database tables

**Expected output:**
```
Server is running on http://localhost:3001
Health check: http://localhost:3001/health
Database initialized with tables: users, appointments, messages
```

**✅ Keep this terminal running!**

---

### Step 4️⃣: Start Frontend Development Server

**Open Terminal 2** and run:

```bash
cd d:\frontend
npm run dev
```

**What it does:**
- Starts Vite development server on port 5173
- Enables hot module replacement (auto-reload)
- Compiles React components

**Expected output:**
```
  VITE v7.2.4  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**✅ Keep this terminal running too!**

---

### Step 5️⃣: Open Application in Browser

**Open your web browser** and go to:
```
http://localhost:5173/
```

**What you should see:**
- Hospital Management System login screen
- Click "Login" button to access the dashboard

---

### Step 6️⃣ (Optional): Populate Database with Sample Data

**Open Terminal 3** and run:

```bash
cd d:\frontend\backend
npm run init-data
```

**What it does:**
- Creates 6 sample users (3 patients, 3 doctors)
- Creates 4 sample appointments
- Populates the SQLite database

**Expected output:**
```
🚀 Initializing sample data...

📝 Inserting sample users...
✓ User inserted: John Doe (ID: 1)
✓ User inserted: Jane Smith (ID: 2)
✓ User inserted: Michael Johnson (ID: 3)
✓ User inserted: Dr. Sarah Wilson (ID: 4)
✓ User inserted: Dr. Robert Brown (ID: 5)
✓ User inserted: Dr. Emily Davis (ID: 6)

📅 Inserting sample appointments...
✓ Appointment inserted: Patient 1 with Doctor 4 (ID: 1)
✓ Appointment inserted: Patient 2 with Doctor 5 (ID: 2)
✓ Appointment inserted: Patient 3 with Doctor 6 (ID: 3)
✓ Appointment inserted: Patient 1 with Doctor 5 (ID: 4)

✅ Sample data initialization completed successfully!

📊 Total Users: 6
📊 Total Appointments: 4

✨ Database connection closed.
```

---

## Accessing the Application

### Dashboard

After login, you'll see the main dashboard with navigation buttons:

1. **Dashboard** - Main overview
2. **Patients** - List of all patients
3. **Doctors** - List of all doctors
4. **Appointments** - View existing appointments
5. **Book Appointment** - Create new appointment ⭐ NEW
6. **Chat with Claude** - AI chat interface ⭐ NEW

---

### Feature 1: Book an Appointment ⭐ NEW

1. Click **"Book Appointment"** in the sidebar
2. **Select a Patient** - Choose from registered patients
3. **Select a Doctor** - Choose from available doctors
4. **Choose a Date** - Click date picker and select date
5. **Choose a Time** - Select from available slots (10:00 AM - 4:00 PM)
6. **Click "Book Appointment"** - Submit the form

**Result:**
- ✅ Appointment saved to database
- ✅ Success message displayed
- ✅ Appointment appears in the appointments table below
- ✅ All appointments listed with status (requested/confirmed/cancelled)

---

### Feature 2: Chat with Claude ⭐ NEW

1. Click **"Chat with Claude"** in the sidebar
2. **Type your message** - e.g., "I have a headache"
3. **Press Send or Enter** - Submit your message

**Result:**
- ✅ Your message appears as a blue bubble
- ✅ Claude's response appears as a purple bubble
- ✅ Timestamps shown for each message
- ✅ Chat history is displayed
- ✅ Messages are saved to database

**Note:** Currently shows mock responses. To use real Claude AI:
- Get API key from Anthropic (https://console.anthropic.com)
- Update `backend/server.js` with API key
- Install: `npm install @anthropic-ai/sdk`

---

## Terminal Setup Visual Guide

```
┌──────────────────────────────────────────────────────────────┐
│ Terminal 1: Backend Server                                    │
├──────────────────────────────────────────────────────────────┤
│ $ cd d:\frontend\backend                                     │
│ $ npm start                                                  │
│                                                              │
│ ✅ Running: http://localhost:3001                            │
│ ✅ Keep this open while developing                           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Terminal 2: Frontend Development Server                       │
├──────────────────────────────────────────────────────────────┤
│ $ cd d:\frontend                                             │
│ $ npm run dev                                                │
│                                                              │
│ ✅ Running: http://localhost:5173                            │
│ ✅ Keep this open while developing                           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Terminal 3: Optional - Sample Data                            │
├──────────────────────────────────────────────────────────────┤
│ $ cd d:\frontend\backend                                     │
│ $ npm run init-data                                          │
│                                                              │
│ ✅ Runs once to populate database                            │
│ ✅ Can close after completion                                │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Web Browser                                                   │
├──────────────────────────────────────────────────────────────┤
│ URL: http://localhost:5173/                                  │
│                                                              │
│ ✅ Application loads here                                    │
│ ✅ Hot reload on file changes                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Stopping the Application

When you're done developing:

### Stop Backend Server
In **Terminal 1**, press:
```
Ctrl + C
```

### Stop Frontend Server
In **Terminal 2**, press:
```
Ctrl + C
```

---

## Testing the Connection

### Test Backend is Working

Open Terminal 3 and run:

```bash
curl http://localhost:3001/health
```

**Expected response:**
```json
{"message":"Server is running","status":"ok"}
```

### Test Frontend is Working

Open browser and go to:
```
http://localhost:5173/
```

**Expected:** Login screen appears

---

## Troubleshooting

### Issue: "Port 3001 already in use"

**Solution:**
```bash
# Find process on port 3001
netstat -ano | findstr :3001

# Kill it (replace <PID> with actual PID)
taskkill /PID <PID> /F

# Restart backend
npm start
```

### Issue: "Port 5173 already in use"

**Solution:**
```bash
# Find process on port 5173
netstat -ano | findstr :5173

# Kill it
taskkill /PID <PID> /F

# Restart frontend
npm run dev
```

### Issue: "Cannot find module 'express'"

**Solution:**
```bash
cd d:\frontend\backend
npm install
```

### Issue: "Cannot find module 'axios' (frontend)"

**Solution:**
```bash
cd d:\frontend
npm install axios
```

### Issue: "Database is empty"

**Solution:**
```bash
cd d:\frontend\backend
npm run init-data
```

### Issue: "Backend shows connection refused"

**Solution:**
1. ✅ Check Terminal 1 - Backend should be running
2. ✅ Check URL - Should be `http://localhost:3001`
3. ✅ Restart backend server
4. ✅ Check firewall settings

---

## File Locations Reminder

```
d:\frontend\                          ← Frontend root
├── src\
│   ├── components\
│   │   ├── ChatComponent.jsx         ← NEW
│   │   ├── AppointmentBooking.jsx    ← NEW
│   │   └── ... other components
│   ├── App.jsx                       ← UPDATED
│   └── ...
├── backend\                          ← Backend root
│   ├── server.js                     ← API Server
│   ├── database.js                   ← DB Setup
│   ├── init-data.js                  ← Sample Data
│   ├── package.json
│   ├── db\
│   │   └── hospital_management.db    ← SQLite Database
│   └── ...
├── package.json                      ← UPDATED
├── SETUP_GUIDE.md                    ← Full setup docs
├── QUICK_REFERENCE.md                ← Commands reference
├── IMPLEMENTATION_SUMMARY.md         ← What was built
└── ARCHITECTURE_DIAGRAM.md           ← System design
```

---

## Next Steps

After getting everything running:

1. **Explore the UI**
   - Test all navigation buttons
   - Try booking appointments
   - Test chat functionality

2. **Test the API** (Optional)
   - Use curl or Postman to test endpoints
   - See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands

3. **Integrate Real Claude API** (If desired)
   - Get API key from Anthropic
   - Follow instructions in [backend/README.md](backend/README.md)

4. **Customize the Application**
   - Modify styling in CSS files
   - Add new components as needed
   - Extend API functionality

---

## Resources

📚 **Documentation Files:**
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup guide
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Command reference
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Features overview
- [ARCHITECTURE_DIAGRAM.md](ARCHITECTURE_DIAGRAM.md) - System design
- [backend/README.md](backend/README.md) - Backend documentation

🔗 **External Links:**
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Express Documentation](https://expressjs.com/)
- [SQLite Documentation](https://www.sqlite.org/)
- [Anthropic Claude API](https://console.anthropic.com/)

---

## Success Checklist ✅

- [ ] Installed Node.js and npm
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] Backend running on port 3001 (Terminal 1)
- [ ] Frontend running on port 5173 (Terminal 2)
- [ ] Application loads at http://localhost:5173/
- [ ] Can login to application
- [ ] Can navigate to all pages
- [ ] Can book appointments (if data exists)
- [ ] Can chat with Claude
- [ ] Database file exists at backend/db/hospital_management.db

**✨ All set! Happy coding! 🎉**

---

For more detailed information, see the other documentation files in this folder.
