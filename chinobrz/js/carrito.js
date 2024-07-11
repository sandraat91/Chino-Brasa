    let iconCart = document.querySelector('.icon-cart');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');

    // open and close tab
    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })
    closeCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
        hideCart(); // Ocultar el carrito después de vaciarlo
    })
    

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('icon-cart-count');
    let count = document.querySelectorAll('.cart-item').length;
    cartCount.textContent = count;
}
    