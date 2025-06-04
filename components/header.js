(function () {
  const botonAbreVentanaEl = document.querySelector(".header__menu-abrir");
  const ventanaEl = document.querySelector(".header__menu");
  const botonCerrarVentanaEl = document.querySelector(".header__menu-cerrar");

  botonAbreVentanaEl.addEventListener("click", () => {
    ventanaEl.style.display = "block";
  });
  botonCerrarVentanaEl.addEventListener("click", () => {
    ventanaEl.style.display = "";
  });
})();
