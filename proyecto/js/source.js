"use strict";
function ProductoRealizado(id, nombre, tamanio, produccion, horaTrabajo) {
  this.id = id;
  this.nombre = nombre;
  this.tamanio = tamanio;
  this.produccion = produccion;
  this.horaTrabajo = horaTrabajo;
}

function ProductoPersonalizado(id, imagen, tamanio, detalles, produccion, horaTrabajo,) {
  this.id = id;
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
          checkImgRealizado[i].id,
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

  /*$(botonPersonalizado).click(habilitarPersonalizado);

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
  }*/

  } 

  $("#botonSiguiente").click(imprimeProducto);

  function imprimeProducto(){
  

    $('.primeraVentana').fadeOut('slow', function() {
      $('.segundaVentana').fadeIn('slow');
  });

    var itemPredefinido = JSON.parse(sessionStorage.getItem("productoPredefinido"));
    var nombrePrueba = itemPredefinido.nombre;
    var tamanioPredefinido = itemPredefinido.tamanio;
    var horaTrabajoPredefinido = itemPredefinido.horaTrabajo;
    var produccionPredefinido = itemPredefinido.produccion;

    
    var imprimirImg = $(`<img src="./assets/img/producto${itemPredefinido.id}.png"/>`);
    
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

  
  $("#botonAtrasSegunda").click(atrasPrimera);

  function atrasPrimera(){
    $('.segundaVentana').fadeOut('slow', function() {
      $('.primeraVentana').fadeIn('slow');
      $('#pedidoConcretado img').remove();
      $('#pedidoConcretado p').remove();
  });

  
    $("#tamanioRealizado").toggle(500);
    $("#SelectTamanio").prop('selectedIndex',0)
  $(botonSiguiente).prop( "disabled", true ).css({
    "background-color": "grey",
 });
    $('.productoRealizado').prop( "checked", false );;

  }


  $("#botonSiguienteSegunda").click(imprimeForm);
  
  function imprimeForm () {
    $('.segundaVentana').fadeOut('slow', function() {
      $('.terceraVentana').fadeIn('slow');
  });
  }




  $("#botonFinalizar").click(enviarForm);
  
  function enviarForm(e) {
    e.preventDefault();
    var nombre = $('#name').val();
    var apellido = $('#lastName').val();
    var email = $('#email').val();
    var nContacto = $('#tel').val();
    var provinciaUsusario = $('#Provincias').val();
    var municipioUsusario = $('#municipios').val();
    var codigoPostal = $('#CP').val();

    console.log(nombre, apellido, email, nContacto, provinciaUsusario, municipioUsusario, codigoPostal);
    if(nombre == 0 | nombre == null | nombre == "") {
      $('#name').css({
        'border-color':'orange',
        'background-color':'orange'
      })

      $('#name').prop('placeholder', 'Ingrese su nombre.');
    }

    if(apellido == 0 | apellido == null | apellido == "") {
      $('#lastName').css({
        'border-color':'orange',
        'background-color':'orange'
      })

      $('#lastName').prop('placeholder', 'Ingrese su apellido.');
    }
    
    if(email == 0 | email == null | email == "") {
      $('#email').css({
        'border-color':'orange',
        'background-color':'orange'
      })

      $('#email').prop('placeholder', 'Ingrese su email.');
    }

    if(nContacto == 0 | nContacto == null | nContacto == "") {
      $('#tel').css({
        'border-color':'orange',
        'background-color':'orange'
      })

      $('#tel').prop('placeholder', 'Ingrese su número de contacto.');
    }

    if(provinciaUsusario == '#') {
      $('#Provincias').css({
        'border-color':'orange',
        'background-color':'orange'
      })

      $('.error').append('Ingrese su provincia.');
      $('.error').css({
        'color':'orange',
        'font-size':'1.2rem'
      
      });
    }

    if(codigoPostal == 0 | codigoPostal == null | codigoPostal == "") {
      $('#CP').css({
        'border-color':'orange',
        'background-color':'orange'
      })

      $('#CP').prop('placeholder', 'Ingrese su número de contacto.');
    }
    
    if(nombre.length > 0 && apellido.length > 0 && email.length > 0 && nContacto.length > 0 && provinciaUsusario.length > 0 && codigoPostal.length > 0){
      
      $('#mensajeFinal').css({
        'width': '100vw',
        'height':'100vh',
        'display': 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'wrap',
        'justify-content': 'center',
        'text-align': 'center',
        'margin': '0 auto',
        'background-color': 'firebrick',
        'border-radius': '15px',
        'padding': '5% 0% 5% 0%',
        'color': 'white'
      });

      var textoConfirmado = $('<p></p>').text('¡Su pedido ha sido confirmado, se lo enviaremos en 10 días habiles!');

      textoConfirmado.prop('class','parrafoFinalizado');

      var BotonResetear = $('<a href = "index.html"></a>').text('Volver al inicio');

      BotonResetear.prop('class','BotonVolverInicio');

      $('#mensajeFinal').append(textoConfirmado, BotonResetear);
      
    }
  }

  $('#name').keydown(ocultarErrorName);
  function ocultarErrorName (){
    $('#name').css({
      'border-color':'white',
      'background':'none'
    })
  }

  $('#lastName').keydown(ocultarErrorLastName);
  function ocultarErrorLastName (){
    $('#lastName').css({
      'border-color':'white',
      'background':'none'
    })
  }

  $('#email').keydown(ocultarErrorEmail);
  function ocultarErrorEmail (){
    $('#email').css({
      'border-color':'white',
      'background':'none'
    })
  }

  $('#tel').keydown(ocultarErrorTel);
  function ocultarErrorTel (){
    $('#tel').css({
      'border-color':'white',
      'background':'none'
    })
  }

  $('#Provincias').change(ocultarErrorProvincia);
  function ocultarErrorProvincia (){
    $('#Provincias').css({
      'border-color':'white',
      'background':'none'
    })
    $('.error').remove()
  }

  $('#CP').keydown(ocultarErrorCp);
  function ocultarErrorCp (){
    $('#CP').css({
      'border-color':'white',
      'background':'none'
    })
  }