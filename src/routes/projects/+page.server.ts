import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseFrontmatter } from '$lib/utils/markdown';

export const load: PageServerLoad = async () => {
	try {
		// Read projects from the data directory during build time
		const projectsDir = join(process.cwd(), 'data', 'projects');
		const projectFiles = readdirSync(projectsDir).filter((file: string) => file.endsWith('.md'));
		
		const projects = projectFiles.map((filename: string) => {
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
		});

		const featuredProjects = projects.filter((p: any) => p.featured);
		const inProgressProjects = projects.filter((p: any) => !p.featured && p.status === 'in-progress');
		const otherProjects = projects.filter((p: any) => !p.featured && p.status !== 'in-progress');

		return {
			projects,
			featuredProjects,
			inProgressProjects,
			otherProjects
		};
	} catch (error) {
		console.error('Failed to load projects:', error);
		return {
			projects: [],
			featuredProjects: [],
			inProgressProjects: [],
			otherProjects: []
		};
	}
}; 