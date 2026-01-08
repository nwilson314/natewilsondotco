<script lang="ts">
	import type { PageData } from './$types';
	import { markdownToHtml } from '$lib/utils/markdownRenderer';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';

	export let data: PageData;
	
	$: ({ post, allBlogs, seriesNavigation } = data);
	$: error = !post;

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
	<title>{post ? `${post.title} - Nate Wilson` : 'Loading...'}</title>
	<meta name="description" content={post ? post.excerpt : 'Loading blog post...'} />
</svelte:head>

{#if error}
	<div class="py-8 max-w-2xl">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
		<p class="text-gray-600 dark:text-gray-300 mb-4">The post you're looking for doesn't exist.</p>
		<p><a href="/blog">← Back to writing</a></p>
	</div>
{:else if post}
	<div class="py-8 max-w-2xl">
		<!-- Back link -->
		<p class="mb-8">
			<a href="/blog" class="no-underline text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors font-sans text-sm font-medium uppercase tracking-wide">← Writing</a>
		</p>

		<!-- Header -->
		<header class="mb-10">
			<h1 class="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
				{post.title}
			</h1>
			
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 font-mono">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				{#if post.updated && post.updated !== post.date}
					<span>(Updated {formatDate(post.updated)})</span>
				{/if}
				<span>·</span>
				<span>{post.readTime}</span>
				
				{#if post.series && seriesNavigation.seriesBlogs.length > 1}
					<span class="text-gray-300 dark:text-gray-600">|</span>
					<a href="/blog/series/{post.series.toLowerCase().replace(/\s+/g, '-')}" class="text-blue-600 dark:text-blue-400 hover:underline">
						{post.series} <span class="text-gray-400 dark:text-gray-500">#{post.series_part || 1}</span>
					</a>
				{/if}
			</div>

			{#if post.tags.length > 0}
				<div class="mt-3 flex gap-2">
					{#each post.tags as tag}
						<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 font-mono">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<!-- Content -->
		<article class="prose dark:prose-invert max-w-none prose-headings:font-sans prose-headings:font-bold prose-p:font-serif prose-code:font-mono prose-pre:font-mono prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
			<SyntaxHighlighter content={markdownToHtml(post.content)} />
		</article>

		<!-- Series Navigation -->
		{#if post.series && (seriesNavigation.previous || seriesNavigation.next)}
			<hr class="border-gray-200 dark:border-gray-700 my-8" />
			
			<nav class="text-sm">
				<p class="font-medium text-gray-900 dark:text-white mb-2">More in this series:</p>
				<ul class="space-y-1">
					{#if seriesNavigation.previous}
						<li>
							← Previous: <a href="/blog/{seriesNavigation.previous.id}">{seriesNavigation.previous.title}</a>
						</li>
					{/if}
					{#if seriesNavigation.next}
						<li>
							→ Next: <a href="/blog/{seriesNavigation.next.id}">{seriesNavigation.next.title}</a>
						</li>
					{/if}
				</ul>
			</nav>
		{/if}

		<hr class="border-gray-200 dark:border-gray-700 my-8" />

		<!-- Footer -->
		<footer>
			<p class="text-gray-600 dark:text-gray-300 mb-4">
				Thanks for reading. If you have thoughts or questions, feel free to reach out.
			</p>
			<p class="text-sm space-x-4">
				<a href="/blog" class="text-blue-600 dark:text-blue-400 hover:underline">← More posts</a>
				<a href="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">Get in touch</a>
			</p>
		</footer>
	</div>
{/if}
