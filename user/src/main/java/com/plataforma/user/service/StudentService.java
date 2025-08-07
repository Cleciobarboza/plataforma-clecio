package com.plataforma.user.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.plataforma.user.config.jwt.LoginResponse;
import com.plataforma.user.domain.dashboard_admin.model.RoleModel;
import com.plataforma.user.domain.dashboard_admin.repository.RoleRepository;
import com.plataforma.user.dtos.StudentBasicInfoDTO;
import com.plataforma.user.dtos.StudentLoginDTO;
import com.plataforma.user.dtos.StudentPreferenceUpdateDTO;
import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.dtos.StudentProfileUpdateDTO;
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
    private final JwtTokenService jwtTokenService;
    private static final String UPLOAD_DIR = "uploads/profile_images/";

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
            .userName(dto.getUserName())
            .email(dto.getEmail())
            .password(passwordEncoder.encode(dto.getPassword()))
            .startdate(LocalDate.now())
            .status("pendente")
            .completeRegistration(false)
            .roles(List.of(role))
            .build();

        return studentRepository.save(student);
    }

    // ✅ LOGIN
    public LoginResponse login(StudentLoginDTO dto) {
        StudentModel user = studentRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtTokenService.generateToken(user);
        return new LoginResponse(token, user);
    }

    // ✅ UPDATE PROFILE
    public void updateProfile(String id, StudentProfileDTO dto) {
        UUID uuid = UUID.fromString(id);
        StudentModel student = studentRepository.findById(uuid)
            .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        log.info("Atualizando perfil do aluno com ID: {}", id);

        student.setFull_name(dto.getFull_name());
        student.setBirthDate(dto.getBirthDate());
        student.setGender(dto.getGender());
        student.setProfession(dto.getProfession());
        student.setEducation(dto.getEducation());
        student.setPhone(dto.getPhone());
        student.setCountry(dto.getCountry());
        student.setCity(dto.getCity());
        student.setState(dto.getState());
        student.setDescription(dto.getDescription());
        student.setCompleteRegistration(dto.isCompleteRegistration());

        studentRepository.save(student);
    }

    // ✅ FIND BY ID
    public Optional<StudentModel> findById(UUID id) {
        return studentRepository.findById(id);
    }

    // ✅ DELETE
    public boolean deleteStudent(UUID id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ FIND BY EMAIL
    public StudentModel findByEmail(String email) {
        return studentRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    // (Opcional) getter se necessário para controller
    public StudentRepository getStudentRepository() {
        return this.studentRepository;
    }

    // Método para atualizar preferências do aluno
public void updatePreferences(UUID userId, StudentPreferenceUpdateDTO dto) {
    Optional<StudentModel> optionalStudent = studentRepository.findById(userId);
    if (optionalStudent.isEmpty()) {
        throw new UsernameNotFoundException("Usuário não encontrado");
    }

    StudentModel student = optionalStudent.get();

    if (dto.getUserImageUrl() != null) {
        student.setUserImageUrl(dto.getUserImageUrl());
    }
    if (dto.getUserTheme() != null) {
        student.setUserTheme(dto.getUserTheme());
    }
    if (dto.getBannerColor() != null) {
        student.setBannerColor(dto.getBannerColor());
    }

    studentRepository.save(student);
}



    // Método para atualizar status do aluno
    public void updateStatus(UUID id, com.plataforma.user.dtos.StudentStatusDTO dto) {
        StudentModel student = studentRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("Aluno não encontrado"));

        student.setStatus(dto.getStatus());
        studentRepository.save(student);
    }

    public StudentBasicInfoDTO getBasicInfo(UUID studentId) {
    StudentModel student = studentRepository.findById(studentId)
        .orElseThrow(() -> new UsernameNotFoundException("Aluno não encontrado"));

     return new StudentBasicInfoDTO(student.getUserName(), student.getStartDate());
}

    public void updateProfile(UUID id, StudentProfileUpdateDTO dto) {
    StudentModel student = studentRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

         // Atualiza nome e email
        student.setUserName(dto.getUserName());
         student.setEmail(dto.getEmail());

        if (dto.getNewPassword() != null && !dto.getNewPassword().isBlank()) {
             if (!passwordEncoder.matches(dto.getOldPassword(), student.getPassword())) {
              throw new RuntimeException("Senha atual incorreta");
            }
             student.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
             studentRepository.save(student);
        }
       // Método para salvar a imagem de perfil e atualizar o modelo do estudante
    public void saveProfileImage(UUID userId, MultipartFile image) {
        Optional<StudentModel> optionalStudent = studentRepository.findById(userId);
        if (optionalStudent.isEmpty()) {
            throw new UsernameNotFoundException("Usuário não encontrado.");
        }
        StudentModel student = optionalStudent.get();

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileExtension = getFileExtension(image.getOriginalFilename());
            String fileName = userId.toString() + "." + fileExtension;
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/" + UPLOAD_DIR + fileName;
            
            student.setUserImageUrl(imageUrl);
            studentRepository.save(student);

        } catch (IOException ex) {
            throw new RuntimeException("Falha ao salvar a imagem do perfil do usuário: " + userId, ex);
        }
    }
    
    // Método auxiliar para obter a extensão do arquivo
    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.lastIndexOf(".") == -1) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}   


