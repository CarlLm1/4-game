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
  var currentSelectedCharacter;
  var combatants = [];
  // Functions
  // ==========================================================================================================
  //The following function will render a character card to the page.
  var renderOne = function(character, renderArea) {
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
  };

  var renderCharacters = function(charObj, areaRender) {
    if (areaRender === "#character-selection") {
      $(areaRender).empty();
      for (var key in charObj) {
        if (charObj.hasOwnProperty(key)) {
          renderOne(charObj[key], areaRender);
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
