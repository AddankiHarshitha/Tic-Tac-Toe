


// script.js

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id.split("-")[1]);

    // Ensure the cell is not already taken
    if (gameState[cellIndex] || checkWinner()) return;

    // Mark the cell and update the game state
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    // Check for a winner or tie
    if (checkWinner()) {
        alert('${currentPlayer} wins!');
    } else if (gameState.every(cell => cell)) {
        alert("It's a tie!");
    } else {
        // Switch players
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// Restart the game
function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    currentPlayer = "X";
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
