//$(document).ready(function() { 
  
  var chosenCharacter = [];
  var enemies = [];
  var chosenEnemy = [];
  var gameStarted = false;

  function startGame() {
    gameStarted = true;
    $("h1#mainHeading").text("your character");
    $("section#enemiesContainer").toggleClass("d-none");
  }

  var remainingCharacters = [];

  function resetCharacters() {

    remainingCharacters = [
    {
      name: "obi-wan kenobi",
      healthPoints: 120,
      attackPower: 6,
      counterAttackPower: 10,
      picture: "assets/images/obiwan.png",
    },
    {
      name: "luke skywalker",
      healthPoints: 100,
      attackPower: 6,
      counterAttackPower: 10,
      picture: "assets/images/skywalker.png",
    },
    {
      name: "darth sidious",
      healthPoints: 150,
      attackPower: 6,
      counterAttackPower: 10,
      picture: "assets/images/darthsidious.png",
    },
    {
      name: "darth maul",
      healthPoints: 180,
      attackPower: 6,
      counterAttackPower: 10,
      picture: "assets/images/darthmaul.png",
    }];

    renderCharacters(remainingCharacters, "#yourCharacter");


  }

  resetCharacters();

  function renderCharacters(arr, location) {
    for (var i = 0; i < arr.length; i++) {
      var charDiv = $("<div class='characterContainer' data-name='" + arr[i].name + "'>");
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
      chosenCharacter = [remainingCharacters[remainingCharacters.map(function (char) { return char.name; }).indexOf($(this).attr("data-name"))]];
      startGame();
      remainingCharacters.splice(chosenCharacter, 1)
      enemies = remainingCharacters;
      $("#yourCharacter").empty();
      renderCharacters(chosenCharacter, "#yourCharacter");
      renderCharacters(enemies, "#enemies");
    } 
  });

  $("body").on("click", "#enemies .characterContainer", function() { 
    if (gameStarted === true && chosenEnemy.length === 0) {
      chosenEnemy = [remainingCharacters[remainingCharacters.map(function (char) { return char.name; }).indexOf($(this).attr("data-name"))]];
      console.log("test");
      // startGame();
      // remainingCharacters.splice(chosenCharacter, 1)
      // enemies = remainingCharacters;
      // $("#yourCharacter").empty();
      // renderCharacters(chosenCharacter, "#yourCharacter");
      // renderCharacters(enemies, "#enemies");
    } 
  });
  





//});

/*
<div class="characterContainer">
          <div class="characterName">Luke Skywalker</div>
          <img src="assets/images/skywalker.png">
          <div class="characterHealth">100</div>
        </div>

//Global variables
$(document).ready(function() {

  //audio clips
  let audio = new Audio('assets/audio/imperial_march.mp3');
  let force = new Audio('assets/audio/force.mp3');
  let blaster = new Audio('assets/audio/blaster-firing.mp3');
  let jediKnow = new Audio('assets/audio/jedi-know.mp3');
  let lightsaber = new Audio('assets/audio/light-saber-on.mp3');
  let rtwoo = new Audio('assets/audio/R2D2.mp3');
  
  //Array of Playable Characters
  let characters = {
      'rey': {
          name: 'rey',
          health: 120,
          attack: 8,
          imageUrl: "assets/images/rey.png",
          enemyAttackBack: 15
      }, 
      'darth': {
          name: 'darth',
          health: 100,
          attack: 14,
          imageUrl: "assets/images/darthVader.png",
          enemyAttackBack: 5
      }, 
      'finn': {
          name: 'finn',
          health: 150,
          attack: 8,
          imageUrl: "assets/images/finn.png",
          enemyAttackBack: 20
      }, 
      'stormtrooper': {
          name: 'stormtrooper',
          health: 180,
          attack: 7,
          imageUrl: "assets/images/trooper.png",
          enemyAttackBack: 20
      }
  };
  
  var currSelectedCharacter;
  var currDefender;
  var combatants = [];
  var indexofSelChar;
  var attackResult;
  var turnCounter = 1;
  var killCount = 0;
  
  
  var renderOne = function(character, renderArea, makeChar) {
      //character: obj, renderArea: class/id, makeChar: string
      var charDiv = $("<div class='character' data-name='" + character.name + "'>");
      var charName = $("<div class='character-name'>").text(character.name);
      var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
      var charHealth = $("<div class='character-health'>").text(character.health);
      charDiv.append(charName).append(charImage).append(charHealth);
      $(renderArea).append(charDiv);
      //Capitalizes the first letter in characters name
      // $('.character').css('textTransform', 'capitalize');
      // conditional render
      if (makeChar == 'enemy') {
        $(charDiv).addClass('enemy');
      } else if (makeChar == 'defender') {
        currDefender = character;
        $(charDiv).addClass('target-enemy');
      }
    };
  
    // Create function to render game message to DOM
    var renderMessage = function(message) {
      var gameMesageSet = $("#gameMessage");
      var newMessage = $("<div>").text(message);
      gameMesageSet.append(newMessage);
  
      if (message == 'clearMessage') {
        gameMesageSet.text('');
      }
    };
  
    var renderCharacters = function(charObj, areaRender) {
      //render all characters
      if (areaRender == '#characters-section') {
        $(areaRender).empty();
        for (var key in charObj) {
          if (charObj.hasOwnProperty(key)) {
            renderOne(charObj[key], areaRender, '');
          }
        }
      }
      //render player character
      if (areaRender == '#selected-character') {
        $('#selected-character').prepend("Your Character");       
        renderOne(charObj, areaRender, '');
        $('#attack-button').css('visibility', 'visible');
      }
      //render combatants
      if (areaRender == '#available-to-attack-section') {
          $('#available-to-attack-section').prepend("Choose Your Next Opponent");      
        for (var i = 0; i < charObj.length; i++) {
  
          renderOne(charObj[i], areaRender, 'enemy');
        }
        //render one enemy to defender area
        $(document).on('click', '.enemy', function() {
          //select an combatant to fight
          name = ($(this).data('name'));
          //if defernder area is empty
          if ($('#defender').children().length === 0) {
            renderCharacters(name, '#defender');
            $(this).hide();
            renderMessage("clearMessage");
          }
        });
      }
      //render defender
      if (areaRender == '#defender') {
        $(areaRender).empty();
        for (var i = 0; i < combatants.length; i++) {
          //add enemy to defender area
          if (combatants[i].name == charObj) {
            $('#defender').append("Your selected opponent")
            renderOne(combatants[i], areaRender, 'defender');
          }
        }
      }
      //re-render defender when attacked
      if (areaRender == 'playerDamage') {
        $('#defender').empty();
        $('#defender').append("Your selected opponent")
        renderOne(charObj, '#defender', 'defender');
        lightsaber.play();
      }
      //re-render player character when attacked
      if (areaRender == 'enemyDamage') {
        $('#selected-character').empty();
        renderOne(charObj, '#selected-character', '');
      }
      //render defeated enemy
      if (areaRender == 'enemyDefeated') {
        $('#defender').empty();
        var gameStateMessage = "You have defated " + charObj.name + ", you can choose to fight another enemy.";
        renderMessage(gameStateMessage);
        blaster.play();
      }
    };
    //this is to render all characters for user to choose their computer
    renderCharacters(characters, '#characters-section');
    $(document).on('click', '.character', function() {
      name = $(this).data('name');
      //if no player char has been selected
      if (!currSelectedCharacter) {
        currSelectedCharacter = characters[name];
        for (var key in characters) {
          if (key != name) {
            combatants.push(characters[key]);
          }
        }
        $("#characters-section").hide();
        renderCharacters(currSelectedCharacter, '#selected-character');
        //this is to render all characters for user to choose fight against
        renderCharacters(combatants, '#available-to-attack-section');
      }
    });
  
    // ----------------------------------------------------------------
    // Create functions to enable actions between objects.
    $("#attack-button").on("click", function() {
      //if defernder area has enemy
      if ($('#defender').children().length !== 0) {
        //defender state change
        var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
        renderMessage("clearMessage");
        //combat
        currDefender.health = currDefender.health - (currSelectedCharacter.attack * turnCounter);
  
        //win condition
        if (currDefender.health > 0) {
          //enemy not dead keep playing
          renderCharacters(currDefender, 'playerDamage');
          //player state change
          var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
          renderMessage(attackMessage);
          renderMessage(counterAttackMessage);
  
          currSelectedCharacter.health = currSelectedCharacter.health - currDefender.enemyAttackBack;
          renderCharacters(currSelectedCharacter, 'enemyDamage');
          if (currSelectedCharacter.health <= 0) {
            renderMessage("clearMessage");
            restartGame("You have been defeated...GAME OVER!!!");
            force.play();
            $("#attack-button").unbind("click");
          }
        } else {
          renderCharacters(currDefender, 'enemyDefeated');
          killCount++;
          if (killCount >= 3) {
            renderMessage("clearMessage");
            restartGame("You Won!!!! GAME OVER!!!");
            jediKnow.play();
            // The following line will play the imperial march:
            setTimeout(function() {
            audio.play();
            }, 2000);
  
          }
        }
        turnCounter++;
      } else {
        renderMessage("clearMessage");
        renderMessage("No enemy here.");
        rtwoo.play();
      }
    });
  
  //Restarts the game - renders a reset button
    var restartGame = function(inputEndGame) {
      //When 'Restart' button is clicked, reload the page.
      var restart = $('<button class="btn">Restart</button>').click(function() {
        location.reload();
      });
      var gameState = $("<div>").text(inputEndGame);
      $("#gameMessage").append(gameState);
      $("#gameMessage").append(restart);
    };
  
  });


*/

// Author: Nigel Finley. August 2016. UT BOOTCAMP HW Assignment



// 4. add the 'No enemy here' text when attack button is clicked
// 6. figure out how to implement the  'wounded' piece
// -Look at changing the font to more readable
// Add bootstrap class to change the hover state of characters
// makeimg bigger to strecth entire character and make text white

/*



// Improvements to make
// Update the images to not show the background colors and spread across entire div
// change text color to white and bold and then overlay over the image
// change the positioning so that it flows better


// Overall game is stored in object
// game play object houses all functions  and additional variables of the game
function reset() {
	window.gameObj = {
		// intializing the attack button to false. will set it to true later on
		attackOccurred: false,
		winOccurred: false,
		lossOccurred: false,
		wounded: false,
		gameOver: false,
		jediMaster: false,
		characterArrayList: [
	    // 1.  An array or object of possible characters properties would incldue 
	    // name, picture, Health Points, Attack Power and counter attack power

	    {
	        name: 'Luke SkyWalker',
	        visual: 'assets/images/luke.jpg',
	        healthPoints: 160, 
	        attackPower: 10,
	        counterAttackPower: 20,
	    },
	    {
	        name: 'Yoda',
	        visual: 'assets/images/yoda.jpg', 
	        healthPoints: 130,
	        attackPower: 15,
	        counterAttackPower: 30,
	    },
	    {
	        name: 'Less Ray',
	        visual: 'assets/images/lessray.jpg',
	        healthPoints: 180, 
	        attackPower: 7,
	        counterAttackPower: 15,
	    },
	    {
	        name: 'Darth Vader',
	        visual: 'assets/images/darth.jpg',
	        healthPoints: 180,
	        attackPower: 15,
	        counterAttackPower: 25,
	    },
	    {
	        name: 'Kylo Wren',
	        visual: 'assets/images/kylowren.jpg',
	        healthPoints: 110,
	        attackPower: 12,
	        counterAttackPower: 20,
	    },
	   	{
	        name: 'Darth Maul',
	        visual: 'assets/images/darthmaul.jpg',
	        healthPoints: 100,
	        attackPower: 12,
	        counterAttackPower: 24,
	    }
	    //    {
	    //     name: 'Obi-Wan Kanobi',
	    //     visual: 'assets/images/obiwan.jpg',
	    //     healthPoints: 120, 
	    //     attackPower: 10, 
	    //     counterAttackPower: 24,
	    // 	},
	    //  {
	    //     name: 'Boba Fett',
	    //     visual: 'assets/images/bobafett.jpg',
	    //     healthPoints: 90,
	    //     attackPower: 25,
	    //     counterAttackPower: 26,
	    // }
		],
		// Initializes game start true
		gameStart: true,
		// initializes your character to nothing
		yourCharacter: null,
		// initializes enemy selection to nothing
		currentEnemy: null,
		// initializs your blank array of previously fought enemies. might just remove all together
		previouslyFought: [],
		// sets current attack power to null
		yourCurrentAttackPower: null,
		winOccurred: false,

	// create an array of battle sounds
		battleSoundsArray: ['assets/audio/saberclash.mp3', 'assets/audio/saberclash1.mp3', 'assets/audio/saberclash2.mp3', 'assets/audio/saberclash3.mp3', 'assets/audio/saberclash4.mp3', 'assets/audio/saberclash5.mp3', 'assets/audio/saberclash6.mp3', 'assets/audio/spin1.mp3', 'assets/audio/spin2.mp3','assets/audio/spin3.mp3','assets/audio/spin4.mp3','assets/audio/spin5.mp3','assets/audio/spin6.mp3', 'assets/audio/swing1.mp3','assets/audio/swing2.mp3', ],
		characherSelectSound: 'assets/audio/saberon.mp3',

	// picks at random battle sound when the attack button is pressed
		battleSoundPick: function() {
	        return this.battleSoundsArray[Math.floor(Math.random() * this.battleSoundsArray.length)];
	    },

	}
};


// STAGE 1: Initial Setup/ Display
$(document).ready(function() {
	reset();
	// gets the link for the theme song to be played in the background
	 var audioElement = document.createElement('audio');
	 audioElement.autoplay = true;
	 audioElement.loop = true;
     audioElement.setAttribute('src', 'assets/audio/starwars.m4a');

     // displays the modal
  	$('#myModal').modal('show');

	function render() {
		// setting variables set to id tags with html elements for easy reference later
		// using the $ before variables indicates that they are jQuery objects, it doesn't affect perfermance of the variables
		var $charList = $('#characterList');
		var $enemyList = $('#enemyList');
		var $yourCharacter = $('#yourCharacter');
		var $attackText = $('#attackText');
		var $yourEnemy = $('#yourEnemy');
		var $winText = $('#attackText');
		var $lossText = $('#attackText');
		// var $wounded = $('#attackText');
		var $gameOver = $('#gameOver');
		var $jediText = $('#attackText');
		
		// using underscore.js to create templates that are dynamically updated
		var $charTemplate = _.template($('#characterTmpl').html());
		var $attackTemplate = _.template($('#attackTmpl').html());
		var $winTemplate = _.template($('#winTmpl').html());
		var $lossTemplate = _.template($('#lossTmpl').html());
		var $jediTemplate = _.template($('#jediTmpl').html());
		// var $woundTemplate = 

		// Haven't selected Character
		var charHtml = "";
		$yourCharacter.html("");
		$yourEnemy.html("");
		$attackText.html("");
		$gameOver.html("");

		// using a ternary operator to give true or false to the background color choice
		var listBg = gameObj.yourCharacter ? "bg-black" : "bg-white";
		// Sets the initial screen with characters to select from
		gameObj.characterArrayList.forEach(function(character, index) {
			charHtml = charHtml + $charTemplate({index: index, background: listBg, character: character});
		});
		if (gameObj.yourCharacter) {
			$yourCharacter.html($charTemplate({index: 0, background: 'bg-white', character: gameObj.yourCharacter}));
			// re-write in jQuery
			$enemyList.html(charHtml);
			$charList.html("");

		} else {
			$charList.html(charHtml);
			$enemyList.html("");
		}
		if (gameObj.currentEnemy) {
			$yourEnemy.html($charTemplate({index: 0, background: 'bg-red', character: gameObj.currentEnemy}));
		}
		if (gameObj.attackOccurred) {
			$attackText.html($attackTemplate({gameObj: gameObj}));
		}
		// added
		if (gameObj.winOccurred) {
			
		   	// Displays the win text 
			$winText.html($winTemplate({lastOpponent: gameObj.lastOpponent}));
			// Removes the enemy character after you win.
			$('#yourEnemy').empty(gameObj.currentEnemy);
		}

		if (gameObj.lossOccurred) {
			// Displays loss text
			$lossText.html($lossTemplate({gameObj: gameObj}));
		}
		// This runs when the enemy is wounded (hp less than zero)
		if (gameObj.wounded){
			$('#attackText').html("You are seriously wounded. GAME OVER!");
		}
		// This runs if the user losses
		if (gameObj.gameOver) {
			// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();

			b.click(render);
			$('#gameOver').append(b);

		}
		if (gameObj.jediMaster) {
			// Displays final text 
			$jediText.html($jediTemplate({lastOpponent: gameObj.lastOpponent}));
			$('#yourEnemy').empty(gameObj.currentEnemy);
			// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();

			b.click(render);
			$('#gameOver').append(b);
			
		}

    }

    //STAGE 2: Selecting your character 
    $('#characterList').on('click', '.characterContainer', function(e) {
    	// pause current audio to allow for battle sounds
    	audioElement.pause();
		// TODO: set the AUDIO to saberon.mp3

    	// references the characterList
    	var element = $(this);
    	var charIndex = element.data('character-index');
    	// your character was initially set as null so when your character != null this if runs
    	if (!gameObj.yourCharacter) {
    		// pushes your object selection into yourCharacter array
    		gameObj.yourCharacter = gameObj.characterArrayList.splice(charIndex, 1)[0];
    		// setting initial attack power to the value within the master object
    		gameObj.yourCurrentAttackPower = gameObj.yourCharacter.attackPower;
    	}   
    	// This renders and updates all of the html elements 
    	render();
    	// adds a sound to selecting character
    	var $audioCharacter = document.createElement('audio');
                    $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
                    $audioCharacter.play();
    });

    // STAGE 3: select your enemy
    $('#enemyList').on('click', '.characterContainer', function(e) {
    	var element = $(this);
    	var charIndex = element.data('character-index');
    	// current enemy was initially set as null so when your enemy != this if runs 
		if (!gameObj.currentEnemy) {
			// creates an array that houses the enemy character
			gameObj.winOccurred = false;
			// sets the attack button to false ensuring the attack text is not displayed when selecting a new character and only after 
			// ...click attack
			gameObj.attackOccurred = false;
    		gameObj.currentEnemy = gameObj.characterArrayList.splice(charIndex, 1)[0];
    	}
    	// This renders and updates all of the html elements 
    	render();
    	// adds a sound to selecting character
    	var $audioCharacter = document.createElement('audio');
                    $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
                    $audioCharacter.play();
    });

    // STAGE 4: GAME PLAY. Click on ATTACK

    $('#attackBtn').on('click', function(e) {
    	// this ensure you cannot click any other characters again
    	if (!gameObj.yourCharacter || !gameObj.currentEnemy) {
    		$('#attackText').html('No enemy here, select an emeny to fight.')
    		return;
    	}
    	
    	gameObj.attackOccurred = true;
    	
    	// declaring new variables
    	var yourCharacter = gameObj.yourCharacter;
    	var currentEnemy = gameObj.currentEnemy;
    	//increment yourAttackPower by yourCharacter.attackPower
    	gameObj.yourCurrentAttackPower  = gameObj.yourCurrentAttackPower + yourCharacter.attackPower;
		//decrease enemy health points by yourAttackPower state
    	currentEnemy.healthPoints = currentEnemy.healthPoints - gameObj.yourCurrentAttackPower; 
    	//decrease your health points by enemy's counterAttackPower
    	yourCharacter.healthPoints = yourCharacter.healthPoints - currentEnemy.counterAttackPower;
    	console.log ("enenemy health points: " + currentEnemy.healthPoints + ' your health: ' + yourCharacter.healthPoints);

    	var $audioBattle = document.createElement('audio');
                    $audioBattle.setAttribute('src', gameObj.battleSoundPick());
                    $audioBattle.play();
                    


    	
    	// Win scenario
    	// set win variable  and loss in order to consolidate win ifs. 
    	var win = (currentEnemy.healthPoints < 1 && yourCharacter.healthPoints > 1 || 
    				((yourCharacter.healthPoints < 1 && currentEnemy.healthPoints < 1) && 
    				(yourCharacter.healthPoints > currentEnemy.healthPoints))
    			  ) ? true : false;

    	var loss = (yourCharacter.healthPoints < 1 && currentEnemy.healthPoints > 1 || 
    				((yourCharacter.healthPoints < 1 && currentEnemy.healthPoints < 1) && 
    					(yourCharacter.healthPoints < currentEnemy.healthPoints))
    			   ) ? true: false;


    
    	// First if is only if user has defeated all of the enemies    	
    	if (win) { 
    		
    		console.log('healthPoints of enemy should be equal great than or eqaul to 0: ' + currentEnemy.healthPoints);
			if (gameObj.characterArrayList.length > 0){
				console.log(gameObj.characterArrayList.length);
				gameObj.winOccurred = true;

				// need to be able to select another enemy
				gameObj.lastOpponent = gameObj.currentEnemy;
				gameObj.currentEnemy = null;
				// need to figure out how to show another error when your character points are less 0. Show error "you are seriously wounded. GAME OVER"
					// if (yourCharacter.healthPoints =< 0) {
					// 	gameObj.wounded = true;
					// 	// gameObj.winOccurred = false;

					// }
	 		
			}  
			// scenario when you have defeated all characters
			else if (gameObj.characterArrayList.length == 0){

				console.log('Final Jedi Portion ' + gameObj.characterArrayList.length);
				gameObj.lastOpponent = gameObj.currentEnemy;
				gameObj.attackOccurred = false; 
				gameObj.jediMaster = true;

			}  
				
	    	
    	}
    	 // Loss Scenario

    	else if (loss) {
    		gameObj.lossOccurred = true;
    		console.log('Entered the loss occurred section');
    		gameObj.attackOccurred = false; 
    		gameObj.gameOver = true; 
    		
    	}
    	render();

    });

			

    render();

});




*/