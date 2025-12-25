import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor'
          }
          // NOTE: CodeMirror chunking removed - it has internal circular dependencies
          // that require specific initialization order. Let Rollup handle it naturally.
          // Utils vendor chunk
          if (id.includes('node_modules/zustand') || id.includes('node_modules/clsx') || id.includes('node_modules/canvas-confetti')) {
            return 'utils-vendor'
          }
          // Other node_modules go into default chunk (except CodeMirror which needs natural ordering)
          if (id.includes('node_modules') && !id.includes('@codemirror') && !id.includes('codemirror')) {
            return 'vendor'
          }
        },
      },
    },
  },
  preview: {
    allowedHosts: process.env.VITE_ALLOWED_HOST ? [process.env.VITE_ALLOWED_HOST] : [],
  },
})
