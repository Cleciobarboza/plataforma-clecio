package com.plataforma.user.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
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
    @PostMapping("/upload/image")
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
   @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadProfileImage(@RequestParam("image") MultipartFile image) {
    if (image.isEmpty()) {
        return ResponseEntity.badRequest().build();
    }

    String filename = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
    Path path = Paths.get("uploads/" + filename);

    try {
        Files.write(path, image.getBytes());
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    // Retorne apenas a URL pública da imagem
    String imageUrl = "https://meuservidor.com/uploads/" + filename;
    return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
}

}
