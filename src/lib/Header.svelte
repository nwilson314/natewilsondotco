<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	
	const navItems = [
		{ href: '/blog', label: 'blog' },
		{ href: '/projects', label: 'projects' },
		{ href: '/games', label: 'games' },
		{ href: '/about', label: 'about' },
		{ href: '/contact', label: 'contact' }
	];
	
	let mobileMenuOpen = false;
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
		<div class="flex items-center justify-between py-4">
			<div class="flex items-center gap-8">
				<a href="/" class="font-semibold text-gray-900 dark:text-white no-underline hover:no-underline">
					nate wilson
				</a>
				
				<nav class="hidden md:flex gap-6">
					{#each navItems as item}
						<a 
							href={item.href}
							class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white no-underline hover:underline {
								$page.url.pathname === item.href ? 'text-gray-900 dark:text-white' : ''
							}"
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</div>
			
			<div class="flex items-center gap-4">
				<ThemeToggle />
				
				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button 
						type="button"
						onclick={toggleMobileMenu}
						class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					>
						{#if mobileMenuOpen}
							<span class="text-lg">×</span>
						{:else}
							<span class="text-lg">≡</span>
						{/if}
					</button>
				</div>
			</div>
		</div>
		
		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
				<nav class="flex flex-col gap-3">
					{#each navItems as item}
						<a 
							href={item.href}
							onclick={closeMobileMenu}
							class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white no-underline hover:underline {
								$page.url.pathname === item.href ? 'text-gray-900 dark:text-white' : ''
							}"
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</div>
		{/if}
	</div>
</header>
