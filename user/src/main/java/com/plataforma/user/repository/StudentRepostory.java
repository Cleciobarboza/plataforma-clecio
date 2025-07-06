package com.plataforma.user.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plataforma.user.model.Student;

public interface StudentRepostory extends JpaRepository <Student, UUID> {

    // Custom query methods can be defined here if needed
    // For example, to find a student by email:
    // Optional<Student> findByEmail(String email);
    
}
