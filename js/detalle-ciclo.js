
/* ==========================================================
   COLEGIO DISTRITAL LEÓN DE GREIFF I.E.D.
   PROYECTOS DE CICLOS
   Archivo: js/detalle-ciclo.js

   Compatible con:
   - detalle-ciclo.html publicado en GitHub
   - css/proyectos-ciclos.css
   - Galería con controles e indicadores originales
   - Videos alojados en YouTube (No listados)
   ========================================================== */


/* ==========================================================
   1. INFORMACIÓN DE LOS PROYECTOS
   ========================================================== */

const proyectos = {

    inicial: {
        nombre: "Ciclo Inicial",
        titulo: "Proyecto de Ciclo Inicial",

        resumen:
            "Experiencias de aprendizaje, exploración y desarrollo integral.",

        descripcion:
            "En este espacio se presentan las experiencias, actividades y proyectos desarrollados por los estudiantes del Ciclo Inicial.",

        objetivo:
            "Fortalecer los procesos de aprendizaje mediante experiencias pedagógicas significativas que promuevan la exploración, la creatividad y el desarrollo integral.",

        imagenPrincipal:
            "Imagenes/Proyectos/CicloInicial/portada.jpg",

        fotos: [
            "Imagenes/Proyectos/CicloInicial/foto-01.jpg",
            "Imagenes/Proyectos/CicloInicial/foto-02.jpg",
            "Imagenes/Proyectos/CicloInicial/foto-03.jpg"
        ],

        videos: [
            {
                titulo: "Presentación del proyecto",
                descripcion: "Conoce las experiencias del Ciclo Inicial.",
                id: "ID_VIDEO_YOUTUBE_1"
            }
        ]
    },


    ciclo3: {
        nombre: "Ciclo 3",
        titulo: "Proyecto de Ciclo 3",

        resumen:
            "Aprendizaje colaborativo y construcción de conocimientos.",

        descripcion:
            "En este espacio se comparten los proyectos, experiencias y actividades pedagógicas desarrolladas por los estudiantes del Ciclo 3.",

        objetivo:
            "Promover el aprendizaje significativo, el trabajo colaborativo y el desarrollo de habilidades mediante proyectos que relacionen los saberes escolares con el contexto.",

        imagenPrincipal:
            "Imagenes/Proyectos/Ciclo3/portada.jpg",

        fotos: [
            "Imagenes/Proyectos/Ciclo3/c3-10.jpg",
            "Imagenes/Proyectos/Ciclo3/c3-9.jpg",
            "Imagenes/Proyectos/Ciclo3/c3-8.jpg"
           "Imagenes/Proyectos/Ciclo3/c3-7.jpg"
           "Imagenes/Proyectos/Ciclo3/c3-6.jpg"
           "Imagenes/Proyectos/Ciclo3/c3-5.jpg"
           "Imagenes/Proyectos/Ciclo3/c3-4.jpg"
           "Imagenes/Proyectos/Ciclo3/c3-3.jpg"
           "Imagenes/Proyectos/Ciclo3/c3-2.jpg"
           "Imagenes/Proyectos/Ciclo3/c3-1.jpg"
           
        ],

        videos: [
            {
                titulo: "Presentación del proyecto",
                descripcion: "Conoce las experiencias del Ciclo 3.",
                id: "ID_VIDEO_YOUTUBE_2"
            }
        ]
    },


    ciclo4: {
        nombre: "Ciclo 4",
        titulo: "Astronomía y robótica",

        resumen:
            "Exploración del universo y el impacto de la robótica en la astronomía.",

        descripcion:
            "El proyecto de Ciclo 4 está orientado a la exploración del universo, el conocimiento de los cuerpos celestes y la comprensión de los fenómenos astronómicos. Se busca relacionar la astronomía con los avances tecnológicos y el impacto de la robótica en la exploración espacial.",

        objetivo:
            "Desarrollar experiencias de investigación, experimentación y creación que permitan comprender fenómenos astronómicos y reconocer las aplicaciones de la robótica en la exploración del espacio.",

        imagenPrincipal:
            "Imagenes/Proyectos/Ciclo4/portada.jpg",

        fotos: [
            "Imagenes/Proyectos/Ciclo4/c4-1.jpg",
            "Imagenes/Proyectos/Ciclo4/c4-2.jpg",
            "Imagenes/Proyectos/Ciclo4/c4-3.jpg",
            "Imagenes/Proyectos/Ciclo4/c4-4.jpg"
        ],

        videos: [
            {
                titulo: "Explorando el universo",
                descripcion: "Experiencias y actividades de astronomía.",
                id: "ID_VIDEO_YOUTUBE_3"
            },
            {
                titulo: "Astronomía y robótica",
                descripcion: "La tecnología y la exploración espacial.",
                id: "ID_VIDEO_YOUTUBE_4"
            }
        ]
    },


    ciclo5: {
        nombre: "Ciclo 5",
        titulo: "Proyecto de Ciclo 5",

        resumen:
            "Investigación, innovación y construcción de proyectos.",

        descripcion:
            "Este espacio presenta los proyectos, experiencias de aprendizaje y actividades desarrolladas por los estudiantes del Ciclo 5.",

        objetivo:
            "Fortalecer las competencias académicas, investigativas y ciudadanas mediante el desarrollo de proyectos que permitan a los estudiantes aplicar sus conocimientos en situaciones reales.",

        imagenPrincipal:
            "Imagenes/Proyectos/Ciclo5/portada.jpg",

        fotos: [
            "Imagenes/Proyectos/Ciclo5/foto-01.jpg",
            "Imagenes/Proyectos/Ciclo5/foto-02.jpg",
            "Imagenes/Proyectos/Ciclo5/foto-03.jpg"
        ],

        videos: [
            {
                titulo: "Presentación del proyecto",
                descripcion: "Conoce las experiencias del Ciclo 5.",
                id: "ID_VIDEO_YOUTUBE_5"
            }
        ]
    }

};


/* ==========================================================
   2. VARIABLES GENERALES
   ========================================================== */

const ordenCiclos = [
    "inicial",
    "ciclo3",
    "ciclo4",
    "ciclo5"
];

let cicloActual = "";
let indiceFoto = 0;


/* ==========================================================
   3. INICIAR PÁGINA
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const parametros = new URLSearchParams(
        window.location.search
    );

    cicloActual = parametros.get("ciclo");

    if (!cicloActual || !proyectos[cicloActual]) {
        mostrarErrorCiclo();
        return;
    }

    cargarCiclo(cicloActual);

    configurarControlesCarrusel();

    agregarEstilosVideos();

});


/* ==========================================================
   4. CARGAR INFORMACIÓN DEL CICLO
   ========================================================== */

function cargarCiclo(ciclo) {

    const datos = proyectos[ciclo];

    if (!datos) {
        mostrarErrorCiclo();
        return;
    }

    cicloActual = ciclo;
    indiceFoto = 0;

    // Título de la pestaña
    document.title =
        datos.nombre +
        " | Proyectos de Ciclos - Colegio León de Greiff";

    // Encabezado de la portada
    asignarTexto("#titulo-ciclo", datos.titulo);
    asignarTexto("#resumen-ciclo", datos.resumen);

    // Información del proyecto
    asignarTexto("#titulo-proyecto", datos.titulo);
    asignarTexto("#descripcion-proyecto", datos.descripcion);
    asignarTexto("#proposito-proyecto", datos.objetivo);

    // Imagen destacada
    const imagen = document.querySelector("#imagen-destacada");

    if (imagen) {
        imagen.src = datos.imagenPrincipal;
        imagen.alt = datos.titulo;
        imagen.style.display = "";

        imagen.onerror = function () {
            this.style.display = "none";
        };
    }

    // Galería
    mostrarGaleria(datos.fotos);

    // Videos
    mostrarVideos(datos.videos);

    // Navegación entre ciclos
    actualizarNavegacion();

}


/* ==========================================================
   5. ACTUALIZAR TEXTO DE LOS ELEMENTOS
   ========================================================== */

function asignarTexto(selector, texto) {

    const elemento = document.querySelector(selector);

    if (elemento) {
        elemento.textContent = texto || "";
    }

}


/* ==========================================================
   6. CONFIGURAR CONTROLES DEL CARRUSEL
   ========================================================== */

function configurarControlesCarrusel() {

    const botonAnterior =
        document.querySelector("#carrusel .anterior");

    const botonSiguiente =
        document.querySelector("#carrusel .siguiente");

    if (botonAnterior) {

        botonAnterior.type = "button";

        botonAnterior.addEventListener("click", function () {
            cambiarFoto(-1);
        });

    }

    if (botonSiguiente) {

        botonSiguiente.type = "button";

        botonSiguiente.addEventListener("click", function () {
            cambiarFoto(1);
        });

    }

}


/* ==========================================================
   7. MOSTRAR GALERÍA DE FOTOGRAFÍAS
   ========================================================== */

function mostrarGaleria(fotos) {

    const carrusel = document.querySelector("#carrusel");
    const indicadores = document.querySelector("#indicadores");

    if (!carrusel) return;

    // Eliminar solamente las imágenes anteriores.
    // Se conservan los botones originales del HTML.
    carrusel.querySelectorAll(".carrusel-imagen").forEach(
        function (imagen) {
            imagen.remove();
        }
    );

    if (indicadores) {
        indicadores.innerHTML = "";
    }

    indiceFoto = 0;

    if (!fotos || fotos.length === 0) {

        mostrarMensajeGaleria(
            carrusel,
            "Próximamente publicaremos fotografías de este proyecto."
        );

        return;
    }

    fotos.forEach(function (ruta, indice) {

        const imagen = document.createElement("img");

        imagen.src = ruta;

        imagen.alt =
            "Fotografía " +
            (indice + 1) +
            " del proyecto " +
            proyectos[cicloActual].nombre;

        imagen.className = "carrusel-imagen";

        imagen.loading = "lazy";

        if (indice === 0) {
            imagen.classList.add("activa");
        }

        imagen.onerror = function () {
            this.style.display = "none";

            const punto = indicadores
                ? indicadores.children[indice]
                : null;

            if (punto) {
                punto.style.display = "none";
            }
        };

        // Insertar las imágenes antes de los controles.
        const botonAnterior =
            carrusel.querySelector(".anterior");

        carrusel.insertBefore(imagen, botonAnterior);

        // Crear indicador
        if (indicadores) {

            const punto = document.createElement("button");

            punto.type = "button";

            punto.className = "punto";

            punto.setAttribute(
                "aria-label",
                "Ver fotografía " + (indice + 1)
            );

            punto.addEventListener("click", function () {
                seleccionarFoto(indice);
            });

            if (indice === 0) {
                punto.classList.add("activo");
            }

            indicadores.appendChild(punto);

        }

    });

    actualizarEstadoGaleria();

}


/* ==========================================================
   8. MENSAJE CUANDO NO HAY FOTOGRAFÍAS
   ========================================================== */

function mostrarMensajeGaleria(carrusel, mensaje) {

    const texto = document.createElement("p");

    texto.className = "mensaje-sin-contenido";

    texto.textContent = mensaje;

    carrusel.insertBefore(
        texto,
        carrusel.querySelector(".anterior")
    );

}


/* ==========================================================
   9. CAMBIAR FOTOGRAFÍA
   ========================================================== */

function cambiarFoto(direccion) {

    const imagenes =
        document.querySelectorAll("#carrusel .carrusel-imagen");

    if (!imagenes.length) return;

    indiceFoto += direccion;

    if (indiceFoto >= imagenes.length) {
        indiceFoto = 0;
    }

    if (indiceFoto < 0) {
        indiceFoto = imagenes.length - 1;
    }

    actualizarEstadoGaleria();

}


/* ==========================================================
   10. SELECCIONAR FOTOGRAFÍA POR INDICADOR
   ========================================================== */

function seleccionarFoto(indice) {

    const imagenes =
        document.querySelectorAll("#carrusel .carrusel-imagen");

    if (indice < 0 || indice >= imagenes.length) return;

    indiceFoto = indice;

    actualizarEstadoGaleria();

}


/* ==========================================================
   11. ACTUALIZAR ESTADO DEL CARRUSEL
   ========================================================== */

function actualizarEstadoGaleria() {

    const imagenes =
        document.querySelectorAll("#carrusel .carrusel-imagen");

    const indicadores =
        document.querySelectorAll("#indicadores .punto");

    imagenes.forEach(function (imagen, indice) {

        imagen.classList.toggle(
            "activa",
            indice === indiceFoto
        );

    });

    indicadores.forEach(function (punto, indice) {

        punto.classList.toggle(
            "activo",
            indice === indiceFoto
        );

    });

}


/* ==========================================================
   12. MOSTRAR VIDEOS DE YOUTUBE
   ========================================================== */

function mostrarVideos(videos) {

    const contenedor =
        document.querySelector("#rejilla-videos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (!videos || videos.length === 0) {

        mostrarMensajeVideos(
            contenedor,
            "Próximamente publicaremos videos de este proyecto."
        );

        return;
    }

    let cantidadVideos = 0;

    videos.forEach(function (video) {

        // Validar el identificador de YouTube.
        // Los identificadores tienen 11 caracteres.
        if (
            !video.id ||
            !/^[a-zA-Z0-9_-]{11}$/.test(video.id)
        ) {
            return;
        }

        cantidadVideos++;

        // Tarjeta
        const tarjeta = document.createElement("article");

        tarjeta.className = "tarjeta-video";

        // Reproductor
        const reproductor = document.createElement("iframe");

        reproductor.src =
            "https://www.youtube-nocookie.com/embed/" +
            encodeURIComponent(video.id);

        reproductor.title =
            video.titulo || "Video del proyecto";

        reproductor.loading = "lazy";

        reproductor.referrerPolicy =
            "strict-origin-when-cross-origin";

        reproductor.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

        reproductor.allowFullscreen = true;

        // Información del video
        const informacion = document.createElement("div");

        informacion.className = "video-info";

        const titulo = document.createElement("h3");

        titulo.textContent =
            video.titulo || "Video del proyecto";

        const descripcion = document.createElement("p");

        descripcion.textContent =
            video.descripcion || "";

        informacion.appendChild(titulo);

        if (video.descripcion) {
            informacion.appendChild(descripcion);
        }

        tarjeta.appendChild(reproductor);
        tarjeta.appendChild(informacion);

        contenedor.appendChild(tarjeta);

    });

    if (cantidadVideos === 0) {

        mostrarMensajeVideos(
            contenedor,
            "Próximamente publicaremos videos de este proyecto."
        );

    }

}


/* ==========================================================
   13. MENSAJE CUANDO NO HAY VIDEOS
   ========================================================== */

function mostrarMensajeVideos(contenedor, mensaje) {

    const texto = document.createElement("p");

    texto.className = "mensaje-sin-contenido";

    texto.textContent = mensaje;

    contenedor.appendChild(texto);

}


/* ==========================================================
   14. ESTILOS PARA LOS REPRODUCTORES YOUTUBE
   ========================================================== */

function agregarEstilosVideos() {

    if (document.querySelector("#estilos-videos-youtube")) {
        return;
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-videos-youtube";

    estilos.textContent = `
        .tarjeta-video iframe {
            display: block;
            width: 100%;
            aspect-ratio: 16 / 9;
            height: auto;
            border: 0;
            background: #000;
        }

        .tarjeta-video {
            overflow: hidden;
        }

        .tarjeta-video .video-info {
            padding: 17px;
        }

        .tarjeta-video .video-info h3 {
            margin: 0 0 7px;
            color: #176b3a;
            font-size: 17px;
        }

        .tarjeta-video .video-info p {
            margin: 0;
            color: #66736a;
            font-size: 13px;
            line-height: 1.6;
        }

        #rejilla-videos {
            min-width: 0;
        }

        #rejilla-videos iframe {
            max-width: 100%;
        }

        @media (max-width: 750px) {
            .tarjeta-video iframe {
                width: 100%;
            }
        }
    `;

    document.head.appendChild(estilos);

}


/* ==========================================================
   15. NAVEGACIÓN ENTRE CICLOS
   ========================================================== */

function actualizarNavegacion() {

    const indiceActual =
        ordenCiclos.indexOf(cicloActual);

    const botonAnterior =
        document.querySelector("#ciclo-anterior");

    const botonSiguiente =
        document.querySelector("#ciclo-siguiente");

    // Ciclo anterior
    if (botonAnterior) {

        if (indiceActual > 0) {

            const cicloAnterior =
                ordenCiclos[indiceActual - 1];

            botonAnterior.href =
                "detalle-ciclo.html?ciclo=" + cicloAnterior;

            botonAnterior.style.display = "";

        } else {

            botonAnterior.style.display = "none";

        }

    }

    // Ciclo siguiente
    if (botonSiguiente) {

        if (indiceActual < ordenCiclos.length - 1) {

            const cicloSiguiente =
                ordenCiclos[indiceActual + 1];

            botonSiguiente.href =
                "detalle-ciclo.html?ciclo=" + cicloSiguiente;

            botonSiguiente.style.display = "";

        } else {

            botonSiguiente.style.display = "none";

        }

    }

}


/* ==========================================================
   16. CICLO NO ENCONTRADO
   ========================================================== */

function mostrarErrorCiclo() {

    const contenido =
        document.querySelector(".detalle-contenido");

    if (!contenido) return;

    contenido.innerHTML = `
        <div class="mensaje-sin-contenido">
            <h2>Proyecto no encontrado</h2>

            <p>
                No fue posible encontrar la información del ciclo solicitado.
            </p>

            <a href="proyectos-ciclos.html">
                Volver a Proyectos de Ciclos
            </a>
        </div>
    `;

}
