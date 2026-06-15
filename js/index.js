import { productos } from "./productos.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarProductos = () => {
    const contenedor = document.getElementById("contenedor-tarjetas");

    productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const contenedorImg = document.createElement("div");
        contenedorImg.classList.add("content-image");

        const img = document.createElement("img");
        img.src = `./${producto.imagen}`;
        img.alt = producto.alt;
        img.classList.add("img-prod");

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const centrarbtn = document.createElement("div");
        centrarbtn.classList.add("centrarbtn");

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio.toLocaleString("es-AR")}`;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });

        contenedorImg.appendChild(img);
        centrarbtn.appendChild(precio);
        centrarbtn.appendChild(boton);

        tarjeta.appendChild(contenedorImg);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(centrarbtn);

        contenedor.appendChild(tarjeta);
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    renderizarProductos();
});