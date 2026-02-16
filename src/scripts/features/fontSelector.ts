export function initFontSelector() {
  const root = document.documentElement;
  const popoverToggleSpan = document.querySelector<HTMLSpanElement>(
    "#font-popover-toggle .current",
  );
  const popoverMenu = document.querySelector<HTMLElement>("#font-popover-menu");
  const popoverButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("#font-popover-menu button"),
  );

  if (!popoverToggleSpan || !popoverMenu || popoverButtons.length === 0)
    throw new Error("Font selector DOM structure missing");

  const storageKey = "font-preference";

  const fontOptions = ["serif", "sans", "mono"] as const;

  type Font = (typeof fontOptions)[number];

  let font = fontOptions.includes(root.dataset.font as Font)
    ? (root.dataset.font as Font)
    : "sans";

  const fontLabels: Record<Font, string> = {
    serif: "Serif",
    sans: "Sans Serif",
    mono: "Mono",
  };

  const updatePopoverToggle = () => {
    const fontLabel = fontLabels[font];
    popoverToggleSpan.textContent = fontLabel;
  };
  const setLocalStorage = () => {
    localStorage.setItem(storageKey, font);
  };

  popoverButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const newFont = button.dataset.font as Font | undefined;

      if (!newFont) throw new Error("Button misses data-font attribute");

      font = newFont;

      root.dataset.font = font;

      updatePopoverToggle();

      popoverMenu.hidePopover();

      setLocalStorage();
    });
  });

  updatePopoverToggle();
}
