package com.plataforma.user.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.user.config.jwt.LoginResponse;
import com.plataforma.user.dtos.StudentLoginDTO;
import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentRegisterDTO;
import com.plataforma.user.model.StudentModel;
import com.plataforma.user.service.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    // ✅ POST: Login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid StudentLoginDTO dto) {
        log.info("Usuário tentando login: {}", dto.getEmail());
        return ResponseEntity.ok(studentService.login(dto));
    }

    // ✅ POST: Cadastro
    @PostMapping("/register")
    public ResponseEntity<StudentModel> register(@RequestBody @Valid StudentRegisterDTO dto) {
        StudentModel saved = studentService.register(dto);
        return ResponseEntity.ok(saved);
    }

    // ✅ GET: Buscar por ID
    @GetMapping("/find/{id}")
    public ResponseEntity<StudentModel> findById(@PathVariable UUID id) {
        return ResponseEntity.of(studentService.findById(id));
    }

    // ✅ PUT: Atualizar perfil
    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateProfile(@PathVariable UUID id,
                                              @RequestBody @Valid StudentProfileDTO dto) {
        studentService.updateProfile(id.toString(), dto);
        return ResponseEntity.ok().build();
    }

    // ✅ DELETE: Remover aluno
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        boolean deleted = studentService.deleteStudent(id);
        if (deleted) {
            log.info("Aluno deletado: {}", id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ GET: Buscar usuário autenticado
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentStudent(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Usuário não autenticado");
        }

        String email = authentication.getName();
        StudentModel student = studentService.findByEmail(email);

        if (student == null) {
            return ResponseEntity.status(404).body("Aluno não encontrado");
        }

        return ResponseEntity.ok(student);
    }
}
