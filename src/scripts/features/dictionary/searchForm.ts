import { actions } from "astro:actions";
import { transformDictionaryData } from "./transformDictionaryData";
import { renderResults } from "./renderResults";

import type { ApiResponse } from "@/scripts/types/dictionary";

export function initSearchForm() {
  const searchForm = document.querySelector<HTMLFormElement>("#searchbar-from");

  if (!searchForm) throw new Error("Search form missing");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);

    const { data, error } = await actions.getData(formData);

    if (error) {
      console.error("Action failed:", error.message);
      return;
    }

    if (data) {
      const apiResponse: ApiResponse = data;
      const wordData = transformDictionaryData(apiResponse[0]);

      renderResults(wordData);
    }
  });
}
