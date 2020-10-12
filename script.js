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
    correctAnswer: "0"
  }
];

// Global Variables
var score = 0;
var questionNum = 0;
var time = 60;
var timerEl = document.querySelector("#timer");
var contentEl = document.querySelector("#content");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var answerEl = document.querySelector("#answer");

questionsEl.textContent = "Please click the button above to begin the quiz!";
buttonEl = document.createElement("button");
buttonEl.setAttribute("class", "btn btn-dark");
buttonEl.setAttribute("type", "button");
buttonEl.textContent = "Start Quiz";
answerEl.appendChild(buttonEl);

// Timer Function
function timer() {

  var timerInt = setInterval(function () {
    if (time > 0) {
      timerEl.textContent = time;
      time--;
    } else {
      timerEl.textContent = "Time's up!";
      endQuiz();
    }

  }, 1000);
};

// Initialize Quiz
function initQuiz() {
  timer();
  startQuiz();
}

// Quiz Function
function startQuiz() {
  questionsEl.innerHTML = "";
  answersEl.innerHTML = "";
  answerEl.innerHTML = "";

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
    endQuiz();
  }
};

// Check Answer Function
function answerClick(event) {
  var buttonId = event.target.getAttribute("button-id");

  if (buttonId === questions[questionNum].correctAnswer) {
    answerEl.textContent = "Correct"
    questionNum++;
    startQuiz();
  } else {
    answerEl.textContent = "Incorrect"
    time = time - 10;
    questionNum++;
    startQuiz();
  }
};


// End Quiz Function
function endQuiz() {
  questionsEl.innerHTML = "";
  answersEl.innerHTML = "";
  answerEl.textContent = "";

  questionsEl.textContent = "Quiz is done! Your score is " + time + "!"
  clearInterval(timerInt);
};

// Save Scores Function


// Event Listeners
answersEl.addEventListener("click", answerClick);
answerEl.addEventListener("click", initQuiz);