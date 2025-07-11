const game = createGameboard()

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

    return {rows, columns, board}
};
createGameboard()

function displayGameboard() {
    console.log(game.board)
};

function playerInput() {
    const placementX = parseInt(prompt("Choose row index where you want to place an X or O:"));
    const placementY = parseInt(prompt("Choose column index where you want to place an X or O:"));
    const choice = prompt("Choose X or O:");
    game.board[placementX][placementY] = choice;
}