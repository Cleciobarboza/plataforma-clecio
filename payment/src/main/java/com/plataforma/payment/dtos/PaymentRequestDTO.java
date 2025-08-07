package com.plataforma.payment.dtos;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Data;

@Data
public class PaymentRequestDTO {
     private UUID studentId;
    private BigDecimal amount;
    private String paymentMethod; // Ex: "credit_card", "paypal", "boleto"
    private String description;
    
}
