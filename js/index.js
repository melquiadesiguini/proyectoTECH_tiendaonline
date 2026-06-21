import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarProductos = () => {
    const contenedor = document.getElementById("contenedor-tarjetas");
    
    fetch("data/productos.json")
    .then(response => response.json())
    .then(data => data.forEach(producto=>{
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const contenedorImg = document.createElement("div");
        contenedorImg.classList.add("content-image");

        const image = document.createElement("img");
        image.src = producto.image;
        image.alt = producto.alt;
        image.classList.add("img-prod");

        const title = document.createElement("h3");
        title.textContent = producto.title;

        const description = document.createElement("p");
        description.textContent = producto.description;

        const centrarbtn = document.createElement("div");
        centrarbtn.classList.add("centrarbtn");

        const price = document.createElement("p");
        price.textContent = `$${producto.price.toLocaleString("es-AR")}`;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
            agregarAlCarrito(producto);
        })

        
        contenedorImg.appendChild(image);
        centrarbtn.appendChild(price);
        centrarbtn.appendChild(boton);
        
        tarjeta.appendChild(contenedorImg);
        tarjeta.appendChild(title);
        tarjeta.appendChild(description);
        tarjeta.appendChild(centrarbtn);

        contenedor.appendChild(tarjeta);
    }))
    .catch(error => console.log(error));

};
document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    renderizarProductos();
});