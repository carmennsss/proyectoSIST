// -----------------
// @Author: Carmen
// 21/03/2025
// -----------------

// -----------------
// COMIENZO
// -----------------
document.addEventListener("DOMContentLoaded", () => {
  cargarMesas();
  aniadirEventos();
});

// -----------------
// VARIABLES
// -----------------
let idMesa = -1;

// -----------------
// METODOS
// -----------------

// Imprime las mesas en el html
function mostrarMesas(mesas) {
  const lista = document.getElementById("lista-mesas");
  lista.innerHTML = ""; // Limpio lo anterior

  mesas.forEach((mesa) => {
    const mesaDiv = document.createElement("div");
    mesaDiv.classList.add("mesa");
    mesaDiv.setAttribute("data-mesa", mesa);

    mesaDiv.innerHTML = `
            <img src="/static/imgs/mesa2.png" alt="Mesa ${mesa}">
        `;

    // Agrego el evento para poder seleccionar la mesa
    mesaDiv.addEventListener("click", function () {
      // Quito el selected de todas las mesas
      document
        .querySelectorAll("#lista-mesas > div")
        .forEach((m) => m.classList.remove("selected"));
      // Sustituyo el indice de mesa
      idMesa = mesaDiv.getAttribute("data-mesa");
      // Agrego el selected a la seleccionada
      this.classList.add("selected");
    });

    lista.appendChild(mesaDiv);
  });
}

// Añade los eventos
function aniadirEventos() {
  document
    .getElementById("listar-pedidos")
    .addEventListener("click", mostrarPedidosMesa, false);
  document
    .getElementById("crear-pedido")
    .addEventListener("click", iniciarPedidoMesa, false);
}

// Lleva a la pagina de listar
function mostrarPedidosMesa() {
  if (idMesa != -1) {
    window.location.href = `/listarPedidos?idMesa=${idMesa}`;
  }
}

// Lleva a la pagina de crear el pedido
function iniciarPedidoMesa() {
  if (idMesa != -1) {
    window.location.href = `/crearPedido?idMesa=${idMesa}`;
  }
}

// -----------------
// OBTIENE JSON
// -----------------

// Obtiene las mesas
function cargarMesas() {
  fetch("/mesas")
    .then((response) => response.json())
    .then((data) => {
      mostrarMesas(data);
    })
    .catch((error) => console.error("Error cargando las mesas:", error));
}