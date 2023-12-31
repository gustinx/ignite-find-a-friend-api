import { defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [viteTsConfigPaths()],
  test: {
    environmentMatchGlobs: [['./src/http/controller/**', 'prisma']],
  },
})
