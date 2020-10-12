// Questions Array

var questions = [
  {
    question: "Question 1: Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  },
  {
    question: "Question 2: The condition in an if / else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
  },
  {
    question: "Question 3: The instructions for a function are enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "curly brackets"
  },
  {
    question: "Question 4: A property of an object that is a function is called a ____.",
    answers: ["method", "string", "stylesheet", "boolean"],
    correctAnswer: "method"
  },
  {
    question: "Question 5: The logical operator that represents 'or' is ____.",
    answers: ["||", "OR", "&&", "==="],
    correctAnswer: "||"
  }
];

// Global Variables
var score = 0;
var questionNumber = 0;
var time = 60;
var timerEl = document.querySelector("#timer");

// Timer Function
function timer() {

  var timerInt = setInterval(function () {
    if (time > 0) {
      timerEl.textContent = time;
      time--;
    } else {
      timerEl.textContent = "Time's up!";
      clearInterval(timerInt);
      endQuiz();
    }

  }, 1000);
};

// Quiz Function
function startQuiz() {

};

// End Quiz Function
function endQuiz() {

};

// Event Listeners
