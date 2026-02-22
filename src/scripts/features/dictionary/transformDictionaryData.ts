import type { ApiEntry, WordData } from "@/types/dictionary";

export function transformDictionaryData(apiData: ApiEntry): WordData {
  return {
    word: apiData.word,
    phonetic: apiData.phonetics.find((p) => p.text)?.text,
    audio: apiData.phonetics.find((p) => p.audio)?.audio,
    meanings: apiData.meanings.map((m) => ({
      partOfSpeech: m.partOfSpeech,
      definitions: m.definitions.map((d) => ({
        text: d.definition,
        example: d.example,
      })),
      synonyms: m.synonyms,
      antonyms: m.antonyms,
    })),
    source: apiData.sourceUrls ? apiData.sourceUrls[0] : undefined,
  };
}
