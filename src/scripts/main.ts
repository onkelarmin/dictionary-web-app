import { initAnimations } from "@scripts/features/animations";
import { initLenis } from "@scripts/features/scroll";
import { initFontSelector } from "./features/fontSelector";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initLenis();
  initFontSelector();
});
