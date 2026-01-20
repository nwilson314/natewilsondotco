<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	
	let { games } = data;
	
	$: playableGames = games.filter(g => g.playable);
	$: inProgressGames = games.filter(g => g.status === 'in-progress' && !g.playable);
	$: plannedGames = games.filter(g => g.status === 'planned');
</script>

<svelte:head>
	<title>Games - Nate Wilson</title>
	<meta name="description" content="Games I've built while learning game development and experimenting with different ideas." />
</svelte:head>

<div class="py-8 max-w-2xl">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
		Games
	</h1>
	<p class="text-gray-700 dark:text-gray-300 mb-10">
		Games I've built while learning game development. Mostly experiments and learning projects.
	</p>

	{#if playableGames.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				Playable
			</h2>
			<ul class="space-y-8">
			{#each playableGames as game}
				<li class="border-l-2 {game.status === 'in-progress' ? 'border-yellow-500' : 'border-green-500'} pl-4">
					<div class="flex items-center gap-2">
						<a href="/games/{game.id}" class="text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
							{game.title}
						</a>
						{#if game.status === 'in-progress'}
							<span class="text-xs font-mono text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">in progress</span>
						{/if}
					</div>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{game.excerpt}</p>
						{#if game.technologies && game.technologies.length > 0}
							<p class="text-gray-400 dark:text-gray-500 text-sm mt-3">
								{game.technologies.join(' · ')}
							</p>
						{/if}
						<p class="text-sm mt-3 space-x-4">
							<a href="/play/{game.id}/index.html" target="_blank" rel="noopener noreferrer" class="text-green-600 dark:text-green-400 hover:underline font-medium">Play now</a>
							{#if game.github}
								<a href={game.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">code</a>
							{/if}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if inProgressGames.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				In progress
			</h2>
			<ul class="space-y-8">
				{#each inProgressGames as game}
					<li class="border-l-2 border-yellow-500 pl-4">
						<span class="text-lg font-semibold text-gray-900 dark:text-white">{game.title}</span>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{game.excerpt}</p>
						{#if game.technologies && game.technologies.length > 0}
							<p class="text-gray-400 dark:text-gray-500 text-sm mt-3">
								{game.technologies.join(' · ')}
							</p>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if plannedGames.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				Planned
			</h2>
			<ul class="space-y-8">
				{#each plannedGames as game}
					<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-4">
						<span class="text-lg font-semibold text-gray-900 dark:text-white">{game.title}</span>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{game.excerpt}</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if games.length === 0}
		<p class="text-gray-500 dark:text-gray-400">Loading games...</p>
	{/if}
</div>
