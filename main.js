let numberOfGameTotals = 5;
let actions = ['Rock', 'Paper', 'Scissors'];
let playerSelection = 'Rock';
let numberOfRounds = 1, winnerHuman = 0, winnerComputer = 0, draw = 0;
let winner = '';
let roundWinner = ''; 

// UTILS
function getComputerChoice() {
    return actions[Math.floor(Math.random() * 3)];
}

// LOGIC
function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        roundWinner =  'draw';
    }
    else if ((playerSelection == actions[0] && computerSelection == actions[2]) ||
        (playerSelection == [1] && computerSelection == [0]) || (playerSelection == [2] && computerSelection == [1])) {
        roundWinner = 'human';
    } else {
        roundWinner = 'computer';
    }
    return roundWinner
}

function game() {

    do {
        let computerChoice = getComputerChoice();
        
        if((numberOfRounds == (numberOfGameTotals - 1)) && (winnerHuman == winnerComputer)) {
            console.log('Round: ' + numberOfRounds + '\nOther round \nHuman: ' + playerSelection + ': ' + winnerHuman + '\nComputer: ' + computerChoice + ': '+winnerComputer)
            console.log('')
            numberOfGameTotals++
            continue;
        }

        if (winnerHuman > Math.floor((numberOfGameTotals / 2)) ) {
            winner = 'Human'
            break;
        } else if(winnerComputer > Math.floor((numberOfGameTotals / 2))) {
            winner = 'Computer'
            break;
        }

        //Actions
        if (playRound(playerSelection, computerChoice) == 'human') {
            console.log('Round: ' + numberOfRounds + '\nWinner Human \nHuman: ' + playerSelection + '\nComputer: ' + computerChoice)
            console.log('---\n')
            winnerHuman++
        } else if (playRound(playerSelection, computerChoice) == 'computer') {
            console.log('Round: ' + numberOfRounds + '\nWinner Computer \nHuman: ' + playerSelection + '\nComputer: ' + computerChoice)
            console.log('---\n')
            winnerComputer++
        } else {
            console.log('Round: ' + numberOfRounds + '\Draw \nHuman: ' + playerSelection + '\nComputer: ' + computerChoice)
            console.log('---\n')
            draw++
        }    
        numberOfRounds++
    }while(numberOfRounds <= numberOfGameTotals)

    // If the total number of games is five, then the number of rounds would be six.
    if((winner == 'Human') || (winnerHuman > winnerComputer)) {
        console.log('---')
        console.log('Winner Human')
        console.log('---\n')

    } else {
        console.log('---')
        console.log('Winner Computer')
        console.log('---\n')
    }
    console.log('\nGame \nHuman: ' + winnerHuman + '\nComputer: ' + winnerComputer + '\nTotals: ' + numberOfGameTotals + '\Draw: ' + draw , '\Rounds: ' + (numberOfRounds - 1 ))
}

game()