// Vida Café — navegación móvil

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");

  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!nav.classList.contains("is-open")) return;
    closeNav();
  });
});

// Vida Café — títulos "arcoíris": cada letra de los títulos/subtítulos en
// Bold Crayola, incluido el "Vida Café" del hero, toma un color distinto de
// la paleta de crayón, para que se vean con más vida. El "Vida Café" del
// logo en el header queda fuera a propósito — ese se deja en negro (color
// de tinta normal) vía CSS.
document.addEventListener("DOMContentLoaded", () => {
  // Colores oscurecidos respecto a los --accent-* de style.css lo justo para
  // pasar contraste AA (4.5:1) sobre blanco en texto normal — los h3 de las
  // tarjetas (ej. "Talleres de arte", "Horario") son texto chico sin negrita,
  // así que no califican como "large text" y necesitan el mínimo estricto.
  const RAINBOW_COLORS = ["#ad631f", "#d53f2a", "#4a814d", "#4879a7", "#8766af", "#cf3e71"];

  const headings = document.querySelectorAll("h1, h2, h3");
  headings.forEach((heading) => {
    const textNodes = [];
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }

    let colorIndex = 0;
    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      textNode.textContent.split("").forEach((char) => {
        if (char.trim() === "") {
          fragment.appendChild(document.createTextNode(char));
          return;
        }
        const span = document.createElement("span");
        span.className = "rainbow-letter";
        span.textContent = char;
        span.style.color = RAINBOW_COLORS[colorIndex % RAINBOW_COLORS.length];
        colorIndex += 1;
        fragment.appendChild(span);
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  });
});

// Vida Café — mapa de Google bajo demanda: el iframe de Google Maps es
// pesado y tardaba mucho en cargar en móvil aunque tuviera loading="lazy"
// (lazy solo retrasa cuándo se pide, no lo hace más ligero). Así que no se
// incrusta hasta que el usuario toca el botón — recién ahí se crea el
// <iframe> y empieza la descarga.
document.addEventListener("DOMContentLoaded", () => {
  const mapButton = document.querySelector(".location-map-load");
  if (!mapButton) return;

  mapButton.addEventListener(
    "click",
    () => {
      const iframe = document.createElement("iframe");
      iframe.title = "Mapa de ubicación de Vida Café";
      iframe.src = mapButton.dataset.mapSrc;
      iframe.width = "100%";
      iframe.height = "380";
      iframe.style.border = "0";
      iframe.loading = "lazy";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      mapButton.replaceWith(iframe);
    },
    { once: true }
  );
});
