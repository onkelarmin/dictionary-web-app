import { initAnimations } from "@scripts/features/animations";
import { initLenis } from "@scripts/features/scroll";
import { initMobileNav } from "@scripts/features/nav";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initLenis();
  initMobileNav();
});
