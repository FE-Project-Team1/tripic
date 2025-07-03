import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/tripic/', // 레포지토리 이름으로 수정
  build: {
    outDir: 'dist',
  },
});
