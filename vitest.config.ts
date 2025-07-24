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
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      include: ['packages/**/*.{vue,ts}'],
      exclude: [
        'node_modules/',
        'dist/',
        'packages/**/__tests__/**',
        'packages/**/*.stories.ts',
        'packages/index.ts',
        '.storybook/',
        'coverage/',
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.d.ts',
        'src/',
      ],
    },
  },
  plugins: [vue()]
});
