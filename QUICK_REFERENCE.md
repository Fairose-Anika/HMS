# Quick Reference Guide

## Installation & Setup

### Backend Setup
```bash
cd d:\frontend\backend
npm install
```

### Frontend Setup
```bash
cd d:\frontend
npm install
```

## Running the Project

### Terminal 1 - Start Backend Server
```bash
cd d:\frontend\backend
npm start
```

Expected: `Server is running on http://localhost:3001`

### Terminal 2 - Start Frontend
```bash
cd d:\frontend
npm run dev
```

Expected: `Local: http://localhost:5173/`

## Sample Data

### Populate Database with Sample Data
```bash
cd d:\frontend\backend
npm run init-data
```

This creates:
- 3 sample patients
- 3 sample doctors
- 4 sample appointments

## Testing API Endpoints

### Register a User
```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"role\":\"patient\"}"
```

### Get All Users
```bash
curl http://localhost:3001/users
```

### Book an Appointment
```bash
curl -X POST http://localhost:3001/appointments \
  -H "Content-Type: application/json" \
  -d "{\"patientId\":1,\"doctorId\":2,\"date\":\"2024-01-20\",\"slot\":\"10:00\"}"
```

### Send Chat Message
```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d "{\"userInput\":\"Hello Claude\",\"userId\":1}"
```

### Health Check
```bash
curl http://localhost:3001/health
```

## React Components

### ChatComponent Features
- Send messages to Claude AI
- View chat history with timestamps
- Error handling
- Loading indicators
- Clean message bubble interface

### AppointmentBooking Features
- Select patient and doctor from dropdowns
- Choose appointment date
- Select time slot
- View all appointments in a table
- Status color-coding

## Database Commands

### View Database
```bash
# Using SQLite CLI (if installed)
sqlite3 backend/db/hospital_management.db

# Show all users
SELECT * FROM users;

# Show all appointments
SELECT * FROM appointments;

# Show all messages
SELECT * FROM messages;
```

### Reset Database
```bash
# Stop backend server first
# Delete the database file
del d:\frontend\backend\db\hospital_management.db

# Restart backend server (database will be recreated)
npm start

# Optionally repopulate with sample data
npm run init-data
```

## Troubleshooting

### Port 3001 In Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Port 5173 In Use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5173
kill -9 <PID>
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ..
rm -rf node_modules package-lock.json
npm install
```

## File Locations

### Backend
- Server: `backend/server.js`
- Database: `backend/database.js`
- Database File: `backend/db/hospital_management.db`
- Sample Data: `backend/init-data.js`
- Documentation: `backend/README.md`

### Frontend
- App: `src/App.jsx`
- Chat: `src/components/ChatComponent.jsx`
- Appointments: `src/components/AppointmentBooking.jsx`
- Navigation: `src/components/Sidebar.jsx`

### Documentation
- Setup Guide: `SETUP_GUIDE.md`
- Implementation Summary: `IMPLEMENTATION_SUMMARY.md`
- Backend README: `backend/README.md`
- This Guide: `QUICK_REFERENCE.md`

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Server health check |
| POST | `/register` | Register new user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/appointments` | Create appointment |
| GET | `/appointments` | Get all appointments |
| GET | `/appointments/patient/:id` | Get patient appointments |
| POST | `/chat` | Send chat message |

## Development Tips

### Auto-reload
- Frontend: Vite auto-reloads on file change
- Backend: Restart `npm start` after changes

### Debugging
- Backend: Check terminal output
- Frontend: Check browser console (F12)
- Network: Check Network tab in DevTools

### Code Organization
- Components: `src/components/`
- Styles: Inline or `src/` CSS files
- Backend routes: All in `server.js`
- Database logic: All in `database.js`

## Environment Variables (Future)

When deploying, create `.env` file:
```
BACKEND_URL=http://localhost:3001
ANTHROPIC_API_KEY=your_api_key_here
DB_PATH=./db/hospital_management.db
PORT=3001
NODE_ENV=development
```

## Key Technologies

- **Frontend**: React 19, Vite, Axios
- **Backend**: Node.js, Express 4, SQLite3
- **Database**: SQLite
- **HTTP Client**: Axios
- **Styling**: CSS + Inline styles

## Useful Commands

### View Backend Logs
```bash
npm start
# Keep this terminal open to see all server logs
```

### View Frontend Dev Server
```bash
npm run dev
# Shows HMR (Hot Module Replacement) activity
```

### Stop Servers
```bash
# In each terminal, press Ctrl+C
```

### Check Node Version
```bash
node --version
npm --version
```

### Build Frontend for Production
```bash
cd d:\frontend
npm run build
# Creates dist/ folder with optimized build
```

## Performance Tips

1. **Backend**
   - Queries are optimized with proper indexing
   - CORS enabled for production

2. **Frontend**
   - Vite provides fast builds
   - React 19 with automatic optimization
   - Axios for efficient HTTP requests

3. **Database**
   - SQLite is lightweight and efficient
   - Migrate to PostgreSQL for production

## Next Steps

1. ✅ Setup complete - Start both servers
2. 📝 Populate sample data with `npm run init-data`
3. 🧪 Test all features in the UI
4. 🔌 Integrate real Claude API
5. 🔐 Add authentication
6. 🚀 Deploy to production

---

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
For implementation details, see [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
