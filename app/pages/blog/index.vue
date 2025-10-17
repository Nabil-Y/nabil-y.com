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
		<h1>Articles</h1>
		<ul>
			<li
				v-for="post in posts"
				:key="post.path"
			>
				<NuxtLink :to="{ name: 'blog-slug', params: { slug: post.path } }">{{ post.title }}</NuxtLink>
			</li>
		</ul>
	</div>
</template>
