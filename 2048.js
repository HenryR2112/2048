var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // board = [
    //          [2, 2, 2, 2],
    //          [2, 2, 2, 2],
    //          [4, 4, 8, 8],
    //          [4, 4, 8, 8]
    //      ]


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            //convert to a div tag with cordinate grid system (row, column)
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);


        }
    }

    start();
    start();
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function start() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    while (!found) {
        //find random value
        let r = Math.floor(Math.random() * rows);//math.random gives a decimal between 0-1 and floor floors it out and rows is 4 so it will decide on a row or column to generate the random 2
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("T2");
            found = true;
        }
    }

}


function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the class list
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("T" + num.toString());
        } else {
            tile.classList.add("T4096")
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        start();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        start();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        start();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        start();
    }
    document.getElementById("score").innerText = score;
})


function RemoveZero(row) {
    return row.filter(num => num != 0) //creates new array without 0
}

function slide(row) {
    //remove zeros
    row = RemoveZero(row);
    //slide
    for (let i = 0; i < row.length; i++)
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }

    row = RemoveZero(row);
    //add zeroes now
    while (row.length < columns) {
        row.push(0)
    }
    return row;
}


function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}


