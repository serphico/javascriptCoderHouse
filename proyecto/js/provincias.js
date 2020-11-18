$.ajax({
    url: "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre",
    type: "GET",
    dataType: "json",
})
.done( function(provincias) {
    console.log(provincias);
    for (let i = 0; i < provincias.cantidad; i++) {
        var nombreProvincias = provincias.provincias[i].nombre;
        var options = $('<option></option>').text(`${nombreProvincias}`);

        var idProvincias = provincias.provincias[i].id;
        options.prop('id',idProvincias);
        options.prop('value',nombreProvincias);

        $('#Provincias').append(options);

        $('#Provincias').change(elegirMunicipio)

        function elegirMunicipio(){
            $('.municipio').remove();
            $('.contedorMunicipios').css({  "visibility": "visible"})
            var municipioElegido = $('#Provincias').val();
   
                $.ajax({
                    url: `https://apis.datos.gob.ar/georef/api/municipios?provincia=${municipioElegido}&campos=id,nombre&max=100`,
                    type: "GET",
                    dataType: "json",
                }).done( function(municipio) {
                    var nombreMunicipio = municipio.municipios[i].nombre;
                    var options = $('<option></option>').text(`${nombreMunicipio}`);
                    options.prop("class","municipio");
            
                    $('#municipios').append(options);
                })
                .fail( function(xhr, status, error)  {
                    alert("Fallo la actualizacion");
                    console.log(xhr);console.log(status);console.log(error);
                })


        }
    }
})
.fail( function(xhr, status, error)  {
    alert("Fallo la actualizacion");
    console.log(xhr);console.log(status);console.log(error);
})

