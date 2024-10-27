

$(document).ready(function() {
    $("#botonenviar").click(function() {
        Swal.fire({
            title: '¿Esta correcta su compra?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('¡Compra confirmada!', '', 'Guardado')
            } else if (result.isDenied) {
              Swal.fire('Compra cancelada', '', 'Intente nuevamente')
            }
          })
      });
    });