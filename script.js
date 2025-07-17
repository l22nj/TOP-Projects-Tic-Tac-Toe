const gameboard = (function (usernameX="Player X", usernameO="Player O", dim=3) {

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

    const getTile = (x, y) => {return board[y][x] = x;}

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
            for (let j = 1; j < dim; ++j) {
                if (board[j][i] !== board[0][i]) bool = false;
            } if (bool) return board[0][i];
        }
        if ((board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
            (board[0][2] === board[1][1] && board[2][0] === board[1][1])) return board[1][1];
        return false;
    };

    const makeMoveX = function (x, y) {
        // if (totalMoves) SIIA VAJA % 2 JÄRGI TINGIMUST
        if (totalMoves < 9) {
            totalMoves++;
            setTileX(x, y);
            if (determineWinner()) {
                increaseWinCountX();
                return "X";
            }
        }
    }

    const makeMoveO = function (x, y) {
        if (totalMoves++ < 9) {
            setTileO(x, y);
            if (determineWinner()) {
                increaseWinCountO();
                return "O";
            } if (totalMoves === 9) return "draw";
        } console.log("Error: can't make a move, board is full");
    }

    const logBoard = () => {console.log(board);}

    return {getMoves, getTile, getWinCountX, getWinCountO, getNameX, getNameO,
    setNameX, setNameO, resetBoard, determineWinner, makeMoveX, makeMoveO, logBoard,
    increaseWinCountX, increaseWinCountO, decreaseWinCountX, decreaseWinCountO, setTileX, setTileO}; // this row not necessary in endproduct
})()