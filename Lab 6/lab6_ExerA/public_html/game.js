
/* Global variables */
let wins = 0;
let losses = 0;
let draws = 0;

let results = [];
let gameStarted = false;


/* 1. startGame() */
function startGame() {

    // Get player name
    let name = document.getElementById("playerName").value.trim();

    // Check whether name is empty
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Display welcome message
    document.getElementById("result").innerHTML =
        "Welcome, " + name + "!";

    // Display start date and time
    let now = new Date();

    document.getElementById("startTime").innerHTML =
        "Game started: " + now.toLocaleString();

    // Allow the game to start
    gameStarted = true;

    // Clear previous summary
    document.getElementById("summary").innerHTML = "";
}


/* 2. getComputerChoice() */
function getComputerChoice() {

    // Array containing three choices
    let choices = ["rock", "paper", "scissors"];

    // Generate random number
    let randomIndex = Math.floor(Math.random() * 3);

    // Return computer choice
    return choices[randomIndex];
}


/* 3. playRound(playerChoice) */
function playRound(playerChoice) {

    // Check whether game has started
    if (gameStarted === false) {
        alert("Click Start Game first.");
        return;
    }

    // Get computer choice
    let computerChoice = getComputerChoice();

    // Determine result
    let result;

    if (playerChoice === computerChoice) {

        result = "Draw";
        draws++;

    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {

        result = "Win";
        wins++;

    } else {

        result = "Lose";
        losses++;

    }

    // Change player image
    document.getElementById("playerImg").src =
        playerChoice + ".png";

    // Change computer image
    document.getElementById("computerImg").src =
        computerChoice + ".png";

    // Display player choice
    document.getElementById("playerChoice").innerHTML =
        playerChoice.toUpperCase();

    // Display computer choice
    document.getElementById("computerChoice").innerHTML =
        computerChoice.toUpperCase();

    // Display result with different colours
    let resultElement = document.getElementById("result");

    resultElement.innerHTML = result;

    resultElement.className = result.toLowerCase();

    // Store result in array
    results.push(result);

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Add new row to history table
    let table = document.getElementById("historyBody");

    let newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = results.length;
    newRow.insertCell(1).innerHTML = playerChoice;
    newRow.insertCell(2).innerHTML = computerChoice;
    newRow.insertCell(3).innerHTML = result;

}


/* 4. showSummary() */
function showSummary() {

    // Count total rounds
    let totalRounds = results.length;

    // Check whether any rounds have been played
    if (totalRounds === 0) {
        alert("No games played yet.");
        return;
    }

    // Count wins using a loop
    let totalWins = 0;

    for (let i = 0; i < results.length; i++) {

        if (results[i] === "Win") {
            totalWins++;
        }

    }

    // Calculate win percentage
    let percentage = Math.round(
        (totalWins / totalRounds) * 100
    );

    // Display summary
    document.getElementById("summary").innerHTML =
        "You played " + totalRounds +
        " rounds and won " + percentage + "%.";

}


/* 5. resetGame() */
function resetGame() {

    // Reset scores
    wins = 0;
    losses = 0;
    draws = 0;

    // Empty results array
    results = [];

    // Reset scoreboard
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear history table
    document.getElementById("historyBody").innerHTML = "";

    // Clear summary
    document.getElementById("summary").innerHTML = "";

    // Reset images
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";

    // Reset choices
    document.getElementById("playerChoice").innerHTML = "Rock";
    document.getElementById("computerChoice").innerHTML = "Rock";

    // Reset result message
    document.getElementById("result").innerHTML =
        "Result will appear here";

    document.getElementById("result").className = "";

    // Stop the game
    gameStarted = false;

    // Clear player name
    document.getElementById("playerName").value = "";

    // Clear start time
    document.getElementById("startTime").innerHTML = "";

}
