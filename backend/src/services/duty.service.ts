import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { Duty } from '../models/duty';
import * as dutyRepository from '../repositories/duty.repository';

export const createDuty = async (name: string): Promise<Duty> => {
  const duty: Duty = {
    id: uuidv4(),
    name,
  };
  return await dutyRepository.insertDuty(duty);
};

export const getDuties = async (): Promise<Duty[]> => {
  return await dutyRepository.getAllDuties();
};

export const updateDuty = async (duty: Duty): Promise<Duty> => {
  if (!await dutyRepository.getDutyById(duty.id)) {
    throw new Error('Duty not found');
  }

  const updatedDuty = await dutyRepository.updateDutyById(duty.id, duty.name);
  if (!updatedDuty) {
    throw new Error('Failed to update duty');
  }
  return updatedDuty;
};

export const deleteDuty = async (id: string): Promise<Duty> => {
  if (!await dutyRepository.getDutyById(id)) {
    throw new Error('Duty not found');
  }

  const deletedDuty = await dutyRepository.deleteDutyById(id);
  if (!deletedDuty) {
    throw new Error('Failed to delete duty');
  }
  return deletedDuty;
};
