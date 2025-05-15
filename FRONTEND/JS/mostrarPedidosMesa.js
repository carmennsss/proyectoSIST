// -----------------
// @Author: Carmen
// 21/03/2025
// -----------------

// -----------------
// COMIENZO
// -----------------
document.addEventListener("DOMContentLoaded", () => {
  sacarIdMesa();
  cargarPedidos();
  aniadirEventos();
});

// -----------------
// VARIABLES
// -----------------
let idMesa = -1;

// -----------------
// METODOS
// -----------------

// Añade los eventos
function aniadirEventos() {
  document
    .getElementById("volver")
    .addEventListener("click", volverAtras, false);
}

// Lleva al indice
function volverAtras() {
  window.location.href = "../../index.html";
}

// Obtiene el id de la mesa de los parametros
function sacarIdMesa() {
  var params = new URLSearchParams(window.location.search);
  idMesa = params.get("idMesa");
  document.getElementById("idMesa").textContent = "Mesa: " + idMesa;
}

// Imprime en el html los pedidos
function mostrarPedidos(pedidos) {
  const lista = document.getElementById("lista-pedidos");
  lista.innerHTML = ""; // Limpio el contenido previo

  pedidos.forEach((pedido) => {
    const pedidoDiv = document.createElement("div");
    pedidoDiv.classList.add("pedido");
    pedidoDiv.innerHTML = `
            <p>ID: ${pedido.id_pedido}</p>
            <p>Producto: ${pedido.producto.nombre}</p>
            <p>Tipo: ${pedido.tipo.nombre}</p>
            <hr>
        `;
    lista.appendChild(pedidoDiv);
  });
}

// -----------------
// OBTIENE JSON
// -----------------

// Obtiene los pedidos de la mesa
function cargarPedidos() {
  fetch("http://127.0.0.1:5000/pedidos/" + idMesa)
    .then((response) => response.json())
    .then((data) => {
      mostrarPedidos(data);
    });
}
