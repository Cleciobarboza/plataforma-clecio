

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.plataforma.user.dtos.StudentProfileDTO;
import com.plataforma.user.model.Student;
import com.plataforma.user.repository.StudentRepostory;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepostory studentRepository;

    public void updateProfile(String id, StudentProfileDTO dto) {
        UUID uuid = UUID.fromString(id);
        Student student = studentRepository.findById(uuid)
            .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        log.info("Atualizando perfil do aluno com ID: {}", id);

        // Atualiza os dados
        student.setFull_name(dto.full_name());
        student.setBirthDate(dto.birthDate());
        student.setStartdate(dto.startdate()); // Corrigido para camelCase
        student.setGender(dto.gender());
        student.setProfession(dto.profession());
        student.setEducation(dto.education());
        student.setPhone(dto.phone());
        student.setCountry(dto.country());
        student.setCity(dto.city());
        student.setState(dto.state());
        student.setDescription(dto.description());
        student.setState(dto.state());
        student.setStatus(dto.status()); // Corrigido para camelCase
        student.setCompleteRegistration(dto.completeRegistration());

        studentRepository.save(student);
    }
}


