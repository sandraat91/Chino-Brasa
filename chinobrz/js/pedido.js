document.addEventListener('DOMContentLoaded', function() {
    const platosContainer = document.querySelector('.mi-pedido .platos');
    const totalPagarElement = document.querySelector('.total-pagar span');
    const realizarPagoBtn = document.querySelector('.realizar-pago');
    const cancelarPedidoBtn = document.querySelector('.cancelar-pedido');
    const notificacion = document.querySelector('.notificacion');
    const opcionEntregaSelect = document.getElementById('opcionEntrega');
    const opcionesEntregaDiv = document.getElementById('opcionesEntrega');
    const contadorDiv = document.getElementById('contador');
    const tiempoRestanteSpan = document.getElementById('tiempoRestante');
    const confirmacionCancelarDiv = document.getElementById('confirmacionCancelar');
    const confirmarSiBtn = document.getElementById('confirmarSi');
    const confirmarNoBtn = document.getElementById('confirmarNo');
    const overlay = document.getElementById('overlay');

    let total = 0;

    


    // Función para cargar el carrito desde localStorage
    loadCartFromLocalStorage();

    // Mostrar los platos del pedido si existen en localStorage
    function loadCartFromLocalStorage() {
        const platosContainer = document.querySelector('.mi-pedido .platos');
        const totalPagarElement = document.querySelector('.total-pagar span');
        let total = 0;

        const pedido = JSON.parse(localStorage.getItem('pedido'));
        if (pedido && pedido.length > 0) {
            pedido.forEach((item, index) => {
                const platoDiv = document.createElement('div');
                platoDiv.classList.add('plato');
                platoDiv.innerHTML = `
                    <div class="platillos">
                        <img src="${item.imgSrc}" alt="${item.imgAlt}">
                        <div class="descripcion">
                            <h2>PLATO ${String(index + 1).padStart(2, '0')}:</h2>
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                        <span class="precio">S/. ${item.totalPrice.toFixed(2)}</span>
                    </div>
                `;
                platosContainer.appendChild(platoDiv);
                total += item.totalPrice;
            });

            totalPagarElement.textContent = `S/. ${total.toFixed(2)}`;
        }
    }

    // Evento de click en "Hacer Pedido"
    realizarPagoBtn.addEventListener('click', () => {
        opcionesEntregaDiv.style.display = 'block';
    });


    // Evento de cambio en el select de opciones de entrega
    opcionEntregaSelect.addEventListener('change', () => {
        const opcionEntrega = opcionEntregaSelect.value;

        if (opcionEntrega !== 'none') {
            let mensaje = '';

            if (opcionEntrega === 'delivery') {
                mensaje = 'Tu pedido ha sido recibido. En 1 minutos llegará.';
                mostrarMensajeEntrega(mensaje);
                mostrarContador(1 * 60); // Mostrar contador para 1 minuto
            } else if (opcionEntrega === 'recojo') {
                mensaje = 'Tu pedido ha sido recibido. Puedes acercarte al local para recogerlo.';
                mostrarMensajeEntrega(mensaje);
                ocultarContador(); // Ocultar el contador si es recojo
            }

            localStorage.setItem('mensajeEntrega', mensaje);

            setTimeout(() => {
                opcionesEntregaDiv.style.display = 'none';
            }, 10000); // Oculta el div después de 10 segundos
        }
    });

    // Evento de click en "Cancelar Pedido"
    cancelarPedidoBtn.addEventListener('click', () => {
        overlay.style.display = 'block';
        confirmacionCancelarDiv.style.display = 'block';
    });

    // Evento de click en "Sí" del mensaje de confirmación
    confirmarSiBtn.addEventListener('click', () => {
        platosContainer.innerHTML = '';
        totalPagarElement.textContent = 'S/. 0.00';
        localStorage.removeItem('pedido');

        if (localStorage.getItem('mensajeEntrega')) {
            localStorage.removeItem('mensajeEntrega');
            ocultarNotificacion(); // Ocultar la notificación si está visible
        }

        if (localStorage.getItem('tiempoRestante')) {
            localStorage.removeItem('tiempoRestante');
            ocultarContador(); // Ocultar el contador si está visible
        }

        confirmacionCancelarDiv.style.display = 'none';
        overlay.style.display = 'none';
        // Ocultar el botón "Hacer Pedido"
        document.querySelector('.realizar-pago').style.display = 'none';

        // Mostrar el botón "Regresar" después de 2 segundos
        setTimeout(function() {
            document.getElementById('regresar').style.display = 'block';
        }, 2000);
    });

    document.getElementById('regresar').addEventListener('click', function() {
        window.location.href = 'about.html'; // Cambia 'menu.html' a la URL de tu página del menú
    });

    // Evento de click en "No" del mensaje de confirmación
    confirmarNoBtn.addEventListener('click', () => {
        confirmacionCancelarDiv.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Función para ocultar la notificación
    function ocultarNotificacion() {
        notificacion.style.display = 'none';
    }

    // Función para mostrar el mensaje de entrega
    function mostrarMensajeEntrega(mensaje) {
        notificacion.textContent = mensaje;
        notificacion.style.display = 'block';

        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 5000); // Oculta la notificación después de 5 segundos
    }

    // Función para mostrar el contador
    function mostrarContador(segundos) {
        contadorDiv.style.display = 'block';
        const deadline = new Date(new Date().getTime() + segundos * 1000);
        countdown(deadline, 'tiempoRestante', '¡Tu delivery te espera!');
    }

    // Función para ocultar el contador
    function ocultarContador() {
        contadorDiv.style.display = 'none';
    }

    // Funciones de cuenta regresiva
    function getRemainingTime(deadline) {
        let now = new Date(),
            remainTime = (new Date(deadline) - now + 1000) / 1000,
            remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
            remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
            remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
            remainDays = Math.floor(remainTime / (3600 * 24));

        return {
            remainSeconds,
            remainMinutes,
            remainHours,
            remainDays,
            remainTime
        };
    }

    function countdown(deadline, elem, finalMessage) {
        const el = document.getElementById(elem);

        const timerUpdate = setInterval(() => {
            let t = getRemainingTime(deadline);
            el.innerHTML = `${t.remainHours}h:${t.remainMinutes}m:${t.remainSeconds}s`;

            if (t.remainTime <= 1) {
                clearInterval(timerUpdate);
                el.innerHTML = finalMessage;
                setTimeout(() => {
                    contadorDiv.style.display = 'none';
                    localStorage.removeItem('mensajeEntrega');
                    localStorage.removeItem('tiempoRestante');
                }, 7000); // Oculta el contador después de 7 segundos
            }
        }, 1000);
    }
});
