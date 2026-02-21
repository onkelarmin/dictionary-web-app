export function initTriggerResearch() {
  const results = document.querySelector<HTMLElement>("#results");
  const searchForm = document.querySelector<HTMLFormElement>("#searchbar-from");
  const searchInputField =
    document.querySelector<HTMLInputElement>("#searchbar-input");

  if (!results || !searchForm || !searchInputField) {
    if (import.meta.env.DEV) {
      throw new Error("Required DOM element missing");
    }
    console.error("Required DOM element missing");
    return;
  }

  results.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const researchButton = target.closest('button[data-trigger="research"]');

    if (!researchButton) return;

    const searchTerm = researchButton.textContent;

    searchInputField.value = searchTerm;
    searchForm.requestSubmit();
  });
}
