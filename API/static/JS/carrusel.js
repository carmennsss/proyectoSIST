// -----------------
// @Author: Carmen
// 21/03/2025
// -----------------

// -----------------
// COMIENZO
// -----------------
document.addEventListener("DOMContentLoaded", () => {
  cargarGrupos();
  activarEventosCarrusel();
});

// -----------------
// VARIABLES
// -----------------
const carrusel = document.getElementById("carrusel-grupos");
const prevBtn = document.querySelector(".carrusel-control.prev");
const nextBtn = document.querySelector(".carrusel-control.next");
let currentIndex = 0;
let grupos = [];

const imagenesGrupos = {
  1: "/static/IMGS/bebidas.png",
  2: "/static/IMGS/entrantes.png",
  3: "/static/IMGS/cuchareo.png",
  4: "/static/IMGS/carnes.png",
  5: "/static/IMGS/pescado.png",
  6: "/static/IMGS/postres.png",
};

// -----------------
// METODOS
// -----------------

// Imprime los grupos en el html
function renderGrupos() {
  carrusel.innerHTML = "";

  grupos.forEach((grupo, index) => {
    const grupoDiv = document.createElement("div");
    grupoDiv.className = "grupo-carrusel";
    grupoDiv.dataset.id = grupo.id;

    const imagen = imagenesGrupos[grupo.id] || "default.png";

    grupoDiv.innerHTML = `
                <img src="${imagen}" class="imagen-grupo" alt="${grupo.nombre}">
                <h3>${grupo.nombre}</h3>
            `;

    carrusel.appendChild(grupoDiv);

    // Muestro solo el primer elemento inicialmente
    if (index === 0) {
      setTimeout(() => {
        grupoDiv.classList.add("show");
      }, 100);
    }
  });
}

// Activa los eventos del carrusel
function activarEventosCarrusel() {

  // Boton previo
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      actualizarCarrusel();
    }
  });

  // Boton siguiente
  nextBtn.addEventListener("click", () => {
    if (currentIndex < grupos.length - 1) {
      currentIndex++;
      actualizarCarrusel();
    }
  });
}

// Actualiza el carrusel
function actualizarCarrusel() {
  const containerWidth = carrusel.offsetWidth;
  const offset = -currentIndex * containerWidth;
  carrusel.style.transform = `translateX(${offset}px)`;

  // Actualizar clases show
  document.querySelectorAll(".grupo-carrusel").forEach((item, index) => {
    if (index === currentIndex) {
      setTimeout(() => {
        item.classList.add("show");
      }, 50);
    } else {
      item.classList.remove("show");
    }
  });
  mostrarProductos(grupos[currentIndex].id);

  // Deshabilita los botones dependiendo el indice
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= grupos.length - 1;
}

// -----------------
// OBTIENE JSON
// -----------------

// Obtiene los grupos
function cargarGrupos() {
  fetch("/grupos")
    .then((response) => response.json())
    .then((data) => {
      grupos = data;
      renderGrupos();
      actualizarCarrusel();
    })
    .catch((error) => console.error("Error cargando los grupos:", error));
}
