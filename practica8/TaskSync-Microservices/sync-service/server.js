const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sync', (req, res) => {
    console.log('Sincronización ejecutada');

    res.json({
        status: 'Sincronización completada'
    });
});

app.listen(3002, () => {
    console.log('Sync Service running on port 3002');
});