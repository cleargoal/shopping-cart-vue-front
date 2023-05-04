import {defineConfig} from 'vite';
import sass from 'sass';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'sass',
      // Use `sass` instead of `node-sass`
      transform: (code, id) => {
        if (/\.scss$/.test(id)) {
          const result = sass.renderSync({file: id});
          return {
            code: result.css.toString(),
          };
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        App: path.resolve(__dirname, 'src/app/App.vue'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules']
      }
    }
  },
});
