
/* ==========================================================
   COLEGIO DISTRITAL LEÓN DE GREIFF I.E.D.
   PROYECTOS DE CICLOS
   Archivo: js/detalle-ciclo.js
   ========================================================== */

/* ----------------------------------------------------------
   1. INFORMACIÓN Y RUTAS DE LOS PROYECTOS
   --------------------------------------------------------- */

const proyectos = {
    inicial: {
        nombre: "Ciclo Inicial",
        titulo: "Proyecto de Ciclo Inicial",
        resumen: "Experiencias de aprendizaje, exploración y desarrollo integral.",
        descripcion: "En este espacio se presentan las experiencias, actividades y proyectos desarrollados por los estudiantes del Ciclo Inicial.",
        objetivo: "Fortalecer los procesos de aprendizaje mediante experiencias pedagógicas significativas que promuevan la exploración, la creatividad y el desarrollo integral.",
        fotos: [],
        videos: []
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

    imagenPrincipal: "img/Proyectos/Ciclo3/c3-1.jpg",

    fotos: [
        "img/Proyectos/Ciclo3/c3-1.jpg",
        "img/Proyectos/Ciclo3/c3-2.jpg",
        "img/Proyectos/Ciclo3/c3-3.jpg",
        "img/Proyectos/Ciclo3/c3-4.jpg",
        "img/Proyectos/Ciclo3/c3-10.jpg"
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
        resumen: "Exploración del universo y el impacto de la robótica en la astronomía.",
        descripcion: "El proyecto de Ciclo 4 está orientado a la exploración del universo, el conocimiento de los cuerpos celestes y la comprensión de los fenómenos astronómicos. Se busca relacionar la astronomía con los avances tecnológicos y el impacto de la robótica en la exploración espacial.",
        objetivo: "Desarrollar experiencias de investigación, experimentación y creación que permitan comprender fenómenos astronómicos y reconocer las aplicaciones de la robótica en la exploración del espacio.",

        // Agrega aquí las rutas cuando cargues las fotografías.
           fotos: [
        "img/Proyectos/Ciclo4/c4-1.jpg",
        "img/Proyectos/Ciclo4/c4-2.jpg",
        "img/Proyectos/Ciclo4/c4-3.jpg",
        "img/Proyectos/Ciclo4/c4-4.jpg",
        
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
        resumen: "Investigación, innovación y construcción de proyectos.",
        descripcion: "Este espacio presenta los proyectos, experiencias de aprendizaje y actividades desarrolladas por los estudiantes del Ciclo 5.",
        objetivo: "Fortalecer las competencias académicas, investigativas y ciudadanas mediante el desarrollo de proyectos que permitan a los estudiantes aplicar sus conocimientos en situaciones reales.",

        // Agrega aquí las rutas cuando cargues las fotografías.
        fotos: [],

        videos: [
            {
                titulo: "Presentación del proyecto",
                descripcion: "Conoce las experiencias del Ciclo 5.",
                id: "ID_VIDEO_YOUTUBE_5"
            }
        ]
    }
};


/* ----------------------------------------------------------
   2. VARIABLES GENERALES
   ---------------------------------------------------------- */

const ordenCiclos = [
    "inicial",
    "ciclo3",
    "ciclo4",
    "ciclo5"
];

let cicloActual = "";
let indiceFoto = 0;
let fotosDisponibles = [];


/* ----------------------------------------------------------
   3. INICIALIZAR LA PÁGINA
   ---------------------------------------------------------- */

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


/* ----------------------------------------------------------
   4. CARGAR INFORMACIÓN DEL CICLO
   ---------------------------------------------------------- */

function cargarCiclo(ciclo) {

    const datos = proyectos[ciclo];

    if (!datos) {
        mostrarErrorCiclo();
        return;
    }

    cicloActual = ciclo;
    indiceFoto = 0;
    fotosDisponibles = [];

    document.title =
        datos.nombre +
        " | Proyectos de Ciclos - Colegio León de Greiff";

    asignarTexto("#titulo-ciclo", datos.titulo);
    asignarTexto("#resumen-ciclo", datos.resumen);

    asignarTexto("#titulo-proyecto", datos.titulo);
    asignarTexto("#descripcion-proyecto", datos.descripcion);
    asignarTexto("#proposito-proyecto", datos.objetivo);

    cargarImagenDestacada(datos.fotos);

    mostrarGaleria(datos.fotos);

    mostrarVideos(datos.videos);

    actualizarNavegacion();
}


/* ----------------------------------------------------------
   5. ASIGNAR TEXTOS
   ---------------------------------------------------------- */

function asignarTexto(selector, texto) {

    const elemento = document.querySelector(selector);

    if (elemento) {
        elemento.textContent = texto || "";
    }
}


/* ----------------------------------------------------------
   6. CARGAR IMAGEN DESTACADA
   ---------------------------------------------------------- */

function cargarImagenDestacada(fotos) {

    const imagen = document.querySelector("#imagen-destacada");

    if (!imagen) return;

    imagen.removeAttribute("src");
    imagen.style.display = "none";

    if (!fotos || fotos.length === 0) return;

    const primeraFoto = new Image();

    primeraFoto.onload = function () {

        imagen.src = primeraFoto.src;
        imagen.alt = proyectos[cicloActual].titulo;
        imagen.style.display = "block";

    };

    primeraFoto.onerror = function () {

        console.error(
            "No se pudo cargar la imagen destacada:",
            fotos[0]
        );

    };

    primeraFoto.src = fotos[0];
}


/* ----------------------------------------------------------
   7. CONTROLES DEL CARRUSEL
   ---------------------------------------------------------- */

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


/* ----------------------------------------------------------
   8. CARGAR Y VALIDAR LAS FOTOGRAFÍAS
   ---------------------------------------------------------- */

function mostrarGaleria(fotos) {

    const carrusel = document.querySelector("#carrusel");
    const indicadores = document.querySelector("#indicadores");

    if (!carrusel) return;

    // Eliminar imágenes anteriores.
    carrusel.querySelectorAll(".carrusel-imagen").forEach(
        imagen => imagen.remove()
    );

    // Eliminar mensajes anteriores.
    carrusel.querySelectorAll(".mensaje-sin-contenido").forEach(
        mensaje => mensaje.remove()
    );

    if (indicadores) {
        indicadores.innerHTML = "";
    }

    indiceFoto = 0;
    fotosDisponibles = [];

    if (!fotos || fotos.length === 0) {

        mostrarMensajeGaleria(
            carrusel,
            "Próximamente publicaremos fotografías de este proyecto."
        );

        return;
    }

    // Comprobar cada fotografía antes de incorporarla.
    const comprobaciones = fotos.map(function (ruta) {

        return new Promise(function (resolve) {

            const imagen = new Image();

            imagen.onload = function () {
                resolve({
                    ruta: ruta,
                    correcta: true
                });
            };

            imagen.onerror = function () {

                console.error(
                    "ERROR: No se pudo cargar la fotografía:",
                    ruta
                );

                resolve({
                    ruta: ruta,
                    correcta: false
                });

            };

            // Ruta relativa al directorio raíz del sitio.
            imagen.src = ruta;

        });

    });

    Promise.all(comprobaciones).then(function (resultados) {

        fotosDisponibles = resultados
            .filter(resultado => resultado.correcta)
            .map(resultado => resultado.ruta);

        if (fotosDisponibles.length === 0) {

            mostrarMensajeGaleria(
                carrusel,
                "No se encontraron fotografías disponibles. Verifica los nombres y las rutas de las imágenes."
            );

            return;
        }

        construirCarrusel();

    });
}


/* ----------------------------------------------------------
   9. CONSTRUIR EL CARRUSEL
   ---------------------------------------------------------- */

function construirCarrusel() {

    const carrusel = document.querySelector("#carrusel");
    const indicadores = document.querySelector("#indicadores");

    if (!carrusel) return;

    fotosDisponibles.forEach(function (ruta, indice) {

        const imagen = document.createElement("img");

        imagen.src = ruta;
        imagen.alt =
            "Fotografía " +
            (indice + 1) +
            " del proyecto " +
            proyectos[cicloActual].nombre;

        imagen.className = "carrusel-imagen";

        imagen.loading = "eager";
        imagen.decoding = "async";

        if (indice === 0) {
            imagen.classList.add("activa");
        }

        // Insertar antes de los botones.
        const botonAnterior =
            carrusel.querySelector(".anterior");

        carrusel.insertBefore(imagen, botonAnterior);

        // Crear indicador.
        if (indicadores) {

            const punto = document.createElement("button");

            punto.type = "button";
            punto.className = "punto";

            punto.setAttribute(
                "aria-label",
                "Ver fotografía " + (indice + 1)
            );

            if (indice === 0) {
                punto.classList.add("activo");
            }

            punto.addEventListener("click", function () {
                seleccionarFoto(indice);
            });

            indicadores.appendChild(punto);

        }

    });

    actualizarEstadoGaleria();

    // Mostrar controles solamente si hay más de una fotografía.
    const controles = carrusel.querySelectorAll(".control-carrusel");

    controles.forEach(function (control) {
        control.style.display =
            fotosDisponibles.length > 1 ? "block" : "none";
    });
}


/* ----------------------------------------------------------
   10. MENSAJE DE GALERÍA VACÍA
   ---------------------------------------------------------- */

function mostrarMensajeGaleria(carrusel, mensaje) {

    const texto = document.createElement("p");

    texto.className = "mensaje-sin-contenido";
    texto.textContent = mensaje;

    const botonAnterior =
        carrusel.querySelector(".anterior");

    carrusel.insertBefore(texto, botonAnterior);

    const controles =
        carrusel.querySelectorAll(".control-carrusel");

    controles.forEach(control => {
        control.style.display = "none";
    });

}


/* ----------------------------------------------------------
   11. CAMBIAR FOTOGRAFÍA
   ---------------------------------------------------------- */

function cambiarFoto(direccion) {

    if (fotosDisponibles.length <= 1) return;

    indiceFoto += direccion;

    if (indiceFoto >= fotosDisponibles.length) {
        indiceFoto = 0;
    }

    if (indiceFoto < 0) {
        indiceFoto = fotosDisponibles.length - 1;
    }

    actualizarEstadoGaleria();
}


/* ----------------------------------------------------------
   12. SELECCIONAR FOTOGRAFÍA
   ---------------------------------------------------------- */

function seleccionarFoto(indice) {

    if (
        indice < 0 ||
        indice >= fotosDisponibles.length
    ) {
        return;
    }

    indiceFoto = indice;

    actualizarEstadoGaleria();
}


/* ----------------------------------------------------------
   13. ACTUALIZAR IMAGEN E INDICADORES
   ---------------------------------------------------------- */

function actualizarEstadoGaleria() {

    const imagenes =
        document.querySelectorAll(
            "#carrusel .carrusel-imagen"
        );

    const indicadores =
        document.querySelectorAll(
            "#indicadores .punto"
        );

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


/* ----------------------------------------------------------
   14. MOSTRAR VIDEOS DE YOUTUBE
   ---------------------------------------------------------- */

function mostrarVideos(videos) {

    const contenedor =
        document.querySelector("#rejilla-videos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    let cantidadVideos = 0;

    (videos || []).forEach(function (video) {

        // Evitar mostrar identificadores provisionales.
        if (
            !video.id ||
            !/^[a-zA-Z0-9_-]{11}$/.test(video.id)
        ) {
            return;
        }

        cantidadVideos++;

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-video";

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

        const informacion = document.createElement("div");
        informacion.className = "video-info";

        const titulo = document.createElement("h3");
        titulo.textContent = video.titulo || "Video del proyecto";

        const descripcion = document.createElement("p");
        descripcion.textContent = video.descripcion || "";

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


/* ----------------------------------------------------------
   15. MENSAJE CUANDO NO HAY VIDEOS
   ---------------------------------------------------------- */

function mostrarMensajeVideos(contenedor, mensaje) {

    const texto = document.createElement("p");

    texto.className = "mensaje-sin-contenido";
    texto.textContent = mensaje;

    contenedor.appendChild(texto);

}


/* ----------------------------------------------------------
   16. ESTILOS DE LOS VIDEOS
   ---------------------------------------------------------- */

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
    `;

    document.head.appendChild(estilos);

}


/* ----------------------------------------------------------
   17. NAVEGACIÓN ENTRE CICLOS
   ---------------------------------------------------------- */

function actualizarNavegacion() {

    const indiceActual =
        ordenCiclos.indexOf(cicloActual);

    const botonAnterior =
        document.querySelector("#ciclo-anterior");

    const botonSiguiente =
        document.querySelector("#ciclo-siguiente");

    if (botonAnterior) {

        if (indiceActual > 0) {

            botonAnterior.href =
                "detalle-ciclo.html?ciclo=" +
                ordenCiclos[indiceActual - 1];

            botonAnterior.style.display = "";

        } else {

            botonAnterior.style.display = "none";

        }

    }

    if (botonSiguiente) {

        if (indiceActual < ordenCiclos.length - 1) {

            botonSiguiente.href =
                "detalle-ciclo.html?ciclo=" +
                ordenCiclos[indiceActual + 1];

            botonSiguiente.style.display = "";

        } else {

            botonSiguiente.style.display = "none";

        }

    }

}


/* ----------------------------------------------------------
   18. CICLO NO ENCONTRADO
   ---------------------------------------------------------- */

function mostrarErrorCiclo() {

    const contenido =
        document.querySelector(".detalle-contenido");

    if (!contenido) return;

    contenido.innerHTML = `
        <div class="mensaje-sin-contenido">
            <h2>Proyecto no encontrado</h2>
            <p>
                No fue posible encontrar la información
                del ciclo solicitado.
            </p>
            <a href="proyectos-ciclos.html">
                Volver a Proyectos de Ciclos
            </a>
        </div>
    `;

}
