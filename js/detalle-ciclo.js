
/* ==========================================================
   COLEGIO DISTRITAL LEÓN DE GREIFF I.E.D.
   PROYECTOS DE CICLOS
   Archivo: js/detalle-ciclo.js

   Funciones:
   - Cargar información de los cuatro ciclos.
   - Mostrar fotografías.
   - Navegar por la galería.
   - Reproducir videos de YouTube.
   - Navegar entre ciclos.
   ========================================================== */


/* ==========================================================
   1. INFORMACIÓN DE LOS PROYECTOS
   ========================================================== */

const proyectos = {

    inicial: {
        nombre: "Ciclo Inicial",
        titulo: "Proyecto de Ciclo Inicial",

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
                id: "ID_VIDEO_YOUTUBE_1"
            }
        ]
    },


    ciclo3: {
        nombre: "Ciclo 3",
        titulo: "Proyecto de Ciclo 3",

        descripcion:
            "En este espacio se comparten los proyectos, experiencias y actividades pedagógicas desarrolladas por los estudiantes del Ciclo 3.",

        objetivo:
            "Promover el aprendizaje significativo, el trabajo colaborativo y el desarrollo de habilidades mediante proyectos que relacionen los saberes escolares con el contexto.",

        imagenPrincipal:
            "Imagenes/Proyectos/Ciclo3/portada.jpg",

        fotos: [
            "Imagenes/Proyectos/Ciclo3/foto-01.jpg",
            "Imagenes/Proyectos/Ciclo3/foto-02.jpg",
            "Imagenes/Proyectos/Ciclo3/foto-03.jpg"
        ],

        videos: [
            {
                titulo: "Presentación del proyecto",
                id: "ID_VIDEO_YOUTUBE_2"
            }
        ]
    },


    ciclo4: {
        nombre: "Ciclo 4",
        titulo: "Astronomía y robótica",

        descripcion:
            "El proyecto de Ciclo 4 está orientado a la exploración del universo, el conocimiento de los cuerpos celestes y la comprensión de los fenómenos astronómicos. Se busca relacionar la astronomía con los avances tecnológicos y el impacto de la robótica en la exploración espacial.",

        objetivo:
            "Desarrollar experiencias de investigación, experimentación y creación que permitan comprender fenómenos astronómicos y reconocer las aplicaciones de la robótica en la exploración del espacio.",

        imagenPrincipal:
            "Imagenes/Proyectos/Ciclo4/portada.jpg",

        fotos: [
            "Imagenes/Proyectos/Ciclo4/foto-01.jpg",
            "Imagenes/Proyectos/Ciclo4/foto-02.jpg",
            "Imagenes/Proyectos/Ciclo4/foto-03.jpg",
            "Imagenes/Proyectos/Ciclo4/foto-04.jpg"
        ],

        videos: [
            {
                titulo: "Explorando el universo",
                id: "ID_VIDEO_YOUTUBE_3"
            },
            {
                titulo: "Astronomía y robótica",
                id: "ID_VIDEO_YOUTUBE_4"
            }
        ]
    },


    ciclo5: {
        nombre: "Ciclo 5",
        titulo: "Proyecto de Ciclo 5",

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
                id: "ID_VIDEO_YOUTUBE_5"
            }
        ]
    }

};


/* ==========================================================
   2. VARIABLES GENERALES
   ========================================================== */

let cicloActual = "";
let indiceFoto = 0;


/* ==========================================================
   3. INICIALIZAR LA PÁGINA
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const parametros = new URLSearchParams(window.location.search);

    cicloActual = parametros.get("ciclo");

    if (!cicloActual || !proyectos[cicloActual]) {
        mostrarErrorCiclo();
        return;
    }

    cargarCiclo(cicloActual);

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

    // Actualizar título de la pestaña
    document.title =
        datos.nombre + " | Proyectos de Ciclos - León de Greiff";

    // Actualizar encabezados
    asignarTexto(".detalle-nombre", datos.nombre);
    asignarTexto(".detalle-titulo", datos.titulo);

    // Actualizar descripción
    asignarTexto(".detalle-descripcion", datos.descripcion);

    // Actualizar objetivo
    asignarTexto(".detalle-objetivo", datos.objetivo);

    // Actualizar imagen principal
    const imagenPrincipal =
        document.querySelector(".detalle-imagen-principal");

    if (imagenPrincipal) {
        imagenPrincipal.src = datos.imagenPrincipal;
        imagenPrincipal.alt = datos.titulo;
        imagenPrincipal.onerror = function () {
            this.style.display = "none";
        };
    }

    // Cargar galería
    mostrarGaleria(datos.fotos);

    // Cargar videos
    mostrarVideos(datos.videos);

    // Actualizar navegación
    actualizarNavegacion();
}


/* ==========================================================
   5. ASIGNAR TEXTO A ELEMENTOS HTML
   ========================================================== */

function asignarTexto(selector, texto) {

    const elemento = document.querySelector(selector);

    if (elemento) {
        elemento.textContent = texto;
    }

}


/* ==========================================================
   6. MOSTRAR GALERÍA DE FOTOGRAFÍAS
   ========================================================== */

function mostrarGaleria(fotos) {

    const carrusel = document.querySelector(".carrusel");

    if (!carrusel) return;

    carrusel.innerHTML = "";

    if (!fotos || fotos.length === 0) {

        carrusel.innerHTML = `
            <p class="sin-fotos">
                Próximamente publicaremos fotografías de este proyecto.
            </p>
        `;

        return;
    }

    // Botón anterior
    const botonAnterior = document.createElement("button");

    botonAnterior.className = "anterior";
    botonAnterior.type = "button";
    botonAnterior.textContent = "❮";
    botonAnterior.setAttribute("aria-label", "Fotografía anterior");

    botonAnterior.addEventListener("click", fotoAnterior);

    // Botón siguiente
    const botonSiguiente = document.createElement("button");

    botonSiguiente.className = "siguiente";
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "❯";
    botonSiguiente.setAttribute("aria-label", "Fotografía siguiente");

    botonSiguiente.addEventListener("click", fotoSiguiente);

    carrusel.appendChild(botonAnterior);
    carrusel.appendChild(botonSiguiente);

    // Crear fotografías
    fotos.forEach(function (ruta, indice) {

        const imagen = document.createElement("img");

        imagen.src = ruta;
        imagen.alt =
            "Fotografía " + (indice + 1) + " del proyecto " + proyectos[cicloActual].nombre;

        imagen.className = "carrusel-imagen";

        imagen.loading = "lazy";

        imagen.onerror = function () {
            this.style.display = "none";
        };

        if (indice === 0) {
            imagen.classList.add("activa");
        }

        carrusel.insertBefore(imagen, botonAnterior);

    });

    actualizarContadorFotos(fotos.length);

}


/* ==========================================================
   7. CAMBIAR FOTOGRAFÍA
   ========================================================== */

function cambiarFoto(direccion) {

    const imagenes =
        document.querySelectorAll(".carrusel-imagen");

    if (!imagenes.length) return;

    imagenes[indiceFoto].classList.remove("activa");

    indiceFoto += direccion;

    if (indiceFoto >= imagenes.length) {
        indiceFoto = 0;
    }

    if (indiceFoto < 0) {
        indiceFoto = imagenes.length - 1;
    }

    imagenes[indiceFoto].classList.add("activa");

    actualizarContadorFotos(imagenes.length);

}


function fotoAnterior() {
    cambiarFoto(-1);
}


function fotoSiguiente() {
    cambiarFoto(1);
}


/* ==========================================================
   8. CONTADOR DE FOTOGRAFÍAS
   ========================================================== */

function actualizarContadorFotos(total) {

    const contador =
        document.querySelector(".contador-fotos");

    if (contador) {

        contador.textContent =
            (indiceFoto + 1) + " / " + total;

    }

}


/* ==========================================================
   9. MOSTRAR VIDEOS DE YOUTUBE
   ========================================================== */

function mostrarVideos(videos) {

    const contenedor =
        document.querySelector(".videos-contenedor");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    // Si no hay videos registrados
    if (!videos || videos.length === 0) {

        contenedor.innerHTML = `
            <p class="sin-videos">
                Próximamente publicaremos videos de este proyecto.
            </p>
        `;

        return;
    }

    let videosValidos = 0;

    videos.forEach(function (video) {

        // Validar identificador de YouTube
        if (
            !video.id ||
            !/^[a-zA-Z0-9_-]{11}$/.test(video.id)
        ) {
            return;
        }

        videosValidos++;

        // Crear tarjeta
        const tarjeta = document.createElement("div");

        tarjeta.className = "video-tarjeta";

        // Crear título
        const titulo = document.createElement("h3");

        titulo.textContent =
            video.titulo || "Video del proyecto";

        // Crear reproductor
        const reproductor = document.createElement("iframe");

        reproductor.src =
            "https://www.youtube-nocookie.com/embed/" + video.id;

        reproductor.title =
            video.titulo || "Video del proyecto";

        reproductor.loading = "lazy";

        reproductor.referrerPolicy =
            "strict-origin-when-cross-origin";

        reproductor.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

        reproductor.allowFullscreen = true;

        // Incorporar elementos
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(reproductor);

        contenedor.appendChild(tarjeta);

    });

    if (videosValidos === 0) {

        contenedor.innerHTML = `
            <p class="sin-videos">
                Próximamente publicaremos videos de este proyecto.
            </p>
        `;

    }

}


/* ==========================================================
   10. NAVEGACIÓN ENTRE CICLOS
   ========================================================== */

const ordenCiclos = [
    "inicial",
    "ciclo3",
    "ciclo4",
    "ciclo5"
];


function actualizarNavegacion() {

    const indiceActual =
        ordenCiclos.indexOf(cicloActual);

    const botonAnterior =
        document.querySelector(".ciclo-anterior");

    const botonSiguiente =
        document.querySelector(".ciclo-siguiente");

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
   11. ERROR: CICLO NO ENCONTRADO
   ========================================================== */

function mostrarErrorCiclo() {

    const contenido =
        document.querySelector(".detalle-contenido");

    if (contenido) {

        contenido.innerHTML = `
            <div class="error-ciclo">
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

}
