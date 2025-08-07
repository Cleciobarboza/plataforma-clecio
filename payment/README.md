# Plataforma de Microsserviços

## Microsserviço de Pagamentos (`payment-api`)

### 📄 Sobre

O `payment-api` é um microsserviço dedicado a processar e gerenciar todas as operações financeiras da plataforma. Sua responsabilidade é exclusiva sobre pagamentos, receitas e transações, garantindo a integridade dos dados financeiros e a separação de responsabilidades.

---

### 🚀 Tecnologias Utilizadas

- **Spring Boot 3**: Framework para a construção da API.
- **Spring Data JPA**: Para persistência e acesso ao banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Maven**: Gerenciador de dependências.
- **Lombok**: Biblioteca para reduzir código boilerplate.
- **OpenAPI 3 (Swagger)**: Para documentação automática da API.

---

### ⚙️ Configuração

As configurações do banco de dados e da porta do servidor são definidas no arquivo:

```
src/main/resources/application.properties
```

Para o ambiente de desenvolvimento local, é utilizado:

```
src/main/resources/application-local.properties
```

#### Exemplo de `application-local.properties`:

```properties
server.port=8082

spring.datasource.url=jdbc:postgresql://localhost:5432/banco_de_dados
spring.datasource.username=
spring.datasource.password=
```

---

### 📡 Endpoints da API

#### 💰 GET `/payments/monthly-revenue`

- **Descrição**: Obtém a receita total gerada no último mês.
- **Função**: Consumido pelo microsserviço de usuários (`user-api`) para exibir a receita mensal no painel de administração.
- **Resposta de Sucesso (200 OK)**: Retorna um número decimal (`Double`) representando o valor total.

##### Exemplo de Requisição:
```
GET http://localhost:8082/payments/monthly-revenue
```

##### Exemplo de Resposta (`application/json`):
```json
12500.50
```

---

#### 💳 POST `/payments`

- **Descrição**: Processa e registra um novo pagamento.

##### Corpo da Requisição (`application/json`):
```json
{
  "studentId": "UUID",
  "amount": 150.75,
  "paymentMethod": "credit_card",
  "description": "Pagamento da mensalidade"
}
```

- **Resposta de Sucesso (200 OK)**: Retorna os detalhes do pagamento registrado, incluindo status e ID da transação.

---

### 🧩 Modelos DTO

#### PaymentRequestDTO (Modelo da Requisição):

```java
public class PaymentRequestDTO {
    private UUID studentId;
    private BigDecimal amount;
    private String paymentMethod;
    private String description;
}
```

#### PaymentResponseDTO (Modelo da Resposta):

```java
public class PaymentResponseDTO {
    private UUID transactionId;
    private UUID studentId;
    private BigDecimal amount;
    private String status;
    private LocalDateTime timestamp;
}
```

---

### 🌐 Documentação Interativa (Swagger)

A documentação completa e interativa da API está disponível após iniciar a aplicação:

🔗 [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)