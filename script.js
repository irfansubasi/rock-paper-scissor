const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorButton = document.querySelector("#scissors-button");
const announce = document.querySelector("#announce");
const winner = document.querySelector("#winner");
const playerHealth = document.querySelector("#player-health");
const cpuHealth = document.querySelector("#cpu-health");
const playerChar = document.querySelector("#player-char");
const cpuChar = document.querySelector("#cpu-char");
const playerName = document.querySelector("#player-name");
const cpuName = document.querySelector("#cpu-name");
const startRestartPwr = document.querySelector("#temp-buttons");
const powerButton = document.querySelector("#power-button");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const arrowButtons = document.querySelector("#arrow-buttons");
const confirmButton = document.querySelector("#confirm-button");
const leftButton = document.querySelector("#left-button");
const rightButton = document.querySelector("#right-button");
const startScreen = document.querySelector("#start-screen");
const charScreen = document.querySelector("#char-select");
const tvContainer = document.querySelector(".tv-container");
const audioIcon = document.querySelector("#audio-icon");
const audioButton = document.querySelector("#audio-button");
const cheatInput = document.getElementById("cheat-input");

const actions = ["Rock","Paper","Scissors"];
const enemies = ["tiger","bongo","shiva","yasha"];

const music = new Audio();
const sfx = new Audio();

music.loop = true;


let playerScore = 0, computerScore = 0;
let choosenChar;
let position = 0;
let isKeyPressed = false;
let cheatMode = false;


function selectCharacter(charId){
     
    switch(true){
        case(charId === 1):
            playerChar.src = "images/chars/axel/run/run.gif";
            choosenChar = "axel";
            playerName.textContent = choosenChar.toUpperCase();
            break;
        case(charId === 2):
            playerChar.src = "images/chars/blaze/run/run.gif";
            choosenChar = "blaze";
            playerName.textContent = choosenChar.toUpperCase();
            break;
        case(charId === 3):
            playerChar.src = "images/chars/skate/run/run.gif";
            choosenChar = "skate";
            playerName.textContent = choosenChar.toUpperCase();
            break;
        case(charId === 4):
            playerChar.src = "images/chars/zan/run/run.gif";
            choosenChar = "zan";
            playerName.textContent = choosenChar.toUpperCase();
            break;
    }    

    music.pause();
    music.currentTime = 0;
    music.src = "audio/main.mp3"
    music.play();
    document.querySelector("#char-select").style.display = "none";
    document.querySelector("#tv-screen").style.display = "block";
    document.querySelector("#buttons").style.display = "flex";
    arrowButtons.style.display = "none";
    confirmButton.style.display = "none";
    setTimeout(() => {
        playerChar.src = `images/chars/${choosenChar}/idle/idle.gif`;
    }, 4000);

}

function slideScene(){
    
    const scene = document.querySelector(".tv-content");

    position -= 307;

    scene.style.left = `${position}%`;
}


function checkDeath(){

    if(playerScore == 5){

        setTimeout(() => {
            playerChar.src = `images/chars/${choosenChar}/finisher/finisher.gif`
            sfx.src = `audio/${choosenChar}finisher.wav`
            sfx.play();
        },1500);
        setTimeout(() => {
            playerChar.src = `images/chars/${choosenChar}/idle/idle.gif`
        },2800);
        setTimeout(() => {
            cpuChar.src = `images/chars/${enemies[0]}/death/death.gif`
            enemies[0] == "yasha" ? sfx.src = "audio/deathfemale.wav" : sfx.src = "audio/deathmale.wav";
            sfx.play();
        },2800);
        setTimeout(() => {
            cpuChar.src = ``;
            enemies.shift();
            if( enemies.length < 1){
                endGame();
            }else{
                cpuChar.classList.remove("char2-animation");
                playerChar.src = `images/chars/${choosenChar}/run/run.gif`
                slideScene()
                cpuName.textContent = enemies[0].toUpperCase();
                playerScore = 0;
                computerScore = 0;
                playerHealth.style.width = "100%"
                cpuHealth.style.width = "100%"
            }
        }, 7800);
        setTimeout(() => {
            playerChar.src = `images/chars/${choosenChar}/idle/idle.gif`
            cpuChar.classList.add("char2-animation");
            cpuChar.src = `images/chars/${enemies[0]}/run/run.gif`
            sfx.src = `audio/${enemies[0]}entrance.wav`;
            sfx.play();
        }, 12800);
        setTimeout(() => {
            cpuChar.src = `images/chars/${enemies[0]}/idle/idle.gif`
        }, 16800);

        
    } else if(computerScore == 5){

        playerChar.src = `images/chars/${choosenChar}/death/death.gif`;
        choosenChar === "blaze" ? sfx.src = `audio/deathfemale.wav` : sfx.src = `audio/deathmale.wav`;
        sfx.play();

        setTimeout(() => {
            endGame();
        },2800);
        
    }
}

function takingDamage(){

    cpuHealth.style.width = `${((1-(playerScore / 5)) * 100).toFixed(0)}%`
    playerHealth.style.width = `${((1-(computerScore / 5)) * 100).toFixed(0)}%`

}

function charDamageSrc(sideChar, name) {

    if(playerScore == 5 || computerScore == 5){
        checkDeath()
    }else{
        sideChar.src = `images/chars/${name}/takehit/takehit.png`;
        setTimeout(() => {
            sideChar.src = `images/chars/${name}/idle/idle.gif`;
        }, 3000);
    } 
}

function charAttackSrc(sideChar, name){

    const audioFiles = ["audio/attack1.wav", "audio/attack2.wav", "audio/attack3.wav", "audio/attack4.wav", "audio/attack5.wav"];
    let currentIndex = 0;

    sfx.onended = function() {
        currentIndex++;
        if (currentIndex < audioFiles.length) {
            sfx.src = audioFiles[currentIndex];
            sfx.play();
        }
    };
    
    sideChar.src = `images/chars/${name}/attack/attack.gif`;

    name == "yasha" ? sfx.src = "audio/yashaattack.wav" : sfx.src = audioFiles[currentIndex];

    sfx.play();
    setTimeout(() => {
        sideChar.src = `images/chars/${name}/idle/idle.gif`;
    }, 3000);
}

function getComputerChoice(){

    return actions[Math.floor(Math.random() * actions.length)];

};



function playGame(playerSelection, computerSelection){

    
    if(playerSelection === computerSelection){

        if(cheatMode == true){
            announce.innerHTML = `<p style="line-height: 100%"; class="text-warning outlined-text">You are cheater!</p>`;
            playerScore++;
            charAttackSrc(playerChar, choosenChar);
            charDamageSrc(cpuChar, enemies[0]);
            takingDamage();
        }else{
            announce.innerHTML = `<p style="line-height: 100%" class="text-light outlined-text">Tie!</p>`;
        }
    }else{

        switch(true){

            case (playerSelection === actions[0] && computerSelection === actions[1]):
            case (playerSelection === actions[1] && computerSelection === actions[2]):
            case (playerSelection === actions[2] && computerSelection === actions[0]):
                
                if(cheatMode == true){
                    announce.innerHTML = `<p style="line-height: 100%"; class="text-warning outlined-text">You are cheater!</p>`;
                    playerScore++;
                    charAttackSrc(playerChar, choosenChar);
                    charDamageSrc(cpuChar, enemies[0]);
                    takingDamage();
                }else{
                    announce.innerHTML = `<p style="line-height: 100%"; class="text-danger outlined-text">You lose in this round!<br>${computerSelection} beats ${playerSelection}</p>`;
                    computerScore++;
                    charAttackSrc(cpuChar, enemies[0]);
                    charDamageSrc(playerChar, choosenChar);
                    takingDamage();
                }
                break;
    
            case (playerSelection === actions[0] && computerSelection === actions[2]):
            case (playerSelection === actions[1] && computerSelection === actions[0]):
            case (playerSelection === actions[2] && computerSelection === actions[1]):

                if(cheatMode == true){
                    announce.innerHTML = `<p style="line-height: 100%"; class="text-warning outlined-text">You are cheater!</p>`;
                }else{
                    announce.innerHTML = `<p style="line-height: 100%"; class="text-success outlined-text">You win in this round!<br>${playerSelection} beats ${computerSelection}</p>`;
                }
                playerScore++;
                charAttackSrc(playerChar, choosenChar);
                charDamageSrc(cpuChar, enemies[0]);
                takingDamage();
                break;
                
        };

    };   

};

function endGame(){

    setTimeout(() => {
        announce.style.display = "none";
    },2000);
    

    if(playerScore == 5){
        winner.classList.add("game-over-animated");
        winner.style.display = "block";
        if(cheatMode == true){
            winner.innerHTML = `<p style="font-size:0.8vw; position: absolute; transform: translate(-50%, -50%); top: 50%; left: 50%; width: 100%; background: rgba(0,0,0,0.5); padding: 2%;">GAME OVER!<br>But you are still a cheater...</p>`;
        }else{
            winner.innerHTML = `<p style="font-size:0.8vw; position: absolute; transform: translate(-50%, -50%); top: 50%; left: 50%; width: 100%; background: rgba(0,0,0,0.5); padding: 2%;">GAME OVER!<br>You have proven your ultimate luck!<br>Go and play some lottery!</p>`;
        }
        music.src = "audio/gameover.mp3";
        music.loop = false;
        music.play();
        
    }else if(computerScore == 5){
        winner.classList.add("game-over-animated");
        winner.style.display = "block";
        winner.innerHTML = `<p style="font-size:0.8vw; position: absolute; transform: translate(-50%, -50%); top: 50%; left: 50%; width: 100%; background: rgba(0,0,0,0.5); padding: 2%;">GAME OVER!<br>Good luck is just that the coincidences are in your favor!<br>Try again!</p>`;
        music.src = "audio/gameover.mp3";
        music.loop = false;
        music.play();
    }

    document.querySelector("#buttons").style.display = "none";
    
    setTimeout(() => {
        restartButton.style.display = "block";
    }, 7000);

};


function gameStart(){
    startScreen.style.display = "none";
    charScreen.style.display = "grid";
    startButton.style.display = "none";
    audioButton.style.display = "block";
    arrowButtons.style.display = "grid";
    confirmButton.style.display = "block";
}


function changeVolume(type){
    type.volume > 0 ? type.volume -= 0.25 :  type.volume = 1;

    if (type.volume == 1){
        audioIcon.src = "images/buttons/audio4.png";
    } else if (type.volume == 0.75){
        audioIcon.src = "images/buttons/audio3.png";
    } else if (type.volume == 0.5){
        audioIcon.src = "images/buttons/audio2.png";
    } else if(type.volume == 0.25){
        audioIcon.src = "images/buttons/audio1.png";
    } else{
        audioIcon.src = "images/buttons/audio0.png";
    }
    
}

function characterShowcase(){
    const selectedCharacter = document.querySelector('.character.selected');
    const charBody = document.querySelector("#char-body");
    const charName = document.querySelector("#char-name");
    if(selectedCharacter.id === "char1"){
        charBody.src = "images/chars/axel/idle/idle.gif";
        charName.textContent = "AXEL";
    } else if(selectedCharacter.id === "char2"){
        charBody.src = "images/chars/blaze/idle/idle.gif";
        charName.textContent = "BLAZE";
    } else if(selectedCharacter.id === "char3"){
        charBody.src = "images/chars/skate/idle/idle.gif";
        charName.textContent = "SKATE";
    } else if(selectedCharacter.id === "char4"){
        charBody.src = "images/chars/zan/idle/idle.gif";
        charName.textContent = "ZAN";
    }
}

confirmButton.addEventListener("click", () => {
    const pic = document.querySelector("#cnfrmpic");

    setTimeout(() => {
        pic.src = "images/buttons/confirmbutton.png";
    },200)
    pic.src = "images/buttons/confirmbuttonclick.png";

    const selectedCharacter = document.querySelector('.character.selected');

    setTimeout(() => {
        if(selectedCharacter.id === "char1"){
            selectCharacter(1)
        } else if(selectedCharacter.id === "char2"){
            selectCharacter(2)
        } else if(selectedCharacter.id === "char3"){
            selectCharacter(3)
        } else if(selectedCharacter.id === "char4"){
            selectCharacter(4)
        }
    }, 2000);

    sfx.src = "audio/selected.wav";
    sfx.play();
})


leftButton.addEventListener("click", () => {

    const pic = document.querySelector("#leftpic");

    setTimeout(() => {
        pic.src = "images/buttons/rightbutton.png";
    },200)
    pic.src = "images/buttons/rightbuttonclick.png";
    
    sfx.src = "audio/bip.wav";
    sfx.play();
    const selectedCharacter = document.querySelector('.character.selected');
    const previousCharacter = selectedCharacter.previousElementSibling;
    while (previousCharacter.className !== "character") {
        previousCharacter = previousCharacter.previousElementSibling;
    }
    selectedCharacter.classList.remove('selected');
    previousCharacter.classList.add('selected');
    characterShowcase()
});

rightButton.addEventListener("click", () => {

    const pic = document.querySelector("#rightpic");

    setTimeout(() => {
        pic.src = "images/buttons/rightbutton.png";
    },200)
    pic.src = "images/buttons/rightbuttonclick.png";

    sfx.src = "audio/bip.wav";
    sfx.play();
    const selectedCharacter = document.querySelector('.character.selected');
    const nextCharacter = selectedCharacter.nextElementSibling;
    while (nextCharacter.className !== "character") {
        nextCharacter = nextCharacter.nextElementSibling;
    }
    selectedCharacter.classList.remove('selected');
    nextCharacter.classList.add('selected');
    characterShowcase()
});

powerButton.addEventListener("click", () => {
    const pic = document.querySelector("#pwrpic");
    setTimeout(() => {
        pic.src = "images/buttons/pwrbutton.png";
    },200)
    pic.src = "images/buttons/pwrbuttonclick.png";
    document.querySelector("#logo").style.display = "block";
    setTimeout(() => {
        pic.style.display = "none";
    },250)
    setTimeout(() => {
        document.querySelector("#logo").style.display = "none";
        document.querySelector("#after-logo").style.display = "block";
        startButton.style.display = "block";
    },10000)
    
})

startButton.addEventListener("click", () => {
    sfx.src = "audio/blip.wav";
    sfx.play();
    const pic = document.querySelector("#strtpic");
    setTimeout(() => {
        pic.src = "images/buttons/strtbutton.png";
        gameStart()
        music.src = "audio/charselect.mp3";
        music.play();
    },200)
    pic.src = "images/buttons/strtbuttonclick.png";
});

restartButton.addEventListener("click", () => {
    const pic = document.querySelector("#restpic");
    setTimeout(() => {
        pic.src = "images/buttons/resbutton.png";
    },200)
    pic.src = "images/buttons/resbuttonclick.png";
    location.reload();
});


audioButton.addEventListener("click", () => {
    changeVolume(music);
    changeVolume(sfx);
})


rockButton.addEventListener("click", () => {

    const invalidWords = ["run", "death", "attack"];

    if(invalidWords.some(word => playerChar.src.includes(word)) || invalidWords.some(word => cpuChar.src.includes(word))){
        return;
    }

    const pic = document.querySelector("#rpic");
    setTimeout(() => {
        pic.src = "images/buttons/rbutton.png";
    },200)
    pic.src = "images/buttons/rbuttonclick.png";

    playGame(actions[0], getComputerChoice());
});


paperButton.addEventListener("click", () => {

    const invalidWords = ["run", "death", "attack"];

    if(invalidWords.some(word => playerChar.src.includes(word)) || invalidWords.some(word => cpuChar.src.includes(word))){
        return;
    }

    const pic = document.querySelector("#ppic");
    setTimeout(() => {
        pic.src = "images/buttons/pbutton.png";
    },200)
    pic.src = "images/buttons/pbuttonclick.png";

    playGame(actions[1], getComputerChoice())

});


scissorButton.addEventListener("click", () => {

    const invalidWords = ["run", "death", "attack"];

    if(invalidWords.some(word => playerChar.src.includes(word)) || invalidWords.some(word => cpuChar.src.includes(word))){
        return;
    }

    const pic = document.querySelector("#spic");
    setTimeout(() => {
        pic.src = "images/buttons/sbutton.png";
    },200)
    pic.src = "images/buttons/sbuttonclick.png";

    playGame(actions[2], getComputerChoice())

});

document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {

        if (cheatInput.value.replace(/\s+/g, '').toLowerCase() === "iamcheater") {

            cheatMode = true;
            alert("Cheat activated");

        }else{

            alert("Invalid code");

        }
    }
});

function checkOrientation() {
    if (screen.orientation.type === 'landscape-primary') {
        document.querySelector('.content').style.display = 'block';
        document.querySelector('.for-mobile').style.display = 'none';
    } else if (screen.orientation.type === 'portrait-primary') {
        document.querySelector('.content').style.display = 'none';
        document.querySelector('.for-mobile').style.display = 'flex';
    }
}

window.addEventListener('load', checkOrientation);
screen.orientation.addEventListener('change', checkOrientation);