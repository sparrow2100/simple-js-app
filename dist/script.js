let pokemonRepository = (function () {
    let e = [];
    function t() {
      return e;
    }
    function n(t) {
      "object" == typeof t
        ? e.push(t)
        : console.log("The item you are trying to add is not an object.");
    }
    function l(e) {
      return fetch(e.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .catch(function (e) {
          console.error(e);
        });
    }
    return {
      getAll: t,
      add: n,
      addListItem: function e(t) {
        let n = document.getElementById("ul-pokemon"),
          i = document.createElement("li");
        i.classList.add("list-group-item");
        let a = document.createElement("button");
        (a.innerText = t.name),
          a.classList.add("btn"),
          a.classList.add("btn-info"),
          a.classList.add("custom-button"),
          a.addEventListener("click", function () {
            !(function e(t) {
              l(t).then(function (e) {
                console.log(e);
                let t = document.getElementById("modal-container");
                t.classList.add("is-visible"), (t.innerHTML = "");
                let n = document.createElement("div");
                n.classList.add("modal-dialog"), t.appendChild(n);
                let l = document.createElement("div");
                l.classList.add("modal-content"), n.appendChild(l);
                let i = document.createElement("div");
                i.classList.add("modal-header"), l.appendChild(i);
                let a = document.createElement("button");
                (a.type = "button"),
                  a.classList.add("close"),
                  (a.dataset.dismiss = "modal"),
                  (a.ariaLabel = "Close"),
                  i.appendChild(a);
                let d = document.createElement("span");
                (d.innerHTML = "&times;"),
                  (d.ariaHidden = "true"),
                  a.appendChild(d);
                let o = document.createElement("h1");
                (o.innerText = e.name), l.appendChild(o);
                let s = document.createElement("div");
                s.classList.add("div-flex"), l.appendChild(s);
                let r = document.createElement("div");
                r.classList.add("flex-child"), s.appendChild(r);
                let c = document.createElement("p");
                (c.innerText = `Height: ${e.height}`), r.appendChild(c);
                let p = document.createElement("p");
                (p.innerText = "Types:"), r.appendChild(p);
                let m = document.createElement("ul");
                r.appendChild(m);
                let h = [];
                for (let u = 0; u < e.types.length; u++)
                  h.push(e.types[u].type.name);
                console.log(h),
                  h.forEach(function (e) {
                    let t = document.createElement("li");
                    (t.innerText = e), m.appendChild(t);
                  });
                let E = document.createElement("img");
                (E.src = e.sprites.front_default),
                  E.classList.add("pokemon-image"),
                  s.appendChild(E),
                  a.addEventListener("click", hideModal);
              });
            })(t);
          }),
          n.appendChild(i),
          i.appendChild(a);
      },
      loadList: function e() {
        let t = document.getElementById("loading-message");
        function l() {
          t.classList.toggle("invisible");
        }
        return (
          l(),
          fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              l(),
                e.results.forEach(function (e) {
                  n({ name: e.name, detailsUrl: e.url });
                });
            })
            .catch(function (e) {
              console.log(e);
            })
        );
      },
      loadDetails: l,
    };
  })(),
  searchBar = document.getElementById("search");
function hideModal() {
  document.getElementById("modal-container").classList.remove("is-visible");
}
searchBar.addEventListener("input", (e) => {
  let t = e.target.value.toLowerCase();
  console.log(t),
    document.querySelectorAll(".pokemon-list .list-group-item").forEach((e) => {
      e.classList.toggle("hide", !e.textContent.toLowerCase().includes(t));
    });
}),
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach((e) => {
      pokemonRepository.addListItem(e);
    });
  }),
  window.addEventListener("keydown", (e) => {
    let t = document.getElementById("modal-container");
    "Escape" === e.key && t.classList.contains("is-visible") && hideModal();
  });
let modalContainer = document.getElementById("modal-container");
modalContainer.addEventListener("click", (e) => {
  e.target === modalContainer && hideModal();
});
