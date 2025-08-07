package com.plataforma.payment.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor // Adiciona um construtor com todos os campos
@NoArgsConstructor // Adiciona um construtor sem argumentos
public class PaymentSuccessResponse {
    private String message;
    // Você pode adicionar outros campos aqui se precisar, como 'transactionId'
    // private String transactionId;
}