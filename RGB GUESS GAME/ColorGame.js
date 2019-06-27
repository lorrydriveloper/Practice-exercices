// Variables declaration Zone //

var boxes = document.getElementsByClassName('box'); //Select all boxes
var randomBox // to be use later to select one random box
var gameOver = false // to know if has been guess the color
var difficulty = document.querySelectorAll('div.center:nth-child(3) p');
var container = document.querySelector('div.container');
var display = document.querySelector('div.center:nth-child(2) p');
var jumbotron =document.querySelector('div.jumbotron');

///////////////////////////////////

// Function declaration Zone //

function createDivs(difficulty) {
//   Create dynamically divs in function of difficulty

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    for (let i = 0; i < difficulty ; i++) {
        var newDiv = document.createElement('div')   
        newDiv.classList.add('box')   
        container.appendChild(newDiv)
    }

}
function checkDifficulty() {
    // check difficulty selected default it is normal

    for (const dif of difficulty) {
        if (dif.classList.contains('selected')) {
            return Number(dif.id)

        }
    }
    
}
function selectDifficulty() {
    // on click add class selected and remove it from previous

    for (const dif of difficulty) {
        dif.addEventListener('click', function () {
            for (const dif2 of difficulty) {
                if (dif2.classList.contains('selected')) {
                    dif2.classList.remove('selected');
        
                }
            }
            this.classList.add('selected')
            play();
        });
    }

}
function randomNumber(){
    /* return a random integer 0 - 255 */
    return Math.floor(Math.random() * 256);
}

function getRandomValueRGB() {

    /* this function return a string in format RGB(x, x, x)
        with values between 0 an 255 using the function 
        randomNumber */

    let red = randomNumber();
    let blue = randomNumber();
    let green = randomNumber();

    return `RGB(${red}, ${green}, ${blue})`
}
function randomColors(list) {
    /* assign to a given lis of divs a backgroundColor using
        the function getRandomValueRGB*/
    for (const obj of list) {
        obj.style.backgroundColor = getRandomValueRGB();
    }
    
}
function selectRandomBox(num) {
    // function to select a random box depending of its length

    var index = 10;
    while (index > num - 1) {
        index = Math.floor(Math.random() * 10);
    }
    return  boxes[index]
}

function checkColor() {
   /* Function than check if player has guess the color if so display
     congratulations and make jumbotron background of winner color 
     if not make disappear checked box and display try again*/

    if (!gameOver) {
       if(getComputedStyle(this).backgroundColor == randomBoxRGB){
        display.innerText = 'Correct'
        gameOver = true
        jumbotron.style.backgroundColor = randomBoxRGB

        for (const box of boxes) {
            box.style.backgroundColor = randomBoxRGB;
        }
        }
        else{
            display.innerText = 'Try Again'
            this.style.backgroundColor = 'rgb(0, 0, 0)'
        } 
    }
    
}


function play() {
    //  this function make work all the previous functions.
    selectDifficulty();
    createDivs(checkDifficulty());  //create divs dynamically depending of difficult selected.
    randomColors(boxes); //assign random color to divs.
    randomBox = selectRandomBox(boxes.length) //select a random box to be the winner.

    randomBoxRGB = getComputedStyle(randomBox).backgroundColor //select the RGB value of the random box.
    document.querySelector('h1').innerText =  randomBoxRGB.toUpperCase() //display the RGB  value of random box.
   
    for (const box of boxes) { 
        box.addEventListener('click', checkColor); // check if the clicked box it is the winner box.
    }

    //reset styles and game over to start a new game.
    gameOver = false 
    display.innerText = ''
    jumbotron.style.backgroundColor = 'rgb(76, 76, 230)'
}

/////////////////////////////////////////////////////////////////

////// Logic Zone /////
play();


/////////////////// teacher solution  //////////////////////////////

/*
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}



function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
*/