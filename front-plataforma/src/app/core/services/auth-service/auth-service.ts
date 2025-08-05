import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";
import { StudentModel } from "../../../api/generated/model/studentModel";
import { StudentRegisterDTO } from "../../../api/generated/model/studentRegisterDTO";
import { LoginResponse } from "../../../api/generated/model/loginResponse";
import { StudentLoginDTO } from "../../../api/generated/model/studentLoginDTO";
import { StudentProfileDTO } from "../../../api/generated/model/studentProfileDTO";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService as ApiAuthService } from "../../../api/generated/plataforma-api";
import { StudentProfileUpdateDTO } from "../../../api/generated/model/studentProfileUpdateDTO";
import { StudentPreferenceUpdateDTO } from "../../../api/generated/model/studentPreferenceUpdateDTO";
import { StudentStatusDTO } from "../../../api/generated/model/studentStatusDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: BehaviorSubject<StudentModel | null>;

  constructor(
    private apiAuthService: ApiAuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
    
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

 updateProfile(studentProfileUpdateDTO: StudentProfileUpdateDTO): Observable<void> {
  return this.apiAuthService.updateCurrentStudent(studentProfileUpdateDTO, {
    headers: this.getAuthHeaders()
  });
}


updateStudentPreferences(studentPreferenceUpdateDTO: StudentPreferenceUpdateDTO): Observable<void> {
  return this.apiAuthService.updatePreferences(studentPreferenceUpdateDTO, {
    headers: this.getAuthHeaders()
  });
}


   updateStatus(id: string, studentStatusDTO: StudentStatusDTO): Observable<void> {
    return this.apiAuthService.updateStatus(id, studentStatusDTO, {
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

  // Simulação de dados do usuário logado
  private userRoles: string[] = ['USER', 'STUDENT']; // Exemplo: usuário comum

 // Método para verificar se o usuário tem a role de administrador
  isAdmin(): boolean {
    const user = this.currentUser.value;
    
    // 1. Verifica se o usuário está logado
    // 2. Verifica se o array 'roles' existe e não está vazio
    if (user && user.roles && user.roles.length > 0) {
      // 3. Itera sobre o array de roles para encontrar a role "ADMIN"
      // Note que a sua RoleModel tem uma propriedade 'name'
      return user.roles.some(role => role.name === 'ROLE_ADMIN');
    }

    // Retorna false se o usuário não está logado ou não tem a role
    return false;
  }

  // Método para simular um login de admin (apenas para este exemplo)
  loginAsAdmin() {
    this.userRoles = ['ROLE_USER', 'ROLE_ADMIN'];
  }
}

