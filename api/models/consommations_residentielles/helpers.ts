// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { ConsommationsResidentiellesType } from "./consommations_residentielles"; 

export namespace ConsommationsResidentiellesHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    export const getConsommationsResidentielles = async () : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `SELECT * FROM Consommations`
        return await executeQuery(sql);
    }

    export const getConsommationResidentiellesById = async (id: number) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `SELECT * FROM Consommations WHERE id = ?`
        return await executeQuery(sql, [id]);
    }

    export const createConsommationResidentielle = async (consommation: ConsommationsResidentiellesType) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `INSERT INTO Consommations SET ?`
        return await executeQuery(sql, [consommation]);
    }

    export const updateConsommationResidentielle = async (id: string, consommation: ConsommationsResidentiellesType) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `UPDATE Consommations SET ? WHERE id = ?`
        return await executeQuery(sql, [consommation, id]);
    }
  }

