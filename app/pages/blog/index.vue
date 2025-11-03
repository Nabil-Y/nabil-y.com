<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { data: posts } = await useAsyncData("blogs", () =>
	queryCollection("blog").order("date", "ASC").all(),
);

useSeoMeta({
	title: "Blog",
	description: "Blog articles and tutorials about web development and tech industry",
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
						<div class="flex justify-between pb-3">
							<div class="flex items-center gap-2 group-hover:text-chart-2 ">
								<h2 class="font-semibold">{{ post.title }}</h2>
								<Icon
									icon="radix-icons:arrow-right"
									class="translate-y-[1px] h-4 w-4 scale-0 group-hover:scale-100 transition-transform duration-300"
									aria-hidden="true"
								/>
							</div>
							<span class="text-sm">{{ post.readingTime }} min read</span>
						</div>
						<p class="text-sm opacity-75">{{ post.description }}</p>
					</Nuxtlink>
				</li>
			</ul>
		</nav>
	</div>
</template>
