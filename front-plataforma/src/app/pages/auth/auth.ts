import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth implements OnInit {

  loginError: string | null = null;
  form!: FormGroup;
  isLoginMode = true;

  // 👁️ Visibilidade das senhas
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void {
    this.setupForm();
  }

setupForm() {
  const passwordValidators = [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
  ];

  if (this.isLoginMode) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', passwordValidators]
    });
  } else {
    this.form = this.fb.group({
      name: ['',[Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[^\s]+$/)
      ]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', passwordValidators],
      confirmPassword: ['']
    }, { validators: this.passwordsMatchValidator });
  }
}

  // 🔒 Validação: senha e confirmação iguais
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }

    return null;
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
    localStorage.setItem('usuarios', JSON.stringify(lista));
  }

  onSubmit(): void {
  if (this.form.invalid) {
    console.log('Form is invalid', this.form.errors);
    return;
  }

  const { name, email, password } = this.form.value;
  const usuarios = this.getUser();

  if (this.isLoginMode) {
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      this.loginError = null;
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = 'E-mail ou senha incorretos!';
      setTimeout(() => {
        this.loginError = null;
      }, 3000); // desaparece em 3 segundos
    }
  } else {
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
  }

  this.form.reset();
}
}
