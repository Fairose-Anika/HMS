# Hospital Management System - Backend

This is the Node.js backend for the Hospital Management System with SQLite database and Claude AI integration.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
backend/
├── server.js          # Express.js server with API routes
├── database.js        # SQLite database setup and configuration
├── package.json       # Project dependencies
├── db/                # Database directory (created automatically)
│   └── hospital_management.db
└── README.md          # This file
```

## Starting the Server

Run the backend server:
```bash
npm start
```

Or in development mode:
```bash
npm run dev
```

The server will start at `http://localhost:3001`

Health check endpoint: `http://localhost:3001/health`

## API Endpoints

### User Management
- **POST** `/register` - Register a new user
  - Body: `{ name: string, email: string, role: string }`
  - Returns: `{ message: string, userId: number }`

- **GET** `/users` - Get all users
  - Returns: `{ users: array }`

- **GET** `/users/:id` - Get user by ID
  - Returns: `{ user: object }`

### Appointments
- **POST** `/appointments` - Create a new appointment
  - Body: `{ patientId: number, doctorId: number, date: string, slot: string }`
  - Returns: `{ message: string, appointmentId: number }`

- **GET** `/appointments` - Get all appointments
  - Returns: `{ appointments: array }`

- **GET** `/appointments/patient/:patientId` - Get patient's appointments
  - Returns: `{ appointments: array }`

### Chat (Claude AI)
- **POST** `/chat` - Send a message to Claude AI
  - Body: `{ userInput: string, userId: number }`
  - Returns: `{ message: string, response: string }`

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  role TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Appointments Table
```sql
CREATE TABLE appointments (
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
```

### Messages Table
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversationId INTEGER,
  senderId INTEGER,
  senderRole TEXT,
  message TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(conversationId) REFERENCES appointments(id),
  FOREIGN KEY(senderId) REFERENCES users(id)
)
```

## Environment Setup

The backend uses CORS to allow requests from the React frontend. The frontend is configured to communicate with:
- `http://localhost:3001`

## Sample Requests

### Register a User
```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"patient"}'
```

### Book an Appointment
```bash
curl -X POST http://localhost:3001/appointments \
  -H "Content-Type: application/json" \
  -d '{"patientId":1,"doctorId":2,"date":"2024-01-15","slot":"10:00"}'
```

### Send Chat Message
```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{"userInput":"I have a headache","userId":1}'
```

## Claude AI Integration

The current implementation includes a placeholder for Claude AI integration. To integrate with the actual Claude API:

1. Get your Claude API key from Anthropic
2. Update the `callClaudeAgent()` function in `server.js` with real API calls
3. Install the Anthropic SDK: `npm install @anthropic-ai/sdk`

Example integration:
```javascript
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic.Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function callClaudeAgent(userInput, userId) {
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: userInput
      }
    ]
  });
  
  return response.content[0].text;
}
```

## Troubleshooting

### Port 3001 Already in Use
```bash
# Kill the process using port 3001
# On Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# On Linux/Mac:
lsof -i :3001
kill -9 <PID>
```

### Database Issues
- Delete the `db/hospital_management.db` file to reset the database
- The database will be recreated on the next server start

### CORS Errors
- Ensure the backend is running on `http://localhost:3001`
- Check that the frontend is making requests to the correct endpoint

## Running Both Frontend and Backend

Open two terminals:

Terminal 1 - Start Backend:
```bash
cd backend
npm start
```

Terminal 2 - Start Frontend:
```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`
Backend will run on: `http://localhost:3001`

## Next Steps

1. Integrate real Claude API
2. Implement user authentication
3. Add more advanced appointment features
4. Implement real-time chat with WebSockets
5. Add payment integration
6. Deploy to production

## License

ISC
