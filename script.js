// Select the game board container, all individual cells, the status text, and the restart button
const gameBoard = document.querySelector("#game-board");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

// Initialize the game board as an array with empty strings to represent each cell
let board = ["", "", "", "", "", "", "", "", ""]; // Represents the current state of the board
let currentPlayer = "X"; // Keeps track of whose turn it is, starting with player "X"
let isGameActive = true; // Controls whether the game is ongoing or finished

// Define all possible winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Function to handle a player's move when they click on a cell
function handleCellClick(event) {
  const cell = event.target; // Get the clicked cell
  const index = cell.dataset.index; // Get the cell's index from the `data-index` attribute

  // If the cell is already taken or the game is over, do nothing
  if (board[index] !== "" || !isGameActive) return;

  // Update the board array with the current player's symbol
  board[index] = currentPlayer;
  cell.textContent = currentPlayer; // Display the player's symbol in the cell

  // Check if the move resulted in a win or a draw
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`; // Update the status text
    isGameActive = false; // Stop further moves
  } else if (board.every(cell => cell !== "")) { // Check if all cells are filled
    statusText.textContent = "It's a Draw!"; // Declare a draw
    isGameActive = false; // Stop further moves
  } else {
    // Switch to the other player and update the status text
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Function to check if the current player has won
function checkWin() {
  return WINNING_COMBINATIONS.some(combination => {
    // Check if all the cells in a winning combination have the current player's symbol
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Function to restart the game
function restartGame() {
  // Reset the board array to all empty strings
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X"; // Set the first player back to "X"
  isGameActive = true; // Allow the game to start again
  statusText.textContent = `Player X's Turn`; // Reset the status text
  // Clear all cell contents
  cells.forEach(cell => (cell.textContent = ""));
}

// Add event listeners to each cell to handle clicks
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

// Add an event listener to the restart button to reset the game
restartButton.addEventListener("click", restartGame);