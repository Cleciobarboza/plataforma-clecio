import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfile implements OnInit {
  usuario: any;


  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const dados = localStorage.getItem('usuarioLogado');
    const usuario = dados ? JSON.parse(dados) : {};

    

    this.form = this.fb.group({
      name: [usuario.name || '', Validators.required],
      email: [usuario.email || '', [Validators.required, Validators.email]],
      password: [usuario.password || '', Validators.required],


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

  userImageUrl: string | null = null;

onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.userImageUrl = reader.result as string;
      // Aqui você pode salvar a imagem no localStorage, backend ou onde preferir
    };
    reader.readAsDataURL(file);
  }
}


  salvar(): void {
  const firstName = this.form.get('fist_name')?.value || '';
  const surname = this.form.get('Surname')?.value || '';

  const fullName = `${firstName.trim()} ${surname.trim()}`.trim();

  // Atualiza o campo full_name
  this.form.get('full_name')?.setValue(fullName);

  console.log('Nome completo:', fullName);

  // Aqui você pode enviar os dados atualizados para backend, salvar no localStorage etc.
}

}

