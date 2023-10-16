const pokemonRepository = (function () {
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
      let t = e.detailsUrl;
      return fetch(t)
        .then(function (e) {
          return e.json();
        })
        .catch(function (e) {
          console.error(e);
        });
    }
    window.addEventListener("keydown", (e) => {
      let t = document.getElementById("modal-container");
      "Escape" === e.key && t.classList.contains("is-visible") && a();
    });
    let i = document.getElementById("modal-container");
    function a() {
      let e = document.getElementById("modal-container");
      e.classList.remove("is-visible");
    }
    return (
      i.addEventListener("click", (e) => {
        let t = e.target;
        t === i && a();
      }),
      {
        getAll: t,
        add: n,
        addListItem: function e(t) {
          let n = document.getElementById("ul-pokemon"),
            i = document.createElement("li");
          i.classList.add("list-group-item");
          let d = document.createElement("button");
          (d.innerText = t.name),
            d.classList.add("btn"),
            d.classList.add("btn-info"),
            d.classList.add("custom-button"),
            d.addEventListener("click", function () {
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
                  let d = document.createElement("button");
                  (d.type = "button"),
                    d.classList.add("close"),
                    (d.dataset.dismiss = "modal"),
                    (d.ariaLabel = "Close"),
                    i.appendChild(d);
                  let s = document.createElement("span");
                  (s.innerHTML = "&times;"),
                    (s.ariaHidden = "true"),
                    d.appendChild(s);
                  let o = document.createElement("h1");
                  (o.innerText = e.name), l.appendChild(o);
                  let c = document.createElement("div");
                  c.classList.add("div-flex"), l.appendChild(c);
                  let r = document.createElement("div");
                  r.classList.add("flex-child"), c.appendChild(r);
                  let p = document.createElement("p");
                  (p.innerText = `Height: ${e.height}`), r.appendChild(p);
                  let m = document.createElement("p");
                  (m.innerText = "Types:"), r.appendChild(m);
                  let u = document.createElement("ul");
                  r.appendChild(u);
                  let h = [];
                  for (let E = 0; E < e.types.length; E++)
                    h.push(e.types[E].type.name);
                  console.log(h),
                    h.forEach(function (e) {
                      let t = document.createElement("li");
                      (t.innerText = e), u.appendChild(t);
                    });
                  let g = document.createElement("img");
                  (g.src = e.sprites.front_default),
                    g.classList.add("pokemon-image"),
                    c.appendChild(g),
                    d.addEventListener("click", a);
                });
              })(t);
            }),
            n.appendChild(i),
            i.appendChild(d);
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
                    let t = { name: e.name, detailsUrl: e.url };
                    n(t);
                  });
              })
              .catch(function (e) {
                console.log(e);
              })
          );
        },
        loadDetails: l,
      }
    );
  })(),
  searchBar = document.getElementById("search");
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
  });
