import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // Importamos TranslateService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  // Inyectamos TranslateService en el constructor
  constructor(
    private http: HttpClient, 
    private router: Router,
    private translate: TranslateService 
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    // Backend en puerto 8001
    const apiUrl = 'http://localhost:8001/api/login';

    this.http.post<any>(apiUrl, this.loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        
        // 1. Guardar la sesión
        localStorage.setItem('user_id', response.data.userId);
        localStorage.setItem('user_email', response.data.email);
        
        this.isLoading = false;
        
        // 2. Redirección al Dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
        
        // CORRECCIÓN: Usamos las claves de traducción en lugar de texto fijo
        if (error.status === 401) {
          // .instant() recupera el texto cargado (ej: "Email o contraseña incorrectos")
          this.errorMessage = this.translate.instant('LOGIN.ERROR_CREDENTIALS');
        } else {
          this.errorMessage = this.translate.instant('LOGIN.ERROR_SERVER');
        }
      }
    });
  }
}