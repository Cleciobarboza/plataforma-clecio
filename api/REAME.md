# API Gateway - Plataforma EAD

Este projeto é um **API Gateway** construído com **Spring Cloud Gateway**, responsável por rotear e proteger as comunicações entre o frontend Angular e os microserviços backend da plataforma EAD.

---

# Estrutura do Projeto

user/
├── front-plataforma/     → Frontend Angular
├── api.gateway/          → Projeto Spring Cloud Gateway (porta 8080)
└── user-service/         → Backend (porta 8081)

---

## 📍 Objetivo

Centralizar o acesso do frontend, fornecendo:

- Roteamento de requisições
- Suporte a CORS
- Filtro de prefixos
- Futuro suporte a autenticação/token (JWT ou OAuth)

---

## 🚀 Tecnologias

- Java 24+
- Spring Boot 3.x
- Spring Cloud Gateway
- Maven

---

## ⚙️ Configuração da Aplicação

### application.yml

```yaml
server:
  port: 8080

spring:
  application:
    name: api

  cloud:
    gateway:
      routes:
        - id: user
          uri: http://localhost:8081
          predicates:
            - Path=/auth/**
          filters:
            - StripPrefix=1

      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOrigins: "http://localhost:4200"
            allowedMethods:
              - GET
              - POST
              - PUT
              - DELETE
              - OPTIONS
            allowedHeaders: "*"
            allowCredentials: true


