import { executeQuery } from "../../config/dbsql";
import { ConsommationsIndustriellesType } from "./consommations_industrielles";

export namespace ConsommationsIndustriellesHelper {
  // Récupérer toutes les consommations industrielles
  export const getConsommationsIndustrielles = async (): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `SELECT * FROM consommations_industrielles`;
    return await executeQuery(sql);
  };

  // Récupérer une consommation industrielle par son ID
  export const getConsommationIndustrielleById = async (id: string): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `SELECT * FROM consommations_industrielles WHERE id_consommation_industrielle = ?`;
    return await executeQuery(sql, [id]);
  };

  // Créer une nouvelle consommation industrielle
  export const createConsommationIndustrielle = async (consommation: ConsommationsIndustriellesType): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `INSERT INTO consommations_industrielles SET ?`;
    return await executeQuery(sql, [consommation]);
  };

  // Mettre à jour une consommation industrielle existante
  export const updateConsommationIndustrielle = async (id: string, consommation: ConsommationsIndustriellesType): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `UPDATE consommations_industrielles SET ? WHERE id_consommation_industrielle = ?`;
    return await executeQuery(sql, [consommation, id]);
  };

  // Récupérer les consommations industrielles d'une année donnée
  export const getConsommationsIndustriellesByAnnee = async (annee: number): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `SELECT * FROM consommations_industrielles WHERE annee = ?`;
    return await executeQuery(sql, [annee]);
  };

  //recuperer les consommations industrielles d'une annee dans une commune donnée
  export const getConsommationsIndustriellesByCommuneAndAnnee = async (commune: string,annee: number): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `SELECT * FROM consommations_industrielles WHERE annee = ? AND commune LIKE ?`;
    return await executeQuery(sql, [annee, `%${commune}%`]);
  };

  export const getTotalConsoElect = async () : Promise<{total: number}[]> => {
    const sql = `SELECT SUM(i_conso_elec) as total, annee    
                FROM consommations_industrielles
                group by annee
    `;
    return await executeQuery(sql);
  }

  export const getTotalConsoGaz = async () : Promise<{total: number}[]> => {
    const sql = `SELECT SUM(i_conso_gaz) as total, annee FROM consommations_industrielles group by annee`;
    return await executeQuery(sql);
  }
}
