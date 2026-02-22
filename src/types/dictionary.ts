// API Response

import type {
  apiDefinitionSchema,
  apiEntrySchema,
  apiMeaningSchema,
  apiPhoneticSchema,
  apiSuccessSchema,
  apiNotFoundSchema,
} from "@/schemas/search";
import type { z } from "astro:schema";

export type ApiPhonetic = z.infer<typeof apiPhoneticSchema>;

export type ApiDefinition = z.infer<typeof apiDefinitionSchema>;

export type ApiMeaning = z.infer<typeof apiMeaningSchema>;

export type ApiEntry = z.infer<typeof apiEntrySchema>;

export type ApiSuccess = z.infer<typeof apiSuccessSchema>;
export type ApiNotFound = z.infer<typeof apiNotFoundSchema>;

export type ActionResponse =
  | { status: "not_found"; payload: ApiNotFound }
  | {
      status: "success";
      payload: ApiSuccess;
    };

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
  source?: string;
};
