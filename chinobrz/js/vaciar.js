document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    
    // Añadir evento para el botón de vaciar carrito
    document.querySelector('.vaciar').addEventListener('click', showNotification);
});

// Función para mostrar la notificación
function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
}

// Función para ocultar la notificación
function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

// Función para vaciar el carrito y el pedido
function vaciar() {
    // Limpiar la lista de productos en el carrito
    document.querySelector('.listCart').innerHTML = ''; 
    updateCartCount();
    localStorage.removeItem('cartItems');

    // Limpiar el pedido
    const platosContainer = document.querySelector('.platos');
    if (platosContainer) {
        platosContainer.innerHTML = ''; 
        document.querySelector('.total-pagar span').textContent = 'S/. 0.00';
        localStorage.removeItem('pedido');
    }
    
    hideNotification();
}


// Añadir eventos para los botones de la notificación
document.getElementById('confirmVaciar').addEventListener('click', vaciar);
document.getElementById('cancelVaciar').addEventListener('click', hideNotification);


