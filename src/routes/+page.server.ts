import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseFrontmatter } from '$lib/utils/markdown';

export const load: PageServerLoad = async () => {
	const results = {
		posts: [] as any[],
		projects: [] as any[]
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
		}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	} catch (error) {
		console.warn('Failed to load projects:', error);
	}

	return results;
};