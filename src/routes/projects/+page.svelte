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
		<section class="mb-12">
			<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 font-sans">
				Active
			</h2>
			<ul class="space-y-6">
				{#each inProgressProjects as project}
					<li class="pl-4 border-l-2 border-blue-500 dark:border-blue-400 group">
						<div class="flex flex-col gap-1 mb-2">
							<a href="/projects/{project.id}" class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans tracking-tight no-underline">
								{project.title}
							</a>
							<div class="flex gap-3 text-sm font-medium">
								{#if project.technologies.length > 0}
									<span class="text-gray-500 dark:text-gray-400 font-mono">
										{project.technologies.join(' · ')}
									</span>
								{/if}
								<div class="flex gap-3 ml-auto">
									{#if project.github}
										<a href={project.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-sans">Code</a>
									{/if}
									{#if project.demo}
										<a href={project.demo} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-sans">Demo</a>
									{/if}
								</div>
							</div>
						</div>
						<p class="text-gray-700 dark:text-gray-300 leading-relaxed font-serif text-lg">
							{project.excerpt}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if featuredProjects.length > 0}
		<section class="mb-12">
			<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 font-sans">
				Featured
			</h2>
			<ul class="space-y-8">
				{#each featuredProjects as project}
					<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600 group">
						<div class="flex flex-col gap-1 mb-2">
							<a href="/projects/{project.id}" class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans tracking-tight no-underline">
								{project.title}
							</a>
							<div class="flex gap-3 text-sm font-medium">
								{#if project.technologies.length > 0}
									<span class="text-gray-500 dark:text-gray-400 font-mono">
										{project.technologies.join(' · ')}
									</span>
								{/if}
								<div class="flex gap-3 ml-auto">
									{#if project.github}
										<a href={project.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-sans">Code</a>
									{/if}
									{#if project.demo}
										<a href={project.demo} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-sans">Demo</a>
									{/if}
								</div>
							</div>
						</div>
						<p class="text-gray-700 dark:text-gray-300 leading-relaxed font-serif text-lg">
							{project.excerpt}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if otherProjects.length > 0}
		<section class="mb-12">
			<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 font-sans">
				Other projects
			</h2>
			<ul class="space-y-6">
				{#each otherProjects as project}
					<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600 group">
						<div class="flex flex-col gap-1 mb-2">
							<div class="flex items-baseline gap-2">
								<a href="/projects/{project.id}" class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans tracking-tight no-underline">
									{project.title}
								</a>
								{#if project.status === 'paused'}
									<span class="text-xs text-gray-400 dark:text-gray-500 font-mono">(paused)</span>
								{/if}
							</div>
							<div class="flex gap-3 text-sm font-medium">
								{#if project.technologies.length > 0}
									<span class="text-gray-500 dark:text-gray-400 font-mono">
										{project.technologies.join(' · ')}
									</span>
								{/if}
								<div class="flex gap-3 ml-auto">
									{#if project.github}
										<a href={project.github} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-sans">Code</a>
									{/if}
									{#if project.demo}
										<a href={project.demo} target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-sans">Demo</a>
									{/if}
								</div>
							</div>
						</div>
						<p class="text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
							{project.excerpt}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
