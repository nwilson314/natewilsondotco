<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	
	let { posts, projects } = data;
	let currentTime = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 60000); // Update every minute instead of every second

		return () => clearInterval(interval);
	});

	function formatDate() {
		return currentTime.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short', 
			day: 'numeric'
		});
	}
</script>

<div class="py-8 max-w-2xl">
	<!-- Intro -->
	<section class="mb-12">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
			Nate Wilson
		</h1>
		<p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
			Software engineer focused on backend systems and databases. Currently at Prevounce Health building healthcare software. Based in Ohio.
		</p>
		<p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
			Outside of work: small farm, endurance training, too many side projects.
		</p>
		<p class="text-sm text-gray-400 dark:text-gray-500">
			Last updated {formatDate()}
		</p>
	</section>

	<!-- Now -->
	<section class="mb-10">
		<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
			Now
		</h2>
		<ul class="space-y-2 text-gray-700 dark:text-gray-300">
			<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3">Learning: database internals, storage engines, systems programming in Odin</li>
			<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3">Reading: Stormlight Archive Book 3</li>
			<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3">Recently finished: Ironman Ohio 2025</li>
		</ul>
	</section>

	<!-- Projects -->
	<section class="mb-10">
		<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
			Projects
		</h2>
		{#if projects.length > 0}
			<ul class="space-y-2">
				{#each projects.slice(0, 5) as project}
					<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3">
						<a href="/projects/{project.id}" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium">
							{project.title}
						</a>
						{#if project.status === 'in-progress'}
							<span class="text-gray-400 dark:text-gray-500 text-sm ml-1">(active)</span>
						{/if}
					</li>
				{/each}
			</ul>
			<p class="mt-4 pl-3">
				<a href="/projects" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all projects →</a>
			</p>
		{:else}
			<p class="text-gray-500 dark:text-gray-400">Loading...</p>
		{/if}
	</section>

	{#if posts.length > 0}
		<!-- Writing -->
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
				Writing
			</h2>
			<ul class="space-y-2">
				{#each posts.slice(0, 5) as post}
					<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3">
						<a href="/blog/{post.id}" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium">
							{post.title}
						</a>
					</li>
				{/each}
			</ul>
			<p class="mt-4 pl-3">
				<a href="/blog" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all posts →</a>
			</p>
		</section>
	{/if}

	<!-- Links -->
	<section class="mb-10">
		<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
			Elsewhere
		</h2>
		<ul class="space-y-2">
			<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3"><a href="https://github.com/nwilson314" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">GitHub</a></li>
			<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3"><a href="https://linkedin.com/in/natewilson314" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">LinkedIn</a></li>
			<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3"><a href="/contact" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
			<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-3"><a href="/Nate_Wilson_Resume_2025.pdf" download class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Resume (PDF)</a></li>
		</ul>
	</section>

	<!-- Simple footer note -->
	<footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
		<p class="text-sm text-gray-400 dark:text-gray-500 text-center">
			Thanks for stopping by.
		</p>
	</footer>
</div>
