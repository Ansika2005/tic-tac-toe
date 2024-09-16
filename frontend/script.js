const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.getElementById('restart');
const quitBtn = document.getElementById('quitBtn'); 
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const updateStatusMessage = () => {
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkGameResult();
};

const checkGameResult = () => {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        //statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        alert(`Player ${currentPlayer} wins!`,100);
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!gameState.includes('')) {
        alert("Its a Draw!",100);
        gameActive = false;
        return;
    }

    // Change the player turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
};

// Restart the game
const restartGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => cell.innerHTML = '');
    updateStatusMessage();
};
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
quitBtn.addEventListener('click', () => {
    window.location.href = 'options.html'; 
});
updateStatusMessage();
