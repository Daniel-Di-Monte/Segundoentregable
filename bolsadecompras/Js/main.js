const materiales= [
{
id:1,
nombre:"Botella porron",
precio: 500,
imagen:"./img/primer-plano-botella-cerveza-mano_23-2147919797.jpg"
},
{
id:2,
nombre:"Barril",
precio: 2000,
imagen:"./img/barriles-cerveza-barril-aluminio_1398-2209.jpg"
},
{
id:3,
nombre:"Chopera",
precio:10000,
imagen:"./img/cerveza-barril-filtrada_140725-80.jpg"
},
{
id:4,
nombre:"Lata",
precio:200,
imagen:"./img/markus-spiske-GWWDglyNTik-unsplash.jpg"
}
]

let bolsadecompras= []

let carrito= document.getElementById("Productos")

function productos (arraydeproductos) {
    arraydeproductos.forEach(materiales => {
        const card = document.createElement("div")
        card.innerHTML=`<h4>${materiales.nombre}<h4>
        <img src=${materiales.imagen}>
        <p>Precio:${materiales.precio}$</p>
        <button class="agregarproducto" id="${materiales.id}"> Agregar </button>`
        carrito.appendChild(card)
    });
    agregarAbolsa();
}

productos(materiales)

function agregarAbolsa () {
    agregarboton=document.querySelectorAll(".agregarproducto")
    agregarboton.forEach(button =>{
        button.onclick = (e) => {
            const productoID= e.currentTarget.id
            const productoseleccionado=materiales.find(producto=>producto.id == productoID)
            const productoCarrito = {
                ...productoseleccionado,
                idCarrito: Date.now() + productoseleccionado.id
            }
            bolsadecompras.push(productoCarrito)
            console.log(bolsadecompras)

            localStorage.setItem("productosbolsa", JSON.stringify(bolsadecompras))
        }
    })
}