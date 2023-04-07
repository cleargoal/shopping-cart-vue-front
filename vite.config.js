import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sass from 'sass';

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'sass',
      renderChunk: (code) => {
        const { css } = sass.renderSync({ data: code });
        return { code: css.toString() };
      },
      enforce: 'pre',
    },
  ],
});
