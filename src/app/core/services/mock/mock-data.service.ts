import { Injectable, signal } from '@angular/core';
import { 
  ITerrain, 
  ICulture, 
  IAction, 
  IObservation,
  StatutCulture,
  TypeEspaceCulture,
  TypeAction,
  UniteSurface,
  CategorieObservation
} from '../../models';

export interface IDashboardStats {
  terrains: number;
  culturesActives: number;
  actionsPrevues: number;
  observations: number;
  surfaceTotale: number;
  prochainRecolte: Date | null;
  alertes: IAlerte[];
}

export interface IAlerte {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  titre: string;
  message: string;
  dateCreation: Date;
  actionRequise?: boolean;
}

export interface IActiviteRecente {
  id: string;
  type: 'action' | 'observation' | 'culture';
  titre: string;
  description: string;
  date: Date;
  icone: string;
  couleur: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  /**
   * Génère des statistiques réalistes pour le tableau de bord
   */
  getDashboardStats(): IDashboardStats {
    const stats: IDashboardStats = {
      terrains: 4,
      culturesActives: 15,
      actionsPrevues: 8,
      observations: 12,
      surfaceTotale: 3.8, // hectares
      prochainRecolte: new Date('2024-02-20'),
      alertes: this.generateAlertes()
    };
    
    return stats;
  }

  /**
   * Génère des alertes réalistes
   */
  private generateAlertes(): IAlerte[] {
    return [
      {
        id: '1',
        type: 'warning',
        titre: 'Arrosage requis',
        message: 'Les tomates du secteur B nécessitent un arrosage (dernière irrigation il y a 4 jours)',
        dateCreation: new Date(),
        actionRequise: true
      },
      {
        id: '2',
        type: 'info',
        titre: 'Récolte programmée',
        message: 'Les radis de la planche 3 seront prêts pour la récolte dans 2 jours',
        dateCreation: new Date(Date.now() - 2 * 60 * 60 * 1000), // il y a 2h
        actionRequise: false
      },
      {
        id: '3',
        type: 'error',
        titre: 'Maladie détectée',
        message: 'Possible mildiou observé sur les courgettes - intervention nécessaire',
        dateCreation: new Date(Date.now() - 6 * 60 * 60 * 1000), // il y a 6h
        actionRequise: true
      }
    ];
  }

  /**
   * Génère des activités récentes réalistes
   */
  getActivitesRecentes(): IActiviteRecente[] {
    return [
      {
        id: '1',
        type: 'action',
        titre: 'Plantation de radis',
        description: 'Semis direct de radis ronds rouges - Planche 3, Potager Sud',
        date: new Date(Date.now() - 3 * 60 * 60 * 1000), // il y a 3h
        icone: '🌱',
        couleur: 'text-green-600'
      },
      {
        id: '2',
        type: 'observation',
        titre: 'Stress hydrique observé',
        description: 'Feuilles flétries sur les tomates - Serre principale',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000), // il y a 5h
        icone: '👁️',
        couleur: 'text-orange-600'
      },
      {
        id: '3',
        type: 'action',
        titre: 'Traitement anti-pucerons',
        description: 'Application de savon noir sur les aubergines',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000), // hier
        icone: '🛡️',
        couleur: 'text-blue-600'
      },
      {
        id: '4',
        type: 'culture',
        titre: 'Nouvelle culture créée',
        description: 'Ajout de courgettes jaunes dans le tunnel Nord',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // avant-hier
        icone: '🥒',
        couleur: 'text-purple-600'
      },
      {
        id: '5',
        type: 'action',
        titre: 'Récolte de salade',
        description: '15 kg de laitue récoltés - destinés à la vente directe',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // il y a 3 jours
        icone: '🥬',
        couleur: 'text-green-600'
      }
    ];
  }

  /**
   * Génère des données météo réalistes
   */
  getMeteoJour() {
    return {
      temperature: 18,
      temperatureMin: 12,
      temperatureMax: 22,
      humidite: 75,
      precipitations: 2.5,
      vent: 15,
      ensoleillement: 6.5,
      description: 'Partiellement nuageux avec quelques averses'
    };
  }

  /**
   * Génère la planification de la semaine
   */
  getPlanificationSemaine() {
    return [
      {
        jour: 'Aujourd\'hui',
        date: new Date(),
        actions: [
          { heure: '08:00', titre: 'Arrosage serre principale', duree: '30 min' },
          { heure: '14:00', titre: 'Récolte radis planche 2', duree: '45 min' }
        ]
      },
      {
        jour: 'Demain',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        actions: [
          { heure: '09:00', titre: 'Semis carottes tunnel Sud', duree: '1h' },
          { heure: '16:00', titre: 'Traitement préventif tomates', duree: '20 min' }
        ]
      },
      {
        jour: 'Mercredi',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        actions: [
          { heure: '10:00', titre: 'Plantation courgettes', duree: '1h30' }
        ]
      }
    ];
  }

  /**
   * Génère des données de productivité
   */
  getProductiviteStats() {
    return {
      recoltesSemaine: {
        kg: 85,
        evolution: +12 // %
      },
      rendementMoyen: {
        value: 25, // kg/m²
        evolution: +8 // %
      },
      tauxCroissance: {
        value: 92, // %
        evolution: +3 // %
      },
      efficaciteActions: {
        value: 89, // %
        evolution: -2 // %
      }
    };
  }
} 