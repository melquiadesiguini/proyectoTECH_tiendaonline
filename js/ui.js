export const actualizarContador = (carrito) => {
    const contador = document.getElementById("contador-carrito");
    if (contador){
        const totalCantidad = carrito.reduce((acumulado, producto) => acumulado + (producto.cantidad || 1), 0);
        contador.textContent = totalCantidad;
    }
};

export const mostrarMensaje = (mensaje) => {
    alert(mensaje);
};