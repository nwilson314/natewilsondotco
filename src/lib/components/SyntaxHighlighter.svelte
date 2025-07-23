<script lang="ts">
	import { onMount } from 'svelte';
	
	let { content } = $props<{ content: string }>();
	let containerRef: HTMLDivElement;

	function highlightCode() {
		if (typeof window !== 'undefined' && window.Prism && containerRef) {
			// Find all code blocks within this component
			const codeBlocks = containerRef.querySelectorAll('pre[class*="language-"] code');
			codeBlocks.forEach(block => {
				window.Prism.highlightElement(block);
			});
		}
	}

	onMount(() => {
		highlightCode();
	});

	// Use $effect to re-highlight when content changes (Svelte 5 way)
	$effect(() => {
		if (content) {
			// Small delay to ensure DOM is updated
			setTimeout(highlightCode, 0);
		}
	});
</script>

<div bind:this={containerRef}>
	{@html content}
</div>