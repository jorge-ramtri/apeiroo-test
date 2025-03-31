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
  return await dutyRepository.insertDuty(duty);
};

export const getDuties = async (): Promise<Duty[]> => {
  return await dutyRepository.getAllDuties();
};

export const updateDuty = async (duty: Duty): Promise<boolean> => {
  return await dutyRepository.updateDutyById(duty);
};

export const deleteDuty = async (id: string): Promise<boolean> => {
  return await dutyRepository.deleteDutyById(id);
};
