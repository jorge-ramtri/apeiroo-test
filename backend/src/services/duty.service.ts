import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export interface Duty {
  id: string;
  name: string;
}

export const createDuty = async (name: string): Promise<Duty> => {
  const id = uuidv4();
  const query = 'INSERT INTO duties (id, name) VALUES ($1, $2) RETURNING *';
  const values = [id, name];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getDuties = async (): Promise<Duty[]> => {
  const query = 'SELECT * FROM duties';
  const result = await pool.query(query);
  return result.rows;
};

export const updateDuty = async (id: string, name: string): Promise<Duty> => {
  const query = 'UPDATE duties SET name = $1 WHERE id = $2 RETURNING *';
  const values = [name, id];
  const result = await pool.query(query, values);
  if (result.rowCount === 0) {
    throw new Error('Duty not found');
  }
  return result.rows[0];
};
