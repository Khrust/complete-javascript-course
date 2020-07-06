/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const POINTS_TO_WIN = 100;

function changeButtonsState(disableParam = false) {
  let buttonsElements = document.querySelectorAll(".btn-roll, .btn-hold");
  buttonsElements.forEach((element) => {
    element.disabled = disableParam;
    disableParam === false
      ? element.classList.remove("btn-disabled")
      : element.classList.toggle("btn-disabled");
  });
}

function finishGame() {
  changeButtonsState(true);
}

function newGame() {
  changeButtonsState();
  playerScores = document.querySelectorAll(
    ".player-score, .player-current-score"
  );
  if (playerScores != null) {
    playerScores.forEach((element) => {
      element.innerHTML = 0;
    });
  }
}

function finishRound(roundScore = 0) {
  //Add current round score to active player total score
  let playerTotalScoreElement = document.querySelector(
    ".active > .player-score"
  );
  let playerTotalScore = +playerTotalScoreElement.innerHTML + +roundScore;
  if (playerTotalScore >= POINTS_TO_WIN) {
    finishGame();
  }
  playerTotalScoreElement.innerHTML = playerTotalScore;

  //Clear current player round score
  let playerCurrentScoreElement = document.querySelector(
    ".active > .player-current-box > .player-current-score"
  );
  playerCurrentScoreElement.innerHTML = 0;

  //Change active player
  let playerPanelElements = document.querySelectorAll(
    ".wrapper > .player-panel"
  );
  playerPanelElements.forEach((element) => {
    element.classList.toggle("active");
  });

  //remove dice
  let diceDOM = document.querySelector("#dice");
  diceDOM.style.display = "none";
}

document.getElementById("btn-roll").onclick = () => {
  //Generate dice value
  let result = Math.floor(Math.random() * 6) + 1;
  let diceDOM = document.getElementById("dice");
  diceDOM.src = `dice-${result}.png`;
  diceDOM.style.display = "block";

  //if result = 1 then end round and player take 0 score for the round
  if (result === 1) {
    finishRound();
    return;
  }

  //else continue round
  currentPlayerScore = document.querySelector(
    "div.active > .player-current-box > .player-current-score"
  );
  //currentPlayerScore = currentPlayerBox.querySelector("");
  if (currentPlayerScore != null) {
    currentScore = +currentPlayerScore.innerHTML;
    currentPlayerScore.innerHTML = currentScore + result;
  }
};

document.querySelector(".btn-new").onclick = newGame;

document.querySelector(".btn-hold").onclick = () => {
  currentPlayerScore = document.querySelector(
    "div.active > .player-current-box > .player-current-score"
  );
  finishRound(+currentPlayerScore.innerHTML);
};
