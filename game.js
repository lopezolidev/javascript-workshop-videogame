//setting canvas size and 2d context
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//buttons to move the player
const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const rightButton = document.querySelector('#right');
const leftButton = document.querySelector('#left');

//info about the game
const heartsSpan = document.querySelector('#lives');
const timeSpan = document.querySelector('#time');
const recordSpan = document.querySelector('#record_Time');
const pResult = document.querySelector('#pResult');


let elementSize;
let canvasSize;
//variables to measure each element and the complete size of the map

const playerPos = {
    x: undefined,
    y: undefined,
}

const giftPos = {
    x: undefined,
    y: undefined,
}

let bombsPos = [];

let bombFlag = true;
//setting this variable with this value lets us use it later on as a second validator


let playerTime;
let timeStart;
//these are the variables to know how much time has passed and player time for the record

let level = 0;
let lives = 3;
//setting lives will help us to reload the game when there're no more

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize); 

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = Math.round(window.innerWidth * 0.7); 
    } else {
        canvasSize = Math.round(window.innerHeight * 0.7);
    }  
     
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 
    

    elementSize = Math.ceil(canvasSize / 10); 
    
    playerPos.x = undefined;
    playerPos.y = undefined;
    //we reload the player position on each restart of the game

    startGame();
}

function startGame() {   

    let map;
    game.font = elementSize * 0.8 + 'px Verdana';
    game.textAlign = 'end';

    map = maps[level];

    if (!map) {
        youWon();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now() //this method will give us the time at this moment;
        timeInterval = setInterval( showTime, 100) 
        //every 100 miliseconds the function showTime() is triggered
        showRecord();
    }


    const rowMap = map.trim().split('\n');
        //creating an array of trimmed strings and separated every linegap

    const mapRowCols = rowMap.map( row => row.trim().split('')); 
    //elimininating the first whitespace on each element of the array
    
    showLives();
    //to show lives at each map reload

    bombsPos = [];
    //reseting this array avoids rewriting the same positions of every bomb
    
    game.clearRect(0,0, canvasSize, canvasSize);


    mapRowCols.forEach( (row, rowI) => {
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);
           

            if (col == 'O') {
                if(!playerPos.x && !playerPos.y){
                playerPos.x = posX;
                playerPos.y = posY;
                }
            }

            if (col == 'I') {
                giftPos.x = posX;
                giftPos.y = posY;
                //this way we set the gift positions inside the game
            }
            if (col == 'X') {
                bombsPos.push({
                    x: posX,
                    y: posY,
                });
            }
            game.fillText(emoji, posX, posY);
        })
    }); //rowI and colI are the indexes of each element iterated 
    movePlayer(); //we call the function to move the player, but is going to appear each time we load the window
    bombFlag = false;

    if ((playerPos.x - elementSize) < 0){
        buttonRIGHT();
    } else if (playerPos.x > canvasSize + elementSize) {
        buttonLEFT();
    } else if (playerPos.y > canvasSize + elementSize) {
        buttonUP();
    } else if ((playerPos.y - elementSize) < 0) {
        buttonDOWN();
    }
    //this part is for not escaping the map
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);

    const bombCollision = bombsPos.find( bomb => {
        const bombPosX = bomb.x.toFixed(0) == playerPos.x.toFixed(0);
        const bombPosY = bomb.y.toFixed(0) == playerPos.y.toFixed(0); 
        //this two values return booleans
        return bombPosX && bombPosY;
        //using return at the end with "&&" operator will help us to have as a value the coincidential positions
    })

    if (playerPos.x == giftPos.x && playerPos.y == giftPos.y){
        gameWin();
    } else if (bombCollision) {
        gameLose();
    }    
}

function gameWin() {
    level++;
    startGame();
}
function gameLose() {
    lives--;
    playerPos.x = undefined;
    playerPos.y = undefined;
    indicator = true;
    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
        startGame();
    } else {
    // game.fillText(emojis['BOMB_COLLISION'], playerPos.x, playerPos.y);
    startGame();
    }
}

function showTime() {
    timeSpan.innerHTML = Date.now() - timeStart;
}

function restart(){
    level = 0;
    lives = 3;
    localStorage
}; //this function will be triggered when we lose all of our lives

function endOfLives() {
    // here has to go the animation and transformation of all the bombs into enemies
}

function finishedGame() {
    //canvas animation to show stars and a modal is shown to restart the game and congrat the player
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']); 
    //this is a superprototype that will have the lives elements "[1, 2, 3]" but filled with the values that are inside emojis['HEART']

    const heartsArrayNoCommas = heartsArray.join(' ');

    heartsSpan.innerHTML = heartsArrayNoCommas;
}

function showRecord() {
    recordSpan.innerHTML = localStorage.getItem('record_time');
}


function youWonAndRecordSet() {
    clearInterval(timeInterval); 
    //the time interval is stopped and we see how much time we've played
    const newRecord = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (newRecord) {
        if (newRecord >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Congrats! new record';
        } else {
            pResult.innerText = 'Failed to beat the last record, try again!';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerText = 'First time? Nice try '
    }
}

function clearGame() {
    game.clearRect(0, 0, canvasSize, canvasSize); 
    //using this function to render the game each time the player moves
}

window.addEventListener('keydown', keyMove);

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

//TO DO:
// ¶ winning screen with prize
// ¶ losing screen with skeleton
// ¶ restart function and button (setTimeout function)
// ¶ levels+



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