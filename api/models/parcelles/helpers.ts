import { executeQuery } from "../../config/dbsql";
import { ParcellesType } from "./parcelles";

export namespace ParcellesHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
  export const getParcelles = async () : Promise<ParcellesType[]> => {
    const sql = `SELECT * FROM Parcelles`
    return await executeQuery(sql);
  }

  export const getParcelleById = async (id: number) : Promise<ParcellesType[]> => {
    const sql = `SELECT * FROM Parcelles WHERE id = ?`
    return await executeQuery(sql, [id]);
  }

  export const createParcelle = async (parcelle: ParcellesType) : Promise<ParcellesType[]> => {
    const sql = `INSERT INTO Parcelles SET ?`
    return await executeQuery(sql, [parcelle]);
  }

  export const updateParcelle = async (id: string, parcelle: ParcellesType) : Promise<ParcellesType[]> => {
    const sql = `UPDATE Parcelles SET ? WHERE id = ?`
    return await executeQuery(sql, [parcelle, id]);
  }
}