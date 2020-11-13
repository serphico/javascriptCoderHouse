"use strict";
function ProductoRealizado(nombre, tamanio, produccion, horaTrabajo) {
  this.nombre = nombre;
  this.tamanio = tamanio;
  this.produccion = produccion;
  this.horaTrabajo = horaTrabajo;
}

function ProductoPersonalizado(imagen, tamanio, detalles, produccion, horaTrabajo,) {
  this.imagen = imagen;
  this.tamanio = tamanio;
  this.detalles = detalles;
  this.produccion = produccion;
  this.horaTrabajo = horaTrabajo;

}

//boton siguiente

let botonSiguiente = $("#botonSiguiente");

//parte de producto producto realizado

let checkImgRealizado = $(".imgProductoStock"); 
let checkRealizado = $(".productoRealizado"); 
let botonPersonalizado =  $("#botonPersonalizado"); 
let contenedorPersonalizado = $("#contenedorProductoPersonlizado"); 

let imagenPersonalizado = $("img#preview") ;;
let tamanioPersonalizado = $("#tamanioPersonalizado");
let detallesPersonalizado = $("#detalles") ;

$( document ).ready(function() {
  $(botonSiguiente).prop( "disabled", true );

});

for (let i = 0; i < checkImgRealizado.length; i++) {
  
  $(checkImgRealizado[i]).click(mostrarValor);

  function mostrarValor(){
    $(checkRealizado[i]).prop('checked', true);
    sessionStorage.clear();
    $(contenedorPersonalizado).fadeOut(500);
    $('#tamanioRealizado').fadeIn(500);

    $( "#tamanioRealizado" ).ready(function() {
      $("#SelectTamanio").change(valorTamanio);

     function valorTamanio() {
console.log($("#SelectTamanio").val());
      if($("#SelectTamanio").val() == "null"){
        sessionStorage.clear();
        $("#botonSiguiente").prop('disabled', true).css({
          "background-color": "grey",
       });
      }else{
        var productoPredefinido = new ProductoRealizado(
          $(checkRealizado[i]).val(),
          parseInt($("#SelectTamanio").val()),
          parseInt($("#SelectTamanio").val() * 2),
          parseInt($("#SelectTamanio").val() * 2.5)
        );
    
        sessionStorage.setItem("productoPredefinido", JSON.stringify(productoPredefinido));


        $("#botonSiguiente").prop('disabled', false).css({
          "background-color": "cyan",
          "cursor": "pointer"
       });
      }
      

     }
   
   });
  };

  $(botonPersonalizado).click(habilitarPersonalizado);

  function habilitarPersonalizado() {
    $(contenedorPersonalizado).fadeIn(500);
    $('#tamanioRealizado').fadeOut(500);
    $(checkRealizado[i]).prop('checked', false);
    sessionStorage.clear();

    $(botonSiguiente).prop( "disabled", false );

    $(imagenPersonalizado).change(handleFiles);

    function handleFiles(){

      const file = $(imagenPersonalizado).prop('files')[i];
      console.log(file);
      const preview =$('#preview');
      const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    $(preview).append(img);

    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
    }

    $(`#detalles`).keyup(verificarTextarea);


    function verificarTextarea(){
      if($(`#detalles`).val().length != ""){
        console.log("hola");
        $("#botonSiguiente").prop('disabled', false).css({
          "background-color": "cyan",
          "cursor": "pointer"
       });
      }else{
        $("#botonSiguiente").prop('disabled', true).css({
          "background-color": "grey",
       });
      }
    }

    if($(`#detalles`).val().length != ""){
      console.log("hola");
      $("#botonSiguiente").prop('disabled', false).css({
        "background-color": "cyan",
        "cursor": "pointer"
     });
    }

    $(botonSiguiente).click(subaImagen);

    function subaImagen() {

      var productoPersonalizado = new ProductoPersonalizado(
        $(imagenPersonalizado).prop('src'),
        $(tamanioPersonalizado).val(),
        $(detallesPersonalizado).val(),
        parseInt($(tamanioPersonalizado).val() * 2),
        parseInt($(tamanioPersonalizado).val() * 5)
      );

      sessionStorage.setItem("productoPersonalizado", JSON.stringify(productoPersonalizado));

  }
  }

  } 

  $("#botonSiguiente").click(imprimePrueba);

  function imprimePrueba(){
    var itemPredefinido = JSON.parse(sessionStorage.getItem("productoPredefinido"));
    var nombrePrueba = itemPredefinido.nombre;
    var tamanioPredefinido = itemPredefinido.tamanio;
    var horaTrabajoPredefinido = itemPredefinido.horaTrabajo;
    var produccionPredefinido = itemPredefinido.produccion;

    var imprimirImg = $('<img src="./assets/img/producto1.png"/>');
    var imprimirNombre = $('<p></p>').text(`Nombre: ${nombrePrueba}`);
    var imprimirTamanio = $('<p></p>').text(`Tamaño: ${tamanioPredefinido} cm.`);
    var imprimirPrecio = $('<p></p>').text(`Precio: $${precioFinalPredefinido(tamanioPredefinido,horaTrabajoPredefinido,produccionPredefinido)}`);

    $('#pedidoConcretado').append(imprimirImg);
    $('#pedidoConcretado').append(imprimirNombre);
    $('#pedidoConcretado').append(imprimirTamanio);
    $('#pedidoConcretado').append(imprimirPrecio);

    function precioFinalPredefinido (a,b,c){
      return a*b+c;
    }
  }

  
