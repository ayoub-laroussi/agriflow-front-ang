// Énumérations AgriFlow selon les règles de gestion

export enum StatutCulture {
  INUTILISABLE = 'inutilisable',
  EN_JACHERE = 'en jachère',
  EN_PREPARATION = 'en préparation',
  EN_PRODUCTION = 'en production',
  EN_CROISSANCE = 'en croissance',
  RECOLTEE = 'récoltée',
  MALADE = 'malade'
}

export enum TypeEspaceCulture {
  RIZIERE = 'rizière',
  CHAMP = 'champ',
  VERGER = 'verger',
  POTAGER = 'potager'
}

export enum TypeAction {
  PREPARATION_SOL = 'préparation du sol',
  PLANTATION = 'plantation',
  ENTRETIEN = 'entretien',
  PROTECTION = 'protection',
  RECOLTE = 'récolte'
}

export enum UniteSurface {
  HECTARE = 'hectare',
  METRE_CARRE = 'mètre carré',
  ARE = 'are'
}

export enum RoleUtilisateur {
  PROPRIETAIRE = 'propriétaire',
  COLLABORATEUR = 'collaborateur',
  VISUALISATEUR = 'visualisateur'
} 