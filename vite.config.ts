import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  // Relative base so the built site can be opened from file:// (offline gift).
  base: './',
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Inlines JS + CSS into index.html so `file://` works without a server.
    // mp3s remain external (loaded via relative paths from dist/assets/).
    viteSingleFile({
      removeViteModuleLoader: true,
      useRecommendedBuildConfig: false,
    }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Keep mp3s as external files (default Vite threshold is fine for everything
    // we have except large binaries — explicit 4 KB cap mirrors the default).
    assetsInlineLimit: 4096,
    // Inline dynamic imports so a double-clicked index.html (file://) works in
    // browsers that block ES module dynamic imports over file:// (e.g. Chrome).
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
