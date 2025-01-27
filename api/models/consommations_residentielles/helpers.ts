// models/consommations/helpers.ts
import { executeQuery } from "../../config/dbsql"; 
import { ConsommationsResidentiellesType } from "./consommations_residentielles"; 

export namespace ConsommationsResidentiellesHelper {
  
  // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    export const getConsommationsResidentielles = async () : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `SELECT * FROM consommations_residentielles`
        return await executeQuery(sql);
    }

    export const getConsommationResidentiellesById = async (id: number) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `SELECT * FROM consommations_residentielles WHERE id = ?`
        return await executeQuery(sql, [id]);
    }

    export const createConsommationResidentielle = async (consommation: ConsommationsResidentiellesType) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `INSERT INTO consommations_residentielles SET ?`
        return await executeQuery(sql, [consommation]);
    }

    export const updateConsommationResidentielle = async (id: string, consommation: ConsommationsResidentiellesType) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `UPDATE consommations_residentielles SET ? WHERE id = ?`
        return await executeQuery(sql, [consommation, id]);
    }

    // Récupérer les consommations résidentielles d'une année donnée
    export const getConsommationsResidentiellesByAnnee = async (annee: number) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `SELECT * FROM consommations_residentielles WHERE annee = ?`
        return await executeQuery(sql, [annee]);
    }

    // Récupérer les consommations d'une année donnée dans une commune donée 
    export const getConsommationsResidentiellesByCommuneAndAnnee = async (commune: string,annee: number) : Promise<ConsommationsResidentiellesType[]> => {
        const sql = `SELECT * FROM consommations_residentielles WHERE annee = ? AND commune = ?`
        return await executeQuery(sql, [annee, commune]);
    }
  }


