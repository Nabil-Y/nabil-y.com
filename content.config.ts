import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: "page",
			source: "blog/*.md",
			schema: z.object({
				date: z.string(),
				readingTime: z.number(),
			}),
		}),
		projects: defineCollection({
			type: "data",
			source: "projects/*.yml",
			schema: z.object({
				title: z.string().nonempty(),
				description: z.string().nonempty(),
				image: z.string().nonempty().editor({ input: "media" }),
				url: z.string().nonempty(),
				repo: z.string().nonempty(),
				tags: z.array(z.string()),
				date: z.string(),
			}),
		}),
	},
});
