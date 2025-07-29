// orval.config.ts (or orval.config.js)
import { defineConfig } from 'orval';

export default defineConfig({
  plataformaApi: {
    input: 'http://localhost:8081/v3/api-docs', // This is where Orval fetches the API definition
    output: {
      target: './src/app/api/generated/plataforma-api.ts',
      client: 'angular',
      schemas: './src/app/api/generated/model',
      // --- ADD THIS LINE ---
      baseUrl: 'http://localhost:8080', // <--- This is where the GENERATED CLIENT will send requests
                                         // Orval will concatenate this with paths like /auth/register
    },
  },
});