<script lang="ts">
	import { loadGame, type Game } from '$lib/utils/markdown';
	import { markdownToHtml } from '$lib/utils/markdownRenderer';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	let game: Game | null = null;
	let gameLoading = false;
	let gameInitialized = false;
	
	onMount(async () => {
		const slug = $page.params.slug;
		const loadedGame = await loadGame(slug);
		
		if (loadedGame) {
			// Convert markdown content to HTML
			loadedGame.content = markdownToHtml(loadedGame.content);
			game = loadedGame;
			
			// Initialize the game if it's playable
			if (game.playable && game.status === 'complete') {
				initializeGame(slug);
			}
		}
	});
	
	function initializeGame(slug: string) {
		if (gameInitialized) return;
		
		gameLoading = false; // No loading needed for iframe
		gameInitialized = true;
	}
</script>

<svelte:head>
	{#if game}
		<title>{game.title} - Nate Wilson</title>
		<meta name="description" content={game.excerpt} />
	{:else}
		<title>Game Loading... - Nate Wilson</title>
	{/if}
</svelte:head>

{#if game}
	<div class="py-8">
		<!-- Navigation -->
		<nav class="mb-8">
			<a href="/games" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
				← Back to Games Archive
			</a>
		</nav>
		
		<!-- Game Header -->
		<div class="mb-8">
			<div class="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-6 bg-purple-50 dark:bg-purple-950/20">
				<div class="flex items-center gap-3 mb-3">
					<span class="text-3xl">🎮</span>
					<h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
						{game.title}
					</h1>
					{#if game.status === 'complete'}
						<span class="text-sm px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
							Complete
						</span>
					{/if}
				</div>
				<p class="text-lg text-gray-600 dark:text-gray-300 mb-3">
					{game.excerpt}
				</p>
				{#if game.playable && game.status === 'complete'}
					<p class="text-sm text-gray-500 dark:text-gray-400">
						Controls: WASD to move, auto-fires at enemies • Full screen recommended
					</p>
				{/if}
			</div>
		</div>

		{#if game.playable && game.status === 'complete'}
			<!-- Game Container -->
			<div class="game-container mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
				<div class="relative border-2 border-gray-800 dark:border-gray-600 rounded-lg overflow-hidden mx-4 sm:mx-6 lg:mx-8">
					<iframe 
						src="/games/{game.id}/index.html"
						class="game-iframe w-full"
						title="{game.title}"
						allowfullscreen
					></iframe>
				</div>
				
				<div class="mt-4 text-center">
					<p class="text-sm text-gray-500 dark:text-gray-400">
						Controls: WASD to move, auto-fires at enemies • <a href="/games/{game.id}/index.html" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Open in new tab</a>
					</p>
				</div>
			</div>
		{:else}
			<!-- Not Playable Message -->
			<div class="mb-8">
				<div class="border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg p-8 bg-orange-50 dark:bg-orange-950/20 text-center">
					<span class="text-6xl mb-4 block">🚧</span>
					<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
						{game.status === 'in-progress' ? 'Work in Progress' : 'Coming Eventually™'}
					</h2>
					<p class="text-gray-600 dark:text-gray-300">
						{game.status === 'in-progress' 
							? 'This game is currently being developed. Check back later for updates!'
							: 'This game is still in the planning phase. It\'ll happen when it happens.'}
					</p>
				</div>
			</div>
		{/if}

		<!-- Game Details -->
		<div class="grid md:grid-cols-2 gap-8">
			<!-- Description -->
			<div>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-purple-300 dark:border-purple-700 pb-1">
					About This Game
				</h2>
				<div class="prose prose-gray dark:prose-invert max-w-none">
					{@html game.content}
				</div>
			</div>
			
			<!-- Meta Info -->
			<div class="space-y-6">
				{#if game.technologies && game.technologies.length > 0}
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Built With</h3>
						<div class="flex flex-wrap gap-2">
							{#each game.technologies as tech}
								<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				{/if}
				
				{#if game.github || game.demo}
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Links</h3>
						<div class="space-y-2">
							{#if game.github}
								<a href={game.github} class="block text-blue-600 dark:text-blue-400 hover:underline">
									→ View Source Code
								</a>
							{/if}
							{#if game.demo}
								<a href={game.demo} class="block text-blue-600 dark:text-blue-400 hover:underline">
									→ External Demo
								</a>
							{/if}
						</div>
					</div>
				{/if}
				
				{#if game.date}
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Development Info</h3>
						<div class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
							<p>Started: {new Date(game.date).toLocaleDateString()}</p>
							<p>Status: {game.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
							{#if game.playable}
								<p>Playable: Yes ✅</p>
							{:else}
								<p>Playable: Not yet ⏳</p>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="py-8">
		<div class="text-center">
			<div class="animate-spin text-4xl mb-4">🎮</div>
			<p class="text-xl text-gray-600 dark:text-gray-300">Loading game...</p>
		</div>
	</div>
{/if}

<style>
	.game-container {
		width: 100%;
		max-width: 100vw;
	}
	
	.game-iframe {
		background-color: black;
		width: 100%;
		height: 60vh;
		min-height: 500px;
		max-height: 800px;
		border: none;
	}
	
	/* Larger iframe on bigger screens */
	@media (min-width: 1024px) {
		.game-iframe {
			height: 70vh;
			max-height: 900px;
		}
	}
	
	/* Responsive iframe for mobile */
	@media (max-width: 768px) {
		.game-iframe {
			height: 50vh;
			min-height: 400px;
		}
	}
</style>