const actions = ["Rock","Paper","Scissor"];

let playerScore = 0;
let computerScore = 0;

function getComputerChoice(){

    return actions[Math.floor(Math.random() * actions.length)];

};

function getPlayerChoice(){

    const choice = prompt("Write your choice:");

    return choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();

};

function singleRound(playerSelection, computerSelection){

    if(playerSelection === computerSelection){
        alert("Tie!");
    }else{

        switch(true){

            case (playerSelection === actions[0] && computerSelection === actions[1]):
                alert(`You Lose! ${actions[1]} beats ${actions[0]}`);
                computerScore++;
                break;
    
            case (playerSelection === actions[0] && computerSelection === actions[2]):
                alert(`You Win! ${actions[0]} beats ${actions[2]}`);
                playerScore++;
                break;



            case (playerSelection === actions[1] && computerSelection === actions[0]):
                alert(`You Win! ${actions[1]} beats ${actions[0]}`);
                playerScore++;
                break;

            case (playerSelection === actions[1] && computerSelection === actions[2]):
                alert(`You Lose! ${actions[2]} beats ${actions[1]}`);
                computerScore++;
                break;



            case (playerSelection === actions[2] && computerSelection === actions[0]):
                alert(`You Lose! ${actions[0]} beats ${actions[2]}`);
                computerScore++;
                break;

            case (playerSelection === actions[2] && computerSelection === actions[1]):
                alert(`You Win! ${actions[2]} beats ${actions[1]}`);
                playerScore++;
                break;
        }

    };

}

function playGame(){

    for( i = 0; i <= 4; i++ ){

        singleRound(getPlayerChoice(),getComputerChoice());

    };

    if(playerScore > computerScore){
        alert(`Winner is you! Score: ${playerScore}-${computerScore}`);
    }else if(computerScore > playerScore){
        alert(`Winner is computer! Score: ${computerScore}-${playerScore}`);
    }else{
        alert(`It's tie! Score: ${computerScore}-${playerScore}`);
    };

}

playGame();

