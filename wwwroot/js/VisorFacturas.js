document.addEventListener(
  "DOMContentLoaded",
  function () {
    CargarClientes();
    CargarFacturas();
    SeleccionInicio();

    //   AgregarProducto();
  },
  false
);

let datosFacturaSeleccionada;

/*Seccion seleccion Busqueda*/

const radio1 = document.getElementById("radioCliente");
const radio2 = document.getElementById("radioNumFactura");
var selctCliente = document.getElementById("cliente");
var inputCliente = document.getElementById("inputFactura");

function SeleccionInicio() {
  const radio1 = document.getElementById("radioCliente");
  const radio2 = document.getElementById("radioNumFactura");
  var selctCliente = document.getElementById("cliente");
  var inputCliente = document.getElementById("inputFactura");
  radio1.checked = true;
  radio2.checked = false;
  inputCliente.disabled = true;
}

function reset() {
  const tabla = document.getElementById("TablaFacturas");
  while (tabla.rows.length > 0) {
    tabla.deleteRow(1);
  }
}
radio1.addEventListener("change", function () {
  if (radio1.checked) {
    selctCliente.disabled = false; // Habilita el primer elemento
    inputCliente.disabled = true; // Deshabilita el segundo elemento
    reset();
  }
});

radio2.addEventListener("change", function () {
  if (radio2.checked) {
    selctCliente.disabled = true; // Deshabilita el primer elemento
    inputCliente.disabled = false; // Habilita el segundo elemento
    reset();
  }
});

/*Seccion Clientes */
function CargarClientes() {
  fetch("/Home/ConsultaClientes")
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((responseJson) => {
      if (responseJson.length > 0) {
        const select = document.getElementById("cliente");
        const opcionVacia = document.createElement("option");
        opcionVacia.value = ""; // Establece el valor vacío
        opcionVacia.textContent = "Seleccionar una opción";
        select.appendChild(opcionVacia);

        responseJson.forEach((element) => {
          const cliente = document.createElement("option");
          cliente.value = element.id;
          cliente.textContent = element.razonSocial;
          select.appendChild(cliente);
        });

        datos = responseJson;
        select.addEventListener("change", CambioCliente());
      }
    });
}

function CambioCliente() {
  return (event) => {
    selector = event.target;
    const opcionSeleccionada = selector.value;
    const datosElemento = datos.find(
      (element) => element.id === parseInt(opcionSeleccionada)
    );

    cargarSeleccion(datosElemento.id);
  };
}

/*Seccion Facturas*/
function CargarFacturas() {
  fetch("/Home/ConsultaFacturas")
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((responseJson) => {
      if (responseJson.length > 0) {
        datosFacturaSeleccionada = responseJson;
      }
    });
}

const Buscar = document.getElementById("buscarFactura");
Buscar.addEventListener("click", BuscarFactura);

function BuscarFactura() {
  const tabla = document.getElementById("TablaFacturas");
  const numeroFacturaI = document.getElementById("inputFactura");
  const numeroFactura = numeroFacturaI.value;
  datosFacturaSeleccionada.forEach((element) => {
    if (element.numeroFactura === parseInt(numeroFactura)) {
      console.log(element);
      const FilaNueva = tabla.querySelector("tbody").insertRow();
      const nuevoID = Math.floor(Math.random() * 1000);
      FilaNueva.id = `fila-${nuevoID}`; //generar Id de la fila

      const numeroFactura = FilaNueva.insertCell();
      numeroFactura.id = `numeroFactura-${nuevoID}`;
      const numeroFacturaH = document.createElement("h1");
      numeroFacturaH.textContent = element.numeroFactura;
      numeroFactura.appendChild(numeroFacturaH);

      const fechaEmicion = FilaNueva.insertCell();
      fechaEmicion.id = `fechaEmicion-${nuevoID}`;
      const fechaEmicionH = document.createElement("h1");
      fechaEmicionH.textContent = element.fechaEmisionFactura;
      fechaEmicion.appendChild(fechaEmicionH);

      const TotalFacturado = FilaNueva.insertCell();
      TotalFacturado.id = `TotalFacturado-${nuevoID}`;
      const TotalFacturadoH = document.createElement("h1");
      TotalFacturadoH.textContent = element.subtotalFactura;
      TotalFacturado.appendChild(TotalFacturadoH);
    }
  });
}

function cargarSeleccion(idCliente) {
  const tabla = document.getElementById("TablaFacturas");

  datosFacturaSeleccionada.forEach((element) => {
    if (parseInt(element.idCliente) === parseInt(idCliente)) {
      console.log(element);
      const FilaNueva = tabla.querySelector("tbody").insertRow();
      const nuevoID = Math.floor(Math.random() * 1000);
      FilaNueva.id = `fila-${nuevoID}`; //generar Id de la fila

      const numeroFactura = FilaNueva.insertCell();
      numeroFactura.id = `numeroFactura-${nuevoID}`;
      const numeroFacturaH = document.createElement("h1");
      numeroFacturaH.textContent = element.numeroFactura;
      numeroFactura.appendChild(numeroFacturaH);

      const fechaEmicion = FilaNueva.insertCell();
      fechaEmicion.id = `fechaEmicion-${nuevoID}`;
      const fechaEmicionH = document.createElement("h1");
      fechaEmicionH.textContent = element.fechaEmisionFactura;
      fechaEmicion.appendChild(fechaEmicionH);

      const TotalFacturado = FilaNueva.insertCell();
      TotalFacturado.id = `TotalFacturado-${nuevoID}`;
      const TotalFacturadoH = document.createElement("h1");
      TotalFacturadoH.textContent = element.subtotalFactura;
      TotalFacturado.appendChild(TotalFacturadoH);
    }
  });

  const FilaNueva = tabla.querySelector("tbody").insertRow();
  const nuevoID = Math.floor(Math.random() * 1000);
  FilaNueva.id = `fila-${nuevoID}`; //generar Id de la fila

  const numeroFactura = FilaNueva.insertCell();
  numeroFactura.id = `numeroFactura-${nuevoID}`;

  const fechaEmicion = FilaNueva.insertCell();
  fechaEmicion.id = `fechaEmicion-${nuevoID}`;

  const TotalFacturado = FilaNueva.insertCell();
  TotalFacturado.id = `TotalFacturado-${nuevoID}`;
}
