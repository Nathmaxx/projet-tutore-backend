// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { ConsommationsTertiairesType } from "./consommations_tertiaires"; 

export namespace ConsommationsTertiairesHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    export const getConsommationsTertiaires = async () : Promise<ConsommationsTertiairesType[]> => {
        const sql = `SELECT * FROM consommations_tertiaires`
        return await executeQuery(sql);
    }

    export const getConsommationTertiairesById = async (id: number) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `SELECT * FROM consommations_tertiaires WHERE id = ?`
        return await executeQuery(sql, [id]);
    }

    export const createConsommationTertiaires = async (consommation: ConsommationsTertiairesType) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `INSERT INTO consommations_tertiaires SET ?`
        return await executeQuery(sql, [consommation]);
    }

    export const updateConsommationTertiaires = async (id: string, consommation: ConsommationsTertiairesType) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `UPDATE consommations_tertiaires SET ? WHERE id = ?`
        return await executeQuery(sql, [consommation, id]);
    }

    // Récupérer les consommations tertiaires d'une année donnée
    export const getConsommationsTertiairesByAnnee = async (annee: number) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `SELECT * FROM consommations_tertiaires WHERE annee = ?`
        return await executeQuery(sql, [annee]);
    }

    // Récupérer les consommations d'une année donnée dans une commune donée
    export const getConsommationsTertiairesByCommuneAndAnnee = async (commune: string,annee: number) : Promise<ConsommationsTertiairesType[]> => {
        const sql = `SELECT * FROM consommations_tertiaires WHERE annee = ? AND commune LIKE ?`
        return await executeQuery(sql, [annee, `%${commune}%`]);
    }

    export const getTotalConsoElect = async () : Promise<{total: number}[]> => {
        const sql = `SELECT SUM(t_conso_elec) as total, annee FROM consommations_tertiaires group by annee`
        return await executeQuery(sql);
    }

    export const getTotalConsoGaz = async () : Promise<{total: number}[]> => {
        const sql = `SELECT SUM(t_conso_gaz) as total, annee FROM consommations_tertiaires group by annee`
        return await executeQuery(sql);
    }
  }

