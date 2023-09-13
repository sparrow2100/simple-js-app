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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.5) {
    document.write(
      `Name: ${pokemonList[i].name} (height: ${pokemonList[i].height}--wow, that's big!) `
    );
  } else {
    document.write(
      `Name: ${pokemonList[i].name} (height: ${pokemonList[i].height}) `
    );
  }
}
