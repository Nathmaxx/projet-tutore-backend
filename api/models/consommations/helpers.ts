// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { ConsommationsType, EnergyData, FormattedData } from "./consommations"; 

export namespace ConsommationsHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
  export const getConsommations = async () : Promise<boolean> => {
    const sql = `SELECT * FROM consommations`
    const result = await executeQuery(sql)
    return result.affectedRows > 0;
  }
  
  export const getConsommationById = async (id: string) : Promise<ConsommationsType[]> => {
    const sql = `SELECT * FROM consommations WHERE id = ?`
    return await executeQuery(sql, [id]);
  }
  
  export const createConsommation = async (consommation: ConsommationsType) : Promise<boolean> => {
    const sql = `INSERT INTO consommations SET ?`
    const result = await executeQuery(sql, [consommation]);
    return result.affectedRows > 0;
  }
  
  export const updateConsommation = async (id: string, consommation: ConsommationsType) : Promise<ConsommationsType[]> => {
    const sql = `UPDATE consommations SET ? WHERE id = ?`
    return await executeQuery(sql, [consommation, id]);
  }
  export const getConsommationsByannee = async (annee: number) : Promise<ConsommationsType[]> => {
    const sql = `SELECT * FROM consommations WHERE annee = ?`
    return await executeQuery(sql, [annee]);
  }
  
  // Récupérer les consommations d'une année donnée dans une commune donnée
  export const getConsommationsByAnneeAndCommune = async (annee: number, commune: string) : Promise<ConsommationsType[]> => {
    const sql = `SELECT * FROM consommations WHERE annee = ? AND commune LIKE ?`
    return await executeQuery(sql, [annee, `%${commune}%`]);
  }
  
  //recuperer les consommations moyennes d'une annee donnée dans une commune donnée 
  export const getConsommationsMoyenneByAnneeAndCommune = async (annee: number, commune: string) : Promise<ConsommationsType[]> => {
    const sql = `SELECT AVG(conso_elec) as conso_elec, AVG(conso_gaz) as conso_gaz, AVG(conso_rcu) as conso_rcu, AVG(mwh_ef) as mwh_ef, AVG(mwh_ep) as mwh_ep, AVG(pdl_elec) as pdl_elec, AVG(pdl_gaz) as pdl_gaz, AVG(nb_adresses_livrees) as nb_adresses_livrees FROM consommations WHERE annee = ? AND commune = ?`
    return await executeQuery(sql, [annee, commune]);
  }
  
  export const getConsoElecGazCommune = async() : Promise<EnergyData[]> => {
    const sql = `
            SELECT 
                p.commune,
                c.annee,
                SUM(c.conso_elec) AS total_conso_elec,
                SUM(c.conso_gaz) AS total_conso_gaz
            FROM 
                consommations c
            JOIN 
                parcelles p ON c.id_parcelle = p.id_parcelle
            GROUP BY 
                p.commune, c.annee
            ORDER BY 
                p.commune, c.annee`
    return await executeQuery(sql);
  }

  export const getTotalConsoGazByYear = async() : Promise<EnergyData[]> => {
    const sql = `
            SELECT 
                c.annee,
                SUM(c.conso_gaz) AS total_conso_gaz,
                SUM(c.conso_elec) AS total_conso_elec
            FROM 
                consommations c
            GROUP BY 
                c.annee
            ORDER BY 
                c.annee`
    return await executeQuery(sql);
  }

  export const consoSurfacce = async() : Promise<EnergyData[]> => {
    const sql = `
        SELECT 
          c.annee,
          SUM(c.conso_elec) AS total_conso_elec,
          SUM(c.conso_gaz) AS total_conso_gaz,
          SUM(ld.majic_surf_habitable_parcelle) AS total_majic_surf_habitable_parcelle,
          SUM(ld.majic_nb_logement_parcelle) AS total_majic_nb_logement_parcelle
        FROM 
            consommations c
        JOIN 
            logement_details ld ON c.id_parcelle = ld.id_parcelle
        GROUP BY 
            c.annee
        ORDER BY 
            c.annee;`

    return await executeQuery(sql);
  }
}

export function formatEnergyData(data: EnergyData[]): FormattedData {
  // Trier les communes dans l'ordre croissant
  const sortedCommunes = [...new Set(data.map(item => item.commune))].sort();
  
  return data.reduce((acc, item) => {
    if (!acc[item.annee]) {
      acc[item.annee] = { total_conso_elec: [], total_conso_gaz: [] };
    }
    
    // Trouver l'index de la commune pour l'insérer dans le bon ordre
    const communeIndex = sortedCommunes.indexOf(item.commune);
    
    acc[item.annee].total_conso_elec[communeIndex] = item.total_conso_elec;
    acc[item.annee].total_conso_gaz[communeIndex] = item.total_conso_gaz;
    
    acc.labels = sortedCommunes;
    
    return acc;
  }, {} as FormattedData);
}