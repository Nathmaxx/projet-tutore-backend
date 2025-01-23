import { executeQuery } from "../../config/dbsql";
import { ConsommationsIndustriellesType } from "./consommations_industrielles";

export namespace ConsommationsIndustriellesHelper {
  // Récupérer toutes les consommations industrielles
  export const getConsommationsIndustrielles = async (): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `SELECT * FROM ConsommationsIndustrielles`;
    return await executeQuery(sql);
  };

  // Récupérer une consommation industrielle par son ID
  export const getConsommationIndustrielleById = async (id: string): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `SELECT * FROM ConsommationsIndustrielles WHERE id_consommation_industrielle = ?`;
    return await executeQuery(sql, [id]);
  };

  // Créer une nouvelle consommation industrielle
  export const createConsommationIndustrielle = async (consommation: ConsommationsIndustriellesType): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `INSERT INTO ConsommationsIndustrielles SET ?`;
    return await executeQuery(sql, [consommation]);
  };

  // Mettre à jour une consommation industrielle existante
  export const updateConsommationIndustrielle = async (id: string, consommation: ConsommationsIndustriellesType): Promise<ConsommationsIndustriellesType[]> => {
    const sql = `UPDATE ConsommationsIndustrielles SET ? WHERE id_consommation_industrielle = ?`;
    return await executeQuery(sql, [consommation, id]);
  };
}
