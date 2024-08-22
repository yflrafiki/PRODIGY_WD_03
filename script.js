// Initial game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning conditions
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

// DOM elements
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    updateCell(cell, index);
    checkResult();
}

// Update cell
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Check for win or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player X's turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// AI Opponent (Simple Random Move)
function aiMove() {
    if (!gameActive) return;

    let availableCells = [];

    board.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const aiChoice = availableCells[randomIndex];

    if (aiChoice !== undefined) {
        board[aiChoice] = currentPlayer;
        cells[aiChoice].textContent = currentPlayer;
        checkResult();
    }
}

// Uncomment to play against AI
// cells.forEach(cell => cell.addEventListener('click', () => {
//     setTimeout(aiMove, 500);
// }));
