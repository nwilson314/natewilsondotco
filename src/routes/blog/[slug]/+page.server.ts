import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseFrontmatter } from '$lib/utils/markdown';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { slug } = params;
		
		// Read the specific blog post
		const blogPath = join(process.cwd(), 'data', 'blogs', `${slug}.md`);
		const content = readFileSync(blogPath, 'utf-8');
		const { metadata, body } = parseFrontmatter(content);
		
		const post = {
			id: slug,
			title: metadata.title || 'Untitled',
			excerpt: metadata.excerpt || '',
			date: metadata.date || '',
			updated: metadata.updated || metadata.date || '',
			readTime: metadata.readTime || '5 min read',
			tags: metadata.tags || [],
			series: metadata.series || null,
			series_part: metadata.series_part || null,
			content: body,
			featured: metadata.featured || false
		};

		// Read all blog posts for series navigation
		const blogsDir = join(process.cwd(), 'data', 'blogs');
		const blogFiles = readdirSync(blogsDir).filter((file: string) => file.endsWith('.md'));
		
		const allBlogs = blogFiles.map(filename => {
			const filePath = join(blogsDir, filename);
			const fileContent = readFileSync(filePath, 'utf-8');
			const { metadata: fileMetadata } = parseFrontmatter(fileContent);
			
			return {
				id: filename.replace('.md', ''),
				title: fileMetadata.title || 'Untitled',
				date: fileMetadata.date || '',
				series: fileMetadata.series || null,
				series_part: fileMetadata.series_part || null
			};
		});

		// Get series navigation
		let seriesNavigation: { previous?: any; next?: any; seriesBlogs: any[] } = { previous: undefined, next: undefined, seriesBlogs: [] } as any;
		if (post.series) {
			const seriesBlogs = allBlogs
				.filter(blog => blog.series === post.series)
				.sort((a, b) => (a.series_part || 1) - (b.series_part || 1));
			
			const currentIndex = seriesBlogs.findIndex(blog => blog.id === slug);
			const previous = currentIndex > 0 ? seriesBlogs[currentIndex - 1] : undefined;
			const next = currentIndex < seriesBlogs.length - 1 ? seriesBlogs[currentIndex + 1] : undefined;
			
			seriesNavigation = { previous, next, seriesBlogs };
		}

		return {
			post,
			allBlogs,
			seriesNavigation
		};
	} catch (error) {
		console.error('Failed to load blog post:', error);
		return {
			post: null,
			allBlogs: [],
			seriesNavigation: { previous: undefined, next: undefined, seriesBlogs: [] } as any
		};
	}
}; 