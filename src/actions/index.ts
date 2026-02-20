import { searchSchema } from "@/schemas/search";
import type {
  ActionResponse,
  ApiResponse,
  DictionaryNotFound,
  DictionarySuccess,
} from "@/types/dictionary";
import { ActionError, defineAction } from "astro:actions";

export const server = {
  getData: defineAction({
    accept: "form",
    input: searchSchema,
    handler: async (input) => {
      const searchTerm = input.search.trim();

      const encodedTerm = encodeURIComponent(searchTerm);

      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodedTerm}`,
      );

      let json: unknown;

      try {
        json = await res.json();
      } catch (error) {
        throw new ActionError({
          code: "BAD_GATEWAY",
          message: "Invalid response from dictionary API",
        });
      }

      if (!res.ok) {
        if (res.status === 404) {
          return {
            status: "not_found" as const,
            payload: json as DictionaryNotFound,
          };
        }

        throw new ActionError({
          code: "BAD_GATEWAY",
          message: "Failed to fetch dictionary data.",
        });
      }

      return {
        status: "success" as const,
        payload: json as DictionarySuccess,
      };
    },
  }),
};
