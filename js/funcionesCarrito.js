import { guardarCarrito, obtenerCarrito, vaciarCarritoStorage} from "./storage.js";
import { actualizarContador, mostrarMensaje} from "./ui.js";

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    const existente = carrito.find((item) => item.id === producto.id);

    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContador(carrito);
};

export const sumarCantidad = (indice) => {
    const carrito = obtenerCarrito();
    carrito[indice].cantidad = (carrito[indice].cantidad || 1) + 1;

    guardarCarrito(carrito);
    actualizarContador(carrito);
};

export const restarCantidad = (indice) => {
    const carrito = obtenerCarrito();
    carrito[indice].cantidad = (carrito[indice].cantidad || 1) - 1;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    guardarCarrito(carrito);
    actualizarContador(carrito);
};

export const vaciarCarrito = () => {
    vaciarCarritoStorage();
    actualizarContador([]);
};

export const finalizarCompra = () => {
    const carrito = obtenerCarrito();

    if (!carrito.length) {
        mostrarMensaje("Tu carrito está vacío");
        return;
    }

    let mensaje = "¡Hola! finalizar la comprar por estos productos:\n\n";

    carrito.forEach((producto) => {
        const cantidad = producto.cantidad || 1;
        const subtotal = producto.price * cantidad;
        mensaje += `• ${cantidad} x ${producto.title} - $${subtotal.toLocaleString("es-AR")}\n`;
    });

    const total = carrito.reduce((acumulado, producto) => acumulado + producto.price * (producto.cantidad || 1), 0);
    mensaje += `\nTotal: $${total.toLocaleString("es-AR")}`;

    const numero = "5491157462523";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
};