export function initPlayAudio() {
  const results = document.querySelector<HTMLElement>("#results");

  if (!results) {
    if (import.meta.env.DEV) {
      throw new Error("Results element missing");
    }
    console.error("Results element missing");
    return;
  }

  results.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const audioButton = target.closest(
      ".audio-button",
    ) as HTMLButtonElement | null;

    if (!audioButton) return;

    const audioUrl = audioButton.dataset.audio;

    if (!audioUrl) return;

    new Audio(audioUrl).play();
  });
}
