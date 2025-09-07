import { TypeEspaceCulture } from './enums';

export interface IEspaceCulture {
  id: string;
  nom: string; // RG8: nom de l'espace
  type: TypeEspaceCulture; // RG9: type (rizière, champ, verger, potager)
  surface?: number;
  description?: string;
  terrainId: string; // Référence au terrain parent
  dateCreation: Date;
  dateModification: Date;
  // Relations
  planchesCulture?: IPlancheCulture[];
  cultures?: ICulture[];
}

export interface ICreateEspaceCultureRequest {
  nom: string;
  type: TypeEspaceCulture;
  surface?: number;
  description?: string;
  terrainId: string;
}

export interface IUpdateEspaceCultureRequest extends Partial<ICreateEspaceCultureRequest> {
  id: string;
}

// Imports pour éviter circular dependencies
import type { IPlancheCulture } from './planche-culture.model';
import type { ICulture } from './culture.model'; 