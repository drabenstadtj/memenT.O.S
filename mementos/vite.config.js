import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // Server configuration
    server: {
      port: 5173,
      host: true, // Listen on all addresses
      strictPort: false,
    },

    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
      strictPort: false,
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },

    // Define global constants
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  }
})
