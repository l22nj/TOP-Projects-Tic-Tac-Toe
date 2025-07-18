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
    let winnerNr = 0; // 0 === game ongoing; 1 === player 1 won last; 2 === player 2 won last

    let totalMoves = 0;

    const getMoves = () => {return totalMoves;}

    let winCount1 = 0;
    let winCount2 = 0;

    const getWinCount1 = () => {return winCount1;}
    const getWinCount2 = () => {return winCount2;}

    const increaseWinCount1 = () => {
        ++winCount1;
        winnerNr = 1;
    }
    const decreaseWinCount1 = () => {if (winCount1 > 0) --winCount1;}
    const increaseWinCount2 = () => {
        ++winCount2;
        winnerNr = 2;
    }
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
        if (winnerNr) {
            if (playerCharacters) playerCharacters = 0;
            else playerCharacters = 1;
            winnerNr = 0;
        }
        for (let i = 0; i < dim; ++i) {
            for (let j = 0; j < dim; ++j) {
                board[i][j] = "";
            }
        } updateDisplay();
    }

    const determineWinner = () => {
        for (let i = 0; i < dim; ++i) {
            if (board[i][2] === board[i][0] && board[i][1] === board[i][0] && board[i][0]) {
                return board[i][0];
            }
            if (board[1][i] === board[0][i] && board[2][i] === board[0][i] && board[0][i]) {
                return board[i][0];
            }
        }
        if ((board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
            (board[0][2] === board[1][1] && board[2][0] === board[1][1])) return board[1][1];
        return false;
    };

    const makeMoveX = function (x, y) {
        if (winnerNr) {
            console.log("Error: game is over! Start a new game.");
            return;
        }
        if (totalMoves % 2 === 1) {
            console.log("Error: other player's turn!");
            return;
        }
        if (getTile(x, y)) {
            console.log("Error: choose another tile.");
            return;
        }
        if (totalMoves < 9) {
            totalMoves++;
            setTileX(x, y);
            if (determineWinner()) {
                if (playerCharacters) increaseWinCount1();
                else increaseWinCount2();
                return "X";
            } if (totalMoves === 9) {
                return "draw";
            }
        } else console.log("Error: can't make a move, board is full");
    }

    const makeMoveO = function (x, y) {
        if (winnerNr) {
            console.log("Error: game is over! Start a new game.");
            return "";
        }
        if (totalMoves % 2 === 0) {
            console.log("Error: other player's turn!");
            return "";
        }
        if (getTile(x, y)) {
            console.log("Error: choose another tile.");
            return "";
        }
        if (totalMoves < 9) {
            totalMoves++;
            setTileO(x, y);
            if (determineWinner()) {
                if (playerCharacters) increaseWinCount2();
                else increaseWinCount1();
                return "O";
            } if (totalMoves === 9) {
                winnerNr = 3;
                return "draw";
            }
        } else console.log("Error: can't make a move, board is full");
    }

    const makeMove = function (x, y) {
        if (totalMoves % 2 === 0) makeMoveX(x, y);
        else makeMoveO(x, y);
        if (determineWinner()) updateDisplay();
        else updateBoardDisplay();
    }

    const logBoard = () => {console.log(board);}

    const updateBoardDisplay = function() {
        let htmlBoard = document.querySelector(".tic-tac-toe");
        while (htmlBoard.firstChild) {
            htmlBoard.removeChild(htmlBoard.lastChild);
        }
        for (let i = 0; i < dim; ++i) {
            for (let j = 0; j < dim; ++j) {
                let tile = document.createElement("button");
                let tileText = document.createElement("span");

                tile.classList.add("tile");
                tile.setAttribute("id", `${j}-${i}`);
                if (board[i][j]) tileText.innerText = board[i][j];
                else tileText.innerHTML = "&#8203;";

                tile.addEventListener("click", () => {makeMove(j, i);})

                tile.appendChild(tileText);
                htmlBoard.appendChild(tile);
            }
        }
    }

    const updateDisplay = function() {

        updateBoardDisplay();

        let player1Text = document.querySelector(".player1");
        player1Text.innerText = username1;
        player1Text.addEventListener("click", () => {
            let newName = prompt("Set a new username!");
            if (newName) {
                setName1(newName);
                updateDisplay();
            }
        });

        let player2Text = document.querySelector(".player2");
        player2Text.innerText = username2;
        player2Text.addEventListener("click", () => {
            let newName = prompt("Set a new username!");
            if (newName) {
                setName2(newName);
                updateDisplay();
            }
        });

        document.querySelector(".player1-char").innerText =
            playerCharacters ? 'X': 'O';
        document.querySelector(".player2-char").innerText =
            playerCharacters ? 'O': 'X';

        document.querySelector(".player1-wc").innerText = winCount1;
        document.querySelector(".player2-wc").innerText = winCount2;

        let winnerText = document.querySelector(".winner-text");
        if (winnerNr === 1) {
            winnerText.innerText = `${username1} won!`;
        } else if (winnerNr === 2) {
            winnerText.innerText = `${username2} won!`;
        } else if (winnerNr === 3) {
            winnerText.innerText = "Draw!";
        }
        else {
            winnerText.innerText = '';
        }
    }

    return { getMoves, getTile, getWinCount1, getWinCount2, getName1, getName2,
    setName1, setName2, resetBoard, determineWinner, makeMove, logBoard, updateDisplay,
    increaseWinCount1, increaseWinCount2, decreaseWinCount1, decreaseWinCount2, setTileX, setTileO, makeMoveX, makeMoveO
    };
    // return {resetBoard}; // this is actually enough for regular playing
})()

document.querySelector(".new-game").addEventListener("click", function () {
    gameboard.resetBoard();
})

// gameboard.updateDisplay()

