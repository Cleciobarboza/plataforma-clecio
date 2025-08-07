package com.plataforma.payment.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "payments")
public class PaymentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime paymentDate;

    @Column(nullable = false)
    private UUID userId; // Referência ao usuário que fez o pagamento

    @Column(nullable = false)
    private String status; // Ex: "PENDING", "COMPLETED", "FAILED"

    // Construtor, getters e setters
    public PaymentModel() {
    }

    public PaymentModel(Double amount, LocalDateTime paymentDate, UUID userId, String status) {
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.userId = userId;
        this.status = status;
    }

    // Getters e Setters (pode usar Lombok para simplificar)
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}