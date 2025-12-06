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
		<p class="mb-6">
			<a href="/blog">← writing</a>
		</p>

		<!-- Header -->
		<header class="mb-8">
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
				{post.title}
			</h1>
			
			<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
				{formatDate(post.date)}
				{#if post.updated && post.updated !== post.date}
					· Updated {formatDate(post.updated)}
				{/if}
				· {post.readTime}
			</p>

			{#if post.tags.length > 0}
				<p class="text-sm text-gray-400 dark:text-gray-500">
					{post.tags.join(' · ')}
				</p>
			{/if}

			{#if post.series && seriesNavigation.seriesBlogs.length > 1}
				<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
					Part of <a href="/blog/series/{post.series.toLowerCase().replace(/\s+/g, '-')}">{post.series}</a> 
					(Part {post.series_part || 1} of {seriesNavigation.seriesBlogs.length})
				</p>
			{/if}
		</header>

		<hr class="border-gray-200 dark:border-gray-700 mb-8" />

		<!-- Content -->
		<article class="prose-custom">
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
