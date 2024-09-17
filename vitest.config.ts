import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: ['src/data/*.ts'],
    },
  },
});
