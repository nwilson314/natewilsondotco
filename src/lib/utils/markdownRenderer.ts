export function markdownToHtml(markdown: string): string {
	let html = markdown;

	// Helper function to create anchor IDs from header text
	function createAnchorId(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
			.replace(/\s+/g, '-')     // Replace spaces with hyphens
			.replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
			.trim();
	}

	// Headers with dark mode classes and anchor IDs (reduced spacing)
	// Add newlines after headers to ensure proper paragraph separation
	html = html.replace(/^### (.*$)/gm, (match, headerText) => {
		const id = createAnchorId(headerText);
		return `<h3 id="${id}" class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">${headerText}</h3>\n`;
	});
	html = html.replace(/^## (.*$)/gm, (match, headerText) => {
		const id = createAnchorId(headerText);
		return `<h2 id="${id}" class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">${headerText}</h2>\n`;
	});
	html = html.replace(/^# (.*$)/gm, (match, headerText) => {
		const id = createAnchorId(headerText);
		return `<h1 id="${id}" class="text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">${headerText}</h1>\n`;
	});

	// Code blocks first (to avoid conflicts with other patterns)
	html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-6"><code class="text-sm text-gray-800 dark:text-gray-200">$1</code></pre>');
	
	// Inline code with dark mode
	html = html.replace(/`([^`]*)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-sm">$1</code>');

	// Images (process before links to avoid conflicts)
	html = html.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, (match, altText, imageUrl) => {
		// Check if it's a relative path (local image)
		if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
			imageUrl = `/images/${imageUrl}`;
		}
		
		return `<div class="my-6">
			<img src="${imageUrl}" alt="${altText}" class="rounded-lg shadow-md max-w-full h-auto mx-auto" loading="lazy" />
			${altText ? `<p class="text-sm text-gray-600 dark:text-gray-400 text-center mt-2 italic">${altText}</p>` : ''}
		</div>`;
	});

	// Links with dark mode and hover states (handle internal vs external)
	html = html.replace(/\[([^\]]*)\]\(([^)]*)\)/g, (match, linkText, linkUrl) => {
		// Check if it's an internal anchor link
		if (linkUrl.startsWith('#')) {
			return `<a href="${linkUrl}" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors">${linkText}</a>`;
		} else {
			// External link
			return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors">${linkText}</a>`;
		}
	});

	// Horizontal rules (reduced spacing)
	html = html.replace(/^[\-_]{3,}$/gm, '<hr class="border-t border-gray-300 dark:border-gray-600 my-6" />');

	// Process lists BEFORE bold/italic to avoid interference
	// Find ordered list blocks (number. followed by content and nested items)
	html = html.replace(/(?:^\d+\.\s+.*(?:\n(?:   -.*|    -.*|\s*$))*)+/gm, (match) => {
		const lines = match.trim().split('\n');
		let result = '<ol class="my-4" style="list-style-type: decimal; padding-left: 2rem; counter-reset: item;">\n';
		
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			
			if (line.match(/^\d+\.\s+(.*)$/)) {
				// Ordered list item
				const content = line.replace(/^\d+\.\s+(.*)$/, '$1');
				result += `  <li class="text-gray-700 dark:text-gray-300 mb-2" style="display: list-item; counter-increment: item;">${content}`;
				
				// Check for nested bullets on following lines
				let j = i + 1;
				const nestedItems = [];
				while (j < lines.length && lines[j].match(/^\s{3,}-\s+/)) {
					const nestedContent = lines[j].replace(/^\s{3,}-\s+(.*)$/, '$1');
					nestedItems.push(nestedContent);
					j++;
				}
				
				if (nestedItems.length > 0) {
					result += '\n    <ul class="list-disc mt-1 ml-4">\n';
					nestedItems.forEach(item => {
						result += `      <li class="text-gray-700 dark:text-gray-300">${item}</li>\n`;
					});
					result += '    </ul>\n';
					i = j - 1; // Skip the nested items we just processed
				}
				
				result += '</li>\n';
			}
		}
		
		result += '</ol>';
		return result;
	});

	// Handle unordered lists with nested items
	// First handle nested items (2+ spaces before -)
	html = html.replace(/^  - (.*$)/gm, '<NESTED_ITEM>$1</NESTED_ITEM>');
	
	// Then handle top-level items
	html = html.replace(/^- (.*$)/gm, '<TOP_ITEM>$1</TOP_ITEM>');
	
	// Convert to proper HTML structure
	html = html.replace(/(<TOP_ITEM>.*?)(<NESTED_ITEM>.*?<\/NESTED_ITEM>)/gs, (match, topItem, nestedItems) => {
		const topContent = topItem.replace('<TOP_ITEM>', '').replace('</TOP_ITEM>', '');
		const nestedContent = nestedItems.replace(/<NESTED_ITEM>(.*?)<\/NESTED_ITEM>/g, '<li class="text-gray-700 dark:text-gray-300">$1</li>');
		return `<li class="text-gray-700 dark:text-gray-300 mb-2">${topContent}<ul class="list-disc pl-4 mt-1 space-y-1">${nestedContent}</ul></li>`;
	});
	
	// Handle remaining nested items
	html = html.replace(/<NESTED_ITEM>(.*?)<\/NESTED_ITEM>/g, '<li class="text-gray-700 dark:text-gray-300">$1</li>');
	
	// Handle remaining top-level items
	html = html.replace(/<TOP_ITEM>(.*?)<\/TOP_ITEM>/g, '<li class="text-gray-700 dark:text-gray-300">$1</li>');
	
	// Wrap all list items in ul
	html = html.replace(/(<li class="text-gray-700 dark:text-gray-300[^>]*">.*?<\/li>\s*)+/gs, (match) => {
		return `<ul class="list-disc pl-6 space-y-2 my-3">${match}</ul>`;
	});

	// Bold and italic with dark mode (AFTER lists to avoid interference)
	html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white"><em class="italic">$1</em></strong>');
	html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
	html = html.replace(/(?<!\w)\*([^*\n]+?)\*(?!\w)/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>');

	// Clean up excessive whitespace
	html = html.replace(/\n{3,}/g, '\n\n');
	
	// Split into blocks and wrap paragraphs
	const blocks = html.split(/\n\s*\n/);
	
	html = blocks
		.map(block => {
			const trimmed = block.trim();
			// Don't wrap if already wrapped in block elements
			if (trimmed.match(/^<(h[1-6]|ul|ol|li|pre|blockquote|hr)/)) {
				return trimmed;
			}
			// Don't wrap empty blocks
			if (!trimmed) {
				return '';
			}
			// Don't wrap single words that might be part of a list or other structure
			if (trimmed.split(/\s+/).length < 2 && !trimmed.match(/[.!?]$/)) {
				return trimmed;
			}
			// Use smaller margin for paragraphs
			return `<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">${trimmed.replace(/\n/g, ' ')}</p>`;
		})
		.filter(p => p)
		.join('\n');

	return html;
}