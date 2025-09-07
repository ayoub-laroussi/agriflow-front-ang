export interface IObservation {
  id: string;
  dateObservation: Date; // RG43: date obligatoire
  description: string; // RG44: description obligatoire
  categorie: CategorieObservation;
  severite?: 'faible' | 'moyenne' | 'elevee' | 'critique';
  photos?: string[]; // URLs des photos
  coordonnees?: {
    latitude: number;
    longitude: number;
  };
  conditionsMeteo?: IConditionsMeteo; // RG45: conditions météo
  espaceCultureId?: string; // RG42: sur un espace de culture
  plancheCultureId?: string;
  cultureId?: string;
  utilisateurId: string;
  dateCreation: Date;
  dateModification: Date;
  // Actions correctives prises suite à l'observation
  actionsCorrectives?: string[];
  suivi?: ISuiviObservation[];
}

export enum CategorieObservation {
  CROISSANCE = 'croissance',
  MALADIE = 'maladie',
  RAVAGEUR = 'ravageur',
  STRESS_HYDRIQUE = 'stress hydrique',
  CARENCE = 'carence',
  METEOROLOGIQUE = 'météorologique',
  EQUIPEMENT = 'équipement',
  GENERAL = 'général'
}

export interface IConditionsMeteo {
  temperature?: number; // °C
  humidite?: number; // %
  precipitations?: number; // mm
  ventVitesse?: number; // km/h
  ventDirection?: string;
  ensoleillement?: number; // heures
  pressionAtmospherique?: number; // hPa
  gelMatinal?: boolean;
  commentaire?: string;
}

export interface ISuiviObservation {
  id: string;
  dateFollowUp: Date;
  evolution: 'amelioration' | 'stagnation' | 'degradation' | 'resolu';
  commentaire: string;
  photos?: string[];
  actionsPrises?: string[];
}

export interface ICreateObservationRequest {
  dateObservation: Date;
  description: string;
  categorie: CategorieObservation;
  severite?: 'faible' | 'moyenne' | 'elevee' | 'critique';
  photos?: string[];
  coordonnees?: {
    latitude: number;
    longitude: number;
  };
  conditionsMeteo?: IConditionsMeteo;
  espaceCultureId?: string;
  plancheCultureId?: string;
  cultureId?: string;
  actionsCorrectives?: string[];
}

export interface IUpdateObservationRequest extends Partial<ICreateObservationRequest> {
  id: string;
}

export interface ICreateSuiviObservationRequest {
  observationId: string;
  dateFollowUp: Date;
  evolution: 'amelioration' | 'stagnation' | 'degradation' | 'resolu';
  commentaire: string;
  photos?: string[];
  actionsPrises?: string[];
} 