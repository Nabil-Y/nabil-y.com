<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
	error: Object as () => NuxtError,
});

const errorCode = computed(() => {
	return props.error?.statusCode || 500;
});
</script>

<template>
	<NuxtLayout>
		<section class="p-4">
			<h1 class="text-4xl pt-16 pb-8 font-semibold">
				{{ errorCode }}
			</h1>

			<p
				v-if="error?.message"
				class="py-8 text-2xl"
			>
				{{ error.message }}
			</p>

			<NuxtLink
				to="/"
				class="py-4 hover:text-chart-2 font-semibold"
			>Go back home</NuxtLink>
		</section>
	</NuxtLayout>
</template>
