const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const quitBtn = document.getElementById('quitBtn'); 
const player = 'X';
const computer = 'O';
let board = Array(9).fill(null);
let gameActive = true;

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

// Minimax algorithm to choose the best move for AI
function minimax(newBoard, isMaximizing) {
    // Check for terminal states
    if (checkWin(newBoard, computer)) {
        return { score: 1 };  // Computer wins
    } else if (checkWin(newBoard, player)) {
        return { score: -1 }; 
    } else if (checkDraw(newBoard)) {
        return { score: 0 };  // It's a draw
    }

    const availableMoves = newBoard.map((cell, index) => cell === null ? index : null).filter(index => index !== null);

    if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove = null;

        availableMoves.forEach(index => {
            newBoard[index] = computer;
            let result = minimax(newBoard, false);
            newBoard[index] = null;

            if (result.score > bestScore) {
                bestScore = result.score;
                bestMove = index;
            }
        });

        return { move: bestMove, score: bestScore };
    } else {
        let bestScore = Infinity;
        let bestMove = null;

        availableMoves.forEach(index => {
            newBoard[index] = player;
            let result = minimax(newBoard, true);
            newBoard[index] = null;

            if (result.score < bestScore) {
                bestScore = result.score;
                bestMove = index;
            }
        });

        return { move: bestMove, score: bestScore };
    }
}

// AI makes the best move using Minimax
function computerMove() {
    if (!gameActive) return;

    let bestMove = minimax(board, true).move;
    if (bestMove !== null) {
        board[bestMove] = computer;
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
