// Questions Array
var questions = [
  {
    question: "Question 1: Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "2"
  },
  {
    question: "Question 2: The condition in an if / else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "2"
  },
  {
    question: "Question 3: The instructions for a function are enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "1"
  },
  {
    question: "Question 4: A property of an object that is a function is called a ____.",
    answers: ["method", "string", "stylesheet", "boolean"],
    correctAnswer: "0"
  },
  {
    question: "Question 5: The logical operator that represents 'or' is ____.",
    answers: ["===", "OR", "&&", "||"],
    correctAnswer: "3"
  }
];

// Global Variables
var score = 0;
var questionNum = 0;
var time = 60;
var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var startEl = document.getElementById("start");
var answersEl = document.querySelector("#answers");
var initialsEl = document.querySelector("#initials");
var highScoreEl = document.querySelector("#highscore");

// Quiz Function
function startQuiz() {
  // Clear Content
  questionsEl.innerHTML = "";
  answersEl.innerHTML = "";
  startEl.innerHTML = "";
  initialsEl.innerHTML = "";

  // Timer Function
  var timerInt = setInterval(timer, 1000);
  function timer() {
    if (time > 0) {
      timerEl.textContent = time;
      time--;
    }
    if (time === 0) {
      clearInterval(timerInt);
      timerEl.textContent = "Time's up!";
      endQuiz();
    }
  };

  function createQuestion() {
    questionsEl.innerHTML = "";
    answersEl.innerHTML = "";
    if (questionNum < questions.length) {
      questionsEl.textContent = questions[questionNum].question;
      for (i = 0; i < 4; i++) {
        buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "btn btn-dark");
        buttonEl.setAttribute("type", "button");
        buttonEl.setAttribute("button-id", i);
        buttonEl.textContent = questions[questionNum].answers[i];
        answersEl.appendChild(buttonEl);
      }
    } else {
      clearInterval(timerInt);
      endQuiz();
    }
  };

  // Check Answer Function
  function answerClick(event) {
    var buttonId = event.target.getAttribute("button-id");

    if (buttonId === questions[questionNum].correctAnswer) {
      questionNum++;
      createQuestion();
    } else {
      time = time - 10;
      questionNum++;
      createQuestion();
    }
  };
  createQuestion();
  answersEl.addEventListener("click", answerClick);
};

// End Quiz Function
function endQuiz() {
  questionsEl.innerHTML = "";
  answersEl.innerHTML = "";
  startEl.textContent = "";

  score = time;
  questionsEl.textContent = "Quiz is done! Your score is " + score + "!"
  saveScore();
};

// Save Scores Function
function saveScore() {
  var scoreLabel = document.createElement("label");
  scoreLabel.setAttribute("id", "scoreLabel");
  scoreLabel.textContent = "Enter your initials:  ";

  initialsEl.appendChild(scoreLabel);

  // input
  var scoreInput = document.createElement("input");
  scoreInput.setAttribute("type", "text");
  scoreInput.setAttribute("id", "initials");
  scoreInput.textContent = "";

  initialsEl.appendChild(scoreInput);

  // submit
  var scoreSubmit = document.createElement("button");
  scoreSubmit.setAttribute("type", "submit");
  scoreSubmit.setAttribute("id", "Submit");
  scoreSubmit.setAttribute("class", "btn btn-dark");
  scoreSubmit.textContent = "Submit";

  initialsEl.appendChild(scoreSubmit);

  scoreSubmit.addEventListener("click", function () {
    var initials = scoreInput.value;

    if (initials === null) {

      alert("Please enter your initials!");

    } else {
      var finalScore = {
        initials: initials,
        score: score
      }
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      console.log(allScores);
      showScores();
    }
  });
};

// Show High Scores Function
function showScores() {
  initialsEl.innerHTML = "";
  answersEl.innerHTML = "";
  questionsEl.textContent = "High Scores";
  var allScores = JSON.parse(localStorage.getItem('allScores'));
  var highScores = [];
  if (allScores) {
    for (i = 0; i < allScores.length; i++) {
      var highScoresEl = document.createElement("h3");
      if (allScores[i].score > allScores[0].score) {
        highScores.unshift(allScores[i]);
      } else {
        highScores.push(allScores[i]);
      }
      highScoresEl.innerHTML = highScores[i].initials + " ------- " + highScores[i].score;
      answersEl.appendChild(highScoresEl);
    }
  } else {
    var noScores = document.createElement("h3");
    noScores.textContent = "There are no saved scores.";
    initialsEl.appendChild(noScores);
  }

  clearScoresEl = document.createElement("button");
  clearScoresEl.setAttribute("class", "btn btn-dark");
  clearScoresEl.setAttribute("type", "button");
  clearScoresEl.textContent = "Clear Scores";
  initialsEl.appendChild(clearScoresEl);
  clearScoresEl.addEventListener("click", function () {
    localStorage.clear();
    return showScores();
  })

};

// Starting Appearance
questionsEl.textContent = "Please click the button below to begin the quiz!";
buttonEl = document.createElement("button");
buttonEl.setAttribute("class", "btn btn-dark");
buttonEl.setAttribute("type", "button");
buttonEl.textContent = "Start Quiz";
startEl.appendChild(buttonEl);
startButton = startEl.querySelector(".btn");

// Event Listeners
startButton.addEventListener("click", startQuiz);
highScoreEl.addEventListener("click", showScores);