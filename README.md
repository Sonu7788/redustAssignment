🌟 Overview
This application allows users to manage a list of personal profiles. It includes a backend service that handles data persistence and a frontend interface for user interaction. The backend automatically seeds the database with initial data on the first run to facilitate immediate testing.

🛠 Tech Stack
Backend
Node.js: JavaScript runtime
Express.js: Web application framework
Mongoose: MongoDB object modeling tool
CORS: Cross-Origin Resource Sharing middleware
Dotenv: Environment variable management
Frontend
React.js: UI library
Axios (Optional): HTTP client (Note: This implementation uses native fetch to minimize dependencies)
Database
MongoDB: NoSQL database
✨ Features
✅ Health Check Endpoint: /health to verify server status.
✅ Auto-Seeding: Automatically populates the database with dummy data on startup if empty.
✅ CRUD Operations:
Create new users.
Read list of all users.
Update existing user details.
Delete users.
✅ Responsive UI: Clean, user-friendly interface built with React.
📁 Project Structure
mern-assessment/├── client/                 # React Frontend│   ├── public/             # Static assets│   ├── src/│   │   ├── App.css         # Styling│   │   ├── App.js          # Main React Component│   │   ├── index.js        # React DOM entry point│   │   └── ...             # Other config files│   └── package.json        # Frontend dependencies│├── server/                 # Express Backend│   ├── models/│   │   └── User.js         # Mongoose Schema & Model│   ├── .env                # Environment variables (NOT in git)│   ├── package.json        # Backend dependencies│   └── server.js           # Main application entry point│└── README.md               # This file
📦 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher recommended)
npm (comes with Node.js)
MongoDB (Community Server installed locally OR a MongoDB Atlas account)
🚀 Installation & Setup
Follow these steps to get the project running on your local machine.

1. Clone the Repository
bash


2. Backend Setup
Navigate to the server folder and install dependencies:

bash

cd server
npm install
Configure Environment Variables:
Create a .env file inside the server directory and add your MongoDB connection string.

env

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/playground_db
(If using MongoDB Atlas, replace MONGO_URI with your connection string).

Run the Server:

bash

node server.js
You should see: MongoDB Connected and Server running on port 5000.

3. Frontend Setup
Open a new terminal window (keep the backend running), navigate to the client folder, and install dependencies:

bash

cd client
npm install
Run the React App:

bash

npm start
The application will automatically open in your browser at http://localhost:3000.

📡 API Documentation
The API runs on http://localhost:5000 by default.

Base URL

http://localhost:5000
Endpoints
1. Health Check
Check if the server is running.

Method: GET
Endpoint: /health
Response:
json

{
  "status": "healthy",
  "message": "Server is running"
}
2. Get All Users
Retrieve a list of all users.

Method: GET
Endpoint: /users
Response:
json

[
  {
    "_id": "65a1b2c...",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "Developer",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "__v": 0
  }
]
3. Create User
Add a new user to the database.

Method: POST
Endpoint: /users
Body (JSON):
json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Intern"
}
Response: Returns the created user object.
4. Delete User
Remove a user by their ID.

Method: DELETE
Endpoint: /users/:id
Response:
json

{
  "message": "User deleted"
}
5. Update User
Modify user details by ID.

Method: PUT
Endpoint: /users/:id
Body (JSON):
json

{
  "name": "Johnathan Doe",
  "role": "Senior Developer"
}
Response: Returns the updated user object.
🔐 Environment Variables
To run this project, you will need to add the following environment variables to your server/.env file:

Variable
Description
Example
PORT	The port the backend server runs on	5000
MONGO_URI	MongoDB Connection String	mongodb://127.0.0.1:27017/playground_db



👤 Author
https://drive.google.com/file/d/1S2TlVwvp7_hiiCwP6xzJYvPrmKs193hO/view?usp=sharing
