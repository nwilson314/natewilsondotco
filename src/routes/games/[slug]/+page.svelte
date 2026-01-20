<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: game = data.game;

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
</script>

<svelte:head>
	<title>{game.title} - Nate Wilson</title>
	<meta name="description" content={game.excerpt} />
</svelte:head>

<div class="py-8 max-w-2xl">
	<!-- Back link -->
	<p class="mb-6">
		<a href="/games">← games</a>
	</p>

	<!-- Header -->
	<header class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
			{game.title}
		</h1>
		
		<p class="text-gray-600 dark:text-gray-300 mb-4">
			{game.excerpt}
		</p>
		
		<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
			{#if game.date}
				{formatDate(game.date)} ·
			{/if}
			{game.status === 'complete' ? 'Complete' : game.status === 'in-progress' ? 'In progress' : 'Planned'}
			{#if game.playable}
				· Playable
			{/if}
		</p>

		{#if game.playable}
			<p class="mb-4">
				<a href="/play/{game.id}/index.html" target="_blank" rel="noopener noreferrer" class="font-medium">Play now →</a>
			</p>
		{:else if game.status === 'in-progress'}
			<p class="text-gray-500 dark:text-gray-400 text-sm">
				This game is currently being developed. Check back later.
			</p>
		{:else if game.status === 'planned'}
			<p class="text-gray-500 dark:text-gray-400 text-sm">
				This game is still in the planning phase.
			</p>
		{/if}
	</header>

	<hr class="border-gray-200 dark:border-gray-700 mb-8" />

	<!-- Content -->
	<article class="prose-custom text-gray-700 dark:text-gray-300">
		{@html game.content}
	</article>

	<hr class="border-gray-200 dark:border-gray-700 my-8" />

	<!-- Footer info -->
	<footer>
		{#if game.technologies && game.technologies.length > 0}
			<p class="text-sm text-gray-400 dark:text-gray-500 mb-3">
				<span class="text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs">Built with</span><br/>
				{game.technologies.join(' · ')}
			</p>
		{/if}
		
		{#if game.github || game.demo}
			<p class="text-sm mb-4 space-x-4">
				{#if game.github}
					<a href={game.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">View source</a>
				{/if}
				{#if game.demo}
					<a href={game.demo} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">External demo</a>
				{/if}
			</p>
		{/if}
		
		<p class="mt-8">
			<a href="/games" class="text-blue-600 dark:text-blue-400 hover:underline">← Back to games</a>
		</p>
	</footer>
</div>
