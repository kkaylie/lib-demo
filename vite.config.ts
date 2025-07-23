import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
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
  ],
})
