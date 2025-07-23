<svelte:head>
	<title>{project ? `${project.title} - Nate Wilson` : 'Loading...'}</title>
	<meta name="description" content={project ? project.excerpt : 'Loading project...'} />
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';
	import { loadProject, type Project } from '$lib/utils/markdown';
	import { markdownToHtml } from '$lib/utils/markdownRenderer';
	import { onMount } from 'svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';

	let project: Project | null = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const slug = $page.params.slug;
			project = await loadProject(`${slug}.md`);
			loading = false;
		} catch (err) {
			console.error('Failed to load project:', err);
			error = 'Project not found';
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}
</script>

{#if loading}
	<div class="py-12">
		<div class="max-w-4xl mx-auto text-center">
			<p class="text-gray-600 dark:text-gray-300">Loading...</p>
		</div>
	</div>
{:else if error}
	<div class="py-12">
		<div class="max-w-4xl mx-auto text-center">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
			<p class="text-gray-600 dark:text-gray-300 mb-8">{error}</p>
			<a 
				href="/projects" 
				class="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
			>
				← Back to Projects
			</a>
		</div>
	</div>
{:else if project}
	<div class="py-12">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="mb-8">
				<a 
					href="/projects" 
					class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
				>
					← Back to Projects
				</a>
				
				<div class="mb-6">
					<div class="flex items-start justify-between mb-4">
						<h1 class="text-4xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
						<span class="px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap {
							project.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
							project.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
							'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
						}">
							{project.status === 'in-progress' ? 'Active' : 
							 project.status === 'completed' ? 'Completed' : 'Planned'}
						</span>
					</div>
					
					<p class="text-xl text-gray-600 dark:text-gray-300 mb-6">{project.excerpt}</p>
					
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
							<time datetime={project.date}>{formatDate(project.date)}</time>
							{#if project.updated && project.updated !== project.date}
								<span>•</span>
								<span>Updated {formatDate(project.updated)}</span>
							{/if}
						</div>
						
						<div class="flex space-x-4">
							{#if project.github}
								<a 
									href={project.github} 
									target="_blank" 
									rel="noopener noreferrer"
									class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								>
									View Code →
								</a>
							{/if}
							{#if project.demo}
								<a 
									href={project.demo} 
									target="_blank" 
									rel="noopener noreferrer"
									class="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
								>
									Live Demo →
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
			
			<!-- Content -->
			<article class="max-w-none mb-12">
				<SyntaxHighlighter content={markdownToHtml(project.content)} />
			</article>
			
			<!-- Tech details at the bottom -->
			<div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
				<div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-medium">Built with:</span>
					{#each project.technologies as tech}
						<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">{tech}</span>
					{/each}
					{#if project.tags.length > 0}
						<span class="mx-2">•</span>
						{#each project.tags as tag}
							<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">{tag}</span>
						{/each}
					{/if}
				</div>
			</div>
			
			<!-- Footer -->
			<div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
				<div class="text-center">
					<p class="text-gray-600 dark:text-gray-300 mb-6">
						Interested in this project or want to collaborate on something similar?
					</p>
					<div class="flex justify-center space-x-4">
						<a 
							href="/projects" 
							class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							More Projects
						</a>
						<a 
							href="/contact" 
							class="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
						>
							Get in Touch
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}