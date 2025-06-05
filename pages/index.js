import { getServicios } from "./servicios";
function main() {
  getServicios().then(function (servicios) {
    for (const s of servicios) {
      addCard(s);
    }
  });
}
main();
