const gameboard = (function (usernameX="Player X", usernameO="Player O", dim=3) {
    // userid peaks võtma lahku X ja Y osast, et peale igat raundi pooltevahetus teha
    const board = (function () {
        const res = [];
        for (let i = 0; i < dim; i++) {
            res.push([]);
            for (let j = 0; j < dim; j++) {
                res[i].push('');
            }
        } return res;
    })();

    function setTileTemplate(char) {
        return function(x, y) {
            board[y][x] = char;
        }
    }

    const setTileX = setTileTemplate('X');
    const setTileO = setTileTemplate('O');

    const getTile = (x, y) => {return board[y][x];}

    let gameOver = false;

    let totalMoves = 0;

    const getMoves = () => {return totalMoves;}

    let winCountX = 0;
    let winCountO = 0;

    const getWinCountX = () => {return winCountX;}
    const getWinCountO = () => {return winCountO;}

    const increaseWinCountX = () => {++winCountX;}
    const decreaseWinCountX = () => {if (winCountX > 0) --winCountX;}
    const increaseWinCountO = () => {++winCountO;}
    const decreaseWinCountO = () => {if (winCountO > 0) --winCountO;}

    const getNameX = () => {return usernameX;}
    const getNameO =  () => {return usernameO;}

    const setNameX = (newName) => {
        console.log("Old name: " + usernameX);
        usernameX = newName;
        console.log("New name: " + usernameX);
    }
    const setNameO = (newName) => {
        console.log("Old name: " + usernameO);
        usernameO = newName;
        console.log("New name: " + usernameO);
    }

    const resetBoard = () => {
        totalMoves = 0;
        gameOver = false;
        for (let i = 0; i < dim; ++i) {
            for (let j = 0; j < dim; ++j) {
                board[i][j] = "";
            }
        }
    }

    const determineWinner = () => {
        let bool = true;
        for (let i = 0; i < dim; ++i) {
            bool = true;
            if (board[i][2] === board[i][0] && board[i][1] === board[i][0]) {
                return board[i][0];
            }
            for (let j = 1; j < dim; ++j) {
                if (board[j][i] !== board[0][i]) bool = false;
            } if (bool) return board[0][i];
        }
        if ((board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
            (board[0][2] === board[1][1] && board[2][0] === board[1][1])) return board[1][1];
        return false;
    };

    const makeMoveX = function (x, y) {
        if (gameOver) {
            console.log("Error: game is over! Start a new game.");
            return;
        }
        if (totalMoves % 2 === 1) {
            console.log("Error: other player's turn!");
            return;
        }
        if (getTile(x, y) !== "") {
            console.log("Error: choose another tile.");
            return;
        }
        if (totalMoves < 9) {
            totalMoves++;
            setTileX(x, y);
            if (determineWinner()) {
                increaseWinCountX();
                gameOver = true;
                return "X";
            } if (totalMoves === 9) {
                gameOver = true;
                return "draw";
            }
        } else console.log("Error: can't make a move, board is full");
    }

    const makeMoveO = function (x, y) {
        if (gameOver) {
            console.log("Error: game is over! Start a new game.");
            return;
        }
        if (totalMoves % 2 === 0) {
            console.log("Error: other player's turn!");
            return;
        }
        if (getTile(x, y) !== "") {
            console.log("Error: choose another tile.");
            return;
        }
        if (totalMoves < 9) {
            totalMoves++;
            setTileO(x, y);
            if (determineWinner()) {
                increaseWinCountO();
                gameOver = true;
                return "O";
            } if (totalMoves === 9) {
                gameOver = true;
                return "draw";
            }
        } else console.log("Error: can't make a move, board is full");
    }

    const makeMove = function (x, y) {
        if (totalMoves % 2 === 0) makeMoveX(x, y);
        else makeMoveO(x, y);
    }

    const logBoard = () => {console.log(board);}

    return {getMoves, getTile, getWinCountX, getWinCountO, getNameX, getNameO,
    setNameX, setNameO, resetBoard, determineWinner, makeMove, logBoard,
    increaseWinCountX, increaseWinCountO, decreaseWinCountX, decreaseWinCountO, setTileX, setTileO, makeMoveX, makeMoveO};
    // last row not necessary in end product
})()

