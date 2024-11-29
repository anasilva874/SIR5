/**
 * @file appmlowdb.js
 * @description This file contains an implementation of a RESTful API for managing student records using lowDB.
 * @version 1.0.0
 * @date 2024-11-20
 * @author anasilva
 * @organization ESTG-IPVC
 */

// lowdb setup
import { JSONFilePreset } from 'lowdb/node';
const defaultData = { students: [{ id: 1, name: "marília", age: 30, study: "LEI" }] };
const db = await JSONFilePreset('students.json', defaultData);

// express setup
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static('public/'));

// routes
// get all students
app.get('/students', async (req, res) => {
    await db.read();
    res.json(db.data.students);
});

// get a student by id
app.get('/students/:id', async (req, res) => {
    await db.read();
    const student = db.data.students.find((student) => student._id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

// create a new student
app.post('/students', async (req, res) => {
    await db.read();
    const newStudent = req.body;
    newStudent._id = db.data.students.length ? db.data.students[db.data.students.length - 1]._id + 1 : 1;
    db.data.students.push(newStudent);
    await db.write();
    res.status(201).json(newStudent);
});

// update a student (by id)
app.put('/students/:id', async (req, res) => {
    await db.read();
    const id = parseInt(req.params.id);
    const index = db.data.students.findIndex((student) => student._id === id);
    if (index !== -1) {
        db.data.students[index] = { ...db.data.students[index], ...req.body };
        await db.write();
        res.json(db.data.students[index]);
    } else {
        res.status(404).send('Student not found');
    }
});

// delete a student by id
app.delete('/students/:id', async (req, res) => {
    await db.read();
    const id = parseInt(req.params.id);
    const index = db.data.students.findIndex((student) => student._id === id);
    if (index !== -1) {
        const deletedStudent = db.data.students.splice(index, 1);
        await db.write();
        res.json(deletedStudent);
    } else {
        res.status(404).send('Student not found');
    }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});