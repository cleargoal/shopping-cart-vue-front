import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import sass from 'sass';

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
});
