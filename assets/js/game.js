// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
  //window.alert("Welcome to Robot Gladiators!");
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  if (promptFight === "fight" || promptFight === "FIGHT") {

    while (enemyHealth > 0 && playerHealth > 0){
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );
  
    // if the enemy robot's health is zero or less, exit from the fight loop.
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
      break;
    } else {
      console.log(enemyName + " still has " + enemyHealth + " health left.");
    }
  
    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
  
    // check player's health
    if (playerHealth <= 0) {
      window.alert("RutRow!\n\n"+playerName + " is now a pile of scrap!");
      break;
    } else {
      console.log(playerName + " still has " + playerHealth + " health left.");
    }
  }
    // if player choses to skip
    } else if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to skip?");
  
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = playerMoney - 10;
      console.log('playerMoney', playerMoney);
    }
    // if no (false), ask question again by running fight() again
    else {
      fight();
    }
  } else {
    window.alert("You need to pick a valid option. Try again!");
  }
  
};

//fight();
for(var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
  //Picking the enemy and resetting the health
  var pickedEnemyName = enemyNames[i];
  enemyHealth=50;
  
  // announcing the round
  window.alert("Welcome to Robot Gladiators Round "+(i+1)+"!\n\n"+
  playerName + " versus " + pickedEnemyName);

  fight (pickedEnemyName);
  }
  else {
    window.alert("GAME OVER!")
  }
}