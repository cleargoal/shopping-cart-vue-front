import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
            `
              @import "./src/assets/styles/main.scss";
              @import 'primeflex/primeflex.css';
              @import 'primevue/resources/primevue.min.css';
            `
      }
    }
  },
});
