const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const playerXScoreDisplay = document.querySelector("#playerXScore");
const playerOScoreDisplay = document.querySelector("#playerOScore");
const roundCounter = document.querySelector("#roundCounter");
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
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let running = false;
let playerXScore = 0;
let playerOScore = 0;
let round = 0;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    statusText.textContent = `${currentPlayer}'s turn`;
    roundCounter.textContent = round;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            winningCells = [condition[0], condition[1], condition[2]];
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        if (currentPlayer === "X") {
            playerXScore += 3;
            playerXScoreDisplay.textContent = playerXScore;
        } else {
            playerOScore += 3;
            playerOScoreDisplay.textContent = playerOScore;
        }
        running = false;

        for (let i = 0; i < winningCells.length; i++) {
            const cellIndex = winningCells[i];
            cells[cellIndex].style.backgroundColor = "lightblue";
        }
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        playerXScore++;
        playerOScore++;
        playerXScoreDisplay.textContent = playerXScore;
        playerOScoreDisplay.textContent = playerOScore;
        running = false;
    } else {
        changePlayer();
    }
}


function restartGame(){
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    round++;
    roundCounter.textContent = round;
}
