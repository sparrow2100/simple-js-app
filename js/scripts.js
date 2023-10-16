const pokemonRepository = (function () {
  const pokemonList = [];

  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
      const modalContainer = document.getElementById("modal-container");
      modalContainer.classList.add("is-visible");
      modalContainer.innerHTML = "";

      const modal = document.createElement("div");
      modal.classList.add("modal-dialog");
      modalContainer.appendChild(modal);

      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");
      modal.appendChild(modalContent);

      const modalHeader = document.createElement("div");
      modalHeader.classList.add("modal-header");
      modalContent.appendChild(modalHeader);

      // add modal content
      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.classList.add("close");
      closeButton.dataset.dismiss = "modal";
      closeButton.ariaLabel = "Close";
      modalHeader.appendChild(closeButton);

      const closeButtonContent = document.createElement("span");
      closeButtonContent.innerHTML = "&times;";
      closeButtonContent.ariaHidden = "true";
      closeButton.appendChild(closeButtonContent);

      //add title
      const modalTitle = document.createElement("h1");
      modalTitle.innerText = details.name;
      modalContent.appendChild(modalTitle);

      //add flex div
      const flexDiv = document.createElement("div");
      flexDiv.classList.add("div-flex");
      modalContent.appendChild(flexDiv);

      // add left flex child
      const flexChild = document.createElement("div");
      flexChild.classList.add("flex-child");
      flexDiv.appendChild(flexChild);

      //add subtitle "height"
      const heightDetails = document.createElement("p");
      heightDetails.innerText = `Height: ${details.height}`;
      flexChild.appendChild(heightDetails);

      //add subtitle "types"
      const modalDetails = document.createElement("p");
      modalDetails.innerText = "Types:";
      flexChild.appendChild(modalDetails);

      //add unordered list
      const listElement = document.createElement("ul");
      flexChild.appendChild(listElement);

      //get and add types
      const types = [];
      for (let i = 0; i < details.types.length; i++) {
        types.push(details.types[i].type.name);
      }
      console.log(types);
      types.forEach(function (item) {
        const listItem = document.createElement("li");
        listItem.innerText = item;
        listElement.appendChild(listItem);
      });

      //add image
      const pokemonImage = document.createElement("img");
      pokemonImage.src = details.sprites.front_default;
      pokemonImage.classList.add("pokemon-image");
      flexDiv.appendChild(pokemonImage);

      //add event listener to close button
      closeButton.addEventListener("click", hideModal);
    });
  }

  //create a list displaying the names of the pokemon
  function addListItem(pokemon) {
    const list = document.getElementById("ul-pokemon");

    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    const button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-info");
    button.classList.add("custom-button");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    list.appendChild(listItem);
    listItem.appendChild(button);
  }

  function loadList() {
    const loadingMessage = document.getElementById("loading-message");
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
          const pokemon = {
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
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })

      .catch(function (e) {
        console.error(e);
      });
  }

  //hide the modal when escape key is pressed
  window.addEventListener("keydown", (event) => {
    const modalContainer = document.getElementById("modal-container");
    if (
      event.key === "Escape" &&
      modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });

  //hide the modal when the modal container is clicked
  const modalContainer = document.getElementById("modal-container");
  modalContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function hideModal() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove("is-visible");
  }

  return {
    getAll: getAll,

    add: add,

    addListItem: addListItem,

    loadList: loadList,

    loadDetails: loadDetails,
  };
})();

//add search feature
const searchBar = document.getElementById("search");
searchBar.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  console.log(searchValue);
  document
    .querySelectorAll(".pokemon-list .list-group-item")
    .forEach((listItem) => {
      listItem.classList.toggle(
        "hide",
        !listItem.textContent.toLowerCase().includes(searchValue)
      );
    });
});

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
