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
		<section class="mb-12">
			<h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 font-sans">
				All posts
			</h2>
			<ul class="space-y-6">
				{#each posts as post}
					<li class="pl-4 border-l-2 border-gray-300 dark:border-gray-600 group">
						<div class="flex flex-col gap-1 mb-2">
							<a href="/blog/{post.id}" class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans tracking-tight transition-colors no-underline">
								{post.title}
							</a>
							<div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-mono">
								<time datetime={post.date}>{formatDate(post.date)}</time>
								{#if post.readTime}
									<span>·</span>
									<span>{post.readTime}</span>
								{/if}
								{#if post.series}
									<span>·</span>
									<span class="text-blue-600 dark:text-blue-400">{post.series} #{post.series_part || 1}</span>
								{/if}
							</div>
						</div>
						<p class="text-gray-700 dark:text-gray-300 leading-relaxed font-serif text-lg">
							{post.excerpt}
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
