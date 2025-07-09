import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
    console.log(this.form.value);
    alert('Perfil salvo com sucesso!');
    // você pode salvar no localStorage ou mandar para uma API no futuro
  }
}

