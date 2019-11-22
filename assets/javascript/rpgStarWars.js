$(document).ready(function() {
  var characters = {
    "Darth Maul": {
      name: "Darth Maul",
      health: 175,
      attack: 7,
      imageUrl: "assets/images/Darth_Maul.jpg",
      enemyAttackBack: 25
    },
    "Darth Sidious": {
      name: "Darth Sidious ",
      health: 150,
      attack: 10,
      imageUrl: "assets/images/Sidious.jpg",
      enemyAttackBack: 5
    },
    "Luke Skywalker": {
      name: "Luke Skywalker",
      health: 100,
      attack: 15,
      imageUrl: "assets/images/Luke.jpg",
      enemyAttackBack: 5
    },
    "Obi-Wan Kenobi": {
      name: "Obi-Wan Kenobi",
      health: 125,
      attack: 7,
      imageUrl: "assets/images/ObiWanKenobi.jpg",
      enemyAttackBack: 15
    }
  };

  // Checking if object and all properties are loading
  console.log(characters);

  //1. populated once the user selects a character.
  var currentSelectedCharacter;
  // 2. populated with characters user didn't choose.
  var combatants = [];
  // 3. populated when user chooses an opponent.
  var currentDefender;
  // 4. keeps track of turns
  var turnCounter = 1;
  // 5. keeps track of defeated opponents
  var killCount = 0;

  // Functions
  // ==========================================================================================================
  //The following function will render a character card to the page.
  var renderOne = function(character, renderArea, charStatus) {
    var charDiv = $(
      "<div class = 'character' data-name = '" + character.name + "'>"
    );
    var charName = $("<div class = 'character-name'>").text(character.name);
    var charImage = $("<img alt = 'image' class = 'character-image'>").attr(
      "src",
      character.imageUrl
    );
    var charHealth = $("<div class ='character-health'>").text(
      "HP: " + character.health
    );
    charDiv
      .append(charName)
      .append(charImage)
      .append(charHealth);
    $(renderArea).append(charDiv);
    // If the character is an enemy or defender,
    // then add the appropriate class.
    if (charStatus === "enemy") {
      $(charDiv).addClass("enemy");
    } else if (charStatus === "defender") {
      currentDefender = character;
      $(charDiv).addClass("target-enemy");
    }
  };

  // Game messages function
  var renderMessage = function(message) {
    // Creates the message and appends it to the page
    var gameMessageSet = $("#game-message");
    var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);
    if (message === "clearMessage") {
      gameMessageSet.text("");
    }
  };

  // Function for rendering characters based on what the user has selected.
  var renderCharacters = function(charObj, areaRender) {
    if (areaRender === "#character-selection") {
      $(areaRender).empty();
      for (var key in charObj) {
        if (charObj.hasOwnProperty(key)) {
          renderOne(charObj[key], areaRender, "");
        }
      }
    }

    // The selected-character div is where the selected character will appear
    // If this is true, then the selected character will be rendered.
    if (areaRender === "#selected-character") {
      renderOne(charObj, areaRender, "");
    }
    // The available-to-attack div is where the inactive opponents will be
    // If this is true, then the selected character will be rendered.
    if (areaRender === "#available-to-attack-section") {
      for (var i = 0; i < charObj.length; i++) {
        renderOne(charObj[i], areaRender, "enemy");
      }
      // Creating an on click event for each enemy
      $(document).on("click", ".enemy", function() {
        var name = $(this).attr("data-name");

        // If there's no defender, then the clicked enemy will become the defender
        if ($("#defender").children().length === 0) {
          renderCharacters(name, "#defender");
          $(this).hide();
          renderMessage("clearMessage");
        }
      });
    }

    // The defender div is where the active opponent appears
    //If this is true, the selected enemy will be rendered here.
    if (areaRender === "#defender") {
      $(areaRender).empty();
      for (var i = 0; i < combatants.length; i++) {
        if (combatants[i].name === charObj) {
          renderOne(combatants[i], areaRender, "defender");
        }
      }
    }

    // Render the defender again when attacked
    if (areaRender === "playerDamage") {
      $("#defender").empty();
      renderOne(charObj, "#defender", "defender");
    }
    // Render the player's character when attacked
    if (areaRender === "enemyDamage") {
      $("#selected-character").empty();
      renderOne(charObj, "#selected-character", "");
    }
    // Removing the defeating enemy
    if (areaRender === "enemyDefeated") {
      $("#defender").empty();
      var gameStateMessage =
        "You have defeated " +
        charObj.name +
        ", you may choose to fight another enemy.";
      renderMessage(gameStateMessage);
    }
  };

  // Function that handles restarting the game after game over
  var restartGame = function(inputEndGame) {
    // When clicked, reload the page
    var restart = $("<button>Restart</button>").click(function() {
      location.reload();
    });
    // Create div that will display the victory or defeat message.
    var gameState = $("<div>").text(inputEndGame);
    $("body").append(gameState);
    $("body").append(restart);
  };

  //=====================================================================================
  //
  //
  // Rendering all characters to the page when the game starts.
  renderCharacters(characters, "#character-selection");

  // On-click event for character selection
  $(document).on("click", ".character", function() {
    // The clicked character's name will be saved
    var name = $(this).attr("data-name");
    // and console logging the name of the character selected
    console.log("Selected: " + name);
    // If a character hasn't been chosen yet,
    if (!currentSelectedCharacter) {
      currentSelectedCharacter = characters[name];
      // then the remaining characters will be looped
      // and pushed to the combantants array.
      for (var key in characters) {
        if (key !== name) {
          combatants.push(characters[key]);
        }
      }
      // and console log the combatants array
      console.log(combatants);

      // Hiding the character selection div
      $("#character-selection").hide();
      // and then render the slected character and combatants.
      renderCharacters(currentSelectedCharacter, "#selected-character");
      renderCharacters(combatants, "#available-to-attack-section");
    }
  });

  // The following logic is for when the attack button is clicked
  $("attack-button").on("click", function() {
    if ($("#defender").children().length !== 0) {
      // Creates a message for the attack and the opponent's counter attack
      var attackMessage =
        "You attacked " +
        currentDefender.name +
        " for " +
        currentSelectedCharacter.attack +
        turnCounter +
        " damage.";
      var counterAttackMessage =
        currentDefender.name +
        " attacked you back for " +
        currentDefender.enemyAttackBack +
        " damage.";
      renderMessage("clearMessage");
      // Reduce the defender's health based on the attack value.
      currentDefender.health -= currentSelectedCharacter.attack * turnCounter;
    }
    if (currentDefender.health > 0) {
      renderCharacters(currentDefender, "playerDamage");
      // Render combat messages
      renderMessage(attackMessage);
      renderMessage(counterAttackMessage);
      currentSelectedCharacter.health -= currentDefender.enemyAttackBack;
      renderCharacters(currentSelectedCharacter, "enemyDamage");
      if (currentSelectedCharacter.health <= 0) {
        renderMessage("clearMessage");
        restartGame("You have died... GAME OVER ! ! !");
        $("#attack-button").unbind("click");
      }
    }
    // If the enemy has less than zero health, then they are defeated.
    else {
      // Remove them from the screen
      renderCharacters(currentDefender, "enemyDefeated");
      // Kill count
      killCount++;
      // If all the enemies are defeated, then the player has won,
      // and finally calling the restart game function to allow the user to play again if they want.
      if (killCount >= 3) {
        renderMessage("clearMessage");
        restartGame("You win ! ! ! ");
      }
    }
    turnCounter++;
  });
});
