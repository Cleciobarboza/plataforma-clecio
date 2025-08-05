import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { UsuarioLogadoDTO } from '../../shared/models/usuario-logado.dto';
import { StudentPreferenceUpdateDTO, StudentProfileDTO, StudentProfileUpdateDTO } from '../../api/generated/model';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { Observable } from 'rxjs';
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


 // Novo método para lidar com a seleção da imagem
  onImageSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
      
      // Criar uma URL temporária para pré-visualização da imagem
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      // Usar o operador de navegação segura para evitar o erro
      this.userImageUrl = this.usuarioLogado?.userImageUrl || null; 
    }
  }

  salvarFoto(): void {
    if (!this.usuarioLogado?.id || !this.selectedFile) {
      alert('❌ Nenhuma nova imagem selecionada para salvar.');
      return;
    }

    // SIMULANDO UPLOAD - SUBSTITUA ESTA LÓGICA
    // Em um cenário real, você faria o upload para um serviço e obteria a URL
    // Por exemplo, usando um serviço de armazenamento como o Firebase Storage
    // Aqui, vamos apenas simular que o upload foi bem-sucedido e obter uma URL mock
    this.uploadImage(this.selectedFile).subscribe({
      next: (imageUrl) => {
        const dto: StudentPreferenceUpdateDTO = {
          userImageUrl: imageUrl
        };
        
        // Chamar o serviço para atualizar o perfil com a nova URL
        this.authService.updateStudentPreferences(dto).subscribe({
          next: () => {
            alert('✅ Foto de perfil atualizada com sucesso!');
            // Limpar o arquivo selecionado após o sucesso
            this.selectedFile = null;
          },
          error: (err: HttpErrorResponse) => {
            alert('❌ Erro ao atualizar a foto de perfil.');
            console.error('Erro ao atualizar foto:', err);
          },
        });
      },
      error: (err) => {
        alert('❌ Erro ao fazer o upload da imagem.');
        console.error('Erro no upload:', err);
      }
    });
  }

  // Método simulado de upload de imagem
  private uploadImage(file: File): Observable<string> {
    // ESTA É A LÓGICA QUE VOCÊ PRECISA SUBSTITUIR
    // Exemplo para um backend real:
    // const formData = new FormData();
    // formData.append('file', file, file.name);
    // return this.http.post<string>('url-do-seu-backend-upload', formData);
    
    // Simulação: Apenas retorna uma URL de placeholder
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next('https://via.placeholder.com/100/6002EE/FFFFFF?text=Nova+Foto');
        observer.complete();
      }, 1000);
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