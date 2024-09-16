const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files from the 'public' directory

// Serve the main HTML file (index.html)
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'options.html'));
});

// Serve the game page (game.html)

// Optional API to store game result or settings
app.post('/game/save', (req, res) => {
    const gameData = req.body;
    // Here you could save the game data to a database if required
    res.status(200).send({ message: 'Game data received', data: gameData });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
