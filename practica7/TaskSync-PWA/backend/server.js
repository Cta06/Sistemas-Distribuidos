const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/../frontend'));

let tasks = [];

// Obtener tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Crear tarea
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task);
});

// Actualizar tarea
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.map(t => t.id === id ? req.body : t);
    res.json({ message: "Actualizada" });
});

// Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: "Eliminada" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));