<script setup lang="ts">
import ColorMode from "~/components/ColorMode.vue";

const navLink = [
	{
		path: "/",
		name: "Home",
	},
	{
		path: "/projects",
		name: "Projects",
	},
	{
		path: "/blog",
		name: "Blog",
	},
];
</script>

<template>
	<div class="px-4 flex flex-col items-center justify-center">
		<header class="flex items-center justify-between my-auto w-full max-w-2xl mt-16">
			<WebsiteLogo />
			<nav class="flex content-center mx-4 ">
				<ul class="flex gap-4">
					<li
						v-for="link in navLink"
						:key="link.path"
						class="hover:text-chart-2 font-semibold"
					>
						<NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
					</li>
				</ul>
			</nav>
			<ColorMode />
		</header>
		<main class="w-full py-16">
			<div class="max-w-2xl mx-auto">
				<slot />
			</div>
		</main>
		<footer class="mb-4 text-sm opacity-75">
			2025 - Built by <NuxtLink
				to="/"
				class="hover:text-chart-2 font-semibold"
			>Nabil-Y</NuxtLink>
		</footer>
	</div>
</template>
