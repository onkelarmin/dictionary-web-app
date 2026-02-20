import type { Definition, Meaning, WordData } from "@/types/dictionary";
import { getLenis } from "../scroll/lenis";

export function renderResults(wordData: WordData) {
  const wordHeaderTemplate = document.querySelector<HTMLTemplateElement>(
    "#word-header-template",
  );
  const detailsTemplate =
    document.querySelector<HTMLTemplateElement>("#details-template");
  const definitionsListItemTemplate =
    document.querySelector<HTMLTemplateElement>(
      "#definitions-list-item-template",
    );
  const meaningListItemTemplate = document.querySelector<HTMLTemplateElement>(
    "#meaning-list-item-template",
  );
  const synonymsTemplate =
    document.querySelector<HTMLTemplateElement>("#synonyms-template");
  const antonymsTemplate =
    document.querySelector<HTMLTemplateElement>("#antonyms-template");
  const flexListItemTemplate = document.querySelector<HTMLTemplateElement>(
    "#flex-list-item-template",
  );
  const sourceTemplate =
    document.querySelector<HTMLTemplateElement>("#source-template");
  const results = document.querySelector<HTMLElement>("#results");

  if (!results) throw new Error("Results div missing");

  results.replaceChildren();

  if (
    !wordHeaderTemplate ||
    !detailsTemplate ||
    !definitionsListItemTemplate ||
    !meaningListItemTemplate ||
    !synonymsTemplate ||
    !antonymsTemplate ||
    !flexListItemTemplate ||
    !sourceTemplate
  )
    throw new Error("required DOM templates missing");

  const generateWordHeader = (data: WordData) => {
    const clone = wordHeaderTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;

    const word = clone.querySelector<HTMLHeadingElement>(".word");
    const phonetic = clone.querySelector<HTMLParagraphElement>(".phonetic");
    const audioButton = clone.querySelector<HTMLButtonElement>(".audio-button");

    if (!word || !phonetic || !audioButton)
      throw new Error("Word header DOM elements are missing");

    word.textContent = data.word;
    phonetic.textContent = data.phonetic ?? "No phonetic available";
    if (data.audio) {
      audioButton.dataset.audio = data.audio;
    } else {
      audioButton.disabled = true;
    }

    return clone;
  };

  const generateDefinitionsListItem = (data: Definition) => {
    const clone = definitionsListItemTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;

    const text = clone.querySelector<HTMLParagraphElement>(".definition");
    const example = clone.querySelector<HTMLParagraphElement>(".example");

    if (!text || !example)
      throw new Error("Definition list item elements are missing");

    text.textContent = data.text;

    if (data.example) {
      example.textContent = data.example;
    } else {
      example.remove();
    }

    return clone;
  };

  const generateSynonyms = (data: string[]) => {
    const clone = synonymsTemplate.content.cloneNode(true) as DocumentFragment;

    const list = clone.querySelector<HTMLUListElement>(".synonyms-list");

    if (!list) throw new Error("Synonym list is missing in DOM");

    data.forEach((synonym) => {
      const listItem = generateFlexListItem(synonym);

      list.appendChild(listItem);
    });

    return clone;
  };

  const generateAntonyms = (data: string[]) => {
    const clone = antonymsTemplate.content.cloneNode(true) as DocumentFragment;

    const list = clone.querySelector<HTMLUListElement>(".antonyms-list");

    if (!list) throw new Error("Antonym list is missing in DOM");

    data.forEach((antonym) => {
      const listItem = generateFlexListItem(antonym);

      list.appendChild(listItem);
    });

    return clone;
  };

  const generateFlexListItem = (data: string) => {
    const clone = flexListItemTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;

    const button = clone.querySelector<HTMLButtonElement>("button");

    if (!button) throw new Error("Button element missing");

    button.dataset.trigger = "research";
    button.textContent = data;

    return clone;
  };

  const generateMeaningListItem = (data: Meaning) => {
    const clone = meaningListItemTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;

    const meaningTitle = clone.querySelector<HTMLHeadingElement>(
      ".meaning-title .text",
    );
    const definitionList =
      clone.querySelector<HTMLUListElement>(".definitions-list");

    if (!meaningTitle || !definitionList)
      throw new Error("Details DOM elements are missing");

    meaningTitle.textContent = data.partOfSpeech;

    data.definitions.forEach((definition) => {
      const listItem = generateDefinitionsListItem(definition);
      definitionList.appendChild(listItem);
    });

    if (data.synonyms.length > 0) {
      const synonyms = generateSynonyms(data.synonyms);
      definitionList.appendChild(synonyms);
    }

    if (data.antonyms.length > 0) {
      const antonyms = generateAntonyms(data.antonyms);
      definitionList.appendChild(antonyms);
    }

    return clone;
  };

  const generateDetails = (data: WordData) => {
    const clone = detailsTemplate.content.cloneNode(true) as DocumentFragment;

    const meaningList = clone.querySelector<HTMLUListElement>(".meaning-list");

    if (!meaningList) throw new Error("Details DOM elements are missing");

    data.meanings.forEach((meaning) => {
      const listItem = generateMeaningListItem(meaning);

      meaningList.appendChild(listItem);
    });

    return clone;
  };

  const generateSource = (data: WordData) => {
    const clone = sourceTemplate.content.cloneNode(true) as DocumentFragment;

    const link = clone.querySelector<HTMLAnchorElement>(".link > a");

    if (!link) throw new Error("Source link missing");

    link.href = data.source;
    link.textContent = data.source;

    return clone;
  };

  const wordHeader = generateWordHeader(wordData);
  const details = generateDetails(wordData);
  const source = generateSource(wordData);

  results.appendChild(wordHeader);
  results.appendChild(details);
  results.appendChild(source);

  const lenis = getLenis();
  lenis.scrollTo(0, { duration: 0.6 });
}
