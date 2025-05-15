// -----------------
// @Author: Carmen
// 21/03/2025
// -----------------

// -----------------
// COMIENZO
// -----------------
document.addEventListener("DOMContentLoaded", () => {
  sacarIdMesa();
  aniadirEventos();
});

// -----------------
// VARIABLES
// -----------------
let idMesa = -1;
let productoActual = null; // Variable para el producto actual

// -----------------
// METODOS
// -----------------

// Añade los eventos
function aniadirEventos() {
  document.getElementById("volver").addEventListener("click", volverAtras, false);
}

// Vuelve al indice
function volverAtras() {
  window.location.href = "../../index.html";
}

// Saco la mesa de los parametros
function sacarIdMesa() {
  const params = new URLSearchParams(window.location.search);
  idMesa = params.get("idMesa");
  document.getElementById("numero-mesa").textContent = idMesa;
}

// Muestra los productos en el html
function imprimirProductos(productos) {
  const contenedor = document.getElementById("zona-productos");
  contenedor.innerHTML = "";
  productoActual = null;

  productos.forEach((producto, index) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.innerHTML = `
            <span>${producto.nombre}</span>
            <button onclick="mostrarRaciones(${producto.id})">+</button>
            <div id="producto${producto.id}"></div>
        `;
    contenedor.appendChild(productoDiv);
    setTimeout(() => productoDiv.classList.add("show"), 50 * index);
  });
}

// Muestra las raciones en el html
function mostrarRacionesSelect(data, idProducto) {
  const lista = document.getElementById(`producto${idProducto}`);
  lista.innerHTML = "";
  data.forEach((tipo, index) => {
    const tipoDiv = document.createElement("div");
    tipoDiv.classList.add("tipo");
    tipoDiv.innerHTML = `
            <span>${tipo.nombre}</span>
            <button onclick="crearFactura(${idProducto}, ${tipo.id})">+</button>
        `;
    lista.appendChild(tipoDiv);
    setTimeout(() => tipoDiv.classList.add("show"), 50 * index);
  });
}

// Lleva a crear la factura
function crearFactura(idProducto, idTipo) {
  window.location.href = `factura.html?idMesa=${idMesa}&idProducto=${idProducto}&idTipo=${idTipo}`;
}

// -----------------
// OBTIENE JSON
// -----------------

// Imprime las raciones en el html para un producto
function mostrarRaciones(idProducto) {
  // Si es un producto diferente al actual, limpio las raciones anteriores
  if (productoActual !== null && productoActual !== idProducto) {
    const racionesAnteriores = document.getElementById(
      `producto${productoActual}`
    );
    if (racionesAnteriores) {
      racionesAnteriores.innerHTML = "";
    }
  }

  productoActual = idProducto; // Actualizo el producto actual

  fetch(`http://localhost:5000/tipos/${idProducto}`)
    .then((response) => response.json())
    .then((data) => {
      mostrarRacionesSelect(data, idProducto);
    })
    .catch((error) => console.error("Error cargando los tipos:", error));
}

// Obtiene los productos para un tipo
function mostrarProductos(idGrupo) {
  fetch(`http://localhost:5000/productos/${idGrupo}`)
    .then((response) => response.json())
    .then((data) => {
      imprimirProductos(data);
    })
    .catch((error) => console.error("Error cargando los productos:", error));
}
