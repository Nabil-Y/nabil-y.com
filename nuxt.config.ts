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
		componentDir: "./components/ui",
	},
});
