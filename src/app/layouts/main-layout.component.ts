import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation principale -->
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <!-- Logo et titre -->
            <div class="flex items-center space-x-4">
              <a routerLink="/home" class="flex items-center space-x-3">
                <div class="text-2xl">🌾</div>
                <h1 class="text-xl font-bold text-green-800">AgriFlow</h1>
              </a>
            </div>

            <!-- Menu principal -->
            <div class="hidden md:flex items-center space-x-8">
              <a routerLink="/home" 
                 routerLinkActive="text-green-600 border-b-2 border-green-600"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Accueil
              </a>
              <a routerLink="/terrains" 
                 routerLinkActive="text-green-600 border-b-2 border-green-600"
                 class="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Terrains
              </a>
              <a routerLink="/cultures" 
                 routerLinkActive="text-green-600 border-b-2 border-green-600"
                 class="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Cultures
              </a>
              <a routerLink="/actions" 
                 routerLinkActive="text-green-600 border-b-2 border-green-600"
                 class="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Actions
              </a>
              <a routerLink="/calendrier" 
                 routerLinkActive="text-green-600 border-b-2 border-green-600"
                 class="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Calendrier
              </a>
              <a routerLink="/observations" 
                 routerLinkActive="text-green-600 border-b-2 border-green-600"
                 class="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Observations
              </a>
            </div>

            <!-- Menu utilisateur -->
            <div class="flex items-center space-x-4">
              <button class="text-gray-500 hover:text-gray-700">
                🔔
              </button>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span class="text-green-600 font-medium">👤</span>
                </div>
                <span class="text-sm text-gray-700">Utilisateur</span>
              </div>
            </div>

            <!-- Menu mobile toggle -->
            <button (click)="toggleMobileMenu()" 
                    class="md:hidden text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu mobile -->
        @if (isMobileMenuOpen()) {
          <div class="md:hidden bg-white border-t border-gray-200">
            <div class="px-4 py-2 space-y-1">
              <a routerLink="/home" 
                 (click)="closeMobileMenu()"
                 class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Accueil
              </a>
              <a routerLink="/terrains" 
                 (click)="closeMobileMenu()"
                 class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Terrains
              </a>
              <a routerLink="/cultures" 
                 (click)="closeMobileMenu()"
                 class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Cultures
              </a>
              <a routerLink="/actions" 
                 (click)="closeMobileMenu()"
                 class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Actions
              </a>
              <a routerLink="/calendrier" 
                 (click)="closeMobileMenu()"
                 class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Calendrier
              </a>
              <a routerLink="/observations" 
                 (click)="closeMobileMenu()"
                 class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Observations
              </a>
            </div>
          </div>
        }
      </nav>

      <!-- Contenu principal -->
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 mt-12">
        <div class="container mx-auto px-4 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="text-sm text-gray-600">
              © 2024 AgriFlow by ShiroUsagiLabo - Application de gestion agricole
            </div>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <a href="#" class="text-sm text-gray-600 hover:text-green-600">
                Support
              </a>
              <a href="#" class="text-sm text-gray-600 hover:text-green-600">
                Documentation
              </a>
              <a href="#" class="text-sm text-gray-600 hover:text-green-600">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class MainLayoutComponent {
  readonly isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(current => !current);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
} 