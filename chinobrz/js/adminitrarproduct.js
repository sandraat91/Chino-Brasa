// Obtener referencia al contenedor de productos
const productContainer = document.querySelector('.product-preview');

// Obtener referencia al formulario y a los campos del formulario
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productDescriptionInput = document.getElementById('product-description');
const productPriceInput = document.getElementById('product-price');
const productImageInput = document.getElementById('product-image');

// Event listener para el envío del formulario
productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const productName = productNameInput.value;
    const productDescription = productDescriptionInput.value;
    const productPrice = productPriceInput.value;
    const productImage = productImageInput.files[0];

    if (productImage) {
        const reader = new FileReader();
        reader.onload = function() {
            // Crear un nuevo elemento div para mostrar el producto
            const newProduct = document.createElement('div');
            newProduct.classList.add('product-item');

            // Construir el HTML del nuevo producto
            newProduct.innerHTML = `
                <img src="${reader.result}" alt="${productName}">
                <h3>${productName || 'Nombre'}</h3>
                <p>${productDescription || 'Descripción'}</p>
                <p>Precio: $${productPrice || '0.00'}</p>
            `;

            // Agregar el nuevo producto al contenedor de productos
            productContainer.appendChild(newProduct);

            // Limpiar el formulario después de agregar el producto
            productForm.reset();
        };
        reader.readAsDataURL(productImage);
    } else {
        alert('Por favor, selecciona una imagen para el producto.');
    }
});
