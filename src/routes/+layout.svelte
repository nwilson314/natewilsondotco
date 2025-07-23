<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	
	onMount(() => {
		// Initialize Prism.js after components mount
		if (typeof window !== 'undefined' && window.Prism) {
			window.Prism.highlightAll();
		}
	});
</script>

<svelte:head>
	<!-- Prism.js core and components -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
	
	<!-- Custom clean syntax highlighting styles -->
	<style>
		/* Clean syntax highlighting styles */
		pre[class*="language-"] {
			background: rgb(243 244 246) !important; /* gray-100 */
			color: rgb(31 41 55) !important; /* gray-800 */
			border-radius: 0.5rem;
			padding: 1rem;
			overflow-x: auto;
			margin: 1.5rem 0;
			border: none;
			box-shadow: none;
		}
		
		@media (prefers-color-scheme: dark) {
			pre[class*="language-"] {
				background: rgb(31 41 55) !important; /* gray-800 */
				color: rgb(229 231 235) !important; /* gray-200 */
			}
		}
		
		code[class*="language-"] {
			background: transparent !important;
			color: inherit !important;
			font-size: 0.875rem;
			font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
		}
		
		/* Odin syntax highlighting */
		.token.keyword {
			color: rgb(147 51 234) !important; /* purple-600 */
			font-weight: 600;
		}
		
		.token.type {
			color: rgb(59 130 246) !important; /* blue-500 */
			font-weight: 500;
		}
		
		.token.function {
			color: rgb(16 185 129) !important; /* emerald-500 */
			font-weight: 500;
		}
		
		.token.string {
			color: rgb(34 197 94) !important; /* green-500 */
		}
		
		.token.comment {
			color: rgb(107 114 128) !important; /* gray-500 */
			font-style: italic;
		}
		
		.token.number {
			color: rgb(249 115 22) !important; /* orange-500 */
		}
		
		.token.operator {
			color: rgb(239 68 68) !important; /* red-500 */
		}
		
		.token.punctuation {
			color: rgb(75 85 99) !important; /* gray-600 */
		}
		
		@media (prefers-color-scheme: dark) {
			.token.keyword {
				color: rgb(196 181 253) !important; /* purple-300 */
			}
			
			.token.type {
				color: rgb(147 197 253) !important; /* blue-300 */
			}
			
			.token.function {
				color: rgb(110 231 183) !important; /* emerald-300 */
			}
			
			.token.string {
				color: rgb(134 239 172) !important; /* green-300 */
			}
			
			.token.comment {
				color: rgb(156 163 175) !important; /* gray-400 */
			}
			
			.token.number {
				color: rgb(251 146 60) !important; /* orange-300 */
			}
			
			.token.operator {
				color: rgb(248 113 113) !important; /* red-400 */
			}
			
			.token.punctuation {
				color: rgb(156 163 175) !important; /* gray-400 */
			}
		}
	</style>
	
	<!-- Custom Odin language definition -->
	<script>
		// Define Odin language when Prism loads
		window.addEventListener('load', function() {
			if (window.Prism) {
				// Define Odin language syntax
				Prism.languages.odin = {
					'comment': [
						{
							pattern: /\/\/.*$/m,
							greedy: true
						},
						{
							pattern: /\/\*[\s\S]*?\*\//,
							greedy: true
						}
					],
					'string': {
						pattern: /"(?:[^"\\]|\\.)*"/,
						greedy: true
					},
					'keyword': /\b(?:package|import|proc|struct|enum|union|using|defer|when|if|else|for|switch|case|break|continue|fallthrough|return|in|not_in|cast|transmute|auto_cast|distinct|opaque|typeid|size_of|align_of|offset_of|type_info_of|type_of|context|or_else|or_return|map|dynamic|bit_set|matrix|quaternion|complex|rune|rawptr|cstring|nil|true|false|ODIN_OS|ODIN_ARCH|ODIN_ENDIAN|ODIN_VENDOR|ODIN_VERSION|ODIN_ROOT|ODIN_DEBUG|ODIN_DISABLE_ASSERT|ODIN_DEFAULT_TO_NIL_ALLOCATOR|ODIN_DEFAULT_TO_PANIC_ALLOCATOR|ODIN_FOREIGN_ERROR_PROCEDURES|where|inline|no_inline|static|foreign|export|link_name|link_prefix|linkage|cc_c|cc_std|cc_fast|cc_none|cc_contextless|builtin|intrinsics|type|const|var|set)\b/,
					'type': /\b(?:bool|b8|b16|b32|b64|i8|i16|i32|i64|i128|int|u8|u16|u32|u64|u128|uint|uintptr|f16|f32|f64|f16le|f32le|f64le|f16be|f32be|f64be|byte|rune|string|cstring|rawptr|typeid|any)\b/,
					'function': /\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*::?\s*proc)/,
					'number': /\b(?:0x[a-fA-F0-9]+|0o[0-7]+|0b[01]+|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?[ijk]?)\b/,
					'operator': /(?:::|:=|:|\+\+|--|&&|\|\||==|!=|<=|>=|<|>|\+|-|\*|\/|%|\^|&|\||~|<<|>>|\?|!)/,
					'punctuation': /[{}[\]();,.]/
				};
			}
		});
	</script>
</svelte:head>

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
	<Header />
	
	<main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
		{@render children()}
	</main>
	
	<Footer />
</div>
