import { z } from "astro:schema";

export const searchSchema = z.object({
  search: z.preprocess(
    (val) => val ?? "",
    z.string().trim().min(1, { message: "Whoops, can’t be empty…" }),
  ),
});

export const apiNotFoundSchema = z.object({
  title: z.string(),
  message: z.string(),
  resolution: z.string(),
});

export const apiPhoneticSchema = z.object({
  text: z.string().optional(),
  audio: z.string().optional(),
});

export const apiDefinitionSchema = z.object({
  definition: z.string(),
  example: z.string().optional(),
});

export const apiMeaningSchema = z.object({
  partOfSpeech: z.string(),
  definitions: z.array(apiDefinitionSchema),
  synonyms: z.array(z.string()).default([]),
  antonyms: z.array(z.string()).default([]),
});

export const apiEntrySchema = z.object({
  word: z.string(),
  phonetic: z.string().optional(),
  phonetics: z.array(apiPhoneticSchema).default([]),
  meanings: z.array(apiMeaningSchema),
  sourceUrls: z.array(z.string()).optional(),
});

export const apiSuccessSchema = z.array(apiEntrySchema).min(1);
