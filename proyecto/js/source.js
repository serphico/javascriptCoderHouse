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
  
  $(checkImgRealizado[i]).click(mostrarValor);

  function mostrarValor(){
    $(checkRealizado[i]).prop('checked', true);
    sessionStorage.clear();
    $('#tamanioRealizado').fadeIn(500);

    $( "#tamanioRealizado" ).ready(function() {
      $("#SelectTamanio").change(valorTamanio);

     function valorTamanio() {
      
       var productoPredefinido = new ProductoRealizado(
         $(checkRealizado[i]).val(),
         parseInt($("#SelectTamanio").val()),
         parseInt($("#SelectTamanio").val() * 2),
         parseInt($("#SelectTamanio").val() * 10)
       );
   
       sessionStorage.setItem("productoPredefinido", JSON.stringify(productoPredefinido));
       var item = JSON.parse(sessionStorage.getItem("productoPredefinido"));
   
       $("#botonSiguiente").prop('disabled', false).css({
         "background-color": "cyan",
         "cursor": "pointer"
      });
     }
   
   });
  };

  function nomostrarValor() {
    $(checkRealizado[i]).prop('checked', true);
    sessionStorage.clear();
    //$(contenedorPersonalizado).fadeOut(300);
    $.ajax({
      url:"../data/tamanio.json",
      type: "GET",
      dataType: "json"
    }).done(function (tamanio){
      var radio1 = document.createElement("input");
      var radio2 = document.createElement("input");
      var radio3 = document.createElement("input");
      
      radio1.type = "radio";
      radio2.type = "radio";
      radio3.type = "radio";

      radio1.className = "tamanioChico";
      radio2.className = "tamanioMediano";
      radio3.className = "tamanioGrande";
      /*var option1 = document.createElement("option");
      var option2 = document.createElement("option");
      var option3 = document.createElement("option");
      var option4 = document.createElement("option");*/
      
      

      /*$(option2).attr("value",15);
      $(option3).attr("value",25);
      $(option4).attr("value",30);*/

      //var textoOption1 = document.createTextNode(tamanio.tamanio_select);
      var textoOption1 = document.createTextNode(tamanio.tamanio_chico);
      var textoOption2 = document.createTextNode(tamanio.tamanio_mediano);
      var textoOption3 = document.createTextNode(tamanio.tamanio_grande);
      
      radio1.appendChild(textoOption1);
      radio2.appendChild(textoOption2);
      radio3.appendChild(textoOption3);
      //option4.appendChild(textoOption4);

      $("#tamanioRealizado").append(radio1, radio2, radio3);
      $(".tamanioChico").append(textoOption1 +"cm.");


     // $("#tamanio"+i).append(select);
     // $("#tamanioProd"+i).append(option1, option2, option3, option4);
      //option1.disabled = true
    }).fail( function(xhr, status, error) {    //xhr (request completa)        
      console.log(xhr);
      console.log(status);
      console.log(error);
  })
    /*$(contenedorPersonalizado).css("display","none");*/

    $( "#tamanioProd" ).ready(function() {
       $("#tamanioProd").change(valorTamanio());

      function valorTamanio() {
        console.log($("select#tamanioProd"));
        var productoPredefinido = new ProductoRealizado(
          $(checkRealizado[i]).val(),
          parseInt($("#tamanioProd").val()),
          parseInt($("#tamanioProd").val() * 2),
          parseInt($("#tamanioProd").val() * 10)
        );
    
        sessionStorage.setItem("productoPredefinido", JSON.stringify(productoPredefinido));
        var item = JSON.parse(sessionStorage.getItem("productoPredefinido"));
    
        $("#botonSiguiente").prop('disabled', false).css({
          "background-color": "cyan",
          "cursor": "pointer"
       });
      }
    
    });



  }



  $(botonPersonalizado).click(habilitarPersonalizado);

  function habilitarPersonalizado() {
    $(contenedorPersonalizado).fadeIn(1000);
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