// API Response

export type ApiPhonetic = {
  text?: string;
  audio?: string;
};

export type ApiDefinition = {
  definition: string;
  example?: string;
};

export type ApiMeaning = {
  partOfSpeech: string;
  definitions: ApiDefinition[];
  synonyms: string[];
  antonyms: string[];
};

export type ApiEntry = {
  word: string;
  phonetic: string;
  phonetics: ApiPhonetic[];
  meanings: ApiMeaning[];
  sourceUrls: string[];
};

export type ApiResponse = ApiEntry[];

// Internal App

export type Definition = {
  text: string;
  example?: string;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
};

export type WordData = {
  word: string;
  phonetic?: string;
  audio?: string;
  meanings: Meaning[];
  source: string;
};
