/* 
🌟 APP: Fighting Game

Create an updateGame() function that will update the DOM with the state of the game 👇
========================================

- updateGame()

These are the 2 classes you must create and their methods 👇
========================================

class Player {
  - strike()
  - heal()
}

class Game {
  - play()
  - checkIsOver()
  - declareWinner()
  - reset()
}

These functions are hard coded in the HTML. So, you can't change their names.

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 ID 👉 'play' = Button to run simulation
#2 ID 👉 'result' = Div that holds the winner of the match
#3 ID 👉 'p1Health' = Div that holds player 1's health
#4 ID 👉 'p2Health' = Div that holds player 2's health
*/

// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')
let conffettiReward = document.getElementById('confetti')




// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the latest health of players
   p1NameDiv.innerText = p1.name
   p2NameDiv.innerText = p2.name
   p1HealthDiv.innerText = p1.health
   p2HealthDiv.innerText = p2.health

   //Condition if either player health is <= 0 then set isOver to true and declareWinner
   if(p1.health <= 0 || p2.health <=0){
       game.isOver = true
       gameState = game.isOver
       resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
       return gameState
   }
   
}


// ** Create the Player class which can create a player with all it's attributes and methods **
// qazi = Player('Qazi', 100, 7)
// qazi.name 👉 'Qazi'
// qazi.health 👉 100
// qazi.attackDmg 👉 7
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike (player, enemy, attackDmg) {
   //Get random number between 1 - 10 and that is damage
   // Math.ceil => runs the ramdom numbers up
   //Math.floor => runs random numbers down
   let damageAmount = Math.ceil(Math.random() * attackDmg)
   
   //Substract the enemy health with damageAmount
   enemy.health -= damageAmount
   
   //Update the game and DOM with updateGame()
   updateGame(p1, p2, game.isOver)

   //Return a message of player name attacks enemy name for damageAmount
   return `${player.name} attacks ${enemy.name} for ${damageAmount} damage`
  }
  
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {
    //Get random number between 1 - 5 and that is damage
   // Math.ceil => runs the ramdom numbers up
   //Math.floor => runs random numbers down
   let hpAmount = Math.ceil(Math.random() * 5)
   
   //Substract the enemy health with damageAmount
   player.health += hpAmount
   
   //Update the game and DOM with updateGame()
   updateGame(p1, p2, game.isOver)

   //Return a message of player name attacks enemy name for damageAmount
   return `${player.name} heals for ${hpAmount} Hp!`
}
}

// ** Create the Game class with all it's attributes and methods to run a match **
class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver, p1, p2) {
    //Create a message variable that will hold a message based on the condition
      let message = 'TIE';
    //if isOver is ture AND p1 health is <=0 then update mesage variable p1 Wins
    //&& means both condition has to be true  
    if(isOver == true && p1.health <= 0){
        message = `${p2.name} WINS!`
        
      }
    //else if isOver is ture AND p1 health is <=0 then update mesage variable p2 Wins 
      else if(isOver == true && p2.health <= 0 ){
          message = `${p1.name} WINS!`
          //message.addConfetti ()
          
          
      }
    //Play victory sound
    document.getElementById('victory').play()
     //addConfetti()
    //conffetti called here
    //jsConfetti.addConfetti({resultDiv})
    //Return message variable
    //addConfetti ()
    return message

   
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1, p2) {
    //Set p1 health and p2 health back to 100
    //and isOver back to false and clear resultDiv.innerText
    //and dont forget to updateGame()
     p1.health = 100
     p2.health = 100
     this.isOver = false
     //this is how u clear inputs n divs
     resultDiv.innerText = ''
     updateGame(p1, p2, this.isOver)
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    
    // Make sure the player health is back to full before starting
     this.reset(p1, p2)
    //Make sure the player take turns untill isOver is true

    while (this.isOver == false) {
      //! Means Not
    //!this.isOver
    //U can write it this way
    //this.isOver == false
    //Make sure both players get strike() and heal() once each loop
    p1.strike(p1, p2, p1.attackDmg)
     p2.heal(p2)
     p2.strike(p2, p1, p2.attackDmg) 
     p1.heal(p1)
    }
    // Once isOver is TRUE run the declareWinner() method 
    return this.declareWinner(this.isOver, p1, p2)
  }

}

// ** Create 2 players using the player class **

let player1Name = prompt('Pleas enter Player 1 name')

let player1 = new Player( `${player1Name}`, 100, 10)

//let player1Name = prompt('Pleas enter your name')

let player2Name = prompt('Pleas enter Player 2 name')

let player2 = new Player(`${player2Name}`, 100, 10)

alert(`${player1Name} and ${player2Name} enjoy your game!!!`)

// ** Save original Player Data **
let p1 = player1 
let p2 = player2

// ** Create the game object from the Game class **
let game = new Game();

//Initialize the game by calling updateGame
updateGame(p1, p2, game.isOver)

// ** Save original Game Data **
let gameState;


// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
playButton.onclick = () => resultDiv.innerText = game.play(p1, p2)


// ** BONUS **
// Add functionality where players can press a button to attack OR heal

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 
  //And isOver is still false then strike()
  if(e.key =='q' && p2.health > 0 && game.isOver == false){
    //After striking then play attack sound
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById('p1attack').play()
  } 
});

document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 
  //And isOver is still false then strike()
  if(e.key =='a' && p2.health > 0 ){
    //After striking then play attack sound
    p1.heal(p1)
    document.getElementById('p1heal').play()
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 
  //And isOver is still false then strike()
  if(e.key =='p' && p1.health > 0 && game.isOver == false){
    //After striking then play attack sound
    p1.strike(p2, p1, p2.attackDmg)
    document.getElementById('p2attack').play()
  } 
});

document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 
  //And isOver is still false then strike()
  if(e.key =='l' && p1.health > 0 ){
    //After striking then play attack sound
    p2.heal(p2)
    document.getElementById('p2heal').play()
  }
});




