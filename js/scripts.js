let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
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

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.types = details.types;
        item.moves = [];
        for (let i = 0; i < details.moves.length; i++) {
          item.moves.push(details.moves[i].move);
          // console.log(item.moves);
        }

        // item.moves = details.moves[0].move;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll: getAll,

    add: add,

    addListItem: addListItem,

    loadList: loadList,

    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// button.innerText = `Name: ${pokemon.name} (height: ${pokemon.height})`;
// button.classList.add("button-main");
