<svelte:head>
	<title>Projects - Nate Wilson</title>
	<meta name="description" content="Things I've built: professional projects, side projects, and experiments." />
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ featuredProjects, inProgressProjects, otherProjects } = data);
	$: allProjects = [...featuredProjects, ...inProgressProjects, ...otherProjects];
</script>

<div class="py-8 max-w-2xl">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
		Projects
	</h1>
	<p class="text-gray-700 dark:text-gray-300 mb-10">
		Things I've built: professional projects, side projects, and experiments. Some finished, some still cooking.
	</p>

	{#if inProgressProjects.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				Active
			</h2>
			<ul class="space-y-8">
				{#each inProgressProjects as project}
					<li class="border-l-2 border-blue-500 pl-4">
						<a href="/projects/{project.id}" class="text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
							{project.title}
						</a>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{project.excerpt}</p>
						{#if project.technologies.length > 0}
							<p class="text-gray-400 dark:text-gray-500 text-sm mt-3">
								{project.technologies.join(' · ')}
							</p>
						{/if}
						<p class="text-sm mt-3 space-x-4">
							{#if project.github}
								<a href={project.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">code</a>
							{/if}
							{#if project.demo}
								<a href={project.demo} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">demo</a>
							{/if}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if featuredProjects.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				Featured
			</h2>
			<ul class="space-y-8">
				{#each featuredProjects as project}
					<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-4">
						<a href="/projects/{project.id}" class="text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
							{project.title}
						</a>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{project.excerpt}</p>
						{#if project.technologies.length > 0}
							<p class="text-gray-400 dark:text-gray-500 text-sm mt-3">
								{project.technologies.join(' · ')}
							</p>
						{/if}
						<p class="text-sm mt-3 space-x-4">
							{#if project.github}
								<a href={project.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">code</a>
							{/if}
							{#if project.demo}
								<a href={project.demo} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">demo</a>
							{/if}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if otherProjects.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				Other projects
			</h2>
			<ul class="space-y-8">
				{#each otherProjects as project}
					<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-4">
						<div class="flex items-baseline gap-2">
							<a href="/projects/{project.id}" class="text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
								{project.title}
							</a>
							{#if project.status === 'paused'}
								<span class="text-xs text-gray-400 dark:text-gray-500">(paused)</span>
							{/if}
						</div>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{project.excerpt}</p>
						{#if project.technologies.length > 0}
							<p class="text-gray-400 dark:text-gray-500 text-sm mt-3">
								{project.technologies.join(' · ')}
							</p>
						{/if}
						<p class="text-sm mt-3 space-x-4">
							{#if project.github}
								<a href={project.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">code</a>
							{/if}
							{#if project.demo}
								<a href={project.demo} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">demo</a>
							{/if}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
