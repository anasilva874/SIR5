import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let db;

app.use(express.static('public'));


// Função para conectar ao MongoDB local
async function connectToMongoDB() {
    const url = 'mongodb://localhost:27017/studentsdb'; // Conexão com MongoDB local
    try {
        const client = new MongoClient(url);
        await client.connect();
        return client;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

// Middleware para configurar a coleção
function setCollection(req, res, next) {
    req.collection = db.collection('students');
    next();
}
app.use(setCollection);

// Iniciar o servidor e conectar ao MongoDB
async function startServer() {
    try {
        const client = await connectToMongoDB();
        db = client.db('studentsdb'); // Aqui, você usa o banco de dados 'studentsdb'
        console.log('Connected to MongoDB');
        
        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Lidar com erro de "address in use"
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.warn(`Port ${PORT} is in use, trying another port...`);
                server.listen(PORT + 1, () => {
                    console.log(`Server is now running on port ${PORT + 1}`);
                });
            } else {
                console.error('Failed to start server:', err);
                process.exit(1);
            }
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

await startServer();

// CRUD endpoints

// Get all students
app.get('/students', async (req, res) => {
    try {
        const students = await req.collection.find().toArray();
        res.json(students);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch students', details: err.message });
    }
});

// Get a student by ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await req.collection.findOne({ _id: new ObjectId(req.params.id) });
        if (student) {
            res.json(student);
        } else {
            res.status(404).send({ error: 'Student not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch student', details: err.message });
    }
});

// Create a new student
app.post('/students', async (req, res) => {
    try {
        const newStudent = req.body;
        const result = await req.collection.insertOne(newStudent);
        res.status(201).json(result.ops[0]); // Return the inserted document
    } catch (err) {
        res.status(500).send({ error: 'Failed to create student', details: err.message });
    }
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const result = await req.collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update },
            { returnDocument: 'after' }
        );
        if (result.value) {
            res.json(result.value); // Return the updated document
        } else {
            res.status(404).send({ error: 'Student not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Failed to update student', details: err.message });
    }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await req.collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).send({ error: 'Student not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete student', details: err.message });
    }
});
