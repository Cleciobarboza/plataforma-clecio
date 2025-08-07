package com.plataforma.payment.dtos;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class PaymentResponseDTO {
    private UUID transactionId;
    private UUID studentId;
    private BigDecimal amount;
    private String status; // Ex: "approved", "pending", "failed"
    private LocalDateTime timestamp;
}