import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    // This is the CRITICAL part for your deployment
    base: '/', 
    build: {
        outDir: 'dist', // This creates a 'dist' folder when you run 'npm run build'
        emptyOutDir: true,
    }
});
