import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import _istanbul from 'vite-plugin-istanbul'

const istanbul = (_istanbul as any).default || _istanbul;

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  base: '/lib-demo/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: 'packages/index.ts',
      name: 'MyLibrary',
      fileName: (format) => `my-library.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    istanbul({
      // 配置需要被插桩的文件
      include: 'packages/**/*',
      // 配置不需要被插桩的文件
      exclude: [
        'node_modules',
        'test/',
        'dist/',
        '.storybook/',
        'coverage/',
      ],
      // 只在测试时启用
      // requireEnv: true,
    }),
    tailwindcss(),
  ],
})
