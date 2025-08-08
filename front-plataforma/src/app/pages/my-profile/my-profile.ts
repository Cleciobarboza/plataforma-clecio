import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { UsuarioLogadoDTO } from '../../shared/models/usuario-logado.dto';
import { StudentProfileDTO, StudentProfileUpdateDTO } from '../../api/generated/model';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfile implements OnInit {
  selectedImage: File | null = null;
  selectedImageUrl: string | null = null;
  usuarioLogado: UsuarioLogadoDTO | null = null;
  form!: FormGroup;
  userImageUrl: string | ArrayBuffer | null = null;
  modoEdicao: boolean = false;
  selectedImageFile: File | null = null;
  currentBannerImage: string = '../../assets/userbaner/roxo.jpg';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentStudent().subscribe({
      next: (usuario) => {
        if (!usuario) return;

        this.usuarioLogado = {
          ...usuario,
          id: usuario.id?.toString() || ''
        };

        this.userImageUrl = usuario.userImageUrl || 'https://via.placeholder.com/150';
        this.loadUserThemeAndBanner();

        this.form = this.fb.group({
          first_name: [''],
          surname: [''],
          userName: [
            usuario.userName || '',
            [
              Validators.required,
              Validators.maxLength(10),
              Validators.pattern(/^\S+$/)
            ]
          ],
          email: [
            usuario.email || '',
            [Validators.required, Validators.email]
          ],
          oldPassword: [''],
          newPassword: [
            '',
            [
              Validators.minLength(8),
              Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).+$/)
            ]
          ],
          confirmPassword: [''],
          full_name: [''],
          birthDate: [''],
          gender: [''],
          profession: [''],
          education: [''],
          phone: [''],
          country: ['Brasil'],
          city: ['São Paulo'],
          state: ['SP'],
          description: [''],
          completeRegistration: [true]
        });
      },
      error: (err) => {
        console.error('❌ Erro ao carregar usuário:', err);
      }
    });
  }

  senhasConferem(): boolean {
    const senha = this.form.get('newPassword')?.value;
    const confirm = this.form.get('confirmPassword')?.value;
    return senha === confirm;
  }

  salvar(): void {
    if (this.modoEdicao && this.usuarioLogado) {
      if (!this.senhasConferem()) {
        alert('❌ Confirmação de senha não confere.');
        return;
      }

      const formValue = this.form.value;
      const dto: StudentProfileUpdateDTO = {
        userName: formValue.userName,
        email: formValue.email,
        oldPassword: formValue.oldPassword,
        newPassword: formValue.newPassword
      };

      this.authService.updateProfile(dto).subscribe({
        next: () => {
          alert('✅ Perfil atualizado com sucesso!');
          this.modoEdicao = false;
        },
        error: (err) => {
          console.error('❌ Erro ao atualizar perfil:', err);
          alert('❌ Ocorreu um erro ao salvar as alterações.');
        }
      });
    }
  }

onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    this.selectedImage = file; // <-- ESSA LINHA FALTAVA

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Exemplo de envio ao backend
    const formData = new FormData();
    formData.append('image', file);

    
  }
}
 salvarFoto(): void {
  if (!this.selectedImage) {
    alert('Selecione uma imagem primeiro.');
    return;
  }

  const formData = new FormData();
  formData.append('image', this.selectedImage);

  this.authService.uploadUserImage(formData).subscribe({
    next: () => {
      alert('Imagem atualizada com sucesso!');
      // Atualize a imagem exibida
    },
    error: (err) => {
      console.error('Erro ao enviar imagem', err);
      alert('Erro ao enviar imagem');
    }
  });
}

  salvarInformacoesPessoais(): void {
    if (!this.usuarioLogado?.id) return;

    const dadosForm = this.form.value;
    const firstName = dadosForm.first_name?.trim() || '';
    const surname = dadosForm.surname?.trim() || '';
    const fullName = `${firstName} ${surname}`.trim();

    const dto: StudentProfileDTO = {
      full_name: fullName,
      birthDate: dadosForm.birthDate,
      gender: dadosForm.gender,
      profession: dadosForm.profession,
      education: dadosForm.education,
      phone: dadosForm.phone,
      country: dadosForm.country,
      city: dadosForm.city,
      state: dadosForm.state,
      description: dadosForm.description,
      completeRegistration: true
    };

    this.authService.updateStudent(this.usuarioLogado.id, dto).subscribe({
      next: () => {
        alert('✅ Informações pessoais salvas com sucesso!');
      },
      error: (err) => {
        alert('❌ Erro ao salvar informações pessoais.');
        console.error(err);
      }
    });
  }

  loadUserThemeAndBanner(): void {
    const banner = this.usuarioLogado?.bannerColor || 'roxo';
    this.updateBannerImage(banner);
  }

  updateBannerImage(bannerColor: string): void {
    const bannerMap: { [key: string]: string } = {
      roxo: '../../assets/userbaner/roxo.jpg',
      azul: '../../assets/userbaner/azul.jpg',
      verde: '../../assets/userbaner/verde.jpg'
    };
    this.currentBannerImage = bannerMap[bannerColor] || bannerMap['roxo'];
  }
}