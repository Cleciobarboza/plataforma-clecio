import { defineConfig } from 'orval';

export default defineConfig({
  plataformaApi: {
    input: 'http://localhost:8080/v3/api-docs',
    output: {
      target: './src/app/api/generated/plataforma-api.ts',
      client: 'angular',
      schemas: './src/app/api/generated/model',
    },
  },
});
