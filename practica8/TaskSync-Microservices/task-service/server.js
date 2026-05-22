const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    tasks.push(req.body);
    res.json(req.body);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.map(task =>
        task.id === id ? req.body : task
    );

    res.json({ message: 'Actualizada' });
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.json({ message: 'Eliminada' });
});

app.listen(3001, () => {
    console.log('Task Service running on port 3001');
});