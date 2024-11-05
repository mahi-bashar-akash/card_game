import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: [
                'resources/scss/style-sheet.scss',
                'resources/js/spa/app.js'
            ],
            refresh: true,
        }),
    ],
});
