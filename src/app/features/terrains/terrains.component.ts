import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ITerrain, UniteSurface } from '../../core/models';

@Component({
  selector: 'app-terrains',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Gestion des terrains</h1>
          <p class="text-gray-600 mt-2">
            Gérez vos espaces agricoles et leurs caractéristiques
          </p>
        </div>
        <a routerLink="/terrains/nouveau" 
           class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          + Nouveau terrain
        </a>
      </div>

      <!-- Liste des terrains -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (terrain of terrains(); track terrain.id) {
          <div class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <!-- En-tête de la carte -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-semibold text-gray-800">{{ terrain.nom }}</h3>
                  <p class="text-sm text-gray-500 mt-1">
                    Créé le {{ formatDate(terrain.dateCreation) }}
                  </p>
                </div>
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800">
                    ✏️
                  </button>
                  <button class="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            <!-- Informations du terrain -->
            <div class="p-6">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Surface:</span>
                  <span class="font-medium">
                    {{ terrain.surface }} {{ terrain.uniteSurface }}
                  </span>
                </div>
                
                @if (terrain.description) {
                  <div>
                    <span class="text-gray-600">Description:</span>
                    <p class="text-sm text-gray-800 mt-1">{{ terrain.description }}</p>
                  </div>
                }
                
                @if (terrain.espacesCulture && terrain.espacesCulture.length > 0) {
                  <div>
                    <span class="text-gray-600">Espaces de culture:</span>
                    <p class="text-sm font-medium text-green-600">
                      {{ terrain.espacesCulture.length }} espace(s)
                    </p>
                  </div>
                }
              </div>

              <!-- Actions -->
              <div class="mt-6 pt-4 border-t border-gray-100">
                <div class="flex space-x-3">
                  <a [routerLink]="['/terrains', terrain.id]" 
                     class="flex-1 bg-blue-50 text-blue-700 text-center py-2 px-4 rounded-md hover:bg-blue-100 transition-colors">
                    Voir détails
                  </a>
                  <a [routerLink]="['/terrains', terrain.id, 'espaces']" 
                     class="flex-1 bg-green-50 text-green-700 text-center py-2 px-4 rounded-md hover:bg-green-100 transition-colors">
                    Espaces
                  </a>
                </div>
              </div>
            </div>
          </div>
        } @empty {
          <!-- État vide -->
          <div class="col-span-full text-center py-12">
            <div class="text-6xl mb-4">🌾</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Aucun terrain enregistré
            </h3>
            <p class="text-gray-600 mb-6">
              Commencez par créer votre premier terrain agricole
            </p>
            <a routerLink="/terrains/nouveau" 
               class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Créer mon premier terrain
            </a>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class TerrainsComponent {
  // Données mock (à remplacer par service API)
  readonly terrains = signal<ITerrain[]>([
    {
      id: '1',
      nom: 'Champ Nord',
      surface: 2.5,
      uniteSurface: UniteSurface.HECTARE,
      description: 'Terrain principal pour les cultures céréalières',
      dateCreation: new Date('2024-01-15'),
      dateModification: new Date('2024-01-15'),
      proprietaireId: 'user1',
      espacesCulture: []
    },
    {
      id: '2',
      nom: 'Potager Sud',
      surface: 150,
      uniteSurface: UniteSurface.METRE_CARRE,
      description: 'Potager familial avec légumes de saison',
      dateCreation: new Date('2024-02-01'),
      dateModification: new Date('2024-02-01'),
      proprietaireId: 'user1'
    }
  ]);

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }
} 