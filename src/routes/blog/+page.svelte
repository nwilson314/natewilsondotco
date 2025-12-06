<svelte:head>
	<title>Writing - Nate Wilson</title>
	<meta name="description" content="Writing about software, systems, and what I'm learning along the way." />
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';
	import { getFeaturedSeries } from '$lib/utils/markdown';
	
	export let data: PageData;
	
	$: posts = data.posts;
	$: featuredSeries = getFeaturedSeries(posts);

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
</script>

<div class="py-8 max-w-2xl">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
		Writing
	</h1>
	<p class="text-gray-700 dark:text-gray-300 mb-10">
		Notes on software, systems, and what I'm learning along the way. Mostly written for future me, but maybe useful to others.
	</p>

	{#if featuredSeries.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				Series
			</h2>
			<ul class="space-y-8">
				{#each featuredSeries as series}
					<li class="border-l-2 border-purple-500 pl-4">
						<a href="/blog/series/{series.name.toLowerCase().replace(/\s+/g, '-')}" class="text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
							{series.name}
						</a>
						<span class="text-gray-400 dark:text-gray-500 text-sm ml-2">({series.totalPosts} {series.totalPosts === 1 ? 'post' : 'posts'})</span>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
							{series.description || series.firstPost.excerpt}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if posts.length > 0}
		<section class="mb-10">
			<h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
				All posts
			</h2>
			<ul class="space-y-8">
				{#each posts as post}
					<li class="border-l-2 border-gray-300 dark:border-gray-600 pl-4">
						<div class="flex items-baseline gap-2 flex-wrap">
							<a href="/blog/{post.id}" class="text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
								{post.title}
							</a>
							{#if post.series}
								<span class="text-xs text-gray-400 dark:text-gray-500">({post.series} #{post.series_part || 1})</span>
							{/if}
						</div>
						<p class="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{post.excerpt}</p>
						<p class="text-gray-400 dark:text-gray-500 text-sm mt-3">
							{formatDate(post.date)} · {post.readTime}
							{#if post.tags.length > 0}
								· {post.tags.join(', ')}
							{/if}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<p class="text-gray-500 dark:text-gray-400 my-8">
			No posts yet. Check back soon.
		</p>
	{/if}
</div>
