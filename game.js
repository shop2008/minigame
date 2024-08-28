// Initialize player and computer scores to 0
let playerScore = 0;
let computerScore = 0;
let gamesPlayed = 0;

/**
 * Plays a single round of the game
 * @param {string} playerChoice - The player's choice (rock, paper, or scissors)
 */
function playGame(playerChoice) {
  // Stop the game if 5 rounds have been played
  if (gamesPlayed >= 5) return;

  // Define possible choices
  const choices = ["rock", "paper", "scissors"];
  // Randomly select a choice for the computer
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  // Determine the winner of the round
  const result = getWinner(playerChoice, computerChoice);
  // Update the scores based on the result
  updateScore(result);
  // Display the result of the round
  displayResult(playerChoice, computerChoice, result);

  // Increment the number of games played
  gamesPlayed++;
  // Check if the game has ended
  checkGameEnd();
}

/**
 * Determines the winner of a round
 * @param {string} player - The player's choice
 * @param {string} computer - The computer's choice
 * @returns {string} - 'tie', 'player', or 'computer'
 */
function getWinner(player, computer) {
  // If both choices are the same, it's a tie
  if (player === computer) return "tie";
  // Determine the winner based on the rules of the game
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }
  return "computer";
}

/**
 * Updates the score based on the round result
 * @param {string} result - The result of the round
 */
function updateScore(result) {
  if (result === "player") playerScore++;
  if (result === "computer") computerScore++;
}

/**
 * Displays the result of the round and updates the UI
 * @param {string} player - The player's choice
 * @param {string} computer - The computer's choice
 * @param {string} result - The result of the round
 */
function displayResult(player, computer, result) {
  const resultDiv = document.getElementById("result");
  const scoreDiv = document.getElementById("score");
  const playerChoiceDiv = document.getElementById("playerChoice");
  const computerChoiceDiv = document.getElementById("computerChoice");
  const playerChoiceImg = document.getElementById("playerChoiceImg");
  const computerChoiceImg = document.getElementById("computerChoiceImg");

  let resultText = `You chose ${player}, computer chose ${computer}. `;
  if (result === "tie") {
    resultText += "It's a tie!";
    playerChoiceDiv.classList.remove("winner");
    computerChoiceDiv.classList.remove("winner");
  } else if (result === "player") {
    resultText += "You win!";
    playerChoiceDiv.classList.add("winner");
    computerChoiceDiv.classList.remove("winner");
  } else {
    resultText += "Computer wins!";
    computerChoiceDiv.classList.add("winner");
    playerChoiceDiv.classList.remove("winner");
  }

  resultDiv.textContent = resultText;
  scoreDiv.textContent = `Score: You ${playerScore} - ${computerScore} Computer`;

  // Update choice display
  playerChoiceImg.textContent = getImageSource(player);
  playerChoiceImg.style.display = "block";
  computerChoiceImg.textContent = getImageSource(computer);
  computerChoiceImg.style.display = "block";
}

/**
 * Checks if the game has ended and updates the UI accordingly
 */
function checkGameEnd() {
  const gameStatus = document.getElementById("gameStatus");
  const resetBtn = document.getElementById("resetBtn");

  if (gamesPlayed >= 5) {
    const buttons = document.querySelectorAll(".game-btn");
    buttons.forEach((btn) => (btn.disabled = true));

    if (playerScore > computerScore) {
      gameStatus.textContent = "You win the game!";
    } else if (playerScore < computerScore) {
      gameStatus.textContent = "Computer wins the game!";
    } else {
      gameStatus.textContent = "It's a tie game!";
    }

    resetBtn.style.display = "block";
  } else {
    gameStatus.textContent = `Round ${gamesPlayed + 1} of 5`;
  }
}

/**
 * Resets the game state and UI to start a new game
 */
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gamesPlayed = 0;

  const buttons = document.querySelectorAll(".game-btn");
  buttons.forEach((btn) => (btn.disabled = false));

  document.getElementById("result").textContent = "";
  document.getElementById("score").textContent = "";
  document.getElementById("playerChoiceImg").style.display = "none";
  document.getElementById("computerChoiceImg").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
  document.getElementById("gameStatus").textContent = "Best of 5";
  document.getElementById("playerChoice").classList.remove("winner");
  document.getElementById("computerChoice").classList.remove("winner");
}

/**
 * Returns the emoji representation of a choice
 * @param {string} choice - The choice (rock, paper, or scissors)
 * @returns {string} - The corresponding emoji
 */
function getImageSource(choice) {
  const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
  };
  return emojis[choice];
}
