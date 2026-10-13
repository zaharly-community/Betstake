import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this repository from /Betstake/.
// Other environments (local dev or a root-domain host) use /.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/Betstake/' : '/',
});
