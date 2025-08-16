<svelte:head>
	<title>Brain Dumps - Nate Wilson</title>
	<meta name="description" content="Random thoughts on development, technology, and whatever rabbit holes I've fallen down lately." />
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';
	import { getFeaturedSeries, type BlogPost, type BlogSeries } from '$lib/utils/markdown';
	
	export let data: PageData;
	
	$: posts = data.posts;
	$: featuredSeries = getFeaturedSeries(posts);
	$: recentPosts = posts.slice(0, 4); // Most recent 4 posts by time
	$: allPosts = posts; // All posts, already sorted by date

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}
</script>

<div class="py-12">
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">🧠 Brain Dumps</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
			Random thoughts on development, technology, and whatever rabbit holes I've fallen down lately. 
			Fair warning: some of these ideas are half-baked at best.
		</p>
	</div>

	{#if recentPosts.length > 0}
		<div class="mb-16 bg-blue-50 dark:bg-blue-950/20 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">📝 Recent Thoughts</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each recentPosts as post}
					<article class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
						<div class="border-b-2 border-blue-300 dark:border-blue-700 pb-2 mb-4">
							<div class="flex items-center justify-between mb-2 text-sm text-gray-500 dark:text-gray-400">
								<time datetime={post.date}>{formatDate(post.date)}</time>
								<span>{post.readTime}</span>
							</div>
							
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								<a href="/blog/{post.id}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
									{post.title}
								</a>
							</h3>
						</div>
						
						<p class="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
						
						<div class="flex items-center justify-between">
							<div class="flex flex-wrap gap-1">
								{#each post.tags as tag}
									<span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{tag}</span>
								{/each}
								{#if post.series}
									<span class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded font-medium">
										{post.series} #{post.series_part || 1}
									</span>
								{/if}
							</div>
							<a 
								href="/blog/{post.id}" 
								class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
							>
								Read →
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}

	{#if featuredSeries.length > 0}
		<div class="mb-16 bg-purple-50 dark:bg-purple-950/20 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">📚 Featured Series</h2>
			<div class="space-y-8">
				{#each featuredSeries as series}
					<article class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
						<div class="p-8">
							<div class="border-b-2 border-purple-300 dark:border-purple-700 pb-2 mb-4">
								<div class="flex items-center justify-between mb-2">
									<div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
										<time datetime={series.latestPost.date}>{formatDate(series.latestPost.date)}</time>
										<span>•</span>
										<span>{series.totalPosts} {series.totalPosts === 1 ? 'post' : 'posts'}</span>
										<span>•</span>
										<span class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded font-medium">Series</span>
									</div>
									<div class="flex flex-wrap gap-2">
										{#each series.latestPost.tags as tag}
											<span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">{tag}</span>
										{/each}
									</div>
								</div>
								
								<h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
									<a href="/blog/series/{series.name.toLowerCase().replace(/\s+/g, '-')}" class="hover:text-blue-600 transition-colors">
										{series.name}
									</a>
								</h3>
							</div>
							
							<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
								{series.description || series.firstPost.excerpt}
							</p>
							
							<div class="mb-6">
								<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Latest: {series.latestPost.title}</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">{series.latestPost.excerpt}</p>
							</div>
							
							<div class="flex items-center justify-between">
								<a 
									href="/blog/series/{series.name.toLowerCase().replace(/\s+/g, '-')}" 
									class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
								>
									View Series →
								</a>
								<a 
									href="/blog/{series.latestPost.id}" 
									class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
								>
									Read Latest →
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}

	{#if allPosts.length > 0}
		<div class="mt-16 bg-green-50 dark:bg-green-950/20 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">📋 All Posts</h2>
			<div class="space-y-4">
				{#each allPosts as post}
					<article class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<div class="border-b-2 border-green-300 dark:border-green-700 pb-1 mb-2">
									<div class="flex items-center gap-4">
										<h3 class="text-lg font-medium text-gray-900 dark:text-white">
											<a href="/blog/{post.id}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
												{post.title}
											</a>
										</h3>
										{#if post.series}
											<span class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded font-medium">
												{post.series} #{post.series_part || 1}
											</span>
										{/if}
									</div>
								</div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{post.excerpt}</p>
								<div class="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
									<time datetime={post.date}>{formatDate(post.date)}</time>
									<span>•</span>
									<span>{post.readTime}</span>
									<span>•</span>
									<div class="flex flex-wrap gap-1">
										{#each post.tags as tag}
											<span class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">{tag}</span>
										{/each}
									</div>
								</div>
							</div>
							<div class="ml-4">
								<a 
									href="/blog/{post.id}" 
									class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
								>
									Read →
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}

	<div class="mt-16 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
		<p class="text-gray-600 dark:text-gray-300 mb-6">
			Want to be notified when I publish new posts? Follow me on social media or reach out directly.
		</p>
		<div class="flex justify-center space-x-4">
			<a 
				href="https://twitter.com/natewilson" 
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
			>
				Follow on Twitter
			</a>
			<a 
				href="/contact" 
				class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
			>
				Get in Touch
			</a>
		</div>
	</div>
</div>