
/* =========================================
   QUIZ APPLICATION - script.js

   This file contains:
   1. Questions Array
   2. shuffleQuestions()
   3. startTimer()
   4. displayQuestion()
   5. checkAnswer()
   6. nextQuestion()
   7. startQuiz()
========================================= */


/* =========================================
   1. QUESTIONS ARRAY
   Stores questions, answer options and
   the correct answer.
========================================= */

const questions = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "Which HTML tag is used to create a paragraph?",
        options: [
            "<h1>",
            "<p>",
            "<div>",
            "<br>"
        ],
        answer: "<p>"
    },

    {
        question: "Which language is used to style a webpage?",
        options: [
            "HTML",
            "Java",
            "CSS",
            "Python"
        ],
        answer: "CSS"
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: "#"
    },

    {
        question: "Which language makes a webpage interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: "JavaScript"
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "int",
            "var",
            "string",
            "define"
        ],
        answer: "var"
    },

    {
        question: "Which HTML tag is used to insert an image?",
        options: [
            "<image>",
            "<picture>",
            "<img>",
            "<src>"
        ],
        answer: "<img>"
    },

    {
        question: "Which CSS property changes the text colour?",
        options: [
            "background-color",
            "font-size",
            "text-style",
            "color"
        ],
        answer: "color"
    },

    {
        question: "Which method displays a message box in JavaScript?",
        options: [
            "alert()",
            "print()",
            "message()",
            "display()"
        ],
        answer: "alert()"
    },

    {
        question: "Which HTML tag creates a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: "<a>"
    }

];


/* =========================================
   GLOBAL VARIABLES
========================================= */

// Stores the randomized questions
let shuffledQuestions = [];

// Tracks the current question
let currentQuestionIndex = 0;

// Stores the user's score
let score = 0;

// Timer variables
let timeLeft = 15;
let timerInterval;

// Tracks whether an answer has been submitted
let answered = false;


/* =========================================
   2. shuffleQuestions()

   Randomly changes the order of questions
   using the Fisher-Yates shuffle algorithm.
========================================= */

function shuffleQuestions() {

    // Create a copy of the original questions
    shuffledQuestions = [...questions];

    // Shuffle the questions randomly
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        // Swap two questions
        [shuffledQuestions[i], shuffledQuestions[j]] =
        [shuffledQuestions[j], shuffledQuestions[i]];

    }

}


/* =========================================
   3. startTimer()

   Starts a 15-second countdown for each
   question.
========================================= */

function startTimer() {

    // Clear any previous timer
    clearInterval(timerInterval);

    // Reset time to 15 seconds
    timeLeft = 15;

    // Display initial time
    document.getElementById("timer").innerHTML = timeLeft;

    // Reset timer progress bar
    document.getElementById("timerProgress").style.width = "100%";

    document.getElementById("timerProgress").style.backgroundColor =
        "#27ae60";

    // Start countdown
    timerInterval = setInterval(function() {

        timeLeft--;

        // Update timer display
        document.getElementById("timer").innerHTML = timeLeft;

        // Update progress bar
        document.getElementById("timerProgress").style.width =
            (timeLeft / 15 * 100) + "%";

        // Change colour when time is running low
        if (timeLeft <= 5) {
            document.getElementById("timerProgress").style.backgroundColor =
                "#e74c3c";
        }

        // When time reaches zero
        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            // Mark the question as unanswered
            answered = true;

            // Display timeout feedback
            let correctAnswer =
                shuffledQuestions[currentQuestionIndex].answer;

            document.getElementById("feedback").innerHTML =
                "Time is up! The correct answer is: " + correctAnswer;

            document.getElementById("feedback").className =
                "feedback incorrect";

            // Highlight correct answer
            highlightCorrectAnswer();

            // Show next button
            document.getElementById("submitBtn").hidden = true;
            document.getElementById("nextBtn").hidden = false;

        }

    }, 1000);

}


/* =========================================
   4. displayQuestion()

   Displays the current question and its
   multiple-choice answer options.
========================================= */

function displayQuestion() {

    // Get the current question
    let currentQuestion =
        shuffledQuestions[currentQuestionIndex];

    // Reset answer status
    answered = false;

    // Display question number
    document.getElementById("questionNumber").innerHTML =
        "Question " + (currentQuestionIndex + 1) +
        " of " + shuffledQuestions.length;

    // Display question text
    document.getElementById("question").innerHTML =
        currentQuestion.question;

    // Get options container
    let optionsHTML = "";

    // Display all answer options
    for (let i = 0; i < currentQuestion.options.length; i++) {

        optionsHTML += `
            <label class="option">
                <input
                    type="radio"
                    name="answer"
                    value="${i}"
                >
                ${currentQuestion.options[i]}
            </label>
        `;

    }

    // Insert options into webpage
    document.getElementById("options").innerHTML =
        optionsHTML;

    // Clear previous feedback
    document.getElementById("feedback").innerHTML = "";

    document.getElementById("feedback").className =
        "feedback";

    // Show Submit button
    document.getElementById("submitBtn").hidden = false;

    // Hide Next button
    document.getElementById("nextBtn").hidden = true;

    // Start timer for this question
    startTimer();

}


/* =========================================
   HELPER FUNCTION
   Highlights the correct answer when
   the user answers or time runs out.
========================================= */

function highlightCorrectAnswer() {

    let correctAnswer =
        shuffledQuestions[currentQuestionIndex].answer;

    let options =
        document.querySelectorAll(".option");

    options.forEach(function(option) {

        let radio = option.querySelector("input");

        let optionText = radio.parentElement.textContent.trim();

        if (optionText === correctAnswer) {
            option.classList.add("correct");
        }

    });

}


/* =========================================
   5. checkAnswer()

   Checks whether the selected answer
   is correct and updates the score.
========================================= */

function checkAnswer() {

    // Prevent checking an answer more than once
    if (answered) {
        return;
    }

    // Get selected answer
    let selectedOption =
        document.querySelector('input[name="answer"]:checked');

    // Check whether an option was selected
    if (selectedOption === null) {

        alert("Please select an answer!");

        return;

    }

    // Stop timer after submission
    clearInterval(timerInterval);

    // Mark question as answered
    answered = true;

    // Get selected option text
    let selectedIndex = Number(selectedOption.value);

    let selectedAnswer =
        shuffledQuestions[currentQuestionIndex].options[selectedIndex];

    // Get correct answer
    let correctAnswer =
        shuffledQuestions[currentQuestionIndex].answer;

    // Get feedback element
    let feedback =
        document.getElementById("feedback");

    // Check whether answer is correct
    if (selectedAnswer === correctAnswer) {

        // Increase score
        score++;

        feedback.innerHTML = "Correct! Well done!";

        feedback.className = "feedback correct";

    } else {

        feedback.innerHTML =
            "Incorrect! The correct answer is: " + correctAnswer;

        feedback.className = "feedback incorrect";

    }

    // Highlight correct answer
    highlightCorrectAnswer();

    // Highlight incorrect selected answer
    if (selectedAnswer !== correctAnswer) {

        selectedOption.parentElement.classList.add("incorrect");

    }

    // Disable all answer options
    let allOptions =
        document.querySelectorAll('input[name="answer"]');

    allOptions.forEach(function(option) {
        option.disabled = true;
    });

    // Hide Submit button
    document.getElementById("submitBtn").hidden = true;

    // Show Next button
    document.getElementById("nextBtn").hidden = false;

}


/* =========================================
   6. nextQuestion()

   Moves to the next question and resets
   the timer.
========================================= */

function nextQuestion() {

    // Move to the next question
    currentQuestionIndex++;

    // Check whether all questions are completed
    if (currentQuestionIndex >= shuffledQuestions.length) {

        clearInterval(timerInterval);

        // Display final result
        showFinalResult();

        return;

    }

    // Display next question
    displayQuestion();

}


/* =========================================
   HELPER FUNCTION
   Displays the final quiz score.
========================================= */

function showFinalResult() {

    // Hide quiz section
    document.getElementById("quizSection").hidden = true;

    // Show result section
    document.getElementById("resultSection").hidden = false;

    // Calculate percentage
    let percentage = Math.round(
        (score / shuffledQuestions.length) * 100
    );

    // Display final score
    document.getElementById("finalScore").innerHTML =
        score + " / " + shuffledQuestions.length;

    // Display percentage
    document.getElementById("percentage").innerHTML =
        "Your Result: " + percentage + "%";

    // Display final message
    let message;

    if (percentage >= 80) {
        message = "Excellent! Great job!";
    }
    else if (percentage >= 50) {
        message = "Good effort! Keep practising!";
    }
    else {
        message = "Keep learning and try again!";
    }

    document.getElementById("finalMessage").innerHTML =
        message;

}


/* =========================================
   7. startQuiz()

   Starts the quiz by shuffling questions,
   displaying the first question and
   starting the timer.
========================================= */

function startQuiz() {

    // Stop any existing timer
    clearInterval(timerInterval);

    // Reset score
    score = 0;

    // Reset question index
    currentQuestionIndex = 0;

    // Reset answer status
    answered = false;

    // Randomize question order
    shuffleQuestions();

    // Hide start section
    document.getElementById("startSection").hidden = true;

    // Hide previous result section
    document.getElementById("resultSection").hidden = true;

    // Display quiz section
    document.getElementById("quizSection").hidden = false;

    // Display first question
    displayQuestion();

}
