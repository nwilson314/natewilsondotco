import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseFrontmatter } from '$lib/utils/markdown';

export const load: PageServerLoad = async () => {
	const results = {
		posts: [] as any[],
		projects: [] as any[],
		games: [] as any[]
	};

	try {
		// Load blog posts
		const blogsDir = join(process.cwd(), 'data', 'blogs');
		const blogFiles = readdirSync(blogsDir).filter((file: string) => file.endsWith('.md'));
		
		results.posts = blogFiles.map(filename => {
			const filePath = join(blogsDir, filename);
			const content = readFileSync(filePath, 'utf-8');
			const { metadata, body } = parseFrontmatter(content);
			
			return {
				id: filename.replace('.md', ''),
				title: metadata.title || 'Untitled',
				excerpt: metadata.excerpt || '',
				date: metadata.date || '',
				updated: metadata.updated,
				tags: metadata.tags || [],
				featured: metadata.featured || false,
				readTime: metadata.readTime || '5 min read',
				content: body,
				series: metadata.series,
				series_part: metadata.series_part,
				series_featured: metadata.series_featured || false,
				image: metadata.image
			};
		}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	} catch (error) {
		console.warn('Failed to load blog posts:', error);
	}

	try {
		// Load projects
		const projectsDir = join(process.cwd(), 'data', 'projects');
		const projectFiles = readdirSync(projectsDir).filter((file: string) => file.endsWith('.md'));
		
		results.projects = projectFiles.map(filename => {
			const filePath = join(projectsDir, filename);
			const content = readFileSync(filePath, 'utf-8');
			const { metadata, body } = parseFrontmatter(content);
			
			return {
				id: filename.replace('.md', ''),
				title: metadata.title || 'Untitled',
				excerpt: metadata.excerpt || '',
				date: metadata.date || '',
				updated: metadata.updated,
				tags: metadata.tags || [],
				featured: metadata.featured || false,
				status: metadata.status || 'completed',
				github: metadata.github,
				demo: metadata.demo,
				technologies: metadata.technologies || [],
				content: body,
				image: metadata.image,
				images: metadata.images
			};
		}).sort((a, b) => {
			// Sort by: in-progress first, then featured, then by date
			const aInProgress = a.status === 'in-progress' ? 1 : 0;
			const bInProgress = b.status === 'in-progress' ? 1 : 0;
			if (aInProgress !== bInProgress) return bInProgress - aInProgress;
			
			const aFeatured = a.featured ? 1 : 0;
			const bFeatured = b.featured ? 1 : 0;
			if (aFeatured !== bFeatured) return bFeatured - aFeatured;
			
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	} catch (error) {
		console.warn('Failed to load projects:', error);
	}

	try {
		// Load games
		const gamesDir = join(process.cwd(), 'data', 'games');
		const gameFiles = readdirSync(gamesDir).filter((file: string) => file.endsWith('.md'));
		
		results.games = gameFiles.map(filename => {
			const filePath = join(gamesDir, filename);
			const content = readFileSync(filePath, 'utf-8');
			const { metadata, body } = parseFrontmatter(content);
			
			return {
				id: filename.replace('.md', ''),
				title: metadata.title || 'Untitled',
				excerpt: metadata.excerpt || '',
				date: metadata.date || '',
				tags: metadata.tags || [],
				featured: metadata.featured || false,
				status: metadata.status || 'planned',
				playable: metadata.playable || false,
				technologies: metadata.technologies || [],
				content: body
			};
		}).sort((a, b) => {
			// Playable games first, then by date
			const aPlayable = a.playable ? 1 : 0;
			const bPlayable = b.playable ? 1 : 0;
			if (aPlayable !== bPlayable) return bPlayable - aPlayable;
			
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	} catch (error) {
		console.warn('Failed to load games:', error);
	}

	return results;
};
