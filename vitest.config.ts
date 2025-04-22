/// <reference types="vitest" />

import { configDefaults } from 'vitest/config';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    exclude: ['./node_modules/**', ...configDefaults.exclude, './**/mocks/**', './**/setupTest*.tsx'],
    include: ['./src/**/*.spec/ts', './src/**/*.spec.tsx'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'postcss/config.js',
        'tailwind.config.js',
        '.eslintrc.cjs',
        'vitest.config.js',
        'vite.config.ts',
        './**/mocks/**',
        './**/setupTest*.tsx',
        '**/test/**',
        './dist/**',
      ],
    },
  },
});
