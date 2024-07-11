// Seleccionar elementos del DOM relevantes
let iconCartSpan = document.querySelector('.icon-cart span');
let listCartHTML = document.querySelector('.listCart');

// Arreglo para almacenar los productos agregados al carrito
let carts = [];

// Datos de los productos organizados por categoría
const producto = [
  {
    "id": "promociones",
    "products": [
      {
        "id": "1",
        "image": "images/promocion01.png",
        "alt": "Producto 1",
        "name": "Chicken Real",
        "description": "2 Pollos entero + papas fritas + ensalada fresca + cremas + gaseosa 1.5L",
        "price": "20.00", // Convertido a número para facilitar cálculos
      },
      {
        "id": "2",
        "image": "images/cargandopromocion.png",
        "alt": "Producto 2",
        "name": "Aún no tenemos más promociones :c",
        "description": "",
        "price": "0.00"
      },
      {
        "id": "3",
        "image": "images/cargandopromocion.png",
        "alt": "Producto 3",
        "name": "Aún no tenemos más promociones :c",
        "description": "",
        "price": "0.00"
      }
    ]
  },
  {
    "id": "combos",
    "products": [
      {
        "id": "4",
        "image": "images/combos03.png",
        "alt": "Producto 1",
        "name": "1 Pollo a la brasa + Chaufa",
        "description": "Porción de papas fritas + ensalada fresca + cremas + gaseosa de 1.5 L",
        "price": "49.00"
      },
      {
        "id": "5",
        "image": "images/combos02.png",
        "alt": "Producto 2",
        "name": "1 Pollo a la brasa + 1/4",
        "description": "Porción de papas fritas + ensalada fresca + cremas + gaseosa de 1.5 L",
        "price": "43.50",
      },
      {
        "id": "6",
        "image": "images/combos01.png",
        "alt": "Producto 3",
        "name": "1 Pollo a la brasa + 1/2",
        "description": "Porción de papas fritas + ensalada fresca + cremas + gaseosa de 1.5 L",
        "price": "64.50",
      }
    ]
  },
  {
    "id": "mostros",
    "products": [
      {
        "id": "7",
        "image": "images/mostros01.png",
        "alt": "Producto 1",
        "name": "Mostrito",
        "description": "1/8 de pollo a la brasa + porción de papas fritas + porción de chaufa + ensalada fresca + cremas + gaseosa de 350 ml",
        "price": "10.50"
      },
      {
        "id": "8",
        "image": "images/mostros02.png",
        "alt": "Producto 2",
        "name": "Mostrazo",
        "description": "1/4 de pollo a la brasa + porción de papas fritas + porción de chaufa + ensalada fresca + cremas",
        "price": "14.00"
      },
      {
        "id": "9",
        "image": "images/mostros03.png",
        "alt": "Producto 3",
        "name": "Mostrazo + Gaseosa",
        "description": "1/4 de pollo a la brasa + porción de papas fritas + porción de chaufa + ensalada fresca + cremas + gaseosa de 350 ml",
        "price": "15.50"
      }
    ]
  },
  {
    "id": "clasicos",
    "products": [
      {
        "id": "10",
        "image": "images/clasicos01.png",
        "alt": "Producto 1",
        "name": "1/4 pollo a la brasa",
        "description": "Porción de papas fritas + ensalada fresca + cremas",
        "price": "10.50"
      },
      {
        "id": "11",
        "image": "images/clasicos02.png",
        "alt": "Producto 2",
        "name": "1/2 pollo a la brasa",
        "description": "Porción de papas fritas + ensalada fresca + cremas",
        "price": "21.00"
      },
      {
        "id": "12",
        "image": "images/clasicos03.png",
        "alt": "Producto 3",
        "name": "1 pollo a la brasa",
        "description": "Porción de papas fritas + ensalada fresca + cremas + gaseosa de 1.5 L",
        "price": "43.50"
      }
    ]
  },
  {
    "id": "bebidas",
    "products": [
      {
        "id": "13",
        "image": "images/InkaCola1.5.png",
        "alt": "Producto 1",
        "name": "Inca Kola",
        "description": "Inca Kola de 1.5L",
        "price": "8.50"
      },
      {
        "id": "14",
        "image": "images/bebida03.png",
        "alt": "Producto 2",
        "name": "Agua Cielo",
        "description": "Agua Cielo 625ml",
        "price": "1.50"
      },
      {
        "id": "15",
        "image": "images/bebida02.png",
        "alt": "Producto 3",
        "name": "Pepsi",
        "description": "Pepsi 1.5L",
        "price": "5.00"
      }
    ]
  },
  {
    "id": "extras",
    "products": [
      {
        "id": "16",
        "image": "images/extra01.png",
        "alt": "Producto 1",
        "name": "Chaufa",
        "description": "Porción de papas fritas mediana",
        "price": "8.50"
      },
      {
        "id": "17",
        "image": "images/extra02.png",
        "alt": "Producto 2",
        "name": "Ensalada",
        "description": "Porción de chaufa familiar",
        "price": "11.00"
      },
      {
        "id": "18",
        "image": "images/extra03.png",
        "alt": "Producto 3",
        "name": "Papas Fritas",
        "description": "Porción de ensalada fresca mediana",
        "price": "3.00"
      }
    ]
  }
]; 



// Función para agregar datos al HTML
const addDataToHTML = () => {
  producto.forEach(category => {
    const categoryContainer = document.getElementById(`listProduct${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`);
    if (categoryContainer) {
      categoryContainer.innerHTML = ""; // Limpiar cualquier contenido existente
      category.products.forEach(product => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = product.id;
        newItem.innerHTML = `
          <img src="${product.image}" alt="${product.alt}">
          <h3>${product.name}</h3>
          <div class="price">S/${product.price}</div>
          <div class="linea-producto"></div>
          <button class="addCart">Add to Cart</button>
        `;
        categoryContainer.appendChild(newItem);
      });
    }
  });
};

// Manejar eventos de clic en los botones "Add to Cart"
producto.forEach(category => {
  const categoryContainer = document.getElementById(`listProduct${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`);
  categoryContainer.addEventListener('click', (event) => {
    let clickedElement = event.target;
    if (clickedElement.classList.contains('addCart')) {
      let productId = clickedElement.parentElement.dataset.id;
      addToCart(productId);
    }
  });
});

// Función para agregar un producto al carrito
function addToCart(productId) {
  // Encontrar el producto en la estructura de datos
  let productToAdd = null;
  for (let category of producto) {
    productToAdd = category.products.find(product => product.id === productId);
    if (productToAdd) {
      break;
    }
  }

  if (productToAdd) {
    // Verificar si el producto ya está en el carrito
    let existingCartItem = listCartHTML.querySelector(`.cart-item[data-id="${productToAdd.id}"]`);

    if (existingCartItem) {
      // Incrementar la cantidad si el producto ya está en el carrito
      let quantityElement = existingCartItem.querySelector('.quantity .qty');
      quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
      updateProductTotal(existingCartItem);
    } else {
      // Agregar el producto al carrito si no está presente
      const newItem = document.createElement('div');
      newItem.classList.add('cart-item');
      newItem.dataset.id = productToAdd.id;
      newItem.dataset.price = productToAdd.price;
      newItem.innerHTML = `
        <img src="${productToAdd.image}" alt="${productToAdd.alt}">
        <h3>${productToAdd.name}</h3>
        <div class="price">S/${parseFloat(productToAdd.price).toFixed(2)}</div>
        <div class="quantity">
          <button class="minus">-</button>
          <span class="qty">1</span>
          <button class="plus">+</button>
        </div>
      `;

      // Agregar el nuevo elemento al carrito
      listCartHTML.appendChild(newItem);

      // Agregar eventos de incremento y decremento
      newItem.querySelector('.plus').addEventListener('click', incrementQuantity);
      newItem.querySelector('.minus').addEventListener('click', decrementQuantity);
    }

    saveCartToLocalStorage(); // Guardar el carrito actualizado en LocalStorage
    updateCartCount(); // Actualizar contador de ítems en el carrito
    showCart(); // Mostrar el carrito después de agregar un producto
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', listCartHTML.innerHTML);
}

// Función para cargar el carrito desde localStorage
function loadCartFromLocalStorage() {
  let cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
    listCartHTML.innerHTML = cartItems;

    // Vincular eventos de incremento y decremento
    let plusButtons = listCartHTML.querySelectorAll('.plus');
    let minusButtons = listCartHTML.querySelectorAll('.minus');
    plusButtons.forEach(button => {
      button.addEventListener('click', incrementQuantity);
    });
    minusButtons.forEach(button => {
      button.addEventListener('click', decrementQuantity);
    });

    updateCartCount(); // Actualizar contador de ítems en el carrito
  }
}

// Llamar a loadCartFromLocalStorage cuando la página se cargue para cargar el carrito guardado
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromLocalStorage();
});


// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
  const listCartItems = document.querySelectorAll('.cart-item');
  const carrito = [];

  listCartItems.forEach(item => {
      const imgSrc = item.querySelector('img').src;
      const imgAlt = item.querySelector('img').alt;
      const name = item.querySelector('h3').textContent;
      const price = parseFloat(item.dataset.price);
      const quantity = parseInt(item.querySelector('.quantity .qty').textContent);

      carrito.push({
          id: item.dataset.id,
          imgSrc,
          imgAlt,
          name,
          price,
          quantity
      });
  });

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para incrementar la cantidad de un producto
function incrementQuantity(event) {
  let quantityElement = event.target.previousElementSibling;
  let currentQuantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = currentQuantity + 1;

  updateProductTotal(event.target.closest('.cart-item'));
  guardarCarritoEnLocalStorage(); // Actualizar localStorage después de cambiar la cantidad
}

// Función para decrementar la cantidad de un producto
function decrementQuantity(event) {
  let quantityElement = event.target.nextElementSibling;
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

  saveCartToLocalStorage(); // Actualizar localStorage después de cambiar la cantidad
}


// Función para actualizar el precio total de un producto basado en la cantidad
function updateProductTotal(cartItem) {
  let price = parseFloat(cartItem.dataset.price);
  let quantity = parseInt(cartItem.querySelector('.quantity .qty').textContent);
  let totalPriceElement = cartItem.querySelector('.price');
  totalPriceElement.textContent = `S/${(price * quantity).toFixed(2)}`;
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cartCount = document.getElementById('icon-cart-count');
  let count = document.querySelectorAll('.cart-item').length;
  cartCount.textContent = count;
}

// Función para mostrar el carrito
function showCart() {
  const cartTab = document.querySelector('.cartTab');
  cartTab.style.display = 'block';
}

// Función para ocultar el carrito
function hideCart() {
  const cartTab = document.querySelector('.cartTab');
  cartTab.style.display = 'none';
}

// Función para vaciar el carrito
function vaciar() {
  listCartHTML.innerHTML = ''; // Limpiar la lista de productos en el carrito
  updateCartCount(); // Actualizar el contador a cero
}


// Inicializar la carga de datos al HTML
addDataToHTML();
