export function initPlayAudio() {
  const results = document.querySelector<HTMLElement>("#results");

  if (!results) throw new Error("Results element is missing");

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
