const game = createGameboard();

function createGameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push("")
        }
        board.push(row)
    }

    function displayGameboard() {
        console.clear();
        board.forEach(row => console.log(row.join(' | ')))
        
    }

    function updateGameboard(x, y, symbol) {
        if (board[x][y] === "") {
            board[x][y] = symbol
            return true
        } else {
            console.log("Cell already taken. Pick another.")
            return false
        };

    };

    function checkWinner(symbol) { 
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === symbol)) return true
        if (board.map(row => row[i]).every(cell => cell === symbol))return true
    }

    if ([1, 2, 3].every(i => board[i][i] === symbol)) return true
    if ([1, 2, 3].every(i => board[i][2-i] === symbol)) return true

    return false
}

    function isBoardFull() {
        return board.flat().every(cell => cell != "")
    }

    return {board, displayGameboard, updateGameboard, checkWinner, isBoardFull}
};

function createPlayers(name, symbol) {
    return {name, symbol};
};


const playerOne = createPlayers("Player One", "X");
const playerTwo = createPlayers("Player Two", "O");
let currentPlayer = playerOne;

function gameStart() {
    
    game.displayGameboard();
    console.log(`${currentPlayer.name}'s turn to place an ${currentPlayer.symbol}.`)
    
};
    


const container = document.querySelector(".container");

//create divs with game board cell index references

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const div = document.createElement('div')
        div.id = `cell-${i}-${j}`
        div.classList.add('board-cell')
        div.textContent = `${i}, ${j}`;
        div.dataset.x = `${i}`
        div.dataset.y = `${j}`
        container.appendChild(div);

    }
};



//Update gameboard based on which div is clicked. Associated by unique x and y dataset values that were created for each div. Call updateGameboard function
  container.addEventListener("click", function(event) {
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;

    const openCell = game.updateGameboard(x, y, currentPlayer.symbol);

    if (!openCell) return
    event.target.textContent = currentPlayer.symbol

        if (game.checkWinner(currentPlayer.symbol)) {
            game.displayGameboard();
            console.log(`${currentPlayer.name} wins!`);
            return
         }

        if(game.isBoardFull() === true) {
            game.displayGameboard();
            console.log("It's a tie!");
            return
            
        }
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    game.displayGameboard()
    console.log(`${currentPlayer.name}'s turn to place an ${currentPlayer.symbol}.`)
    
    }   

   
);

const startButton = document.createElement("button")
startButton.classList.add('start-button')
startButton.textContent = "Start Game"
document.body.append(startButton)

startButton.addEventListener('click', function() {
    gameStart();
})

