
let bolsadecompras = [];

let productosGuardados = localStorage.getItem("productosbolsa");
if (productosGuardados) {
    bolsadecompras = JSON.parse(productosGuardados);
}

let carrito = document.getElementById("Productos");

async function cargarProductos() {
    try {
        const response = await fetch('./json/materiales.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        productos(data);
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    } finally {
        console.log('Intento de cargar productos finalizado');
    }
}

function productos(arraydeproductos) {
    arraydeproductos.forEach(materiales => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h4>${materiales.nombre}</h4>
            <img src="${materiales.imagen}">
            <p>Precio: ${materiales.precio}$</p>
            <button class="agregarproducto" id="${materiales.id}">Agregar</button>
        `;
        carrito.appendChild(card);
    });
    agregarAbolsa(arraydeproductos);
}
cargarProductos();


function agregarAbolsa(arraydeproductos) {
    let agregarboton = document.querySelectorAll(".agregarproducto");
    agregarboton.forEach(button => {
        button.onclick = (e) => {
            const productoID = e.currentTarget.id;
            const productoseleccionado = arraydeproductos.find(producto => producto.id == productoID);


            const existeEnCarrito = bolsadecompras.find(producto => producto.id === productoseleccionado.id);

            if (existeEnCarrito) {

                existeEnCarrito.cantidad++;
            } else {

                const productoCarrito = {
                    ...productoseleccionado,
                    idCarrito: Date.now() + productoseleccionado.id,
                    cantidad: 1
                };
                bolsadecompras.push(productoCarrito);
            }

            localStorage.setItem("productosbolsa", JSON.stringify(bolsadecompras));
        };
    });
}