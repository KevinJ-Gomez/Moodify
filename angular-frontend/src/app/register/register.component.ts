import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: ''
  };

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Backend en puerto 8001
    const apiUrl = 'http://localhost:8001/api/register';

    this.http.post<any>(apiUrl, this.registerData).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        this.isLoading = false;
        alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registro:', error);
        this.isLoading = false;
        // Mensajes de error amigables para el usuario
        if (error.status === 400) {
          this.errorMessage = 'Datos inválidos. Revisa el email y la contraseña.';
        } else if (error.status === 500) {
          this.errorMessage = 'El email ya está registrado o hubo un error en el servidor.';
        } else {
          this.errorMessage = 'Error de conexión. Inténtalo más tarde.';
        }
      }
    });
  }
}