// Creating the array that is going to hold the images
function createDiceImages() {
  var imagesArray = [];
  for (var i = 1; i < 7; i++) {
    // using a for loop in order to get the images inside the array
    // the var i is going to be the number I assigned to the file name
    var diceIMG = document.createElement("img");
    diceIMG.src = `images/Dice_${i}.png`; // with this quotation, variables can be used :D
    imagesArray.push(diceIMG);
  }
  return imagesArray;
}

// Adding the event of starting the game
var startGameButton = document.getElementById("start-game-button");
startGameButton.addEventListener("click", startGame);

function startGame() {
  // Getting the start game button and the rule section taken away
  var buttonToTakeoff = document.getElementById("button-to-takeoff");
  buttonToTakeoff.innerHTML = "";
  var ruleSection = document.querySelector(".rule-section");
  ruleSection.innerHTML = "";
  // Getting the name of the users
  var player1 = document.getElementById("p1").value;
  var player2 = document.getElementById("p2").value;
  // get the main div where everything will go
  var mainGameDiv = document.getElementById("main-game");
  // Getting the main game functioning
  mainGameFunction(player1, player2, mainGameDiv);
}

function displayBoard() {
  // display the board
  // returns the div element when the board is inside
  var boardDiv = document.createElement("div");
  boardDiv.setAttribute("class","board-div");
  var board = document.createElement("img");
  board.src = "images/board.png";
  board.id = "board";
  boardDiv.appendChild(board);
  return boardDiv;
}

// Creating a position class that will store a x and y coordinate
// This is going to create 26 position objects that are going to hold the positions
// of the positions of the board

class Position {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

// Get the exact positions of the board game
// these positions are centered (then at each dot the position will be subtracted or added)
// They are in percentages in order to play in multiple screens
// bottom 
var posStart = new Position(2.3,93)
var pos1 = new Position(9.5,93);// pos 1 --> x = 9.5%, y = 93%
var pos2 = new Position(16.7,93);// pos 2 --> x = 16.7%, y = 93%
var pos3 = new Position(24,93);// pos 3 --> x = 24%, y = 93%
var pos4 = new Position(31.2,93);// pos 4 --> x = 31.2%, y = 93%
var pos5 = new Position(38.4,93);// pos 5 --> x = 38.4%, y = 93%
var pos6 = new Position(45.8,93);// pos 6 --> x = 45.8%, y = 93%
var pos7 = new Position(53.5,93);// pos 7 --> x = 53.5%, y = 93%
var pos8 = new Position(60.6,93);// pos 8 --> x = 60.6%, y = 93%
// right
var pos9 = new Position(60.6,78);// pos 9 --> x = 60.6%, y = 78%
var pos10 = new Position(60.6,63.5);// pos 10 --> x = 60.6%, y = 63.5%
var pos11 = new Position(60.6,48.5);// pos 11 --> x = 60.6%, y = 48.5%
var pos12 = new Position(60.6,33.5);// pos 12 --> x = 60.6%, y = 33.5%
var pos13 = new Position(60.6,20.3);// pos 13 --> x = 60.6%, y = 20.3%
var pos14 = new Position(60.6,7.5);// pos 14 --> x = 60.6%, y = 7.5%
// top
var pos15 = new Position(53.5,7.5);// pos 15 --> x = 53.5%, y = 7.5%
var pos16 = new Position(45.8,7.5);// pos 16 --> x = 45.8%, y = 7.5%
var pos17 = new Position(38.4,7.5);// pos 17 --> x = 38.4%, y = 7.5%
var pos18 = new Position(31.2,7.5);// pos 18 --> x = 31.2%, y = 7.5%
var pos19 = new Position(24,7.5);// pos 19 --> x = 24%, y = 7.5%
var pos20 = new Position(16.7,7.5);// pos 20 --> x = 16.7%, y = 7.5%
var pos21 = new Position(9.5,7.5);// pos 21 --> x = 9.5%, y = 7.5%
var pos22 = new Position(2.3,7.5);// pos 22 --> x = 2.3%, y = 7.5%
// left
var pos23 = new Position(2.3,20.3);// pos 23 --> x = 2.3%, y = 20.3%
var pos24 = new Position(2.3,33.5);// pos 24 --> x = 2.3%, y = 33.5%
var pos25 = new Position(2.3,48.5);// pos 25 --> x = 2.3%, y = 48.5%
var pos26 = new Position(2.3,63.5);// pos 26 --> x = 2.3%, y = 63.5%
var posEnd = new Position(2.3,72)// pos end --> x = 2.3%, y = 7.5%

// important to understand that the first position is in the index 0!
var boardPositions = [posStart,pos1,pos2,pos3,pos4,pos5,
                      pos6,pos7,pos8,pos9,pos10,
                      pos11,pos12,pos13,pos14,pos15,
                      pos16,pos17,pos18,pos19,pos20,
                      pos21,pos22,pos23,pos24,pos25,
                      pos26,posEnd];

function mainGameFunction(p1, p2, mainGameDiv) {

  var currentPlayerDiv = document.createElement("div");
  var currentPlayer = document.createElement("h1");
  currentPlayer.id = "currentPlayer-text";
  currentPlayer.innerHTML = "Player: "+"<span id='currentPlayer-text-p1'>"+p1+"</span>";
  currentPlayerDiv.appendChild(currentPlayer);
  mainGameDiv.appendChild(currentPlayerDiv);

  // Display Board
  var boardDiv = displayBoard();

  // display the blue and red dots
  var dotsDiv = document.createElement("div");
  dotsDiv.setAttribute("class","dots-div");
  var blueDot = document.createElement("img");
  var redDot = document.createElement("img");
  blueDot.src = "images/blue-dot.png";
  redDot.src = "images/red-dot.png";
  blueDot.id = "blue-dot";
  redDot.id = "red-dot";
  // this variables are in order to manage the movements
  var blueDotValue = 0;
  var redDotValue = 0;
  dotsDiv.appendChild(blueDot);
  dotsDiv.appendChild(redDot);

  // displaying the button with the space to throw the dices into
  var throwDicesDiv = document.createElement("div");
  throwDicesDiv.setAttribute("class","dices-div");
  var buttonDices = document.createElement("button");
  var buttonDicesText = document.createTextNode("Throw Dices!");
  buttonDices.appendChild(buttonDicesText);
  buttonDices.id = "button-throwing-dices";
  // appending everything
  throwDicesDiv.appendChild(buttonDices);
  dotsDiv.appendChild(throwDicesDiv);
  dotsDiv.appendChild(throwDicesDiv);
  boardDiv.appendChild(dotsDiv);
  mainGameDiv.appendChild(boardDiv);
  // making the event listener to throw the dices and perform the game
  buttonDices.addEventListener("click",throwDices);
  // creating the specific divs in order to replace them everytime the throw is made
  // div for dice images
  var dicesDiv = document.createElement("div");
  // div where all buttons of the possible decisions
  var dicesDecisionDiv = document.createElement("div");
  dicesDecisionDiv.setAttribute("class", "decision-dices-div");
  var current_player = p1;
  // This is like the main game function, within has another function, however, it was created here 
  // in order to take some variables within this scope. 
  function throwDices() {
    // first we need to set the div where dices are to disappear
    dicesDiv.innerHTML = "";

    // getting the dice images
    dice_images = createDiceImages();

    // getting two random dices
    var index1 = getRandomInt(dice_images.length);
    var index2 = getRandomInt(dice_images.length);
    var dice1 = dice_images[index1];
    var dice2 = dice_images[index2];
    dice1.id = "dice1";
    dice2.id = "dice2";
    var dice1Value = index1+1;
    var dice2Value = index2+1;
    var addedValue = dice1Value + dice2Value;
    dicesDiv.appendChild(dice1);
    dicesDiv.appendChild(dice2);
    throwDicesDiv.appendChild(dicesDiv);

    // now we need to create the buttons of the options

    // first we need to set the div where values are to disappear
    dicesDecisionDiv.innerHTML = "";

    // first button where the first value is going to appear
    var firstDiceButton = document.createElement("button");
    var firstDiceText = document.createTextNode(dice1Value);
    firstDiceButton.appendChild(firstDiceText);
    firstDiceButton.addEventListener("click",()=> {makeMovement(firstDiceButton,p1,p2,current_player,blueDot, redDot)});
    dicesDecisionDiv.appendChild(firstDiceButton);
    // I am making this function in here, because I want to be able to change some variables that have this scope
    function makeMovement(diceButton,p1,p2,player,blueDot, redDot) {
      var move_places = diceButton.textContent; // this gives back a string
      if (p1 == player) {
        // blue dot movement
        blueDotValue += parseInt(move_places);
        // the idea is that the user has to get to the exact 26th position
        if (blueDotValue > 27) {
          blueDotValue -= parseInt(move_places); // move the player back to where it originally was
        }
        position = boardPositions[blueDotValue];
        blueDot.style.left = (position.x - 1.7) + "%";
        blueDot.style.top = position.y + "%";
        if (blueDotValue == 27) {
          var winner = p1;
          // erase the game
          mainGameDiv.innerHTML = "";
          var ruleSection = document.querySelector(".rule-section");
          ruleSection.style.margin = "24rem";
          // put a title with the winner
          var winnerTitle = "<h1 id='winner-title'>Congratulations! <span id='currentPlayer-text-p1'>"+p1+"</span><br />You have won!</h1>";
          var returnTitle = "<h3 id='go-back'>If you want to play again, click here: </h3>";
          var goBackButton = "<div class='container'><button id='goback-button'><a href='parchis-home.html'>Play Again!<a/></button></div>";
          mainGameDiv.innerHTML += winnerTitle;
          mainGameDiv.innerHTML += returnTitle;
          mainGameDiv.innerHTML += goBackButton;
        }
        // move the other player back to the start if they go to the same tile
        if (blueDotValue == redDotValue) {
          position = boardPositions[0];
          redDot.style.left = (position.x + 1.2) + "%";
          redDot.style.top = position.y + "%";
          // get the other player with the value 0
          redDotValue = 0;
        }
        
        current_player = p2;
        currentPlayerDiv.innerHTML = "";
        currentPlayer = document.createElement("h1");
        currentPlayer.innerHTML = "Player: "+"<span id='currentPlayer-text-p2'>"+p2+"</span>";
        currentPlayer.id = "currentPlayer-text";
        currentPlayerDiv.appendChild(currentPlayer);
      
      }
      else {
        // red dot movement
        redDotValue += parseInt(move_places);
        if (redDotValue > 27) {
          redDotValue -= parseInt(move_places); // move the player back to where it originally was
        }
        position = boardPositions[redDotValue];
        redDot.style.left = (position.x + 1.2) + "%";
        redDot.style.top = position.y + "%";
        if (redDotValue == 27) {
          var winner = p2;
          // erase the game
          mainGameDiv.innerHTML = "";
          var ruleSection = document.querySelector(".rule-section");
          ruleSection.style.margin = "24rem";
          // put a title with the winner
          var winnerTitle = "<h1 id='winner-title'>Congratulations! <span id='currentPlayer-text-p2'>"+p2+"</span><br />You have won!</h1>";
          var returnTitle = "<h3 id='go-back'>If you want to play again, click here: </h3>";
          var goBackButton = "<div class='container'><button id='goback-button'><a href='parchis-home.html'>Play Again!<a/></button></div>";
          mainGameDiv.innerHTML += winnerTitle;
          mainGameDiv.innerHTML += returnTitle;
          mainGameDiv.innerHTML += goBackButton;
        }
        // move the other player back to the start if they go to the same tile
        if (blueDotValue == redDotValue) {
          position = boardPositions[0];
          blueDot.style.left = (position.x + 1.2) + "%";
          blueDot.style.top = position.y + "%";
          // get the other player with the value 0
          blueDotValue = 0;
        }
        current_player = p1;
        currentPlayerDiv.innerHTML = "";
        currentPlayer = document.createElement("h1");
        currentPlayer.innerHTML = "Player: "+"<span id='currentPlayer-text-p1'>"+p1+"</span>";
        currentPlayer.id = "currentPlayer-text";
        currentPlayerDiv.appendChild(currentPlayer);
        
      }
    }

    // second button where the second value will appear
    var secondDiceButton = document.createElement("button");
    var secondDiceText = document.createTextNode(dice2Value);
    secondDiceButton.appendChild(secondDiceText);
    secondDiceButton.addEventListener("click",()=> {makeMovement(secondDiceButton,p1,p2,current_player,blueDot, redDot)});
    dicesDecisionDiv.appendChild(secondDiceButton);

    // third button where the addition of all both dices will appear
    var addedDiceButton = document.createElement("button");
    var addedDiceText = document.createTextNode(addedValue);
    addedDiceButton.appendChild(addedDiceText);
    addedDiceButton.addEventListener("click",()=> {makeMovement(addedDiceButton,p1,p2,current_player,blueDot, redDot)});
    dicesDecisionDiv.appendChild(addedDiceButton);
    throwDicesDiv.appendChild(dicesDecisionDiv);

  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
