import { getServicios, addCard } from "./servicios.js";
function main() {
  getServicios().then(function (servicios) {
    for (const s of servicios) {
      addCard(s);
    }
  });
}
main();
