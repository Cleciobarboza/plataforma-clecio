import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  

  constructor(private http: HttpClient) {}

  

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);

  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  updateStudent(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  getCurrentStudent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('usuarioLogado');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
