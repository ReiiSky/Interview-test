function main() {
    const readline = require('readline-sync').question;

    let playerObject = createObject(1, 0);
    let S = validateS(readline("Masukan S: "));
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