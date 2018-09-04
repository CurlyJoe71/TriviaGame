var colorsAudio = document.getElementById('colors');
var edelweissAudio = document.getElementById('edelweiss');
var forGoodAudio = document.getElementById('forGood');
var seasonsAudio = document.getElementById('seasons');
var starsAudio = document.getElementById('stars');
var currentAudio;

var colorsGiphy = '"https://media.giphy.com/media/EiiKZ3IZf8Vzi/giphy.gif" "max-width:50px"';
var forGoodGiphy = 'https://media.giphy.com/media/YSYyCl3ppK1nG/giphy.gif';
var edelweissGiphy = 'https://media.giphy.com/media/8cA3oJ3QwEzgk/giphy.gif';
var seasonsGiphy = 'https://media.giphy.com/media/12Qc9VT7OONl4s/giphy.gif';
var starsGiphy = 'https://media.giphy.com/media/l46C63jtOQF84VJLO/giphy.gif';
var currentGiphy;

//Create an object for each trivia question.
const question1 = {
  question: "Which of the following Disney films was NOT adapted for the stage?",
  wrong1: "The Little Mermaid",
  wrong2: "Beauty and the Beast",
  wrong3: "Aladdin",
  right: "Pocahontas"
};

const question2 = {
  question: "This musical is set in the land of Oz  BEFORE  the arrival of Dorothy.",
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
var roundCounter = 0;
var currentQuestionArray = [];
var answerDisplay = $('.answer-child');
var wins = 0;
var losses = 0;

var startGame;

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

var endGame = function () {
  stopwatch.stop();
  slidingObject.empty();
  timerDisplay.empty();
  $('#answer-display').empty();
  $('#giphyDiv').empty();
  questionDisplay.text('All done. You beat the clock. Not a bad score!');
};

//variables marking the major display sections of the DOM, by ID.
var timerDisplay = $('#timer-display');
var slidingObject = $('#sliding-object');
var questionDisplay = $('#questionDiv');


//function to run when timer gets to zero.
var timeOut = function () {
  stopwatch.stop();
  slidingObject.empty();
  questionDisplay.empty();
  $('#answer-display').empty();
  timerDisplay.text('Oh no. You\'ve run out of time! Press the "Start" button to try again.');
  $('.button-spacer').html('<button type="button" class="btn btn-lg">Start!</button>');
  $('.btn').click(function () {
    $('.button-spacer').empty();
    $('#losses').text('Incorrect: ' + losses);
    $('#wins').text('Correct: ' + wins);
    startGame();
  });
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
    currentAudio = colorsAudio;
    currentGiphy = colorsGiphy;
  }
  else if (roundCounter === 2) {
    currentQuestionArray = question2;
    currentAudio = forGoodAudio;
    currentGiphy = forGoodGiphy;
  }
  else if (roundCounter === 3) {
    currentQuestionArray = question3;
    currentAudio = starsAudio;
    currentGiphy = starsGiphy;
  }
  else if (roundCounter === 4) {
    currentQuestionArray = question4;
    currentAudio = edelweissAudio;
    currentGiphy = edelweissGiphy;
  }
  else if (roundCounter === 5) {
    currentQuestionArray = question5;
    currentAudio = seasonsAudio;
    currentGiphy = seasonsGiphy;
  }
  else {
    //need to run a function to end the game

  };
};

var playGame = function () {
  roundCounter++;
  checkRound();
  stopwatch.start();
  slidingObject.text('l');
  timerDisplay.text(currentTime);

  shuffleFunction(currentQuestionArray);

  questionDisplay.text(currentQuestionArray.question);
  $('#answer-display').children().text('').removeClass('tracking-in-expand-fwd');
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
  }, 3000);
};

$(document).ready(function () {
  slidingObject.empty();
  startGame = function () {
    $('.button-spacer').html('<button type="button" class="btn btn-lg">Start!</button>');
    stopwatch.time = 60;
    roundCounter = 0;
    wins = 0;
    losses = 0;
    answerArray = [];
    currentQuestionArray = [];

    timerDisplay.text('Welcome! Go ahead and click the "Start" button when you\'re ready to play!');

    $('.btn').click(function () {
      $('.button-spacer').empty();
      $('#losses').text('Incorrect: ' + losses);
      $('#wins').text('Correct: ' + wins);
      playGame();

      // checkAnswer();
      $('.answer').click(function () {
        if ($(this).text() === currentQuestionArray.right) {
          wins++;
          $('#wins').text('Correct: ' + wins);
          stopwatch.stop();
          slidingObject.empty();
          questionDisplay.text('Correct!');
          // Is there a way to empty the other divs?
          $('#answer-display').children().empty().removeClass('hover', 'tracking-in-expand-fwd');
          $('#cDiv').text(currentQuestionArray.right);
          //need to play the image and sound snippet, possibly need to use .append and add attr 'class' 'animation'.
          $('#giphyDiv').append('<img src=' + currentGiphy + '>');
          currentAudio.play();

          if (roundCounter === 5) {
            setTimeout(() => {
              endGame();
            }, 7000);
          }
          else {
            setTimeout(() => {
              questionDisplay.text('Next question coming up...');
            }, 7000);
            setTimeout(() => {
              $('#giphyDiv').empty();
              playGame();
            }, 11000);
          };
        }
        else {
          losses++;
          $('#losses').text('Incorrect: ' + losses);
          stopwatch.stop();
          slidingObject.empty();
          questionDisplay.text('Oh, sorry. That\'s not correct.');
          $('#answer-display').children().empty().removeClass('hover', 'tracking-in-expand-fwd');

          setTimeout(() => {
            questionDisplay.text('This is the one you wanted...');
            $('#cDiv').text(currentQuestionArray.right);
            $('#giphyDiv').append('<img src=' + currentGiphy + '>');
            currentAudio.play();
          }, 2000);

          setTimeout(() => {
            questionDisplay.text('Next question coming up...');
          }, 5000);

          setTimeout(() => {
            $('#giphyDiv').empty();
            playGame();
          }, 12000);
        }
      });
    })



  }//end of startGame function
  startGame();
})//end of document.ready