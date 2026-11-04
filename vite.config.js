import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendTarget = env.VITE_API_BASE_URL || 'https://astropedia-ai.astroved.com'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/past-life-report': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})


