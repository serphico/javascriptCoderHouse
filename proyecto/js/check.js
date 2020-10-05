let checkImgRealizado = document.getElementsByClassName("imgProductoStock");
let checkRealizado = document.getElementsByClassName("productoRealizado");

for (let i = 0; i < checkImgRealizado.length; i++) {
  checkImgRealizado[i].addEventListener("click", function mostrarValor() {
    checkRealizado[0].checked = false;
    checkRealizado[1].checked = false;
    checkRealizado[2].checked = false;
  });
}

for (let i = 0; i < checkImgRealizado.length; i++) {
  checkImgRealizado[i].addEventListener("click", function mostrarValor() {
    checkRealizado[i].checked = true;
  });
}
