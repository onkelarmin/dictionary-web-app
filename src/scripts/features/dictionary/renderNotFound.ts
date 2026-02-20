export function renderNotFound(message: string, resolution: string) {
  const results = document.querySelector<HTMLElement>("#results");
  const notFoundTemplate = document.querySelector<HTMLTemplateElement>(
    "#not-found-template",
  );

  if (!results) throw new Error("Results div missing");
  if (!notFoundTemplate) throw new Error("Not found template missing");

  results.replaceChildren();

  const clone = notFoundTemplate.content.cloneNode(true) as DocumentFragment;

  const messageElement = clone.querySelector<HTMLParagraphElement>(".message");
  const resolutionElement =
    clone.querySelector<HTMLParagraphElement>(".resolution");

  if (!messageElement || !resolutionElement)
    throw new Error("Necessary template children missing");

  messageElement.textContent = message;
  resolutionElement.textContent = resolution;

  results.appendChild(clone);
}
