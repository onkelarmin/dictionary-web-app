import { actions } from "astro:actions";
import { transformDictionaryData } from "./transformDictionaryData";
import type { ApiResponse } from "@/scripts/types/dictionary";

export function initSearchForm() {
  const searchForm = document.querySelector<HTMLFormElement>("#searchbar-from");
  const results = document.querySelector<HTMLElement>("#results");
  const wordHeaderTemplate = document.querySelector<HTMLTemplateElement>(
    "#word-header-template",
  );
  const detailsTemplate =
    document.querySelector<HTMLTemplateElement>("#details-template");
  const sourceTemplate =
    document.querySelector<HTMLTemplateElement>("#source-template");

  if (
    !searchForm ||
    !results ||
    !wordHeaderTemplate ||
    !detailsTemplate ||
    !sourceTemplate
  )
    throw new Error("required DOM Elements missing");

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

      console.log(wordData);
    }

    // const generateWordHeader = (data) => {
    //   const clone = wordHeaderTemplate.content.cloneNode(true);

    //   return clone;
    // };

    // const wordHeader = generateWordHeader(data);
    // results.appendChild(wordHeader);
  });
}
