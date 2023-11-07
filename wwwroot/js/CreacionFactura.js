
document.addEventListener(
    "DOMContentLoaded",
    function () {
      CargarClientes();
  
      AgregarProducto();
    },
    false
  );
  
  var _modeloFactura={
  fechaEmicion:null,
  // idCliente:  null,
  // nuneroFactura:  null,
  // numeroTotalArticulos:  null,
  // subtotalFactura:  null,
  // totalImpuestos:  null,
  // totalFactura: null
  };
  
  let cantidadEntrega = 0;
  
  const _modeloCliente = {
    idCliente: 0,
    RazonSocial: "",
  };
  let datos;
  
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
          // datosDelElementoSeleccionado = responseJson;
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
      // const _modeloCliente = {};
      _modeloCliente.idCliente = parseInt(datosElemento.id);
      _modeloCliente.RazonSocial = datosElemento.razonSocial;
      console.log(_modeloCliente);
    };
  }
  /**
   * ***************************************************************************************************************************************************
   */
  
  let datosDelElementoSeleccionado;
  const _modeloSelect = {
    idSelect: "",
    idPrecioU: "",
    idCantidad: "",
    idImagen: "",
    idtotales: "",
  };
  /*BOTONES*/
  const botonAg = document.getElementById("agregarProduto");
  botonAg.addEventListener("click", AgregarProducto);
  
  const NuevaFactura = document.getElementById("NuevoFac");
  NuevaFactura.addEventListener("click", reset);
  
  const GuardarFactura = document.getElementById("guardarFactura");
  GuardarFactura.addEventListener("click", Guardar);
  
  function AgregarProducto() {
    const tabla = document.getElementById("TablaProductos");
    const FilaNueva = tabla.querySelector("tbody").insertRow();
    const nuevoID = Math.floor(Math.random() * 1000);
  
    FilaNueva.id = `fila-${nuevoID}`; //generar Id de la fila
  
    const celdaSelect = FilaNueva.insertCell(0);
    /*Columna Select*/
    const select = document.createElement("select");
    select.required = true;
    select.id = `SelectProducto-${nuevoID}`;
    celdaSelect.appendChild(select);
    /*Columnas adicionales*/
    const precioUnitario = FilaNueva.insertCell();
    precioUnitario.id = `PrecioU-${nuevoID}`;
  
    // const celdaCantidad = FilaNueva.insertCell();
    const cantidad = FilaNueva.insertCell();
    const InputCantidad = document.createElement("input");
    InputCantidad.required = true;
    // cantidad.id = `Cantidad-${nuevoID}`;
    InputCantidad.id = `Cantidad-${nuevoID}`;
    cantidad.appendChild(InputCantidad);
  
    const imagen = FilaNueva.insertCell();
    const imagenET = document.createElement("img")
    imagenET.id = `Imagen-${nuevoID}`;
    imagen.id = `celdaImagen-${nuevoID}`;
    imagenET.style = "width: 50px; height: 50px;"
    imagen.appendChild(imagenET);
    //  imagenET.src = "data:image/png;base64, " + 
  
    const totales = FilaNueva.insertCell();
    totales.id = `totales-${nuevoID}`;
  
    const _modeloSelect = {};
    _modeloSelect.idSelect = select.id;
    _modeloSelect.idPrecioU = precioUnitario.id;
    _modeloSelect.idCantidad = InputCantidad.id;
    _modeloSelect.idImagen = imagenET.id;
    _modeloSelect.idtotales = totales.id;
    CargarProductos(_modeloSelect);
    select.addEventListener("change", cargarSeleccion(_modeloSelect));
    InputCantidad.addEventListener("keyup", function () {
      CalcularFila(InputCantidad.id, totales.id, precioUnitario.id);
    });
  }
  
  // function Calcular(params) {
  
  // }
  
  function CargarProductos(modeloSelect) {
    fetch("/Home/ConsultaDatos")
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((responseJson) => {
        if (responseJson.length > 0) {
          const select = document.getElementById(modeloSelect.idSelect);
          const opcionVacia = document.createElement("option");
          opcionVacia.value = ""; // Establece el valor vacío
          opcionVacia.textContent = "Seleccionar una opción";
          select.appendChild(opcionVacia);
  
          responseJson.forEach((element) => {
            const producto = document.createElement("option");
            producto.value = element.id;
            producto.textContent = element.nombreProducto;
            select.appendChild(producto);
          });
          select.addEventListener("change", cargarSeleccion(modeloSelect));
          datosDelElementoSeleccionado = responseJson;
        }
      });
  }
  
  function cargarSeleccion(modeloSelect) {
    return (event) => {
      const select = event.target;
      const opcionSeleccionada = select.value;
      const datosElemento = datosDelElementoSeleccionado.find(
        (element) => element.id === parseInt(opcionSeleccionada)
      );
      if (datosElemento) {
        // var cant = String(Math.floor(Math.random() * 10));
        document.getElementById(modeloSelect.idPrecioU).textContent =
          datosElemento.precioUnitario;
        // document.getElementById(modeloSelect.idCantidad).textContent = 0;
       var Imagen =  document.getElementById(modeloSelect.idImagen) 
       Imagen.src ="data:image/png;base64,"+ datosElemento.imagenProducto;
        // let totalprod = parseInt(cant) * parseInt(datosElemento.precioUnitario);
        // document.getElementById(modeloSelect.idtotales).textContent = 0;
      }
      // Calculo();
    };
  }
  
  function Calculo() {
    const tabla = document.getElementById("TablaProductos");
    const TotalesColumna = tabla.querySelectorAll("tbody tr td:nth-child(5)");
    const valoresColumnaTotales = [];
  
    TotalesColumna.forEach((celda) => {
      valoresColumnaTotales.push(parseInt(celda.textContent));
    });
  
    let suma = 0;
    for (let i = 0; i < valoresColumnaTotales.length; i++) {
      suma += valoresColumnaTotales[i];
    }
  
    document.getElementById("idSubtotal").textContent = suma;
    let impuesto = suma * 0.19;
  
    document.getElementById("idImpuestos").textContent = impuesto;
    document.getElementById("idTotal").textContent = suma + impuesto;
  }
  
  function CalcularFila(InputCantidad, totales, precioUnitario) {
    cantidadEntrega =
      cantidadEntrega + parseInt(document.getElementById(InputCantidad).value);
    cantidad = parseInt(document.getElementById(InputCantidad).value);
  
    const precio = parseInt(document.getElementById(precioUnitario).textContent);
    document.getElementById(totales).textContent = cantidad * precio;
    Calculo();
  }
  
  function Guardar() {
    var fechaActual = new Date();
     _modeloFactura = {
      FechaEmisionFactura: fechaActual.toISOString(),
      idCliente: _modeloCliente.idCliente
      ,
      numeroFactura: parseInt(document.getElementById("NumeroFactura").value),
      numeroTotalArticulos: cantidadEntrega,
      subtotalFactura: document.getElementById("idSubtotal").textContent,
      totalImpuestos: document.getElementById("idImpuestos").textContent,
      totalFactura: document.getElementById("idTotal").textContent
    };
    // console.log(_modeloFactura);
    EnvioDatos();
    reset()
  }
  
  function reset() {
    const tabla = document.getElementById("TablaProductos");
    while (tabla.rows.length > 0) {
      tabla.deleteRow(1);
    }
    AgregarProducto();
  }
  
  function EnvioDatos() {
  
  
    fetch("/Home/GuardarFactura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_modeloFactura)
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        console.log(data);
      })
      .catch((error) => {
        // Manejar errores si ocurren
        console.error("Error:", error);
      });
  }
  