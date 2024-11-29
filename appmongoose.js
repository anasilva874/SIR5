/**
 * @file appmongoose.js
 * @description This file contains a starter implementation of a RESTful API for managing student records using MongoDB.
 * @version 1.0.0
 * @date 2024-11-20
 * @author anasilva
 * @organization ESTG-IPVC
 */

// mongoose setup
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/studentsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process if connection fails
  });

// Define the Student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    study: { type: String, required: true }
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);


// CRUD endpoints
// Get all students
app.get('/students', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch students', details: err.message });
    }
  });
  
  // Get a student by ID
  app.get('/students/:id', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch student', details: err.message });
    }
  });
  
  // Create a new student
  app.post('/students', async (req, res) => {
    try {
      const newStudent = new Student(req.body);
      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create student', details: err.message });
    }
  });
  
  // Update a student by ID
  app.put('/students/:id', async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      });
      if (updatedStudent) {
        res.status(200).json(updatedStudent);
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (err) {
      res.status(400).json({ error: 'Failed to update student', details: err.message });
    }
  });
  
  // Delete a student by ID
  app.delete('/students/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (deletedStudent) {
        res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete student', details: err.message });
    }
  });
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });