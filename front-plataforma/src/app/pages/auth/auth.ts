import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import e from 'express';

interface Usuario {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit{

  form!: FormGroup;
  isLoginMode= true;

  constructor(
    
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.setupForm();
  }

  getUser(): Usuario[] {
    const dados = localStorage.getItem('usuarios');
    return dados ? JSON.parse(dados) : [];
  }

  salveUser(lista: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(lista))
  }

  onSubmit(): void {
    console.log('Form submit envied');
    if (this.form.invalid)return;
      console.log('Form is invalid', this.form.errors);

      const { name, email, password } = this.form.value;
      const usuarios = this.getUser();

      if (this.isLoginMode) {
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        if (usuario) {
          console.log('Login successful', usuario);
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          this.router.navigate(['/home']);
        } else {
          alert('Usuário ou senha inválidos');
        }

      }else {
        const usuarioExistente = usuarios.some(u => u.email === email);
        if (usuarioExistente) {
          alert('Usuário já cadastrado');
          return;
        }
        const novoUsuario: Usuario = { name, email, password };
        usuarios.push(novoUsuario);
        this.salveUser(usuarios);
        alert('Usuário cadastrado com sucesso!');
        this.toggleMode();
        this.form.reset();
       
      }
      
   
    }
}
