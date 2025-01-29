export type ConsommationsType = {
  id_consommation?: string;
  id_parcelle: string;
  conso_elec: number;
  conso_gaz: number;
  conso_rcu: number;
  mwh_ef: number;
  mwh_ep: number;
  pdl_elec: number;
  pdl_gaz: number;
  nb_adresses_livrees: number;
  annee: number;
};

export type EnergyData = {
  commune: string;
  annee: number;
  total_conso_elec: number;
  total_conso_gaz: number;
};

export type FormattedData = {
  [year: number]: {
    total_conso_elec: number[];
    total_conso_gaz: number[];
  },
  labels: string[];

};