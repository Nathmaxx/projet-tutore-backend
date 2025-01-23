// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { ConsommationsType } from "./consommations"; 

export namespace ParcellesHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    export const getConsommations = async () : Promise<ConsommationsType[]> => {
        const sql = `SELECT * FROM Consommations`
        return await executeQuery(sql);
    }

    export const getConsommationById = async (id: number) : Promise<ConsommationsType[]> => {
        const sql = `SELECT * FROM Consommations WHERE id = ?`
        return await executeQuery(sql, [id]);
    }

    export const createConsommation = async (consommation: ConsommationsType) : Promise<ConsommationsType[]> => {
        const sql = `INSERT INTO Consommations SET ?`
        return await executeQuery(sql, [consommation]);
    }

    export const updateConsommation = async (id: string, consommation: ConsommationsType) : Promise<ConsommationsType[]> => {
        const sql = `UPDATE Consommations SET ? WHERE id = ?`
        return await executeQuery(sql, [consommation, id]);
    }
  }

