require('dotenv').config();
import mysql2 from 'mysql2';
import { Pool } from 'mysql2/promise';

let pool_instance: Pool

export const getPool = () => {
  if (!pool_instance) {
    console.log("Creating new pool");
    pool_instance = mysql2.createPool({
      connectionLimit : 50,
      connectTimeout  : 10000,
      host: process.env.HOST_DB,
      user: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.NAME_DB,
      port: process.env.PORT_DB ? parseInt(process.env.PORT_DB) : 3306,
    }).promise();
  }else{
    console.log("Using existing pool");
  }
  return pool_instance;
}

export const executeQuery = async (query: string, params?: any[]): Promise<any> => {
  let connection;
  let attempt = 0;
  const maxAttempts = 3;

  while (attempt < maxAttempts) {
    try {
      connection = await getPool().getConnection();
      const [rows]: any = await connection.query(query, params);
      connection.release();
      return rows;
    } catch (error:any) {
      if (connection) connection.release();
      if (error.code === 'ETIMEDOUT') {
        attempt++;
        if (attempt === maxAttempts) {
          throw error;
        }
        console.log(`Attempt ${attempt} failed. Retrying...`);
      } else {
        throw error;
      }
    }
  }
}