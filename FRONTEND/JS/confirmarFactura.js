// -----------------
// @Author: Carmen
// 21/03/2025
// -----------------

// -----------------
// COMIENZO
// -----------------
document.addEventListener("DOMContentLoaded", () => {
  sacarIds();
  aniadirEventos();
});

// -----------------
// VARIABLES
// -----------------
let idMesa = -1;
let idProducto = -1;
let idTipo = -1;
let nombreTipo = "";
let nombreProducto = "";

// -----------------
// METODOS
// -----------------

// Añade los eventos
function aniadirEventos() {
  document
    .getElementById("volver")
    .addEventListener("click", volverAtras, false);
  document
    .getElementById("confirmar-compra")
    .addEventListener("click", confirmarPedido, false);
}

// Lleva al index
function volverAtras() {
  window.location.href = "../../index.html";
}

// -----------------
// OBTIENE JSON
// -----------------

// Saca los parametros
function sacarIds() {
  var params = new URLSearchParams(window.location.search);
  idMesa = params.get("idMesa");
  idProducto = params.get("idProducto");
  idTipo = params.get("idTipo");

  if (idMesa && idProducto && idTipo) {
    // Obtengo el nombre del producto
    fetch(`http://localhost:5000/productosNombre/${idProducto}`)
      .then((response) => response.json())
      .then((producto) => {
        // Obtengo el nombre del tipo
        fetch(`http://localhost:5000/tiposNombre/${idTipo}`)
          .then((response) => response.json())
          .then((tipo) => {
            // Actualizo el html
            document.getElementById("idMesa").textContent = "Mesa: " + idMesa;
            document.getElementById("idProducto").textContent = producto.nombre;
            document.getElementById("idTipo").textContent = tipo.nombre;
          })
          .catch((error) => console.error("Error cargando tipo:", error));
      })
      .catch((error) => console.error("Error cargando producto:", error));
  } else {
    console.error("Faltan parámetros en la URL");
  }
}

// Inserta el pedido
function confirmarPedido() {
  const pedidoData = {
    idMesa: idMesa,
    idProducto: idProducto,
    tipo: idTipo,
  };

  // Mando los parametros en un json
  fetch("http://localhost:5000/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedidoData),
  })
    // Si el servidor no responde
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })

    // Si ha ido bien
    .then((data) => {
      console.log("Éxito:", data);
      alert("Pedido creado correctamente");
      volverAtras();
    })

    // Si hay errores
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al crear el pedido: " + error.message);
    });
}
