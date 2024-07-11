// Lista de productos "EXCEDENTES"
const excedentes = [
    {
      id: "1",
      image: "images/porcion_chaufa.png",
      alt: "Porción de chaufa",
      name: "Porción de chaufa del día",
      description: "Arroz chaufa con pollo y verduras frescas",
      price: "7.00"
    },
    {
      id: "2",
      image: "images/porcion_papas.png",
      alt: "Porción de papas",
      name: "Porción de papas del día",
      description: "Papas fritas caseras con salsa de la casa",
      price: "6.00"
    },
    {
      id: "3",
      image: "images/lechuga.png",
      alt: "Lechuga",
      name: "Lechuga fresca",
      description: "Lechuga orgánica recién cosechada",
      price: "2.00"
    },
    {
      id: "4",
      image: "images/chicha.png",
      alt: "Chicha",
      name: "Jarra de Chicha del día",
      description: "Refrescante chicha morada casera",
      price: "5.00"
    },
    {
      id: "5",
      image: "images/maracuya.png",
      alt: "Maracuya",
      name: "Jarra de Maracuyá del día",
      description: "Jugo natural de maracuyá con hielo",
      price: "5.00"
    },
    {
      id: "6",
      image: "images/cremas.png",
      alt: "Cremas",
      name: "3 cremas del día a elegir",
      description: "Variedad de cremas caseras para acompañar",
      price: "3.00"
    }
  ];



// Función para activar/desactivar el carrito
function toggleCart() {
    let body = document.body;
    body.classList.toggle('activeTabCart');
}

// EventListener para el icono del carrito
document.getElementById('icon-cart').addEventListener('click', function() {
    toggleCart();
});

// Función para mostrar los productos de excedentes en el HTML
function displayExcedentes() {
    let listProductExcedentes = document.getElementById('listProductExcedentes');
  
    excedentes.forEach(product => {
      let productItem = document.createElement('div');
      productItem.classList.add('item');
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.alt}">
        <div class="details">
          <h3>${product.name}</h3>
          <div class="linea-producto"></div>
          <div class="price">S/${product.price}</div>
          <button class="add-to-cart-btn"
                  data-product-id="${product.id}"
                  data-product-name="${product.name}"
                  data-product-price="${product.price}"
                  data-product-image="${product.image}">Add To Cart</button>
        </div>
      `;
      listProductExcedentes.appendChild(productItem);
    });
  }
  
  // Llamar a las funciones para mostrar productos y cargar el carrito al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    displayExcedentes();
  });
  
    // Manejar eventos de clic en los botones "Add to Cart" y "Vaciar"
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            let productId = event.target.dataset.productId;
            let productName = event.target.dataset.productName;
            let productPrice = parseFloat(event.target.dataset.productPrice);
            let productImage = event.target.dataset.productImage;

            addToCart(productId, productName, productPrice, productImage);
        } else if (event.target.classList.contains('vaciar')) {
            // Manejar el clic en el botón "Vaciar"
            showVaciarNotification();
        } else if (event.target.id === 'confirmVaciar') {
            // Confirmar vaciar el carrito
            vaciarCarrito();
        } else if (event.target.id === 'cancelVaciar' || event.target.classList.contains('close')) {
            // Cancelar vaciar el carrito o cerrar notificación
            hideVaciarNotification();
        }
    });

    // Función para mostrar la notificación de vaciar el carrito
    function showVaciarNotification() {
        document.getElementById('notification').style.display = 'block';
    }

    // Función para ocultar la notificación de vaciar el carrito
    function hideVaciarNotification() {
        document.getElementById('notification').style.display = 'none';
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        let listCartHTML = document.querySelector('.listCart');
        listCartHTML.innerHTML = ''; // Limpiar la lista de productos en el carrito
        updateCartCount(); // Actualizar el contador a cero
        localStorage.removeItem('carrito'); // Limpiar el carrito guardado en localStorage
        hideVaciarNotification(); // Ocultar la notificación después de vaciar el carrito
    }

    // Llamar a las funciones para cargar el carrito al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage(); // Cargar el carrito desde localStorage
    updateCartCount(); // Actualizar el contador de carrito
});

// Función para cargar el carrito desde localStorage al cargar la página
function loadCartFromLocalStorage() {
    let cartItems = JSON.parse(localStorage.getItem('carrito')) || [];

    cartItems.forEach(item => {
        addToCart(item.id, item.name, item.price, item.image);
        let cartItem = document.querySelector(`.cart-item[data-product-id="${item.id}"]`);
        let quantityElement = cartItem.querySelector('.quantity .qty');
        quantityElement.textContent = item.quantity;
        updateProductTotal(cartItem);
    });
}

  // Función para agregar un producto al carrito
function addToCart(productId, productName, productPrice, productImage) {
    // Verificar si el producto ya está en el carrito
    let existingCartItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
  
    if (existingCartItem) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      let quantityElement = existingCartItem.querySelector('.quantity .qty');
      let currentQuantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = currentQuantity + 1;
      updateProductTotal(existingCartItem);
    } else {
      // Si el producto no está en el carrito, agregar uno nuevo
      let cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.dataset.productId = productId;
      cartItem.innerHTML = `
        <img src="${productImage}" alt="${productName}">
        <h3>${productName}</h3>
        <div class="price">S/${productPrice.toFixed(2)}</div>
        <div class="quantity">
          <button class="minus">-</button>
          <span class="qty">1</span>
          <button class="plus">+</button>
        </div>
      `;
      
      // Agregar eventos de incremento y decremento de cantidad
      cartItem.querySelector('.plus').addEventListener('click', incrementQuantity);
      cartItem.querySelector('.minus').addEventListener('click', decrementQuantity);
  
      // Agregar el nuevo elemento al carrito
      let listCart = document.querySelector('.listCart');
      listCart.appendChild(cartItem);
    }
  
    // Actualizar el contador de ítems en el carrito
    updateCartCount();
     // Guardar en localStorage
     saveCartToLocalStorage();
  }
  
  // Función para incrementar la cantidad de un producto
  function incrementQuantity(event) {
    let quantityElement = event.target.parentElement.querySelector('.qty');
    let currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
    updateProductTotal(event.target.closest('.cart-item'));
  }
  
  // Función para decrementar la cantidad de un producto
  function decrementQuantity(event) {
    let quantityElement = event.target.parentElement.querySelector('.qty');
    let currentQuantity = parseInt(quantityElement.textContent);
    
    if (currentQuantity > 1) {
      quantityElement.textContent = currentQuantity - 1;
      updateProductTotal(event.target.closest('.cart-item'));
    } else {
      // Si la cantidad es 1, eliminar el producto del carrito
      let cartItem = event.target.closest('.cart-item');
      cartItem.remove();
      updateCartCount(); // Actualizar el contador
    }
  }
  
  // Función para actualizar el precio total de un producto basado en la cantidad
  function updateProductTotal(cartItem) {
    let price = parseFloat(cartItem.querySelector('.price').textContent.replace('S/', ''));
    let quantity = parseInt(cartItem.querySelector('.quantity .qty').textContent);
    let totalPriceElement = cartItem.querySelector('.price');
    totalPriceElement.textContent = `S/${(price * quantity).toFixed(2)}`;
    // Guardar en localStorage después de actualizar el precio total
    saveCartToLocalStorage();
  }
  
  // Función para actualizar el contador del carrito
  function updateCartCount() {
    const cartCount = document.getElementById('icon-cart-count');
    let count = document.querySelectorAll('.cart-item').length;
    cartCount.textContent = count;
    // Guardar en localStorage después de actualizar el precio total
    saveCartToLocalStorage();
  }

  // Función para guardar el carrito en localStorage
function saveCartToLocalStorage() {
    let cartItems = document.querySelectorAll('.cart-item');
    let cart = [];

    cartItems.forEach(item => {
        let productId = item.dataset.productId;
        let productName = item.querySelector('h3').textContent;
        let productPrice = parseFloat(item.querySelector('.price').textContent.replace('S/', ''));
        let productImage = item.querySelector('img').getAttribute('src');
        let quantity = parseInt(item.querySelector('.quantity .qty').textContent);

        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        });
    });

    localStorage.setItem('carrito', JSON.stringify(cart));
}

// Función para cargar el carrito desde localStorage al cargar la página
function loadCartFromLocalStorage() {
    let cartItems = JSON.parse(localStorage.getItem('carrito')) || [];

    cartItems.forEach(item => {
        addToCart(item.id, item.name, item.price, item.image);
        let cartItem = document.querySelector(`.cart-item[data-product-id="${item.id}"]`);
        let quantityElement = cartItem.querySelector('.quantity .qty');
        quantityElement.textContent = item.quantity;
        updateProductTotal(cartItem);
    });
}

  // Función para redireccionar al proceso de pago
function direccionar() {
    window.location.href = 'service.html'; // Cambiar a la URL adecuada según tu estructura de archivos
  }

  