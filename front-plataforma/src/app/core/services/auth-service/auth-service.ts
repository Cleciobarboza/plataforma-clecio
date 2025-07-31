import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";

import { StudentModel } from "../../../api/generated/model/studentModel";
import { StudentRegisterDTO } from "../../../api/generated/model/studentRegisterDTO";
import { LoginResponse } from "../../../api/generated/model/loginResponse";
import { StudentLoginDTO } from "../../../api/generated/model/studentLoginDTO";
import { StudentProfileDTO } from "../../../api/generated/model/studentProfileDTO";
import { HttpHeaders } from "@angular/common/http";
import { AuthService as ApiAuthService } from "../../../api/generated/plataforma-api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: BehaviorSubject<StudentModel | null>;

  constructor(
    private apiAuthService: ApiAuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let initialUser: StudentModel | null = null;

    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('usuarioLogado');
      if (storedUser) {
        try {
          initialUser = JSON.parse(storedUser);
        } catch (e) {
          console.error('❌ Erro ao fazer parse do usuário logado no localStorage:', e);
        }
      }
    }

    this.currentUser = new BehaviorSubject<StudentModel | null>(initialUser);
  }

  register(data: StudentRegisterDTO): Observable<StudentModel> {
    return this.apiAuthService.register(data).pipe(
      tap(user => {
        console.log('✅ Registro realizado:', user);
        // Salvar o usuário, se necessário
        // this.saveUser(user);
      }),
      catchError(err => {
        console.error('❌ Erro no registro:', err);
        throw err;
      })
    );
  }

  login(data: StudentLoginDTO): Observable<LoginResponse> {
    return this.apiAuthService.login(data).pipe(
      tap(response => {
        console.log('✅ Login realizado:', response);
        if (response.token) {
          this.saveToken(response.token);
        }
        if (response.user) {
          this.saveUser(response.user);
        }
      }),
      catchError(err => {
        console.error('❌ Erro no login:', err);
        throw err;
      })
    );
  }

  updateStudent(id: string, data: StudentProfileDTO): Observable<void> {
    return this.apiAuthService.updateProfile(id, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => {
        console.log('✅ Perfil atualizado');
        this.getCurrentStudent().subscribe(); // Atualiza cache local
      }),
      catchError(err => {
        console.error('❌ Erro ao atualizar perfil:', err);
        throw err;
      })
    );
  }

  getCurrentStudent(): Observable<StudentModel | null> {
    return this.apiAuthService.getCurrentStudent({
      headers: this.getAuthHeaders()
    }).pipe(
      tap(user => {
        console.log('✅ Usuário atual carregado:', user);
        this.saveUser(user);
      }),
      catchError(error => {
        console.error('❌ Erro ao buscar dados do aluno atual:', error);
        this.logout();
        return of(null);
      })
    );
  }

  deleteAccount(id: string): Observable<void> {
    return this.apiAuthService._delete(id, {
      headers: this.getAuthHeaders()
    });
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  saveUser(user: StudentModel) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
      this.currentUser.next(user);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioLogado');
    }
    this.currentUser.next(null);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}
