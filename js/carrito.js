import { obtenerCarrito } from "./storage.js";
import { sumarCantidad, restarCantidad, finalizarCompra } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";


const renderizarCarrito = ()=>{
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones= document.getElementById("acciones-carrito");

    contenedor.innerHTML="";
    divAcciones.innerHTML="";


    if (!carrito.length){
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "Tu carrito está vacio";

        contenedor.appendChild(mensaje);
        return;
    }

    carrito.forEach((producto,index) => {
        const cantidad = producto.cantidad || 1;

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const contenedorImg = document.createElement("div");
        contenedorImg.classList.add("content-image");

        const image = document.createElement("img");
        image.src = `../${producto.image}`;
        image.alt = producto.alt;
        image.classList.add("img-prod");

        const title = document.createElement("h3");
        title.textContent = producto.title;

        const description = document.createElement("p");
        description.textContent = producto.description;

        const centrarbtn = document.createElement("div");
        centrarbtn.classList.add("centrarbtn");

        const precioUnitario = document.createElement("p");
        precioUnitario.textContent = `$${producto.price.toLocaleString("es-AR")} c/u`;

        const controlCantidad = document.createElement("div");
        controlCantidad.classList.add("control-cantidad");

        const btnRestar = document.createElement("button");
        btnRestar.classList.add("btn-cantidad");
        btnRestar.textContent = "-";
        btnRestar.addEventListener("click", () => {
            restarCantidad(index);
            renderizarCarrito();
        });

        const valorCantidad = document.createElement("span");
        valorCantidad.classList.add("valor-cantidad");
        valorCantidad.textContent = cantidad;

        const btnSumar = document.createElement("button");
        btnSumar.classList.add("btn-cantidad");
        btnSumar.textContent = "+";
        btnSumar.addEventListener("click", () => {
            sumarCantidad(index);
            renderizarCarrito();
        });

        controlCantidad.appendChild(btnRestar);
        controlCantidad.appendChild(valorCantidad);
        controlCantidad.appendChild(btnSumar);

        const subtotal = document.createElement("p");
        subtotal.classList.add("subtotal");
        subtotal.textContent = `Subtotal: $${(producto.price * cantidad).toLocaleString("es-AR")}`;

        contenedorImg.appendChild(image);
        centrarbtn.appendChild(precioUnitario);
        centrarbtn.appendChild(controlCantidad);
        centrarbtn.appendChild(subtotal);

        tarjeta.appendChild(contenedorImg);
        tarjeta.appendChild(title);
        tarjeta.appendChild(description);
        tarjeta.appendChild(centrarbtn);

        contenedor.appendChild(tarjeta);
    })

    const btnFinalizar = document.createElement("button");
    btnFinalizar.classList.add("btn", "bg-secondary", "text-dark", "finalizar-compra");
    btnFinalizar.textContent = "Finalizar compra";

    btnFinalizar.addEventListener("click", () => {
        finalizarCompra();
    });

    divAcciones.appendChild(btnFinalizar);
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});