let observer: IntersectionObserver | null = null;
// Se pone a true la primera vez que el observer entrega entradas.
// Sirve para distinguir "el observer funciona" de "el observer nunca arrancó".
let observerFired = false;

// Si el observer nunca arranca (hidratación fallida o muy lenta), mostramos el
// contenido tras este tiempo para que nunca quede invisible de forma permanente.
const FALLBACK_DELAY = 2000;

function reveal(el: Element) {
  el.setAttribute("data-revealed", "true");
}

function getObserver() {
  if (observer) return observer;
  if (typeof window === "undefined") return null;
  if (!("IntersectionObserver" in window)) return null;
  observer = new IntersectionObserver(
    (entries) => {
      observerFired = true;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
  );
  return observer;
}

export function observeReveal(el: Element): () => void {
  const obs = getObserver();
  // Sin IntersectionObserver el contenido se muestra de inmediato.
  if (!obs) {
    reveal(el);
    return () => {};
  }
  obs.observe(el);
  // Red de seguridad: solo revela si el observer nunca llegó a activarse.
  // Cuando funciona, observerFired ya es true y el contenido bajo el pliegue
  // sigue oculto hasta que el scroll lo haga visible.
  const fallback = window.setTimeout(() => {
    if (!observerFired) reveal(el);
  }, FALLBACK_DELAY);
  return () => {
    window.clearTimeout(fallback);
    obs.unobserve(el);
  };
}
