import { error } from '@sveltejs/kit';
import { parseFrontmatter } from '$lib/utils/markdown';
import { markdownToHtml } from '$lib/utils/markdownRenderer';
import type { PageServerLoad } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const gamePath = join(process.cwd(), 'data', 'games', `${params.slug}.md`);
		const content = readFileSync(gamePath, 'utf-8');
		const { metadata, body } = parseFrontmatter(content);
		
		const game = {
			id: params.slug,
			title: metadata.title || 'Untitled Game',
			excerpt: metadata.excerpt || '',
			date: metadata.date || '',
			updated: metadata.updated,
			tags: metadata.tags || [],
			featured: metadata.featured || false,
			status: metadata.status || 'planned',
			playable: metadata.playable || false,
			github: metadata.github,
			demo: metadata.demo,
			technologies: metadata.technologies || [],
			content: markdownToHtml(body),
			image: metadata.image,
			images: metadata.images
		};
		
		return {
			game
		};
	} catch (err) {
		console.error(`Failed to load game ${params.slug}:`, err);
		throw error(404, 'Game not found');
	}
};