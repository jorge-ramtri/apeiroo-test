import { v4 as uuidv4 } from 'uuid';
import { Duty } from '../models/duty';
import * as dutyRepository from '../repositories/duty.repository';
import { DatabaseError } from '../errors/DatabaseError';
import { NotFoundError } from '../errors/NotFoundError';

export const createDuty = async (name: string): Promise<Duty> => {
  const duty: Duty = {
    id: uuidv4(),
    name,
  };
  try {
    return await dutyRepository.insertDuty(duty);
  } catch (error) {
    throw new DatabaseError('Failed to create duty');
  }
};

export const getDuties = async (): Promise<Duty[]> => {
  try {
    return await dutyRepository.getAllDuties();
  } catch (error) {
    throw new DatabaseError('Failed to retrieve duties');
  }
};

export const updateDuty = async (duty: Duty): Promise<Duty> => {
  if (!await dutyRepository.getDutyById(duty.id)) {
    throw new NotFoundError('Duty not found');
  }

  const updatedDuty = await dutyRepository.updateDutyById(duty);
  if (!updatedDuty) {
    throw new DatabaseError('Failed to update duty');
  }
  return updatedDuty;
};

export const deleteDuty = async (id: string): Promise<Duty> => {
  if (!await dutyRepository.getDutyById(id)) {
    throw new NotFoundError('Duty not found');
  }

  const deletedDuty = await dutyRepository.deleteDutyById(id);
  if (!deletedDuty) {
    throw new DatabaseError('Failed to delete duty');
  }
  return deletedDuty;
};
