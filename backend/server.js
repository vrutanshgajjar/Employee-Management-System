const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1/prodigytask2", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Employee schema and model
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  department: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post('/api/employees', async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).json(newEmployee);
});

app.get('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

app.put('/api/employees/:id', async (req, res) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedEmployee);
});

app.delete('/api/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
