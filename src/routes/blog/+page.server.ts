import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseFrontmatter } from '$lib/utils/markdown';

export const load: PageServerLoad = async () => {
	try {
		// Read blog posts from the data directory during build time
		const blogsDir = join(process.cwd(), 'data', 'blogs');
		const blogFiles = readdirSync(blogsDir).filter((file: string) => file.endsWith('.md'));
		
		const posts = blogFiles.map(filename => {
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
		});

		// Sort by date (newest first)
		const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return {
			posts: sortedPosts
		};
	} catch (error) {
		console.error('Failed to load blog posts:', error);
		return {
			posts: []
		};
	}
}; 