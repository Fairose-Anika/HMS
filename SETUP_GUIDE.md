# Hospital Management System - Complete Setup Guide

This guide walks you through setting up and running the complete Hospital Management System with both backend and frontend.

## Project Structure

```
d:/frontend/
├── src/
│   ├── components/
│   │   ├── ChatComponent.jsx           # Chat with Claude AI
│   │   ├── AppointmentBooking.jsx      # Book appointments
│   │   ├── Dashboard.jsx
│   │   ├── PatientList.jsx
│   │   ├── DoctorList.jsx
│   │   ├── Appointment.jsx
│   │   ├── Login.jsx
│   │   └── Sidebar.jsx                 # Updated with new navigation
│   ├── App.jsx                         # Updated with new routes
│   ├── main.jsx
│   └── index.css
├── package.json                        # Updated with axios
├── vite.config.js
├── index.html
└── backend/
    ├── server.js                       # Express.js API server
    ├── database.js                     # SQLite setup
    ├── package.json                    # Backend dependencies
    ├── README.md                       # Backend documentation
    └── db/
        └── hospital_management.db      # SQLite database (auto-created)
```

## Step-by-Step Setup

### Step 1: Install Frontend Dependencies

```bash
cd d:\frontend
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd d:\frontend\backend
npm install
```

This will install:
- `express` - Web framework
- `sqlite3` - Database
- `body-parser` - JSON parser
- `cors` - Cross-Origin requests support
- `axios` - HTTP client

### Step 3: Start the Backend Server

Open a new terminal and run:

```bash
cd d:\frontend\backend
npm start
```

Expected output:
```
Server is running on http://localhost:3001
Health check: http://localhost:3001/health
Database initialized with tables: users, appointments, messages
```

### Step 4: Start the Frontend Development Server

Open another terminal and run:

```bash
cd d:\frontend
npm run dev
```

Expected output:
```
➜  frontend
➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 5: Access the Application

Open your browser and go to: `http://localhost:5173/`

## Using the Application

### 1. Login
- The app starts with a login screen
- Click the Login button to access the dashboard

### 2. Navigate Using Sidebar

The sidebar has the following options:
- **Dashboard** - Overview of the system
- **Patients** - View patient list
- **Doctors** - View doctor list
- **Appointments** - View existing appointments
- **Book Appointment** - Create new appointments
- **Chat with Claude** - AI chat interface

### 3. Book an Appointment

1. Click "Book Appointment" in the sidebar
2. Select a patient from the dropdown
3. Select a doctor from the dropdown
4. Choose a date and time slot
5. Click "Book Appointment"

The appointment will be saved to the SQLite database and displayed in the appointments list.

### 4. Chat with Claude

1. Click "Chat with Claude" in the sidebar
2. Type a message in the text field
3. Press Send or Enter
4. The Claude AI will respond

**Note**: Currently configured as a mock response. To use real Claude AI:
- Get an API key from Anthropic
- Update the `callClaudeAgent()` function in `backend/server.js`
- Install the Anthropic SDK: `npm install @anthropic-ai/sdk`

## API Endpoints

The backend provides the following endpoints:

### Health Check
- `GET http://localhost:3001/health`

### User Management
- `POST http://localhost:3001/register` - Create user
- `GET http://localhost:3001/users` - Get all users
- `GET http://localhost:3001/users/:id` - Get user by ID

### Appointments
- `POST http://localhost:3001/appointments` - Create appointment
- `GET http://localhost:3001/appointments` - Get all appointments
- `GET http://localhost:3001/appointments/patient/:id` - Get patient appointments

### Chat
- `POST http://localhost:3001/chat` - Send message to Claude

## Testing the Backend

You can test the backend using curl or Postman:

### Register a Patient
```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","role":"patient"}'
```

### Register a Doctor
```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Dr. Smith","email":"doctor@example.com","role":"doctor"}'
```

### Get All Users
```bash
curl http://localhost:3001/users
```

### Book an Appointment
```bash
curl -X POST http://localhost:3001/appointments \
  -H "Content-Type: application/json" \
  -d '{"patientId":1,"doctorId":2,"date":"2024-01-20","slot":"10:00"}'
```

## Database

The SQLite database is automatically created at:
`d:\frontend\backend\db\hospital_management.db`

### Tables:
1. **users** - Stores patient and doctor information
2. **appointments** - Stores appointment records
3. **messages** - Stores chat messages

### Reset Database
To reset the database and start fresh:
1. Stop the backend server
2. Delete `d:\frontend\backend\db\hospital_management.db`
3. Restart the backend server

## Troubleshooting

### Port Already in Use

If you get an error that port 3001 or 5173 is already in use:

**Windows:**
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -i :3001
kill -9 <PID>
```

### Backend Connection Error

If frontend shows "Is the backend running?" error:
1. Ensure backend server is running on `http://localhost:3001`
2. Check the backend terminal for errors
3. Restart the backend server

### Dependencies Not Installed

If you get module not found errors:
```bash
# Frontend
cd d:\frontend
npm install

# Backend
cd d:\frontend\backend
npm install
```

## Development Workflow

1. **Backend changes**: Restart `npm start` in backend folder
2. **Frontend changes**: Vite will auto-reload (Hot Module Replacement)
3. **Database schema changes**: Edit `database.js` and restart backend

## Next Steps

1. **Implement Real Claude API**
   - Get API key from Anthropic
   - Install Anthropic SDK
   - Update `callClaudeAgent()` function

2. **Add Authentication**
   - Implement user login/registration
   - Add JWT tokens
   - Protect routes with authentication

3. **Enhance Features**
   - Add real-time notifications
   - Implement WebSocket for live chat
   - Add payment processing
   - Implement doctor schedules

4. **Deploy to Production**
   - Build React app: `npm run build`
   - Use Node.js hosting (Heroku, Render, etc.)
   - Set up environment variables
   - Use PostgreSQL instead of SQLite

## Project Features

✅ User registration (Patients & Doctors)
✅ Appointment booking system
✅ Chat interface with Claude AI (mock)
✅ Responsive React UI
✅ SQLite database persistence
✅ RESTful API
✅ CORS enabled for cross-origin requests

## Support

For issues or questions:
1. Check the backend README.md
2. Review the component code in `src/components/`
3. Check browser console for frontend errors
4. Check terminal for backend errors

---

**Happy Coding!** 🎉
