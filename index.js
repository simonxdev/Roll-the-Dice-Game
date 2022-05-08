// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const dblMessage = document.getElementById("dblmessage")
const dblBtn = document.getElementById("dblBtn")

function showResetButton() {
    rollBtn.style.display = "none"
    dblBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        dblMessage.textContent = ""
        player2Dice.classList.remove("rotate")
        player1Dice.classList.add("rotate")
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        dblMessage.textContent = ""
        player1Dice.classList.remove("rotate")
        player2Dice.classList.add("rotate")
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳"
        showResetButton()
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉"
        showResetButton()
    }
    player1Turn = !player1Turn
})
 
/* Hook up a click event listener to the Roll Double Chance Btn. */
dblBtn.addEventListener("click", function(){
    const dblDecide = Math.floor(Math.random() * 2) + 1
    if (dblDecide === 1){
        
        dblMessage.textContent = "🔥 Double Score 🔥"

        const randomNumber = 6 + Math.floor(Math.random() * 6) + 1

        if (player1Turn) {
            player2Dice.classList.remove("rotate")
            player1Dice.classList.add("rotate")
            player1Score += randomNumber
            player1Scoreboard.textContent = player1Score
            player1Dice.textContent = randomNumber
            player1Dice.classList.remove("active")
            player2Dice.classList.add("active")
            message.textContent = "Player 2 Turn"
        } else {
            player1Dice.classList.remove("rotate")
            player2Dice.classList.add("rotate")
            player2Score += randomNumber
            player2Scoreboard.textContent = player2Score
            player2Dice.textContent = randomNumber
            player2Dice.classList.remove("active")
            player1Dice.classList.add("active")
            message.textContent = "Player 1 Turn"
        }
        
        if (player1Score >= 20) {
            message.textContent = "Player 1 Won 🥳"
            showResetButton()
        }  else if (player2Score >= 20) {
            message.textContent = "Player 2 Won 🎉"
            showResetButton()
        }
    } else {
        dblMessage.textContent = "🥺 Zero Points 🥺"
        
        if (player1Turn) {
            player1Dice.classList.remove("active")
            player2Dice.classList.add("active")
            message.textContent = "Player 2 Turn"
        } else {
            player2Dice.classList.remove("active")
            player1Dice.classList.add("active")
            message.textContent = "Player 1 Turn"
        }
    }
    
    player1Turn = !player1Turn
})
 
 /* Reset the Game Function */
 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "inline-block"
    dblBtn.style.display = "inline-block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    dblMessage.textContent = ""
    // Open Start Game modal again
    p1num.textContent = "-"
    p2num.textContent = "-"
    rollStart.style.display = "inline-block"
    startGameBtn.style.display = "none"
    startGameMsg.textContent = ""
    overlay.style.display = "block"
}

/* Modal Start Game Roll Number */

let rollStart = document.getElementById("rollBtnStart")
const startGameBtn = document.getElementById("startGameBtn")
const p1num = document.getElementById("p1num")
const p2num = document.getElementById("p2num")
const startGameMsg = document.getElementById("startGameMessage")

rollStart.addEventListener("click", function(){
    if (p1num.textContent == "-"){
        p1num.textContent = Math.floor(Math.random() * 1000) + 1
        rollStart.textContent = "Player 2 roll Number now"
    } else if (p1num.textContent != "-") {
        p2num.textContent = Math.floor(Math.random() * 1000) + 1
    }
    
    if (p1num.textContent != "-" && p2num.textContent != "-") {
        if (p1num.textContent > p2num.textContent) {
            rollStart.style.display = "none"
            startGameBtn.style.display = "inline-block"
            startGameMsg.textContent = "Player 1 starts the Game!"
        } else if (p1num.textContent < p2num.textContent) {
            rollStart.style.display = "none"
            startGameBtn.style.display = "inline-block"
            startGameMsg.textContent = "Player 2 starts the Game!"
        }
    }
})

/* Modal Start Game Btn - Check who won and start Game */

const overlay = document.getElementById("overlay")

startGameBtn.addEventListener("click", function(){
    if (startGameMsg.textContent == "Player 1 starts the Game!"){
        player1Turn = true
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    } else if (startGameMsg.textContent == "Player 2 starts the Game!") {
        player1Turn = false
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    }
    overlay.style.display = "none"
})