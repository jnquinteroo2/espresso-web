let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  if (typeof window === "undefined") return null;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-revealed", "true");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
  );
  return observer;
}

export function observeReveal(el: Element) {
  const obs = getObserver();
  if (!obs) return;
  obs.observe(el);
}

export function unobserveReveal(el: Element) {
  observer?.unobserve(el);
}
