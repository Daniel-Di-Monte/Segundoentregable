let bolsadecompras = document.getElementById("bolsadeproductos");
let totalElement = document.getElementById("Total");

function renderbolsa(itemsbolsa) {
    bolsadecompras.innerHTML = '';
    let total = 0;
    const productosConCantidad = {};

    itemsbolsa.forEach(producto => {
        if (productosConCantidad[producto.idCarrito]) {
            productosConCantidad[producto.idCarrito].cantidad++;
        } else {
            productosConCantidad[producto.idCarrito] = {
                ...producto,
                cantidad: producto.cantidad || 1 
            };
        }
    });

    Object.values(productosConCantidad).forEach(producto => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio} x ${producto.cantidad}</p>
            <div class="cantidad-controles">
                <button class="disminuir">-</button>
                <span class="cantidad">${producto.cantidad}</span>
                <button class="aumentar">+</button>
                <button class="eliminar">Eliminar</button>
            </div>
        `;
        bolsadecompras.appendChild(card);

        total += producto.precio * producto.cantidad;


        const btnDisminuir = card.querySelector('.disminuir');
        const btnAumentar = card.querySelector('.aumentar');
        const spanCantidad = card.querySelector('.cantidad');
        const btnEliminar = card.querySelector('.eliminar');

        btnDisminuir.addEventListener('click', () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
                spanCantidad.textContent = producto.cantidad;
                actualizarTotalYLocalStorage();
            } else {
                eliminarProducto(producto.idCarrito);
            }
        });

        btnAumentar.addEventListener('click', () => {
            producto.cantidad++;
            spanCantidad.textContent = producto.cantidad;
            actualizarTotalYLocalStorage();
        });

        btnEliminar.addEventListener('click', () => {
            eliminarProducto(producto.idCarrito);
        });
    });

    actualizarTotalYLocalStorage();

    function actualizarTotalYLocalStorage() {
        total = 0;
        itemsbolsa = Object.values(productosConCantidad);
        itemsbolsa.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        totalElement.textContent = `Total: $${total}`;
        localStorage.setItem("productosbolsa", JSON.stringify(itemsbolsa));
        mostrarResumen(itemsbolsa, total);
    }

    function mostrarResumen(itemsbolsa, total) {
        const resumenElement = document.getElementById("resumen-carrito");
        if (itemsbolsa.length === 0) {
            resumenElement.textContent = "No hay productos en el carrito.";
        } else {
            const itemsNombres = itemsbolsa.map(producto => `${producto.nombre} (x${producto.cantidad})`).join(', ');
            resumenElement.textContent = `Items en el carrito: ${itemsNombres}. Costo total: $${total}.`;
        }
    }


    function eliminarProducto(idProducto) {
        itemsbolsa = itemsbolsa.filter(producto => producto.idCarrito != idProducto);
        localStorage.setItem("productosbolsa", JSON.stringify(itemsbolsa));
        renderbolsa(itemsbolsa);
    }
}


let bolsaguardados = localStorage.getItem("productosbolsa");
if (!bolsaguardados) {
    bolsaguardados = [];
} else {
    bolsaguardados = JSON.parse(bolsaguardados);
}
renderbolsa(bolsaguardados);

