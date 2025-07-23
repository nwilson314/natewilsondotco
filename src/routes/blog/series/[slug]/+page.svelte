<svelte:head>
	<title>{series?.name || 'Series'} - Nate Wilson</title>
	<meta name="description" content="All posts in the {series?.name || ''} series" />
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';
	import { loadAllBlogPosts, createBlogSeries, type BlogSeries, type BlogPost } from '$lib/utils/markdown';
	import { onMount } from 'svelte';

	let series: BlogSeries | null = null;
	let posts: BlogPost[] = [];

	onMount(async () => {
		const slug = $page.params.slug;
		const allPosts = await loadAllBlogPosts();
		const allSeries = createBlogSeries(allPosts);
		
		// Find series by slug (convert series name to slug format)
		series = allSeries.find(s => 
			s.name.toLowerCase().replace(/\s+/g, '-') === slug
		) || null;
		
		if (series) {
			posts = series.posts;
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

{#if series}
	<div class="py-12">
		<div class="mb-12">
			<nav class="text-sm text-gray-500 dark:text-gray-400 mb-6">
				<a href="/blog" class="hover:text-gray-700 dark:hover:text-gray-300">Blog</a> / 
				<span class="text-gray-700 dark:text-gray-300">Series</span>
			</nav>
			
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">📚 {series.name}</h1>
			<div class="flex items-center space-x-4 text-lg text-gray-600 dark:text-gray-300 mb-6">
				<span>{series.totalPosts} {series.totalPosts === 1 ? 'post' : 'posts'}</span>
				<span>•</span>
				<span>Updated {formatDate(series.latestPost.date)}</span>
				{#if series.featured}
					<span>•</span>
					<span class="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-medium">Featured Series</span>
				{/if}
			</div>
			
			{#if series.description}
				<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
					{series.description}
				</p>
			{/if}
		</div>

		<div class="space-y-6">
			{#each posts as post, index}
				<article class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
					<div class="flex items-start gap-6">
						<div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
							<span class="text-blue-800 dark:text-blue-200 font-semibold">
								{post.series_part || index + 1}
							</span>
						</div>
						
						<div class="flex-1">
							<div class="flex items-center justify-between mb-3">
								<div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
									<time datetime={post.date}>{formatDate(post.date)}</time>
									<span>•</span>
									<span>{post.readTime}</span>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each post.tags as tag}
										<span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{tag}</span>
									{/each}
								</div>
							</div>
							
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
								<a href="/blog/{post.id}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
									{post.title}
								</a>
							</h3>
							
							<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
							
							<a 
								href="/blog/{post.id}" 
								class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
							>
								Read Part {post.series_part || index + 1} →
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<a 
				href="/blog" 
				class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
			>
				← Back to All Posts
			</a>
		</div>
	</div>
{:else}
	<div class="py-12 text-center">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Series Not Found</h1>
		<p class="text-gray-600 dark:text-gray-300 mb-6">The series you're looking for doesn't exist.</p>
		<a 
			href="/blog" 
			class="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
		>
			← Back to Blog
		</a>
	</div>
{/if}