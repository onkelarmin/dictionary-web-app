export function initTriggerResearch() {
  const results = document.querySelector<HTMLElement>("#results");
  const searchForm = document.querySelector<HTMLFormElement>("#searchbar-from");
  const searchInputField =
    document.querySelector<HTMLInputElement>("#searchbar-input");

  if (!results) throw new Error("Results element is missing");
  if (!searchForm || !searchInputField)
    throw new Error("Searchbar elements missing");

  results.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const researchButton = target.closest('button[data-trigger="research"]');

    if (!researchButton) return;

    const searchTerm = researchButton.textContent;

    searchInputField.value = searchTerm;
    searchForm.requestSubmit();
  });
}
