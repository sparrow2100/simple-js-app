let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Charizard",
      height: 1.7,
      type: ["fire", "flying"],
    },
    {
      name: "Ivysaur",
      height: 1,
      type: ["grass", "poison"],
    },
    {
      name: "Pidgeot",
      height: 1.5,
      type: ["flying", "normal"],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item === "object") {
      pokemonList.push(item);
    } else {
      console.log("The item you are trying to add is not an object.");
    }
  }

  return {
    getAll: getAll,

    add: add,
  };
})();

let pokemonResult = pokemonRepository.getAll();

pokemonResult.forEach((pokemon) => {
  if (pokemon.height > 1.5) {
    document.write(
      `Name: ${pokemon.name} (height: ${pokemon.height}--wow, that's big!) `
    );
  } else {
    document.write(`Name: ${pokemon.name} (height: ${pokemon.height}) `);
  }
});

// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 1.5) {
//     document.write(
//       `Name: ${pokemonList[i].name} (height: ${pokemonList[i].height}--wow, that's big!) `
//     );
//   } else {
//     document.write(
//       `Name: ${pokemonList[i].name} (height: ${pokemonList[i].height}) `
//     );
//   }
// }
