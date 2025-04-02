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
    logger.error(error.message)
    throw new DatabaseError('Failed to create task');
  }
};

export const getAllDuties = async (): Promise<Duty[]> => {
  logger.info(`Entra en backend/src/repositories/duty.repository.getAllDuties`);
  const query = 'SELECT * FROM duties';
  try {
    const result = await pool.query(query);
    return result.rows || [];
  } catch (error: any) {
    logger.error(error.stack)
    throw new DatabaseError('Failed to retrieve tasks');
  }
};

// export const getDutyById = async (id: string): Promise<Duty | null> => {
//   logger.info(`Entra en backend/src/repositories/duty.repository.getDutyById`);
//   const query = 'SELECT * FROM duties WHERE id = $1';
//   try {
//     const result = await pool.query(query, [id]);
//     return result.rows[0] || null;
//   } catch (error: any) {
//     logger.error(error.message)
//     throw new DatabaseError('Failed to retrieve the task');
//   }
// };

export const updateDutyById = async (duty: Duty): Promise<boolean> => {
  logger.info(`Entra en backend/src/repositories/duty.repository.updateDutyById`);
  const query = 'UPDATE duties SET name = $1 WHERE id = $2';
  const result = await pool.query(query, [duty.name, duty.id]);
  if (result.rowCount === 0) {
    throw new NotFoundError('Task not found')
  }
  return true;
};

export const deleteDutyById = async (id: string): Promise<boolean> => {
  logger.info(`Entra en backend/src/repositories/duty.repository.deleteDutyById`);
  const query = 'DELETE FROM duties WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (result.rowCount === 0) {
    throw new NotFoundError('Task not found')
  }
  return true;
};
