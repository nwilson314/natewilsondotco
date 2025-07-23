<svelte:head>
	<title>{post ? `${post.title} - Nate Wilson` : 'Loading...'}</title>
	<meta name="description" content={post ? post.excerpt : 'Loading blog post...'} />
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';
	import { loadBlogPost, loadAllBlogPosts, getSeriesNavigation, type BlogPost } from '$lib/utils/markdown';
	import { markdownToHtml } from '$lib/utils/markdownRenderer';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';

	let post: BlogPost | null = null;
	let allBlogs: BlogPost[] = [];
	let seriesNavigation: { previous?: BlogPost; next?: BlogPost; seriesBlogs: BlogPost[] } = { seriesBlogs: [] };
	let loading = true;
	let error: string | null = null;

	// Make this reactive to slug changes
	$: if ($page.params.slug) {
		loadPost($page.params.slug);
	}

	async function loadPost(slug: string) {
		loading = true;
		error = null;
		
		try {
			[post, allBlogs] = await Promise.all([
				loadBlogPost(`${slug}.md`),
				loadAllBlogPosts()
			]);
			
			if (post) {
				seriesNavigation = getSeriesNavigation(allBlogs, post);
			}
			loading = false;
		} catch (err) {
			console.error('Failed to load blog post:', err);
			error = 'Blog post not found';
			loading = false;
		}
	}

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
		<div class="max-w-3xl mx-auto text-center">
			<p class="text-gray-600 dark:text-gray-300">Loading...</p>
		</div>
	</div>
{:else if error}
	<div class="py-12">
		<div class="max-w-3xl mx-auto text-center">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
			<p class="text-gray-600 dark:text-gray-300 mb-8">{error}</p>
			<a 
				href="/blog" 
				class="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
			>
				← Back to Blog
			</a>
		</div>
	</div>
{:else if post}
	<div class="py-12">
		<div class="max-w-3xl mx-auto">
			<!-- Header -->
			<div class="mb-8">
				<a 
					href="/blog" 
					class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
				>
					← Back to Blog
				</a>
				
				<div class="mb-6">
					<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
					
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							{#if post.updated && post.updated !== post.date}
								<span>•</span>
								<span>Updated {formatDate(post.updated)}</span>
							{/if}
							<span>•</span>
							<span>{post.readTime}</span>
						</div>
						
						<div class="flex flex-wrap gap-2">
							{#each post.tags as tag}
								<span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">{tag}</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
			
			<!-- Series Navigation -->
			{#if post.series && seriesNavigation.seriesBlogs.length > 1}
				<div class="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
					<div class="flex items-center justify-between mb-3">
						<h3 class="text-sm font-semibold text-blue-900 dark:text-blue-100">
							<a 
								href="/blog/series/{post.series.toLowerCase().replace(/\s+/g, '-')}" 
								class="hover:text-blue-700 dark:hover:text-blue-200 transition-colors"
							>
								📚 {post.series}
							</a>
						</h3>
						<span class="text-xs text-blue-700 dark:text-blue-300">
							Part {post.series_part || 1} of {seriesNavigation.seriesBlogs.length}
						</span>
					</div>
					
					<div class="flex items-center justify-between">
						{#if seriesNavigation.previous}
							<a 
								href="/blog/{seriesNavigation.previous.id}" 
								class="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
							>
								← {seriesNavigation.previous.title}
							</a>
						{:else}
							<div></div>
						{/if}
						
						{#if seriesNavigation.next}
							<a 
								href="/blog/{seriesNavigation.next.id}" 
								class="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
							>
								{seriesNavigation.next.title} →
							</a>
						{/if}
					</div>
				</div>
			{/if}
			
			<!-- Content -->
			<article class="max-w-none">
				<SyntaxHighlighter content={markdownToHtml(post.content)} />
			</article>
			
			<!-- Series Navigation Footer -->
			{#if post.series && (seriesNavigation.previous || seriesNavigation.next)}
				<div class="mt-12 mb-8">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#if seriesNavigation.previous}
							<a 
								href="/blog/{seriesNavigation.previous.id}" 
								class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
							>
								<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">← Previous in series</div>
								<div class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									{seriesNavigation.previous.title}
								</div>
							</a>
						{:else}
							<div></div>
						{/if}
						
						{#if seriesNavigation.next}
							<a 
								href="/blog/{seriesNavigation.next.id}" 
								class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group text-right"
							>
								<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Next in series →</div>
								<div class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									{seriesNavigation.next.title}
								</div>
							</a>
						{/if}
					</div>
				</div>
			{/if}
			
			<!-- Footer -->
			<div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
				<div class="text-center">
					<p class="text-gray-600 dark:text-gray-300 mb-6">
						Thanks for reading! If you enjoyed this post, feel free to share it or reach out.
					</p>
					<div class="flex justify-center space-x-4">
						<a 
							href="/blog" 
							class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							More Posts
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