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
import { AuthService } from '../../core/services/auth-service/auth-service';



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

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
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
        name: ['', [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^[^\s]+$/)
        ]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', passwordValidators],
        confirmPassword: ['']
      }, { validators: this.passwordsMatchValidator });
    }
  }

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
 onSubmit() {
  if (this.form.invalid) return;

  const user = this.form.value;

  if (this.isLoginMode) {
    // LOGIN
    const { email, password } = user; 
    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginError = 'Email ou senha inválidos.';
        console.error(err);
      }
    });
  } else {
    // REGISTER
    this.authService.register(user).subscribe({
      next: () => {
        alert('Conta criada com sucesso!');
        this.toggleMode(); // Volta para tela de login
      },
      error: (err) => {
        console.error('Erro ao registrar:', err);
      }
    });
  }
}
}