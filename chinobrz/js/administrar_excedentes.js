// Obtener referencia al contenedor de excedentes
const excessContainer = document.querySelector('.excess-preview');

// Obtener referencia al formulario y a los campos del formulario
const excessForm = document.getElementById('excess-form');
const excessNameInput = document.getElementById('excess-name');
const excessDescriptionInput = document.getElementById('excess-description');
const excessPriceInput = document.getElementById('excess-price');
const excessImageInput = document.getElementById('excess-image');
const excessPreviewImage = document.getElementById('excess-preview-image');
const excessPreviewName = document.getElementById('excess-preview-name');
const excessPreviewDescription = document.getElementById('excess-preview-description');

// Función para mostrar la vista previa de la imagen de excedente
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        excessPreviewImage.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Función para actualizar la vista previa de los detalles del excedente
function updatePreview() {
    excessPreviewName.textContent = excessNameInput.value || 'Nombre';
    excessPreviewDescription.textContent = excessDescriptionInput.value || 'Descripción';
}

// Event listener para el envío del formulario de excedentes
excessForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los valores de los campos del formulario
    const excessName = excessNameInput.value;
    const excessDescription = excessDescriptionInput.value;
    const excessPrice = excessPriceInput.value;
    const excessImage = excessImageInput.files[0];

    if (excessImage) {
        const reader = new FileReader();
        reader.onload = function() {
            // Crear un nuevo elemento div para mostrar el excedente
            const newExcess = document.createElement('div');
            newExcess.classList.add('excess-item');

            // Construir el HTML del nuevo excedente
            newExcess.innerHTML = `
                <img src="${reader.result}" alt="${excessName}">
                <div class="excess-details">
                    <h3>${excessName || 'Nombre'}</h3>
                    <p>${excessDescription || 'Descripción'}</p>
                    <p>Precio: $${excessPrice || '0.00'}</p>
                </div>
            `;

            // Agregar el nuevo excedente al contenedor de excedentes
            excessContainer.appendChild(newExcess);

            // Limpiar el formulario después de agregar el excedente
            excessForm.reset();
            excessPreviewImage.src = ''; // Restaurar la imagen predeterminada
            updatePreview(); // Actualizar la vista previa de los detalles
        };
        reader.readAsDataURL(excessImage);
    } else {
        alert('Por favor, selecciona una imagen para el excedente.');
    }
});

// Event listener para la vista previa de la imagen de excedente
excessImageInput.addEventListener('change', previewImage);

// Función para buscar excedente por ID (simulada)
document.getElementById('search-excess-btn').addEventListener('click', function() {
    const searchId = document.getElementById('search-excess-id').value;
    // Aquí puedes implementar la lógica de búsqueda por ID
    alert(`Buscar excedente con ID: ${searchId}`);
});

// Función para editar excedente (simulada)
document.getElementById('edit-excess-btn').addEventListener('click', function() {
    // Aquí puedes implementar la lógica para editar excedentes
    alert('Editar excedente');
});

// Función para eliminar excedente (simulada)
document.getElementById('delete-excess-btn').addEventListener('click', function() {
    // Aquí puedes implementar la lógica para eliminar excedentes
    alert('Eliminar excedente');
});
