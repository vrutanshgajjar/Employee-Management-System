const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  const { name, email, position, department } = req.body;
  try {
    const newEmployee = new Employee({ name, email, position, department });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, position, department } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, position, department }, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received DELETE request for id:', id); // Log the received id
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      console.log('Employee not found for id:', id);
      return res.status(404).json({ error: 'Employee not found' });
    }
    await Employee.findByIdAndDelete(id);
    console.log('Successfully deleted employee with id:', id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(400).json({ error: err.message });
  }
});







module.exports = router;
