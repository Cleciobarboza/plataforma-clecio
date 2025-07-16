package com.plataforma.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.model.StudentModel;
import com.plataforma.user.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Atualizar ou completar perfil do aluno
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable("id") String id,
                                           @RequestBody @Valid StudentProfileDTO dto) {
        StudentModel student = studentService.register(dto);
        return new ResponseEntity<>(student, HttpStatus.CREATED);
}
}

