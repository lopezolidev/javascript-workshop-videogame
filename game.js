const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//buttons to move the player
const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const rightButton = document.querySelector('#right');
const leftButton = document.querySelector('#left');

let elementSize;
let canvasSize;

const playerPos = {
    x: undefined,
    y: undefined,
}

let indicator = true; 
//setting this variable with this value lets us use it later on as a second validator

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize); 

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.70; 
    } else {
        canvasSize = window.innerHeight * 0.70;
    }  
     
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 
    

    elementSize = canvasSize / 10; 
    
    startGame();
}

function startGame() {   

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];

    const rowMap = map.trim().split('\n');
        //creating an array of trimmed strings and separated every linegap

    const mapRowCols = rowMap.map( row => row.trim().split('')); 
    //elimininating the first whitespace on each element of the array

    mapRowCols.forEach( (row, rowI) => {
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);
           

            if (col == 'O' && indicator == true) {
                playerPos.x = posX;
                playerPos.y = posY;
                indicator = false;
                //indicator's value gets changed to make the render of the player inaccesible in the future
            }
            game.fillText(emoji, posX, posY);
        })
    }); //rowI and colI are the indexes of each element iterated 
    movePlayer(); //we call the function to move the player, but is going to appear each time we load the window

    if ((playerPos.x - elementSize) < 0){
        buttonRIGHT();
    } else if (playerPos.x > canvasSize + 1) {
        buttonLEFT();
    } else if (playerPos.y > (canvasSize + 1)) {
        buttonUP();
    } else if ((playerPos.y - elementSize) < 0) {
        buttonDOWN();
    }
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);
}

function clearGame() {
    game.clearRect(0, 0, canvasSize, canvasSize); 
    //using this function to render the game each time the player moves
}

window.addEventListener('keyup', keyMove);

upButton.addEventListener('click', buttonUP);
downButton.addEventListener('click', buttonDOWN);
rightButton.addEventListener('click', buttonRIGHT);
leftButton.addEventListener('click', buttonLEFT);

function keyMove(event) {
    if (event.key == 'ArrowUp') buttonUP(); 
    else if(event.key == 'ArrowDown') buttonDOWN();
    else if(event.key == 'ArrowRight') buttonRIGHT();
    else if(event.key == 'ArrowLeft') buttonLEFT();
    //deleting curly braces makes the execution to one sentence until the first ";" appears
}

function buttonUP() {
    clearGame();
    playerPos.y -= elementSize;
    startGame();
    movePlayer();
    //at each move we clear the game, change the position of the player, render the game without the player and then make the player appear with the new position
}
function buttonDOWN() {
    clearGame();
    playerPos.y += elementSize;
    startGame();
    movePlayer();
}
function buttonRIGHT() {
    clearGame();
    playerPos.x += elementSize;
    startGame();
    movePlayer();
}
function buttonLEFT() {
    clearGame();
    playerPos.x -= elementSize;
    startGame();
    movePlayer();
}
// DOCUMENTATION

// const game = canvas.getContext('2d');
//  //this way we "access" the property of 2 dimensions in the canvas

// window.addEventListener('load', setCanvasSize);
//   //we call the function that will add interactivity to the game when the window itself loads all the files we have here. 

// window.addEventListener('resize', setCanvasSize); 
// //adding this event will trigger the resizing of the window and thus repeating the startGame calculations, therefore making it responsive. Resize is an event that we can trigger and listen. The calculus will be re-done every time we resize the window

// function startGame() { 
//     //its better to bottle up the code here to avoid "not loading" of the game

//     // game.fillRect(0,50,50,100); 
//     // //this method allows us to fill the canvas with 4 arguments, which are: <initial X axis coordenates in pixels>, <initial Y axis coordenates in pixels>, <width (pixels)>, <height (pixels)>

//     // game.clearRect(0,100,50,50); //acts as an eraser, or opposite to fillRect method, has the same syntax

//     // game.fillText('Hello', 10, 10); //we use this to insert text in the x and y coordenates (in pixels) that we declare

//     // game.font = '20px Verdana' //is an attribute, sets the size and style of the text from fillText method
    
//     // game.fillStyle = 'blue' //sets the color of the text

//     // game.textAlign ='center' // aligns the text according the the coordenates in fillText; start (= left) sets the start from the coordenates, end (= rigth) sets the end of the text from the coordenates.

//     console.log(window.innerHeight);     //668
//     //this tells us the actual height of the window taking account if there's a console or other element

//     console.log(window.innerWidth);     //1284
//     //the same but width

    
//     game.font = elementSize + 'px Verdana'; //setting the size of the element in the property

//     game.textAlign = 'end'; //aligning the element to end on the size of the element

//      //we access the object emojis from maps.js, to the value that the key ['X'] holds

//     for (let i = 1; i <= 10; i++) {
//         game.fillText(emojis['X'], elementSize * i, elementSize); 
//         //we set the size of each element and multiply it by the iterator, repeating the element as many times we can in the X axis (X in this case)
//     
    //challenge to fill the entire canvas with 2 cycles with a single emoji
    // let newSize; 
    // for (let i = 1; i <= 10; i++) {
    //     game.fillText(emojis['X'], elementSize * i, elementSize);
    //     newSize = elementSize * i
    //     for (let i = 1; i <= 10; i++){
    //         game.fillText(emojis['X'], newSize, elementSize * i)
    //     }
    // } // my solution
//}

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row) //row-1 or col-1 = desired element inside the array of arrays
    //     }
    // } //teacher's solution to the challenge

//  }