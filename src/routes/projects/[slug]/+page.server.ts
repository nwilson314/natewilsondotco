import { error } from '@sveltejs/kit';
import { parseFrontmatter } from '$lib/utils/markdown';
import type { PageServerLoad } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const projectPath = join(process.cwd(), 'data', 'projects', `${params.slug}.md`);
		const content = readFileSync(projectPath, 'utf-8');
		const { metadata, body } = parseFrontmatter(content);
		
		const project = {
			id: params.slug,
			title: metadata.title || 'Untitled',
			excerpt: metadata.excerpt || '',
			date: metadata.date || '',
			updated: metadata.updated,
			tags: metadata.tags || [],
			featured: metadata.featured || false,
			status: metadata.status || 'planned',
			github: metadata.github,
			demo: metadata.demo,
			technologies: metadata.technologies || [],
			content: body,
			image: metadata.image,
			images: metadata.images
		};
		
		return {
			project
		};
	} catch (err) {
		console.error(`Failed to load project ${params.slug}:`, err);
		throw error(404, 'Project not found');
	}
};