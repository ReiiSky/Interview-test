function main() {
    const readline = require('readline-sync').question;
    const nextMove = [
        [ 1,  0],
        [ 0,  1],
        [-1,  0],
        [ 0, -1]
    ];

    let playerObject = createObject(1, 0);
    let S = validateS(readline("Masukan S: "));
    if(S == -1) {
        console.log("Please input the correct S!!")
        return;
    }
    let mazeArray = generateMazeByS(S);
    let move = getNextMove(nextMove, 0);
}


function drawMazeByPattern() {

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