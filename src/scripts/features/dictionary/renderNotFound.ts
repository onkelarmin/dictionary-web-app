export function renderNotFound(message: string, resolution: string) {
  const results = document.querySelector<HTMLElement>("#results");
  const notFoundTemplate = document.querySelector<HTMLTemplateElement>(
    "#not-found-template",
  );

  if (!results || !notFoundTemplate) {
    if (import.meta.env.DEV) {
      throw new Error("Required DOM element missing");
    }
    console.error("Required DOM element missing");
    return;
  }

  results.replaceChildren();

  const clone = notFoundTemplate.content.cloneNode(true) as DocumentFragment;

  const messageElement = clone.querySelector<HTMLParagraphElement>(".message");
  const resolutionElement =
    clone.querySelector<HTMLParagraphElement>(".resolution");

  if (!messageElement || !resolutionElement) {
    if (import.meta.env.DEV) {
      throw new Error("Required DOM element missing");
    }
    console.error("Required DOM element missing");
    return;
  }

  messageElement.textContent = message;
  resolutionElement.textContent = resolution;

  results.appendChild(clone);
}
