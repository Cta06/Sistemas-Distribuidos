const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/status', (req, res) => {
    res.json({
        service: 'Notification Service',
        status: 'Activo'
    });
});

app.listen(3003, () => {
    console.log('Notification Service running on port 3003');
});