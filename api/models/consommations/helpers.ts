// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { ConsommationsType } from "./consommations"; 

export namespace ConsommationsHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    export const getConsommations = async () : Promise<boolean> => {
        const sql = `SELECT * FROM consommations`
        const result = await executeQuery(sql)
        return result.affectedRows > 0;
    }

    export const getConsommationById = async (id: string) : Promise<ConsommationsType[]> => {
        const sql = `SELECT * FROM consommations WHERE id = ?`
        return await executeQuery(sql, [id]);
    }

    export const createConsommation = async (consommation: ConsommationsType) : Promise<boolean> => {
        const sql = `INSERT INTO consommations SET ?`
        const result = await executeQuery(sql, [consommation]);
        return result.affectedRows > 0;
    }

    export const updateConsommation = async (id: string, consommation: ConsommationsType) : Promise<ConsommationsType[]> => {
        const sql = `UPDATE consommations SET ? WHERE id = ?`
        return await executeQuery(sql, [consommation, id]);
    }
    export const getConsommationsByannee = async (annee: number) : Promise<ConsommationsType[]> => {
        const sql = `SELECT * FROM consommations WHERE annee = ?`
        return await executeQuery(sql, [annee]);
    }

    // Récupérer les consommations d'une année donnée dans une commune donnée
    export const getConsommationsByAnneeAndCommune = async (annee: number, commune: string) : Promise<ConsommationsType[]> => {
        const sql = `SELECT * FROM consommations WHERE annee = ? AND commune LIKE ?`
        return await executeQuery(sql, [annee, `%${commune}%`]);
    }

    //recuperer les consommations moyennes d'une annee donnée dans une commune donnée 
    export const getConsommationsMoyenneByAnneeAndCommune = async (annee: number, commune: string) : Promise<ConsommationsType[]> => {
        const sql = `SELECT AVG(conso_elec) as conso_elec, AVG(conso_gaz) as conso_gaz, AVG(conso_rcu) as conso_rcu, AVG(mwh_ef) as mwh_ef, AVG(mwh_ep) as mwh_ep, AVG(pdl_elec) as pdl_elec, AVG(pdl_gaz) as pdl_gaz, AVG(nb_adresses_livrees) as nb_adresses_livrees FROM consommations WHERE annee = ? AND commune = ?`
        return await executeQuery(sql, [annee, commune]);
    }
  }

