const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const quitBtn = document.getElementById('quitBtn'); 
const player = 'X';
const computer = 'O';
let board = Array(9).fill(null);
let gameActive = true;

// Winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Check for a winner
function checkWin(board, player) {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

// Check for a draw
function checkDraw(board) {
    return board.every(cell => cell !== null);
}

// Handle player move
function handlePlayerMove(index) {
    if (!board[index] && gameActive) {
        board[index] = player;
        updateBoard();
        if (checkWin(board, player)) {
            setTimeout(() => alert("You win!"), 100);
            gameActive = false;
        } else if (checkDraw(board)) {
            setTimeout(() => alert("It's a draw!"), 100);
            gameActive = false;
        } else {
            setTimeout(computerMove, 500); // Give a delay for the computer's move
        }
    }
}

// Random AI move (Simple AI)
function computerMove() {
    if (!gameActive) return;
    
    let availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    if (availableMoves.length > 0) {
        let randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[randomIndex] = computer;
        updateBoard();
        if (checkWin(board, computer)) {
            setTimeout(() => alert("Computer wins!"), 100);
            gameActive = false;
        } else if (checkDraw(board)) {
            setTimeout(() => alert("It's a draw!"), 100);
            gameActive = false;
        }
    }
}

// Update the UI board
function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Restart the game
restartBtn.addEventListener('click', () => {
    board = Array(9).fill(null);
    gameActive = true;
    updateBoard();
});

quitBtn.addEventListener('click', () => {
    window.location.href = 'options.html'; 
});

// Add event listeners to cells for player moves
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handlePlayerMove(index));
});
