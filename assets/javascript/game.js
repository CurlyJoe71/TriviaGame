//Create an object for each trivia question.
var question1 = {
  question: "Which of the following Disney films was NOT adapted for the stage?",
  wrong1: "The Little Mermaid",
  wrong2: "Beauty and the Beast",
  wrong3: "Aladdin",
  right: "Pocahontas"
};

var question2 = {
  question: "What is the name of the musical set in the land of Oz BEFORE the arrival of Dorothy?",
  wrong1: "Land of Oz",
  wrong2: "Witches and Wizards",
  wrong3: "The Yellow Brick Road",
  right: "Wicked"
};

var question3 = {
  question: "Which of the following shows has had the shortest lifespan in NYC?",
  wrong1: "Phantom of the Opera",
  wrong2: "Chicago",
  wrong3: "The Lion King",
  right: "Les Misérables"
};

var question4 = {
  question: "This musical marked the last collaboration between Rodgers and Hammerstein.",
  wrong1: "Oklahoma!",
  wrong2: "South Pacific",
  wrong3: "The King and I",
  right: "The Sound of Music"
};

var question5 = {
  question: "The composer of this 1990's musical died days before it's opening.",
  wrong1: "Ragtime",
  wrong2: "Hedwig and the Angry Inch",
  wrong3: "Miss Saigon",
  right: "Rent"
}

$('#questionDiv').text(question1.question);
 
var intervalId;

var clockRunning = false;

var stopwatch = {
  time: 0,
  reset: function() {
    stopwatch.time = 0;
    stopwatch.lap = 1;
    $('#timer-display').text('00:00');
  },
  start: function() {
    if (!clockRunning) {
      clockRunning = true;
      intervalID = setInterval(stopwatch.count, 1000);
    }
  },
  stop: function() {
    clearInterval(intervalID);
    clockRunning = false;
  },
  count: function() {
    stopwatch.time ++;
    var currentTime = stopwatch.timeConverter(stopwatch.time);
    $('#timer-display').text(currentTime);
  },
  timeConverter: function(t) {
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
}