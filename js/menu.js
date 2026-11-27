
/* =========================================
   MENÚ INSTITUCIONAL CENTRALIZADO
   Colegio Distrital León de Greiff I.E.D.
========================================= */

(function () {

    // IMPORTANTE: capturar la ruta antes de DOMContentLoaded
    const scriptURL = document.currentScript.src;

    async function cargarMenu() {

        const contenedor = document.getElementById("menu-global");

        if (!contenedor) {
            console.error("No existe el contenedor #menu-global");
            return;
        }

        // Buscar includes/menu.html desde la ubicación de js/menu.js
        const rutaMenu = new URL("../includes/menu.html", scriptURL);

        try {

            const respuesta = await fetch(rutaMenu);

            if (!respuesta.ok) {
                throw new Error("Error HTTP: " + respuesta.status);
            }

            const html = await respuesta.text();

            contenedor.innerHTML = html;

            // Identificar la página actual
            let paginaActual = window.location.pathname.split("/").pop();

            if (!paginaActual) {
                paginaActual = "index.html";
            }

            paginaActual = paginaActual.toLowerCase();

            // Activar enlace correspondiente
            const enlaces = contenedor.querySelectorAll(
                ".menu-enlaces a[data-page]"
            );

            enlaces.forEach(enlace => {

                const paginaEnlace = enlace
                    .getAttribute("data-page")
                    .toLowerCase();

                if (paginaEnlace === paginaActual) {
                    enlace.classList.add("activo");
                    enlace.setAttribute("aria-current", "page");
                }

            });

            // Menú responsive
            const boton = contenedor.querySelector(".menu-toggle");
            const navegacion = contenedor.querySelector(".menu-enlaces");

            if (boton && navegacion) {

                boton.addEventListener("click", function () {

                    const abierto =
                        navegacion.classList.toggle("abierto");

                    boton.setAttribute(
                        "aria-expanded",
                        String(abierto)
                    );

                });

                // Cerrar al seleccionar una opción
                navegacion.querySelectorAll("a").forEach(enlace => {

                    enlace.addEventListener("click", function () {

                        navegacion.classList.remove("abierto");

                        boton.setAttribute("aria-expanded", "false");

                    });

                });

            }

            console.log("Menú institucional cargado correctamente.");

        } catch (error) {

            console.error("Error al cargar el menú:", error);

            contenedor.innerHTML = `
                <div class="menu-error">
                    No fue posible cargar la navegación institucional.
                    <a href="index.html">Ir al inicio</a>
                </div>
            `;

        }

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", cargarMenu);
    } else {
        cargarMenu();
    }

})();
