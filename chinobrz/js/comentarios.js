// Función para cargar los comentarios desde el servidor
function cargarComentarios() {
    fetch('obtener_comentarios.php')
      .then(response => response.json())
      .then(comentarios => {
        let commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = ""; // Limpiar contenido anterior
  
        if (comentarios.length === 0) {
          commentsContainer.innerHTML = "<p>No hay comentarios aún.</p>";
        } else {
          comentarios.forEach(comentario => {
            let commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
              <div class="nombre-usuario">${comentario.nombre_usuario}</div>
              <div class="texto-comentario">${comentario.comentario}</div>
              <div class="fecha-comentario">${comentario.fecha}</div>
            `;
            commentsContainer.appendChild(commentDiv);
          });
        }
      })
      .catch(error => console.error('Error al cargar comentarios:', error));
  }
  
  // Cargar los comentarios cuando la página se cargue
  document.addEventListener('DOMContentLoaded', cargarComentarios);
  
// Manejar el evento de envío del comentario
document.getElementById('submit-button').addEventListener('click', () => {
    const nameInput = document.getElementById('nombre');
    const commentInput = document.getElementById('comment-input');
    const userName = nameInput.value.trim();
    const commentText = commentInput.value.trim();
    if (userName && commentText) {
        const formData = new FormData();
        formData.append('nombreUsuario', userName);
        formData.append('comentario', commentText);

        fetch('guardar_comentario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Mostrar mensaje de éxito o error
            if (data.success) {
                const date = new Date().toLocaleString();
                const comments = JSON.parse(localStorage.getItem('comments')) || [];
                comments.push({ name: userName, text: commentText, date: date });
                localStorage.setItem('comments', JSON.stringify(comments));

                addCommentToDOM(userName, commentText, date, comments.length - 1);

                nameInput.value = '';
                commentInput.value = '';
            }
        })
        .catch(error => console.error('Error al guardar comentario:', error));
    } else {
        alert("Por favor, ingresa tu nombre y escribe un comentario.");
    }
});

// Escucha el evento al presionar Enter en el textarea
document.getElementById('comment-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita que se agregue una nueva línea al presionar Enter

        // Captura el comentario y verifica que no esté vacío
        let comment = this.value.trim();
        if (comment !== '') {
            // Obtener la fecha y hora actual
            let currentDate = new Date();
            let formattedDate = currentDate.toLocaleString();

            // Guardar el comentario en el LocalStorage
            let comments = JSON.parse(localStorage.getItem('comments')) || [];
            let newComment = { comentario: comment, fecha: formattedDate };
            comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(comments));

            // Añadir el comentario a la interfaz
            let newCommentHTML = `
                <div class="comment">
                    <div class="user-info">
                        <span class="user-icon">Icono de usuario</span>
                        <span class="user-name">Nombre de usuario</span>
                        <span class="comment-date">${formattedDate}</span>
                    </div>
                    <div class="comment-text">${comment}</div>
                </div>
            `;
            document.getElementById('comment-section').insertAdjacentHTML('beforeend', newCommentHTML);

            // Limpiar el textarea después de agregar el comentario
            this.value = '';
        }
    }
});