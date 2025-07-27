package com.plataforma.user.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.plataforma.user.config.jwt.LoginResponse;
import com.plataforma.user.dtos.StudentLoginDTO;
import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentRegisterDTO;
import com.plataforma.user.model.StudentModel;
import com.plataforma.user.service.StudentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/auth", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "Auth Controller", description = "Endpoints for student authentication and management")
public class StudentController {

    private final StudentService studentService;

    @Operation(summary = "Login do aluno", description = "Realiza login e retorna token JWT")
    @ApiResponse(responseCode = "200", description = "Login realizado com sucesso",
        content = @Content(schema = @Schema(implementation = LoginResponse.class)))
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid StudentLoginDTO dto) {
        log.info("Usuário tentando login: {}", dto.getEmail());
        return ResponseEntity.ok(studentService.login(dto));
    }

    @Operation(summary = "Cadastro de aluno", description = "Registra um novo aluno na plataforma")
    @ApiResponse(responseCode = "200", description = "Cadastro realizado com sucesso",
        content = @Content(schema = @Schema(implementation = StudentModel.class)))
    @PostMapping("/register")
    public ResponseEntity<StudentModel> register(@RequestBody @Valid StudentRegisterDTO dto) {
        StudentModel saved = studentService.register(dto);
        return ResponseEntity.ok(saved);
    }

    @Operation(summary = "Buscar aluno por ID", description = "Retorna os dados do aluno com o ID informado")
    @ApiResponse(responseCode = "200", description = "Aluno encontrado",
        content = @Content(schema = @Schema(implementation = StudentModel.class)))
    @GetMapping("/find/{id}")
    public ResponseEntity<StudentModel> findById(
        @Parameter(description = "ID do aluno", required = true)
        @PathVariable UUID id) {
        return ResponseEntity.of(studentService.findById(id));
    }

    @Operation(summary = "Atualizar perfil do aluno", description = "Atualiza os dados do perfil de um aluno existente")
    @ApiResponse(responseCode = "200", description = "Perfil atualizado com sucesso")
    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateProfile(
        @Parameter(description = "ID do aluno", required = true)
        @PathVariable UUID id,
        @RequestBody @Valid StudentProfileDTO dto) {
        studentService.updateProfile(id.toString(), dto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Deletar aluno", description = "Remove um aluno pelo ID")
    @ApiResponse(responseCode = "204", description = "Aluno deletado com sucesso")
    @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(
        @Parameter(description = "ID do aluno", required = true)
        @PathVariable UUID id) {
        boolean deleted = studentService.deleteStudent(id);
        if (deleted) {
            log.info("Aluno deletado: {}", id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Obter dados do aluno logado", description = "Retorna os dados do aluno autenticado com base no token JWT")
    @ApiResponse(responseCode = "200", description = "Aluno autenticado encontrado",
        content = @Content(schema = @Schema(implementation = StudentModel.class)))
    @ApiResponse(responseCode = "401", description = "Usuário não autenticado")
    @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
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
