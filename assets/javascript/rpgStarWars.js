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
  };
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
});
