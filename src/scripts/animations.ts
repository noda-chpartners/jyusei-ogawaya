const page = document.querySelector('.page');
const animTargets = document.querySelectorAll('.anim-target, .anim-stagger-group');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const showAll = () => {
  page?.classList.add('is-loaded');
  animTargets.forEach((el) => el.classList.add('is-visible'));
};

if (prefersReducedMotion) {
  showAll();
} else {
  requestAnimationFrame(() => {
    page?.classList.add('is-loaded');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  animTargets.forEach((el) => observer.observe(el));
}
