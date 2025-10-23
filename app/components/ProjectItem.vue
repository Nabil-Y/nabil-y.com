<script setup lang="ts">
defineProps<{
	title: string;
	description: string;
	image: string;
	url: string;
	repo: string;
	tags: string[];
	date: string;
}>();
</script>

<template>
	<section>
		<img
			:src="image"
			:alt="description"
			class="shadow rounded aspect-video"
		>
		<div class="flex flex-col gap-4 justify-start my-4">
			<h2 class="font-semibold text-xl">
				{{ title }}
			</h2>

			<div class="flex flex-wrap gap-2">
				<Tag
					v-for="tag in tags"
					:key="tag"
				>
					{{ tag }}
				</Tag>
			</div>
			<p class="line-clamp-4">
				{{ description }}
			</p>
			<div class="flex gap-4">
				Visit
				<a
					class=" underline font-semibold hover:text-chart-2"
					target="_blank"
					:href="url"
				>Live Demo</a>
				<a
					class=" underline font-semibold hover:text-chart-2"
					target="_blank"
					:href="repo"
				>Repo</a>
			</div>
		</div>
	</section>
</template>
