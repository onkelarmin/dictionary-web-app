import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  getData: defineAction({
    accept: "form",
    input: z.object({
      search: z.string().min(1, { message: "Whoops, can’t be empty…" }),
    }),
    handler: async (input) => {
      const searchTerm = input.search.trim();

      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`,
      );

      if (!res.ok) {
        throw new Error("Upstream service failed");
      }

      return res.json();
    },
  }),
};
