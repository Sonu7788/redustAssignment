import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  
  // New State for Editing and Filtering
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // 1. Fetch Users Function
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 2. Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Submit (Create OR Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `${API_URL}/users/${currentUserId}` 
        : `${API_URL}/users`;
      
      const method = isEditing ? 'PUT' : 'POST';

      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Reset form and fetch new list
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // 4. Handle Edit Button Click
  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUserId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  // 5. Cancel Edit / Reset Form
  const resetForm = () => {
    setIsEditing(false);
    setCurrentUserId(null);
    setFormData({ name: '', email: '', role: '' });
  };

  // 6. Handle Delete
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // 7. Filter Logic
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>User Management Playground</h1>
      
      {/* Form Section */}
      <div className="form-container">
        <h3>{isEditing ? "Edit User" : "Add New User"}</h3>
        <form onSubmit={handleSubmit}>
          <input 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="role" 
            placeholder="Role" 
            value={formData.role} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className={isEditing ? "update-btn" : ""}>
            {isEditing ? "Update User" : "Add User"}
          </button>
          {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      {/* Filter Section */}
      <div className="filter-container">
        <input 
          type="text"
          placeholder="Search by name or email..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;