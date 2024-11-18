$(document).ready(function() {
  $(".formulario").submit(function(event) {
      event.preventDefault();

      const apellido = $('#apellido').val();
      const nombre = $('#nombre').val();
      const edad = $('#edad').val();
      const direccion = $('#direccion').val();
      const formaPago = $('#forma_pago').val();

      if (!apellido || !nombre || !edad || !direccion || !formaPago) {
          Swal.fire('Por favor, complete todos los campos del formulario.');
          return;
      }

      Swal.fire({
          title: '¿Está correcta su compra?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sí',
          denyButtonText: 'No',
          customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
          },
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire('¡Compra confirmada!', '', 'success')
                  .then(() => {
                      vaciarCarrito();
                  });
          } else if (result.isDenied) {
              Swal.fire('Compra cancelada', '', 'info');
          }
      });
  });

  function vaciarCarrito() {
      localStorage.removeItem("productosbolsa");
      $('#bolsadeproductos').empty();
      $('#Total').text('Total: $0');
      
      renderbolsa([]); 
  }
});