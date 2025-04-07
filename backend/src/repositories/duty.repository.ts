import pool from '../config/database';
import logger from '../config/simpleLogger';
import { DatabaseError } from '../errors/DatabaseError';
import { NotFoundError } from '../errors/NotFoundError';
import { Duty } from '../models/duty';

export const insertDuty = async (duty: Duty): Promise<Duty> => {
  const query = 'INSERT INTO duties (id, name) VALUES ($1, $2) RETURNING *';
  try {
    const result = await pool.query(query, [duty.id, duty.name]);
    return result.rows[0];
  } catch (error: any) {
    logger.error(error.message);
    throw new DatabaseError('Failed to create task');
  }
};

export const getAllDuties = async (): Promise<Duty[]> => {
  const query = 'SELECT * FROM duties';
  try {
    const result = await pool.query(query);
    return result.rows || [];
  } catch (error: any) {
    logger.error(error.stack);
    throw new DatabaseError('Failed to retrieve tasks');
  }
};

export const updateDuty = async (duty: Duty): Promise<boolean> => {
  const query = 'UPDATE duties SET name = $1, completed = $2 WHERE id = $3';
  const result = await pool.query(query, [duty.name, duty.completed, duty.id]);
  if (result.rowCount === 0) {
    logger.error('No update was made: ');
    throw new NotFoundError('Task not found');
  }
  return true;
};

export const deleteDutyById = async (id: string): Promise<boolean> => {
  const query = 'DELETE FROM duties WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (result.rowCount === 0) {
    throw new NotFoundError('Task not found');
  }
  return true;
};
