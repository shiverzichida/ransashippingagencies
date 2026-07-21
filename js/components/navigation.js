export function setupNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  const serviceSelect = document.querySelector('select[name="service"]');
  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    menu?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };
  toggle?.addEventListener("click", () => {
    const isOpen = menu?.classList.toggle("is-open") ?? false;
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", () => {
      if (serviceSelect) {
        serviceSelect.value = link.dataset.route ?? serviceSelect.value;
      }
    });
  });
  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();
}
