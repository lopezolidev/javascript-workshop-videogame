const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');


window.addEventListener('load', setCanvasSize);
 
window.addEventListener('resize', setCanvasSize); 

let canvasSize;
let elementSize;

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
            game.fillText(emoji, posX, posY);
        })
    }); //rowI and colI are the indexes of each element iterated 
 }

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