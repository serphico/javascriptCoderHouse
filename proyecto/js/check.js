let checkImgRealizado = document.getElementsByClassName("imgProductoStock");
let checkRealizado = document.document.getElementsByTagName(
  "productoRealizado"
);

for (let i = 0; i < checkImgRealizado.length; i++) {
  checkImgRealizado[i].addEventListener("click", function mostrarValor() {
    checkRealizado[i].checked = false;
  });
}

for (let i = 0; i < checkImgRealizado.length; i++) {
  checkImgRealizado[i].addEventListener("click", function mostrarValor() {
    checkRealizado[i].checked = true;
  });
}
