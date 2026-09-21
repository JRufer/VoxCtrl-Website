// Fallback for .reveal elements in browsers without CSS scroll-driven
// animations (animation-timeline: view()). Native browsers skip this file's
// work entirely — see css/design-system.css for the feature detection.
(() => {
  if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
