/* =========================================
   CARGADOR DEL MENÚ INSTITUCIONAL
========================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const contenedor = document.getElementById("menu-global");

    if (!contenedor) {
        console.error("No se encontró el contenedor del menú institucional.");
        return;
    }

    // Ubicación del archivo menu.html a partir de menu.js
    const rutaScript = document.currentScript
        ? document.currentScript.src
        : document.querySelector('script[data-menu-script]')?.src;

    if (!rutaScript) {
        console.error("No se pudo identificar la ruta de menu.js.");
        return;
    }

    const rutaMenu = new URL("../includes/menu.html", rutaScript);

    try {

        const respuesta = await fetch(rutaMenu);

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar menu.html: " + respuesta.status);
        }

        const contenido = await respuesta.text();

        contenedor.innerHTML = contenido;

        // Identificar la página actual
        const paginaActual = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        const enlaces = contenedor.querySelectorAll(
            ".menu-enlaces a[data-page]"
        );

        enlaces.forEach(function (enlace) {

            const paginaEnlace = enlace
                .getAttribute("data-page")
                .toLowerCase();

            const esInicio = paginaActual === "" ||
                paginaActual === "index.html";

            if (
                paginaEnlace === paginaActual ||
                (esInicio && paginaEnlace === "index.html")
            ) {
                enlace.classList.add("activo");
                enlace.setAttribute("aria-current", "page");
            }

        });

        // Menú desplegable para celulares
        const boton = contenedor.querySelector(".menu-toggle");
        const navegacion = contenedor.querySelector(".menu-enlaces");

        if (boton && navegacion) {

            boton.addEventListener("click", function () {

                const abierto = navegacion.classList.toggle("abierto");

                boton.setAttribute("aria-expanded", String(abierto));

            });

            // Cerrar al seleccionar una opción
            navegacion.querySelectorAll("a").forEach(function (enlace) {

                enlace.addEventListener("click", function () {

                    navegacion.classList.remove("abierto");

                    boton.setAttribute("aria-expanded", "false");

                });

            });

        }

    } catch (error) {

        console.error("Error al cargar la navegación:", error);

        contenedor.innerHTML = `
            <div class="menu-error">
                No fue posible cargar el menú institucional.
                <a href="index.html">Ir al inicio</a>
            </div>
        `;

    }

});
