const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files from the 'public' directory

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'options.html'));
});

app.post('/game/save', (req, res) => {
    const gameData = req.body;
    res.status(200).send({ message: 'Game data received', data: gameData });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
