<script lang="ts">
	import { loadAllBlogPosts, loadAllProjects, type BlogPost, type Project } from '$lib/utils/markdown';
	import { onMount } from 'svelte';

	let posts: BlogPost[] = [];
	let projects: Project[] = [];
	let currentTime = new Date();
	
	const randomMessages = [
		"Best viewed with curious eyes 👀",
		"Optimized for midnight browsing 🌙", 
		"Works best with coffee nearby ☕",
		"Enhanced by good music 🎵",
		"Designed for fellow nerds 🤓",
		"Perfect for procrastinating 😅",
		"Ideal for rabbit hole diving 🐰",
		"Made with way too much caffeine ⚡",
		"Built for the chronically curious 🔍",
		"Best experienced with snacks 🍿"
	];
	
	let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];

	onMount(() => {
		async function load() {
			posts = await loadAllBlogPosts();
			projects = await loadAllProjects();
		}
		load();

		const interval = setInterval(() => {
			currentTime = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	function formatLastUpdated() {
		return currentTime.toLocaleString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="py-8">
	<!-- Header -->
	<div class="mb-12">
		<div class="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-6 bg-blue-50 dark:bg-blue-950/20">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
				🌱 Welcome to Nate's Digital Garden
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-1">
				Currently tending: Odin game dev, AI rabbit holes, and way too many side projects
			</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Last watered: {formatLastUpdated()} • Visitor #{Math.floor(Math.random() * 1337) + 1000} 
			</p>
		</div>
	</div>

	<!-- Content Grid -->
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		<!-- What's Growing (Recent Projects) -->
		<div class="space-y-4">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 border-green-300 dark:border-green-700 pb-1">
				🔨 What I'm Building
			</h2>
			{#if projects.length > 0}
				<div class="space-y-2">
					{#each projects.slice(0, 3) as project}
						<div class="group">
							<a href="/projects/{project.id}" class="block hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors">
								<div class="flex items-center gap-2">
									<span class="text-green-600 dark:text-green-400">→</span>
									<span class="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
										{project.title}
									</span>
									{#if project.status === 'in-progress'}
										<span class="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
											active
										</span>
									{/if}
								</div>
							</a>
						</div>
					{/each}
				</div>
				<a href="/projects" class="inline-block text-green-600 dark:text-green-400 hover:underline text-sm">
					→ explore the workshop
				</a>
			{:else}
				<p class="text-gray-500 dark:text-gray-400 italic">Loading projects...</p>
			{/if}
		</div>

		<!-- Fresh Thoughts (Recent Blog Posts) -->
		<div class="space-y-4">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 border-purple-300 dark:border-purple-700 pb-1">
				💭 Fresh Thoughts
			</h2>
			{#if posts.length > 0}
				<div class="space-y-2">
					{#each posts.slice(0, 3) as post}
						<div class="group">
							<a href="/blog/{post.id}" class="block hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors">
								<div class="flex items-center gap-2">
									<span class="text-purple-600 dark:text-purple-400">→</span>
									<span class="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
										{post.title}
									</span>
									{#if post.featured}
										<span class="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">
											pinned
										</span>
									{/if}
								</div>
							</a>
						</div>
					{/each}
				</div>
				<a href="/blog" class="inline-block text-purple-600 dark:text-purple-400 hover:underline text-sm">
					→ wander through my mind
				</a>
			{:else}
				<p class="text-gray-500 dark:text-gray-400 italic">Loading thoughts...</p>
			{/if}
		</div>

		<!-- Random Stuff -->
		<div class="space-y-4 md:col-span-2 lg:col-span-1">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 border-orange-300 dark:border-orange-700 pb-1">
				🎲 Random Stuff
			</h2>
			<div class="space-y-3 text-sm">
				<div class="flex items-center gap-2">
					<span class="text-orange-600 dark:text-orange-400">→</span>
					<span class="text-gray-700 dark:text-gray-300">Currently focused on: Odin Game Dev and ECS</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-orange-600 dark:text-orange-400">→</span>
					<span class="text-gray-700 dark:text-gray-300">Recently completed: IM Ohio 2025</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-orange-600 dark:text-orange-400">→</span>
					<span class="text-gray-700 dark:text-gray-300">Currently reading: Stormlight Archive Book 3</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-orange-600 dark:text-orange-400">→</span>
					<a href="/about" class="text-blue-600 dark:text-blue-400 hover:underline">Learn more about me</a>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-orange-600 dark:text-orange-400">→</span>
					<a href="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">Say hello</a>
				</div>
			</div>
		</div>
	</div>

	<!-- ASCII Art Footer -->
	<div class="mt-16 text-center">
		<pre class="text-xs text-gray-400 dark:text-gray-600 font-mono leading-tight">╔════════════════════════════════════════╗
║  {randomMessage.padEnd(36)}  ║
╚════════════════════════════════════════╝</pre>
	</div>
</div>
