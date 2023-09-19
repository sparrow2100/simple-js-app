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

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let list = document.querySelector(".pokemon-list");
    console.log(list);

    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("button-main");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    list.appendChild(listItem);
    listItem.appendChild(button);
  }

  return {
    getAll: getAll,

    add: add,

    addListItem: addListItem,
  };
})();

let pokemonResult = pokemonRepository.getAll();

pokemonResult.forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});

// button.innerText = `Name: ${pokemon.name} (height: ${pokemon.height})`;
// button.classList.add("button-main");
