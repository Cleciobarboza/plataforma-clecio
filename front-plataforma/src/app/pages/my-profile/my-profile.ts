import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { UsuarioLogadoDTO } from '../../shared/models/usuario-logado.dto';
import { StudentProfileDTO, StudentProfileUpdateDTO, UpdateProfileImageBody } from '../../api/generated/model';
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
  usuarioLogado: UsuarioLogadoDTO | null = null;
  usuario: UsuarioLogadoDTO | null = null;
  form!: FormGroup;
  userImageUrl: string | null = null;
  modoEdicao: boolean = false;
  selectedFile: File | null = null; // Variável para armazenar o arquivo selecionado
  currentBannerImage: string = '../../assets/userbaner/roxo.jpg'; // Valor padrão

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
  this.authService.getCurrentStudent().subscribe({
    next: (usuario) => {
      if (!usuario) return; // <- evita erros de tipo

      this.usuarioLogado = {
        ...usuario,
        id: usuario.id?.toString() || '' // Convertendo UUID para string
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
    error: (err: any) => {
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
  const formValue = this.form.value;

  if (this.modoEdicao && this.usuarioLogado) {
    if (!this.senhasConferem()) {
      alert('❌ Confirmação de senha não confere.');
      return;
    }

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
selectedImageFile: File | null = null;

onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    this.selectedImageFile = input.files[0];

    // Exibe a imagem antes de enviar
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.userImageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImageFile);
  }
}
  salvarFoto(): void {
  // CORREÇÃO: Altere selectedFile para selectedImageFile
  if (!this.usuarioLogado?.id || !this.selectedImageFile) {
    alert('❌ Nenhuma nova imagem selecionada para salvar.');
    return;
  }

  // Use o método do serviço que já faz o upload e a atualização do perfil
  const formData = new FormData();
  // CORREÇÃO: Altere selectedFile para selectedImageFile
  formData.append('image', this.selectedImageFile, this.selectedImageFile.name);

  // O Orval gerou um tipo UpdateProfileImageBody para o FormData, use-o
  // O tipo do 'image' é 'MultipartFile' no backend, que corresponde a um 'File' ou 'Blob' no frontend
  const body: UpdateProfileImageBody = {
    // CORREÇÃO: Altere selectedFile para selectedImageFile
    image: this.selectedImageFile // Ou o formData, dependendo de como o Orval gerou o tipo
  };
  
  // Altere a chamada para o método correto que lida com o upload
  this.authService.updateProfile(formData as any).subscribe({ 
    next: () => {
      alert('✅ Foto de perfil atualizada com sucesso!');
      // CORREÇÃO: Altere selectedFile para selectedImageFile
      this.selectedImageFile = null;
      // Opcional: Recarregar os dados do usuário para obter a nova URL
      // this.authService.getCurrentStudent().subscribe(user => {
      //   this.usuarioLogado = user;
      // });
    },
    error: (err: HttpErrorResponse) => {
      alert('❌ Erro ao atualizar a foto de perfil.');
      console.error('Erro ao atualizar foto:', err);
    },
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