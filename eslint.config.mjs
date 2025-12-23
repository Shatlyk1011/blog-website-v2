import { defineConfig } from "eslint/config";
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  {
    ignores: ['**/*.spec.ts', '**/*.spec.tsx'],
  },
  {
    extends: [...nextCoreWebVitals],
  },
])