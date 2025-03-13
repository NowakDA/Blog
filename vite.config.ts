import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "src/styles/theme.less";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
