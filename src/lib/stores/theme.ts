import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Simple writable store
const themeStore = writable<Theme>('light');

// Helper function to update DOM
function updateDOM(theme: Theme) {
	if (!browser) return;
	
	const html = document.documentElement;
	
	if (theme === 'dark') {
		html.classList.add('dark');
	} else {
		html.classList.remove('dark');
	}
}

// Initialize theme on first load
if (browser) {
	const saved = localStorage.getItem('theme') as Theme;
	const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const initial = saved || (systemPrefersDark ? 'dark' : 'light');
	
	themeStore.set(initial);
	updateDOM(initial);
}

export const theme = {
	subscribe: themeStore.subscribe,
	
	toggle: () => {
		const current = get(themeStore);
		const newTheme = current === 'light' ? 'dark' : 'light';
		
		themeStore.set(newTheme);
		updateDOM(newTheme);
		
		if (browser) {
			localStorage.setItem('theme', newTheme);
		}
	},
	
	set: (newTheme: Theme) => {
		themeStore.set(newTheme);
		updateDOM(newTheme);
		
		if (browser) {
			localStorage.setItem('theme', newTheme);
		}
	}
};