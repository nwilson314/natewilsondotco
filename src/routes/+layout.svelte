<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
	<Header />
	
	<main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
		{@render children()}
	</main>
	
	<Footer />
</div>
