<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	
	let { posts, projects, games } = data;
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
		<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 font-sans">
			Now
		</h2>
		<ul class="space-y-2 text-gray-700 dark:text-gray-300">
			<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600 font-serif">
				<strong>Learning:</strong> Database Internals, Systems Programming in Go
			</li>
			<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600 font-serif">
				<strong>Reading:</strong> Database Internals and <a href="https://eatonphil.com/2026-ostep.html" target="_blank" rel="noopener noreferrer">Operating Systems: Three Easy Pieces</a>
			</li>
			<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600 font-serif">
				<strong>Recently finished:</strong> Ironman Ohio 2025
			</li>
		</ul>
	</section>

	<!-- Projects -->
	<section class="mb-10">
		<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 font-sans">
			Projects
		</h2>
		{#if projects.length > 0}
			<ul class="space-y-4">
				{#each projects.slice(0, 5) as project}
					<li class="pl-4 border-l-2 {project.status === 'in-progress' ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600'} group">
						<div class="flex items-baseline justify-between mb-1">
							<a href="/projects/{project.id}" class="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans tracking-tight no-underline">
								{project.title}
							</a>
							{#if project.status === 'in-progress'}
								<span class="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">active</span>
							{/if}
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400 font-serif leading-relaxed">
							{project.excerpt}
						</p>
					</li>
				{/each}
			</ul>
			<p class="mt-4 pl-4">
				<a href="/projects" class="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-sans uppercase tracking-wide no-underline">View all projects →</a>
			</p>
		{:else}
			<p class="text-gray-500 dark:text-gray-400 font-sans">Loading...</p>
		{/if}
	</section>

	{#if posts.length > 0}
		<!-- Writing -->
		<section class="mb-10">
			<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 font-sans">
				Writing
			</h2>
			<ul class="space-y-4">
				{#each posts.slice(0, 5) as post}
					<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600 group">
						<a href="/blog/{post.id}" class="block no-underline">
							<span class="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans tracking-tight">
								{post.title}
							</span>
							<span class="block text-sm text-gray-600 dark:text-gray-400 mt-1 font-serif leading-relaxed">
								{post.excerpt}
							</span>
						</a>
					</li>
				{/each}
			</ul>
			<p class="mt-4 pl-4">
				<a href="/blog" class="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-sans uppercase tracking-wide no-underline">View all posts →</a>
			</p>
		</section>
	{/if}

	{#if games.length > 0}
		<!-- Games -->
		<section class="mb-10">
			<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 font-sans">
				Games
			</h2>
			<ul class="space-y-4">
				{#each games.slice(0, 3) as game}
					<li class="pl-4 border-l-2 {game.playable ? 'border-green-500 dark:border-green-400' : 'border-gray-300 dark:border-gray-600'} group">
						<div class="flex items-baseline justify-between mb-1">
							<a href="/games/{game.id}" class="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans tracking-tight no-underline">
								{game.title}
							</a>
							{#if game.playable}
								<a href="/play/{game.id}/index.html" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-green-600 dark:text-green-400 hover:underline">play →</a>
							{/if}
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400 font-serif leading-relaxed">
							{game.excerpt}
						</p>
					</li>
				{/each}
			</ul>
			<p class="mt-4 pl-4">
				<a href="/games" class="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-sans uppercase tracking-wide no-underline">View all games →</a>
			</p>
		</section>
	{/if}

	<!-- Links -->
	<section class="mb-10">
		<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 font-sans">
			Elsewhere
		</h2>
		<ul class="space-y-2">
			<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600"><a href="https://github.com/nwilson314" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-sans font-medium">GitHub</a></li>
			<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600"><a href="https://linkedin.com/in/natewilson2" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-sans font-medium">LinkedIn</a></li>
			<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600"><a href="/contact" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-sans font-medium">Contact</a></li>
			<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600"><a href="/Nate_Wilson_Resume_2025.pdf" download class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-sans font-medium">Resume</a></li>
		</ul>
	</section>

	<!-- Simple footer note -->
	<footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
		<p class="text-sm text-gray-400 dark:text-gray-500 text-center">
			Thanks for stopping by.
		</p>
	</footer>
</div>
