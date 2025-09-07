import { StatutCulture } from './enums';

export interface ICulture {
  id: string;
  nom: string; // RG22: nom de la culture
  variete: string; // RG23: variété
  datePlantation: Date; // RG24: date de plantation
  statut: StatutCulture; // RG30: statut actuel
  quantite?: number; // Nombre de plants/graines
  espacementRangs?: number; // RG32: espacement entre rangs (cm)
  espacementLignes?: number; // RG32: espacement entre lignes (cm)
  description?: string;
  estPerenne: boolean; // Pour cultures pérennes (vergers)
  dateRecoltePrevisionnelle?: Date;
  dateRecolteReelle?: Date;
  dateCreation: Date;
  dateModification: Date;
  // Relations - RG25: associée à espace OU planche
  espaceCultureId?: string;
  plancheCultureId?: string;
  // Relations
  actions?: IAction[];
}

export interface ICreateCultureRequest {
  nom: string;
  variete: string;
  datePlantation: Date;
  quantite?: number;
  espacementRangs?: number;
  espacementLignes?: number;
  description?: string;
  estPerenne?: boolean;
  dateRecoltePrevisionnelle?: Date;
  // RG25: soit espaceCultureId soit plancheCultureId
  espaceCultureId?: string;
  plancheCultureId?: string;
}

export interface IUpdateCultureRequest extends Partial<ICreateCultureRequest> {
  id: string;
  statut?: StatutCulture;
  dateRecolteReelle?: Date;
}

// Import pour éviter circular dependency
import type { IAction } from './action.model'; 