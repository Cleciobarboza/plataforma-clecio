package com.plataforma.user.service;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentRegisterDTO;
import com.plataforma.user.model.StudentModel;
import com.plataforma.user.repository.StudentRepostory;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepostory studentRepository;

    public void updateProfile(String id, StudentProfileDTO dto) {
        UUID uuid = UUID.fromString(id);
        StudentModel student = studentRepository.findById(uuid)
            .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        log.info("Atualizando perfil do aluno com ID: {}", id);

        student.setFull_name(dto.full_name());
        student.setBirthDate(dto.birthDate());
        student.setStartdate(dto.startdate());
        student.setGender(dto.gender());
        student.setProfession(dto.profession());
        student.setEducation(dto.education());
        student.setPhone(dto.phone());
        student.setCountry(dto.country());
        student.setCity(dto.city());
        student.setState(dto.state());
        student.setDescription(dto.description());
        student.setStatus(dto.status());
        student.setCompleteRegistration(dto.completeRegistration());

        studentRepository.save(student);
    }

    public StudentModel register(StudentRegisterDTO dto) {
        StudentModel student = StudentModel.builder()
            .user_name(dto.user_name())
            .email(dto.email())
            .password(dto.password()) // Adicione encode se quiser
            .startdate(LocalDate.now())
            .status("pendente")
            .completeRegistration(false)
            .build();

        return studentRepository.save(student);
    }

    public StudentRepostory getStudentRepository() {
        return studentRepository;
    }

    public StudentModel register(StudentProfileDTO dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }
}
