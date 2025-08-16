import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for prerendering
		adapter: adapter({
			// Generate static files
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		
		// Enable prerendering for static generation
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing files during prerender
				if (message.includes('404')) {
					return;
				}
				// Throw error for other issues
				throw new Error(message);
			}
		}
	}
};

export default config;
