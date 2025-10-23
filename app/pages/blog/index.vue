<script setup lang="ts">
const { data: posts } = await useAsyncData("blogs", () =>
	queryCollection("blog").order("date", "DESC").all(),
);

useSeoMeta({
	title: "Blog",
	description: "Blog",
});
</script>

<template>
	<div>
		<h1 class="font-semibold text-4xl mb-4">
			Articles
		</h1>

		<p class="mb-16 max-w-sm">
			May contain tutorials about what I've learned or my two cents about the tech industry
		</p>

		<nav>
			<ul class="flex flex-col gap-8">
				<li
					v-for="post in posts"
					:key="post.path"
					class="group"
				>
					<NuxtLink
						:to="{ name: 'blog-slug', params: { slug: post.path } }"
					>
						<div class="flex justify-between items-end pb-3">
							<h2 class="group-hover:text-chart-2  font-semibold">{{ post.title }}</h2>
							<span class="text-sm">{{ post.readingTime }} min read</span>
						</div>
						<p class="text-sm opacity-75">{{ post.description }}</p>
					</Nuxtlink>
				</li>
			</ul>
		</nav>
	</div>
</template>
