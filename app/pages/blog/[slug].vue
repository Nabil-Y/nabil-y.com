<script setup lang="ts">
import { Icon } from "@iconify/vue";

const slug = useRoute().path.replace("/blog/", "");

const { data: page } = await useAsyncData(slug, () => {
	return queryCollection("blog").path(slug).first();
});

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});
</script>

<template>
	<div>
		<RouterLink
			class="flex gap-2 w-fit mb-8 hover:text-chart-2"
			to="/blog"
		>
			<Icon
				icon="radix-icons:arrow-left"
				class="translate-y-[1px] h-5 w-5"
			/>
			<span class="">Go back</span>
		</RouterLink>
		<article
			v-if="page"
			class="prose prose-slate dark:prose-invert prose-a:hover:text-chart-2 prose-a:no-underline"
		>
			<h1>
				{{ page.title }}
			</h1>
			<ContentRenderer
				:value="page"
			/>
		</article>
	</div>
</template>
