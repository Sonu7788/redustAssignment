require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- 1. Seed Data (Run on startup) ---
const seedDatabase = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      console.log("Seeding database...");
      await User.create([
        { name: "Alice Johnson", email: "alice@example.com", role: "Developer" },
        { name: "Bob Smith", email: "bob@example.com", role: "Designer" },
        { name: "Charlie Brown", email: "charlie@example.com", role: "Manager" }
      ]);
      console.log("Database seeded!");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  }
};
seedDatabase();

// --- 2. Health Endpoint ---
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Server is running' });
});

// --- 3. CRUD Routes ---

// Get all users (Read)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a user (Create)
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user (Delete)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user (Update)
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));