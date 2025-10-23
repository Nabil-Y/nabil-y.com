// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/content",
		"@nuxt/eslint",
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
	],
	devtools: { enabled: true },
	colorMode: {
		classSuffix: "",
	},
	compatibilityDate: "2025-07-15",
	hooks: {
		"content:file:afterParse"(ctx) {
			const { file, content } = ctx;

			const wordsPerMinute = 180;
			const text = file.body;
			const wordCount = text.split(/\s+/).length;

			content.readingTime = Math.ceil(wordCount / wordsPerMinute);
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: "tab",
				semi: true,
				quotes: "double",
			},
		},
	},
	shadcn: {
		prefix: "",
		componentDir: "@/components/ui",
	},
});
