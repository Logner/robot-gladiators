// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(max, min) {
  var value = Math.floor(Math.random() * (max-min+1)) + min;
  return value;
}

var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?")
  }
}

var fightOrSkip = function() {
  // ask user if they'd like to fight or skip using  function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.').toLowerCase();

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  // if user picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      return true;
    }
  }
}


// Fight (Core gameplay)
var fight = function(enemy) {
  //window.alert("Welcome to Robot Gladiators!");
  // repeat and execute as long as the enemy robot is alive 
  while(enemy.health > 0 && playerInfo.health > 0) {
    if (fightOrSkip()) {break;}
    else { // <-- Replace code with this function call
    var damage = randomNumber( playerInfo.attack, playerInfo.attack - 3);
      enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );
  
    // if the enemy robot's health is zero or less, exit from the fight loop.
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");
      playerInfo.money = playerInfo.money + 5
      break;
    } else {
      console.log(enemy.name + " still has " + enemy.health + " health left.");
    }
  
    // remove player's health by subtracting the amount set in the enemy.attack variable
    playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);
    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
  
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert("RutRow!\n\n"+playerInfo.name + " is now a pile of scrap!");
      break;
    } else {
      console.log(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  }
}
};

// End Game
var endgame = function() {
  // if player is still alive, player wins!
    
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } 
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }

  };

// Shop (between fights)
var shop = function () {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );  
  // Using switch to carry out options
// use switch case to carry out action
switch (parseInt(shopOptionPrompt)) {
  case 1:
    playerInfo.refillHealth();
    break;
  case 2:
    playerInfo.upgradeAttack();
    break;
  case 3:
    window.alert("Leaving the store.");
    break;
  default:
    window.alert("You did not pick a valid option. Try again.");
    shop();
    break;
}
}

// Initializing Player and Enemies
  var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
    },
    refillHealth: function() {
      if (this.money < 7) {
        alert('You dont have enough money!');
      }
      else{
      window.alert("Refilling player's health by 50 for 7 dollars.");
      this.health += 50;
      this.money -= 7;
      }
    },
    upgradeAttack: function() {
      if (this.money < 7) {
        alert('You dont have enough money!');
      }
      else {
      window.alert("Upgrading player's attack by 10 for 7 dollars.");
      this.attack += 10;
      this.money -= 7;
      }
    }
  };
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(14, 10),
    special: true
  },
  {
    name: "Amy Android",
    attack: randomNumber(14, 10)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(14, 10),
  }
];

//Start Game
var startGame = function() {
  // reset player stats
  playerInfo.reset();


//  Iterating through Enemies
  for(var i = 0; i < enemyInfo.length; i++) {
      if (playerInfo.health > 0) {
      //Picking the enemy and initializing enemy health and attack
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health=randomNumber(60, 40);

      // announcing the round
      window.alert("Welcome to Robot Gladiators Round "+(i+1)+"!\n\n"+
      playerInfo.name + " versus " + pickedEnemyObj.name);


      fight (pickedEnemyObj);

      // if we're not at the lest enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if user wants to enter the shop
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")
        if (storeConfirm) {shop();}
      }
      }
      else {
        window.alert("GAME OVER!")
      }
    }
// after the loop ends, player is either out of health or enemies to fight
  endgame()
  };

startGame();