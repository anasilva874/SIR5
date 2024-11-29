import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// URI de conexão do MongoDB Atlas
const dbURI = "mongodb+srv://Ana:Lisboa.16@cluster0.o06auxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || process.env.MONGODB_ATLAS_URI;
if (!dbURI) {
    throw new Error('MongoDB connection URI is not defined in the .env file');
}

// Conectar ao MongoDB Atlas com Mongoose
mongoose
    .connect(dbURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => {
        console.error("❌ Failed to connect to MongoDB Atlas:");
        console.error("➡ Error message:", err.message);
        process.exit(1); // Encerrar o processo em caso de erro crítico
    });

// Schema e Model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    study: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Endpoint para obter todos os estudantes
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find(); // Consulta todos os estudantes
        res.status(200).json(students); // Retorna os dados dos estudantes
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch students', details: err.message });
    }
});


// Endpoint para atualizar um estudante
app.put('/students/:id', async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da rota
    const { name, age, study } = req.body; // Extrai os dados do corpo da requisição

    try {
        // Atualiza o estudante no MongoDB
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, study },
            { new: true, runValidators: true } // Retorna o novo documento e valida os dados
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(updatedStudent); // Retorna o estudante atualizado
    } catch (err) {
        res.status(500).json({ error: 'Failed to update student', details: err.message });
    }
});

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

app.post('/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create student', details: err.message });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
