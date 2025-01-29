import { executeQuery } from "../../config/dbsql";
import { ParcellesType } from "./parcelles";

export namespace ParcellesHelper {
  
  export const getParcelles = async (annee: number) : Promise<any[]> => {
    const sql = `
      SELECT p.*, c.conso_elec, c.conso_gaz, d.majic_surf_habitable_parcelle 
      FROM parcelles p
      LEFT JOIN consommations c ON p.id_parcelle = c.id_parcelle 
      LEFT JOIN logement_details d ON p.id_parcelle = d.id_parcelle
      WHERE c.annee = ? 
    `;
    return await executeQuery(sql, [annee]);
  }
  

  export const getParcelleById = async (id: number) : Promise<ParcellesType[]> => {
    const sql = `SELECT * FROM parcelles WHERE id_parcelle = ?`
    return await executeQuery(sql, [id]);
  }

  export const createParcelle = async (parcelle: ParcellesType) : Promise<ParcellesType[]> => {
    const sql = `INSERT IGNORE INTO parcelles SET ?`
    return await executeQuery(sql, [parcelle]);
  }

  export const updateParcelle = async (id: string, parcelle: ParcellesType) : Promise<ParcellesType[]> => {
    const sql = `UPDATE parcelles SET ? WHERE id_parcelle = ?`
    return await executeQuery(sql, [parcelle, id]);
  }

  export const updateCoordinates = async (id: string, coordinates: any) : Promise<boolean> => {
    const sql = `UPDATE parcelles SET coordinates = ? WHERE id_parcelle = ?`
    const result =  await executeQuery(sql, [coordinates, id]);
    return result.affectedRows > 0;
  }
}