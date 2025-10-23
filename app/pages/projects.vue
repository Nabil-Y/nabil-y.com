<script lang="ts" setup>
const { data: projects } = await useAsyncData("projects", () => {
	return queryCollection("projects").all();
});

useSeoMeta({
	title: "Projects",
	description: "Projects",
});
</script>

<template>
	<div>
		<h1 class="font-semibold text-4xl mb-4">
			Projects
		</h1>

		<p class="mb-16 max-w-sm">
			Some of the projects I've worked on
		</p>

		<div class="flex flex-col gap-12">
			<ProjectItem
				v-for="project in projects"
				:key="project.title"
				v-bind="project"
			/>
		</div>
	</div>
</template>
