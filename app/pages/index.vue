<script lang="ts" setup>
import { BorderBeam } from "~/components/ui/border-beam";
import { BlurReveal } from "~/components/ui/blur-reveal";

useSeoMeta({
	title: "Nabil Yassine",
	description: "Nabil Yassine portfolio website",
});

const skillsFront = [
	"HTML", "CSS", "Javascript", "Typescript", "Vue", "Nuxt", "Vite", "React", "Svelte", "Accessibility", "TailwindCSS", "Vitest", "Figma",
];

const skillsBack = [
	"Node.js", "Express", "Golang", "Linux", "Docker", "Kubernetes", "Microsoft Azure", "Jest", "SQL", "Postgres", "Microservices", "LLM APIs",
];
</script>

<template>
	<div>
		<section class="h-[260px]">
			<ClientOnly>
				<div class="relative flex w-full gap-4 flex-col items-center justify-center overflow-hidden rounded-lg p-6">
					<BlurReveal
						:delay="0.1"
						:duration="0.4"
					>
						<h1 class="font-semibold text-4xl mt-4">
							Nabil Yassine
						</h1>
						<h2 class="font-semibold text-3xl my-4">
							Full stack developer
						</h2>
						<p>
							Crafting web apps with a keen eye for user experience since 2022.
						</p>
						<p class="my-2">
							Based in Paris, I'm always eager to learn more about software engineering.
						</p>
					</BlurReveal>
					<BorderBeam
						:size="250"
						:duration="10"
						:delay="10"
						:border-width="3"
						color-from="oklch(0.6 0.118 184.704)"
						color-to="oklch(0.696 0.17 162.48)"
					/>
				</div>
			</ClientOnly>
		</section>
		<section class="m-6">
			<div class="mb-6">
				<h3 class="text-lg font-medium mb-2 pt-6">
					Experiences
				</h3>
				<ul class="flex flex-col gap-2">
					<li>
						2023 - Present: Full stack developer at
						<a
							target="_blank"
							class="hover:text-chart-2 font-semibold"
							href="https://neomi.immo/"
						>
							Neomi
						</a>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-lg font-medium mb-2">
					Education
				</h3>
				<ul class="flex flex-col gap-2">
					<li>
						2023:
						<a
							target="_blank"
							class="hover:text-chart-2 font-semibold"
							href="https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/"
						>
							Certified Kubernetes Application Developer (CKAD)
						</a>
					</li>
					<li>
						2022:
						<a
							target="_blank"
							class="hover:text-chart-2 font-semibold"
							href="https://openclassrooms.com/fr/paths/516-developpeur-dapplication-javascript-react"
						>
							OpenClassrooms React Web App Developer
						</a>
					</li>
				</ul>
			</div>
		</section>
		<section class="m-6">
			<h3 class="text-lg font-medium mb-2">
				Skills
			</h3>
			<div class="flex flex-wrap items-center gap-2 py-4">
				<div class="text-sm font-medium">
					Frontend
				</div>
				<Tag
					v-for="skill in skillsFront"
					:key="skill"
				>
					{{ skill }}
				</Tag>
			</div>
			<div class="flex flex-wrap items-center gap-2 py-4">
				<div class="text-sm font-medium">
					Backend
				</div>
				<Tag
					v-for="skill in skillsBack"
					:key="skill"
				>
					{{ skill }}
				</Tag>
			</div>
		</section>
	</div>
</template>
