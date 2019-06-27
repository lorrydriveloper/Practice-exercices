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
//   Create dinamicaly divs in function of dificulty

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
    /* return a random integer 0 - 999 */
    return Math.floor(Math.random() * 1000);
}

function getRandomValueRGB() {

    /* this function return a string in format RGB(x, x, x)
        with values between 0 an 255 using the function 
        randomNumber */

    let red;
    let green;
    let blue;

    while (true) {
        green = randomNumber();
        blue = randomNumber();
        red = randomNumber();
        if (green < 255 && red < 255 && blue < 255) {
            break;
        }
    }
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
        }
        else{
            display.innerText = 'Try Again'
            this.style.backgroundColor = 'rgb(0, 0, 0)'
        } 
    }
    
}


function play() {
    //  this function make work all the previous functions.

    createDivs(checkDifficulty());  //create divs dynamically.
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
    jumbotron.style.backgroundColor = '#e9ecef'
}

/////////////////////////////////////////////////////////////////

////// Logic Zone /////

selectDifficulty();
play();
