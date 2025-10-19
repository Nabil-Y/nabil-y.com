<script setup lang="ts">
import ColorMode from "~/components/ui/color-mode/ColorMode.vue";

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
	<div class="px-4  flex flex-col items-center justify-center">
		<header class="flex items-center justify-between my-auto w-full max-w-2xl py-16">
			<WebsiteLogo />
			<nav class="flex content-center mx-4 ">
				<ul class="flex gap-4">
					<li
						v-for="link in navLink"
						:key="link.path"
						class="hover:text-chart-2 focus-within:text-chart-2 cursor-pointer"
					>
						<NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
					</li>
				</ul>
			</nav>
			<ColorMode />
		</header>
		<main>
			<slot />
		</main>
	</div>
</template>
