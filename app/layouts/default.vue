<template>
	<div>
		<header>
			<nav>
				<ul>
					<li>
						<NuxtLink to="/">Home</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/projects">Projects</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/blog">Blog</NuxtLink>
					</li>
				</ul>
			</nav>
		</header>
		<main>
			<slot />
		</main>
	</div>
</template>
