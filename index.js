////// VARIABLES ///////

// "https://gateway.marvel.com/v1/public/comics?apikey=a6943ab77d6617d4958a73abab2a9b91"
const urlBase = "https://gateway.marvel.com/v1/public/";
const apikey = "a6943ab77d6617d4958a73abab2a9b91";
// let offset = 0;

const resultados = document.querySelector(".results");
const resultadosPorPagina = 20;
let paginaActual = 0;
let cantidadDeResultados = 0;

// =>PAGINACION
const primeraPagina = document.querySelector(".button__first-left");
const ultimaPagina = document.querySelector(".button__last");
const proximaPagina = document.querySelector(".button__right");
const anteriorPagina = document.querySelector(".button__left");

// console.log(
//   "botones seleccionados:",
//   primeraPagina,
//   ultimaPagina,
//   proximaPagina,
//   anteriorPagina,
//   resultados
// );

// =>SEARCH Y SELECT
const inputSearch = document.querySelector(".search--input");
const botonSearch = document.querySelector(".search-button");
const selectType = document.querySelector("#search-type");
const selectSort = document.querySelector("#search-sort");
const selectSortComic = document.querySelector(".select-sort-comics");
const selectSortCharacter = document.querySelector(".select-sort-character");

const numeroDeResultados = document.querySelector(".results-number");
const titleDeResultados = document.querySelector(".results-title");

//////\\\\\\ SELECCION ///////\\\\\\\

selectType.onchange = () => {
  if (selectType.value == "comics") {
    selectSortComic.classList.remove("hidden");
    selectSortCharacter.classList.add("hidden");
  }
  if (selectType.value == "characters") {
    selectSortComic.classList.add("hidden");
    selectSortCharacter.classList.remove("hidden");
  }
};

//////\\\\\\ MOSTRAR TARJETAS ///////\\\\\\\

mostrarComics = (comic) => {
  return `
    <div class="comic-card">
        <div class="comic-img-container">
            <img src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="" class="comic-thumbnail" data-id="${comic.id}"/>
        </div>
        <h3 class="comic-title">${comic.title}</h3>
    </div>
    `;
};
mostrarCharacters = (character) => {
  return `
    <div class="character-card">
        <div class="character-img-container">
            <img src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="" class="character-thumbnail" data-id="${character.id}" />
        </div>
        <div class="character-name-container">
            <h3 class="character-name">${character.name}</h3>
        </div>
    </div>
    `;
};

//////\\\\\\ MOSTRAR RESULTADOS DE BUSQUEDA ///////\\\\\\\

const mostrarResultados = (
  type = "comics",
  order = "title",
  inputSearch = ""
) => {
  let inputContainer = "";
  offset = paginaActual * resultadosPorPagina;
  if (inputSearch !== "") {
    if (type == "comics") {
      inputContainer = `&titleStartsWith=${inputSearch}`;
    }
    if (type == "characters") {
      inputContainer = `&nameStartsWith=${inputSearch}`;
    }
  }
  fetch(
    `${urlBase}${type}?apikey=${apikey}&orderBy=${order}${inputContainer}&offset=${offset}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("pagina del comic:", data);
      cantidadDeResultados = data.data.total;
      resultados.innerHTML = "";

      data.data.results.map((selectType) => {
        if (type == "comics") {
          return (resultados.innerHTML += mostrarComics(selectType));
        }
        if (type == "characters") {
          return (resultados.innerHTML += mostrarCharacters(selectType));
        }
      });

      let offset = data.data.offset;
      //   console.log("offset del comic:", data.data.offset);
      onOffBotones(offset, cantidadDeResultados);
      mostrarCantidadResultados(cantidadDeResultados);
      verInfoComic();
      verInfoCharact();
    });
};
mostrarResultados();

const buscarResultados = () => {
  if (inputSearch.value != "") {
    if (selectType.value === "characters") {
      mostrarResultados(
        selectType.value,
        selectSortCharacter.value,
        inputSearch.value
      );
    } else {
      mostrarResultados(
        selectType.value,
        selectSortComic.value,
        inputSearch.value
      );
    }
  } else {
    if (selectType.value === "characters") {
      mostrarResultados(selectType.value, selectSortCharacter.value);
    } else {
      mostrarResultados(selectType.value, selectSortComic.value);
    }
  }
};

botonSearch.onclick = () => {
  paginaActual = 0;
  buscarResultados();
};

//////\\\\\\ PAGINACION ///////\\\\\\\

proximaPagina.onclick = () => {
  resultados.innerHTML = "";
  paginaActual++;
  buscarResultados();
};

anteriorPagina.onclick = () => {
  resultados.innerHTML = "";
  paginaActual--;
  buscarResultados();
};

primeraPagina.onclick = () => {
  resultados.innerHTML = "";
  paginaActual = 0;
  buscarResultados();
};

ultimaPagina.onclick = () => {
  restoResultados = cantidadDeResultados % resultadosPorPagina;
  if (restoResultados > 0) {
    paginaActual =
      (cantidadDeResultados - restoResultados) / resultadosPorPagina;
  } else {
    paginaActual = cantidadDeResultados / resultadosPorPagina - 1;
  }
  buscarResultados();
};

// =>deshabilitar paginacion

onOffBotones = (offset = "0", cantidadDeResultados = "0") => {
  if (paginaActual == 0) {
    primeraPagina.disabled = true;
    anteriorPagina.disabled = true;
  } else {
    primeraPagina.disabled = false;
    anteriorPagina.disabled = false;
  }
  if (offset + 20 >= cantidadDeResultados) {
    proximaPagina.disabled = true;
    ultimaPagina.disabled = true;
  } else {
    proximaPagina.disabled = false;
    ultimaPagina.disabled = false;
  }
};
// desactivar boton search

offSearchBoton = () => {
  document.querySelector(".search-button").disabled = true;
};

/////\\\\ => MOSTRAR CANTIDAD DE RESULTADOS ////\\\\

const mostrarCantidadResultados = (cantidadDeResultados) => {
  numeroDeResultados.innerHTML = `${cantidadDeResultados}`;
};

////////\\\\\\\ MODO OSCURO ///////\\\\\\\\

const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  console.log("modo");
});

//////\\\\\\ INFORMACION DE LOS COMICS Y LOS PERSONAJES QUE ESTAN EN EL  /////\\\\\

const infoComic = (comicId) => {
  console.log("hola soy un comic");
  offset = paginaActual * resultadosPorPagina;
  fetch(`${urlBase}comics/${comicId}?apikey=${apikey}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => {
      data.data.results.map((data) => {
        const seccionComic = document.querySelector(".comics__section");
        seccionComic.classList.remove("hidden");
        // resultados.classList.add("hidden");

        const publicacionFormatoAmericano = data.modified.split("T")[0];
        const dia = publicacionFormatoAmericano.slice(8, 10);
        const mes = publicacionFormatoAmericano.slice(5, 7);
        const anio = publicacionFormatoAmericano.slice(0, 4);

        seccionComic.innerHTML = "";
        seccionComic.innerHTML += `
          <img class="comic-cover" src="${data.thumbnail.path}.jpg" data-id="${
          data.id
        }">
          </img>
          <div class="comic-details">
            <h2 class="comic-title">${data.title}</h2>
            <h3>Publicado:</h3> 
            <p class="comic-published">${dia}/${mes}/${anio}</p>
            <h3>Guionista:</h3> 
            <p class="comic-writers">${obtenerNombreGuionista(data)}</p>
            <h3>Description:</h3>
            <p class="comic-description">${data.description}</p>
          </div>
        `;

        offset = paginaActual * resultadosPorPagina;
        fetch(
          `${urlBase}comics/${comicId}/characters?apikey=${apikey}&offset=${offset}`
        )
          .then((res) => res.json())
          .then((data) => {
            const seccionCharacter = document.querySelector(".results");
            seccionCharacter.innerHTML = "";
            // mostrarCantidadResultados(data.data.results.length);

            const mostrarCantidadResultados2 = () => {
              titleDeResultados.innerHTML = `Personajes`;
              numeroDeResultados.innerHTML = `${data.data.results.length}`;
            };
            mostrarCantidadResultados2();

            data.data.results.map((character) => {
              seccionCharacter.classList.remove("hidden");
              seccionCharacter.innerHTML += `
              <div class="character">
                <div class="character-img-container">
                  <img class="character-thumbnail" src="${character.thumbnail.path}.jpg" data-id="${character.id}"></img>
                </div>
                <div class="character-name-container">
                  <h3 class="character-name">${character.name}</h3>
                </div>
              </div>
              `;
            });
          });
      });
    });
  onOffBotones();

  // offSearchBoton();
};

obtenerNombreGuionista = (comic) => {
  let nombreGuionistas = "";

  let escritores = comic.creators.items.filter((guionista) => {
    return guionista.role === "writer";
  });
  if (escritores.length === 0) {
    nombreGuionistas = "No hay informacion";
  } else {
    escritores.forEach((escritor) => {
      nombreGuionistas += escritor.name;
    });
    nombreGuionistas = nombreGuionistas.substring(0, nombreGuionistas.length);
  }
  return nombreGuionistas;
};

const verInfoComic = () => {
  const cardsComics = document.querySelectorAll(".comic-card");

  cardsComics.forEach((card) => {
    card.onclick = (e) => {
      comicId = e.target.dataset.id;
      resultados.innerHTML = "";
      infoComic(comicId);
    };
  });
};

/////\\\\\ VER LA INFORMACION DEL PERSONAJES Y LOS COMICS EN LOS QUE SE ENCUENTRA: /////\\\\

const infoCharacter = (characterId) => {
  console.log("soy un character");
  // offset = paginaActual * resultadosPorPagina;
  fetch(
    `${urlBase}characters/${characterId}?apikey=${apikey}&offset=${offset}&orderBy=name`
  )
    .then((res) => res.json())
    .then((data) => {
      data.data.results.map((data) => {
        // let contenedorResultados = document.querySelector(".results-section");
        // contenedorResultados.innerHTML = ""; // => borro el total de los resultados
        const sectionChar = document.querySelector(".character__section");
        sectionChar.classList.remove("hidden");
        sectionChar.innerHTML = "";
        sectionChar.innerHTML += `
        <div class="character-card" data-id="${data.id}">
          <div class="character-img-container">
            <img class="comic-thumbnail" src="${data.thumbnail.path}.jpg" data-id="${data.id}"></img>
          </div>
          <div class="character-name-container">
            <h3 class="character-name">${data.name}</h3>
            
          </div>
        </div>`;

        // offset = paginaActual * resultadosPorPagina;
        fetch(
          `${urlBase}characters/${characterId}/comics?apikey=${apikey}&offset=${offset}`
        )
          .then((res) => res.json())
          .then((data) => {
            // let comics = dataComic.data.results;

            const sectionComic = document.querySelector(".results");
            sectionComic.innerHTML = "";
            // mostrarCantidadResultados(comics.length);

            data.data.results.map((comic) => {
              sectionComic.classList.remove("hidden");
              sectionComic.innerHTML += `
              <div class="comic-card">
                <div class="comic-img-container">
                  <img src="${comic.thumbnail.path}.jpg" alt="" class="comic-thumbnail" data-id="${comic.id}"/>
                </div>
                <h3 class="comic-title">${comic.title}</h3>
              </div>
            `;
            });
          });
      });
    });
  onOffBotones();
};

const verInfoCharact = () => {
  const cardsCharact = document.querySelectorAll(".character-card");

  cardsCharact.forEach((card) => {
    card.onclick = (e) => {
      characterId = e.target.dataset.id;
      resultados.innerHTML = "";
      infoCharacter(characterId);
    };
  });
};
