import { z } from "astro:schema";

export const searchSchema = z.object({
  search: z.preprocess(
    (val) => val ?? "",
    z.string().trim().min(1, { message: "Whoops, can’t be empty…" }),
  ),
});
