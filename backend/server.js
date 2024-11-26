// server.j

const createEmployee = require('./Controllers/EmployeeServices')
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Create an instance of express
const app = express();

// Middleware
app.use(express.json()); // for parsing JSON bodies
app.use(cors()); // for enabling CORS

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email:{type:String,required:true,unique:true},
  password: { type: String, required: true }
});

// User Model
const User = mongoose.model('User', userSchema);

// Sign Up Route
app.post('/api/auth/signup', async (req, res) => {
  console.log(req.body);
  
  const {name,email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ name });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10);



  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }

});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.post('/api/createmployee',async(req,res)=>{
  createEmployee(req,res);
});

app.get('/api/displayemployee',async(req,res)=>{
  createEmployee.displayEmployee(req,res)
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
