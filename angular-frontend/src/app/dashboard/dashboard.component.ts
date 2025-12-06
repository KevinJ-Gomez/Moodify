import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  // Variables principales
  currentMood: string = 'all';
  isPlaying: boolean = false;
  currentSong: any = null;
  
  // Variables para la configuración (¡Esto es lo que faltaba!)
  isSettingsOpen: boolean = false;
  isDarkMode: boolean = true;
  currentLang: string = 'es';

  // Lista de emociones con claves de traducción
  moods = [
    { id: 'happy', label: 'DASHBOARD.MOOD_HAPPY', color: '#fbbf24' },
    { id: 'sad', label: 'DASHBOARD.MOOD_SAD', color: '#60a5fa' },
    { id: 'relax', label: 'DASHBOARD.MOOD_RELAX', color: '#34d399' },
    { id: 'energy', label: 'DASHBOARD.MOOD_ENERGY', color: '#f472b6' }
  ];

  songs = [
    { id: 1, title: 'Happy Vibes', artist: 'Moodify Mix', mood: 'happy', cover: 'https://picsum.photos/200?random=1' },
    { id: 2, title: 'Rainy Day', artist: 'Chill Lo-Fi', mood: 'sad', cover: 'https://picsum.photos/200?random=2' },
    { id: 3, title: 'Workout Pump', artist: 'Gym Heroes', mood: 'energy', cover: 'https://picsum.photos/200?random=3' },
    { id: 4, title: 'Meditation', artist: 'Zen Master', mood: 'relax', cover: 'https://picsum.photos/200?random=4' },
    { id: 5, title: 'Summer Hits', artist: 'Top 50', mood: 'happy', cover: 'https://picsum.photos/200?random=5' }
  ];

  filteredSongs = this.songs;

  // Inyectamos TranslateService
  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.router.navigate(['/login']);
    }

    // Cargar preferencias guardadas
    const savedLang = localStorage.getItem('app_lang') || 'es';
    this.setLanguage(savedLang);

    // Por defecto es oscuro, si guardaron 'light', cambiamos
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme === 'light') {
      this.isDarkMode = false;
    }
  }

  setMood(moodId: string) {
    this.currentMood = moodId;
    if (moodId === 'all') {
      this.filteredSongs = this.songs;
    } else {
      this.filteredSongs = this.songs.filter(song => song.mood === moodId);
    }
  }

  playSong(song: any) {
    this.currentSong = song;
    this.isPlaying = true;
  }

  // --- MÉTODOS DE CONFIGURACIÓN ---

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('app_lang', lang);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('app_theme', theme);
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    this.router.navigate(['/login']);
  }
}