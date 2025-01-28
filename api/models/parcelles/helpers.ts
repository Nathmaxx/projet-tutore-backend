import { executeQuery } from "../../config/dbsql";
import { ParcellesType } from "./parcelles";

export namespace ParcellesHelper {
  
  // insert into parcelles(id_parcelle, adresse,commune,iris) values ("1", '182 avenue roger salengro', 'Villeurbanne','bah iris');
  export const getParcelles = async () : Promise<ParcellesType[]> => {
    const sql = `SELECT * FROM parcelles`
    return await executeQuery(sql);
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