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
  template.content.querySelector(".card-titulo").textContent =
    params.titulotrabajo;
  template.content.querySelector(".card-descripcion").textContent =
    params.descripciontrabajo;
  const clone = document.importNode(template.content, true);
  contenedor.appendChild(clone);
}

function getServicios() {
  return fetch(
    "https://cdn.contentful.com/spaces/o77f8c91ywzf/entries?access_token=34DArBwxr8Y94lJpoMZp3_JDU_aoQe2Nkgc6xoG5exw"
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
//Lo que me recomienda lisa para que cargue las cartas por separado

// Función para agregar cartas, recibe params y el selector del contenedor
function addCard(params = {}, contenedorSelector) {
  const template = document.querySelector(
    "#portfolio__contenedor__contenedor-portfolio-id"
  );
  const contenedor = document.querySelector(contenedorSelector);

  template.content.querySelector(".card-imagen").src = params.imagen;
  template.content.querySelector(".card-titulo").textContent = params.titulo;
  template.content.querySelector(".card-descripcion").textContent =
    params.descripcion;

  const clone = document.importNode(template.content, true);
  contenedor.appendChild(clone);
}

// Función para obtener Servicios
function getServicios() {
  return fetch(
    "https://cdn.contentful.com/spaces/o77f8c91ywzf/entries?access_token=34DArBwxr8Y94lJpoMZp3_JDU_aoQe2Nkgc6xoG5exw&content_type=servicios"
  )
    .then((res) => res.json())
    .then((data) => {
      return data.items.map((item) => {
        const imagenId = item.fields.imagentrabajo.sys.id;
        const asset = data.includes.Asset.find(
          (asset) => asset.sys.id === imagenId
        );
        const imageUrl = asset ? asset.fields.file.url : null;
        return {
          titulo: item.fields.titulotrabajo,
          descripcion: item.fields.descripciontrabajo,
          imagen: imageUrl,
        };
      });
    });
}

// Función para obtener Portfolio
function getPortfolio() {
  return fetch(
    "https://cdn.contentful.com/spaces/o77f8c91ywzf/entries?access_token=34DArBwxr8Y94lJpoMZp3_JDU_aoQe2Nkgc6xoG5exw&content_type=portfolio"
  )
    .then((res) => res.json())
    .then((data) => {
      return data.items.map((item) => {
        const imagenId = item.fields.imagentrabajo.sys.id;
        const asset = data.includes.Asset.find(
          (asset) => asset.sys.id === imagenId
        );
        const imageUrl = asset ? asset.fields.file.url : null;
        return {
          titulo: item.fields.titulotrabajo,
          descripcion: item.fields.descripciontrabajo,
          imagen: imageUrl,
        };
      });
    });
}

// Función para cargar ambas secciones
async function cargarSecciones() {
  const servicios = await getServicios();
  servicios.forEach((servicio) => {
    addCard(servicio, ".servicios__contenedor"); // Cambiá por el selector real del contenedor de servicios
  });

  const portfolio = await getPortfolio();
  portfolio.forEach((item) => {
    addCard(item, ".portfolio__contenedor__contenedor-portfolio"); // Selector del contenedor de portfolio
  });
}

// Llamás a cargarSecciones para que haga todo
cargarSecciones();
