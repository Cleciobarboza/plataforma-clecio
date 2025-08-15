package com.plataforma.user.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plataforma.user.model.StudentModel;

public interface StudentRepository extends JpaRepository<StudentModel, UUID> {

    long countByCreatedAtAfter(LocalDateTime createdAt);
    Optional<StudentModel> findByEmail(String email);

    // ✅ Método correto, baseado no nome do campo user_name da entidade
    Optional<StudentModel> findByUserName(String userName);

    //MyAppUser findByEmail(String email);

}
