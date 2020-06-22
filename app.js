// Test untuk interview
// Membentuk maze dengan jalan spiral


//fungsi main dipanggil untuk mempermudah struktur program
function main() {
    //module readline untuk input
    const readline = require('readline-sync').question;
    
    //pola arah yang diketahui
    const nextMove = [
        //bergerak kebawah
        [ 1,  0],
        //bergerak kekanan
        [ 0,  1],
        //bergerak keatas
        [-1,  0],
        //bergerak kekiri
        [ 0, -1]
    ];

    //variable yang menyimpan lokasi objek dalam maze (x, y)
    //lokasi objek pertama ada di maze (kiri + 1) (atas - 1)
    let playerObject = createObject(1, -1);

    //memvalidasi nilai input dengan rumus (4n - 1)
    let S = validateS(readline("Masukan S: "));


    if(S == -1) {
        //jika input gagal
        console.log("Please input the correct S!!")
        return;
    }

    //menginisialisasi bentuk maze awal sesuai jumlah S
    let mazeArray = generateMazeByS(S);

    //ambil arah untuk langkah pertama
    let move = getNextMove(nextMove, 0);

    //menggambar pola maze berdasarkan pola nextMove yang sudah diketahui
    //menggambar secara rekursif selama status bukan -1
    drawMazeByPattern(playerObject, mazeArray, nextMove, move);
}

//fungsi untuk menggambar pola di maze
function drawMazeByPattern(player = {}, maze = [[String]], movePossibility = [[Number]], move = [Number]) {

    //mengambil status menggunakan fungsi maze
    // status == -1 berarti selesai
    // status ==  0 berarti tetap lurus
    // status ==  1 berarti ganti arah sesuai move[]
    let status = turnAround(player, maze, move);
    if(status == -1) {
        printMaze(maze);
        return;
    } else {
        if(status == 1) {
            //ambil move yang berikutnya
            move = getNextMove(movePossibility, move);
        } else {

            //increment posisi player berdasarkan arah
            player.x += move[1];
            player.y += move[0];

            //buat pola di maze berdasarkan posisi player dengan " "
            maze[player.y][player.x] = " ";
        }

        // panggil fungsi ini sampai status == -1
        drawMazeByPattern(player, maze, movePossibility, move);
    }
}

function turnAround(player = {}, maze = [[String]], move = [Number]) {

    //mengambil index center dalam maze
    let center = parseInt(maze.length / 2) + 1;

    //jika maze di tengah " "
    if(maze[center][center] != " ") {

        // mengambil status di depan player posisi saat ini berdasarkan arahnya
        let nextStatus;
        // mengambil status dua kali di depannya player posisi saat ini berdasarkan arahnya
        let doubleNextStatus;

        //mengecek arah
        //bergerak vertical
        if(move[1] == 0 && move[0] != 0) {
            nextStatus       = maze[player.y+move[0]][player.x];
            doubleNextStatus = maze[player.y+move[0] * 2] != undefined 
                               ? maze[player.y+move[0] * 2][player.x] : " ";


        //bergerak horizontal
        } else if(move[1] != 0 && move[0] == 0) {
            nextStatus       = maze[player.y][player.x+move[1]];
            doubleNextStatus = maze[player.y][player.x+move[1]*2] || " ";
        }

        //jika status di depan nya dan didepanya lagi masih "@"
        //lanjut jalan lurus berdasarkan arah
        if(nextStatus == "@" && doubleNextStatus == "@") {
            return 0;
        //jika status di depan nya dan didepanya lagi " "
        //putar arah berdasarkan move pattern
        } else if(nextStatus == "@" && doubleNextStatus == " ") {
            return 1;
        }
    } 

    //selesai
    return -1;
}


//fungsi untuk print maze
function printMaze(maze = [[String]]) {
    for(let i = 0; i< maze.length; ++i) {
        console.log(maze[i].join(""));
    }
}

//mengambil langkah berikutnya berdasarkan langkah yang sekarang
function getNextMove(move = [], lastMove = 0) {
    //jika lastmove adalah integer berarti akan mengambil langkah berdasarkan index
    if(Number.isInteger(lastMove)) {
        return move[lastMove];
    } else if (Array.isArray(lastMove)) {
    // jika lastmove adalah array yang ada di dalam variable move
    // fungsi akan mereturn element move selanjutnya
    // jika index move yang sekarang lebih besar dari move.length maka akan di mod menjadi 0 atau berulang
        return move[(move.indexOf(lastMove) + 1) % move.length];
    }
}

//membuat maze tanpa pattern berdasarkan nilai S
function generateMazeByS(S = Number){
    let maze = [];
    for(let i = 0; i< S; ++i) {
        maze.push(Array(S).fill("@"));
    }
    return maze;
}

//fungsi untuk memvalidasi nilai S
//return -1 artinya input salah
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

//fungsi untuk inisialisasi atau membuat player object
function createObject(x = 0, y = 0) {
    return {
        x: x,
        y: y
    };
}


//memanggil main() untuk menjalankan seluruh program
main();