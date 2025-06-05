//Controlar, porque esta mal

//Crear una funcion para agregar mis cartas de contentful a mi página.
function addCard(params = {}) {
  //tener ubicado desde y hacia donde va la informacion, en este caso desde el template hacia el contenedor.
  const template = document.querySelector(
    "#portfolio__contenedor__contenedor-portfolio-id"
  );
  const contenedor = document.querySelector(
    ".portfolio__contenedor__contenedor-portfolio"
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

function getPortfolio() {
  return fetch(
    "https://cdn.contentful.com/spaces/o77f8c91ywzf/entries?access_token=34DArBwxr8Y94lJpoMZp3_JDU_aoQe2Nkgc6xoG5exw&content_type=trabajo"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //para ver que data me trae hago un console.log
      console.log(data);
      const fieldsCollections = data.items.map((items) => {
        const imagenId = items.fields.imagentrabajo.sys.id;

        // para buscar el asset en includes usando el ID
        const asset = data.includes.Asset.find(
          (asset) => asset.sys.id === imagenId
        );
        const imageUrl = asset ? asset.fields.file.url : null;
        return {
          titulo: items.fields.titulotrabajo,
          descripcion: items.fields.descripciontrabajo,
          imagen: imageUrl,
        };
      });
      return fieldsCollections;
    });
}
// Función para cargar
async function cargarSecciones() {
  const portfolio = await getPortfolio();
  portfolio.forEach((item) => {
    addCard(item, ".portfolio__contenedor__contenedor-portfolio");
  });
}

// Llamás a cargarSecciones para que haga todo
cargarSecciones();
