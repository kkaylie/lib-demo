/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        test: {
          environment: 'happy-dom',
          include: ['packages/**/__tests__/**/*.test.ts'],
          exclude: ['packages/**/stories/*.stories.ts'],
        },
        plugins: [vue()],
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{
              browser: 'chromium'
            }]
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          exclude: ['packages/**/__tests__/**/*.test.ts'],
        },

      }
    ],
    coverage: {
      // provider: 'v8',
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['packages/**/*.{vue,ts}'],

      // 4. 配置需要从覆盖率统计中排除的文件
      exclude: [
        'node_modules/',
        'dist/',
        'packages/**/__tests__/**',
        'packages/**/*.stories.ts',
        'packages/index.ts', // 排除主入口文件
        '.storybook/',
        'coverage/', // 排除覆盖率报告本身
        // 排除所有配置文件
        '**/*.config.ts',
        '**/*.config.js',
        // 排除类型声明文件
        '**/*.d.ts',
        // 排除你的 demo 应用（如果它在 src 目录）
        'src/',
      ],
    },
  },
  plugins: [vue()]
});
