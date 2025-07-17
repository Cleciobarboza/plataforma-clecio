package com.plataforma.user.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.user.dtos.StudentLoginDTO;
import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentRegisterDTO;
import com.plataforma.user.model.StudentModel;
import com.plataforma.user.service.StudentService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
        
    }
// ✅ POST: logar
    @PostMapping("/login")
    public ResponseEntity<StudentModel> login(@RequestBody @Valid StudentLoginDTO dto) {
    log.info("Usuário tentando login: {}", dto.getEmail());
    return ResponseEntity.ok(studentService.login(dto));
}


    // ✅ POST: cadastrar novo aluno
    @PostMapping("/register")
    public ResponseEntity<StudentModel> register(@RequestBody @Valid StudentRegisterDTO dto) {
        log.info("Registrando novo estudante: {}", dto);
        return ResponseEntity.ok(studentService.register(dto));
    }

    // ✅ GET: buscar aluno por ID
    @GetMapping("/find/{id}")
    public ResponseEntity<StudentModel> findById(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);
        return ResponseEntity.of(studentService.getStudentRepository().findById(uuid));
    }

    // ✅ PUT: atualizar perfil do aluno
    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateProfile(@PathVariable String id, @RequestBody @Valid StudentProfileDTO dto) {
        studentService.updateProfile(id, dto);
        return ResponseEntity.ok().build();
    }

    // ✅ DELETE: remover aluno por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);
        var repo = studentService.getStudentRepository();
        if (repo.existsById(uuid)) {
            repo.deleteById(uuid);
            log.info("Aluno deletado: {}", id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}