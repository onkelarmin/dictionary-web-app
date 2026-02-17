import type { ApiEntry, WordData } from "@/scripts/types/dictionary";

export function transformDictionaryData(apiData: ApiEntry): WordData {
  console.log(apiData);
  return {
    word: apiData.word,
    phonetic: apiData.phonetic,
    audio: apiData.phonetics.find((i) => i.audio)?.audio,
    meanings: apiData.meanings.map((m) => ({
      partOfSpeech: m.partOfSpeech,
      definitions: m.definitions.map((d) => ({
        text: d.definition,
        example: d.example,
      })),
      synonyms: m.synonyms,
      antonyms: m.antonyms,
    })),
  };
}
