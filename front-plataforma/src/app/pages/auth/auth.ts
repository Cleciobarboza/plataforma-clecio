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
import { StudentRegisterDTO, StudentLoginDTO } from '../../api/generated/model';

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

  setupForm(): void {
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
    const confirmPasswordControl = control.get('confirmPassword');

    if (confirmPasswordControl) {
      const confirmPassword = confirmPasswordControl.value;
      if (password && confirmPassword && password !== confirmPassword) {
        confirmPasswordControl.setErrors({ mismatch: true });
      } else {
        const errors = confirmPasswordControl.errors;
        if (errors && errors['mismatch']) {
          delete errors['mismatch'];
          if (Object.keys(errors).length === 0) {
            confirmPasswordControl.setErrors(null);
          } else {
            confirmPasswordControl.setErrors(errors);
          }
        }
      }
    }

    return null;
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.setupForm();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.isLoginMode) {
      const payload: StudentLoginDTO = {
        email: formValue.email,
        password: formValue.password
      };

      this.authService.login(payload).subscribe({
        next: (res) => {
          if (res.token) {
            this.authService.saveToken(res.token);
          }

          if (res.user) {
            this.authService.saveUser(res.user);
          }

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loginError = 'Email ou senha inválidos.';
          console.error(err);
        }
      });
    } else {
      const payload: StudentRegisterDTO = {
        userName: formValue.name,
        email: formValue.email,
        password: formValue.password
      };

      this.authService.register(payload).subscribe({
        next: () => {
          alert('✅ Conta criada com sucesso!');
          this.toggleMode(); // volta para o modo login
        },
        error: (err) => {
          console.error('Erro ao registrar:', err);
        }
      });
    }
  }
}
