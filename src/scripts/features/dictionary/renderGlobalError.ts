export function renderGlobalError(message: string) {
  const results = document.querySelector<HTMLElement>("#results");

  const globalErrorTemplate = document.querySelector<HTMLTemplateElement>(
    "#global-error-template",
  );

  if (!results || !globalErrorTemplate) {
    if (import.meta.env.DEV) {
      throw new Error("Required DOM element missing");
    }
    console.error("Required DOM element missing");
    return;
  }

  results.replaceChildren();

  const clone = globalErrorTemplate.content.cloneNode(true) as DocumentFragment;

  const messageElement = clone.querySelector<HTMLParagraphElement>(".message");

  if (!messageElement) {
    if (import.meta.env.DEV) {
      throw new Error("Required DOM element missing");
    }
    console.error("Required DOM element missing");
    return;
  }

  messageElement.textContent = message;

  results.appendChild(clone);
}
