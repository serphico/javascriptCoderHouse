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

let imagenPersonalizado = $("#imgProductoPersonalizado") ;;
let tamanioPersonalizado = $("#tamanioPersonalizado");
let detallesPersonalizado = $("#detalles") ;

$( document ).ready(function() {
  $(botonSiguiente).prop( "disabled", true );

});

for (let i = 0; i < checkImgRealizado.length; i++) {
  
  $(checkImgRealizado[i]).click(mostrarValor );

  function mostrarValor() {
    $(checkRealizado[i]).prop('checked', true);
    sessionStorage.clear();
    $.ajax({
      url:"../data/tamanio.json",
      type: "GET",
      dataType: "json"
    }).done(function (tamanio){
      var select = document.createElement("select");
      //var option1 = document.createTextNode(tamanio.tamanio_select)
      $("tamanio"+i).append("")
    })
    /*$(contenedorPersonalizado).css("display","none");*/
    var inputTamanio = $("#tamanioProd"+ i);
    $(inputTamanio).change(valorTamanio);

    function valorTamanio() {
      var productoPredefinido = new ProductoRealizado(
        $(checkRealizado[i]).val(),
        parseInt($(inputTamanio).val()),
        parseInt($(inputTamanio).val() * 2),
        parseInt($(inputTamanio).val() * 10)
      );
  
      sessionStorage.setItem("productoPredefinido", JSON.stringify(productoPredefinido));
      var item = JSON.parse(sessionStorage.getItem("productoPredefinido"));
  
      
    }
  }



  $(botonPersonalizado).click(habilitarPersonalizado);

  function habilitarPersonalizado() {
    $(contenedorPersonalizado).css('display','flex');
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

    $(botonSiguiente).click(subaImagen);

    function subaImagen() {

      var productoPersonalizado = new ProductoPersonalizado(
        $(imagenPersonalizado).prop('files')[i],
        $(tamanioPersonalizado).val(),
        $(detallesPersonalizado).val(),
        parseInt($(tamanioPersonalizado).val() * 2),
        parseInt($(tamanioPersonalizado).val() * 10)
      );

      sessionStorage.setItem("productoPersonalizado", JSON.stringify(productoPersonalizado));

  }
  }

  } 