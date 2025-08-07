// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  // Configuração para o serviço de usuário
  userApi: {
    input: 'http://localhost:8081/v3/api-docs',
    output: {
      target: './src/app/api/generated/user/user-api.ts',
      client: 'angular',
      schemas: './src/app/api/generated/user/model',
      // Base URL para requisições do frontend
      baseUrl: 'http://localhost:8080', 
    },
  },

  // Configuração para o serviço de pagamento (NOVO)
  paymentApi: {
    input: 'http://localhost:8082/v3/api-docs',
    output: {
      target: './src/app/api/generated/payment/payment-api.ts',
      client: 'angular',
      schemas: './src/app/api/generated/payment/model',
      // Base URL para requisições do frontend
      baseUrl: 'http://localhost:8080', 
    },
  },
});