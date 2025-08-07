package com.plataforma.user.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.plataforma.user.service.StudentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/upload")
@Tag(name = "Upload", description = "Endpoints para upload de arquivos")
public class UploadController {
      
    private final StudentService studentService;

    // Construtor para injeção de dependência
    public UploadController(StudentService studentService) {
        this.studentService = studentService;
    }

    private static final String UPLOAD_DIR = "uploads/";
    

    @Operation(
        summary = "Faz o upload de uma imagem",
        description = "Recebe uma imagem multipart e salva no servidor, retornando a URL pública.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Imagem salva com sucesso",
                content = @Content(mediaType = "text/plain", schema = @Schema(type = "string"))),
            @ApiResponse(responseCode = "400", description = "Arquivo vazio ou inválido"),
            @ApiResponse(responseCode = "500", description = "Erro ao salvar a imagem")
        }
    )
    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(
        @Parameter(description = "Arquivo de imagem", required = true)
        @RequestParam("file") MultipartFile file) {
        
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo vazio");
        }

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "http://localhost:8080/" + UPLOAD_DIR + filename;

            return ResponseEntity.ok(imageUrl);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao salvar a imagem: " + e.getMessage());
        }
    }

    // CORREÇÃO: Adicione a documentação do Swagger para este endpoint
    @Operation(
        summary = "Atualiza a imagem de perfil do usuário logado",
        description = "Recebe uma imagem multipart e a salva como foto de perfil para o usuário autenticado.",
        responses = {
            @ApiResponse(responseCode = "204", description = "Imagem de perfil atualizada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Arquivo vazio ou inválido"),
            @ApiResponse(responseCode = "401", description = "Não autenticado"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
        }
    )
    @PutMapping("/me/image")
    public ResponseEntity<Void> updateProfileImage(
        @Parameter(description = "Arquivo de imagem", required = true)
        @RequestParam("image") MultipartFile image,
        @AuthenticationPrincipal UserDetails userDetails) {
        
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        UUID userId = UUID.fromString(userDetails.getUsername());
        studentService.saveProfileImage(userId, image);
        return ResponseEntity.noContent().build();
    }
}