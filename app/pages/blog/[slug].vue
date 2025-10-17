<script setup lang="ts">
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
		<ContentRenderer
			v-if="page"
			:value="page"
		/>
	</div>
</template>
