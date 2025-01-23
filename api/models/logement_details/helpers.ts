// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { LogementDetailsType } from "./logement_details";

export namespace LogementDetailsHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    export const getConsommationsTertiaires = async () : Promise<LogementDetailsType[]> => {
        const sql = `SELECT * FROM logement_details`
        return await executeQuery(sql);
    }

    export const getLogementDetailsById = async (id: number) : Promise<LogementDetailsType[]> => {
        const sql = `SELECT * FROM logement_details WHERE id = ?`
        return await executeQuery(sql, [id]);
    }

    export const createLogementDetails = async (consommation: LogementDetailsType) : Promise<boolean> => {
        const sql = `INSERT INTO logement_details SET ?`
        const result = await executeQuery(sql, [consommation]);
        return result.affectedRows > 0;
    }

    export const updateLogementDetails = async (id: string, consommation: LogementDetailsType) : Promise<LogementDetailsType[]> => {
        const sql = `UPDATE logement_details SET ? WHERE id = ?`
        return await executeQuery(sql, [consommation, id]);
    }
  }

