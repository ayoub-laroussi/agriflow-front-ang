import { Routes } from '@angular/router';

export const routes: Routes = [
  // Page d'accueil
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Accueil - AgriFlow'
  },
  
  // Gestion des terrains
  {
    path: 'terrains',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/terrains/terrains.component').then(m => m.TerrainsComponent),
        title: 'Terrains - AgriFlow'
      },
      {
        path: 'nouveau',
        loadComponent: () => import('./features/terrains/terrain-form/terrain-form.component').then(m => m.TerrainFormComponent),
        title: 'Nouveau terrain - AgriFlow'
      },
      {
        path: ':id',
        loadComponent: () => import('./features/terrains/terrain-detail/terrain-detail.component').then(m => m.TerrainDetailComponent),
        title: 'Détail terrain - AgriFlow'
      },
      {
        path: ':id/espaces',
        loadComponent: () => import('./features/terrains/espaces-culture/espaces-culture.component').then(m => m.EspacesCultureComponent),
        title: 'Espaces de culture - AgriFlow'
      }
    ]
  },

  // Gestion des cultures
  {
    path: 'cultures',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/cultures/cultures.component').then(m => m.CulturesComponent),
        title: 'Cultures - AgriFlow'
      },
      {
        path: 'nouvelle',
        loadComponent: () => import('./features/cultures/culture-form/culture-form.component').then(m => m.CultureFormComponent),
        title: 'Nouvelle culture - AgriFlow'
      },
      {
        path: ':id',
        loadComponent: () => import('./features/cultures/culture-detail/culture-detail.component').then(m => m.CultureDetailComponent),
        title: 'Détail culture - AgriFlow'
      }
    ]
  },

  // Gestion des actions agricoles
  {
    path: 'actions',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/actions/actions.component').then(m => m.ActionsComponent),
        title: 'Actions agricoles - AgriFlow'
      },
      {
        path: 'nouvelle',
        loadComponent: () => import('./features/actions/action-form/action-form.component').then(m => m.ActionFormComponent),
        title: 'Nouvelle action - AgriFlow'
      },
      {
        path: ':id',
        loadComponent: () => import('./features/actions/action-detail/action-detail.component').then(m => m.ActionDetailComponent),
        title: 'Détail action - AgriFlow'
      }
    ]
  },

  // Calendrier agricole
  {
    path: 'calendrier',
    loadComponent: () => import('./features/calendrier/calendrier.component').then(m => m.CalendrierComponent),
    title: 'Calendrier agricole - AgriFlow'
  },

  // Observations et météo
  {
    path: 'observations',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/observations/observations.component').then(m => m.ObservationsComponent),
        title: 'Observations - AgriFlow'
      },
      {
        path: 'nouvelle',
        loadComponent: () => import('./features/observations/observation-form/observation-form.component').then(m => m.ObservationFormComponent),
        title: 'Nouvelle observation - AgriFlow'
      }
    ]
  },

  // Page 404
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page non trouvée - AgriFlow'
  }
];
