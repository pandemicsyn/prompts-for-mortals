import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const incantations = defineCollection({
  loader: glob({ base: "./src/content/incantations", pattern: "**/*.md" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    school: z.string(),
    rarity: z.enum(["common", "rare", "epic", "legendary"]),
    difficulty: z.number().int().min(1).max(5),
    castTime: z.string(),
    icon: z.enum(["desktop", "mobile", "web", "cli", "extension", "bot", "static", "api"]),
    reagents: z.array(z.string()).min(1),
    effect: z.string(),
    stack: z.array(z.string()).min(1),
    summary: z.string(),
  }),
});

export const collections = { incantations };
