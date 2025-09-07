import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService, IDashboardStats, IActiviteRecente, IAlerte } from '../../core/services/mock/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- En-tête de bienvenue -->
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-green-800 mb-4">
          Tableau de bord AgriFlow
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Vue d'ensemble de votre exploitation agricole - {{ currentDate() }}
        </p>
      </header>

      <!-- Alertes importantes -->
      @if (stats().alertes.length > 0) {
        <section class="mb-8">
          <div class="space-y-3">
            @for (alerte of alertesUrgentes(); track alerte.id) {
              <div [class]="getAlerteClasses(alerte.type)" role="alert">
                <div class="flex justify-between items-start">
                  <div class="flex">
                    <div class="mr-3 text-lg">
                      {{ getAlerteIcon(alerte.type) }}
                    </div>
                    <div>
                      <h4 class="font-semibold">{{ alerte.titre }}</h4>
                      <p class="text-sm mt-1">{{ alerte.message }}</p>
                    </div>
                  </div>
                  @if (alerte.actionRequise) {
                    <button class="text-sm px-3 py-1 bg-white/20 rounded-md hover:bg-white/30 transition-colors">
                      Agir
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </section>
      }

      <!-- Statistiques principales -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Terrains</h3>
              <p class="text-3xl font-bold text-green-600">{{ stats().terrains }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ stats().surfaceTotale }} ha total</p>
            </div>
            <div class="text-3xl">🌾</div>
          </div>
          <a routerLink="/terrains" class="text-sm text-green-600 hover:underline mt-2 block">
            Gérer les terrains →
          </a>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Cultures actives</h3>
              <p class="text-3xl font-bold text-blue-600">{{ stats().culturesActives }}</p>
              <p class="text-sm text-gray-500 mt-1">En production</p>
            </div>
            <div class="text-3xl">🌱</div>
          </div>
          <a routerLink="/cultures" class="text-sm text-blue-600 hover:underline mt-2 block">
            Voir les cultures →
          </a>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Actions prévues</h3>
              <p class="text-3xl font-bold text-orange-600">{{ stats().actionsPrevues }}</p>
              <p class="text-sm text-gray-500 mt-1">Cette semaine</p>
            </div>
            <div class="text-3xl">📅</div>
          </div>
          <a routerLink="/calendrier" class="text-sm text-orange-600 hover:underline mt-2 block">
            Voir le planning →
          </a>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Observations</h3>
              <p class="text-3xl font-bold text-purple-600">{{ stats().observations }}</p>
              <p class="text-sm text-gray-500 mt-1">Ce mois-ci</p>
            </div>
            <div class="text-3xl">👁️</div>
          </div>
          <a routerLink="/observations" class="text-sm text-purple-600 hover:underline mt-2 block">
            Consulter →
          </a>
        </div>
      </section>

      <!-- Contenu principal en deux colonnes -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Colonne principale (2/3) -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Météo du jour -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span class="mr-2">🌤️</span>
              Conditions météorologiques
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <p class="text-2xl font-bold text-gray-800">{{ meteo().temperature }}°C</p>
                <p class="text-sm text-gray-600">Température</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">{{ meteo().humidite }}%</p>
                <p class="text-sm text-gray-600">Humidité</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-green-600">{{ meteo().precipitations }}mm</p>
                <p class="text-sm text-gray-600">Pluie</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-orange-600">{{ meteo().vent }} km/h</p>
                <p class="text-sm text-gray-600">Vent</p>
              </div>
            </div>
            <p class="mt-4 text-sm text-gray-600">{{ meteo().description }}</p>
          </section>

          <!-- Planning de la semaine -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span class="mr-2">📋</span>
              Planning de la semaine
            </h2>
            <div class="space-y-4">
              @for (planning of planificationSemaine(); track planning.jour) {
                <div class="border-l-4 border-green-500 pl-4">
                  <h3 class="font-semibold text-gray-800">{{ planning.jour }}</h3>
                  <div class="mt-2 space-y-2">
                    @for (action of planning.actions; track $index) {
                      <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">{{ action.heure }} - {{ action.titre }}</span>
                        <span class="text-gray-500">{{ action.duree }}</span>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
            <a routerLink="/calendrier" class="inline-block mt-4 text-green-600 hover:underline">
              Voir tout le planning →
            </a>
          </section>
        </div>

        <!-- Colonne latérale (1/3) -->
        <div class="space-y-8">
          
          <!-- Actions rapides -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Actions rapides</h2>
            <div class="space-y-3">
              <a routerLink="/terrains/nouveau" 
                 class="flex items-center p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                <span class="text-2xl mr-3">🌾</span>
                <span class="font-medium text-green-800">Nouveau terrain</span>
              </a>
              <a routerLink="/actions/nouvelle" 
                 class="flex items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                <span class="text-2xl mr-3">📝</span>
                <span class="font-medium text-blue-800">Enregistrer une action</span>
              </a>
              <a routerLink="/observations/nouvelle" 
                 class="flex items-center p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                <span class="text-2xl mr-3">👁️</span>
                <span class="font-medium text-purple-800">Nouvelle observation</span>
              </a>
            </div>
          </section>

          <!-- Activités récentes -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Activités récentes</h2>
            <div class="space-y-4">
              @for (activite of activitesRecentes(); track activite.id) {
                <div class="flex items-start space-x-3">
                  <span class="text-lg">{{ activite.icone }}</span>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-800 text-sm">{{ activite.titre }}</p>
                    <p class="text-xs text-gray-600 mt-1">{{ activite.description }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ formatActiviteDate(activite.date) }}</p>
                  </div>
                </div>
              }
            </div>
          </section>

          <!-- Productivité -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Productivité</h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Récoltes (semaine)</span>
                <div class="text-right">
                  <span class="font-bold text-green-600">{{ productivite().recoltesSemaine.kg }} kg</span>
                  <span [class]="getEvolutionClass(productivite().recoltesSemaine.evolution)" class="text-xs ml-1">
                    {{ formatEvolution(productivite().recoltesSemaine.evolution) }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Taux de croissance</span>
                <div class="text-right">
                  <span class="font-bold text-blue-600">{{ productivite().tauxCroissance.value }}%</span>
                  <span [class]="getEvolutionClass(productivite().tauxCroissance.evolution)" class="text-xs ml-1">
                    {{ formatEvolution(productivite().tauxCroissance.evolution) }}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  private readonly mockDataService = inject(MockDataService);
  
  // Signaux réactifs
  readonly stats = signal<IDashboardStats>({} as IDashboardStats);
  readonly activitesRecentes = signal<IActiviteRecente[]>([]);
  readonly meteo = signal<any>({});
  readonly planificationSemaine = signal<any[]>([]);
  readonly productivite = signal<any>({});
  
  // Computed pour les alertes urgentes
  readonly alertesUrgentes = computed(() => 
    this.stats().alertes?.filter(alerte => alerte.type === 'error' || alerte.type === 'warning') || []
  );
  
  readonly currentDate = computed(() => 
    new Intl.DateTimeFormat('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(new Date())
  );

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.stats.set(this.mockDataService.getDashboardStats());
    this.activitesRecentes.set(this.mockDataService.getActivitesRecentes());
    this.meteo.set(this.mockDataService.getMeteoJour());
    this.planificationSemaine.set(this.mockDataService.getPlanificationSemaine());
    this.productivite.set(this.mockDataService.getProductiviteStats());
  }

  getAlerteClasses(type: string): string {
    const baseClasses = 'p-4 rounded-lg border-l-4';
    switch (type) {
      case 'error':
        return `${baseClasses} bg-red-50 border-red-500 text-red-800`;
      case 'warning':
        return `${baseClasses} bg-orange-50 border-orange-500 text-orange-800`;
      case 'info':
        return `${baseClasses} bg-blue-50 border-blue-500 text-blue-800`;
      case 'success':
        return `${baseClasses} bg-green-50 border-green-500 text-green-800`;
      default:
        return `${baseClasses} bg-gray-50 border-gray-500 text-gray-800`;
    }
  }

  getAlerteIcon(type: string): string {
    switch (type) {
      case 'error': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      default: return '📢';
    }
  }

  formatActiviteDate(date: Date): string {
    const maintenant = new Date();
    const diff = maintenant.getTime() - date.getTime();
    const heures = Math.floor(diff / (1000 * 60 * 60));
    const jours = Math.floor(heures / 24);
    
    if (heures < 1) return 'À l\'instant';
    if (heures < 24) return `Il y a ${heures}h`;
    if (jours === 1) return 'Hier';
    if (jours < 7) return `Il y a ${jours} jours`;
    return date.toLocaleDateString('fr-FR');
  }

  getEvolutionClass(evolution: number): string {
    if (evolution > 0) return 'text-green-600';
    if (evolution < 0) return 'text-red-600';
    return 'text-gray-600';
  }

  formatEvolution(evolution: number): string {
    const signe = evolution > 0 ? '+' : '';
    return `${signe}${evolution}%`;
  }
} 