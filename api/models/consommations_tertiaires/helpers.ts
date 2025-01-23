// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { ConsommationsTertiairesType } from "./consommations_tertiaires"; 

export namespace ConsommationsTertiairesHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    export const getConsommationsTertiaires = async () : Promise<ConsommationsTertiairesType[]> => {
        const sql = `SELECT * FROM Consommations_Tertiaires`
        return await executeQuery(sql);
    }

    export const getConsommationTertiairesById = async (id: number) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `SELECT * FROM Consommations_Tertiaires WHERE id = ?`
        return await executeQuery(sql, [id]);
    }

    export const createConsommationTertiaires = async (consommation: ConsommationsTertiairesType) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `INSERT INTO Consommations_Tertiaires SET ?`
        return await executeQuery(sql, [consommation]);
    }

    export const updateConsommationTertiaires = async (id: string, consommation: ConsommationsTertiairesType) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `UPDATE Consommations_Tertiaires SET ? WHERE id = ?`
        return await executeQuery(sql, [consommation, id]);
    }
  }

