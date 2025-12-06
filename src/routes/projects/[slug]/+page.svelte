<script lang="ts">
	import type { PageData } from './$types';
	import { markdownToHtml } from '$lib/utils/markdownRenderer';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';

	export let data: PageData;
	
	$: project = data.project;

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
	<title>{project.title} - Nate Wilson</title>
	<meta name="description" content={project.excerpt} />
</svelte:head>

<div class="py-8 max-w-2xl">
	<!-- Back link -->
	<p class="mb-6">
		<a href="/projects">← projects</a>
	</p>

	<!-- Header -->
	<header class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
			{project.title}
		</h1>
		
		<p class="text-gray-600 dark:text-gray-300 mb-4">
			{project.excerpt}
		</p>
		
		<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
			{formatDate(project.date)}
			{#if project.updated && project.updated !== project.date}
				· Updated {formatDate(project.updated)}
			{/if}
			· {project.status === 'in-progress' ? 'In progress' : project.status === 'completed' ? 'Completed' : project.status}
		</p>

		{#if project.github || project.demo}
			<p class="text-sm">
				{#if project.github}
					<a href={project.github} target="_blank" rel="noopener noreferrer" class="mr-4">View code</a>
				{/if}
				{#if project.demo}
					<a href={project.demo} target="_blank" rel="noopener noreferrer">Live demo</a>
				{/if}
			</p>
		{/if}
	</header>

	<hr class="border-gray-200 dark:border-gray-700 mb-8" />

	<!-- Content -->
	<article class="prose-custom">
		<SyntaxHighlighter content={markdownToHtml(project.content)} />
	</article>

	<hr class="border-gray-200 dark:border-gray-700 my-8" />

	<!-- Tech details -->
	<footer>
		{#if project.technologies.length > 0}
			<p class="text-sm text-gray-400 dark:text-gray-500 mb-3">
				<span class="text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs">Built with</span><br/>
				{project.technologies.join(' · ')}
			</p>
		{/if}
		{#if project.tags.length > 0}
			<p class="text-sm text-gray-400 dark:text-gray-500 mb-3">
				<span class="text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs">Tags</span><br/>
				{project.tags.join(' · ')}
			</p>
		{/if}
		
		<p class="mt-8">
			<a href="/projects" class="text-blue-600 dark:text-blue-400 hover:underline">← Back to projects</a>
		</p>
	</footer>
</div>
