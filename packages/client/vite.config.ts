import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        // changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  ssr: {
    target: 'node',
    format: 'cjs',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{ts,tsx,scss,html,ico,png,svg,jpg,js,css}'],
      },
      injectRegister: 'auto',
      manifest: {
        name: 'Valkyrie Adventure',
        short_name: 'Valkyrie Adventure',
        description: 'Adventure game',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'leaderboard.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'Background.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'Background2.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'Background-2.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'chest.png',
            sizes: '185x22',
            type: 'image/png',
          },
          {
            src: 'coin.png',
            sizes: '64x16',
            type: 'image/png',
          },
          {
            src: 'enemy.png',
            sizes: '249x47',
            type: 'image/png',
          },
          {
            src: 'enemy-falls.png',
            sizes: '260x37',
            type: 'image/png',
          },
          {
            src: 'enemy-falls-left.png',
            sizes: '260x37',
            type: 'image/png',
          },
          {
            src: 'enemy-left.png',
            sizes: '249x37',
            type: 'image/png',
          },
          {
            src: 'platform.png',
            sizes: '224x40',
            type: 'image/png',
          },
          {
            src: 'warrior.png',
            sizes: '274x35',
            type: 'image/png',
          },
          {
            src: 'warrior-fight.png',
            sizes: '192x40',
            type: 'image/png',
          },
          {
            src: 'warrior-fight-left.png',
            sizes: '192x40',
            type: 'image/png',
          },
          {
            src: 'warrior-left.png',
            sizes: '274x35',
            type: 'image/png',
          },
          {
            src: 'warrior-run.png',
            sizes: '352x32',
            type: 'image/png',
          },
          {
            src: 'warrior-run-left.png',
            sizes: '352x32',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
