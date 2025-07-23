<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header class="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
		<div class="flex items-center justify-between h-16">
			<div class="flex items-center">
				<a href="/" class="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
					Nate Wilson
				</a>
			</div>
			
			<div class="flex items-center space-x-4">
				<nav class="hidden md:flex space-x-8">
					{#each navItems as item}
						<a 
							href={item.href}
							class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative py-2 {
								$page.url.pathname === item.href ? 'text-gray-900 dark:text-white font-medium' : ''
							}"
						>
							{item.label}
							{#if $page.url.pathname === item.href}
								<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></div>
							{/if}
						</a>
					{/each}
				</nav>
				
				<ThemeToggle />
				
				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button 
						type="button"
						class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
						aria-label="Open menu"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</header>