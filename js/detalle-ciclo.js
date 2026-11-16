
// ===============================================
// INFORMACIÓN DE LOS PROYECTOS POR CICLO
// ===============================================

const proyectos = {
  inicial: {
    nombre: "Ciclo Inicial",
    resumen: "Experiencias de aprendizaje, exploración y descubrimiento.",
    titulo: "Proyecto pedagógico del Ciclo Inicial",
    descripcion: "Aquí se debe incorporar la descripción oficial del proyecto pedagógico del Ciclo Inicial, sus actividades y las experiencias desarrolladas por los estudiantes.",
    proposito: "Incluir aquí el propósito formativo del proyecto.",
    portada: "Imagenes/Proyectos/CicloInicial/portada.jpg",

    fotos: [
      "Imagenes/Proyectos/CicloInicial/foto-01.jpg",
      "Imagenes/Proyectos/CicloInicial/foto-02.jpg",
      "Imagenes/Proyectos/CicloInicial/foto-03.jpg"
    ],

    videos: [
      {
        titulo: "Experiencias del Ciclo Inicial",
        descripcion: "Registro audiovisual de las actividades del ciclo.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-inicial/video-01.mp4"
      },
      {
        titulo: "Actividades y aprendizajes",
        descripcion: "Momentos destacados del proyecto.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-inicial/video-02.mp4"
      }
    ]
  },

  ciclo3: {
    nombre: "Ciclo 3",
    resumen: "Exploración, aprendizaje y construcción de experiencias.",
    titulo: "Proyecto pedagógico del Ciclo 3",
    descripcion: "Aquí se debe incorporar la descripción oficial del proyecto del Ciclo 3 y explicar cómo participan los estudiantes.",
    proposito: "Incluir aquí el propósito formativo del proyecto.",
    portada: "Imagenes/Proyectos/Ciclo3/portada.jpg",

    fotos: [
      "Imagenes/Proyectos/Ciclo3/foto-01.jpg",
      "Imagenes/Proyectos/Ciclo3/foto-02.jpg",
      "Imagenes/Proyectos/Ciclo3/foto-03.jpg"
    ],

    videos: [
      {
        titulo: "Experiencias del Ciclo 3",
        descripcion: "Registro audiovisual del proyecto.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-3/video-01.mp4"
      },
      {
        titulo: "Producciones de los estudiantes",
        descripcion: "Actividades y resultados del ciclo.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-3/video-02.mp4"
      }
    ]
  },

  ciclo4: {
    nombre: "Ciclo 4",
    resumen: "Investigación, ciencia, tecnología y construcción de conocimiento.",
    titulo: "Astronomía: ciencia, exploración y robótica",
    descripcion: "El proyecto de Ciclo 4 aborda la Astronomía como eje de investigación y aprendizaje. Los estudiantes exploran el universo, sus componentes y los avances científicos y tecnológicos que permiten estudiarlo. Se busca relacionar la exploración espacial con el impacto de la robótica en este campo.",
    proposito: "Comprender fenómenos astronómicos y reconocer cómo la tecnología y la robótica contribuyen a la exploración del espacio, mediante experiencias de investigación, construcción y socialización de proyectos.",
    portada: "Imagenes/Proyectos/Ciclo4/portada.jpg",

    fotos: [
      "Imagenes/Proyectos/Ciclo4/foto-01.jpg",
      "Imagenes/Proyectos/Ciclo4/foto-02.jpg",
      "Imagenes/Proyectos/Ciclo4/foto-03.jpg",
      "Imagenes/Proyectos/Ciclo4/foto-04.jpg"
    ],

    videos: [
      {
        titulo: "Proyecto de Astronomía",
        descripcion: "Presentación de las experiencias desarrolladas por los estudiantes.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-4/astronomia-01.mp4"
      },
      {
        titulo: "Astronomía y robótica",
        descripcion: "Relación entre la exploración espacial y la tecnología.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-4/robotica-astronomia.mp4"
      }
    ]
  },

  ciclo5: {
    nombre: "Ciclo 5",
    resumen: "Proyección, formación y construcción de proyectos de vida.",
    titulo: "Proyecto pedagógico del Ciclo 5",
    descripcion: "Aquí se debe incorporar la descripción oficial del proyecto de Ciclo 5 y sus experiencias de formación.",
    proposito: "Incluir aquí el propósito formativo del proyecto.",
    portada: "Imagenes/Proyectos/Ciclo5/portada.jpg",

    fotos: [
      "Imagenes/Proyectos/Ciclo5/foto-01.jpg",
      "Imagenes/Proyectos/Ciclo5/foto-02.jpg",
      "Imagenes/Proyectos/Ciclo5/foto-03.jpg"
    ],

    videos: [
      {
        titulo: "Experiencias del Ciclo 5",
        descripcion: "Registro audiovisual del proyecto.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-5/video-01.mp4"
      },
      {
        titulo: "Proyectos de los estudiantes",
        descripcion: "Presentación de experiencias y resultados.",
        archivo: "https://media.leondegreiff.edu.co/proyectos/ciclo-5/video-02.mp4"
      }
    ]
  }
};

// ===============================================
// IDENTIFICAR EL CICLO SELECCIONADO
// ===============================================

const parametros = new URLSearchParams(window.location.search);
const cicloSeleccionado = parametros.get("ciclo");
const proyecto = proyectos[cicloSeleccionado];

if (!proyecto) {
  document.querySelector(".detalle-contenido").innerHTML = `
    <div class="mensaje-sin-contenido">
      <h2>No encontramos este proyecto</h2>
      <p>Selecciona uno de los ciclos disponibles para consultar su información.</p>
      <a class="boton-ciclo" href="proyectos-ciclos.html">
        Volver a proyectos de ciclos
      </a>
    </div>
  `;
} else {

  // =============================================
  // CARGAR INFORMACIÓN DEL PROYECTO
  // =============================================

  document.title = proyecto.nombre + " | Colegio León de Greiff";

  document.getElementById("titulo-ciclo").textContent = proyecto.nombre;
  document.getElementById("resumen-ciclo").textContent = proyecto.resumen;
  document.getElementById("titulo-proyecto").textContent = proyecto.titulo;
  document.getElementById("descripcion-proyecto").textContent = proyecto.descripcion;
  document.getElementById("proposito-proyecto").textContent = proyecto.proposito;

  const imagenDestacada = document.getElementById("imagen-destacada");
  imagenDestacada.src = proyecto.portada;
  imagenDestacada.alt = "Proyecto " + proyecto.nombre;

  // =============================================
  // CONSTRUIR EL CARRUSEL
  // =============================================

  const carrusel = document.getElementById("carrusel");
  const indicadores = document.getElementById("indicadores");

  const imagenesCarrusel = proyecto.fotos;
  let indiceActual = 0;

  if (!imagenesCarrusel || imagenesCarrusel.length === 0) {
    carrusel.innerHTML = `
      <div class="mensaje-sin-contenido">
        Todavía no se han agregado fotografías a este proyecto.
      </div>
    `;
  } else {

    carrusel.querySelectorAll(".carrusel-imagen").forEach(img => img.remove());

    imagenesCarrusel.forEach((ruta, indice) => {
      const imagen = document.createElement("img");

      imagen.src = ruta;
      imagen.alt = "Fotografía " + (indice + 1) + " de " + proyecto.nombre;
      imagen.className = "carrusel-imagen" + (indice === 0 ? " activa" : "");

      carrusel.insertBefore(imagen, carrusel.querySelector(".anterior"));

      const punto = document.createElement("button");
      punto.className = "punto" + (indice === 0 ? " activo" : "");
      punto.type = "button";
      punto.setAttribute("aria-label", "Mostrar fotografía " + (indice + 1));

      punto.addEventListener("click", () => mostrarImagen(indice));

      indicadores.appendChild(punto);
    });

    function mostrarImagen(indice) {
      const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
      const puntos = indicadores.querySelectorAll(".punto");

      indiceActual = (indice + imagenes.length) % imagenes.length;

      imagenes.forEach((imagen, i) => {
        imagen.classList.toggle("activa", i === indiceActual);
      });

      puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indiceActual);
      });
    }

    carrusel.querySelector(".anterior").addEventListener("click", () => {
      mostrarImagen(indiceActual - 1);
    });

    carrusel.querySelector(".siguiente").addEventListener("click", () => {
      mostrarImagen(indiceActual + 1);
    });
  }

  // =============================================
  // CARGAR VIDEOS DEL CICLO
  // =============================================

  const contenedorVideos = document.getElementById("rejilla-videos");

  if (!proyecto.videos || proyecto.videos.length === 0) {
    contenedorVideos.innerHTML = `
      <div class="mensaje-sin-contenido">
        Próximamente publicaremos los videos de este ciclo.
      </div>
    `;
  } else {

    proyecto.videos.forEach(video => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-video";

      const reproductor = document.createElement("video");
      reproductor.controls = true;
      reproductor.preload = "metadata";
      reproductor.playsInline = true;

      const fuente = document.createElement("source");
      fuente.src = video.archivo;
      fuente.type = "video/mp4";

      reproductor.appendChild(fuente);
      reproductor.appendChild(
        document.createTextNode("Tu navegador no permite reproducir este video.")
      );

      const informacion = document.createElement("div");
      informacion.className = "video-info";

      const titulo = document.createElement("h3");
      titulo.textContent = video.titulo;

      const descripcion = document.createElement("p");
      descripcion.textContent = video.descripcion;

      informacion.append(titulo, descripcion);
      tarjeta.append(reproductor, informacion);
      contenedorVideos.appendChild(tarjeta);
    });
  }

  // =============================================
  // NAVEGACIÓN ENTRE CICLOS
  // =============================================

  const ordenCiclos = ["inicial", "ciclo3", "ciclo4", "ciclo5"];
  const indiceCiclo = ordenCiclos.indexOf(cicloSeleccionado);

  const anterior = document.getElementById("ciclo-anterior");
  const siguiente = document.getElementById("ciclo-siguiente");

  if (indiceCiclo <= 0) {
    anterior.style.display = "none";
  } else {
    anterior.href = "detalle-ciclo.html?ciclo=" + ordenCiclos[indiceCiclo - 1];
    anterior.textContent = "← " + proyectos[ordenCiclos[indiceCiclo - 1]].nombre;
  }

  if (indiceCiclo >= ordenCiclos.length - 1) {
    siguiente.style.display = "none";
  } else {
    siguiente.href = "detalle-ciclo.html?ciclo=" + ordenCiclos[indiceCiclo + 1];
    siguiente.textContent = proyectos[ordenCiclos[indiceCiclo + 1]].nombre + " →";
  }
}
