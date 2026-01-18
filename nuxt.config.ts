// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/content",
		"@nuxt/eslint",
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
		"nuxt-umami",
	],
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
		},
	},
	colorMode: {
		classSuffix: "",
	},
	content: {
		build: {
			markdown: {
				highlight: {
					theme: {
						default: "catppuccin-macchiato",
						dark: "catppuccin-macchiato",
					},
				},
			},
		},
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
	umami: {
		id: "d5e3f874-cd86-4fee-b143-583447ec867e",
		host: "https://umami.nylab.dev",
		autoTrack: true,
		ignoreLocalhost: true,
		domains: ["umami.nylab.dev"],
		logErrors: true,
	},
});
