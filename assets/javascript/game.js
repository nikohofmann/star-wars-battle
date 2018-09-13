$(document).ready(function() { 
  
  var chosenCharacter = [];
  var enemies = [];
  var chosenEnemy = [];
  var gameStarted = false;
  var originalAttack;
  var remainingCharacters = [];

  function startGame() {
    gameStarted = true;
    $("h1#mainHeading").text("your character");
    $("section#enemiesContainer").toggleClass("d-none");
    $(".w-100").toggleClass("w-100");
  }

  function attack() {
    chosenEnemy[0].healthPoints -= chosenCharacter[0].attackPower;
    chosenCharacter[0].healthPoints -= chosenEnemy[0].counterAttackPower;
    $("#messages").text("You dealt " + chosenCharacter[0].attackPower + " damage to " + chosenEnemy[0].name + " and " + chosenEnemy[0].name + " dealt " + chosenEnemy[0].counterAttackPower + " damage to you");
    chosenCharacter[0].attackPower += originalAttack;
    if (chosenEnemy[0].healthPoints <= 0 && chosenCharacter[0].healthPoints <= 0) {
      $("#messages").html("<p>You defeated " + chosenEnemy[0].name + " but he also defeated you!</p>");
      $("#yourCharacter").css("visibility", "hidden");
      $("#defender").empty();
    } else if (chosenEnemy[0].healthPoints <= 0 && remainingCharacters.length === 0) {
      $("#messages").html("<p>You defeated " + chosenEnemy[0].name + "</p><br><br><p>You defeated all enemies!</p>");
      $("#yourCharacter .characterHealth").text(chosenCharacter[0].healthPoints + " hp");
      chosenEnemy.splice(0, 1);
      $("#defender").empty();
    } else if (chosenEnemy[0].healthPoints <= 0) {
      $("#messages").append("<br><br><p>You defeated " + chosenEnemy[0].name + "</p>");
      $("#yourCharacter .characterHealth").text(chosenCharacter[0].healthPoints + " hp");
      chosenEnemy.splice(0, 1);
      $("#defender").empty();
    } else if (chosenCharacter[0].healthPoints <= 0) {
      $("#messages").append("<br><br><p>You were defeated by " + chosenEnemy[0].name + "</p>");
      $("#defender .characterHealth").text(chosenEnemy[0].healthPoints + " hp");
      $("#yourCharacter").empty();
    } else {
      $("#yourCharacter .characterHealth").text(chosenCharacter[0].healthPoints + " hp");
      $("#defender .characterHealth").text(chosenEnemy[0].healthPoints + " hp");
    }
  }

  $("button#attackButton").on("click", function(){ 
    if(chosenCharacter[0].healthPoints > 0 && chosenEnemy.length === 1 && chosenEnemy[0].healthPoints > 0) {
      attack();
    }
  });


  function resetCharacters() {

    remainingCharacters = [
    {
      name: "obi-wan kenobi",
      healthPoints: 130,
      attackPower: 8,
      counterAttackPower: 12,
      picture: "assets/images/obiwan.png",
    },
    {
      name: "luke skywalker",
      healthPoints: 120,
      attackPower: 10,
      counterAttackPower: 10,
      picture: "assets/images/skywalker.png",
    },
    {
      name: "darth sidious",
      healthPoints: 140,
      attackPower: 14,
      counterAttackPower: 15,
      picture: "assets/images/darthsidious.png",
    },
    {
      name: "darth maul",
      healthPoints: 150,
      attackPower: 12,
      counterAttackPower: 20,
      picture: "assets/images/darthmaul.png",
    }];

    renderCharacters(remainingCharacters, "#yourCharacter", "clickable");


  }

  resetCharacters();

  function renderCharacters(arr, location, clickable) {
    for (var i = 0; i < arr.length; i++) {
      var charDiv = $("<div class='characterContainer " + clickable + "Character' data-name='" + arr[i].name + "'>");
      var charName = $("<div class='characterName'>");
      charName.text(arr[i].name);
      var charImg = $("<img src='" + arr[i].picture + "' class='characterImage'>");
      var charHealth = $("<div class='characterHealth'>");
      charHealth.text(arr[i].healthPoints + " hp");
      charDiv.append(charName).append(charImg).append(charHealth);
      $(location).append(charDiv);
    };  
  }

  $("body").on("click", "#yourCharacter .characterContainer", function() { 
    if (gameStarted === false) {
      var chosenCharacterIndex = remainingCharacters.map(function (char) { return char.name; }).indexOf($(this).attr("data-name"));
      chosenCharacter = [remainingCharacters[chosenCharacterIndex]];
      originalAttack = chosenCharacter[0].attackPower;
      startGame();
      remainingCharacters.splice(chosenCharacterIndex, 1)
      enemies = remainingCharacters;
      $("#yourCharacter").empty();
      renderCharacters(chosenCharacter, "#yourCharacter", "nonclickable");
      renderCharacters(enemies, "#enemies", "clickable");
    } 
  });

  $("body").on("click", "#enemies .characterContainer", function() { 
    if (gameStarted === true && chosenEnemy.length === 0) {
      var chosenEnemyIndex = remainingCharacters.map(function (char) { return char.name; }).indexOf($(this).attr("data-name"));
      chosenEnemy = [remainingCharacters[chosenEnemyIndex]];
      remainingCharacters.splice(chosenEnemyIndex, 1)
      enemies = remainingCharacters;
      $("#messages").empty();
      renderCharacters(chosenEnemy, "#defender", "nonclickable");
      $("#enemies").empty();
      renderCharacters(enemies, "#enemies", "clickable");
      $("section#defenderContainer").removeClass("d-none");
      $("section#fightSectionContainer").removeClass("d-none");
    } 
  });
});
