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
			month: 'short', 
			day: 'numeric' 
		});
	}
</script>

<svelte:head>
	<title>{series?.name || 'Series'} - Nate Wilson</title>
	<meta name="description" content="All posts in the {series?.name || ''} series" />
</svelte:head>

{#if series}
	<div class="py-8 max-w-2xl">
		<!-- Back link -->
		<p class="mb-6">
			<a href="/blog">← writing</a>
		</p>

		<header class="mb-8">
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
				{series.name}
			</h1>
			<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
				{series.totalPosts} {series.totalPosts === 1 ? 'post' : 'posts'} · Last updated {formatDate(series.latestPost.date)}
			</p>
			{#if series.description}
				<p class="text-gray-600 dark:text-gray-300">
					{series.description}
				</p>
			{/if}
		</header>

		<hr class="border-gray-200 dark:border-gray-700 mb-8" />

		<section>
			<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				Posts in this series
			</h2>
			<ol class="space-y-4 list-decimal list-inside">
				{#each posts as post, index}
					<li class="text-gray-700 dark:text-gray-300">
						<a href="/blog/{post.id}" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
							{post.title}
						</a>
						<p class="text-gray-600 dark:text-gray-400 text-sm mt-1 ml-5">{post.excerpt}</p>
						<p class="text-gray-500 dark:text-gray-500 text-xs mt-1 ml-5">
							{formatDate(post.date)} · {post.readTime}
						</p>
					</li>
				{/each}
			</ol>
		</section>

		<hr class="border-gray-200 dark:border-gray-700 my-8" />

		<p>
			<a href="/blog">← Back to all posts</a>
		</p>
	</div>
{:else}
	<div class="py-8 max-w-2xl">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Series not found</h1>
		<p class="text-gray-600 dark:text-gray-300 mb-4">The series you're looking for doesn't exist.</p>
		<p><a href="/blog">← Back to writing</a></p>
	</div>
{/if}
