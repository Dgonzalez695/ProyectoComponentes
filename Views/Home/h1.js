document
  .getElementById("AgregarProducto")
  .addEventListener("click", function () {
    var tabla = document.getElementById("TablaProductos");
    var bodyTabla = tabla.tBodies[0];
    var Fila = bodyTabla.rows[bodyTabla.rows.length - 1];

    var FilaClonada = Fila.cloneNode(true);
    // var ultimaFila = bodyTabla.rows[bodyTabla.rows.length - 1];
    // tabla.rows[tabla.rows.length].cell.innerHTML = '';
    var selectFila = FilaClonada.cells[0].querySelector("select");
    selectFila.selectedIndex = -1;
    bodyTabla.appendChild(FilaClonada);

    for (var i = 1; i < FilaClonada.cells.length; i++) {
      FilaClonada.cells[i].innerHTML = "";
    }
    // var cell1 = newRow.insertCell(0);
    //     var cell2 = newRow.insertCell(1);
    // cell1.innerHTML = 'Nuevo valor 1';
    // cell2.innerHTML = 'Nuevo valor 2';
  });

document
  .getElementById("pruebaSelect")
  .addEventListener("click", function CreacionFactura() {
    fetch("/Home/ConsultaDatos").then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la solicitud.");
      }
      return response.json();

      // response.ok ? response.json : Promise.reject(response);
    }).catch(error => { console.error('error en la solicitud',error)})
    // .then((responseJson) => {
    //   if (responseJson.length > 0) {
    //     console.log(responseJson.length);
    //   }
    // });
  });

// document.addEventListener("DOMContentLoaded", function () {}, false);
