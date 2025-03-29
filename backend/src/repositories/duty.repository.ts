import pool from '../config/database';
import { Duty } from '../models/duty';

export const insertDuty = async (duty: Duty): Promise<Duty> => {
  const query = 'INSERT INTO duties (id, name) VALUES ($1, $2) RETURNING *';
  const result = await pool.query(query, [duty.id, duty.name]);
  return result.rows[0];
};

export const getAllDuties = async (): Promise<Duty[]> => {
  const query = 'SELECT * FROM duties';
  const result = await pool.query(query);
  return result.rows;
};

export const getDutyById = async (id: string): Promise<Duty | null> => {
  const query = 'SELECT * FROM duties WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

export const updateDutyById = async (duty: Duty): Promise<Duty | null> => {
  const query = 'UPDATE duties SET name = $1 WHERE id = $2 RETURNING *';
  const result = await pool.query(query, [duty.name, duty.id]);
  return result.rows[0] || null;
};

export const deleteDutyById = async (id: string): Promise<Duty | null> => {
  const query = 'DELETE FROM duties WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};
