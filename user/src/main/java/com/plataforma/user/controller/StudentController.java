package com.plataforma.user.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.user.config.jwt.LoginResponse;
import com.plataforma.user.dtos.StudentBasicInfoDTO;
import com.plataforma.user.dtos.StudentLoginDTO;
import com.plataforma.user.dtos.StudentPreferenceUpdateDTO;
import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentProfileUpdateDTO;
import com.plataforma.user.dtos.StudentRegisterDTO;
import com.plataforma.user.dtos.StudentStatusDTO;
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
@RequestMapping(value = "/auth", produces = "application/json")
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
    @Operation(
    summary = "Atualizar dados do perfil do aluno logado",
    description = "Permite ao aluno atualizar seu userName, email ou senha"
    )
    @ApiResponse(responseCode = "204", description = "Perfil atualizado com sucesso")
    @PatchMapping("/me")
    public ResponseEntity<Void> updateCurrentStudent(
    @RequestBody @Valid StudentProfileUpdateDTO dto,
    Authentication authentication) {

    // Obter o email (ou id) do usuário autenticado
    String email = authentication.getName(); // getName() retorna o username (você usa email como username)

    // Buscar o aluno pelo email (ou diretamente via ID se usar UUID como username)
    StudentModel student = studentService.findByEmail(email);
    if (student == null) {
        return ResponseEntity.status(404).build();
    }

    // Atualizar o perfil chamando o serviço
    studentService.updateProfile(student.getId(), dto);

    return ResponseEntity.noContent().build();
    }

    @Operation(
    summary = "Atualizar preferências do aluno",
    description = "Atualiza apenas as preferências visuais do aluno autenticado, como imagem de perfil, tema e exibição da sidebar.",
    responses = {
    @ApiResponse(responseCode = "204", description = "Preferências atualizadas com sucesso"),
    @ApiResponse(responseCode = "400", description = "UUID inválido ou requisição malformada"),
    @ApiResponse(responseCode = "401", description = "Usuário não autenticado"),
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")})
    @PutMapping("/me/preferences")
    public ResponseEntity<Void> updatePreferences(@RequestBody @Valid StudentPreferenceUpdateDTO dto,
                                              @AuthenticationPrincipal UserDetails userDetails) {
    UUID userId;
    try {
        userId = UUID.fromString(userDetails.getUsername()); // Certifique-se de que o username é o UUID
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().build(); // UUID inválido
    }

    studentService.updatePreferences(userId, dto);
    return ResponseEntity.noContent().build();
}
    @Operation(summary = "Atualizar status do aluno", description = "Atualiza o status do aluno")
    @ApiResponse(responseCode = "200", description = "Status atualizado com sucesso")
    @PutMapping("/status/{id}")
    public ResponseEntity<Void> updateStatus(
        @Parameter(description = "ID do aluno", required = true)
        @PathVariable UUID id,
        @RequestBody @Valid StudentStatusDTO status) {
        studentService.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Obter informações básicas do aluno", description = "Retorna informações básicas do aluno, como nome e data de início")
    @ApiResponse(responseCode = "200", description = "Informações básicas do aluno retornadas",
        content = @Content(schema = @Schema(implementation = StudentBasicInfoDTO.class)))
    @GetMapping("/basic-info/{studentId}")
    public ResponseEntity<StudentBasicInfoDTO> getBasicInfo(
        @Parameter(description = "ID do aluno", required = true)
        @PathVariable UUID studentId) {
        StudentBasicInfoDTO basicInfo = studentService.getBasicInfo(studentId);
        return ResponseEntity.ok(basicInfo);


        }
    }
   


        
