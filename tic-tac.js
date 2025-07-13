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
        if (board.map(row => row[i] === symbol)) return true
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
createGameboard()

function createPlayers(name, symbol) {
    return {name, symbol};
};



function gameLoop() {
    const playerOne = createPlayers("Player One", "X");
    const playerTwo = createPlayers("Player Two", "O");
    let currentPlayer = playerOne;

    while(true) {
        game.displayGameboard();
        console.log(`${currentPlayer.name}'s turn to place an ${currentPlayer.symbol}.`)
        const x = parseInt(prompt("Select a row (0-2):"))
        const y = parseInt(prompt("Select a column (0-2):"))

        if (isNaN(x) || isNaN(y) || x > 2 || y > 2 || x < 0 || y < 0) {
            console.log("Pick a valid cell.");
            continue
        };

        const confirmedMove = game.updateGameboard(x, y, currentPlayer.symbol);
        if (!confirmedMove) continue
    }
}

