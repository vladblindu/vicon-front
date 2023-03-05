import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/uploads': 'http://localhost:1337',
			'/api': 'http://localhost:1337',
		},
	},
});
