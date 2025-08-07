package com.plataforma.payment.repository;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.plataforma.payment.model.PaymentModel;

// Crie a interface PaymentRepository
public interface PaymentRepository extends JpaRepository<PaymentModel, UUID> {
    
    // Método para calcular a receita mensal, como você já tinha planejado
    @Query("SELECT SUM(p.amount) FROM PaymentModel p WHERE p.paymentDate >= :oneMonthAgo")
    Double getMonthlyRevenue(@Param("oneMonthAgo") LocalDateTime oneMonthAgo);
}