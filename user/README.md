# API - User Service

API de gerenciamento de usuários da **Teaching Platform**.

Esta API permite o cadastro de usuários, login/autenticação com JWT, controle de papéis (roles) e atribuição de permissões.

---

## 📦 Bibliotecas Utilizadas

- **Spring Boot**
- **Spring Security** – segurança da API
- **JWT** – autenticação baseada em token
- **dotenv-spring-boot** – leitura do arquivo `.env`
- **spring-boot-starter-data-jpa** + **PostgreSQL** – persistência de dados
- **Lombok** – reduz o código boilerplate (`@Getter`, `@Setter`, etc.)
- **Mockito** – testes unitários e mocks

---

## ✅ Requisitos de Uso

### Funcionais

- Usuário pode criar um cadastro
- Usuário pode realizar login

### Não Funcionais

- A API gera e retorna um token JWT
- A API atribui um ou mais papéis (roles) ao usuário autenticado

---

## 🚀 Instruções para Desenvolvimento

1. Faça o clone do repositório.
2. Crie um arquivo `.env` na raiz do projeto com os dados do banco, por exemplo:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/teaching_platform
DATABASE_USERNAME=seu_usuario
DATABASE_PASSWORD=sua_senha
JWT_SECRET=secretKey123!?#@
```

3. Execute:

```bash
mvn clean install
```

4. Inicie a aplicação com:

```bash
mvn spring-boot:run
```

---

## 📊 Diagrama ERD (Entidade-Relacionamento)

```
┌──────────────┐     ┌────────────────┐     ┌─────────────┐
│    USER      │     │  USER_ROLE     │     │    ROLE     │
├──────────────┤     ├────────────────┤     ├─────────────┤
│ id_user (PK) │◄────│ id_user (FK)   │     │ id_role (PK)│
│ userName     │     │ id_role (FK)   │────►│ name        │
│ full_name    │     └────────────────┘     │ description │
│ email        │                            │ parentRole  │
│ password     │                            └─────────────┘
│ ...          │
└──────────────┘
```

---

## 📘 Dicionário de Dados (Resumo)

| Campo                  | Tipo      | Restrição        | Descrição                          |
|------------------------|-----------|------------------|------------------------------------|
| `id_user`              | Long      | PK               | Identificador do usuário           |
| `userName`             | String    | Not Null         | Nome de login                      |
| `email`                | String    | Not Null, Unique | E-mail para login                  |
| `password`             | String    | Not Null         | Senha criptografada                |
| `full_name`            | String    | -                | Nome completo                      |
| `birthDate`            | LocalDate | -                | Data de nascimento                 |
| `gender`               | String    | -                | Gênero                             |
| `phone`                | String    | -                | Telefone                           |
| `profession`           | String    | -                | Profissão                          |
| `education`            | String    | -                | Escolaridade                       |
| `country`              | String    | -                | País                               |
| `city`                 | String    | -                | Cidade                             |
| `state`                | String    | -                | Estado                             |
| `startDate`            | LocalDate | -                | Data de criação da conta           |
| `status`               | String    | default: Pendente| Status inicial do usuário          |
| `description`          | String    | -                | Descrição do perfil do usuário     |
| `completeRegistration` | boolean   | default: false   | Indicador de cadastro completo     |
| `id_role`              | Long      | PK               | Identificador da Role              |
| `name`                 | String    | -                | Nome da Role (ex: ROLE_USER)       |
| `parentRole`           | String    | -                | Hierarquia da Role (ex: TEACHER)   |

---

## 🔐 Endpoints

## swagger

http://localhost:8080/swagger-ui/index.html#/

### Criar Usuário

`POST http://localhost:8080/auth/register`

```json
{
  "userName": "clecio",
  "email": "clecio590@gmail.com",
  "password": "CLECIO123#"
}
```

**Resposta:**
```json
{
  "id": 1,
  "userName": "clecio",
  "email": "clecio590@gmail.com",
  "status": "Pendente",
  "completeRegistration": false,
  "role": [
    {
      "id": 1,
      "name": "ROLE_USER",
      "description": null,
      "parentRole": null
    }
  ],
  "authority": "ROLE_USER"
}
```

---

### Login

`POST http://localhost:8080/auth/login`

```json
{
  "email": "clecio590@gmail.com",
  "password": "CLECIO123#"
}
```

**Resposta:**
```json

  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGF0YWZvcm1hLWFwaSIsInN1YiI6ImNsZWNpbzU5MEBnbWFpbC5jb20iLCJleHAiOjE3NTMxMTc0Nzh9.bwfh8lyuizUBOIgZ7jDvRAklFOzxP6RQ0jvxpqdBevY",
    "user": {
        "id": "73edbd30-2220-4819-bd19-6f29222d52d0",
        "email": "clecio590@gmail.com",
        "full_name": null,
        "gender": null,
        "birthDate": null,
        "phone": null,
        "country": null,
        "city": null,
        "state": null,
        "profession": null,
        "education": null,
        "startdate": "2025-07-21",
        "status": "pendente",
        "description": null,
        "completeRegistration": false,
        "roles": [
            {
                "id": "419cbc79-989d-4dff-a76f-c9c3099be4c9",
                "name": "ROLE_USER",
                "description": null,
                "parentRole": null
            }
        ],
        "authorities": [
            {
                "authority": "ROLE_USER"
            }
        ]
    }

  
}
```

---

### Buscar Dados do Usuário

`GET http://localhost:8080/auth/me`

```json
{
  "email": "clecio590@gmail.com",
  "password": "CLECIO123#"
}
```

Header:
```
Authorization: Bearer <jwt_token>
```
**Resposta:**
```json
{
    "id": "73edbd30-2220-4819-bd19-6f29222d52d0",
    "email": "clecio590@gmail.com",
    "full_name": "Clecio Barboza",
    "gender": "Masculino",
    "birthDate": "1990-01-01",
    "phone": "11999999999",
    "country": "Brasil",
    "city": "São Paulo",
    "state": "SP",
    "profession": "Dev",
    "education": "Superior",
    "startdate": "2025-07-15",
    "status": "ativo",
    "description": "Aluno atualizado",
    "completeRegistration": true,
    "roles": [
        {
            "id": "419cbc79-989d-4dff-a76f-c9c3099be4c9",
            "name": "ROLE_USER",
            "description": null,
            "parentRole": null
        }
    ],
    "authorities": [
        {
            "authority": "ROLE_USER"
        }
    ]
}

---
---

### Atualizar Dados do Usuário

`PUT http://localhost:8080/update/id`

```json
{
  "full_name": "Clecio Barboza",
  "birthDate": "1990-01-01",
  "gender": "Masculino",
  "profession": "Dev",
  "education": "Superior",
  "phone": "11999999999",
  "country": "Brasil",
  "city": "São Paulo",
  "state": "SP",
  "description": "Aluno atualizado",
  "startdate": "2025-07-15",
  "status": "ativo",
  "completeRegistration": true
}
```

Header:
```
Authorization: Bearer <jwt_token>
```
**Resposta:**
```json
200ok


### Deletar Usuário



`DELETE http://localhost:8080/delete/id`


Header:
```
Authorization: Bearer <jwt_token>
```
**Resposta:**
```json
200ok

## 📌 Notas Futuras

- Implementar recuperação de senha
- Implementar cadastro com validação de e-mail
- Criar painel de administração para roles

---

##  📚 Para mais referências técnicas, veja [HELP.md](./HELP.md)  s

