export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	updated?: string;
	tags: string[];
	featured: boolean;
	readTime: string;
	content: string;
	series?: string;
	series_part?: number;
	series_featured?: boolean;
	series_description?: string; // Description for the series (used on first post)
	image?: string; // Featured image for blog posts
}

export interface BlogSeries {
	name: string;
	description?: string;
	featured: boolean;
	posts: BlogPost[];
	latestPost: BlogPost;
	firstPost: BlogPost;
	totalPosts: number;
}

export interface Project {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	updated?: string;
	tags: string[];
	featured: boolean;
	status?: 'completed' | 'in-progress' | 'planned';
	github?: string;
	demo?: string;
	technologies: string[];
	content: string;
	image?: string; // Thumbnail image for project cards
	images?: string[]; // Gallery images for project details
}

export interface Game {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	updated?: string;
	tags: string[];
	featured: boolean;
	status: 'complete' | 'in-progress' | 'planned';
	playable: boolean;
	github?: string;
	demo?: string;
	technologies: string[];
	content: string;
	image?: string; // Thumbnail image for game cards
	images?: string[]; // Gallery images for game details
}

export function parseFrontmatter(content: string): { metadata: Record<string, any>; body: string } {
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);
	
	if (!match) {
		return { metadata: {}, body: content };
	}
	
	const [, frontmatter, body] = match;
	const metadata: Record<string, unknown> = {};
	
	// Simple YAML parser for frontmatter
	const lines = frontmatter.trim().split('\n');
	for (const line of lines) {
		const [key, ...valueParts] = line.split(':');
		if (key && valueParts.length > 0) {
			let value: unknown = valueParts.join(':').trim();
			
			// Remove quotes
			if (typeof value === 'string') {
				value = value.replace(/^\"|\"$/g, '');

				// Parse arrays (simple format: ["item1", "item2"])
				if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
					try {
						value = JSON.parse(value);
					} catch {
						// If JSON parsing fails, treat as string
					}
				}

				// Parse numbers
				if (typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '') {
					value = Number(value);
				}

				// Parse booleans
				if (typeof value === 'string' && value === 'true') value = true;
				if (typeof value === 'string' && value === 'false') value = false;
			}
			metadata[key.trim()] = value;
		}
	}
	
	return { metadata, body };
}

export async function loadBlogPost(filename: string): Promise<BlogPost> {
	const response = await fetch(`/data/blogs/${filename}`);
	const content = await response.text();
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
		series_description: metadata.series_description,
		image: metadata.image
	};
}

export async function loadProject(filename: string): Promise<Project> {
	const response = await fetch(`/data/projects/${filename}`);
	const content = await response.text();
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
}

async function discoverMarkdownFiles(path: string): Promise<string[]> {
	try {
		// Try to fetch an index file that lists all markdown files
		const response = await fetch(`${path}/index.json`);
		if (response.ok) {
			const files = await response.json();
			return files.filter((file: string) => file.endsWith('.md'));
		}
	} catch {
		// If index.json doesn't exist, we'll need to fallback
	}
	
	// Fallback: try common file patterns or return empty array
	// This is a limitation of client-side file discovery
	return [];
}

export async function loadAllBlogPosts(): Promise<BlogPost[]> {
	const blogFiles = await discoverMarkdownFiles('/data/blogs');
	
	// If no files discovered, try known files as fallback
	const filesToTry = blogFiles.length > 0 ? blogFiles : ['continuing_education.md'];
	
	const posts: BlogPost[] = [];
	
	for (const filename of filesToTry) {
		try {
			const post = await loadBlogPost(filename);
			posts.push(post);
		} catch (error) {
			console.warn(`Failed to load blog post: ${filename}`, error);
		}
	}
	
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function loadAllProjects(): Promise<Project[]> {
	const projectFiles = await discoverMarkdownFiles('/data/projects');
	
	// If no files discovered, try known files as fallback
	const filesToTry = projectFiles.length > 0 ? projectFiles : ['personal-website.md'];
	
	const projects: Project[] = [];
	
	for (const filename of filesToTry) {
		try {
			const project = await loadProject(filename);
			projects.push(project);
		} catch (error) {
			console.warn(`Failed to load project: ${filename}`, error);
		}
	}
	
	return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Series-related functions
export function createBlogSeries(blogs: BlogPost[]): BlogSeries[] {
	const seriesMap: Record<string, BlogPost[]> = {};
	
	// Group posts by series
	blogs.forEach(blog => {
		if (blog.series) {
			if (!seriesMap[blog.series]) {
				seriesMap[blog.series] = [];
			}
			seriesMap[blog.series].push(blog);
		}
	});
	
	// Create BlogSeries objects
	return Object.entries(seriesMap).map(([seriesName, seriesPosts]) => {
		// Sort posts by series_part
		const sortedPosts = seriesPosts.sort((a, b) => (a.series_part || 0) - (b.series_part || 0));
		
		// Determine if series is featured (any post in series has series_featured = true)
		const featured = seriesPosts.some(post => post.series_featured);
		
		// Get latest post (most recent date)
		const latestPost = seriesPosts.reduce((latest, current) => 
			new Date(current.date) > new Date(latest.date) ? current : latest
		);
		
		// Get first post (lowest series_part for description)
		const firstPost = sortedPosts[0];
		
		return {
			name: seriesName,
			description: firstPost.series_description,
			featured,
			posts: sortedPosts,
			latestPost,
			firstPost,
			totalPosts: seriesPosts.length
		};
	}).sort((a, b) => {
		// Sort featured series first, then by latest post date
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;
		return new Date(b.latestPost.date).getTime() - new Date(a.latestPost.date).getTime();
	});
}

export function getFeaturedSeries(blogs: BlogPost[]): BlogSeries[] {
	return createBlogSeries(blogs).filter(series => series.featured);
}

export function getStandalonePosts(blogs: BlogPost[]): BlogPost[] {
	return blogs.filter(blog => !blog.series);
}

export function getSeriesNavigation(blogs: BlogPost[], currentBlog: BlogPost): {
	previous?: BlogPost;
	next?: BlogPost;
	seriesBlogs: BlogPost[];
} {
	if (!currentBlog.series) {
		return { seriesBlogs: [] };
	}
	
	const seriesBlogs = blogs
		.filter(blog => blog.series === currentBlog.series)
		.sort((a, b) => (a.series_part || 0) - (b.series_part || 0));
	
	const currentIndex = seriesBlogs.findIndex(blog => blog.id === currentBlog.id);
	
	return {
		previous: currentIndex > 0 ? seriesBlogs[currentIndex - 1] : undefined,
		next: currentIndex < seriesBlogs.length - 1 ? seriesBlogs[currentIndex + 1] : undefined,
		seriesBlogs
	};
}

// Games-related functions
export async function loadGame(filename: string): Promise<Game> {
	const response = await fetch(`/data/games/${filename}.md`);
	const content = await response.text();
	const { metadata, body } = parseFrontmatter(content);
	
	return {
		id: filename,
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
}

export async function loadAllGames(): Promise<Game[]> {
	const gameFiles = await discoverMarkdownFiles('/data/games');
	
	// If no files discovered, try known files as fallback
	const filesToTry = gameFiles.length > 0 ? gameFiles : ['the-last-polygon.md'];
	
	const games: Game[] = [];
	
	for (const filename of filesToTry) {
		try {
			const game = await loadGame(filename.replace('.md', ''));
			games.push(game);
		} catch (error) {
			console.warn(`Failed to load game: ${filename}`, error);
		}
	}
	
	return games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}