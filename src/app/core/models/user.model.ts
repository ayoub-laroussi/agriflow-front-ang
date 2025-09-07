import { RoleUtilisateur } from './enums';

export interface IUser {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  telephone?: string;
  avatar?: string;
  dateCreation: Date;
  derniereConnexion?: Date;
  preferences: IPreferencesUtilisateur;
  // Relations
  exploitations: IExploitation[];
}

export interface IExploitation {
  id: string;
  nom: string;
  description?: string;
  adresse?: string;
  role: RoleUtilisateur; // RG49: rôle de l'utilisateur sur cette exploitation
  dateAjout: Date;
  permissions: IPermissions;
}

export interface IPermissions {
  peutCreer: boolean;
  peutModifier: boolean;
  peutSupprimer: boolean;
  peutInviter: boolean; // RG50: propriétaire peut inviter
  peutVoirTousLesEspaces: boolean;
  espacesAccessibles?: string[]; // Liste des IDs d'espaces accessibles
}

export interface IPreferencesUtilisateur {
  theme: 'clair' | 'sombre' | 'auto';
  langue: 'fr' | 'en';
  uniteTemperature: 'celsius' | 'fahrenheit';
  uniteSurface: 'hectare' | 'metre_carre' | 'are';
  fuseauHoraire: string;
  notifications: IPreferencesNotifications;
  affichageCalendrier: 'jour' | 'semaine' | 'mois';
}

export interface IPreferencesNotifications {
  email: boolean; // RG51: activation/désactivation
  push: boolean;
  rappelsActions: boolean; // RG52: rappels automatiques
  alertesMeteo: boolean;
  rapportsHebdomadaires: boolean;
  notificationsCollaboratives: boolean;
}

export interface IInvitationCollaborateur {
  id: string;
  emailInvite: string;
  role: RoleUtilisateur;
  exploitationId: string;
  dateInvitation: Date;
  dateExpiration: Date;
  statut: 'en_attente' | 'acceptee' | 'refusee' | 'expiree';
  messagePersonnalise?: string;
  invitePar: string; // ID utilisateur
}

export interface ICreateUserRequest {
  email: string;
  motDePasse: string;
  prenom: string;
  nom: string;
  telephone?: string;
}

export interface IUpdateUserRequest {
  id: string;
  prenom?: string;
  nom?: string;
  telephone?: string;
  avatar?: string;
  preferences?: Partial<IPreferencesUtilisateur>;
}

export interface IInviterCollaborateurRequest {
  email: string;
  role: RoleUtilisateur;
  exploitationId: string;
  messagePersonnalise?: string;
  permissions?: Partial<IPermissions>;
} 