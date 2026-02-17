import { initAnimations } from "@scripts/features/animations";
import { initLenis } from "@scripts/features/scroll";
import { initFontSelector } from "./features/fontSelector";
import { initThemeSwitch } from "./features/themeSwitch";
import { initSearchForm } from "./features/dictionary/searchForm";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initLenis();
  initFontSelector();
  initThemeSwitch();
  initSearchForm();
});
