export function initFontSelector() {
  const root = document.documentElement;
  const popoverToggleSpan = document.querySelector<HTMLSpanElement>(
    "#font-popover-toggle .current",
  );
  const popoverMenu = document.querySelector<HTMLElement>("#font-popover-menu");
  const radioInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>(
      '#font-popover-menu input[type="radio"]',
    ),
  );

  if (!popoverToggleSpan || !popoverMenu || radioInputs.length === 0)
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

  const updateUI = () => {
    root.dataset.font = font;
    updatePopoverToggle();
    checkRadioInput();
    popoverMenu.hidePopover();
  };

  const updatePopoverToggle = () => {
    const fontLabel = fontLabels[font];
    popoverToggleSpan.textContent = fontLabel;
  };
  const setLocalStorage = () => {
    localStorage.setItem(storageKey, font);
  };
  const checkRadioInput = () => {
    radioInputs.forEach((input) => {
      input.checked = input.value === font;
    });
  };

  popoverMenu.addEventListener("change", (e) => {
    const target = e.target;

    if (!(target instanceof HTMLInputElement)) return;

    font = target.value as Font;

    setLocalStorage();

    if (!document.startViewTransition) {
      updateUI();
      return;
    }

    document.startViewTransition(() => {
      updateUI();
    });
  });

  updatePopoverToggle();
  checkRadioInput();
}
