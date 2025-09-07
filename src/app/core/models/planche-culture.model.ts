export interface IPlancheCulture {
  id: string;
  nom: string; // RG15: nom de la planche
  longueur?: number; // en mètres
  largeur?: number; // en mètres
  surface?: number; // calculée automatiquement
  position?: {
    x: number;
    y: number;
  };
  description?: string;
  espaceCultureId: string; // RG16: appartient à un espace
  dateCreation: Date;
  dateModification: Date;
  // Relations
  cultures?: ICulture[];
}

export interface ICreatePlancheCultureRequest {
  nom: string;
  longueur?: number;
  largeur?: number;
  position?: {
    x: number;
    y: number;
  };
  description?: string;
  espaceCultureId: string;
}

export interface IUpdatePlancheCultureRequest extends Partial<ICreatePlancheCultureRequest> {
  id: string;
}

// Import pour éviter circular dependency
import type { ICulture } from './culture.model'; 