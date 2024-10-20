let numberOfGameTotals = 1;
const actions = ["Rock", "Paper", "Scissors"];
const players = ["Human", "Ia", "Draw"];
let winnerHuman = 0,
    winnerAi = 0,
    draw = 0;

let winningTitle = "";
let bg = ""

const $background = document.querySelector(".game-layout__bg")

const $armIa = document.querySelector(".arm-ai");
const $handIa = document.querySelector(".arm-ai__hand-img");
const $imageHandIa = document.querySelector(".arm-ai__hand-img");

const $armHuman = document.querySelector(".arm-human");
const $handHuman = document.querySelector(".arm-human__hand-img");
const $imageHandHuman = document.querySelector(".arm-human__hand-img");

const $buttonsHands = document.querySelectorAll(".buttons-hands");
const $buttonsHandsBox = document.querySelector(".game-buttons");

const $humanScore = document.querySelector("#human-score");
const $aiScore = document.querySelector("#ai-score");

const $buttonRestart = document.querySelector("#button-restart");
const $buttonNextRound = document.querySelector("#button-next-round");
const $winningTitle = document.querySelector("#winning-title");
const $resultBox = document.querySelector(".game-result");

$buttonsHands.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const playedAi = getAiChoice();
        const playedHuman = getHumanChoice(e);
        const roundWinner = gameWinner(playedHuman, playedAi);

        if (roundWinner == players[0]) {
            bg = "#a5ee99"
            winnerHuman = winnerHuman + 1;
            winningTitle = "You Win!";
        } else if (roundWinner == players[1]) {
            bg = "#ff9de9"
            winnerAi = winnerAi + 1;
            winningTitle = "You Loose!";
        } else {
            bg = "#9dcaff"
            draw = draw + 1;
            winningTitle = "It's Draw";
        }

        exeAnimation();
        $buttonsHandsBox.style.display = "none";

        setTimeout(() => {
            $imageHandIa.src =
                "../assets/img/ai-arm/big/" + playedAi.toLowerCase() + "-ai.png";
            $imageHandHuman.src =
                "../assets/img/human-arm/big/" + playedHuman.toLowerCase() + "-human.png";
            $aiScore.textContent = winnerAi;
            $humanScore.textContent = winnerHuman;
            $winningTitle.textContent = winningTitle;
            $resultBox.style.display = "flex";


            $handIa.classList.remove("rock")
            $handHuman.classList.remove("rock")
            $handIa.classList.add(`${playedAi.toLowerCase()}`)
            $handHuman.classList.add(`${playedHuman.toLowerCase()}`)

            $background.style.setProperty("--main-bg-color", `${bg}`)
            $background.style.animation = "circle-in-center 0.8s ease-in-out"
        }, 2700);
    });
});

$buttonRestart.addEventListener("click", resetGame);
$buttonNextRound.addEventListener("click", nextRound);

function nextRound() {
    resetCss();
}
function resetGame() {
    winnerHuman = 0
    winnerAi = 0
    draw = 0
    winningTitle = "";
    $winningTitle.textContent = winningTitle;
    $aiScore.textContent = winnerAi;
    $humanScore.textContent = winnerHuman;

    resetCss();
}

// UTILS
function resetCss() {
    $resultBox.style.display = "none";
    $buttonsHandsBox.style.display = "flex";

    $armIa.classList.remove("stretch")
    $handIa.classList.remove("reveal-move");
    $armIa.classList.add("movement");
    $handIa.classList.add("movement");

    $armHuman.classList.remove("stretch");
    $handHuman.classList.remove("reveal-move");
    $armHuman.classList.add("movement");
    $handHuman.classList.add("movement");
    bg = "#9dcaff";
    $background.style.setProperty("--main-bg-color", `${bg}`)
    $background.style.animation = ""

    $handIa.classList.remove("paper","scissors")
    $handHuman.classList.remove("paper","scissors")
    
    $handIa.classList.add("rock")
    $handHuman.classList.add("rock")


    $imageHandIa.src = "/assets/img/ai-arm/big/rock-ai.png";
    $imageHandHuman.src = "/assets/img/human-arm/big/rock-human.png";
}

function exeAnimation() {
    $armIa.classList.remove("movement");
    $handIa.classList.remove("movement");
    $armIa.classList.add("raise");
    $handIa.classList.add("tilt");

    $armHuman.classList.remove("movement");
    $handHuman.classList.remove("movement");
    $armHuman.classList.add("raise");
    $handHuman.classList.add("tilt");

    setTimeout(() => {
        $armIa.classList.remove("raise");
        $handIa.classList.remove("tilt");
        $armIa.classList.add("up-down");
        $handIa.classList.add("up-down");

        $armHuman.classList.remove("raise");
        $handHuman.classList.remove("tilt");
        $armHuman.classList.add("up-down");
        $handHuman.classList.add("up-down");
    }, 1000);

    setTimeout(() => {
        $armIa.classList.remove("up-down");
        $handIa.classList.remove("up-down");
        $armIa.classList.add("stretch")
        $handIa.classList.add("reveal-move");

        $armHuman.classList.remove("up-down");
        $handHuman.classList.remove("up-down");
        $armHuman.classList.add("stretch");
        $handHuman.classList.add("reveal-move");
    }, 2500);
}
function getAiChoice() {
    return actions[Math.floor(Math.random() * 3)];
}
function getHumanChoice(e) {
    const element = e.target.parentNode.id;
    switch (element.toString()) {
        case "rock-button":
            return actions[0];
        case "paper-button":
            return actions[1];
        case "scissors-button":
            return actions[2];
        default:
            console.log(`Sorry, we are out of expresion`);
    }
}
function gameWinner(humanSelection, iaSelection) {
    if (humanSelection == iaSelection) {
        roundWinner = players[2];
    } else if (
        (humanSelection == actions[0] && iaSelection == actions[2]) ||
        (humanSelection == actions[1] && iaSelection == actions[0]) ||
        (humanSelection == actions[2] && iaSelection == actions[1])
    ) {
        roundWinner = players[0];
    } else {
        roundWinner = players[1];
    }
    return roundWinner;
}