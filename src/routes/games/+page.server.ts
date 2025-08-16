import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseFrontmatter } from '$lib/utils/markdown';

export const load: PageServerLoad = async () => {
	try {
		// Read games from the data directory during build time
		const gamesDir = join(process.cwd(), 'data', 'games');
		const gameFiles = readdirSync(gamesDir).filter((file: string) => file.endsWith('.md'));
		
		const games = gameFiles.map((filename: string) => {
			const filePath = join(gamesDir, filename);
			const content = readFileSync(filePath, 'utf-8');
			const { metadata, body } = parseFrontmatter(content);
			
			return {
				id: filename.replace('.md', ''),
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
				content: body,
				image: metadata.image,
				images: metadata.images
			};
		});

		// Sort by date (newest first)
		const sortedGames = games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return {
			games: sortedGames
		};
	} catch (error) {
		console.error('Failed to load games:', error);
		return {
			games: []
		};
	}
};