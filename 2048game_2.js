const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 750;
//global vars
const size = 4;
const cellGap = 5;
var fontSize;
var score = 0;
var cells = [];
var lose = false;
var cellSize = canvas.width/4;
var gameOver = false;
const statusBar = {
    width: canvas.width,
    height: cellSize
}



class Cell{
    constructor(row, coll){
        this.value = 0;
        this.x = coll * cellSize;
        this.y = cellSize + (row*cellSize);
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(){
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
function createCells(){
    var i,j;
    for (i = 0; i < size; i++){
        cells[i] = [];
        for (j = 0; j < size; j++){
            cells[i][j] = new Cell(i, j);
        }
    }
}
createCells();
function drawCell(cell){
    ctx.beginPath();
    ctx.rect(cell.x+cellGap, cell.y+cellGap, cellSize-cellGap, cellSize-cellGap);
    switch (cell.value){
        case 0 : ctx.fillStyle = '#fbff00'; break;
        case 2 : ctx.fillStyle = '#ffe100'; break;
        case 4 : ctx.fillStyle = '#ffc800'; break;
        case 8 : ctx.fillStyle = '#ffa600'; break;
        case 16 : ctx.fillStyle = '#ff8c00'; break;
        case 32 : ctx.fillStyle = '#ff7700'; break;
        case 64 : ctx.fillStyle = '#ff5e00'; break;
        case 128 : ctx.fillStyle = '#ff4400'; break;
        case 256 : ctx.fillStyle = '#ff2a00'; break;
        case 512 : ctx.fillStyle = '#ff0400'; break;
        case 1024 : ctx.fillStyle = '#d41815'; break;
        case 2048 : ctx.fillStyle = '#c42a27'; break;
        case 4096 : ctx.fillStyle = '#992a28'; break;
        default : ctx.fillStyle = '#ff0400';
    }
    ctx.fill();
    if (cell.value){
        fontSize = cellSize/2;
        ctx.font = fontSize + 'px Arial';
        ctx.fillStyle = 'black';
        ctx.textAllign = 'center';
        ctx.fillText(cell.value, cell.x + 60, cell.y + 100);
    }
}
function handleCells(){
    var i,j;
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            drawCell(cells[i][j]);
        }
    }
}
function checkGame(){
    var emptyCells = 0;
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            if(!cells[i][j].value){
                emptyCells++;
            }
        }
    }
    if(emptyCells == 0){
        gameOver = true;
        console.log('GAME OVER');
    }
}
function newCell(){
    var spawnChance = Math.floor(Math.random() * 10)
    var spawnValue;
    if(spawnChance < 7){
        spawnValue = 2; 
    }
    else spawnValue = 4;
    while(true){
        var row = Math.floor(Math.random() * size);
        var coll = Math.floor(Math.random() * size);
        if(!cells[row][coll].value){
            cells[row][coll].value = spawnValue;
            return;
        }
    }
}
function startGame(){
    newCell();
}
startGame();
//Key Listener
if(!gameOver){
    document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                moveUp();
                console.log('moved up' + '\nscore: ' + score);
                break;
            case 'ArrowDown':
                moveDown();
                console.log('moved down' + '\nscore: ' + score);
                break;
            case 'ArrowLeft':
                moveLeft();
                console.log('moved left' + '\nscore: ' + score);
                break;
            case 'ArrowRight':
                moveRight();
                console.log('moved right' + '\nscore: ' + score);
                break;
        }
    };
}


function moveRight(){
    var row,coll;
    for (row = 0; row < size; row++){
        for (coll = size - 2; coll >= 0; coll--){
            if(cells[row][coll].value){
                while(coll + 1 < size){
                    if(!cells[row][coll+1].value){
                        cells[row][coll+1].value = cells[row][coll].value;
                        cells[row][coll].value = 0;
                        coll++;
                    }
                    else if(cells[row][coll].value == cells[row][coll+1].value){
                        cells[row][coll+1].value *= 2;
                        score += cells[row][coll+1].value;
                        cells[row][coll].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    checkGame();
    newCell();
}
function moveLeft(){
    var row,coll;
    for(row = 0; row < size; row++){
        for(coll = 1; coll < size; coll++){
            if(cells[row][coll].value){
                while(coll > 0){
                    if(!cells[row][coll-1].value){
                        cells[row][coll-1].value = cells[row][coll].value;
                        cells[row][coll].value = 0;
                        coll--;
                    }
                    else if(cells[row][coll].value == cells[row][coll-1].value){
                        cells[row][coll-1].value *= 2;
                        score += cells[row][coll-1].value;
                        cells[row][coll].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    checkGame();
    newCell();
}
function moveUp(){
    var row,coll;
    for(coll = 0; coll < size; coll++){
        for(row = 1; row < size; row++){
            if(cells[row][coll].value){
                while(row > 0){
                    if(!cells[row-1][coll].value){
                        cells[row-1][coll].value = cells[row][coll].value;
                        cells[row][coll].value = 0;
                        row--;
                    }
                    else if(cells[row-1][coll].value == cells[row][coll].value){
                        cells[row-1][coll].value *= 2;
                        score += cells[row-1][coll].value;
                        cells[row][coll].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    checkGame();
    newCell();
}
function moveDown(){
    var row,coll;
    for(coll = 0; coll < size; coll++){
        for(row = size - 2; row >= 0; row--){
            if(cells[row][coll].value){
                while(row < size-1){
                    if(!cells[row+1][coll].value){
                        cells[row+1][coll].value = cells[row][coll].value;
                        cells[row][coll].value = 0;
                        row++;
                    }
                    else if(cells[row][coll].value == cells[row+1][coll].value){
                        cells[row+1][coll].value *= 2;
                        score += cells[row+1][coll].value
                        cells[row][coll].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    checkGame();
    newCell();
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#a3bfff';
    ctx.fillRect(0, 0, statusBar.width, statusBar.height);
    handleCells();
    if (!gameOver) requestAnimationFrame(animate);
}
animate();




