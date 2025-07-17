const gameboard = (function (username1="Player 1", username2="Player 2", dim=3) {

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

    let playerCharacters = 1; // 1 === Player 1: 'X',  Player 2: 'O' ;; 0 === Player 1: 'O', Player 2: 'X'
    let gameOver = false;

    let totalMoves = 0;

    const getMoves = () => {return totalMoves;}

    let winCount1 = 0;
    let winCount2 = 0;

    const getWinCount1 = () => {return winCount1;}
    const getWinCount2 = () => {return winCount2;}

    const increaseWinCount1 = () => {++winCount1;}
    const decreaseWinCount1 = () => {if (winCount1 > 0) --winCount1;}
    const increaseWinCount2 = () => {++winCount2;}
    const decreaseWinCount2 = () => {if (winCount2 > 0) --winCount2;}

    const getName1 = () => {return username1;}
    const getName2 =  () => {return username2;}

    const setName1 = (newName) => {
        console.log("Old name: " + username1);
        username1 = newName;
        console.log("New name: " + username1);
    }
    const setName2 = (newName) => {
        console.log("Old name: " + username2);
        username2 = newName;
        console.log("New name: " + username2);
    }

    const resetBoard = () => {
        totalMoves = 0;
        gameOver = false;
        if (playerCharacters) playerCharacters = 0;
        else playerCharacters = 1;
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
                if (playerCharacters) increaseWinCount1();
                else increaseWinCount2();
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
                if (playerCharacters) increaseWinCount2();
                else increaseWinCount1();
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

    return {getMoves, getTile, getWinCount1, getWinCount2, getName1, getName2,
    setName1, setName2, resetBoard, determineWinner, makeMove, logBoard,
    increaseWinCount1, increaseWinCount2, decreaseWinCount1, decreaseWinCount2, setTileX, setTileO, makeMoveX, makeMoveO};
    // last row not necessary in end product
})()

