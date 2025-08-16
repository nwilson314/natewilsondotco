<!-- prerender: true -->
<svelte:head>
	<title>Stuff I Made - Nate Wilson</title>
	<meta name="description" content="Things I've built that actually work (mostly). Projects, experiments, and weekend creations." />
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ featuredProjects, inProgressProjects, otherProjects } = data);
</script>

<div class="py-12">
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">🛠️ Stuff I Made</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
			Things I've built that actually work (mostly). A mix of professional projects, weekend experiments, 
			and the occasional "seemed like a good idea at 2am" creation.
		</p>
	</div>

	{#if featuredProjects.length > 0}
		<div class="mb-16 bg-blue-50 dark:bg-blue-950/20 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">⭐ Actually Proud Of These</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each featuredProjects as project}
					<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
						<div class="aspect-video overflow-hidden">
							<img 
								src="/images/projects/{project.image || 'project_placeholder.png'}" 
								alt="{project.title} screenshot"
								class="w-full h-full object-cover hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-600"
								on:error={(e) => { 
									const target = e.target as HTMLImageElement;
									if (target.src.includes('project_placeholder.png')) return;
									target.src = '/images/projects/project_placeholder.png'; 
								}}
							/>
						</div>
						<div class="p-6">
							<div class="border-b-2 border-blue-300 dark:border-blue-700 pb-2 mb-4">
								<div class="flex items-start justify-between">
									<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
										<a href="/projects/{project.id}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
											{project.title}
										</a>
									</h3>
									<div class="flex items-center space-x-2">
										<span class="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap {
											project.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
											project.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
											project.status === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
											'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
										}">
											{project.status === 'in-progress' ? 'Active' : 
											 project.status === 'completed' ? 'Completed' :
											 project.status === 'paused' ? 'Paused' : 'Planned'}
										</span>
									</div>
								</div>
							</div>
							
							<p class="text-gray-600 dark:text-gray-300 mb-4">{project.excerpt}</p>
							
							<div class="flex flex-wrap gap-2 mb-4">
								{#each project.technologies as tech}
									<span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{tech}</span>
								{/each}
							</div>
							
							<div class="flex items-center justify-between">
								<a 
									href="/projects/{project.id}" 
									class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
								>
									Read More →
								</a>
								<div class="flex space-x-4">
									{#if project.github}
										<a 
											href={project.github} 
											target="_blank" 
											rel="noopener noreferrer"
											class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
										>
											Code →
										</a>
									{/if}
									{#if project.demo}
										<a 
											href={project.demo} 
											target="_blank" 
											rel="noopener noreferrer"
											class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
										>
											Demo →
										</a>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if inProgressProjects.length > 0}
		<div class="mb-16 bg-orange-50 dark:bg-orange-950/20 border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg p-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">🚧 Currently Cooking</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each inProgressProjects as project}
					<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
						<div class="aspect-video overflow-hidden">
							<img 
								src="/images/projects/{project.image || 'project_placeholder.png'}" 
								alt="{project.title} screenshot"
								class="w-full h-full object-cover hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-600"
								on:error={(e) => { 
									const target = e.target as HTMLImageElement;
									if (target.src.includes('project_placeholder.png')) return;
									target.src = '/images/projects/project_placeholder.png'; 
								}}
							/>
						</div>
						<div class="p-6">
							<div class="border-b-2 border-orange-300 dark:border-orange-700 pb-2 mb-3">
								<div class="flex items-start justify-between">
									<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
										<a href="/projects/{project.id}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
											{project.title}
										</a>
									</h3>
									<span class="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap {
										project.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
										project.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
										project.status === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
										'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
									}">
										{project.status === 'in-progress' ? 'Active' : 
										 project.status === 'completed' ? 'Completed' :
										 project.status === 'paused' ? 'Paused' : 'Planned'}
									</span>
								</div>
							</div>
						
						<p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.excerpt}</p>
						
						<div class="flex flex-wrap gap-1 mb-4">
							{#each project.technologies as tech}
								<span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{tech}</span>
							{/each}
						</div>
						
						<div class="flex items-center justify-between text-sm">
							<a 
								href="/projects/{project.id}" 
								class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
							>
								Read More →
							</a>
							<div class="flex space-x-3">
								{#if project.github}
									<a 
										href={project.github} 
										target="_blank" 
										rel="noopener noreferrer"
										class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										Code →
									</a>
								{/if}
								{#if project.demo}
									<a 
										href={project.demo} 
										target="_blank" 
										rel="noopener noreferrer"
										class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
									>
										Demo →
									</a>
								{/if}
							</div>
						</div>
					</div>
				</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if otherProjects.length > 0}
		<div class="bg-green-50 dark:bg-green-950/20 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">🧪 Experiments & Side Quests</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each otherProjects as project}
					<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
						<div class="aspect-video overflow-hidden">
							<img 
								src="/images/projects/{project.image || 'project_placeholder.png'}" 
								alt="{project.title} screenshot"
								class="w-full h-full object-cover hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-600"
								on:error={(e) => { 
									const target = e.target as HTMLImageElement;
									if (target.src.includes('project_placeholder.png')) return;
									target.src = '/images/projects/project_placeholder.png'; 
								}}
							/>
						</div>
						<div class="p-6">
							<div class="border-b-2 border-green-300 dark:border-green-700 pb-2 mb-3">
								<div class="flex items-start justify-between">
									<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
										<a href="/projects/{project.id}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
											{project.title}
										</a>
									</h3>
									<span class="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap {
										project.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
										project.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
										project.status === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
										'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
									}">
										{project.status === 'in-progress' ? 'Active' : 
										 project.status === 'completed' ? 'Completed' :
										 project.status === 'paused' ? 'Paused' : 'Planned'}
									</span>
								</div>
							</div>
						
						<p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.excerpt}</p>
						
						<div class="flex flex-wrap gap-1 mb-4">
							{#each project.technologies as tech}
								<span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{tech}</span>
							{/each}
						</div>
						
						<div class="flex items-center justify-between text-sm">
							<a 
								href="/projects/{project.id}" 
								class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
							>
								Read More →
							</a>
							<div class="flex space-x-3">
								{#if project.github}
									<a 
										href={project.github} 
										target="_blank" 
										rel="noopener noreferrer"
										class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										Code →
									</a>
								{/if}
								{#if project.demo}
									<a 
										href={project.demo} 
										target="_blank" 
										rel="noopener noreferrer"
										class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
									>
										Demo →
									</a>
								{/if}
							</div>
						</div>
					</div>
				</div>
				{/each}
			</div>
		</div>
	{/if}

	<div class="mt-16 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Have an Idea?</h2>
		<p class="text-gray-600 dark:text-gray-300 mb-6">
			I'm always interested in collaborating on interesting projects or discussing new ideas.
		</p>
		<a 
			href="/contact" 
			class="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
		>
			Let's Talk
		</a>
	</div>
</div>