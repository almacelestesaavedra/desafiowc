//Crear una funcion para agregar mis cartas de contentful a mi página.
function addCard(params = {}) {
  //tener ubicado desde y hacia donde va la informacion, en este caso desde el template hacia el contenedor.
  const template = document.querySelector(
    "#servicios__contenedor__contenedor-servicios-id"
  );
  const contenedor = document.querySelector(
    ".servicios__contenedor__contenedor-servicios"
  );
  //en esta parte le voy a asignar los valores de las cartas que cree en contentful
  template.content.querySelector(
    /*la clase donde la quiero poner*/ ".card-imagen"
  ).src = params.imagen;
  template.content.querySelector(".card-titulo").textContent = params.titulo;
  template.content.querySelector(".card-descripcion").textContent =
    params.descripcion;
  const clone = document.importNode(template.content, true);
  contenedor.appendChild(clone);
}

export function getServicios() {
  return fetch(
    "https://cdn.contentful.com/spaces/o77f8c91ywzf/entries?access_token=34DArBwxr8Y94lJpoMZp3_JDU_aoQe2Nkgc6xoG5exw&content_type=work"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //para ver que data me trae hago un console.log
      console.log(data);
      const fieldsCollections = data.items.map((items) => {
        const imagenId = items.fields.imagen
          ? items.fields.imagen.sys.id
          : null;
        // para buscar el asset en includes usando el ID
        const asset = data.includes.Asset.find(
          (asset) => asset.sys.id === imagenId
        );
        const imageUrl = asset ? asset.fields.file.url : null;
        return {
          titulo: items.fields.titulo,
          descripcion: items.fields.descripcin,
          imagen: imageUrl,
        };
      });
      return fieldsCollections;
    });
}
// Función para cargar
async function cargarSecciones() {
  const servicios = await getServicios();
  servicios.forEach((servicio) => {
    addCard(servicio, "..servicios__contenedor__contenedor-servicios");
  });
}

// Llamás a cargarSecciones para que haga todo
cargarSecciones();
