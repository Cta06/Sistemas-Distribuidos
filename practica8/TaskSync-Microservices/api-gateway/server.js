const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/frontend'));

app.get('/tasks', async (req, res) => {
    const response = await axios.get('http://task-service:3001/tasks');
    res.json(response.data);
});

app.post('/tasks', async (req, res) => {
    const response = await axios.post(
        'http://task-service:3001/tasks',
        req.body
    );

    res.json(response.data);
});

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});