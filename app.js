function main() {
    const readline = require('readline-sync').question;
    const nextMove = [
        [ 1,  0],
        [ 0,  1],
        [-1,  0],
        [ 0, -1]
    ];

    let playerObject = createObject(1, -1);
    let S = validateS(readline("Masukan S: "));
    if(S == -1) {
        console.log("Please input the correct S!!")
        return;
    }
    let mazeArray = generateMazeByS(S);
    let move = getNextMove(nextMove, 0);
    drawMazeByPattern(playerObject, mazeArray, nextMove, move);
}


function drawMazeByPattern(player = {}, maze = [[String]], movePossibility = [[Number]], move = [Number]) {
    let status = turnAround(player, maze, move);
    if(status == -1) {
        printMaze(maze);
        return;
    } else {
        if(status == 1) {
            move = getNextMove(movePossibility, move);
        } else {
            player.x += move[1];
            player.y += move[0];
            maze[player.y][player.x] = " ";
        }
        drawMazeByPattern(player, maze, movePossibility, move);
    }
}

function turnAround(player = {}, maze = [[String]], move = [Number]) {
    let center = parseInt(maze.length / 2) + 1;
    if(maze[center][center] != " ") {
        let nextStatus;
        let doubleNextStatus;

        if(move[1] == 0 && move[0] != 0) {
            nextStatus       = maze[player.y+move[0]][player.x];
            doubleNextStatus = maze[player.y+move[0] * 2] != undefined 
                               ? maze[player.y+move[0] * 2][player.x] : " ";
        } else if(move[1] != 0 && move[0] == 0) {
            nextStatus       = maze[player.y][player.x+move[1]];
            doubleNextStatus = maze[player.y][player.x+move[1]*2] || " ";
        }
        if(nextStatus == "@" && doubleNextStatus == "@") {
            return 0;
        } else if(nextStatus == "@" && doubleNextStatus == " ") {
            return 1;
        }
    } 
    return -1;
}

function printMaze(maze = [[String]]) {
    for(let i = 0; i< maze.length; ++i) {
        console.log(maze[i].join(""));
    }
}

function getNextMove(move = [], lastMove = 0) {
    if(Number.isInteger(lastMove)) {
        return move[lastMove];
    } else if (Array.isArray(lastMove)) {
        return move[(move.indexOf(lastMove) + 1) % move.length];
    }
}

function generateMazeByS(S = Number){
    let maze = [];
    for(let i = 0; i< S; ++i) {
        maze.push(Array(S).fill("@"));
    }
    return maze;
}

function validateS(S = String()) {
    let parsed = Number.parseInt(S);
    let result = -1;
    if(!Number.isNaN(parsed)) {
        let n = (parsed + 1) / 4;
        if(Number.isInteger(n) && n >= 1) {
            result = parsed;
        }   
    }
    return result;
}

function createObject(x = 0, y = 0) {
    return {
        x: x,
        y: y
    };
}

main();