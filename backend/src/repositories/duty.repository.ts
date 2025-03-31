import pool from '../config/database';
import { DatabaseError } from '../errors/DatabaseError';
import { NotFoundError } from '../errors/NotFoundError';
import { Duty } from '../models/duty';

export const insertDuty = async (duty: Duty): Promise<Duty> => {
  const query = 'INSERT INTO duties (id, name) VALUES ($1, $2) RETURNING *';
  try {
    const result = await pool.query(query, [duty.id, duty.name]);
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError('Failed to create duty');
  }
};

export const getAllDuties = async (): Promise<Duty[]> => {
  const query = 'SELECT * FROM duties';
  const result = await pool.query(query);
  return result.rows;
};

export const getDutyById = async (id: string): Promise<Duty | null> => {
  const query = 'SELECT * FROM duties WHERE id = $1';
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    throw new DatabaseError('Failed to retrieve duties');
  }
};

export const updateDutyById = async (duty: Duty): Promise<boolean> => {
  const query = 'UPDATE duties SET name = $1 WHERE id = $2';
  const result = await pool.query(query, [duty.name, duty.id]);
  if (result.rowCount === 0) {
    throw new NotFoundError('Duty not found')
  }
  return true;
};

export const deleteDutyById = async (id: string): Promise<boolean> => {
  const query = 'DELETE FROM duties WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (result.rowCount === 0) {
    throw new NotFoundError('Duty not found')
  }
  return true;
};
