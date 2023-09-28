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
    loadDetails(pokemon).then(function (details) {
      console.log(details);

      //set up modal container and modal
      let modalContainer = document.getElementById("modal-container");
      modalContainer.classList.add("is-visible");
      modalContainer.innerHTML = "";
      let modal = document.createElement("div");
      modal.classList.add("modal");
      modalContainer.appendChild(modal);

      //add modal content
      let closeButton = document.createElement("button");
      closeButton.classList.add("modal-close");
      closeButton.innerText = "X";
      modal.appendChild(closeButton);

      //add title
      let modalTitle = document.createElement("h1");
      modalTitle.innerText = details.name;
      modal.appendChild(modalTitle);

      //add subtitle
      let modalDetails = document.createElement("p");
      modalDetails.innerText = "Types:";
      modal.appendChild(modalDetails);

      //add unordered list
      let listElement = document.createElement("ul");
      modal.appendChild(listElement);

      //get and add types
      let types = [];
      for (let i = 0; i < details.types.length; i++) {
        types.push(details.types[i].type.name);
      }
      console.log(types);
      types.forEach(function (item) {
        let listItem = document.createElement("li");
        listItem.innerText = item;
        listElement.appendChild(listItem);
      });

      //add image
      let pokemonImage = document.createElement("img");
      pokemonImage.src = details.sprites.front_default;
      modal.appendChild(pokemonImage);

      //add event listener to close button
      closeButton.addEventListener("click", hideModal);
    });
  }

  function addListItem(pokemon) {
    let list = document.querySelector(".pokemon-list");

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
    let loadingMessage = document.getElementById("loading-message");
    function toggleLoading() {
      loadingMessage.classList.toggle("invisible");
    }
    toggleLoading();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        toggleLoading();
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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
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

function hideModal() {
  let modalContainer = document.getElementById("modal-container");
  modalContainer.classList.remove("is-visible");
}
//hide the modal when escape key is pressed
window.addEventListener("keydown", (event) => {
  let modalContainer = document.getElementById("modal-container");
  if (
    event.key === "Escape" &&
    modalContainer.classList.contains("is-visible")
  ) {
    hideModal();
  }
});
//hide the modal when the modal container is clicked
let modalContainer = document.getElementById("modal-container");
modalContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target === modalContainer) {
    hideModal();
  }
});
