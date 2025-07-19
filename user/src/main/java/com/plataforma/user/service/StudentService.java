package com.plataforma.user.service;


import java.util.List;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.plataforma.user.domain.dashboard_admin.model.RoleModel;
import com.plataforma.user.domain.dashboard_admin.repository.RoleRepository;
import com.plataforma.user.dtos.StudentLoginDTO;
import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentRegisterDTO;
import com.plataforma.user.model.StudentModel;
import com.plataforma.user.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private static final Logger log = LoggerFactory.getLogger(StudentService.class);

    private final StudentRepository studentRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ LOGIN
    public StudentModel login(StudentLoginDTO dto) {
        Optional<StudentModel> studentOpt = studentRepository.findByEmail(dto.getEmail());

        if (studentOpt.isEmpty()) {
            throw new UsernameNotFoundException("Email não encontrado");
        }

        StudentModel student = studentOpt.get();

        if (!passwordEncoder.matches(dto.getPassword(), student.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        return student;
    }

    // ✅ REGISTER
    public StudentModel register(StudentRegisterDTO dto) {
        // Verifica se e-mail já existe
        if (studentRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

  

    // Busca role padrão
    RoleModel role = roleRepository.findByName("ROLE_USER")
        .orElseThrow(() -> new RuntimeException("Role not found"));

    // Cria aluno
    StudentModel student = StudentModel.builder()
        .user_name(dto.getUser_name())
        .email(dto.getEmail())
        .password(passwordEncoder.encode(dto.getPassword()))
        .startdate(LocalDate.now())
        .status("pendente")
        .completeRegistration(false)
        .roles(List.of(role))
        .build();

    return studentRepository.save(student);
}

    // ✅ UPDATE PROFILE
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

    // ✅ GETTER para repositório (opcional, usado pelo controller)
    public StudentRepository getStudentRepository() {
        return this.studentRepository;
    }
}