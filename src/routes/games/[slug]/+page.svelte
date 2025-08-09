<script lang="ts">
	import { loadGame, type Game } from '$lib/utils/markdown';
	import { markdownToHtml } from '$lib/utils/markdownRenderer';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	let game: Game | null = null;
	let gameLoading = false;
	let gameInitialized = false;
	
	onMount(async () => {
		const slug = $page.params.slug;
		const loadedGame = await loadGame(slug);
		
		if (loadedGame) {
			// Convert markdown content to HTML
			loadedGame.content = markdownToHtml(loadedGame.content);
			game = loadedGame;
			
			// Initialize the game if it's playable
			if (game.playable && game.status === 'complete') {
				initializeGame(slug);
			}
		}
	});
	
	async function initializeGame(slug: string) {
		if (gameInitialized) return;
		
		gameLoading = true;
		
		// Load Odin runtime first
		const odinScript = document.createElement('script');
		odinScript.src = `/games/${slug}/odin.js`;
		document.body.appendChild(odinScript);
		
		await new Promise((resolve) => {
			odinScript.onload = resolve;
			odinScript.onerror = () => {
				console.error('Failed to load Odin runtime');
				gameLoading = false;
				resolve(null);
			};
		});
		
		// Setup Odin memory interface
		// @ts-ignore
		const odinMemoryInterface = new window.odin.WasmMemoryInterface();
		odinMemoryInterface.setIntSize(4);
		// @ts-ignore
		const odinImports = window.odin.setupDefaultImports(odinMemoryInterface);
		
		// Configure Module for Emscripten
		// @ts-ignore
		window.Module = {
			locateFile: function(path: string) {
				if (path.endsWith('.data')) {
					return `/games/${slug}/index.data`;
				}
				return `/games/${slug}/${path}`;
			},
			instantiateWasm: (imports: any, successCallback: any) => {
				const newImports = {
					...odinImports,
					...imports
				};
				
				return WebAssembly.instantiateStreaming(
					fetch(`/games/${slug}/index.wasm`), 
					newImports
				).then(function(output) {
					const e = output.instance.exports;
					odinMemoryInterface.setExports(e);
					odinMemoryInterface.setMemory(e.memory);
					return successCallback(output.instance);
				});
			},
			onRuntimeInitialized: () => {
				// @ts-ignore
				const e = window.wasmExports;
				
				// Initialize the game
				e._start();
				e.main_start();
				
				function send_resize() {
					const canvas = document.getElementById('canvas') as HTMLCanvasElement;
					e.web_window_size_changed(canvas.width, canvas.height);
				}
				
				window.addEventListener('resize', function(event) {
					send_resize();
				}, true);
				
				send_resize();
				
				// Main game loop
				function do_main_update() {
					if (!e.main_update()) {
						e.main_end();
						e._end();
						return;
					}
					window.requestAnimationFrame(do_main_update);
				}
				
				window.requestAnimationFrame(do_main_update);
				
				// Hide loading screen
				gameLoading = false;
				gameInitialized = true;
			},
			print: function(text: string) {
				if (arguments.length > 1) {
					text = Array.prototype.slice.call(arguments).join(' ');
				}
				console.log(text);
			},
			canvas: document.getElementById('canvas')
		};
		
		// Load the main Emscripten script
		const script = document.createElement('script');
		script.src = `/games/${slug}/index.js`;
		script.async = true;
		script.onerror = () => {
			console.error('Failed to load game script');
			gameLoading = false;
		};
		document.body.appendChild(script);
	}
</script>

<svelte:head>
	{#if game}
		<title>{game.title} - Nate Wilson</title>
		<meta name="description" content={game.excerpt} />
	{:else}
		<title>Game Loading... - Nate Wilson</title>
	{/if}
</svelte:head>

{#if game}
	<div class="py-8">
		<!-- Navigation -->
		<nav class="mb-8">
			<a href="/games" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
				← Back to Games Archive
			</a>
		</nav>
		
		<!-- Game Header -->
		<div class="mb-8">
			<div class="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-6 bg-purple-50 dark:bg-purple-950/20">
				<div class="flex items-center gap-3 mb-3">
					<span class="text-3xl">🎮</span>
					<h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
						{game.title}
					</h1>
					{#if game.status === 'complete'}
						<span class="text-sm px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
							Complete
						</span>
					{/if}
				</div>
				<p class="text-lg text-gray-600 dark:text-gray-300 mb-3">
					{game.excerpt}
				</p>
				{#if game.playable && game.status === 'complete'}
					<p class="text-sm text-gray-500 dark:text-gray-400">
						Controls: WASD to move, auto-fires at enemies • Full screen recommended
					</p>
				{/if}
			</div>
		</div>

		{#if game.playable && game.status === 'complete'}
			<!-- Game Container -->
			<div class="game-container mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
				<div class="relative bg-black border-2 border-gray-800 dark:border-gray-600 rounded-lg overflow-hidden mx-4 sm:mx-6 lg:mx-8">
					<canvas 
						id="canvas" 
						class="game-canvas block w-full"
						width="1920"
						height="1080"
					></canvas>
					
					{#if gameLoading}
						<div class="absolute inset-0 flex items-center justify-center bg-black/80">
							<div class="text-center text-white">
								<div class="animate-spin text-4xl mb-4">🎮</div>
								<p class="text-xl">Loading {game.title}...</p>
								<p class="text-sm mt-2 opacity-75">Preparing the geometric carnage...</p>
							</div>
						</div>
					{/if}
				</div>
				
				<div class="mt-4 text-center">
					<p class="text-sm text-gray-500 dark:text-gray-400">
						Having issues? Try refreshing the page or check your browser's console for errors.
					</p>
				</div>
			</div>
		{:else}
			<!-- Not Playable Message -->
			<div class="mb-8">
				<div class="border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg p-8 bg-orange-50 dark:bg-orange-950/20 text-center">
					<span class="text-6xl mb-4 block">🚧</span>
					<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
						{game.status === 'in-progress' ? 'Work in Progress' : 'Coming Eventually™'}
					</h2>
					<p class="text-gray-600 dark:text-gray-300">
						{game.status === 'in-progress' 
							? 'This game is currently being developed. Check back later for updates!'
							: 'This game is still in the planning phase. It\'ll happen when it happens.'}
					</p>
				</div>
			</div>
		{/if}

		<!-- Game Details -->
		<div class="grid md:grid-cols-2 gap-8">
			<!-- Description -->
			<div>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-purple-300 dark:border-purple-700 pb-1">
					About This Game
				</h2>
				<div class="prose prose-gray dark:prose-invert max-w-none">
					{@html game.content}
				</div>
			</div>
			
			<!-- Meta Info -->
			<div class="space-y-6">
				{#if game.technologies && game.technologies.length > 0}
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Built With</h3>
						<div class="flex flex-wrap gap-2">
							{#each game.technologies as tech}
								<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				{/if}
				
				{#if game.github || game.demo}
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Links</h3>
						<div class="space-y-2">
							{#if game.github}
								<a href={game.github} class="block text-blue-600 dark:text-blue-400 hover:underline">
									→ View Source Code
								</a>
							{/if}
							{#if game.demo}
								<a href={game.demo} class="block text-blue-600 dark:text-blue-400 hover:underline">
									→ External Demo
								</a>
							{/if}
						</div>
					</div>
				{/if}
				
				{#if game.date}
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Development Info</h3>
						<div class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
							<p>Started: {new Date(game.date).toLocaleDateString()}</p>
							<p>Status: {game.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
							{#if game.playable}
								<p>Playable: Yes ✅</p>
							{:else}
								<p>Playable: Not yet ⏳</p>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="py-8">
		<div class="text-center">
			<div class="animate-spin text-4xl mb-4">🎮</div>
			<p class="text-xl text-gray-600 dark:text-gray-300">Loading game...</p>
		</div>
	</div>
{/if}

<style>
	.game-container {
		width: 100%;
		max-width: 100vw;
	}
	
	.game-canvas {
		background-color: black;
		width: 100%;
		height: 60vh;
		min-height: 500px;
		max-height: 800px;
		object-fit: contain;
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
	}
	
	/* Larger canvas on bigger screens */
	@media (min-width: 1024px) {
		.game-canvas {
			height: 70vh;
			max-height: 900px;
		}
	}
	
	/* Responsive canvas for mobile */
	@media (max-width: 768px) {
		.game-canvas {
			height: 50vh;
			min-height: 400px;
		}
	}
</style>