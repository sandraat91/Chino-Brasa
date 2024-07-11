// Seleccionar todos los enlaces de navegación
const navLinks = document.querySelectorAll('.navbar-custom a');

// Agregar evento de clic a cada enlace
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    const targetSection = event.target.getAttribute('href'); // Obtener el ID de la sección objetivo
    showSection(targetSection);
  });
});

function showSection(sectionId) {
  // Ocultar todas las secciones
  document.querySelectorAll('.section-custom').forEach(section => {
    section.style.display = 'none';
  });

  // Mostrar la sección objetivo
  const targetSection = document.querySelector(sectionId);
  targetSection.style.display = 'block';
}

// Seleccionar todos los productos y mostrarlos sin categorización
document.addEventListener('DOMContentLoaded', function() {
  const allProductsContainer = document.getElementById('allProducts');

  if (allProductsContainer) {
    producto.forEach(category => {
      category.products.forEach(product => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
          <img src="${product.image}" alt="${product.alt}">
          <h3>${product.name}</h3>
          <div class="price">S/${product.price}</div>
          <div class="linea-producto"></div>
          <button class="addCart">Add to Cart</button>
        `;
        allProductsContainer.appendChild(newItem);

        // Agregar evento click para agregar al carrito
        const addButton = newItem.querySelector('.addCart');
        addButton.addEventListener('click', () => {
          addToCart(product.id);
        });

      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const miPedidoLink = document.getElementById('mi-pedido-link');

  // Agregar un event listener al enlace "Mi pedido"
  miPedidoLink.addEventListener('click', function(event) {
      if (miPedidoLink.classList.contains('')) {
          event.preventDefault(); // Prevenir la acción por defecto del enlace
          alert('Por favor, elija productos del menú');
      }
  });
});

// Función que se llama cuando se hace clic en el botón "Ir a pagar"
window.direccionar = function() {
  const listCartItems = document.querySelectorAll('.cart-item');
  const pedido = [];

  listCartItems.forEach(item => {
      const imgSrc = item.querySelector('img').src;
      const imgAlt = item.querySelector('img').alt;
      const name = item.querySelector('h3').textContent;
      const description = producto.flatMap(category => category.products).find(product => product.name === name).description;
      const price = parseFloat(item.querySelector('.price').textContent.replace('S/', ''));
      const quantity = parseInt(item.querySelector('.quantity .qty').textContent);
      const totalPrice = price * quantity;

      pedido.push({
          imgSrc,
          imgAlt,
          name,
          description,
          price,
          quantity,
          totalPrice
      });
  });

  if (pedido.length > 0) {
      localStorage.setItem('pedido', JSON.stringify(pedido));
      
      // Redirigir al usuario a la página de pago
      window.location.href = 'service.html';
  } else {
      alert('Por favor, elija productos del menú antes de continuar.');
  }
}
