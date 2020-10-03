let productoTororo = {
  producto: "Tororo",
  tamanio: 30,
  produccion: 30, //en horas
};

let productoPulpi = {
  producto: "Pulpi",
  tamanio: 15,
  produccion: 20, //en horas
};

let productoSalchicha = {
  producto: "Perro Salchicha",
  tamanio: 25,
  produccion: 25, //en horas
};

function calcularPrecioRealizados(tamaño, produccion, valorHoraTrabajo) {
  var valorHoraTrabajo = 100;

  var preguntaRealizado = prompt(
    "¿Que amigurumi quieres? totoro, pulpi, salchicha"
  ).toLowerCase();

  var produccion = [
    productoTororo.produccion,
    productoPulpi.produccion,
    productoSalchicha.produccion,
  ];

  var tamanio = [
    productoTororo.tamanio,
    productoPulpi.tamanio,
    productoSalchicha.tamanio,
  ];

  if (preguntaRealizado == "totoro") {
    var Presupuesto = produccion[0] + tamanio[0] * valorHoraTrabajo;

    alert(`El amigurumi de ${productoTororo.producto} cuesta $${Presupuesto}`);
  } else if (preguntaRealizado == "pulpi") {
    var Presupuesto = produccion[1] + tamanio[1] * valorHoraTrabajo;
    alert(`El amigurumi de ${productoPulpi.producto} cuesta $${Presupuesto}`);
  } else if (preguntaRealizado == "salchicha") {
    var Presupuesto = produccion[2] + tamanio[2] * valorHoraTrabajo;
    alert(
      `El amigurumi del ${productoSalchicha.producto} cuesta $${Presupuesto}`
    );
  } else {
    alert(`Podes cotizar un diseño personalizado abajo`);
  }
}

calcularPrecioRealizados();

function Producto() {
  this.idProducto = idProducto;
  this.alturaProducto = alturaProducto;
  this.anchoProducto = anchoProducto;
  this.imgProducto = imgProducto;

  var tiempoProduccion = tiempoProduccion;
  this.calcularTiempoProduccion = function (tiempoProduccion) {
    tiempoProduccion = alturaProducto * anchoProducto;
    return tiempoProduccion;
  };

  var valorProducto = valorProducto;
  this.calcularValorProducto = function (valorProducto) {
    valorProducto = tiempoProducción + valorHoraTrabajo;
    return tiempoProduccion;
  };
}
