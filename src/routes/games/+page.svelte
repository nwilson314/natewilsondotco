<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	
	let { games } = data;
	let currentTime = new Date();
	
	const gameQuips = [
		"Powered by caffeine and stubbornness ⚡",
		"Made with questionable life choices 🎮", 
		"Built during many late nights 🌙",
		"Fueled by indie game dreams 💭",
		"Crafted with geometric precision 📐",
		"Warning: may contain traces of fun 🎯",
		"Side effects include time loss ⏰",
		"Made by someone who should sleep more 😴"
	];
	
	let randomQuip = gameQuips[Math.floor(Math.random() * gameQuips.length)];

	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	function formatLastUpdated() {
		return currentTime.toLocaleString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Games - Nate Wilson</title>
	<meta name="description" content="Games I've built while learning game development and experimenting with different ideas" />
</svelte:head>

<div class="py-8">
	<!-- Header -->
	<div class="mb-12">
		<div class="border-2 border-dashed border-red-300 dark:border-red-700 rounded-lg p-6 bg-red-50 dark:bg-red-950/20">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
				🎮 The Game Archive
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-1">
				Games I've built while learning game development and experimenting with different ideas
			</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Last updated: {formatLastUpdated()} • Games completed: {games.filter(g => g.status === 'complete').length}
			</p>
		</div>
	</div>

	<!-- Games Grid -->
	{#if games.length > 0}
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each games as game}
				<div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
					{#if game.playable && game.status === 'complete'}
						<a href="/games/{game.id}" class="block">
							<div class="flex items-center gap-2 mb-2">
								<span class="text-2xl">🎯</span>
								<h2 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
									{game.title}
								</h2>
							</div>
						</a>
					{:else}
						<div class="flex items-center gap-2 mb-2">
							<span class="text-2xl">{game.status === 'in-progress' ? '⚡' : '📋'}</span>
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">
								{game.title}
							</h2>
						</div>
					{/if}
					
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						{game.excerpt}
					</p>
					
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							{#if game.status === 'complete'}
								<span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
									Complete
								</span>
							{:else if game.status === 'in-progress'}
								<span class="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
									In Progress
								</span>
							{:else}
								<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded">
									Planned
								</span>
							{/if}
						</div>
						
						{#if game.playable && game.status === 'complete'}
							<a href="/games/{game.id}" class="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">
								→ Play Now
							</a>
						{:else if game.status === 'in-progress'}
							<span class="text-sm text-gray-500 dark:text-gray-400">Coming Soon™</span>
						{:else}
							<span class="text-sm text-gray-400 dark:text-gray-500">Future Plans</span>
						{/if}
					</div>
					
					{#if game.technologies && game.technologies.length > 0}
						<div class="mt-3 flex flex-wrap gap-1">
							{#each game.technologies.slice(0, 3) as tech}
								<span class="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
									{tech}
								</span>
							{/each}
							{#if game.technologies.length > 3}
								<span class="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded">
									+{game.technologies.length - 3}
								</span>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-gray-500 dark:text-gray-400 italic mb-4">Loading games from the archive...</p>
			<div class="animate-spin text-2xl">🎮</div>
		</div>
	{/if}

	<!-- ASCII Art Footer -->
	<div class="mt-16 text-center">
		<pre class="text-xs text-gray-400 dark:text-gray-600 font-mono leading-tight">╔════════════════════════════════════════╗
║  {randomQuip.padEnd(36)}  ║
╚════════════════════════════════════════╝</pre>
	</div>
</div>