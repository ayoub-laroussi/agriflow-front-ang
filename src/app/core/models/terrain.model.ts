import { UniteSurface } from './enums';

export interface ITerrain {
  id: string;
  nom: string; // RG1: nom descriptif
  surface: number; // RG2: surface numérique
  uniteSurface: UniteSurface; // RG2: unité (hectares, m², ares)
  description?: string;
  localisation?: {
    latitude?: number;
    longitude?: number;
    adresse?: string;
  };
  dateCreation: Date;
  dateModification: Date;
  proprietaireId: string;
  // Relations
  espacesCulture?: IEspaceCulture[];
}

export interface ICreateTerrainRequest {
  nom: string;
  surface: number;
  uniteSurface: UniteSurface;
  description?: string;
  localisation?: {
    latitude?: number;
    longitude?: number;
    adresse?: string;
  };
}

export interface IUpdateTerrainRequest extends Partial<ICreateTerrainRequest> {
  id: string;
}

// Import nécessaire pour la relation (éviter circular dependency)
import type { IEspaceCulture } from './espace-culture.model'; 