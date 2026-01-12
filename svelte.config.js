import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readdirSync } from 'fs';
import { join } from 'path';

// Generate prerender entries
function generateEntries() {
	const entries = ['*'];
	
	try {
		// Add game entries explicitly since they're dynamic routes
		const gamesDir = join(process.cwd(), 'data', 'games');
		const gameFiles = readdirSync(gamesDir).filter(file => file.endsWith('.md'));
		for (const file of gameFiles) {
			entries.push(`/games/${file.replace('.md', '')}`);
		}
	} catch (error) {
		console.warn('Error discovering game entries:', error);
	}
	
	return entries;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for prerendering
		adapter: adapter({
			// Generate static files
			pages: 'public',
			assets: 'public',
			fallback: '404.html',
			precompress: false,
			strict: false
		}),
		
		// Enable prerendering for static generation
		prerender: {
			entries: generateEntries(),
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing files during prerender
				if (message.includes('404')) {
					return;
				}
				// Throw error for other issues
				throw new Error(message);
			},
			handleMissingId: ({ path, id, referrers, message }) => {
				// Ignore missing anchor links during prerender
				console.warn(`Missing anchor #${id} on ${path}, referenced by: ${referrers.join(', ')}`);
			}
		}
	}
};

export default config;
