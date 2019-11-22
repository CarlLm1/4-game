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
});
