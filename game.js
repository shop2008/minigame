let playerScore = 0;
let computerScore = 0;
let gamesPlayed = 0;

function playGame(playerChoice) {
  if (gamesPlayed >= 5) return;

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const result = getWinner(playerChoice, computerChoice);
  updateScore(result);
  displayResult(playerChoice, computerChoice, result);

  gamesPlayed++;
  checkGameEnd();
}

function getWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }
  return "computer";
}

function updateScore(result) {
  if (result === "player") playerScore++;
  if (result === "computer") computerScore++;
}

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

function getImageSource(choice) {
  const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
  };
  return emojis[choice];
}
