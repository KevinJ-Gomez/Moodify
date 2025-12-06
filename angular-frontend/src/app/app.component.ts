import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // <--- IMPORTANTE 1

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANTE 2: Aquí añadimos RouterOutlet para poder usarlo en el HTML
  imports: [CommonModule, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Moodify';
}