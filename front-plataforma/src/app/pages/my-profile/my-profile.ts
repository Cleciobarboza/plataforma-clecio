import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfile implements OnInit {
  usuario: any;
  form!: FormGroup;
  userImageUrl: string | null = null;
  modoEdicao: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const dados = localStorage.getItem('usuarioLogado');
    const usuario = dados ? JSON.parse(dados) : {};
    this.usuario = usuario;

    this.form = this.fb.group({
        first_name: [''],  // <- corrigido aqui
        surname: [''],     // <- de "Surname" para "surname"
        name: [
        usuario.name || '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^\S+$/) // sem espaços
        ]
      ],
      email: [usuario.email || '', [Validators.required, Validators.email]],
      password: [usuario.password || '', Validators.required],

      oldPassword: [''],
      newPassword: [
        '',
        [
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).+$/) // uma maiúscula e um símbolo
        ]
      ],
      confirmPassword: [''],

      // Campos extras (não usados no salvar)
      fist_name: [''],
      Surname: [''],
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
  }

salvar(): void {
  const formValue = this.form.value;

  if (this.modoEdicao) {
    // Valida senha atual
    if (formValue.oldPassword !== this.usuario.password) {
      alert('❌ Senha atual incorreta');
      return;
    }

    // Valida nova senha
    const senhaRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!senhaRegex.test(formValue.newPassword)) {
      alert('❌ Nova senha inválida: mínimo 8 caracteres, uma maiúscula e um símbolo.');
      return;
    }

    if (formValue.newPassword !== formValue.confirmPassword) {
      alert('❌ Confirmação de senha não confere.');
      return;
    }

    // Atualiza nome e senha no objeto do usuário
    this.usuario.name = formValue.name;
    this.usuario.password = formValue.newPassword;

    // Atualiza também no array de usuários salvos
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const indice = usuarios.findIndex((u: any) => u.email === this.usuario.email);
    if (indice !== -1) {
      usuarios[indice].name = this.usuario.name;
      usuarios[indice].password = this.usuario.password;
      localStorage.setItem('usuarios', JSON.stringify(usuarios)); // CORRETO AQUI
    }

    // Atualiza o objeto logado
    localStorage.setItem('usuarioLogado', JSON.stringify(this.usuario));

    // Atualiza o campo password no formulário
    this.form.get('password')?.setValue(formValue.newPassword);

    alert('✅ Nome e senha atualizados com sucesso!');
    this.modoEdicao = false;
  }
}




  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userImageUrl = reader.result as string;
        // Você pode salvar a imagem aqui se quiser
      };
      reader.readAsDataURL(file);
    }
  }
salvarInformacoesPessoais(): void {
  const dadosForm = this.form.value;

  // Corrigido o nome do campo
  const firstName = dadosForm.first_name?.trim() || '';
  const surname = dadosForm.surname?.trim() || '';
  const fullName = `${firstName} ${surname}`.trim();

  // Atualiza os campos no objeto usuario
  const camposAdicionais = [
    'first_name', 'surname', 'gender', 'birthDate',
    'profession', 'education', 'phone', 'country',
    'city', 'state', 'description'
  ];

  camposAdicionais.forEach((campo) => {
    this.usuario[campo] = dadosForm[campo];
  });

  // Atualiza também o nome completo
  this.usuario.full_name = fullName;
  this.form.get('full_name')?.setValue(fullName);

  // Salva no localStorage
  localStorage.setItem('usuarioLogado', JSON.stringify(this.usuario));

  alert('✅ Informações pessoais atualizadas com sucesso!');
}


}


