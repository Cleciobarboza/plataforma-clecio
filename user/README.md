# API from User

Teaching Platform
Api for user loads data student information.

## Libraries

Spring boot → Spring Security → mockito

dotenv-spring-boot → necessária para ler o .env

spring-boot-starter-security → necessária se sua API tiver login/autenticação

spring-boot-starter-data-jpa + postgresql → para persistência com JPA + PostgreSQL

lombok → para reduzir boilerplate (@Getter, @Setter, etc.)



## Requiditos de uso

funcionais

não funcionais

## Development server


Download the file and create a ".env" file and put all your database data.

## ERD-Entiy-Relationship Diagram

┌──────────────────────┐
│      STUDENT         │
├──────────────────────┤
│ id_user (PK)         │
│ user_name            │
│ full_name            │
│ email (UNIQUE)       │
│ password             │
│ birth_date           │
│ gender               │
│ phone                │
│ profession           │
│ education            │
│ description          │
│ country              │
│ city                 │
│ state                │
│ completeRegistration │
└──────────────────────┘



# Data dictionary (table summary)

| Campo                  | Tipo      | Restrição        | Descrição                      |
| ---------------------- | --------- | ---------------- | ------------------------------ |
| `id_user`              | Long      | PK               | Identificador do aluno         |
| `user_name`            | String    | Not Null         | Usuário                        |
| `full_name`            | String    | -                | Nome Sobrenome                 |
| `email`                | String    | Not Null, Unique | E-mail para login              |
| `password`             | String    | Not Null         | Senha criptografada            |
| `birthDate`            | LocalDate | -                | Data de nascimento             |
| `gender`               | String    | -                | Gênero                         |
| `phone`                | String    | -                | Telefone                       |
| `profession`           | String    | -                | Profissão                      |
| `education`            | String    | -                | Escolaridade                   |
| `country`              | String    | -                | País                           |
| `city`                 | String    | -                | Cidade                         |
| `state`                | String    | -                | Estado (UF)                    |
| `description`          | String    | -                | Decrição do Usuário            |
| `completeRegistration` | boolean   | default: false   | Se completou os dados pessoais |

# Exemplo de requisição/resposta(futuro)





📚 Para mais referências técnicas, veja [HELP.md](./HELP.md)
