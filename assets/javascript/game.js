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
var answerDisplay = $('.answer-child');

//Using the Fisher-Yates Shuffle after first shifting the "question" key off.
var shuffleFunction = function (myKeys) {

  var shuffledArray = Object.keys(myKeys);
  if (shuffledArray[0] === 'question') {
    shuffledArray.shift();
  };
  answerArray = shuffledArray;
  for (var i = answerArray.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = answerArray[randomIndex];
    answerArray[randomIndex] = answerArray[i];
    answerArray[i] = itemAtIndex;
  }
  return answerArray;
};

var timerDisplay = $('#timer-display');
var slidingObject = $('#sliding-object');
var questionDisplay = $('#questionDiv');


//function to run when timer gets to zero.
var timeOut = function () {
  stopwatch.stop();
  slidingObject.empty();
  questionDisplay.empty();
  $('#answer-display').empty();
  timerDisplay.text('Oh no. You\'ve run out of time!');
};

//variables and included functions to run and display the timer.
var currentTime;
var intervalId;
var clockRunning = false;

var stopwatch = {
  time: 60,
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
    // stopwatch.time = 5;
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

var checkRound = function () {
  if (roundCounter === 1) {
    currentQuestionArray = question1;
  }
  else if (roundCounter === 2) {
    currentQuestionArray = question2;
  }
  else if (roundCounter === 3) {
    currentQuestionArray = question3;
  }
  else if (roundCounter === 4) {
    currentQuestionArray = question4;
  }
  else if (roundCounter === 5) {
    currentQuestionArray === question5;
  }
  else {
    //need to run a function to end the game
  }
};

var playGame = function () {
  checkRound();
  stopwatch.start();
  slidingObject.text('o');
  timerDisplay.text(currentTime);

  shuffleFunction(currentQuestionArray);
  roundCounter++;
  questionDisplay.text(currentQuestionArray.question);
  $('#answer-display').children().text('');
  setTimeout(function () {
    $('#aDiv').text(currentQuestionArray[answerArray[0]]).attr('class', 'tracking-in-expand-fwd answer-child pointer hover');
  }, 1500);
  setTimeout(function () {
    $('#bDiv').text(currentQuestionArray[answerArray[1]]).attr('class', 'tracking-in-expand-fwd answer-child pointer hover');
  }, 2000);
  setTimeout(function () {
    $('#cDiv').text(currentQuestionArray[answerArray[2]]).attr('class', 'tracking-in-expand-fwd answer-child pointer hover');
  }, 2500);
  setTimeout(function () {
    $('#dDiv').text(currentQuestionArray[answerArray[3]]).attr('class', 'tracking-in-expand-fwd answer-child pointer hover');
  }, 2500);
};

$(document).ready(function () {
  slidingObject.empty();
  var startGame = function () {
    timerDisplay.text('Welcome! Go ahead and click the "Start" button when you\'re ready to play!');

    $('.btn').click(function () {
      $('.button-spacer').empty();
      playGame();

      // checkAnswer();
      $('.answer').click(function () {
        if ($(this).text() === currentQuestionArray.right) {
          stopwatch.stop();
          slidingObject.empty();
          questionDisplay.text('Correct!');

          // Is there a way to empty the other divs?
          $('#answer-display').children().not($(this)).empty().removeClass('hover');
          setTimeout(() => {
            questionDisplay.text('Next question coming up...');
          }, 1900);
          setTimeout(() => {
            playGame();
          }, 4000);
        }
        else {
          stopwatch.stop();
          slidingObject.empty();
          questionDisplay.text('Oh, sorry. That\'s not correct.');
          $('#answer-display').children().not($(this)).empty();
          setTimeout(() => {
            questionDisplay.text('This is the one you wanted...');
            $(this).text(currentQuestionArray.right).css('color', 'red');
          }, 2000);
          setTimeout(() => {
            questionDisplay.text('Next question coming up...');
          }, 5000);
          setTimeout(() => {
            playGame();
          }, 7100);
        }
      });
    })



  }//end of startGame function
  startGame();
})//end of document.ready