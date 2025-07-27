# FrontPlataforma

Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli), versão 20.0.4.

## ⚙️ Servidor de Desenvolvimento

Para iniciar o servidor local com proxy para o backend, execute:

```bash
ng serve --proxy-config proxy.conf.json
```

Depois, abra seu navegador e acesse `http://localhost:4200/`.

O aplicativo será recarregado automaticamente sempre que você modificar qualquer arquivo de origem.

---

## 🧱 Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `src/app/core`: configurações e serviços centrais
- `src/app/layouts`: componentes de layout
- `src/app/pages`: páginas da aplicação
- `src/app/shared`: componentes reutilizáveis
- `src/app/api`: cliente gerado via Orval (consome Swagger)

---

## 🚀 Geração de Código com Orval

Este projeto utiliza o [Orval](https://orval.dev) para gerar automaticamente os serviços de API baseados no Swagger do backend (Spring Boot + OpenAPI).

### Configuração

A configuração está no arquivo:

```ts
orval.config.ts
```

### Gerar os serviços da API:

```bash
npx orval
```

Isso irá criar os arquivos TypeScript com os endpoints, modelos e tipos no diretório configurado (ex: `src/app/api/generated`).

---

## 🛠️ Scaffolding (Geração de Código Angular)

O Angular CLI possui ferramentas poderosas de scaffolding. Para gerar um novo componente:

```bash
ng generate component nome-do-componente
```

Outros comandos úteis:

```bash
ng generate service nome-do-serviço
ng generate module nome-do-módulo
ng generate --help
```

---

## 🏗️ Build da Aplicação

Para compilar o projeto para produção:

```bash
ng build
```

Os artefatos compilados serão armazenados no diretório `dist/`. O build de produção inclui otimizações automáticas para melhor desempenho.

---

## 🧪 Testes Unitários

Para executar os testes unitários usando o [Karma](https://karma-runner.github.io):

```bash
ng test
```

---

## 🧪 Testes de Integração (End-to-End)

O Angular CLI permite configuração de testes e2e. Para executar:

```bash
ng e2e
```

⚠️ O framework de testes e2e não vem mais por padrão. Você pode configurar o [Cypress](https://www.cypress.io/) ou [Playwright](https://playwright.dev/) conforme sua necessidade.

---

## 📚 Recursos Adicionais

- [Documentação oficial Angular](https://angular.dev)
- [Referência de comandos Angular CLI](https://angular.dev/tools/cli)
- [Orval - API client via Swagger/OpenAPI](https://orval.dev)

---

## 💡 Dicas

- Use o arquivo `proxy.conf.json` para redirecionar requisições da API no ambiente de desenvolvimento.
- O serviço de autenticação utiliza JWT e os tokens devem ser salvos e enviados nos headers Authorization (`Bearer <token>`).

---