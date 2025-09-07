import { TypeAction } from './enums';

export interface IAction {
  id: string;
  type: TypeAction; // RG31: type d'action
  dateAction: Date; // RG33: date de l'action
  dateCreation: Date;
  commentaire?: string; // RG34: commentaire optionnel
  dureeEstimee?: number; // en minutes
  estTerminee: boolean;
  conditions?: {
    meteo?: string;
    temperature?: number;
    humidite?: number;
  };
  // Détails spécifiques selon le type d'action
  detailsPlantation?: IDetailsPlantation; // RG32: pour type plantation
  detailsTraitement?: IDetailsTraitement;
  detailsRecolte?: IDetailsRecolte;
  // Relations - RG38-40: peut cibler espace, planche OU culture
  espaceCultureId?: string;
  plancheCultureId?: string;
  cultureId?: string;
  utilisateurId: string;
}

export interface IDetailsPlantation {
  typePlantation: 'semis' | 'repiquage' | 'plantation directe';
  espacementRangs: number; // RG32: espacement entre rangs (cm)
  espacementLignes: number; // RG32: espacement entre lignes (cm)
  nombrePlants?: number; // RG32: nombre de plants ou graines
  nombreGraines?: number;
  profondeurSemis?: number; // en cm
  variete?: string;
}

export interface IDetailsTraitement {
  typeTraitement: 'fongicide' | 'insecticide' | 'herbicide' | 'fertilisant' | 'amendement';
  produitUtilise?: string;
  dosage?: string;
  surfaceTraitee?: number;
  methodeApplication?: string;
}

export interface IDetailsRecolte {
  quantiteRecoltee?: number;
  uniteQuantite?: 'kg' | 'tonnes' | 'unités' | 'paniers';
  qualite?: 'excellente' | 'bonne' | 'moyenne' | 'mauvaise';
  destinationRecolte?: 'vente' | 'consommation' | 'stockage' | 'transformation';
  prixVente?: number;
}

export interface ICreateActionRequest {
  type: TypeAction;
  dateAction: Date;
  commentaire?: string;
  dureeEstimee?: number;
  conditions?: {
    meteo?: string;
    temperature?: number;
    humidite?: number;
  };
  detailsPlantation?: IDetailsPlantation;
  detailsTraitement?: IDetailsTraitement;
  detailsRecolte?: IDetailsRecolte;
  // Une seule de ces trois relations
  espaceCultureId?: string;
  plancheCultureId?: string;
  cultureId?: string;
}

export interface IUpdateActionRequest extends Partial<ICreateActionRequest> {
  id: string;
  estTerminee?: boolean;
}

// Interface pour le planning d'actions futures
export interface IActionPlanifiee {
  id: string;
  action: IAction;
  datePrevisionnelle: Date;
  rappelActive: boolean;
  recurrence?: {
    type: 'quotidienne' | 'hebdomadaire' | 'mensuelle' | 'saisonniere';
    intervalle: number;
    finRecurrence?: Date;
  };
} 