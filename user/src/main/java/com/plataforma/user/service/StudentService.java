package com.plataforma.user.service;
import java.time.LocalDate;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentRegisterDTO;
import com.plataforma.user.model.StudentModel;
import com.plataforma.user.repository.StudentRepostory;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentService {
    private static final Logger log = LoggerFactory.getLogger(StudentService.class);
    private final StudentRepostory studentRepository;

    public void updateProfile(String id, StudentProfileDTO dto) {
    
        UUID uuid = UUID.fromString(id);
        StudentModel student = studentRepository.findById(uuid)
            .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
           

        log.info("Atualizando perfil do aluno com ID: {}", id);


        student.setFull_name(dto.getFull_name());
        student.setBirthDate(dto.getBirthDate());
        student.setStartdate(dto.getStartdate());
        student.setGender(dto.getGender());
        student.setProfession(dto.getProfession());
        student.setEducation(dto.getEducation());
        student.setPhone(dto.getPhone());
        student.setCountry(dto.getCountry());
        student.setCity(dto.getCity());
        student.setState(dto.getState());
        student.setDescription(dto.getDescription());
        student.setStatus(dto.getStatus());
        student.setCompleteRegistration(dto.isCompleteRegistration());

        studentRepository.save(student);
    }

    public StudentModel register(StudentRegisterDTO dto) {
        StudentModel student = StudentModel.builder()
            .user_name(dto.getUser_name())
            .email(dto.getEmail())
            .password(dto.getPassword()) // Adicione encode se necessário
            .startdate(LocalDate.now())
            .status("pendente")
            .completeRegistration(false)
            .build();

        return studentRepository.save(student);
    }

    public StudentModel register(StudentProfileDTO dto) {
        StudentModel student = StudentModel.builder()
            .full_name(dto.getFull_name())
            .email("") // Adapte conforme necessário
            .password("") // Adapte conforme necessário
            .startdate(dto.getStartdate())
            .status(dto.getStatus())
            .completeRegistration(dto.isCompleteRegistration())
            .birthDate(dto.getBirthDate())
            .gender(dto.getGender())
            .profession(dto.getProfession())
            .education(dto.getEducation())
            .phone(dto.getPhone())
            .country(dto.getCountry())
            .city(dto.getCity())
            .state(dto.getState())
            .description(dto.getDescription())
            .build();

        return studentRepository.save(student);
    }

    public StudentRepostory getStudentRepository() {
        return studentRepository;
    }
}
