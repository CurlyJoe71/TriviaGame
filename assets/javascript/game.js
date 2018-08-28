//Create an object for each trivia question.
const question1 = {
  question: "Which of the following Disney films was NOT adapted for the stage?",
  wrong1: "The Little Mermaid",
  wrong2: "Beauty and the Beast",
  wrong3: "Aladdin",
  right: "Pocahontas"
};

const question2 = {
  question: "What is the name of the musical set in the land of Oz BEFORE the arrival of Dorothy?",
  wrong1: "Land of Oz",
  wrong2: "Witches and Wizards",
  wrong3: "The Yellow Brick Road",
  right: "Wicked"
};

const question3 = {
  question: "Which of the following shows has had the shortest lifespan in NYC?",
  wrong1: "Phantom of the Opera",
  wrong2: "Chicago",
  wrong3: "The Lion King",
  right: "Les Misérables"
};

const question4 = {
  question: "This musical marked the last collaboration between Rodgers and Hammerstein.",
  wrong1: "Oklahoma!",
  wrong2: "South Pacific",
  wrong3: "The King and I",
  right: "The Sound of Music"
};

const question5 = {
  question: "The composer of this 1990's musical died days before it's opening.",
  wrong1: "Ragtime",
  wrong2: "Hedwig and the Angry Inch",
  wrong3: "Miss Saigon",
  right: "Rent"
};

var answerArray = [];

//Creating a counter.
var roundCounter = 1;
var currentQuestionArray = []; 

//Using the Fisher-Yates Shuffle after first shifting the "question" key off.
var shuffleFunction = function (myKeys) {

  var shuffledArray = Object.keys(myKeys);
  console.log(shuffledArray);
  if (shuffledArray[0] === 'question') {
    shuffledArray.shift();
  };
  answerArray = shuffledArray;
  for (var i = answerArray.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    console.log(randomIndex);
    var itemAtIndex = answerArray[randomIndex];
    console.log(itemAtIndex);

    answerArray[randomIndex] = answerArray[i];
    answerArray[i] = itemAtIndex;
  }
  return answerArray;
};
// console.log(question5);
// console.log(shuffleFunction(question5));

var timerDisplay = $('#timer-display');
var slidingObject = $('#sliding-object');
var questionDisplay = $('#questionDiv');

//function to run when timer gets to zero.
var timeOut = function () {
  stopwatch.stop();
  slidingObject.empty();
  questionDisplay.empty();
  timerDisplay.text('Oh no. You\'ve run out of time!');
};

//variables and included function to run and display the timer.
var currentTime;
var intervalId;
var clockRunning = false;
var stopwatch = {
  time: 120,
  reset: function () {
    stopwatch.time = 0;
    $('#timer-display').text('00:00');
  },
  start: function () {
    if (!clockRunning) {
      clockRunning = true;
      intervalID = setInterval(stopwatch.count, 1000);
    }
  },
  stop: function () {
    clearInterval(intervalID);
    clockRunning = false;
    stopwatch.time = 5;
  },
  count: function () {
    if (stopwatch.time === 0) {
      timerDisplay.empty();
      timeOut();
    }
    else {
      stopwatch.time--;
      currentTime = stopwatch.timeConverter(stopwatch.time);
      $('#timer-display').html('<h3>' + currentTime + '</h3>');
    };
  },
  timeConverter: function (t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};


$(document).ready(function () {
  slidingObject.empty();
  var startGame = function () {
    timerDisplay.text('Welcome! Go ahead and click the "Start" button when you\'re ready to play!');

    $('.btn').click(function () {

      if (roundCounter === 1) {
        currentQuestionArray = question1;
      }
      else if (roundCounter === 2) {
        currentQuestionArray = question2;
      }
      else if (roundCounter === 3) {
        currentQuestionArray = question3;
      }
      else if (roundCounter === 4 ) {
        currentQuestionArray = question4;
      }
      else {
        currentQuestionArray === 5;
      };

      shuffleFunction(currentQuestionArray);
      console.log(answerArray);
      $('#questionDiv').text(currentQuestionArray.question);
      setTimeout(function() {
        $('#aDiv').text('A. ' + currentQuestionArray[answerArray[0]]).attr('class', 'tracking-in-expand-fwd answer-child pointer');
      }, 100);
      setTimeout(function() {
        $('#bDiv').text('B. ' + currentQuestionArray[answerArray[1]]).attr('class', 'tracking-in-expand-fwd answer-child pointer');
      }, 400);
      setTimeout(function() {
        $('#cDiv').text('C. ' + currentQuestionArray[answerArray[2]]).attr('class', 'tracking-in-expand-fwd answer-child pointer');
      }, 700);
      setTimeout(function() {
        $('#dDiv').text('D. ' + currentQuestionArray[answerArray[3]]).attr('class', 'tracking-in-expand-fwd answer-child pointer');
      }, 1000);
      stopwatch.start();
      slidingObject.text('o');
      timerDisplay.text(currentTime);
    })



  }//end of startGame function
  startGame();
})//end of document.ready