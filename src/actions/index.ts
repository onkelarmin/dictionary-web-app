import {
  apiNotFoundSchema,
  apiSuccessSchema,
  searchSchema,
} from "@/schemas/search";
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
          const result = apiNotFoundSchema.safeParse(json);
          if (!result.success) {
            throw new ActionError({
              code: "BAD_GATEWAY",
              message: "Unexpected 404 response shape from dictionary API",
            });
          } else
            return {
              status: "not_found" as const,
              payload: result.data,
            };
        }

        throw new ActionError({
          code: "BAD_GATEWAY",
          message: "Failed to fetch dictionary data.",
        });
      }

      const result = apiSuccessSchema.safeParse(json);
      if (!result.success) {
        throw new ActionError({
          code: "BAD_GATEWAY",
          message: "Unexpected response shape from dictionary API",
        });
      } else
        return {
          status: "success" as const,
          payload: result.data,
        };
    },
  }),
};
