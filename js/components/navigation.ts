export function setupNavigation(): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-nav-menu]");
  const serviceSelect = document.querySelector<HTMLSelectElement>('select[name="service"]');

  const setHeaderState = (): void => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  const closeMenu = (): void => {
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

  document.querySelectorAll<HTMLAnchorElement>("[data-route]").forEach((link) => {
    link.addEventListener("click", () => {
      if (serviceSelect) {
        serviceSelect.value = link.dataset.route ?? serviceSelect.value;
      }
    });
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();
}
